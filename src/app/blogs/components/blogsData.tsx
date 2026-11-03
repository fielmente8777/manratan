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
    title: "Discovering Narsinghgarh: The Hidden Gem of Malwa",
    date: "18 Jan, 2026",
    coverImage: "/media/ngh-lake-temple.webp",
    url: "/media/ngh-lake-temple.webp",
    alt: "Jal Mandir on Paras Ram Sagar with Narsinghgarh Fort on the ridge",
    description:
      "Explore Narsinghgarh, celebrated as the Kashmir of Malwa, featuring emerald wildlife sanctuaries, royal heritage, and luxury stays at Manratan Resort.",
    meta: {
      title: "Discovering Narsinghgarh: The Hidden Gem of Malwa | Manratan Resort",
      description:
        "Explore Narsinghgarh, the Kashmir of Malwa, featuring emerald wildlife sanctuaries, royal heritage, and luxury stays at Manratan Resort.",
      keyWords: [
        "Narsinghgarh resort",
        "Kashmir of Malwa",
        "Manratan Resort",
        "Heritage resort Madhya Pradesh",
        "Chidi Kho sanctuary",
        "Luxury stay Narsinghgarh",
      ],
    },
    data: `
  <div>
    <p>
      When wanderlust calls for places that whisper stories of regal grandeur while wrapping you in natural tranquility, Narsinghgarh emerges as a jewel waiting to be discovered. Often celebrated as the 'Kashmir of Malwa', this enchanted town in Madhya Pradesh captivates every traveler with its misty hills, pristine lakes, and rich royal heritage.
    </p>

    <h2>The Royal Heritage of Narsinghgarh</h2>
    <p>
      Founded in the late 17th century, Narsinghgarh carries an aura of ancient royalty. The majestic fort and palaces perched on the hill slopes stand as timeless guardians of the town’s legacy.
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
      At Manratan Resort, the town and its sights are a short drive away. Whether it is an early morning drive up to the fort, a quiet sunset on the Sky Lawn or a long dinner at Swadika, your time in Narsinghgarh is shaped by comfort and warmth.
    </p>
    <p>
      Whether you seek solacing nature, royal tales, or simply a refined sanctuary away from urban hustle, Narsinghgarh and Manratan Resort welcome you to make memories that linger forever.
    </p>
  </div>
  `,
  },
  {
    id: "2",
    slug: "destination-weddings-at-manratan-royal-affair",
    title: "Royal Destination Weddings at Manratan Resort",
    date: "18 Jan, 2026",
    coverImage: "/media/blue-sapphire-stage.webp",
    url: "/media/blue-sapphire-stage.webp",
    alt: "Blue Sapphire banquet hall dressed for a wedding",
    description:
      "Turn your dream wedding into a majestic affair with expansive lawns, royal decor, gourmet dining, and luxury hospitality at Manratan Resort.",
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
  <div>
    <p>
      Destination weddings have transcended traditional banquet halls into grand celebrations of love and togetherness set amidst nature. In the heart of Madhya Pradesh, Manratan Resort in Narsinghgarh offers a fairytale backdrop where royal architecture meets contemporary elegance.
    </p>

    <h2>Expansive Lawns and Majestic Venues</h2>
    <p>
      Whether you envision an intimate mehendi ceremony by our Blue Diamond Poolside Oasis or a royal wedding reception for 4,000 guests across our expansive Red Coral Lawn, Manratan Resort provides versatile venues tailored to every pre wedding ritual and grand ceremony.
    </p>
    <p>
      Our Blue Sapphire Banquet Hall, accommodating 300 to 400 guests, features exquisite chandeliers and state of the art acoustics, creating an enchanting indoor ambiance for sangeet nights and reception galas.
    </p>

    <h2>Bespoke Pure Vegetarian Catering</h2>
    <p>
      From royal Malwa thalis and live chaat counters to gourmet global delicacies, our culinary masters at Swadika create unforgettable dining spreads crafted to delight every palate.
    </p>

    <h2>Complete Guest Accommodation</h2>
    <p>
      With 65 elegantly appointed rooms, suites, and interconnected family units, your entire wedding party stays comfortably together under one roof, pampered by 24-hour hospitality and premium resort amenities.
    </p>
  </div>
  `,
  },
  {
    id: "3",
    slug: "holistic-wellness-and-rejuvenation-retreat",
    title: "Holistic Wellness & Rejuvenation Retreats at Manratan",
    date: "18 Jan, 2026",
    coverImage: "/media/pool-dusk.webp",
    url: "/media/pool-dusk.webp",
    alt: "Blue Diamond pool at dusk, seen from above",
    description:
      "Escape the city rush and immerse yourself in peaceful morning walks, poolside relaxation, pure veg nutrition, and serene Malwa landscapes.",
    meta: {
      title: "Holistic Wellness & Rejuvenation Retreats | Manratan Resort",
      description:
        "Escape the city and slow down with morning walks, poolside afternoons, pure vegetarian food and the green Malwa landscape at Manratan Resort.",
      keyWords: [
        "Wellness retreat Madhya Pradesh",
        "Wellness getaway near Bhopal",
        "Relaxing resort Madhya Pradesh",
        "Manratan health and wellness",
      ],
    },
    data: `
  <div>
    <p>
      In today's fast paced world, carving out time for mindful rest and physical rejuvenation is no longer a luxury it is an essential journey toward balance. Tucked away in the serene foothills of Narsinghgarh, Manratan Resort offers an idyllic sanctuary where body, mind, and spirit unwind in unison.
    </p>

    <h2>The Healing Power of Nature</h2>
    <p>
      Surrounded by lush greenery and clean countryside breezes, our resort invites you to start your day with an unhurried walk or a quiet stretch on the open lawns, with only the birdsong for company.
    </p>

    <h2>Refreshing Poolside Moments</h2>
    <p>
      Spend tranquil afternoons lounging beside our sparkling swimming pool, reading your favorite book, or simply soaking in the warm sun. The peaceful atmosphere fosters deep relaxation and mental clarity.
    </p>

    <h2>Nourishing Pure Veg Gastronomy</h2>
    <p>
      True wellness begins from within. Our Swadika restaurant crafts wholesome, nutrient dense pure vegetarian meals made from fresh local produce, balancing authentic regional tastes with mindful nutrition.
    </p>
  </div>
  `,
  },
  {
    id: "4",
    slug: "culinary-journey-authentic-malwa-flavors",
    title: "A Culinary Journey Through Authentic Malwa Flavors",
    date: "18 Jan, 2026",
    coverImage: "/media/swadika-guests.webp",
    url: "/media/swadika-guests.webp",
    alt: "Families sharing a vegetarian lunch at Swadika",
    description:
      "Discover royal regional recipes, fragrant spices, and gourmet multi cuisine dining at Swadika Restaurant in Manratan Resort.",
    meta: {
      title: "A Culinary Journey Through Malwa Flavors | Manratan Resort",
      description:
        "Discover royal Malwa recipes, gourmet dining, and romantic open air dinners at Manratan Resort.",
      keyWords: [
        "Malwa cuisine resort",
        "Manratan fine dining",
        "Royal MP delicacies",
        "Open air romantic dinner",
      ],
    },
    data: `
  <div>
    <p>
      The Malwa plateau in Central India is celebrated far and wide for its distinct culinary heritage a harmonious marriage of subtle spices, rich gravies, slow cooked grains, and delightful sweets that have delighted royal courts for centuries.
    </p>

    <h2>Swadika: Where Every Meal Becomes an Experience</h2>
    <p>
      At Swadika, the signature pure vegetarian restaurant of Manratan Resort, our chefs honor this culinary legacy while introducing guests to popular global favorites in an ambiance illuminated by warm signature chandeliers.
    </p>

    <h2>Signature Flavours to Savour</h2>
    <p>
      Indulge in authentic Dal Bafla, tempered with aromatic desi ghee, tangy Sev Tamatar subzi, and fresh Bhutte ka Kees. Each dish is prepared with traditional time honored techniques that bring out deep, authentic aromas.
    </p>

    <h2>Curated Dining for Every Occasion</h2>
    <p>
      Whether you are enjoying a lavish breakfast before exploring Narsinghgarh's historic monuments, a quiet midday business lunch, or an elegant celebratory family dinner, Swadika delivers exceptional dining with heartfelt hospitality.
    </p>
  </div>
  `,
  },
  {
    id: "5",
    slug: "weekend-getaway-guide-from-bhopal-indore",
    title: "The Ultimate Weekend Getaway Guide from Bhopal & Indore",
    date: "18 Jan, 2026",
    coverImage: "/media/facade-dusk.webp",
    url: "/media/facade-dusk.webp",
    alt: "Manratan Resort at dusk, the arrival forecourt",
    description:
      "Plan a seamless road trip from Bhopal (70 km) or Indore (210 km) to the peaceful hills and luxury of Manratan Resort in Narsinghgarh.",
    meta: {
      title: "Weekend Getaway Guide from Bhopal & Indore | Manratan Resort",
      description:
        "Plan your short weekend trip from Bhopal and Indore to the tranquil landscapes of Narsinghgarh and Manratan Resort.",
      keyWords: [
        "Weekend trip from Bhopal",
        "Indore weekend getaway",
        "Short road trip MP",
        "Manratan resort booking",
      ],
    },
    data: `
  <div>
    <p>
      Looking for a rejuvenating weekend escape without lengthy travel hours? Located just 70 km (approx. 1.5 hours) from Bhopal Airport and an easy scenic highway drive of 210 km from Indore along NH-46, Manratan Resort in Narsinghgarh is the premier weekend sanctuary of Madhya Pradesh.
    </p>

    <h2>Friday Evening: Arrival & Unwinding</h2>
    <p>
      Check into your Deluxe Room or Executive Family Room, take a refreshing dip in the open air swimming pool, and unwind over a hot dinner at Swadika Restaurant.
    </p>

    <h2>Saturday: Exploring the 'Kashmir of Malwa'</h2>
    <p>
      Spend your morning visiting the majestic Narsinghgarh Fort and Paras Ram Sagar lake. Later, explore the Chidi Kho Wildlife Sanctuary, an emerald forest teeming with peacocks, migratory birds, and serene water bodies.
    </p>

    <h2>Sunday: Leisure & Rejuvenation</h2>
    <p>
      Enjoy a leisurely multi course breakfast, stroll across our landscaped lawns, and take in the fresh countryside air before an effortless drive back home, feeling completely refreshed and renewed.
    </p>
  </div>
  `,
  },
  {
    id: "6",
    slug: "eco-friendly-luxury-sustainable-hospitality",
    title: "Eco Friendly Luxury: Sustainable Hospitality at Its Finest",
    date: "18 Jan, 2026",
    coverImage: "/media/aerial-greenery.webp",
    url: "/media/aerial-greenery.webp",
    alt: "Manratan Resort among green fields, from the air",
    description:
      "Learn how Manratan Resort blends refined modern luxury with environmental stewardship, lush greenery, and conscious resort operations.",
    meta: {
      title: "Eco Friendly Luxury & Sustainable Hospitality | Manratan Resort",
      description:
        "Discover how Manratan Resort pairs modern comfort with care for the green Malwa landscape around it.",
      keyWords: [
        "Eco luxury resort MP",
        "Sustainable hospitality",
        "Green getaway Madhya Pradesh",
        "Manratan eco tourism",
      ],
    },
    data: `
  <div>
    <p>
      Modern luxury is no longer defined merely by lavish chandeliers and plush furnishings; it is equally defined by how gently a property treads upon its natural surroundings. At Manratan Resort, our vision weaves environmental consciousness into every guest experience.
    </p>

    <h2>Preserving the Natural Landscape</h2>
    <p>
      Rather than altering the topography, our resort was designed to complement Narsinghgarh’s undulating hills and green plains. Expansive open lawns and native plantation provide a vibrant habitat for local birdlife and pollinators.
    </p>

    <h2>Energy Efficiency & Water Conservation</h2>
    <p>
      From climate-controlled rooms to energy-efficient LED lighting across our venues and gardens, we aim for low-impact operational practices.
    </p>

    <h2>Locally Sourced Goodness</h2>
    <p>
      Swadika's kitchen cooks with fresh, seasonal vegetables, dairy and grains, serving fresh food to our diners.
    </p>
  </div>
  `,
  },
];
