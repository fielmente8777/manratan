export interface FooterData {
  logo: string;
  links: {
    title: string;
    items: {
      label: string;
      href: string;
    }[];
  }[];
  cta: {
    label: string;
    href: string;
  };
  copyright: string;
  poweredBy: {
    label: string;
    href: string;
  };
}

export const footerData: FooterData = {
  logo: "/images/footer.png",

  links: [
    {
      title: "LINKS",
      items: [
        { label: "Home", href: "/" },
        { label: "Our Story", href: "/our-story" },
        { label: "Rooms & Suites", href: "/rooms-&-suites" },
        { label: "Gallery", href: "/gallery" },
        { label: "Weddings & Events", href: "/weddings-&-events" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Journal", href: "/journal" },
      ],
    },
    {
      title: "SOCIAL",
      items: [
        { label: "Facebook", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  ],

  cta: {
    label: "FIND A ROOM",
    href: "/rooms-&-suites",
  },

  copyright: "© MANRATAN RESORT 2026",

  poweredBy: {
    label: "POWERED BY FIELMENTE",
    href: "https://fielmente.com",
  },
};
