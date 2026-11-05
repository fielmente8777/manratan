# Manratan — client corrections, November 2026

Branch: `fix/client-corrections-nov26` (based on `redesign/raffles-2026`, the version the client reviewed).
Nothing here is deployed to production. Vercel builds a preview for this branch on every push.

## How to check it

```bash
npm ci && npm run build && npx next start -p 3000
node scripts/qa/site-qa.cjs http://localhost:3000 qa-out          # 184 automated checks + screenshots
```

The QA script runs Chrome in the **Asia/Kolkata** time zone and never submits the enquiry form (that would send a real lead).

## Completion tracker

### Completed and verified (automated checks pass on desktop and phone)

| Area | What changed |
|---|---|
| Hero video on phones | It was switched off below 768 px, so phones only saw a still. Phones now get a portrait 720×1280 cut (`hero-loop-mobile.mp4`, 1.8 MB); desktops keep 1280×720 (2.5 MB, was 3.0 MB). Muted + inline set as properties so iOS/Android autoplay; if autoplay is blocked (e.g. Low Power Mode) a Play button shows over the poster; a Pause/Play control is always present. Skipped for reduced-motion or data-saver users. |
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
| Walkthrough film | Re-cut (65 s) with the Executive Suite, Premium sofa-cum-bed, Executive Family room, wide banquet and the night exterior as the closing chapter. 11.1 MB (was 12.1 MB). Chapters update automatically. |
| SEO | New home title/description, hotel schema `slogan` and Pooja/Parlour amenities, cuisine corrected to Indian/multi-cuisine, room pages and Celebrations metadata updated. |
| Spelling | "Narasingarh" corrected to Narsinghgarh (the existing blog URL slug is left unchanged so links keep working). |

### Completed, awaiting client review

- **Bara Khambha** — the name the client gave. MP Tourism lists a pillared *Solah Khamba* in the sanctuary and no source names a Bara Khamba; please confirm the name and spelling.
- **Tagline wording** — the brochure prints "Where Every Hearts Finds Its Gem"; the site uses "Where every heart finds its gem".
- **Pooja Room / Parlour Room descriptions** — one line each; confirm the wording.
- **Copy** — About, Swadika, venues, room intros, amenities and destination text rewritten to the brochure and sourced facts.
- **Landing-page testimonials** — quotes mentioning "Kashmir of Malwa" were updated to "Mini"; confirm these are genuine guest quotes.
- **Photo processing** — the night exterior (gentle shadow lift, levels, light sharpening) and the banquet wide (levels, slight warmth, sharpening) were resized and adjusted only; no retouching, perspective correction or sky replacement.

### Blocked by a missing asset or access

| Item | What's needed |
|---|---|
| Genuine photo of Narsinghgarh Fort | Drive › Manratan Resort › Vanisha › Narsinghgarh holds 5 drone shots (`DJI_20260912084912_0318_D.JPG`, `…102852_0322`, `…105045_0332`, `…114700_0341`, `…115300_0347`), 17–28 MB each; the Drive connector stops at 10 MB. A web-size export of the one showing the fort drops straight into `fort.image` in `src/data/site.ts`. |
| "Narsinghgarh from the Fort" photo | No photo confirmed as taken from the fort. |
| Client-approved food photos | The Swadika folder has room shots only; no plated food. |
| Additional pool photo | Vanisha › Pool contains only a vertical story collage. |
| Licensed music for the walkthrough | Needs a track the resort holds a licence for. Then: `python3 scripts/media/render-films.py walkthrough --music track.mp3`. |
| Real walkthrough footage | The Video folders hold 130 MB–1 GB raw clips; the film is still built from the edited photographs. |
| Approved design / Sumit's walkthrough presentation | Not found in Drive. Needed to check layouts against the approved concept. |
| "Sona Kunch" | No source found; not used anywhere. |
| Night drone exteriors | Drive › Vanisha › Building Structure (`DJI_20260911213815…` to `…220006`), 13–17 MB; better than the phone photo now used. |
| Photos of the Pooja Room, Parlour Room and Red Coral Lawn | None in Drive; these show as text/icons. |

### Not yet completed

- Production deploy (needs approval).
- Real-device test on iPhone Safari (tested in Chrome with iPhone emulation only).
- Full rewrite of the six journal articles (only terminology corrected).

## Re-rendering media

- Photos: `python3 scripts/media/process-photos.py SOURCE KEY [--lift 0.12] [--warm 0.02]` → `public/media/KEY.webp` + manifest entry.
- Films: `python3 scripts/media/render-films.py hero|walkthrough [--music licensed.mp3]`. Shot lists are at the top of the script.

## Sources for destination facts

- Rajgarh district (rajgarh.nic.in): Chidikho (1978, 57.197 sq km), Baijnath Mahadeo temple, Shyamji Sanka temple.
- Wikipedia, *Narsinghgarh, Madhya Pradesh*: fort 350 ft above the town, rulers there until 1962, 304 rooms / 4 halls / 12 chowks / 64 verandahs, Paras Ram Sagar.
- MP Tourism, *Narsinghgarh Fort and Deogarh Fort*: fort built 1681 by Paras Ram, Jal Mandir in Paras Ram Sagar, Solah Khamba.
- *Manratan Brochure FINAL.pdf* (Drive): tagline, room counts, venue capacities, Pooja/Parlour rooms, distances.
