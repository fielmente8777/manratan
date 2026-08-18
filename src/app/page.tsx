import ImageBanner from "@/components/banners/ImageBanner";
import { homePageData } from "./(home)/components/pagedata";
import About from "./(home)/components/About";
import ExperienceSection from "./(home)/components/Experience";
import Feature from "./(home)/components/Feature";
import Event from "./(home)/components/Event";
import Form1 from "@/components/forms/Form1";

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

      <About {...homePageData.aboutData} />

      <Feature {...homePageData.featureGalleryData} />

      <Event {...homePageData.eventsData} />

      <ExperienceSection {...homePageData.experienceSection} />
    </main>
  );
}
