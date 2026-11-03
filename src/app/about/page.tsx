import About from "./components/About";

import AtManratan from "./components/AtManratan";
import DiningGalleryStrip from "./components/DiningGalleryStrip";
import Hero from "./components/Hero";
import History from "./components/History";

import { aboutData } from "./components/pagedata";

export default function AboutPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero {...aboutData.hero} />

      <About {...aboutData.aboutStoryData} />

      <History {...aboutData.aboutHistoryData} />

      <AtManratan {...aboutData.atManratanData} />
      <DiningGalleryStrip images={aboutData.diningGalleryData} />
    </main>
  );
}
