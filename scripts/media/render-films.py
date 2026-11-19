"""Render the hero loops and the walkthrough film from the photographs in public/media.

Usage:
    python3 scripts/media/render-films.py hero            # hero-loop.mp4 (1280x720) + hero-loop-mobile.mp4 (720x1280)
    python3 scripts/media/render-films.py walkthrough     # walkthrough.mp4 (1600x900) + walkthrough.json + poster
    python3 scripts/media/render-films.py walkthrough --music path/to/licensed-track.mp3

Each photo shot is a slow push-in (Ken Burns) on one photograph, joined with cross-dissolves.
Shots are rendered from a 2x upscale so the motion is smooth rather than stepping a pixel at a time.
A shot can also be real footage: ("clip:NAME", start, seconds) takes that stretch of public/media/NAME.mp4, which is
already colour-graded by scripts/media/grade-footage.py, so film and site use the same grade.

--music mixes a track under the walkthrough: trimmed to length, 2 s fade in, 3 s fade out, loudness-normalised
to about -16 LUFS. Only pass a track the resort holds a licence for.

When more real walkthrough footage is available, grade it and swap clips into WALKTHROUGH; the chapters file is
written from the same list, so the site's chapter buttons stay in step.
"""

import json
import re
import os
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MEDIA = os.path.join(ROOT, "public", "media")
FPS = 30
FFMPEG = os.environ.get("FFMPEG")
if not FFMPEG or not shutil.which(FFMPEG):
    _winget = r"C:\Users\iknow\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
    if os.path.exists(_winget):
        FFMPEG = _winget
    else:
        FFMPEG = "ffmpeg"

def resolve_image(key):
    if os.path.isabs(key) and os.path.exists(key):
        return key
    for base in [MEDIA, os.path.join(ROOT, "public"), os.path.join(ROOT, "public", "final-view")]:
        p = os.path.normpath(os.path.join(base, key))
        if os.path.exists(p):
            return p
        for ext in [".webp", ".jpg", ".jpeg", ".png"]:
            if os.path.exists(p + ext):
                return p + ext
    raise FileNotFoundError(f"Cannot resolve image for key: {key}")

# (photo key, horizontal focus 0..1 for portrait crops, push direction)
HERO = [
    ("aerial-greenery", 0.47, "in"),
    ("facade-dusk", 0.58, "in"),
    ("lobby-chandeliers", 0.58, "out"),
    ("suite-1", 0.5, "in"),
    ("pool-dusk", 0.5, "in"),
    ("skylawn-sunset", 0.62, "out"),
    ("facade-night-full", 0.6, "in"),
]
# Portrait-native alternates for the phone cut where the landscape frame crops badly.
HERO_MOBILE_SWAP = {"skylawn-sunset": ("skylawn-sunset-tall", 0.5)}

WALKTHROUGH = [
    ("First light", [
        ("../final-view/first-light1.webp", "in"),
        ("../final-view/first-light2.webp", "out"),
        ("../final-view/first-light3.webp", "in"),
    ]),
    ("Reception and lobby", [
        ("../final-view/reception.webp", "in"),
        ("../final-view/lobby2.webp", "out"),
        ("../final-view/lobby3.webp", "in"),
        ("../final-view/lobby4.webp", "out"),
    ]),
    ("Rooms and suites", [
        ("suite-1", "in"),
        ("suite-living", "out"),
        ("suite-bath", "in"),
        ("premium-1", "in"),
        ("executive-1", "out"),
    ]),
    ("Swadika", [
        ("swadika-hall", "in"),
        ("swadika-guests", "out"),
    ]),
    ("Blue Diamond pool", [
        ("../final-view/pool.jpeg", "in"),
        ("film-ref-8", "out"),
    ]),
    ("Sky Lawn", [
        ("skylawn-sunset", "in"),
    ]),
    ("Banquets", [
        ("film-banquet-1", "in"),
        ("film-banquet-2", "out"),
        ("film-banquet-3", "in"),
    ]),
    ("Narsinghgarh", [
        ("film-ref-9", "in"),
        ("../final-view/narsinghgarh1.webp", "out"),
        ("../final-view/narsinghgarh2.webp", "in"),
        ("../final-view/narsinghgarh3.webp", "out"),
        ("../final-view/narsinghgarh4.webp", "in"),
    ]),
    ("Manratan by night", [
        ("night/new-gallery.webp", "in"),
        ("night/new-gallery-1.webp", "out"),
        ("night/new-gallery-2.webp", "in"),
        ("night/new-gallery-3.webp", "out"),
        ("night/new-gallery-4.webp", "in"),
    ]),
]


def run(cmd):
    if cmd[0] == FFMPEG:
        cmd = [*cmd[:-1], "-threads", "2", cmd[-1]]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write(r.stderr[-3000:])
        raise SystemExit(f"command failed: {' '.join(cmd[:6])} …")


def probe_size(path):
    result = subprocess.run([FFMPEG, "-hide_banner", "-i", path], capture_output=True, text=True, errors="replace")
    size = re.search(r"Video:.*?(\d{2,5})x(\d{2,5})", result.stderr)
    if not size:
        raise RuntimeError(f"Could not read image dimensions: {path}")
    return int(size[1]), int(size[2])


def shot(src, dst, w, h, seconds, direction="in", focus=0.5, zoom=0.08):
    """Render one photograph as a w x h clip with a gentle push in or out."""
    iw, ih = probe_size(src)
    # Crop the photo to the output aspect around the focus point.
    target = w / h
    if iw / ih > target:
        cw, ch = round(ih * target), ih
        cx = min(max(round(iw * focus - cw / 2), 0), iw - cw)
        cy = 0
    else:
        cw, ch = iw, round(iw / target)
        cx, cy = 0, (ih - ch) // 2
    frames = round(seconds * FPS)
    up_w, up_h = w * 2, h * 2
    if direction == "in":
        z = f"1+{zoom}*on/{frames}"
    else:
        z = f"1+{zoom}-{zoom}*on/{frames}"
    vf = (
        f"crop={cw}:{ch}:{cx}:{cy}," + ("hflip," if direction == "mirror" else "") + f"scale={up_w}:{up_h}:flags=lanczos,"
        f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s={w}x{h}:fps={FPS},"
        "format=yuv420p"
    )
    run([FFMPEG, "-y", "-v", "error", "-i", src, "-vf", vf, "-frames:v", str(frames), "-c:v", "libx264",
         "-preset", "veryfast", "-crf", "16", "-an", dst])


def footage(name, start, seconds, dst, w, h):
    """Take `seconds` of an already-graded clip in public/media, sized and timed to match the photo shots."""
    run([FFMPEG, "-y", "-v", "error", "-ss", f"{start}", "-i", os.path.join(MEDIA, f"{name}.mp4"), "-t", f"{seconds}",
         "-vf", f"scale={w}:{h}:flags=lanczos,fps={FPS},format=yuv420p", "-c:v", "libx264", "-preset", "veryfast",
         "-crf", "16", "-an", dst])


def join(clips, durations, fade, out, crf, trim_start=0.0, music=None):
    """Cross-dissolve the clips into one file. `durations` is one length per clip (or a single number for all)."""
    if not isinstance(durations, (list, tuple)):
        durations = [durations] * len(clips)
    inputs = []
    for c in clips:
        inputs += ["-threads", "1", "-i", c]
    parts = []
    last = "0:v"
    offset = 0.0
    for i in range(1, len(clips)):
        offset += durations[i - 1] - fade
        label = f"v{i}"
        parts.append(f"[{last}][{i}:v]xfade=transition=fade:duration={fade}:offset={offset:.3f}[{label}]")
        last = label
    total = offset + durations[-1]
    if trim_start:
        parts.append(f"[{last}]trim=start={trim_start},setpts=PTS-STARTPTS[vt]")
        last = "vt"
        total -= trim_start
    fc = ";".join(parts)
    cmd = [FFMPEG, "-y", "-v", "error", "-filter_complex_threads", "1", *inputs]
    if music:
        cmd += ["-i", music]
    cmd += ["-filter_complex", fc + (";" if fc else "")]
    if music:
        a = len(clips)
        cmd[-1] += (
            f"[{a}:a]atrim=0:{total:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=2,"
            f"afade=t=out:st={max(0, total - 3):.3f}:d=3,loudnorm=I=-16:TP=-1.5:LRA=11[aout]"
        )
    cmd += ["-map", f"[{last}]"]
    if music:
        cmd += ["-map", "[aout]", "-c:a", "aac", "-b:a", "160k"]
    else:
        cmd += ["-an"]
    cmd += ["-c:v", "libx264", "-preset", "veryfast", "-crf", str(crf), "-profile:v", "high", "-pix_fmt", "yuv420p",
            "-movflags", "+faststart", "-t", f"{total:.3f}", out]
    run(cmd)
    return total


def hero():
    tmp = tempfile.mkdtemp()
    try:
        secs, fade = 5.0, 1.2
        for name, w, h, crf, mobile in (("hero-loop", 1280, 720, 29, False), ("hero-loop-mobile", 720, 1280, 32, True)):
            clips = []
            seq = HERO + [HERO[0]]  # end on the opening shot so the loop has no seam
            for i, (key, focus, d) in enumerate(seq):
                if mobile and key in HERO_MOBILE_SWAP:
                    key, focus = HERO_MOBILE_SWAP[key]
                dst = os.path.join(tmp, f"{name}-{i}.mp4")
                shot(os.path.join(MEDIA, f"{key}.webp"), dst, w, h, secs, d, focus, zoom=0.06)
                clips.append(dst)
            out = os.path.join(MEDIA, f"{name}.mp4")
            total = join(clips, secs, fade, out, crf, trim_start=fade)
            print(out, f"{total:.1f}s", os.path.getsize(out) // 1024, "KB")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def walkthrough(music=None):
    tmp = tempfile.mkdtemp()
    try:
        secs, fade = 3.6, 0.8
        clips, durations, chapters, at = [], [], [], 0.0
        for title, shots in WALKTHROUGH:
            print(f"Rendering {title}", flush=True)
            chapters.append({"title": title, "start": round(at, 1)})
            for spec in shots:
                dst = os.path.join(tmp, f"w-{len(clips)}.mp4")
                if spec[0].startswith("clip:"):
                    _, start, length = spec
                    footage(spec[0][5:], start, length, dst, 1600, 900)
                else:
                    key, d = spec
                    length = secs
                    shot(resolve_image(key), dst, 1600, 900, secs, d, 0.5, zoom=0.07)
                clips.append(dst)
                durations.append(length)
                at += length - fade
        out = os.path.join(MEDIA, "walkthrough-v2.mp4")
        total = join(clips, durations, fade, out, 27, music=music)
        with open(os.path.join(MEDIA, "walkthrough.json"), "w") as fh:
            json.dump({"duration": round(total, 1), "chapters": chapters}, fh, indent=2)
            fh.write("\n")
        # Poster: the opening frame, so the player doesn't jump when it starts.
        run([FFMPEG, "-y", "-v", "error", "-i", out, "-frames:v", "1", "-vf", "scale=1600:-2",
             os.path.join(tmp, "poster.png")])
        run([FFMPEG, "-y", "-v", "error", "-i", os.path.join(tmp, "poster.png"), "-c:v", "libwebp", "-quality", "90",
             os.path.join(MEDIA, "walkthrough-poster-v2.webp")])
        shutil.copyfile(os.path.join(MEDIA, "walkthrough-poster-v2.webp"), os.path.join(MEDIA, "walkthrough-poster.webp"))
        print(out, f"{total:.1f}s", os.path.getsize(out) // 1024, "KB", "audio" if music else "no audio")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else ""
    music = None
    if "--music" in sys.argv:
        music = sys.argv[sys.argv.index("--music") + 1]
        if not os.path.exists(music):
            raise SystemExit(f"music file not found: {music}")
    if what == "hero":
        hero()
    elif what == "walkthrough":
        walkthrough(music)
    else:
        raise SystemExit(__doc__)
