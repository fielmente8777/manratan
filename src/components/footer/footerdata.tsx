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
        { label: "About Us", href: "/about" },
        { label: "Accommodation", href: "/accommodation" },
        { label: "Gallery", href: "/gallery" },
        { label: "Events", href: "/events" },
        { label: "Wedding", href: "/wedding" },
        { label: "Contact", href: "/contactus" },
        { label: "Blogs", href: "/blogs" },
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
    href: "/accommodation",
  },

  copyright: "© MANRATAN RESORT 2026",

  poweredBy: {
    label: "Created by Fielmente",
    href: "https://fielmente.com",
  },
};
