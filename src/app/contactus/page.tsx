"use client";

import NavBar from "@/components/navbar/NavBar";
import ContactInformation from "./components/ContactInfo";
import FAQSection from "./components/Faq";
import ContactUs from "./components/Intro";
import {
  contactInformationData,
  contactUsData,
  faqData,
} from "./components/pageData";

const Page = () => {
  return (
    <main className="w-full">

      <ContactUs {...contactUsData} />

      <ContactInformation {...contactInformationData} />

      <FAQSection faqs={faqData} />
    </main>
  );
};

export default Page;
