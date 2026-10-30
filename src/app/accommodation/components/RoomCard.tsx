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
    <Link href={href} className="block group cursor-pointer h-full">
      <article className="flex flex-col gap-3 sm:gap-4 w-full h-full">
        {/* Room Image Container - Taller and larger aspect ratio */}
        <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.7] overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Room Content - Restored to previous sleek size */}
        <div className="flex flex-col gap-1 sm:gap-1.5 text-left">
          {/* Room Title */}
          <h4 className="text-primary text-lg sm:text-xl lg:text-[1.35rem] xl:text-[1.45rem] leading-snug tracking-[0.05em] font-[serif] font-normal uppercase group-hover:opacity-80 transition-opacity">
            {title}
          </h4>

          {/* Room Details */}
          <p className="text-secondary text-xs sm:text-[13px] leading-relaxed font-normal tracking-normal">
            {subtitle}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default RoomCard;
