import Image from "next/image";
import Link from "next/link";

interface RoomItem {
  id?: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const RoomCard = ({ id, title, subtitle, image, alt }: RoomItem) => {
  const href = id ? `/accommodation/${id}` : "#";

  return (
    <Link href={href} className="block group cursor-pointer">
      <article className="flex flex-col gap-4 w-full mx-auto">
        {/* Room Image Container - Tall Portrait Aspect Ratio (646px x 800px) */}
        <div className="relative w-full aspect-646/800 overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 646px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Room Content */}
        <div className="flex flex-col gap-1 md:gap-2 text-left">
          {/* Room Title */}
          <h4 className="text-primary text-xl sm:text-2xl md:text-[2rem] leading-10 tracking-[0.07em] font-[serif] font-normal uppercase group-hover:opacity-80 transition-opacity">
            {title}
          </h4>

          {/* Room Details */}
          <p className="text-secondary text-xs sm:text-sm leading-4.25 font-normal tracking-normal">
            {subtitle}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default RoomCard;
