"""Prepare the opening 40 seconds of the supplied DJI film.

Usage: python scripts/media/prepare-first-light.py PATH_TO_DJI_MP4
Set FFMPEG to the encoder executable if it is not on PATH.
"""
import os
from pathlib import Path
import subprocess
import sys

if __name__ == "__main__":
    source = Path(sys.argv[1]).resolve(strict=True)
    output = Path(__file__).resolve().parents[2] / "public/media/first-light.mp4"
    subprocess.run([
        os.environ.get("FFMPEG", "ffmpeg"), "-y", "-v", "error", "-threads", "4",
        "-i", str(source), "-t", "40", "-map", "0:v:0",
        "-vf", "scale=1600:900:flags=lanczos,fps=30,eq=contrast=1.025:saturation=1.03:brightness=0.005,format=yuv420p",
        "-c:v", "libx264", "-threads", "4", "-preset", "fast", "-crf", "23",
        "-an", "-movflags", "+faststart", str(output),
    ], check=True)
