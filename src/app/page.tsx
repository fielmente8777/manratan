import type { Metadata } from "next";
import HomeHero from "./(home)/HomeHero";
import RoomsRail from "./(home)/RoomsRail";
import { About, Celebrations, EvolvesWithLight, PlacesNearby, Spaces, Swadika, Walkthrough } from "./(home)/sections";

export const metadata: Metadata = {
  title: { absolute: "Manratan Resort, Narsinghgarh | Luxury Resort, Wedding Venue & Pool" },
  description:
    "A resort in the green hills of Narsinghgarh, the Kashmir of Malwa: 65 rooms and suites, pure vegetarian dining at Swadika, the Blue Diamond pool, banquet halls and lawns for up to 4,000 guests.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <HomeHero />
      <About />
      <Walkthrough />
      <Spaces />
      <RoomsRail />
      <Celebrations />
      <EvolvesWithLight />
      <Swadika />
      <PlacesNearby />
    </main>
  );
}
