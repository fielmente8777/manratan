import ImageBanner from "@/components/banners/ImageBanner";
import Form1 from "@/components/forms/Form1";
import { homePageData } from "../(home)/components/pagedata";
import About from "./components/RoyalRetreat";
import { LandingPageData } from "./components/pageData";
import AboutIntro from "./components/RoyalRetreat";
import Legacy from "./components/Legacy";
import Property from "./components/Property";
import RoomsSection from "./components/RoomsSection";
import WeddingSection from "./components/Weddind";
import GallerySection from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";

export default function Home() {
  return (
    <main>
      <ImageBanner {...homePageData.heroData} />

      <div
        className="bg-dark border md:hidden border-white backdrop-blur-xs flex flex-col gap-5"
        id="form"
      >
        <Form1 />
      </div>
      <AboutIntro {...LandingPageData.aboutIntro} />
      <Legacy {...LandingPageData.legacySection} />
      <Property {...LandingPageData.propertyFeatures} />
      <RoomsSection {...LandingPageData.roomsSection} />
      <WeddingSection {...LandingPageData.weddingSection} />
      <GallerySection {...LandingPageData.gallerySection} />
      <Testimonials {...LandingPageData.testimonials} />
      <Faq {...LandingPageData.faqSection} />
    </main>
  );
}
