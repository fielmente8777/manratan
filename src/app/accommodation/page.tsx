import { accommodationData } from "./components/accommodationData";
import AccommodationHero from "./components/AccommodationHero";
import AccommodationIntro from "./components/AccommodationIntro";
import AccommodationRooms from "./components/AccommodationRooms";

const AccommodationPage = () => {
  return (
    <main className="w-full bg-tertiary min-h-screen">
      <AccommodationHero {...accommodationData.hero} />
      <AccommodationIntro {...accommodationData.intro} />
      <AccommodationRooms rooms={accommodationData.rooms} />
    </main>
  );
};

export default AccommodationPage;