import { contact } from "@/utils/constent";

export const contactUsData = {
  title: "Contact Us",
  subTitle: "Let's Plan Your Stay",

  description:
    "From booking inquiries to special requests, we're just a message away. We look forward to welcoming you to Manratan Resort.",

  button: {
    label: "View Google Map",
    href: "https://maps.google.com/?q=Manratan+Resort+Narsinghgarh+MP",
  },

  image: "/reception/reception1_11zon.webp",

  illustration: "/images/bell.png",
};

export const contactInformationData = {
  image: "/reception/reception3_11zon.webp",

  items: [
 {
      type: "email" as const,
      title: "Email Address",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      type: "phone" as const,
      title: "Phone",
      value: contact.phone[0],
      href: `tel:${contact.phone[0]}`,
    },
    {
      type: "address" as const,
      title: "Address",
      value: contact.address,
    },
  ],
};

export const faqData = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be requested and is subject to availability.",
  },
  {
    question: "Is Wi-Fi complimentary?",
    answer: "Yes. Complimentary Wi-Fi is available throughout the resort.",
  },
  {
    question: "Does the resort have a restaurant?",
    answer:
      "Yes. Swadika, our pure vegetarian restaurant, serves North Indian, regional Malwa and global dishes in a chandelier-lit hall that seats up to 100 guests.",
  },
  {
    question: "Is parking available?",
    answer: "Yes. Complimentary on-site parking is available for resort guests.",
  },
  {
    question: "Can I host a wedding or event at Manratan?",
    answer:
      "Yes. The Blue Sapphire and Golden Sapphire banquet halls, the Sky Lawn, the poolside and the Red Coral Lawn (up to 4,000 guests) host weddings, receptions and corporate events. Call or WhatsApp us to plan yours.",
  },
  {
    question: "How can I make a reservation?",
    answer:
      "Use the booking form on this website, call our reservations team or send us a WhatsApp message. We will confirm your dates and room.",
  },
];
