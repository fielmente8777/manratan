import { SectionWithContainer } from "@/components/sectionComponants";
import RoomCard from "./RoomCard";

interface RoomItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

interface AccommodationRoomsProps {
  rooms: RoomItem[];
}

const AccommodationRooms = ({ rooms }: AccommodationRoomsProps) => {
  return (
    <SectionWithContainer sectionClassName="bg-tertiary">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
        {rooms.map((room, index) => {
          let gridClasses = "w-full";

          if (index < 3) {
            gridClasses = "w-full lg:col-span-2";
          } else if (index === 3) {
            gridClasses = "w-full sm:col-span-1 lg:col-start-2 lg:col-span-2";
          } else if (index === 4) {
            gridClasses =
              "w-full sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:mx-auto lg:col-span-2 lg:w-full lg:mx-0";
          }

          return (
            <div key={room.id} className={gridClasses}>
              <RoomCard {...room} />
            </div>
          );
        })}
      </div>
    </SectionWithContainer>
  );
};

export default AccommodationRooms;
