# Walkthrough revision — 16 November 2026

The website uses `walkthrough-v2.mp4` and `walkthrough-poster-v2.webp` so browsers load the revised film rather than the cached previous version. Chapter times are generated into `public/media/walkthrough.json` by `scripts/media/render-films.py`.

- First light: the opening 40 seconds of `DJI_20260910064633_0124_D.MP4`, gently adjusted for contrast and saturation; no audio.
- Reception and lobby: ZIP references 14, 13, 15, 16.
- Pool: supplied floating-breakfast photo, then ZIP reference 8 (overhead pool).
- Banquets: the supplied blue-carpet hall, projector meeting room, then black-and-gold table arrangement.
- Narsinghgarh: ZIP references 9, 10, 17, 11, 12, matching the reference board.
- Candlelight chapter is commented out in the render sequence.
- Night: the homepage slider's sources 4, 3, 1, mirrored 1, 6, 5.

Existing rooms, dining and Sky Lawn shots are retained. The Narsinghgarh film shortcut reads its chapter times from the generated metadata.

To prepare the opening clip, set `FFMPEG` if necessary and run `python scripts/media/prepare-first-light.py PATH_TO_DJI_MP4`. Then run `python scripts/media/render-films.py walkthrough` to regenerate the complete film, metadata and poster.
