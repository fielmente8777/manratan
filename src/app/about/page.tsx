import About from "./components/About";

import AtManratan from "./components/AtManratan";
import Hero from "./components/Hero";
import History from "./components/History";

import { aboutData } from "./components/pagedata";

export default function AboutPage() {
  return (
    <main>
      <Hero {...aboutData.hero} />

      <About {...aboutData.aboutStoryData} />

      <History {...aboutData.aboutHistoryData} />

      <AtManratan {...aboutData.atManratanData} />
    </main>
  );
}
