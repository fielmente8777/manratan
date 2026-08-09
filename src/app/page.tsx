import ImageBanner from "@/components/banners/ImageBanner";
import { homePageData } from "./(home)/components/pagedata";
import About from "./(home)/components/About";
import ExperienceSection from "./(home)/components/Experience";
import Feature from "./(home)/components/Feature";
import Event from "./(home)/components/Event";



export default function Home() {
  return (
    <>
      <ImageBanner {...homePageData.heroData} />

      <About {...homePageData.aboutData} />

      <Feature {...homePageData.featureGalleryData} />

      <Event {...homePageData.eventsData} />

      <ExperienceSection {...homePageData.experienceSection} />
    </>
  );
}