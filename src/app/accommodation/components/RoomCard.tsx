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
    <article className="group flex flex-col gap-3 sm:gap-4 w-full h-full">
      {/* Room Image Container - Taller and larger aspect ratio */}
      <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.7] overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Room Content */}
      <div className="flex flex-col gap-1 sm:gap-1.5 text-left w-full">
        {/* Room Title - Single Line */}
        <h4 className="text-primary text-base sm:text-lg lg:text-[1.2rem] xl:text-[1.3rem] leading-snug tracking-[0.04em] font-[serif] font-normal uppercase truncate whitespace-nowrap">
          {title}
        </h4>

        {/* Room Details & KNOW MORE - Both in Single Line */}
        <div className="flex items-center justify-between gap-3 w-full">
          <p className="text-secondary text-xs sm:text-[13px] leading-relaxed font-normal tracking-normal truncate whitespace-nowrap">
            {subtitle}
          </p>

          <Link
            href={href}
            className="shrink-0 text-primary text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.15em] underline underline-offset-2 decoration-[0.5px] hover:opacity-70 transition-opacity whitespace-nowrap cursor-pointer"
          >
            KNOW MORE
          </Link>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
