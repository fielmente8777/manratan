"""Prepare supplied photographs for the web.

Usage:
    python3 scripts/media/process-photos.py SOURCE KEY [--max 2560] [--lift 0.0] [--warm 0.0]

Writes public/media/KEY.webp and records its size in src/data/media-manifest.json.

What it does, and only this:
  * honours EXIF orientation, converts to sRGB 8-bit
  * preserves more resolution: long edge at most --max pixels (Lanczos)
  * optional gentle shadow lift (--lift, 0..0.3) for dark night frames
  * optional white-balance nudge (--warm, -0.1..0.1; negative cools)
  * light auto-levels (clips 0.3% at each end) and a mild unsharp mask
  * saves WebP quality 90 with no intermediate lossy re-encoding

No retouching, sky replacement or object removal is done here.
"""

import argparse
import json
import os

from PIL import Image, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MEDIA = os.path.join(ROOT, "public", "media")
MANIFEST = os.path.join(ROOT, "src", "data", "media-manifest.json")


def lift_shadows(im: Image.Image, amount: float) -> Image.Image:
    if amount <= 0:
        return im
    # Curve that raises dark tones and leaves highlights alone.
    lut = []
    for i in range(256):
        x = i / 255
        y = x + amount * x * (1 - x) ** 2 * 4
        lut.append(max(0, min(255, round(y * 255))))
    return im.point(lut * 3)


def warm(im: Image.Image, amount: float) -> Image.Image:
    if amount == 0:
        return im
    r, g, b = im.split()
    r = r.point(lambda v: max(0, min(255, round(v * (1 + amount)))))
    b = b.point(lambda v: max(0, min(255, round(v * (1 - amount)))))
    return Image.merge("RGB", (r, g, b))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("key")
    ap.add_argument("--max", type=int, default=2560)
    ap.add_argument("--lift", type=float, default=0.0)
    ap.add_argument("--warm", type=float, default=0.0)
    ap.add_argument("--crop", type=str, default="", help="left,top,right,bottom as fractions 0..1")
    a = ap.parse_args()

    im = ImageOps.exif_transpose(Image.open(a.source)).convert("RGB")
    if a.crop:
        l, t, r, b = (float(v) for v in a.crop.split(","))
        w, h = im.size
        im = im.crop((round(l * w), round(t * h), round(r * w), round(b * h)))
    scale = min(1.0, a.max / max(im.size))
    if scale < 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    im = lift_shadows(im, a.lift)
    im = warm(im, a.warm)
    im = ImageOps.autocontrast(im, cutoff=0.3)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=45, threshold=3))

    out = os.path.join(MEDIA, f"{a.key}.webp")
    im.save(out, "WEBP", quality=90, method=6)

    with open(MANIFEST) as fh:
        manifest = json.load(fh)
    manifest[a.key] = [im.width, im.height]
    with open(MANIFEST, "w") as fh:
        json.dump(dict(sorted(manifest.items())), fh, indent=0)
        fh.write("\n")
    print(out, im.size, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    main()
