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

/** One graded photo from /public/media, with its real dimensions. */
export const photo = (key: MediaKey, alt: string): Photo => {
  const [width, height] = manifest[key];
  return { src: `/media/${key}.webp`, width, height, alt };
};

export const video = {
  heroLoop: "/media/hero-loop.mp4",
  walkthrough: "/media/walkthrough.mp4",
  poster: "/media/aerial-greenery.webp",
};

export const walkthrough = film as {
  duration: number;
  chapters: { title: string; start: number }[];
};

/* ------------------------------------------------------------------ */
/* Resort facts                                                        */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Manratan Resort",
  place: "Narsinghgarh, Madhya Pradesh",
  short: "Narsinghgarh, MP",
  tagline: "In the hills they call the Kashmir of Malwa",
  url: "https://manratanresort.com",
  contact,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
};

export const navLinks = [
  { label: "Home", href: "/", image: photo("facade-dusk", "Manratan Resort at dusk") },
  { label: "Our story", href: "/about", image: photo("lobby-monogram", "The Manratan lobby") },
  { label: "Rooms & suites", href: "/accommodation", image: photo("suite-1", "Suite with a view of the hills") },
  { label: "Celebrations", href: "/events", image: photo("blue-sapphire", "Blue Sapphire banquet hall") },
  { label: "Gallery", href: "/gallery", image: photo("pool-dusk", "Blue Diamond pool from above") },
  { label: "Journal", href: "/blogs", image: photo("ngh-lake-temple", "Narsinghgarh lake at sunset") },
  { label: "Contact", href: "/contactus", image: photo("reception-welcome", "Reception team welcome") },
];

/* ------------------------------------------------------------------ */
/* Rooms                                                               */
/* ------------------------------------------------------------------ */

export interface Room {
  id: string;
  focus?: string;
  name: string;
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
    focus: "22% 50%",
    name: "Deluxe Room",
    specs: ["Twin or double bed", "Garden view"],
    summary: "Calm, warm-lit rooms looking out over the gardens.",
    intro:
      "Refined comfort with garden views, warm wood finishes and plush bedding, made for a slow morning and an easy night's sleep.",
    cover: photo("deluxe-1", "Deluxe Room with double bed and garden-facing curtains"),
    hero: photo("deluxe-1", "Deluxe Room at Manratan Resort"),
    gallery: [
      photo("deluxe-1", "Deluxe Room with double bed"),
      photo("deluxe-2", "Deluxe Room seating corner"),
      photo("towel-swans", "Towel swans on a freshly made bed"),
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
    specs: ["Two connected rooms", "Pool & garden view"],
    summary: "Two rooms behind one door, for families travelling together.",
    intro:
      "Made for families and wedding parties travelling together: two connected bedrooms that give everyone privacy and keep everyone close.",
    cover: photo("inter-1", "Deluxe Interconnected Room with two connected bedrooms"),
    hero: photo("inter-1", "Deluxe Interconnected Room at Manratan Resort"),
    gallery: [
      photo("inter-1", "Two connected bedrooms"),
      photo("inter-2", "Interconnected room bed and artwork"),
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
    specs: ["King bed", "Pool view"],
    summary: "Generous space, richer finishes and a view of the pool.",
    intro:
      "An executive family room with room to spread out, lavish interiors and a calm view across the pool.",
    cover: photo("executive-1", "Executive Family Room with towel swans on the beds"),
    hero: photo("executive-1", "Executive Family Room at Manratan Resort"),
    gallery: [
      photo("executive-1", "Executive Family Room beds"),
      photo("executive-2", "Executive Family Room twin beds and art"),
      photo("executive-3", "Executive Family Room seating and TV wall"),
      photo("executive-4", "Executive Family Room work desk"),
      photo("executive-bath", "Marble bathroom with vessel basin"),
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Pool access", "Mini bar", "Premium coffee"],
    meta: {
      title: "Executive Family Room | Manratan Resort",
      description: "Spacious pool-view Executive Family Room at Manratan Resort, Narsinghgarh.",
      keywords: ["Manratan Resort", "Executive room", "Family room", "Pool view room"],
    },
  },
  {
    id: "room-4",
    name: "Premium Room",
    specs: ["King bed", "Nature view"],
    summary: "A sofa by the window and the Malwa hills beyond it.",
    intro:
      "A quiet room with tasteful furnishings, warm ambient light and a sofa by the window looking out to the green beyond.",
    cover: photo("premium-1", "Premium Room with king bed, sofa and window view"),
    hero: photo("premium-1", "Premium Room at Manratan Resort"),
    gallery: [
      photo("premium-1", "Premium Room with sofa by the window"),
      photo("premium-2", "Premium Room bed and lounge chair"),
      photo("premium-bath", "Rain shower in dark marble"),
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Air conditioning", "Tea & coffee maker", "Luxury toiletries"],
    meta: {
      title: "Premium Room | Manratan Resort",
      description: "Nature-view Premium Room with king bed at Manratan Resort, Narsinghgarh.",
      keywords: ["Manratan Resort", "Premium Room", "Nature view room"],
    },
  },
  {
    id: "room-5",
    name: "Suite",
    specs: ["Master bedroom", "Private living room", "Panoramic view"],
    summary: "A separate living room, a white marble bath and the widest view in the house.",
    intro:
      "Our finest rooms: a private living room, a master bedroom dressed in Manratan linen, a white marble bath and panoramic views of the resort and hills.",
    cover: photo("suite-1", "Suite bedroom with a panoramic window"),
    hero: photo("suite-1", "Suite at Manratan Resort"),
    gallery: [
      photo("suite-1", "Suite bedroom with panoramic window"),
      photo("suite-living", "Suite living room"),
      photo("suite-bed", "Manratan cushions and towel art on the suite bed"),
      photo("suite-swans", "Towel swans on the suite bed"),
      photo("suite-bath", "White marble suite bathroom"),
    ],
    amenities: ["High-speed Wi-Fi", "Daily housekeeping", "In-room dining", "Private living room", "Mini bar", "Premium coffee"],
    meta: {
      title: "Suite | Manratan Resort, Narsinghgarh",
      description: "Suite with private living room and panoramic views at Manratan Resort, Narsinghgarh.",
      keywords: ["Manratan Resort", "Suite", "Luxury suite Narsinghgarh"],
    },
  },
];

export const getRoom = (id: string) => rooms.find((r) => r.id === id);

/* ------------------------------------------------------------------ */
/* Celebration venues                                                  */
/* ------------------------------------------------------------------ */

export const venues = [
  {
    name: "Blue Sapphire",
    kind: "Banquet hall",
    detail: "Chandeliers, a sapphire carpet and room for 300 to 400 guests",
    image: photo("blue-sapphire", "Blue Sapphire banquet hall set for a celebration"),
  },
  {
    name: "Golden Sapphire",
    kind: "Banquet hall",
    detail: "A warm, gold-lit hall for sangeets, receptions and gala dinners",
    image: photo("golden-sapphire", "Golden Sapphire banquet hall in black and gold"),
  },
  {
    name: "Sky Lawn",
    kind: "Rooftop lawn",
    detail: "Sundowners and cocktail evenings above the hills",
    image: photo("skylawn-sunset", "Sky Lawn lounge at sunset"),
  },
  {
    name: "Blue Diamond",
    kind: "Poolside",
    detail: "Haldi mornings and poolside soirées",
    image: photo("pool-dusk", "Blue Diamond pool from above at dusk"),
  },
];

/* ------------------------------------------------------------------ */
/* Places nearby                                                       */
/* ------------------------------------------------------------------ */

export const nearby = {
  featured: [
    {
      name: "Jal Mandir",
      where: "Paras Ram Sagar, Narsinghgarh",
      note: "A gilded temple standing out on the lake built by the town's founder, reached along a narrow causeway. Go at sunset, when the domes catch the last light.",
      image: photo("ngh-lake-temple", "Jal Mandir on Paras Ram Sagar at sunset, Narsinghgarh Fort on the ridge behind"),
    },
    {
      name: "Narsinghgarh Fort",
      where: "On the ridge above the town",
      note: "The fort-palace of the Narsinghgarh rulers, about 350 feet above the town and their residence until 1962. Its walls look down on the lake and the old quarter.",
      image: photo("ngh-fort", "Narsinghgarh Fort on the forested ridge above the lake"),
    },
    {
      name: "Narsinghgarh from above",
      where: "The old town and its lake",
      note: "Rooftops wrapped around the water and green hills on every side, the view behind the town's name, the Kashmir of Malwa.",
      image: photo("ngh-lake-town", "Narsinghgarh town around its lake, seen from above"),
    },
    {
      name: "Hilltop temple",
      where: "Near Narsinghgarh",
      note: "A long stone stairway climbs through the forest to a temple with views across the plains.",
      image: photo("ngh-hilltop-temple", "Hilltop temple with a stone stairway through the forest"),
    },
    {
      name: "Old chhatri on the hills",
      where: "Near Narsinghgarh",
      note: "A carved stone pavilion on open grassland, at its best in the golden hour.",
      image: photo("ngh-chhatri", "Carved stone chhatri on a grassy hill at sunset"),
    },
  ],
  more: [
    {
      name: "Chidikho Wildlife Sanctuary",
      note: "57 sq km of protected forest around Chidikho Lake, known for peacocks, cheetal, sambar, nilgai and migratory birds.",
    },
    {
      name: "Swarn Jain Temple",
      note: "A marble temple to Mallinath Swamy, worked in mirror and gold, in Narsinghgarh town.",
    },
    {
      name: "Shyamji Sanka Temple",
      note: "A protected 16th–17th century temple near the Parvati River, known for Malwi and Rajasthani wall paintings.",
    },
    {
      name: "Getting here",
      note: "Bhopal is about 82 km away and Raja Bhoj Airport about 72 km. The nearest railway station is Biaora, about 33 km.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export const galleryCategories = [
  "All",
  "Property",
  "Rooms",
  "Swimming pool",
  "Dining",
  "Banquet",
  "Lifestyle",
  "Nearby attractions",
] as const;

export type GalleryCategory = Exclude<(typeof galleryCategories)[number], "All">;

const g = (category: GalleryCategory, key: MediaKey, alt: string) => ({ category, ...photo(key, alt) });

export const gallery = [
  g("Property", "facade-dusk", "Manratan Resort facade at dusk"),
  g("Lifestyle", "pool-breakfast", "Floating breakfast in the Blue Diamond pool"),
  g("Property", "aerial-greenery", "Manratan Resort among fields at sunrise, from the air"),
  g("Rooms", "suite-1", "Suite bedroom with panoramic window"),
  g("Property", "reception-welcome", "Reception team greeting guests with a namaste"),
  g("Nearby attractions", "ngh-lake-temple", "Temple on Paras Ram Sagar at sunset"),
  g("Dining", "swadika-hall", "Swadika restaurant dining hall"),
  g("Lifestyle", "pool-splash", "Guest splashing water at the pool"),
  g("Banquet", "blue-sapphire-stage", "Blue Sapphire hall set with a stage"),
  g("Property", "lobby-chandeliers", "Lobby with crystal chandeliers"),
  g("Rooms", "suite-living", "Suite living room"),
  g("Property", "skylawn-sunset-tall", "Sky Lawn seating at sunset"),
  g("Property", "sunrise-front", "Manratan Resort at first light"),
  g("Rooms", "premium-1", "Premium Room with sofa by the window"),
  g("Banquet", "golden-sapphire", "Golden Sapphire hall in black and gold"),
  g("Lifestyle", "pool-friends", "Friends laughing by the pool"),
  g("Nearby attractions", "ngh-chhatri", "Stone chhatri on the hills at sunset"),
  g("Dining", "swadika-guests", "Families dining at Swadika"),
  g("Property", "facade-night", "Manratan Resort lit up at night"),
  g("Rooms", "deluxe-1", "Deluxe Room"),
  g("Swimming pool", "pool-dusk", "Blue Diamond pool from above at dusk"),
  g("Rooms", "suite-bath", "White marble suite bathroom"),
  g("Banquet", "blue-sapphire-lounge", "Blue Sapphire hall lounge seating"),
  g("Swimming pool", "pool-breakfast-2", "Breakfast tray floating in the pool"),
  g("Property", "lobby-lounge", "Lobby lounge"),
  g("Nearby attractions", "ngh-hilltop-temple", "Hilltop temple and forest stairway"),
  g("Rooms", "executive-1", "Executive Family Room"),
  g("Property", "skylawn-above", "Sky Lawn from above"),
  g("Dining", "swadika-room", "Swadika tables set for lunch"),
  g("Rooms", "inter-3", "Guest at the desk of an interconnected room"),
  g("Banquet", "blue-sapphire-tables", "Blue Sapphire tables dressed in white"),
  g("Property", "aerial-approach", "Approach to the resort from the air"),
  g("Swimming pool", "pool-lounger", "Guest on a poolside lounger"),
  g("Rooms", "towel-swans", "Towel swans on the bed"),
  g("Swimming pool", "pool-day", "Blue Diamond pool in daylight, from above"),
  g("Nearby attractions", "ngh-fort", "Narsinghgarh Fort above the lake"),
  g("Nearby attractions", "ngh-lake-town", "Narsinghgarh town and lake from above"),
  g("Lifestyle", "pool-guests", "Two guests by the Manratan sign at the pool"),
  g("Rooms", "premium-2", "Premium Room"),
  g("Banquet", "conference", "Hall set for a conference"),
  g("Property", "lobby-monogram", "Lobby with the Manratan monogram wall"),
  g("Rooms", "executive-3", "Executive Family Room seating"),
  g("Swimming pool", "pool-friends-wide", "Two friends sitting at the pool edge"),
  g("Rooms", "suite-swans", "Towel swans on the suite bed"),
  g("Banquet", "blue-sapphire-detail", "Blue Sapphire chairs with pink bows"),
  g("Property", "corridor", "Guest corridor"),
  g("Rooms", "inter-1", "Deluxe Interconnected Room"),
];
