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
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </SectionWithContainer>
  );
};

export default AccommodationRooms;
