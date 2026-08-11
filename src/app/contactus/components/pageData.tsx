import { contact } from "@/utils/constent";

export const contactUsData = {
  title: "Contact Us",
  subTitle: "Let's Plan Your Stay",

  description:
    "From booking inquiries to special requests, we're just a message away. We look forward to welcoming you to Manratan Resort.",

  button: {
    label: "View Google Map",
    href: "https://maps.google.com/?q=Manratan+Resort+Narasingarh+MP",
  },

  image: "/images/img2.jpg",

  illustration: "/images/bell.png",
};

export const contactInformationData = {
  image: "/images/contact.jpg",

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
    question: "What are the check-in and check-out timings?",
    answer:
      "Our standard check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in or late check-out can be requested subject to availability.",
  },
  {
    question: "Is complimentary Wi-Fi available?",
    answer:
      "Yes, complimentary Wi-Fi is available for guests throughout the resort.",
  },
  {
    question: "Does the resort have a restaurant?",
    answer:
      "Yes, the resort offers dining options for guests.",
  },
  {
    question: "Is parking available at the resort?",
    answer:
      "Yes, complimentary parking is available for resort guests.",
  },
  {
    question: "How can I make a reservation?",
    answer:
      "You can make a reservation by contacting our reservations team or using the booking option available on our website.",
  },
];