"""Colour-grade the resort's video footage and encode the web versions.

Usage:
    python3 scripts/media/grade-footage.py lut                               # rewrite scripts/media/manratan-look.cube
    python3 scripts/media/grade-footage.py walk        path/to/IMG_5576.MP4   # public/media/walk.mp4 + walk-poster.webp
    python3 scripts/media/grade-footage.py pool-dinner path/to/1000239934.mp4 # public/media/pool-dinner.mp4 + poster
    python3 scripts/media/grade-footage.py compare walk|pool-dinner SOURCE OUT_DIR   # before/after stills of every shot

The grade is done in two passes, the way a colourist works:

1. Balance, per shot: black point, white balance, exposure and (for night footage) noise reduction, so every shot
   starts neutral and matches the shots around it. These are the BALANCE filters in CLIPS below.
2. Look, shared by every clip: manratan-look.cube, a 33-point 3D LUT built by make_lut() in this file (version 2,
   9 Nov 2026, deliberately visible): a filmic S-curve with soft highlight roll-off, champagne-gold highlights,
   rust-warm shadows with true blacks kept black, richer reds, gold and turquoise water, greens calmed toward
   olive, skin kept natural, whites protected so linen and marble stay clean.
3. Finishing: a soft vignette on both clips, and on the night film a gentle glow around the lights.

The .cube file is a standard Rec.709 LUT, so the editors can load the same look in DaVinci Resolve, Premiere Pro,
Final Cut or CapCut and apply it to the full-length clips after their own balance pass (vignette and glow are
separate finishing steps, not baked into the LUT).

Audio is always dropped: the clips are used as muted loops, and the music on the source edit isn't licensed to us.
"""

import os
import subprocess
import sys
import tempfile

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
MEDIA = os.path.join(ROOT, "public", "media")
LUT = os.path.join(HERE, "manratan-look.cube")

# ---------------------------------------------------------------------------------------------------------------
# Per-clip settings. Shot times are in seconds of the source file.

CLIPS = {
    # IMG_5576.MP4: the model walk, 1080x1920, 25 fps. Four shots, a black frame at the head and 0.3 s of black at the tail.
    "walk": {
        "shots": [
            # (start, end, balance filters). Black point, per-channel white point (which also neutralises the cast)
            # and gamma were measured over six frames of each shot: 0.3 / 99.7 percentile luma and the mean of
            # near-neutral pixels. The cast is corrected 30-80 %, not fully, so each place keeps its own light.
            (0.08, 3.04, "colorlevels=rimin=0.062:gimin=0.062:bimin=0.062:rimax=0.979:gimax=0.984:bimax=1.0,eq=gamma=1.2"),  # reception: lifted blacks, slight blue-grey cast, dark
            (3.04, 5.56, "colorlevels=rimin=0.064:gimin=0.064:bimin=0.064:rimax=0.949:gimax=0.946:bimax=0.92,eq=gamma=0.93"),  # room: yellow linen
            (5.56, 8.92, "colorlevels=rimin=0.041:gimin=0.041:bimin=0.041:rimax=0.93:gimax=0.924:bimax=0.915,eq=gamma=1.02"),  # Swadika: dull highlights
            (8.92, 11.0, "colorlevels=rimin=0.067:gimin=0.067:bimin=0.067:rimax=0.938:gimax=0.938:bimax=0.925,eq=gamma=1.04"),  # poolside at dusk: flat, washed out (cast only 30 % corrected: the dusk sky stays warm)
        ],
        # Finishing after the look: a soft vignette to hold the eye on the walk.
        "finish": "vignette=angle=0.3",
        "size": (720, 1280),
        "fps": 25,
        "crf": 25,
        "speed": 1.0,
        "poster_at": 1.2,  # seconds into the graded clip
        "out": "walk",
    },
    # 1000239934.mp4: drone pull-back from the candlelit table to the whole pool, 1280x720, 59.94 fps, night.
    # Played at half speed (every source frame kept, so the slow motion is real, not interpolated).
    "pool-dinner": {
        "shots": [
            # Night: denoise, then open the midtones (median luma 0.07 in the source) without lifting the black sky.
            (0.0, 9.45, "hqdn3d=3:2.5:5:4,curves=master='0/0 0.03/0.025 0.1/0.17 0.3/0.46 0.6/0.78 0.85/0.94 1/1'"),
        ],
        # Finishing after the look: a gentle glow on the fairy lights, lamps and reflections, and a soft vignette.
        "glow": 0.32,
        "finish": "vignette=angle=0.36",
        "size": (1280, 720),
        "fps": 30000 / 1001,
        "crf": 25,
        "speed": 0.5,
        "fade": (0.8, 1.2),  # fade in / out, so the loop restarts through black rather than jumping
        "poster_at": 2.0,
        "out": "pool-dinner",
    },
}

# ---------------------------------------------------------------------------------------------------------------
# The look


def _srgb_to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def _linear_to_srgb(c):
    c = np.clip(c, 0, None)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * np.power(c, 1 / 2.4) - 0.055)


_M1 = np.array([[0.4122214708, 0.5363325363, 0.0514459929], [0.2119034982, 0.6806995451, 0.1073969566], [0.0883024619, 0.2817188376, 0.6299787005]])
_M2 = np.array([[0.2104542553, 0.7936177850, -0.0040720468], [1.9779984951, -2.4285922050, 0.4505937099], [0.0259040371, 0.7827717662, -0.8086757660]])


def _to_oklab(rgb):
    lms = _srgb_to_linear(rgb) @ _M1.T
    return np.cbrt(lms) @ _M2.T


def _from_oklab(lab):
    lms = (lab @ np.linalg.inv(_M2).T) ** 3
    return _linear_to_srgb(lms @ np.linalg.inv(_M1).T)


def _smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def _bump(h, centre, width):
    """Raised-cosine weight, 1 at `centre` degrees, 0 beyond +/- width."""
    d = np.abs(((h - centre + 180) % 360) - 180)
    return np.where(d < width, 0.5 + 0.5 * np.cos(np.pi * d / width), 0.0)


def look(rgb):
    """The Manratan look on display-referred Rec.709 RGB in 0..1 (any shape ending in 3).

    Version 2 (9 Nov 2026): a clearly visible grade. The first version was so gentle the client could not see it.
    """
    from scipy.interpolate import PchipInterpolator

    lab = _to_oklab(rgb)
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]

    # 1. Contrast: a filmic S on perceptual lightness: deeper shadows, brighter mids, highlights rolled off softly
    #    so marble, linen and sky never clip harshly. Black stays black.
    curve = PchipInterpolator(
        [0, 0.06, 0.15, 0.35, 0.6, 0.85, 0.95, 1.0],
        [0, 0.05, 0.14, 0.36, 0.645, 0.887, 0.965, 0.99],
    )
    L2 = curve(np.clip(L, 0, 1))

    C = np.hypot(a, b)
    h = np.degrees(np.arctan2(b, a)) % 360
    # Skin and warm wood a touch brighter in the midtones, so faces never go muddy under the contrast.
    L2 = L2 + 0.03 * _bump(h, 52, 26) * _smoothstep(0.02, 0.05, C) * _smoothstep(0.3, 0.45, L2) * (1 - _smoothstep(0.75, 0.9, L2))

    # 2. Colour by hue (OKLCh hue in degrees: red ~25, skin/orange ~55, gold ~85, green ~140, turquoise ~200, blue ~260).
    gain = (
        1.12
        + 0.12 * _bump(h, 20, 40)  # reds: her top, the velvet canopy, roses
        - 0.07 * _bump(h, 55, 22)  # skin: kept natural
        + 0.03 * _bump(h, 85, 25)  # gold: brass, fairy lights, warm lamps
        - 0.16 * _bump(h, 140, 55)  # greens: calmer, toward olive
        + 0.08 * _bump(h, 205, 45)  # turquoise: the pool
    )
    shift = -8 * _bump(h, 145, 45) - 10 * _bump(h, 255, 35)  # greens toward olive, blues toward turquoise
    # Chroma near white and black is mostly noise or cast, and colours that are already rich would clip: ease off there.
    gain = 1 + (gain - 1) * _smoothstep(0.02, 0.18, L2) * (1 - _smoothstep(0.92, 1.0, L2)) * (1 - _smoothstep(0.14, 0.26, C))
    C2 = C * gain
    h2 = np.radians(h + shift)

    # 3. Warm split tone: rust in the shadows (true black stays black), a touch of warmth in the mids,
    #    champagne gold in the highlights (pure white stays clean).
    shadows = _smoothstep(0.0, 0.16, L2) * (1 - _smoothstep(0.16, 0.5, L2))
    mids = _smoothstep(0.25, 0.5, L2) * (1 - _smoothstep(0.5, 0.8, L2))
    highs = _smoothstep(0.55, 0.86, L2) * (1 - _smoothstep(0.93, 1.0, L2))
    ta = 0.006 * shadows + 0.0025 * mids + 0.005 * highs
    tb = 0.008 * shadows + 0.008 * mids + 0.019 * highs

    # 4. Back to RGB, pulling chroma in (never lightness) wherever a colour would leave the Rec.709 gamut.
    out = np.zeros_like(lab)
    todo = np.ones(L2.shape, dtype=bool)
    for s in np.linspace(1.0, 0.0, 41):
        cand = _from_oklab(np.stack([L2, s * C2 * np.cos(h2) + ta, s * C2 * np.sin(h2) + tb], axis=-1))
        ok = todo & np.all((cand >= -0.002) & (cand <= 1.002), axis=-1)
        out[ok] = cand[ok]
        todo &= ~ok
        if not todo.any():
            break
    if todo.any():
        out[todo] = _from_oklab(np.stack([L2, np.zeros_like(L2), np.zeros_like(L2)], axis=-1))[todo]
    return np.clip(out, 0, 1)


def make_lut(path=LUT, n=33):
    g = np.linspace(0, 1, n)
    # .cube order: red changes fastest, then green, then blue.
    b, gg, r = np.meshgrid(g, g, g, indexing="ij")
    rgb = np.stack([r, gg, b], axis=-1).reshape(-1, 3)
    out = look(rgb)
    with open(path, "w") as fh:
        fh.write('TITLE "Manratan look v2"\n')
        fh.write("# Rec.709 in, Rec.709 out. Apply after a neutral balance pass. Made by scripts/media/grade-footage.py\n")
        fh.write(f"LUT_3D_SIZE {n}\nDOMAIN_MIN 0.0 0.0 0.0\nDOMAIN_MAX 1.0 1.0 1.0\n")
        for row in out:
            fh.write(f"{row[0]:.6f} {row[1]:.6f} {row[2]:.6f}\n")
    return path


# ---------------------------------------------------------------------------------------------------------------
# Rendering


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write(r.stderr[-3000:])
        raise SystemExit(f"command failed: {' '.join(cmd[:8])} …")


def graph(clip, graded=True):
    """filter_complex for one clip: trim each shot, balance it, join, then the look, size and speed."""
    cfg = CLIPS[clip]
    w, h = cfg["size"]
    parts, labels = [], []
    for i, (start, end, bal) in enumerate(cfg["shots"]):
        f = f"[0:v]trim=start={start}:end={end},setpts=PTS-STARTPTS"
        if graded:
            f += f",{bal}"
        parts.append(f + f"[s{i}]")
        labels.append(f"[s{i}]")
    if len(labels) > 1:
        parts.append("".join(labels) + f"concat=n={len(labels)}:v=1:a=0[j]")
    else:
        parts[-1] = parts[-1].replace("[s0]", "[j]")
    tail = "[j]"
    if graded:
        # The look, then (night film only) a glow: blur what is near white and screen it back over the picture.
        parts.append(f"{tail}lut3d=file='{LUT}':interp=tetrahedral,format=gbrp[lk]")
        tail = "[lk]"
        if cfg.get("glow"):
            parts.append(f"{tail}split[gb][gh]")
            parts.append("[gh]curves=all='0/0 0.72/0 1/1',gblur=sigma=10[gl]")
            parts.append(f"[gb][gl]blend=all_mode=screen:all_opacity={cfg['glow']}[jg]")
            tail = "[jg]"
    chain = [f"scale={w}:{h}:flags=lanczos"]
    if graded and cfg.get("finish"):
        chain.append(cfg["finish"])
    if cfg["speed"] != 1.0:
        chain.append(f"setpts=PTS/{cfg['speed']}")
    chain.append(f"fps={cfg['fps']}")
    if "fade" in cfg:
        total = sum(e - s for s, e, _ in cfg["shots"]) / cfg["speed"]
        fi, fo = cfg["fade"]
        chain.append(f"fade=t=in:st=0:d={fi},fade=t=out:st={total - fo:.3f}:d={fo}")
    chain.append("format=yuv420p")
    parts.append(tail + ",".join(chain) + "[out]")
    return ";".join(parts)


def render(clip, source):
    if not os.path.exists(LUT):
        make_lut()
    cfg = CLIPS[clip]
    out = os.path.join(MEDIA, f"{cfg['out']}.mp4")
    run(["ffmpeg", "-y", "-v", "error", "-i", source, "-filter_complex", graph(clip), "-map", "[out]", "-an",
         "-c:v", "libx264", "-preset", "veryfast", "-crf", str(cfg["crf"]), "-profile:v", "high", "-pix_fmt", "yuv420p",
         "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-movflags", "+faststart", out])
    poster = os.path.join(MEDIA, f"{cfg['out']}-poster.webp")
    with tempfile.TemporaryDirectory() as tmp:
        png = os.path.join(tmp, "p.png")
        run(["ffmpeg", "-y", "-v", "error", "-ss", str(cfg["poster_at"]), "-i", out, "-frames:v", "1", png])
        run(["ffmpeg", "-y", "-v", "error", "-i", png, "-c:v", "libwebp", "-quality", "78", poster])
    dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out],
                         capture_output=True, text=True).stdout.strip()
    print(out, f"{float(dur):.2f}s", os.path.getsize(out) // 1024, "KB;", poster, os.path.getsize(poster) // 1024, "KB")


def compare(clip, source, out_dir):
    """One before/after still from the middle of every shot."""
    if not os.path.exists(LUT):
        make_lut()
    os.makedirs(out_dir, exist_ok=True)
    cfg = CLIPS[clip]
    w, h = cfg["size"]
    for i, (start, end, bal) in enumerate(cfg["shots"]):
        t = (start + end) / 2
        for graded in (False, True):
            vf = f"scale={w}:{h}:flags=lanczos"
            if graded:
                pre = f"{bal},lut3d=file='{LUT}':interp=tetrahedral,format=gbrp"
                if cfg.get("glow"):
                    pre += f",split[gb][gh];[gh]curves=all='0/0 0.72/0 1/1',gblur=sigma=10[gl];[gb][gl]blend=all_mode=screen:all_opacity={cfg['glow']}"
                vf = pre + "," + vf + (f",{cfg['finish']}" if cfg.get("finish") else "")
            name = os.path.join(out_dir, f"{clip}-{i}-{'after' if graded else 'before'}.png")
            run(["ffmpeg", "-y", "-v", "error", "-ss", f"{t:.2f}", "-i", source, "-frames:v", "1", "-vf", vf, name])
        print(f"shot {i}: {t:.2f}s")


if __name__ == "__main__":
    args = sys.argv[1:]
    if args[:1] == ["lut"]:
        print(make_lut())
    elif len(args) == 2 and args[0] in CLIPS:
        render(args[0], args[1])
    elif len(args) == 4 and args[0] == "compare" and args[1] in CLIPS:
        compare(args[1], args[2], args[3])
    else:
        raise SystemExit(__doc__)
