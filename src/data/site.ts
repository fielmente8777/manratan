import manifest from "./media-manifest.json";
import film from "../../public/media/walkthrough.json";
import { contact } from "@/utils/constent";

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

export type MediaKey = keyof typeof manifest;

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** One photo from /public/media, with its real dimensions. */
export const photo = (key: MediaKey, alt: string): Photo => {
  const dimensions = manifest[key];
  if (!dimensions) {
    throw new Error(`Missing dimensions for media "${key}". Add this image to src/data/media-manifest.json.`);
  }
  const [width, height] = dimensions;
  return { src: `/media/${key}.webp`, width, height, alt };
};

export const video = {
  /** 1280x720 loop for laptops and tablets in landscape. */
  heroLoop: "/media/hero-loop.mp4",
  /** 720x1280 portrait cut of the same loop for phones. */
  heroLoopMobile: "/media/hero-loop-mobile.mp4",
  walkthrough: "/media/walkthrough-v2.mp4?v=3",
  poster: "/final-view/first-light1.webp",
  /** The model walk (client footage IMG_5576.MP4): reception, a guest room, Swadika, the pool. 720x1280, graded, muted. */
  walk: "/media/walk.mp4",
  walkPoster: "/media/walk-poster.webp",
  /** Drone pull-back from a candlelit table to the whole Blue Diamond pool at night (client footage 1000239934.mp4), half speed, graded. */
  poolDinner: "/media/pool-dinner.mp4",
  poolDinnerPoster: "/media/pool-dinner-poster.webp",
};

/** Where the model walk goes, in seconds of walk.mp4 (cut points of the source edit). */
export const walkStops = [
  { title: "Reception", start: 0 },
  { title: "A guest room", start: 2.96 },
  { title: "Swadika", start: 5.48 },
  { title: "Blue Diamond pool", start: 8.84 },
];

export const walkthrough = film as {
  duration: number;
  chapters: { title: string; start: number }[];
};

/* ------------------------------------------------------------------ */
/* Resort facts                                                        */
/* Sources: Manratan Brochure FINAL (Drive), client feedback Nov 2026. */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Manratan Resort",
  place: "Narsinghgarh, Madhya Pradesh",
  short: "Narsinghgarh, MP",
  /** Official line from the brochure ("Where every heart finds its gem"). */
  tagline: "Where every heart finds its gem",
  /** Destination positioning, always with "Mini". */
  destination: "Narsinghgarh — The Mini Kashmir of Malwa",
  url: "https://manratanresort.com",
  contact,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
};

export const navLinks = [
  { label: "Home", href: "/", image: photo("facade-dusk", "Manratan Resort at dusk") },
  { label: "Our story", href: "/our-story", image: photo("lobby-monogram", "The Manratan lobby") },
  { label: "Rooms & suites", href: "/rooms-&-suites", image: photo("suite-1", "Executive Suite with a view of the hills") },
  { label: "Weddings & Events", href: "/weddings-&-events", image: photo("blue-sapphire-full", "Blue Sapphire banquet hall set for a celebration") },
  { label: "Gallery", href: "/gallery", image: photo("pool-dusk", "Blue Diamond pool from above") },
  { label: "Journal", href: "/journal", image: photo("ngh-lake-temple", "Jal Mandir on Paras Ram Sagar, Narsinghgarh") },
  { label: "Contact Us", href: "/contact-us", image: photo("reception-welcome", "Reception team welcome") },
];

/* ------------------------------------------------------------------ */
/* Rooms (types and counts from the brochure)                          */
/* ------------------------------------------------------------------ */

export interface Room {
  id: string;
  slug: string;
  focus?: string;
  name: string;
  count: number;
  specs: string[];
  summary: string;
  intro: string;
  cover: Photo;
  hero: Photo;
  gallery: Photo[];
  amenities: string[];
  meta: { title: string; description: string; keywords: string[] };
}

export const rooms: Room[] = [
  {
    id: "room-1",
    slug: "deluxe-room",
    focus: "5% 50%",
    name: "Deluxe Room",
    count: 25,
    specs: ["Twin or double bed", "Garden view"],
    summary: "Calm, warm-lit rooms looking out over the gardens.",
    intro:
      "Warm wood, soft lighting and fresh linen, with a writing desk and a garden view. A comfortable base for a family visit or a wedding weekend.",
    cover: { src: "/final-view/Deluxe-room1_11zon.webp", width: 6240, height: 3512, alt: "Deluxe Room with double bed, warm-lit curtains and a writing desk" },
    hero: { src: "/final-view/Deluxe-room1_11zon.webp", width: 6240, height: 3512, alt: "Deluxe Room at Manratan Resort" },
    gallery: [
      { src: "/final-view/Deluxe-room1_11zon.webp", width: 6240, height: 3512, alt: "Deluxe Room with double bed, writing desk and wall-mounted TV" },
      { src: "/final-view/Deluxe-room2_11zon.webp", width: 6240, height: 3512, alt: "Deluxe Room with armchair and bedside table" },
      { src: "/final-view/Deluxe-room3_11zon.webp", width: 6240, height: 3512, alt: "Deluxe Room spacious layout" },
      { src: "/final-view/Deluxe-room4_11zon.webp", width: 6240, height: 3512, alt: "Deluxe Room comfortable seating and natural lighting" },
      { src: "/final-view/Deluxe-room5_11zon.webp", width: 3512, height: 6240, alt: "Deluxe Room amenities and details" },
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Air conditioning", "Tea & coffee maker", "Luxury toiletries"],
    meta: {
      title: "Deluxe Room | Manratan Resort, Narsinghgarh",
      description: "Garden-view Deluxe Room with twin or double bed at Manratan Resort, Narsinghgarh, Madhya Pradesh.",
      keywords: ["Manratan Resort", "Deluxe Room", "Garden view room", "Narsinghgarh resort"],
    },
  },
  {
    id: "room-2",
    slug: "deluxe-interconnected-room",
    name: "Deluxe Interconnected Room",
    count: 12,
    specs: ["Two connected rooms", "Pool & garden view"],
    summary: "Two rooms behind one door, for families travelling together.",
    intro:
      "Two bedrooms joined by a connecting door, so a family or a group of friends can have their own space and still be together.",
    cover: { src: "/final-view/Inter-room1_11zon.webp", width: 4032, height: 2268, alt: "Deluxe Interconnected Room with two connected bedrooms" },
    hero: { src: "/final-view/Inter-room1_11zon.webp", width: 4032, height: 2268, alt: "Deluxe Interconnected Room at Manratan Resort" },
    gallery: [
      { src: "/final-view/Inter-room1_11zon.webp", width: 4032, height: 2268, alt: "Two bedrooms joined by a connecting door" },
      { src: "/final-view/Inter-room2_11zon.webp", width: 4032, height: 2268, alt: "Interconnected room bed with window light" },
      { src: "/final-view/Inter-room4_11zon.webp", width: 6240, height: 3512, alt: "Interconnected room comfortable family setup" },
      { src: "/harsh-interconnected.jpg", width: 1672, height: 941, alt: "Deluxe Interconnected Room connected suite view" },
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Interconnected rooms", "Air conditioning", "Tea & coffee maker"],
    meta: {
      title: "Deluxe Interconnected Room | Manratan Resort",
      description: "Two connected bedrooms for families and groups at Manratan Resort, Narsinghgarh.",
      keywords: ["Manratan Resort", "Interconnected room", "Family room Narsinghgarh"],
    },
  },
  {
    id: "room-3",
    slug: "executive-family-room",
    name: "Executive Family Room",
    count: 8,
    specs: ["Twin beds", "Pool view"],
    summary: "Room for the whole family, with a view of the pool.",
    intro: "A larger room for families, with two beds, a seating corner, a work desk and a dark-marble bathroom.",
    cover: { src: "/harsh-executive-family.jpg", width: 1672, height: 941, alt: "Executive Family Room spacious living view" },
    hero: { src: "/final-view/Executive-banner_11zon.webp", width: 6240, height: 3512, alt: "Executive Family Room at Manratan Resort" },
    gallery: [
      { src: "/final-view/Executive-room4_11zon.webp", width: 6240, height: 3512, alt: "Executive Family Room work desk" },
      { src: "/harsh-executive-family.jpg", width: 1672, height: 941, alt: "Executive Family Room spacious living view" },
      { src: "/harsh-executive-family2.jpg", width: 1672, height: 941, alt: "Executive Family Room comfortable interior setup" },
      { src: "/harsh-executive-family3.jpg", width: 1672, height: 941, alt: "Executive Family Room ambient lighting and styling" },
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Pool view", "Air conditioning", "Tea & coffee maker"],
    meta: {
      title: "Executive Family Room | Manratan Resort",
      description: "Pool-view Executive Family Room with twin beds at Manratan Resort, Narsinghgarh.",
      keywords: ["Manratan Resort", "Executive room", "Family room", "Pool view room"],
    },
  },
  {
    id: "room-4",
    slug: "premium-room",
    name: "Premium Room",
    count: 16,
    specs: ["King bed", "Sofa-cum-bed", "Nature view"],
    summary: "A king bed, a sofa-cum-bed by the window and the hills beyond.",
    intro:
      "A king bed and a sofa that opens into a second bed, set by a wide window over the green beyond. Easy for couples, and for a small family too.",
    cover: { src: "/harsh-premium.jpg", width: 1672, height: 941, alt: "Premium Room contemporary king bedroom view" },
    hero: { src: "/harsh-premium.jpg", width: 1672, height: 941, alt: "Premium Room contemporary king bedroom view" },
    gallery: [
      { src: "/final-view/Premium-room4_11zon.webp", width: 4176, height: 6264, alt: "Premium Room wide window view" },
      { src: "/harsh-premium.jpg", width: 1672, height: 941, alt: "Premium Room contemporary king bedroom view" },
      { src: "/harsh-premium2.jpg", width: 1448, height: 1086, alt: "Premium Room plush seating and bedroom view" },
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Sofa-cum-bed", "Air conditioning", "Tea & coffee maker"],
    meta: {
      title: "Premium Room | Manratan Resort",
      description: "Nature-view Premium Room with king bed and sofa-cum-bed at Manratan Resort, Narsinghgarh.",
      keywords: ["Manratan Resort", "Premium Room", "Sofa cum bed room", "Nature view room"],
    },
  },
  {
    id: "room-5",
    slug: "executive-suite",
    name: "Executive Suite",
    count: 2,
    specs: ["Master bedroom", "Private living room", "Panoramic view"],
    summary: "A separate living room, a white-marble bath and the widest view in the house.",
    intro:
      "Our two finest rooms: a private living room, a master bedroom dressed in Manratan linen, a white-marble bathroom and wide windows over the resort and the hills.",
    cover: { src: "/harsh-executive.jpg", width: 1672, height: 941, alt: "Executive Suite luxurious bedroom view" },
    hero: { src: "/harsh-executive.jpg", width: 1672, height: 941, alt: "Executive Suite at Manratan Resort" },
    gallery: [
      { src: "/final-view/Suite-room4_11zon.webp", width: 6240, height: 3512, alt: "Executive Suite spacious interior" },
      { src: "/final-view/Suite-room5_11zon.webp", width: 4032, height: 3024, alt: "Executive Suite master bathroom" },
      { src: "/harsh-executive.jpg", width: 1672, height: 941, alt: "Executive Suite luxurious bedroom view" },
      { src: "/harsh-executive2.jpg", width: 1448, height: 1086, alt: "Executive Suite grand suite seating view" },
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Private living room", "Air conditioning", "Tea & coffee maker"],
    meta: {
      title: "Executive Suite | Manratan Resort, Narsinghgarh",
      description: "Executive Suite with a private living room and panoramic views at Manratan Resort, Narsinghgarh.",
      keywords: ["Manratan Resort", "Executive Suite", "Luxury suite Narsinghgarh"],
    },
  },
];

/** Presentation order: lead with the Executive Suite, then Premium through Deluxe. Room IDs remain unchanged for existing URLs. */
export const roomsPremiumFirst: Room[] = [...rooms].reverse();

export const getRoom = (id: string) => rooms.find((r) => r.id === id || r.slug === id);

/* ------------------------------------------------------------------ */
/* Celebration venues (capacities from the brochure)                   */
/* ------------------------------------------------------------------ */

export const venues = [
  {
    name: "Blue Sapphire",
    kind: "Banquet hall · 300–400 guests",
    detail: "Chandeliers and a sapphire carpet, for weddings, sangeet, mehendi, haldi, receptions and corporate events",
    image: photo("blue-sapphire-full", "Blue Sapphire banquet hall fully set for a celebration"),
  },
  {
    name: "Golden Sapphire",
    kind: "Banquet hall · 25–80 guests",
    detail: "An intimate hall for birthdays, anniversaries, engagements and meetings, with a projector provided",
    image: photo("golden-sapphire", "Golden Sapphire hall set in black and gold with balloon decor"),
  },
  {
    name: "Blue Diamond",
    kind: "Poolside · 300–400 guests",
    detail: "Sundowners, poolside parties, pre-wedding mixers, candlelight dinners and proposals by the water",
    image: photo("pool-dusk", "Blue Diamond pool from above at dusk, lights on"),
    video: {
      src: video.poolDinner,
      poster: video.poolDinnerPoster,
      alt: "A couple at a candlelit table by the Blue Diamond pool at night, the camera rising to show the whole lit pool",
    },
  },
  {
    name: "Sky Lawn",
    kind: "Open-air terrace · up to 20 guests",
    detail: "An intimate open-air space for private celebrations and small gatherings",
    image: photo("skylawn-sunset", "Sky Lawn lounge at sunset"),
  },
];

/** Our largest venue (no photograph supplied yet). */
export const redCoral = {
  name: "Red Coral Lawn",
  kind: "Open-air lawn · 500–4,000 guests",
  detail: "Grand weddings, receptions, musical evenings, festivals and large corporate events under the open sky",
};

/* ------------------------------------------------------------------ */
/* Amenities                                                           */
/* Pooja Room and Parlour Room: brochure room list. Poolside dinners   */
/* and proposals: client message, 5 Nov 2026. Venue figures: brochure. */
/* ------------------------------------------------------------------ */

export type AmenityIcon =
  | "pooja"
  | "parlour"
  | "pool"
  | "candle"
  | "dining"
  | "hall"
  | "lawn"
  | "terrace"
  | "bed"
  | "wifi"
  | "parking"
  | "front-desk"
  | "room-service"
  | "garden";

export const amenities: { name: string; note: string; icon: AmenityIcon; featured?: boolean; href?: string }[] = [
  { name: "Swadika restaurant", note: "Pure vegetarian, multi-cuisine dining for 80 to 100 guests.", icon: "dining", href: "/gallery?category=dining" },
  { name: "Outdoor swimming pool", note: "The open-air Blue Diamond pool.", icon: "pool", href: "/gallery?category=swimming-pool" },
  { name: "Free Wi-Fi", note: "High-speed Wi-Fi during your stay.", icon: "wifi" },
  { name: "Free parking", note: "On-site parking for guests.", icon: "parking" },
  { name: "24-hour front desk", note: "Round-the-clock reception and assistance.", icon: "front-desk" },
  { name: "Room service", note: "In-room dining and attentive service.", icon: "room-service" },
  { name: "Banquet & conference facilities", note: "Blue Sapphire and Golden Sapphire halls, with a projector provided.", icon: "hall", href: "/weddings-&-events" },
  { name: "Garden & outdoor event space", note: "Red Coral Lawn and Sky Lawn for open-air celebrations.", icon: "garden", href: "/weddings-&-events" },
];

/* ------------------------------------------------------------------ */
/* Narsinghgarh                                                        */
/* Facts: Rajgarh district (rajgarh.nic.in), Wikipedia "Narsinghgarh,  */
/* Madhya Pradesh", MP Tourism. Fort first, by client direction.       */
/* ------------------------------------------------------------------ */

export interface Place {
  name: string;
  where: string;
  note: string;
  image: Photo | null;
  facts?: string[];
  /** Waiting on the client: shown in the change log, not on the site. */
  pending?: string;
}

export const fort: Place = {
  name: "Narsinghgarh Fort",
  where: "350 feet above the town and Paras Ram Sagar",
  note:
    "The fort-palace of the Narsinghgarh rulers, raised in the late seventeenth century and their home until 1962. Its walls are mirrored in Paras Ram Sagar below, and from its ramparts the whole town opens out between the lake and the hills.",
  facts: ["304 rooms", "4 halls", "12 courtyards", "64 verandahs"],
  // No genuine photograph of the fort has been supplied yet; the site shows a typographic panel until it is.
  image: null,
  pending: "Genuine photograph of Narsinghgarh Fort (Drive: Vanisha › Narsinghgarh drone set, needs a web-size export)",
};

export const nearby: { featured: Place[]; more: { name: string; note: string }[] } = {
  featured: [
    {
      name: "Jal Mandir",
      where: "In Paras Ram Sagar",
      note: "A temple standing in the middle of the lake named for the town's founder, reached along a narrow causeway. At its best at sunset.",
      image: photo("ngh-lake-temple", "Jal Mandir in Paras Ram Sagar at sunset"),
    },
    {
      name: "Narsinghgarh and its lake",
      where: "The old town around Paras Ram Sagar",
      note: "Rooftops wrapped around the water and green hills on every side: the view behind the name, the Mini Kashmir of Malwa.",
      image: photo("ngh-lake-town", "Narsinghgarh town around Paras Ram Sagar, seen from above"),
    },
    {
      name: "Bara Khambha",
      where: "On the grasslands near Narsinghgarh",
      note: "A carved stone pillared pavilion standing alone on open grassland, at its best in the golden hour.",
      image: photo("ngh-chhatri", "Bara Khambha, a carved stone pillared pavilion on grassland at sunset"),
      pending: "Name per client. MP Tourism lists a pillared 'Solah Khamba' in the sanctuary; client to confirm name and spelling.",
    },
  ],
  more: [
    {
      name: "Chidikho Wildlife Sanctuary",
      note: "About 57 sq km of forest around Chidikho Lake, set aside in 1978, with peacocks, chital, sambar, nilgai and migratory birds.",
    },
    {
      name: "Baijnath Mahadeo Temple",
      note: "A temple on the heights above the town, with a wide view over the lakes, green hills and farmland, loveliest in autumn.",
    },
    {
      name: "Shyamji Sanka Temple",
      note: "A 16th–17th century temple in Sanka village near Kotra, where the Shyamji-ka-mela is held every year in the month of Magh.",
    },
    {
      name: "Getting here",
      note: "Bhopal airport is about 70 km away (around 1.5 hours) and the railway station about 30 km (around 30 minutes). Indore is about 210 km.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* Every photo appears once, in the category it belongs to.            */
/* ------------------------------------------------------------------ */

export const galleryCategories = [
  { label: "All", slug: "all" },
  { label: "Swimming pool", slug: "swimming-pool" },
  { label: "Rooms", slug: "rooms" },
  { label: "Dining", slug: "dining" },
  { label: "Events", slug: "events" },
  { label: "Exteriors", slug: "exteriors" },
  { label: "Lobby", slug: "lobby" },
  { label: "Lifestyle", slug: "lifestyle" },
  { label: "Narsinghgarh", slug: "narsinghgarh" },
  // { label: "Nearby attractions", slug: "nearby-attractions" },
] as const;

export type GallerySlug = (typeof galleryCategories)[number]["slug"];
export type GalleryCategory = Exclude<(typeof galleryCategories)[number]["label"], "All">;

const g = (category: GalleryCategory, key: MediaKey, alt: string) => ({ category, ...photo(key, alt) });
const gDirect = (category: GalleryCategory, src: string, width: number, height: number, alt: string) => ({
  category,
  src,
  width,
  height,
  alt,
});

export const gallery = [
  // g("Nearby attractions", "ngh-lake-temple", "Jal Mandir in Paras Ram Sagar at sunset"),
  // g("Swimming pool", "pool-day", "Blue Diamond pool in daylight, from above"),
  // g("Nearby attractions", "ngh-lake-town", "Narsinghgarh and Paras Ram Sagar from above"),
  // g("Nearby attractions", "ngh-chhatri", "Bara Khambha on the grasslands at sunset"),
  gDirect("Swimming pool", "/harsh-pool1.webp", 1578, 996, "Blue Diamond swimming pool at Manratan Resort"),
  gDirect("Rooms", "/final-view/Deluxe-room1_11zon.webp", 2560, 1441, "Deluxe Room with double bed, writing desk and wall-mounted TV"),
  gDirect("Events", "/harsh-event1.jpg", 1672, 941, "Grand event celebration and stage setup at Manratan Resort"),
  // g("Swimming pool", "pool-friends-wide", "Two friends sitting at the pool edge"),
  gDirect("Rooms", "/final-view/Deluxe-room2_11zon.webp", 2560, 1441, "Deluxe Room with armchair and bedside table"),
  gDirect("Lobby", "/harsh-lobby1.webp", 1672, 941, "Grand resort lobby and foyer at Manratan Resort"),
  gDirect("Dining", "/new-web/dining_11zon.webp", 1672, 941, "Swadika restaurant dining hall"),
  gDirect("Rooms", "/final-view/Deluxe-room3_11zon.webp", 2560, 1441, "Deluxe Room spacious layout"),
  gDirect("Exteriors", "/final-view/first-light1.webp", 1448, 1086, "Manratan Resort facade and architecture"),
  gDirect("Rooms", "/final-view/Deluxe-room4_11zon.webp", 2560, 1441, "Deluxe Room comfortable seating and natural lighting"),
  g("Lifestyle", "pool-breakfast", "Two guests sharing a floating breakfast in the pool"),
  gDirect("Exteriors", "/final-view/first-light2.webp", 1448, 1086, "Manratan Resort building illuminated at dusk"),
  gDirect("Rooms", "/final-view/Deluxe-room5_11zon.webp", 1441, 2560, "Deluxe Room amenities and details"),
  gDirect("Events", "/harsh-event2.jpg", 1672, 941, "Royal wedding event decor and illumination"),
  g("Dining", "swadika-guests", "Families dining at Swadika"),
  gDirect("Rooms", "/final-view/Executive-banner_11zon.webp", 2560, 1441, "Executive Family Room ambient lighting and wall paneling"),
  gDirect("Lobby", "/harsh-lobby2.webp", 1672, 941, "Elegant reception desk and check-in lobby foyer"),
  gDirect("Events", "/harsh-event3.jpg", 1672, 941, "Luxury banquet hall celebration setup"),
  gDirect("Exteriors", "/final-view/first-light3.webp", 1448, 1086, "Manratan Resort scenic exterior grounds"),
  // g("Swimming pool", "pool-lounger", "Guest on a poolside lounger"),
  gDirect("Lobby", "/harsh-lobby3.webp", 1672, 941, "Luxurious lobby seating area and ambient design"),
  gDirect("Lobby", "/harsh-lobby4.webp", 1672, 941, "Warm hospitality and reception lounge"),
  gDirect("Exteriors", "/final-view/skylawn.webp", 1672, 941, "Sky Lawn rooftop open-air event space and views"),
  gDirect("Events", "/harsh-event4.jpg", 1672, 941, "Elegant festive event seating and stage"),
  gDirect("Rooms", "/final-view/Executive-room4_11zon.webp", 2560, 1441, "Executive Family Room work desk"),
  gDirect("Swimming pool", "/harsh-pool2.jpeg", 1672, 941, "Scenic poolside view and lounge at Manratan Resort"),
  gDirect("Rooms", "/harsh-executive-family.jpg", 1672, 941, "Executive Family Room spacious living view"),
  gDirect("Rooms", "/harsh-executive-family2.jpg", 1672, 941, "Executive Family Room comfortable interior setup"),
  gDirect("Rooms", "/harsh-executive-family3.jpg", 1672, 941, "Executive Family Room ambient lighting and styling"),
  gDirect("Dining", "/restaurant/swadika3_11zon.webp", 1672, 941, "Swadika tables set for lunch"),
  gDirect("Exteriors", "/harsh-exterior.webp", 1448, 1086, "Grand resort entrance and landscaped gardens"),
  gDirect("Events", "/harsh-event5.jpg", 1671, 941, "Spectacular event lighting and decorations"),
  gDirect("Rooms", "/final-view/Inter-room1_11zon.webp", 2560, 1440, "Two bedrooms joined by a connecting door"),
  gDirect("Lobby", "/harsh-lobby5.webp", 1672, 941, "Lobby lounge with crystal chandeliers and seating"),
  gDirect("Lobby", "/harsh-lobby6.jpg", 1672, 941, "Contemporary lobby decor and architecture"),
  gDirect("Exteriors", "/harsh-exterior2.jpg", 1448, 1086, "Exterior facade and surrounding natural landscape"),
  gDirect("Swimming pool", "/harsh-pool3.webp", 941, 1672, "Crystal clear pool waters and resort setting"),
  gDirect("Rooms", "/final-view/Inter-room2_11zon.webp", 2560, 1440, "Interconnected room bed with window light"),
  gDirect("Events", "/harsh-event6.jpg", 1672, 941, "Grand convention and celebration banquet"),
  // g("Lifestyle", "inter-3", "Guest at the desk of an interconnected room"),
  gDirect("Rooms", "/final-view/Inter-room4_11zon.webp", 2560, 1441, "Interconnected room comfortable family setup"),
  gDirect("Rooms", "/harsh-interconnected.jpg", 1672, 941, "Deluxe Interconnected Room connected suite view"),
  gDirect("Events", "/harsh-event7.jpg", 1672, 941, "Exquisite wedding mandap and floral setup"),
  gDirect("Events", "/harsh-event8.jpg", 1672, 941, "Lavish gala dinner and celebration arrangements"),
  gDirect("Events", "/harsh-event9.jpg", 1672, 941, "Special milestone celebration and event ambiance"),
  g("Dining", "mrw-resturant-a", "Swadika restaurant dining hall and seating"),
  g("Dining", "mrw-resturant-k", "Swadika restaurant contemporary dining design"),
  g("Dining", "mrw-resturant-b", "Swadika restaurant buffet and dining layout"),
  g("Dining", "mrw-resturant-c", "Swadika restaurant tables and interior ambiance"),
  g("Dining", "mrw-resturant-d", "Swadika pure vegetarian dining setting"),
  g("Dining", "mrw-resturant-e", "Swadika restaurant family dining arrangements"),
  g("Dining", "mrw-resturant-f", "Swadika restaurant spacious dining area"),
  gDirect("Rooms", "/final-view/Premium-room4_11zon.webp", 1707, 2560, "Premium Room wide window view"),
  g("Dining", "mrw-resturant-g", "Swadika restaurant luxury table setup"),
  gDirect("Rooms", "/harsh-premium.jpg", 1672, 941, "Premium Room contemporary king bedroom view"),
  gDirect("Rooms", "/harsh-premium2.jpg", 1448, 1086, "Premium Room plush seating and bedroom view"),
  g("Dining", "mrw-resturant-h", "Swadika restaurant illuminated chandeliers and dining"),
  g("Dining", "mrw-resturant-j", "Swadika restaurant cozy table seating"),
  gDirect("Rooms", "/final-view/Suite-room4_11zon.webp", 2560, 1441, "Executive Suite spacious interior"),
  gDirect("Rooms", "/final-view/Suite-room5_11zon.webp", 2560, 1920, "Executive Suite master bathroom"),
  gDirect("Rooms", "/harsh-executive.jpg", 1672, 941, "Executive Suite luxurious bedroom view"),
  gDirect("Rooms", "/harsh-executive2.jpg", 1448, 1086, "Executive Suite grand suite seating view"),
  gDirect("Rooms", "/harsh-washroom-gallery.jpg", 941, 1672, "Luxury en-suite washroom with modern fittings"),
  g("Narsinghgarh", "mrw-narsinghghar-a", "Scenic view of historic Narsinghgarh"),
  g("Narsinghgarh", "mrw-narsinghghar-b", "Heritage landmarks and architecture of Narsinghgarh"),
  g("Narsinghgarh", "mrw-narsinghghar-c", "Landscape and monuments of Narsinghgarh town"),
  g("Narsinghgarh", "mrw-narsinghghar-d", "Panoramic natural surroundings of Narsinghgarh"),
  g("Narsinghgarh", "mrw-narsinghghar-e", "Paras Ram Sagar lake and temples in Narsinghgarh"),
  g("Narsinghgarh", "mrw-narsinghghar-f", "Cultural heritage sites around Narsinghgarh"),
  g("Narsinghgarh", "mrw-narsinghghar-g", "Scenic valley and greenery of Narsinghgarh"),
  g("Lifestyle", "mrw-lifestyle-a", "Resort lifestyle and leisure experience at Manratan"),
  g("Lifestyle", "mrw-lifestyle-b", "Relaxing moments and scenic ambiance at the resort"),
  g("Lifestyle", "mrw-lifestyle-c", "Guests enjoying peaceful outdoor resort setting"),
  g("Lifestyle", "mrw-lifestyle-f", "Luxury leisure experiences and tranquil surroundings"),
  g("Lifestyle", "mrw-lifestyle-d", "Carefree leisure and hospitality at Manratan Resort"),
  g("Lifestyle", "mrw-lifestyle-e", "Serene resort lifestyle and memorable stays"),

  // --- Removed Room Images (Commented out / Kept for reference) ---
  // g("Rooms", "mrw-deluxe-room-f", "Deluxe Room bathroom and dressing space"),
  // g("Rooms", "mrw-inter-room-c", "Deluxe Interconnected Room living and dressing area"),
  // g("Rooms", "mrw-inter-room-e", "Deluxe Interconnected Room contemporary en-suite bathroom"),
  // g("Rooms", "mrw-premium-room-b", "Premium Room panoramic bay window with plush seating"),
  // g("Rooms", "mrw-premium-room-e", "Premium Room contemporary dresser and workstation"),
  // g("Rooms", "suite-1", "Executive Suite bedroom with panoramic window"),
  // g("Rooms", "premium-2", "Premium Room with king bed and sofa by the window"),
  // g("Rooms", "suite-living", "Executive Suite living room"),
  // g("Rooms", "premium-1", "Premium Room with the sofa opened into a bed"),
  // g("Rooms", "suite-bath", "White-marble suite bathroom"),
  // g("Rooms", "executive-1", "Executive Family Room"),
  // g("Rooms", "deluxe-1", "Deluxe Room"),
  // g("Rooms", "premium-bath", "Premium Room rain shower in dark marble"),
  // g("Rooms", "executive-3", "Executive Family Room seating"),
  // g("Rooms", "inter-1", "Deluxe Interconnected Room"),
  // g("Rooms", "executive-bath", "Executive Family Room bathroom"),
  // g("Rooms", "deluxe-2", "Deluxe Room seating corner"),

  // --- Removed Dining Images (Commented out / Kept for reference) ---
  // g("Dining", "mrw-resturant-i", "Swadika restaurant dining area"),
  // g("Dining", "mrw-resturant-l", "Swadika restaurant food and dining setup"),
  // g("Dining", "mrw-resturant-m", "Swadika restaurant tables and service"),
  // g("Dining", "mrw-resturant-n", "Swadika restaurant gourmet dining experience"),
  // g("Dining", "mrw-resturant-o", "Swadika restaurant ambiance"),
];
