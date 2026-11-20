import type { Metadata } from "next";
import EventsView from "./components/EventsView";

export const metadata: Metadata = {
  title: "Weddings & Events | Manratan Resort, Narsinghgarh",
  description:
    "Weddings, sangeet, receptions and corporate events at Manratan Resort, Narsinghgarh. Featuring the Blue Sapphire and Golden Sapphire banquet halls, Blue Diamond pool, Sky Lawn and the grand Red Coral Lawn for up to 4,000 guests.",
  alternates: { canonical: "/weddings-&-events" },
};

export default function EventsPage() {
  return (
    <main className="max_screen_width mx-auto">
      <EventsView />
    </main>
  );
}
