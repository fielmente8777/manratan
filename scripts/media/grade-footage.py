"""Colour-grade the resort's video footage and encode the web versions.

Usage:
    python3 scripts/media/grade-footage.py lut                               # rewrite scripts/media/manratan-look.cube
    python3 scripts/media/grade-footage.py walk        path/to/IMG_5576.MP4   # public/media/walk.mp4 + walk-poster.webp
    python3 scripts/media/grade-footage.py pool-dinner path/to/1000239934.mp4 # public/media/pool-dinner.mp4 + poster
    python3 scripts/media/grade-footage.py compare walk|pool-dinner SOURCE OUT_DIR   # before/after stills of every shot

The grade is done in two passes, the way a colourist works:

1. Balance, per shot: black point, white balance, exposure and (for night footage) noise reduction, so every shot
   starts neutral and matches the shots around it. These are the BALANCE filters in CLIPS below.
2. Look, shared by every clip: manratan-look.cube, a 33-point 3D LUT built by make_lut() in this file. A gentle
   S-curve, warm-gold highlights, warm (never muddy) shadows with true blacks kept black, richer reds and
   turquoise water, slightly calmer greens, and whites protected so linen and marble stay clean.

The .cube file is a standard Rec.709 LUT, so the editors can load the same look in DaVinci Resolve, Premiere Pro,
Final Cut or CapCut and apply it to the full-length clips after their own balance pass.

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
            # (start, end, balance filters)
            (0.08, 3.04, "colorlevels=rimin=0.055:gimin=0.055:bimin=0.055,eq=gamma=1.03,colorbalance=rm=0.006:gm=0.002:bm=-0.008"),  # reception: flat blacks, grey-magenta cast
            (3.04, 5.56, "colorlevels=rimin=0.06:gimin=0.06:bimin=0.06,eq=gamma=1.03,colorbalance=rh=0.025:bh=-0.03:rm=0.004:bm=-0.006"),  # room: bed linen read blue
            (5.56, 8.92, "colorlevels=rimin=0.05:gimin=0.05:bimin=0.05,eq=gamma=1.04,colorbalance=rm=0.004:bm=-0.004"),  # Swadika
            (8.92, 11.0, "colorlevels=rimin=0.09:gimin=0.09:bimin=0.09:rimax=0.985:gimax=0.985:bimax=0.985,eq=gamma=1.02"),  # poolside at dusk
        ],
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
            (0.0, 9.45, "hqdn3d=3:2.5:5:4,curves=master='0/0 0.03/0.03 0.12/0.19 0.35/0.5 0.7/0.84 1/1'"),
        ],
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
    """The Manratan look on display-referred Rec.709 RGB in 0..1 (any shape ending in 3)."""
    from scipy.interpolate import PchipInterpolator

    lab = _to_oklab(rgb)
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]

    # 1. Contrast: a soft S on perceptual lightness. Blacks and whites stay where they are.
    curve = PchipInterpolator([0, 0.12, 0.35, 0.6, 0.85, 0.97, 1.0], [0, 0.095, 0.322, 0.615, 0.882, 0.978, 1.0])
    L2 = curve(np.clip(L, 0, 1))

    # 2. Colour by hue (OKLCh hue in degrees: red ~25, skin/orange ~55, yellow ~100, green ~140, turquoise ~200, blue ~260).
    C = np.hypot(a, b)
    h = np.degrees(np.arctan2(b, a)) % 360
    gain = (
        1.06
        + 0.07 * _bump(h, 20, 40)  # reds: velvet, roses, the canopy
        - 0.03 * _bump(h, 55, 25)  # skin: barely touched
        - 0.09 * _bump(h, 140, 55)  # greens: calmer, less video-green
        + 0.10 * _bump(h, 205, 45)  # turquoise: the pool
    )
    shift = -6 * _bump(h, 145, 45) - 7 * _bump(h, 255, 35)  # greens toward olive, blues toward turquoise
    # Chroma near white and black is mostly noise or cast, and colours that are already rich would clip: leave both alone.
    gain = 1 + (gain - 1) * _smoothstep(0.02, 0.2, L2) * (1 - _smoothstep(0.9, 1.0, L2)) * (1 - _smoothstep(0.1, 0.22, C))
    C2 = C * gain
    h2 = np.radians(h + shift)

    # 3. Split tone: warm shadows (but true black stays black), gold highlights (but white stays white).
    shadows = _smoothstep(0.0, 0.18, L2) * (1 - _smoothstep(0.18, 0.55, L2))
    highs = _smoothstep(0.55, 0.88, L2) * (1 - _smoothstep(0.9, 1.0, L2))
    ta = 0.0035 * shadows + 0.003 * highs
    tb = 0.007 * shadows + 0.0105 * highs

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
        fh.write('TITLE "Manratan look"\n')
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
    chain = []
    if graded:
        chain.append(f"lut3d=file='{LUT}':interp=tetrahedral")
    chain.append(f"scale={w}:{h}:flags=lanczos")
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
                vf = f"{bal},lut3d=file='{LUT}':interp=tetrahedral," + vf
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
