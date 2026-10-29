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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {rooms.map((room, index) => {
          const isLastOdd =
            index === rooms.length - 1 && rooms.length % 2 === 1;
          return (
            <div
              key={room.id}
              className={
                isLastOdd
                  ? "w-full md:col-span-2 md:w-[calc(50%-0.75rem)] lg:w-[calc(50%-1rem)] md:mx-auto"
                  : "w-full"
              }
            >
              <RoomCard {...room} />
            </div>
          );
        })}
      </div>
    </SectionWithContainer>
  );
};

export default AccommodationRooms;
