import { Metadata } from "next";
import { eventsPageData } from "./components/pagedata";
import EventsHero from "./components/EventsHero";
import EventsIntro from "./components/EventsIntro";
import EventsVideoGrid from "./components/EventsVideoGrid";
import HostYourEvents from "./components/HostYourEvents";
import EventsCTA from "./components/EventsCTA";
import SlidingTitle from "@/components/sliders/SlidingTitle";

export const metadata: Metadata = {
  title: eventsPageData.meta.title,
  description: eventsPageData.meta.description,
  alternates: {
    canonical: "https://manratanresort.com/events",
  },
};

export default function EventsPage() {
  return (
    <main className="w-full bg-tertiary min-h-screen">
      {/* Top Hero Banner */}
      <EventsHero {...eventsPageData.heroData} />

      {/* Events & Celebrations Introduction Section */}
      <EventsIntro {...eventsPageData.introData} />

      {/* Marquee Ticker Band */}
      <SlidingTitle titles={eventsPageData.tickerItems} />

      {/* Dark 3-Card Showcase Grid */}
      <EventsVideoGrid {...eventsPageData.videoCardsData} />

      {/* Host Your Events Stacked Carousel Section */}
      <HostYourEvents {...eventsPageData.hostEventsData} />

      {/* Contact CTA Section */}
      <EventsCTA {...eventsPageData.ctaData} />
    </main>
  );
}
