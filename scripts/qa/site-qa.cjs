/* Manratan site QA: functional checks + screenshots.
 *
 *   node scripts/qa/site-qa.cjs http://localhost:3000 OUT_DIR [--before http://localhost:3001]
 *
 * Needs Playwright and Google Chrome (H.264 playback). Runs in the Asia/Kolkata time zone so
 * date-handling bugs that only appear east of UTC are caught. Never submits the enquiry form
 * (that would send a real lead to the reservations team).
 */
const fs = require("fs");
const path = require("path");
let pw;
try {
  pw = require("playwright");
} catch {
  pw = require("/opt/npm-tools/node_modules/playwright");
}
const { chromium, devices } = pw;

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || "qa-out";
const BEFORE = process.argv.includes("--before") ? process.argv[process.argv.indexOf("--before") + 1] : null;
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

const ROUTES = [
  "/",
  "/about",
  "/accommodation",
  "/accommodation/room-1",
  "/accommodation/room-2",
  "/accommodation/room-3",
  "/accommodation/room-4",
  "/accommodation/room-5",
  "/events",
  "/gallery",
  "/gallery?category=swimming-pool",
  "/contactus",
  "/blogs",
  "/blogs/discovering-narasingarh-hidden-gem-malwa",
  "/thank-you",
  "/landing-page",
];

const desktop = { viewport: { width: 1440, height: 900 }, timezoneId: "Asia/Kolkata", locale: "en-IN" };
const mobile = { ...devices["iPhone 13"], timezoneId: "Asia/Kolkata", locale: "en-IN" };

async function settle(page) {
  // Scroll through the page so lazy images load, then return to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle").catch(() => {});
}

async function pageAudit(browser, label, ctxOpts) {
  const ctx = await browser.newContext(ctxOpts);
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    const bad = [];
    page.on("pageerror", (e) => errors.push(e.message.slice(0, 120)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
    page.on("response", (r) => {
      const u = r.url();
      if (r.status() >= 400 && u.startsWith(BASE)) bad.push(`${r.status()} ${u.replace(BASE, "")}`);
    });
    const res = await page.goto(BASE + route, { waitUntil: "load" });
    await settle(page);
    const broken = await page.evaluate(() =>
      [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.currentSrc || i.src),
    );
    const text = await page.evaluate(() => document.body.innerText);
    const bareKashmir = /(?<!Mini )(?<!MINI )Kashmir of Malwa/i.test(text);
    check(`${label} ${route} loads`, res && res.status() < 400, res ? String(res.status()) : "no response");
    check(`${label} ${route} no broken images or 4xx`, broken.length === 0 && bad.length === 0, [...broken, ...bad].slice(0, 4).join(", "));
    check(`${label} ${route} no console errors`, errors.length === 0, errors.slice(0, 2).join(" | "));
    check(`${label} ${route} says "Mini Kashmir"`, !bareKashmir);
    await page.close();
  }
  await ctx.close();
}

async function bookingFlow(browser, label, ctxOpts) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(2000);
  const bar = page.locator("form[aria-label='Check availability']");
  check(`${label} booking: check-in field visible`, await bar.getByRole("button", { name: /Check-in/ }).isVisible());
  check(`${label} booking: check-out field visible`, await bar.getByRole("button", { name: /Check-out/ }).isVisible());

  await bar.getByRole("button", { name: "Check availability" }).click();
  check(`${label} booking: asks for dates when empty`, await page.getByText("Choose a check-in date.").isVisible());

  await bar.getByRole("button", { name: /Check-in/ }).click();
  await page.waitForTimeout(300);
  const portal = await page.locator(".react-datepicker__portal").count();
  if (label === "mobile") check("mobile booking: calendar opens as a full-screen sheet", portal > 0);
  await page.screenshot({ path: path.join(OUT, `${label}-booking-calendar.png`) });
  const days = page.locator(".react-datepicker__day:not(.react-datepicker__day--disabled):not(.react-datepicker__day--outside-month)");
  const inDay = days.nth(10);
  const inLabel = await inDay.getAttribute("aria-label");
  await inDay.click();
  await page.waitForTimeout(500);
  const outOpen = await page.locator(".react-datepicker").first().isVisible();
  check(`${label} booking: check-out calendar opens after check-in`, outOpen);
  const days2 = page.locator(".react-datepicker__day:not(.react-datepicker__day--disabled):not(.react-datepicker__day--outside-month)");
  const outDay = days2.nth(2);
  const outLabel = await outDay.getAttribute("aria-label");
  await outDay.click();
  await page.waitForTimeout(300);
  const outBtnText = await bar.getByRole("button", { name: /Check-out/ }).innerText();
  check(`${label} booking: shows number of nights`, /night/.test(outBtnText), outBtnText.replace(/\s+/g, " "));
  await page.screenshot({ path: path.join(OUT, `${label}-booking-filled.png`) });

  await bar.getByRole("button", { name: "Check availability" }).click();
  await page.waitForTimeout(600);
  const dialogVisible = await page.getByText("Check availability", { exact: true }).last().isVisible();
  check(`${label} booking: opens the enquiry form`, dialogVisible);
  const inVal = await page.locator("input[placeholder='Check-in']").inputValue();
  const outVal = await page.locator("input[placeholder='Check-out']").inputValue();
  // aria-label looks like "Choose Tuesday, November 17th, 2026"; compare day numbers.
  const dayNum = (s) => (s.match(/(\d+)(st|nd|rd|th)/) || [])[1];
  check(
    `${label} booking: enquiry form has the same dates (no IST off-by-one)`,
    dayNum(inLabel) === inVal.split(" ")[0] && dayNum(outLabel) === outVal.split(" ")[0],
    `${inLabel} → "${inVal}", ${outLabel} → "${outVal}"`,
  );
  check(`${label} booking: guests carried over`, await page.getByText(/Guests: 2 adults/).isVisible());
  await page.screenshot({ path: path.join(OUT, `${label}-enquiry-prefilled.png`) });
  await ctx.close();
}

async function heroVideo(browser, label, ctxOpts, expect) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(4500);
  const v = await page.evaluate(() => {
    const el = document.querySelector("section[aria-label='Welcome to Manratan Resort'] video");
    return el ? { src: el.currentSrc, paused: el.paused, t: el.currentTime, muted: el.muted, inline: el.playsInline } : null;
  });
  check(`${label} hero video present`, !!v);
  if (v) {
    check(`${label} hero video uses ${expect}`, v.src.endsWith(expect), v.src);
    check(`${label} hero video is playing (muted, inline)`, !v.paused && v.t > 0.5 && v.muted && v.inline, `t=${v.t.toFixed(1)}s paused=${v.paused}`);
  }
  await page.screenshot({ path: path.join(OUT, `${label}-hero.png`) });
  const txt = await page.locator("section[aria-label='Welcome to Manratan Resort']").innerText();
  check(`${label} hero shows the official tagline`, /Where every heart finds its gem/i.test(txt));
  check(`${label} hero shows "Narsinghgarh — The Mini Kashmir of Malwa"`, /Narsinghgarh — The Mini Kashmir of Malwa/i.test(txt));
  await ctx.close();
}

async function galleryChecks(browser) {
  const ctx = await browser.newContext(desktop);
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  const href = await page.locator("a", { hasText: "Pool" }).first().getAttribute("href");
  check("home Pool tile links to the pool gallery", href === "/gallery?category=swimming-pool", href);
  await page.locator(`a[href='/gallery?category=swimming-pool']`).first().click();
  await page.waitForURL(/gallery\?category=swimming-pool/);
  await page.waitForTimeout(800);
  const sel = await page.locator("[role=tab][aria-selected=true]").innerText();
  check("Pool tile opens with the Swimming pool tab selected", /Swimming pool/i.test(sel), sel.replace(/\s+/g, " "));

  const slugs = ["swimming-pool", "rooms", "dining", "banquet", "exteriors", "lobby", "lifestyle", "nearby-attractions"];
  const seen = new Set();
  for (const slug of slugs) {
    await page.goto(`${BASE}/gallery?category=${slug}`, { waitUntil: "load" });
    await page.waitForTimeout(500);
    const n = await page.locator("#gallery-grid > button").count();
    // Walk the lightbox through every photo and read its category label.
    await page.locator("#gallery-grid > button").first().click();
    const cats = new Set();
    for (let i = 0; i < n; i++) {
      cats.add((await page.locator("[role=dialog] p span").last().innerText()).trim().toLowerCase());
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(60);
    }
    await page.keyboard.press("Escape");
    const srcs = await page.locator("#gallery-grid img").evaluateAll((els) => els.map((e) => e.getAttribute("src")));
    srcs.forEach((s) => seen.add(`${slug}:${s}`));
    check(`gallery ${slug}: ${n} photos, all in that category`, n > 0 && cats.size === 1, [...cats].join(", "));
    if (slug === "swimming-pool") await page.screenshot({ path: path.join(OUT, "gallery-pool.png"), fullPage: false });
  }
  await page.goto(`${BASE}/gallery`, { waitUntil: "load" });
  const all = await page.locator("#gallery-grid img").evaluateAll((els) => els.map((e) => decodeURIComponent(e.getAttribute("src") || "").replace(/.*url=([^&]+).*/, "$1")));
  check("gallery: no photo repeated", new Set(all).size === all.length, `${all.length} photos`);
  await ctx.close();
}

async function contentChecks(browser) {
  const ctx = await browser.newContext(desktop);
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  const nearby = page.locator("#nearby");
  await nearby.scrollIntoViewIfNeeded();
  const h3s = await nearby.locator("h3").allInnerTexts();
  check("Narsinghgarh Fort is the first attraction", /^Narsinghgarh Fort$/i.test(h3s[0]), h3s.join(" | "));
  const body = await page.evaluate(() => document.body.innerText);
  check('no "Swarn Jain Temple"', !/Swarn Jain/i.test(body));
  check('no "Hilltop temple" label', !/Hilltop temple/i.test(body));
  check('no "Gold Chhatri" / "chhatri on the hills"', !/gold chhatri|chhatri on the hills/i.test(body));
  check('no "On the ridge above the town" caption', !/On the ridge above the town/i.test(body));
  const am = await page.locator("#amenities").innerText();
  check("Amenities section highlights Pooja Room and Parlour Room", /Pooja Room/i.test(am) && /Parlour Room/i.test(am));
  check("Amenities mention poolside candlelight dinners", /candlelight/i.test(am));
  check("Manratan by night band present", await page.getByText("Manratan by night", { exact: true }).first().isVisible());

  // Walkthrough film plays and the night chapter seeks to the exterior.
  const walk = page.locator("#walkthrough");
  await walk.scrollIntoViewIfNeeded();
  await walk.getByRole("button", { name: /Play the walkthrough/ }).click();
  await page.waitForTimeout(3000);
  let w = await walk.locator("video").evaluate((v) => ({ t: v.currentTime, paused: v.paused, w: v.videoWidth }));
  check("walkthrough plays", !w.paused && w.t > 1, `t=${w.t.toFixed(1)} width=${w.w}`);
  await walk.getByRole("button", { name: /Manratan by night/ }).click();
  await page.waitForTimeout(1500);
  w = await walk.locator("video").evaluate((v) => ({ t: v.currentTime }));
  check("walkthrough chapter 'Manratan by night' seeks", w.t > 58, `t=${w.t.toFixed(1)}`);
  await walk.screenshot({ path: path.join(OUT, "walkthrough-night-chapter.png") });

  for (const [id, prefix] of [["room-1", "deluxe"], ["room-2", "inter"], ["room-3", "executive"], ["room-4", "premium"], ["room-5", "suite"]]) {
    await page.goto(`${BASE}/accommodation/${id}`, { waitUntil: "load" });
    const srcs = await page.locator(".swiper img").evaluateAll((els) => els.map((e) => decodeURIComponent(e.getAttribute("src") || "")));
    const off = srcs.filter((s) => !s.includes(`/media/${prefix}`));
    check(`${id} gallery shows only ${prefix} photos`, srcs.length > 0 && off.length === 0, off.join(", "));
  }
  await page.goto(`${BASE}/events`, { waitUntil: "load" });
  const ev = await page.evaluate(() => document.body.innerText);
  check("events: brochure capacities shown", /300–400 guests/i.test(ev) && /25–80 guests/i.test(ev) && /500–4,000 guests/i.test(ev));
  const evImgs = await page.locator("img").evaluateAll((els) => els.map((e) => decodeURIComponent(e.getAttribute("src") || "")).join(" "));
  check("events: no chair close-up photos", !/blue-sapphire-detail|blue-sapphire-tables/.test(evImgs));
  await page.goto(`${BASE}/thank-you`, { waitUntil: "load" });
  const robots = await page.locator("meta[name=robots]").getAttribute("content");
  check("thank-you page exists and is noindex", /noindex/.test(robots || ""), robots);
  await ctx.close();
}

async function shots(browser, base, tag) {
  const specs = [
    ["desktop", desktop],
    ["mobile", mobile],
  ];
  for (const [d, opts] of specs) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await page.goto(base + "/", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    await page.screenshot({ path: path.join(OUT, `${tag}-${d}-1-hero.png`) });
    await settle(page);
    const sections = [
      ["2-nearby", "#nearby"],
      ["3-evening", "text=The experience evolves with the light"],
      ["4-amenities", "#amenities"],
    ];
    for (const [name, sel] of sections) {
      let loc = page.locator(sel).first();
      if (!(await loc.count())) continue;
      if (sel.startsWith("text=")) loc = loc.locator("xpath=ancestor::section[1]");
      await loc.scrollIntoViewIfNeeded();
      await loc.evaluate((el) =>
        Promise.all([...el.querySelectorAll("img")].map((i) => (i.loading = "eager", i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })))),
      );
      await page.waitForTimeout(700);
      await loc.screenshot({ path: path.join(OUT, `${tag}-${d}-${name}.png`) }).catch(() => {});
    }
    await page.goto(base + "/events", { waitUntil: "load" });
    await settle(page);
    const venues = page.locator("[aria-labelledby=venues-title]");
    await venues.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await venues.screenshot({ path: path.join(OUT, `${tag}-${d}-5-venues.png`) }).catch(() => {});
    await ctx.close();
  }
}

(async () => {
  const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
  await heroVideo(browser, "desktop", desktop, "/media/hero-loop.mp4");
  await heroVideo(browser, "mobile", mobile, "/media/hero-loop-mobile.mp4");
  await bookingFlow(browser, "desktop", desktop);
  await bookingFlow(browser, "mobile", mobile);
  await galleryChecks(browser);
  await contentChecks(browser);
  await pageAudit(browser, "desktop", desktop);
  await pageAudit(browser, "mobile", mobile);
  await shots(browser, BASE, "after");
  if (BEFORE) await shots(browser, BEFORE, "before");
  await browser.close();
  fs.writeFileSync(path.join(OUT, "qa-results.json"), JSON.stringify(results, null, 2));
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  process.exitCode = failed.length ? 1 : 0;
})();
