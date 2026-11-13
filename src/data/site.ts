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
  walkthrough: "/media/walkthrough.mp4",
  poster: "/media/walkthrough-poster.webp",
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
  { label: "Our story", href: "/about", image: photo("lobby-monogram", "The Manratan lobby") },
  { label: "Rooms & suites", href: "/accommodation", image: photo("suite-1", "Executive Suite with a view of the hills") },
  { label: "Celebrations", href: "/events", image: photo("blue-sapphire-full", "Blue Sapphire banquet hall set for a celebration") },
  { label: "Gallery", href: "/gallery", image: photo("pool-dusk", "Blue Diamond pool from above") },
  { label: "Journal", href: "/blogs", image: photo("ngh-lake-temple", "Jal Mandir on Paras Ram Sagar, Narsinghgarh") },
  { label: "Contact", href: "/contactus", image: photo("reception-welcome", "Reception team welcome") },
];

/* ------------------------------------------------------------------ */
/* Rooms (types and counts from the brochure)                          */
/* ------------------------------------------------------------------ */

export interface Room {
  id: string;
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
    focus: "5% 50%",
    name: "Deluxe Room",
    count: 25,
    specs: ["Twin or double bed", "Garden view"],
    summary: "Calm, warm-lit rooms looking out over the gardens.",
    intro:
      "Warm wood, soft lighting and fresh linen, with a writing desk and a garden view. A comfortable base for a family visit or a wedding weekend.",
    cover: photo("deluxe-new", "Deluxe Room with double bed, warm-lit curtains and a writing desk"),
    hero: photo("deluxe-new", "Deluxe Room at Manratan Resort"),
    gallery: [
      photo("deluxe-new", "Deluxe Room with double bed, writing desk and wall-mounted TV"),
      photo("deluxe-2", "Deluxe Room with armchair and bedside table"),
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
    name: "Deluxe Interconnected Room",
    count: 12,
    specs: ["Two connected rooms", "Pool & garden view"],
    summary: "Two rooms behind one door, for families travelling together.",
    intro:
      "Two bedrooms joined by a connecting door, so a family or a group of friends can have their own space and still be together.",
    cover: photo("inter-1", "Deluxe Interconnected Room with two connected bedrooms"),
    hero: photo("inter-1", "Deluxe Interconnected Room at Manratan Resort"),
    gallery: [
      photo("inter-1", "Two bedrooms joined by a connecting door"),
      photo("inter-2", "Interconnected room bed with window light"),
      photo("inter-3", "Guest at the room's writing desk"),
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
    name: "Executive Family Room",
    count: 8,
    specs: ["Twin beds", "Pool view"],
    summary: "Room for the whole family, with a view of the pool.",
    intro: "A larger room for families, with two beds, a seating corner, a work desk and a dark-marble bathroom.",
    cover: photo("executive-1", "Executive Family Room with two beds made up side by side"),
    hero: photo("executive-1", "Executive Family Room at Manratan Resort"),
    gallery: [
      photo("executive-1", "Executive Family Room beds"),
      photo("executive-2", "Executive Family Room twin beds and artwork"),
      photo("executive-3", "Executive Family Room seating and television wall"),
      photo("executive-4", "Executive Family Room work desk"),
      photo("executive-bath", "Dark-marble bathroom with vessel basin"),
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
    name: "Premium Room",
    count: 16,
    specs: ["King bed", "Sofa-cum-bed", "Nature view"],
    summary: "A king bed, a sofa-cum-bed by the window and the hills beyond.",
    intro:
      "A king bed and a sofa that opens into a second bed, set by a wide window over the green beyond. Easy for couples, and for a small family too.",
    cover: photo("premium-2", "Premium Room with king bed, sofa and window view"),
    hero: photo("premium-2", "Premium Room at Manratan Resort"),
    gallery: [
      photo("premium-2", "Premium Room with king bed and sofa by the window"),
      photo("premium-1", "Premium Room with the sofa opened into a bed"),
      photo("premium-bath", "Rain shower in dark marble"),
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
    name: "Executive Suite",
    count: 2,
    specs: ["Master bedroom", "Private living room", "Panoramic view"],
    summary: "A separate living room, a white-marble bath and the widest view in the house.",
    intro:
      "Our two finest rooms: a private living room, a master bedroom dressed in Manratan linen, a white-marble bathroom and wide windows over the resort and the hills.",
    cover: photo("suite-1", "Executive Suite bedroom with a panoramic window"),
    hero: photo("suite-1", "Executive Suite at Manratan Resort"),
    gallery: [
      photo("suite-1", "Executive Suite bedroom with panoramic window"),
      photo("suite-living", "Executive Suite living room"),
      photo("suite-bed", "Manratan cushions and towel art on the suite bed"),
      photo("suite-bath", "White-marble suite bathroom"),
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

export const getRoom = (id: string) => rooms.find((r) => r.id === id);

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
  { name: "Banquet & conference facilities", note: "Blue Sapphire and Golden Sapphire halls, with a projector provided.", icon: "hall", href: "/events" },
  { name: "Garden & outdoor event space", note: "Red Coral Lawn and Sky Lawn for open-air celebrations.", icon: "garden", href: "/events" },
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
  { label: "Banquet", slug: "banquet" },
  { label: "Exteriors", slug: "exteriors" },
  { label: "Lobby", slug: "lobby" },
  { label: "Lifestyle", slug: "lifestyle" },
  { label: "Narsinghgarh", slug: "narsinghgarh" },
  // { label: "Nearby attractions", slug: "nearby-attractions" },
] as const;

export type GallerySlug = (typeof galleryCategories)[number]["slug"];
export type GalleryCategory = Exclude<(typeof galleryCategories)[number]["label"], "All">;

const g = (category: GalleryCategory, key: MediaKey, alt: string) => ({ category, ...photo(key, alt) });

export const gallery = [
  // g("Exteriors", "facade-night-full", "Manratan Resort lit up at night"),
  // g("Nearby attractions", "ngh-lake-temple", "Jal Mandir in Paras Ram Sagar at sunset"),
  // g("Swimming pool", "pool-day", "Blue Diamond pool in daylight, from above"),
  // g("Nearby attractions", "ngh-lake-town", "Narsinghgarh and Paras Ram Sagar from above"),
  // g("Nearby attractions", "ngh-chhatri", "Bara Khambha on the grasslands at sunset"),
  g("Swimming pool", "pool-dusk", "Blue Diamond pool from above at dusk"),
  g("Rooms", "mrw-deluxe-room-a", "Deluxe Room king bed and warm contemporary lighting"),
  g("Banquet", "blue-sapphire-stage", "Blue Sapphire hall set with a stage"),
  // g("Swimming pool", "pool-friends-wide", "Two friends sitting at the pool edge"),
  g("Rooms", "mrw-deluxe-room-b", "Deluxe Room bedside view and interior styling"),
  g("Lobby", "lobby-chandeliers", "Lobby with crystal chandeliers"),
  g("Dining", "swadika-hall", "Swadika restaurant dining hall"),
  g("Rooms", "mrw-deluxe-room-c", "Deluxe Room spacious layout with work desk"),
  g("Exteriors", "aerial-greenery", "Manratan Resort among fields at sunrise, from the air"),
  g("Rooms", "mrw-deluxe-room-d", "Deluxe Room elegant furnishings and wardrobe"),
  g("Lifestyle", "pool-breakfast", "Two guests sharing a floating breakfast in the pool"),
  g("Exteriors", "facade-bluehour", "Manratan Resort facade at blue hour"),
  g("Rooms", "mrw-deluxe-room-e", "Deluxe Room en-suite luxury bathroom"),
  g("Banquet", "golden-sapphire", "Golden Sapphire hall in black and gold"),
  g("Rooms", "mrw-executive-room-a", "Executive Family Room master bed and headboard design"),
  // g("Exteriors", "facade-dusk", "Manratan Resort facade from the forecourt"),
  g("Dining", "swadika-guests", "Families dining at Swadika"),
  g("Rooms", "mrw-executive-room-b", "Executive Family Room expansive space and bedside lamps"),
  g("Lobby", "reception-welcome", "Reception team greeting guests with a namaste"),
  g("Rooms", "mrw-executive-room-c", "Executive Family Room bedroom seating area"),
  g("Banquet", "blue-sapphire-full", "Blue Sapphire hall fully set for a celebration"),
  g("Exteriors", "skylawn-sunset", "Sky Lawn seating at sunset"),
  g("Rooms", "mrw-executive-room-d", "Executive Family Room ambient lighting and wall paneling"),
  // g("Swimming pool", "pool-lounger", "Guest on a poolside lounger"),
  g("Lobby", "lobby-lounge", "Lobby lounge with red velvet sofas"),
  g("Lobby", "mrw-lobby-a", "Grand reception desk and check-in lobby foyer"),
  g("Rooms", "mrw-executive-room-f", "Executive Family Room wardrobe and vanity mirror"),
  g("Exteriors", "sunrise-front", "Manratan Resort at first light"),
  g("Banquet", "conference", "Hall set for a conference"),
  g("Rooms", "mrw-inter-room-a", "Deluxe Interconnected Room connected suite bedroom"),
  g("Swimming pool", "pool-splash", "Guest splashing water at the pool"),
  g("Rooms", "mrw-inter-room-b", "Deluxe Interconnected Room king bed and luxury linens"),
  g("Dining", "swadika-room", "Swadika tables set for lunch"),
  g("Exteriors", "aerial-approach", "Approach to the resort from the air"),
  g("Banquet", "blue-sapphire-lounge", "Blue Sapphire hall with lounge seating"),
  g("Rooms", "mrw-inter-room-d", "Deluxe Interconnected Room adjoining family space"),
  g("Lobby", "lobby-monogram", "Lobby with the Manratan monogram wall"),
  g("Lobby", "mrw-lobby-b", "Resort lobby lounge with crystal chandeliers and seating"),
  g("Exteriors", "skylawn-above", "Sky Lawn from above"),
  g("Swimming pool", "pool-breakfast-2", "Breakfast tray floating in the pool"),
  g("Rooms", "mrw-premium-room-a", "Premium Room spacious king bedroom with panoramic view"),
  g("Banquet", "golden-sapphire-2", "Golden Sapphire hall set for a dinner"),
  // g("Lifestyle", "inter-3", "Guest at the desk of an interconnected room"),
  g("Exteriors", "facade-night", "Upper floors and Sky Lawn lit at night"),
  g("Rooms", "mrw-premium-room-c", "Premium Room plush seating corner and interior decor"),
  g("Banquet", "blue-sapphire", "Blue Sapphire hall before the tables are set"),
  g("Rooms", "mrw-premium-room-d", "Premium Room vanity mirror and dressing space"),
  g("Lobby", "corridor", "Guest corridor"),
  g("Banquet", "blue-sapphire-tables", "Table setting in the Blue Sapphire hall"),
  g("Dining", "mrw-resturant-a", "Swadika restaurant dining hall and seating"),
  g("Dining", "mrw-resturant-k", "Swadika restaurant contemporary dining design"),
  g("Rooms", "mrw-suite-room-a", "Executive Suite lavish master bedroom and panoramic window"),
  g("Dining", "mrw-resturant-b", "Swadika restaurant buffet and dining layout"),
  g("Dining", "mrw-resturant-c", "Swadika restaurant tables and interior ambiance"),
  g("Rooms", "mrw-suite-room-b", "Executive Suite king bed with designer lighting"),
  g("Dining", "mrw-resturant-d", "Swadika pure vegetarian dining setting"),
  g("Rooms", "mrw-suite-room-c", "Executive Suite private living lounge area"),
  g("Dining", "mrw-resturant-e", "Swadika restaurant family dining arrangements"),
  g("Dining", "mrw-resturant-f", "Swadika restaurant spacious dining area"),
  g("Rooms", "mrw-suite-room-d", "Executive Suite executive workstation and seating"),
  g("Dining", "mrw-resturant-g", "Swadika restaurant luxury table setup"),
  g("Rooms", "mrw-suite-room-e", "Executive Suite marble bathroom and bathtub"),
  g("Dining", "mrw-resturant-h", "Swadika restaurant illuminated chandeliers and dining"),
  g("Dining", "mrw-resturant-j", "Swadika restaurant cozy table seating"),
  g("Rooms", "mrw-suite-room-f", "Executive Suite luxury double vanity and amenities"),
  g("Rooms", "mrw-premium-room-f", "Premium Room rainfall shower and premium fittings"),
  g("Rooms", "mrw-executive-room-e", "Executive Family Room en-suite bathroom view"),
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
