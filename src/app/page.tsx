import type { Metadata } from "next";
import HomeHero from "./(home)/HomeHero";
import RoomsRail from "./(home)/RoomsRail";
import { About, Amenities, Celebrations, EvolvesWithLight, PlacesNearby, RoyalCharm, Spaces, Swadika, Walkthrough } from "./(home)/sections";

export const metadata: Metadata = {
  title: { absolute: "Manratan Resort, Narsinghgarh | Where Every Heart Finds Its Gem" },
  description:
    "A resort in Narsinghgarh, the Mini Kashmir of Malwa: 65 rooms and suites, pure vegetarian dining at Swadika, the Blue Diamond pool, a Pooja Room and Parlour Room, and banquet halls and lawns for up to 4,000 guests.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <HomeHero />
      <About />
      <RoyalCharm />
      {/* <Walkthrough /> */}
      <Spaces />
      <Amenities />
      <RoomsRail />
      <Celebrations />
      <EvolvesWithLight />
      <Swadika />
      <PlacesNearby />
    </main>
  );
}
