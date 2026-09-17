import LandingBanner from "./components/LandingBanner";
import LandingFooter from "./components/LandingFooter";
import { homePageData } from "../(home)/components/pagedata";
import { LandingPageData } from "./components/pageData";
import AboutIntro from "./components/RoyalRetreat";
import StatsBar from "./components/StatsBar";
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
      <LandingBanner {...homePageData.heroData} />
      <AboutIntro {...LandingPageData.aboutIntro} />
      <StatsBar {...LandingPageData.statsBar} />
      <Legacy {...LandingPageData.legacySection} />
      <Property {...LandingPageData.propertyFeatures} />
      <RoomsSection {...LandingPageData.roomsSection} />
      <WeddingSection {...LandingPageData.weddingSection} />
      <GallerySection {...LandingPageData.gallerySection} />
      <Testimonials {...LandingPageData.testimonials} />
      <Faq {...LandingPageData.faqSection} />
      <LandingFooter />
    </main>
  );
}
