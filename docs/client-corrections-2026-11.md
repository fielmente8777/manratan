# Manratan — client corrections, November 2026

## Colour grade v2 — 9 November 2026 (latest)

- **Both client clips regraded with a clearly visible look.** The 5 Nov grade was so gentle the difference was hard to see. Version 2 keeps the same two-pass method (per-shot balance, then one shared LUT) but is stronger: a filmic S-curve with soft highlight roll-off, champagne-gold highlights, rust-warm shadows, richer reds and gold, turquoise water, greens calmed toward olive, skin lifted slightly so faces stay bright, a soft vignette, and a gentle glow on the lights in the night film. Per-shot black/white points and casts were measured (0.3/99.7 percentile luma and near-neutral pixels over six frames per shot), not eyeballed.
- Sources: `IMG_5576.MP4` (the 1080×1920 original; `IMG_5576_1.mp4` sent on 9 Nov is a lower-quality 720p copy of the same edit) and `1000239934.mp4`.
- **Used on the website:** `walk.mp4` (1.2 MB) and `pool-dinner.mp4` (2.9 MB) with new posters; the walkthrough film re-rendered so its "Candlelight by the pool" chapter carries the same grade. The poolside film keeps its timing, slow motion and placement (homepage Events feature, Celebrations › Blue Diamond, the film).
- **The Manratan walk reel is shown on the preview again**, on the user's instruction of 9 Nov (it was held on 6 Nov pending Sumit's final edit). Hide it again by removing `<WalkReel />` from `Walkthrough()` in `src/app/(home)/sections.tsx`.
- The look is `scripts/media/manratan-look.cube` (now "Manratan look v2"; v1 is in git history). Editors can load it in Resolve, Premiere, Final Cut or CapCut after their own balance pass; vignette and glow are separate finishing steps. Before/after: `docs/media/grade-before-after.jpg`.
- QA: 209/209 checks pass (the film-playback check now waits up to 8 s for buffering).

## Client feedback — 6 November 2026

### Implemented on staging, photography untouched
- Home room rail and /accommodation listing now lead with the **Executive Suite**, followed by Premium, Executive Family, Interconnected and Deluxe; existing room URL IDs are preserved. Related-room cards follow the same sequence.
- The two oversized Pooja Room / Parlour Room hero cards were removed. The amenities section is now a standard compact, equal-sized grid; a small Pooja/Parlour mention appears next to the accommodation rail.
- **The model walk reel is temporarily hidden, not deleted**. The client says its version is not the finalized walkthrough; do not republish it until Sumit's approved inspiration / final edit is obtained. The main property walkthrough remains available. *(9 Nov: shown again on the preview at the user's request; see above.)*
- The existing separate poolside candlelight dinner / proposal video remains unchanged as the client likes it.
- All property photography and film source media are deliberately unchanged in this round.

### Pending client input / media production
- Final approved **model walkthrough reference** (Sumanth/Sumit presentation or the inspiration website); replace hidden reel only once approved.
- Licensed background music for the property walkthrough, and a refreshed edit if the client specifies one. Do not represent the current silent slideshow as the approved final film.
- Final corrected photographs for exterior by night, the fort and drone views, edited main building, the selected pool model shot and other approved imagery. **Do not make image replacements in this round**.
- Client edits/approval of all website copy. Editable content document: https://docs.google.com/document/d/1q5xucK8HHGxZKjDkqjKAXikAZJkbrL01GHHZXCcqdlU/edit
- Site advertises 65 rooms but current room-category counts add up to 63; seek property confirmation before changing factual copy.

### Release status
- Staging review only. **No production promotion until client approvals, final media and editorial sign-off.**

---


Branch: `fix/client-corrections-nov26` (based on `redesign/raffles-2026`, the version the client reviewed).
Nothing here is deployed to production. Vercel builds a preview for this branch on every push.

## How to check it

```bash
npm ci && npm run build && npx next start -p 3000
node scripts/qa/site-qa.cjs http://localhost:3000 qa-out          # 209 automated checks + screenshots
```

The QA script runs Chrome in the **Asia/Kolkata** time zone and never submits the enquiry form (that would send a real lead).

## Completion tracker

### Completed and verified (automated checks pass on desktop and phone)

| Area | What changed |
|---|---|
| Hero video on phones | It was switched off below 768 px, so phones only saw a still. Phones now get a portrait 720×1280 cut (`hero-loop-mobile.mp4`, 1.4 MB), started only after the page has loaded so it never delays the first paint; desktops keep 1280×720 (2.5 MB, was 3.0 MB). Muted + inline set as properties so iOS/Android autoplay; if autoplay is blocked (e.g. Low Power Mode) a Play button shows over the poster; a Pause/Play control is always present. Skipped for reduced-motion or data-saver users. |
| Booking widget | Separate **Check-in** and **Check-out** fields with labels, guests selector, nights count and range validation. "Check availability" opens the existing enquiry form pre-filled, which collects name/phone/email and posts to the same `nexon.eazotel.com` lead endpoint (the old hero form sent leads with no phone or email). |
| Date bug | Dates were converted with `toISOString()`, which in IST sent the previous day (a stay picked for 15 Nov was submitted as 14 Nov). Now local dates; verified 15→18 Nov arrive as 15 and 18 Nov. |
| Thank-you page | Successful enquiries opened `/thank-you/` in a new tab — the page didn't exist and the new tab is usually blocked. Added the page (no-index) and redirect in the same tab. |
| "Mini Kashmir of Malwa" | Corrected everywhere (home, about, blogs, landing page, SEO). Hero line: **Narsinghgarh — The Mini Kashmir of Malwa**. |
| Official tagline | **Where every heart finds its gem** (from *Manratan Brochure FINAL.pdf*) in the hero, page title, metadata and schema. |
| Narsinghgarh Fort first | The destination section now opens with the fort as a full-width feature with sourced facts (350 ft above the town, home of the rulers until 1962, 304 rooms / 4 halls / 12 courtyards / 64 verandahs). The "On the ridge above the town" caption and the 790 px "fort" image (not from the client's photo set) are gone. Jal Mandir is no longer the dominant image. |
| Attractions | Swarn Jain Temple removed. "Hilltop temple" label and photo removed (name unverified). "Old chhatri on the hills" renamed **Bara Khambha** per client (see review list). Added Baijnath Mahadeo Temple and verified Chidikho / Shyamji Sanka facts; travel distances from the brochure. |
| Gallery | Categories are deep-linkable (`/gallery?category=swimming-pool`); the homepage Pool tile now opens pool photos only. 8 categories (Swimming pool, Rooms, Dining, Banquet, Exteriors, Lobby, Lifestyle, Nearby attractions), each photo in exactly one, no repeats (48 photos). Lightbox: swipe on phones, keyboard, focus kept inside. |
| Banquet photos | Chair close-ups removed from the homepage and Celebrations page; a wide full-arrangement photo of Blue Sapphire added (Drive › Vanisha › Banquet Halls › `IMG_4301.jpg`). One table-setting detail kept at the end of the gallery. |
| Manratan by night | New full-facade night exterior (Drive › Night Photo › `WhatsApp Image 2026-08-03 at 15.48.26 (1).jpeg`) as a full-width "Manratan by night" band, in the gallery and as the film's final chapter, plus a blue-hour exterior. |
| Amenities | New homepage section: **Pooja Room** and **Parlour Room** highlighted, then pool, poolside candlelight dinners and proposals (client message 5 Nov), Swadika, banquet halls, Red Coral Lawn, Sky Lawn, rooms and in-room amenities. All from the brochure or the client. |
| Rooms | Each room's gallery shows only that room. Generic towel close-ups removed. Premium shows the sofa-cum-bed opened out. Portrait washroom photos shown whole instead of cropped. Room counts from the brochure (25/12/8/16/2). "Suite" renamed **Executive Suite** as in the brochure. |
| Venues | Capacities from the brochure: Blue Sapphire 300–400, Golden Sapphire 25–80 (projector provided), Blue Diamond poolside 300–400, Sky Lawn up to 20, Red Coral Lawn 500–4,000, Swadika 80–100. |
| Walkthrough film | Re-cut (72 s) with the Executive Suite, Premium sofa-cum-bed, Executive Family room, wide banquet, a real-footage chapter **Candlelight by the pool** (the client's drone clip) and the night exterior as the closing chapter. 12.1 MB. Chapters update automatically. |
| Client footage, colour graded | The two clips sent on 5 Nov are graded and on the site. **The Manratan walk** (`IMG_5576.MP4`, the 1080×1920 original; `IMG_5576_1.mp4` is a lower-quality copy of the same edit) plays as a vertical reel under the walkthrough film, with its four stops (Reception, a guest room, Swadika, Blue Diamond pool) highlighted as it plays and clickable. The **poolside candlelight dinner** drone clip (`1000239934.mp4`) plays at half speed (real slow motion from the 60 fps source) as a full-width feature in the homepage Events section with a "Plan a poolside dinner" enquiry button, as the Blue Diamond venue on the Celebrations page, and in the film. Both are muted (the walk's soundtrack isn't licensed to us), load only when scrolled near (nothing extra on first load), pause off-screen, have a Pause/Play control, and don't autoplay for reduced-motion visitors. walk.mp4 1.2 MB, pool-dinner.mp4 3.0 MB (regraded 9 Nov, see top). |
| SEO | New home title/description, hotel schema `slogan` and Pooja/Parlour amenities, cuisine corrected to Indian/multi-cuisine, room pages and Celebrations metadata updated. |
| Spelling | "Narasingarh" corrected to Narsinghgarh (the existing blog URL slug is left unchanged so links keep working). |

### Completed, awaiting client review

- **Bara Khambha** — the name the client gave. MP Tourism lists a pillared *Solah Khamba* in the sanctuary and no source names a Bara Khamba; please confirm the name and spelling.
- **Tagline wording** — the brochure prints "Where Every Hearts Finds Its Gem"; the site uses "Where every heart finds its gem".
- **Pooja Room / Parlour Room descriptions** — one line each; confirm the wording.
- **Copy** — About, Swadika, venues, room intros, amenities and destination text rewritten to the brochure and sourced facts.
- **Landing-page testimonials** — quotes mentioning "Kashmir of Malwa" were updated to "Mini"; confirm these are genuine guest quotes.
- **Colour grade** — two passes: a per-shot balance (black point, white balance — the room's bed linen read blue — exposure, and noise reduction plus a lift for the night drone shot), then one shared look for every clip: a gentle S-curve, warm-gold highlights with whites kept clean, warm shadows with true blacks, richer reds and turquoise water, calmer greens. The look is saved as `scripts/media/manratan-look.cube`, a standard LUT the editors can load in Resolve, Premiere, Final Cut or CapCut to grade the full-length clips the same way. Split-screen before/after: `docs/media/grade-before-after.jpg`. Strength is easy to change if the client wants it warmer or more neutral. *(Superseded by the stronger v2 grade on 9 Nov.)*
- **Burned-in logo on the walk** — the client's edit carries the Manratan logo top-right; it is kept (the Pause control sits top-left to stay clear of it).
- **Photo processing** — the night exterior (gentle shadow lift, levels, light sharpening) and the banquet wide (levels, slight warmth, sharpening) were resized and adjusted only; no retouching, perspective correction or sky replacement.

### Blocked by a missing asset or access

| Item | What's needed |
|---|---|
| Genuine photo of Narsinghgarh Fort | Drive › Manratan Resort › Vanisha › Narsinghgarh holds 5 drone shots (`DJI_20260912084912_0318_D.JPG`, `…102852_0322`, `…105045_0332`, `…114700_0341`, `…115300_0347`), 17–28 MB each; the Drive connector stops at 10 MB. A web-size export of the one showing the fort drops straight into `fort.image` in `src/data/site.ts`. |
| "Narsinghgarh from the Fort" photo | No photo confirmed as taken from the fort. |
| Client-approved food photos | The Swadika folder has room shots only; no plated food. |
| Additional pool photo | Vanisha › Pool contains only a vertical story collage. |
| Licensed music for the walkthrough | Needs a track the resort holds a licence for. Then: `python3 scripts/media/render-films.py walkthrough --music track.mp3`. |
| More real footage | Two clips received and used (above). The Drive "Color Grade" folder (`Resturant.mp4` 495 MB, `lobby.mp4` 226 MB, `Banquet 1–3`, `Room1–4`, `Reception.mp4`, `welcome.mp4` 982 MB) is still out of reach: Drive won't hand over files that size here. Sending them in chat (as with `IMG_5576.MP4`), or 1080p exports under ~100 MB, lets the rest of the film move from photographs to footage with the same grade. |
| Approved design / Sumit's walkthrough presentation | Not found in Drive. Needed to check layouts against the approved concept. |
| "Sona Kunch" | No source found; not used anywhere. |
| Night drone exteriors | Drive › Vanisha › Building Structure (`DJI_20260911213815…` to `…220006`), 13–17 MB; better than the phone photo now used. |
| Photos of the Pooja Room, Parlour Room and Red Coral Lawn | None in Drive; these show as text/icons. |

### Not yet completed

- Production deploy (needs approval).
- Real-device test on iPhone Safari (tested in Chrome with iPhone emulation only).
- Full rewrite of the six journal articles (only terminology corrected).

## Performance (Lighthouse 12, mobile, median of 3 runs on a local production build)

| | Before | After |
|---|---|---|
| Performance | 84 | 86 |
| Accessibility | 91 | 96 |
| Best practices / SEO | 100 / 100 | 100 / 100 |
| Largest contentful paint | 4.4 s | 3.8 s |
| Total blocking time | 123 ms | 153 ms |
| Layout shift | 0 | 0 |
| Page weight | 0.7 MB | 2.2 MB (the phone video, loaded after the page is ready) |

Re-measured on 5 Nov after adding the graded footage, side by side with the previous build (5 runs each, same machine, which was busier than for the table above): performance 83 vs 81, LCP 4.5 s vs 4.8 s, page weight 2.1 MB vs 2.2 MB. The new clips and their posters are not downloaded until a visitor scrolls near them.

## Re-rendering media

- Photos: `python3 scripts/media/process-photos.py SOURCE KEY [--lift 0.12] [--warm 0.02]` → `public/media/KEY.webp` + manifest entry.
- Films: `python3 scripts/media/render-films.py hero|walkthrough [--music licensed.mp3]`. Shot lists are at the top of the script; a shot can be a stretch of graded footage (`("clip:pool-dinner", start, seconds)`).
- Footage: `python3 scripts/media/grade-footage.py walk|pool-dinner SOURCE.mp4` grades and encodes `public/media/NAME.mp4` + poster; `compare walk SOURCE OUT_DIR` writes before/after stills; `lut` rebuilds the `.cube`. Per-shot balance settings are in `CLIPS` at the top of the script. Re-render the walkthrough after changing `pool-dinner`.

## Sources for destination facts

- Rajgarh district (rajgarh.nic.in): Chidikho (1978, 57.197 sq km), Baijnath Mahadeo temple, Shyamji Sanka temple.
- Wikipedia, *Narsinghgarh, Madhya Pradesh*: fort 350 ft above the town, rulers there until 1962, 304 rooms / 4 halls / 12 chowks / 64 verandahs, Paras Ram Sagar.
- MP Tourism, *Narsinghgarh Fort and Deogarh Fort*: fort built 1681 by Paras Ram, Jal Mandir in Paras Ram Sagar, Solah Khamba.
- *Manratan Brochure FINAL.pdf* (Drive): tagline, room counts, venue capacities, Pooja/Parlour rooms, distances.
