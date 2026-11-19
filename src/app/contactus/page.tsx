import type { Metadata } from "next";
import { faqData } from "./components/pageData";
import ContactView from "./components/ContactView";

export const metadata: Metadata = {
  title: "Contact Us | Manratan Resort, Narsinghgarh",
  description:
    "Call, email or WhatsApp Manratan Resort, NH-46 Biaora Road, Narsinghgarh, Madhya Pradesh. Send an enquiry, plan celebrations, or get directions.",
  alternates: { canonical: "/contactus" },
};

export default function ContactPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="max_screen_width mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactView />
    </main>
  );
}
