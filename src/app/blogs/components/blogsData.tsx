export interface BlogMeta {
  title: string;
  description: string;
  keyWords: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  url: string;
  alt: string;
  description: string;
  meta: BlogMeta;
  data: string;
}

export const blogsCategories = [
  "All",
  "Heritage & Culture",
  "Resort Experiences",
  "Weddings",
  "Wellness",
  "Culinary",
] as const;

export const blogsData: BlogPost[] = [
  {
    id: "1",
    slug: "discovering-narasingarh-hidden-gem-malwa",
    title: "LOREM IPSUM DOLOR SIT AMET, CONSE ADIPISC....",
    date: "18 Jan, 2026",
    coverImage: "/images/hero.jpg",
    url: "/images/hero.jpg",
    alt: "Manratan Resort View",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Discover the serene escape of Narasingarh.",
    meta: {
      title: "Discovering Narasingarh: The Hidden Gem of Malwa | Manratan Resort",
      description:
        "Explore Narasingarh, the Kashmir of Malwa, featuring emerald wildlife sanctuaries, royal heritage, and luxury stays at Manratan Resort.",
      keyWords: [
        "Narasingarh resort",
        "Kashmir of Malwa",
        "Manratan Resort",
        "Heritage resort Madhya Pradesh",
        "Chidi Kho sanctuary",
        "Luxury stay Dharamshala",
      ],
    },
    data: `
  <div>
    <p>
      When wanderlust calls for places that whisper stories of regal grandeur while wrapping you in natural tranquility, Narasingarh emerges as a jewel waiting to be discovered. Often celebrated as the 'Kashmir of Malwa', this enchanted town in Madhya Pradesh captivates every traveler with its misty hills, pristine lakes, and rich royal heritage.
    </p>

    <h2>The Royal Heritage of Narasingarh</h2>
    <p>
      Founded in the late 17th century, Narasingarh carries an aura of ancient royalty. The majestic fort and palaces perched on the hill slopes stand as timeless guardians of the town’s legacy.
    </p>
    <p>
      Wandering through the heritage lanes surrounding Manratan Resort reveals intricately carved archways, antique architecture, and stories of legendary kings who nurtured art, culture, and nature in equal measure.
    </p>

    <h2>Chidi Kho: The Emerald Wildlife Sanctuary</h2>
    <p>
      Just a short drive from the resort lies Chidi Kho, a paradise for nature enthusiasts and bird watchers. Nestled inside the sanctuary is the famous Jamunkho lake, home to migratory birds and lush flora.
    </p>
    <p>
      As the golden hour arrives, watching the sunlight bounce off the serene waters while listening to birdsong creates a meditative experience like no other.
    </p>

    <h2>Luxury Meets Serenity at Manratan Resort</h2>
    <p>
      At Manratan Resort, we curate bespoke local explorations for our guests. Whether it is an early morning guided heritage walk, a quiet sunset high tea overlooking the hills, or private starlight dining, your journey into Narasingarh is crafted with luxury and warmth.
    </p>
    <p>
      Whether you seek solacing nature, royal tales, or simply a refined sanctuary away from urban hustle, Narasingarh and Manratan Resort welcome you to make memories that linger forever.
    </p>
  </div>
  `,
  },
  {
    id: "2",
    slug: "destination-weddings-at-manratan-royal-affair",
    title: "LOREM IPSUM DOLOR SIT AMET, CONSE ADIPISC....",
    date: "18 Jan, 2026",
    coverImage: "/images/img1.jpg",
    url: "/images/img1.jpg",
    alt: "Destination Weddings at Manratan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Plan your royal destination wedding at Manratan.",
    meta: {
      title: "Royal Destination Weddings at Manratan Resort",
      description:
        "Turn your dream wedding into a majestic affair with expansive lawns, royal decor, and luxury hospitality at Manratan Resort.",
      keyWords: [
        "Destination wedding resort",
        "Royal wedding venue",
        "Manratan luxury weddings",
        "Lawn wedding venue Madhya Pradesh",
      ],
    },
    data: `
  
  `,
  },
  {
    id: "3",
    slug: "holistic-wellness-and-rejuvenation-retreat",
    title: "LOREM IPSUM DOLOR SIT AMET, CONSE ADIPISC....",
    date: "18 Jan, 2026",
    coverImage: "/images/img2.jpg",
    url: "/images/img2.jpg",
    alt: "Wellness & Spa Rejuvenation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Reconnect your mind and body with holistic wellness retreats.",
    meta: {
      title: "Holistic Wellness & Rejuvenation Retreats | Manratan Resort",
      description:
        "Escape the city stress and immerse yourself in yoga, ayurvedic spa therapies, and organic dining at Manratan Resort.",
      keyWords: [
        "Wellness retreat Madhya Pradesh",
        "Ayurvedic spa resort",
        "Yoga retreat near Bhopal",
        "Manratan health and wellness",
      ],
    },
    data: `
  
  `,
  },
  {
    id: "4",
    slug: "culinary-journey-authentic-malwa-flavors",
    title: "LOREM IPSUM DOLOR SIT AMET, CONSE ADIPISC....",
    date: "18 Jan, 2026",
    coverImage: "/images/hero.jpg",
    url: "/images/hero.jpg",
    alt: "Culinary Dining at Manratan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Experience authentic Malwa delicacies and fine dining.",
    meta: {
      title: "A Culinary Journey Through Malwa Flavors | Manratan Resort",
      description:
        "Discover royal Malwa recipes, gourmet dining, and romantic open-air dinners at Manratan Resort.",
      keyWords: [
        "Malwa cuisine resort",
        "Manratan fine dining",
        "Royal MP delicacies",
        "Open air romantic dinner",
      ],
    },
    data: `
  
  `,
  },
  {
    id: "5",
    slug: "weekend-getaway-guide-from-bhopal-indore",
    title: "LOREM IPSUM DOLOR SIT AMET, CONSE ADIPISC....",
    date: "18 Jan, 2026",
    coverImage: "/images/img1.jpg",
    url: "/images/img1.jpg",
    alt: "Weekend Escape Road Trip",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. The ultimate weekend roadmap to Manratan Resort.",
    meta: {
      title: "Weekend Getaway Guide from Bhopal & Indore | Manratan Resort",
      description:
        "Plan your short weekend trip from Bhopal and Indore to the tranquil landscapes of Narasingarh and Manratan Resort.",
      keyWords: [
        "Weekend trip from Bhopal",
        "Indore weekend getaway",
        "Short road trip MP",
        "Manratan resort booking",
      ],
    },
    data: `
  
  `,
  },
  {
    id: "6",
    slug: "eco-friendly-luxury-sustainable-hospitality",
    title: "LOREM IPSUM DOLOR SIT AMET, CONSE ADIPISC....",
    date: "18 Jan, 2026",
    coverImage: "/images/img2.jpg",
    url: "/images/img2.jpg",
    alt: "Sustainable Eco-Luxury Stay",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. How eco-friendly hospitality meets uncompromised luxury.",
    meta: {
      title: "Eco-Friendly Luxury & Sustainable Hospitality | Manratan Resort",
      description:
        "Discover how Manratan Resort practices sustainable tourism, rainwater harvesting, and zero-plastic hospitality.",
      keyWords: [
        "Eco luxury resort MP",
        "Sustainable hospitality",
        "Zero plastic resort",
        "Manratan eco tourism",
      ],
    },
    data: `
  
  `,
  },
];
