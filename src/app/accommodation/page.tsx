import { accommodationData } from "./components/accommodationData";
import AccommodationHero from "./components/AccommodationHero";
import AccommodationIntro from "./components/AccommodationIntro";
import AccommodationRooms from "./components/AccommodationRooms";

const AccommodationPage = () => {
  return (
    <main className="w-full bg-white">
      <div className="max_screen_width mx-auto bg-tertiary">
        <AccommodationHero {...accommodationData.hero} />
        <AccommodationIntro {...accommodationData.intro} />
        <AccommodationRooms rooms={accommodationData.rooms} />
      </div>
    </main>
  );
};

export default AccommodationPage;