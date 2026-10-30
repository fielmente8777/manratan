import ImageBanner from "@/components/banners/ImageBanner";
import { homePageData } from "./(home)/components/pagedata";
import About from "./(home)/components/About";
import ExperienceSection from "./(home)/components/Experience";
import Feature from "./(home)/components/Feature";
import Event from "./(home)/components/Event";
import Form1 from "@/components/forms/Form1";
import Charm from "./(home)/components/Charm";

export default function Home() {
  return (
    <main>
      <ImageBanner {...homePageData.heroData} />

      {/* Form rendered inside ImageBanner on top of hero image */}






      <About {...homePageData.aboutData} />

      <Charm {...homePageData.historyData} />

      <Feature {...homePageData.featureGalleryData} />

      <Event {...homePageData.eventsData} />

      <ExperienceSection {...homePageData.experienceSection} />
    </main>
  );
}
