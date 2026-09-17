// "use client";
// import LinkButton from "@/components/buttons/LinkButton";
// import { SectionWithContainer } from "@/components/sectionComponants";
// import { SectionHeading } from "@/components/typography";
// import Image from "next/image";
// import { useMemo, useState } from "react";

// interface RoomsSectionProps {
//   tagline: string;
//   title: string;
//   cards: {
//     images: string[];
//     imageOnly?: boolean;
//     title?: string;
//     description?: string;
//     amenities?: {
//       label: string;
//     }[];
//     buttons?: {
//       label: string;
//       link: string;
//     }[];
//   }[];
// }

// const RoomsSection: React.FC<RoomsSectionProps> = ({
//   tagline,
//   title,
//   cards,
// }) => {
//   const locations = useMemo(
//     () => [...new Set(cards.map((card) => card))],
//     [cards]
//   );

//   const filteredCards = cards.filter((card) => card);
//   return (
//     <SectionWithContainer sectionClassName="border-y border-p1 bg-background2">
//       <div className="flex flex-col gap-8 lg:gap-8">
//         <div className="space-y-2 text-start">
//           <p className="uppercase text-p1 text-xs tracking-widest">{tagline}</p>
//           <div className="max-w-3xl">
//             <SectionHeading title={title} />
//           </div>
//         </div>
//         <div className="flex justify-center gap-4 flex-wrap">
//           {/* {locations.map((location) => (
//             <button
//               key={location}
//               onClick={() => setSelectedLocation(location)}
//               className={`rounded-md border px-5 py-2 text-sm transition-all duration-300 ${
//                 selectedLocation === location
//                   ? "bg-p1 text-white border-p1"
//                   : "bg-transparent text-p1 border-p1"
//               }`}
//             >
//               {location}
//             </button>
//           ))} */}
//         </div>
//         {/* {selectedLocation === "LOCATION 2: SONAGIRI 2BHK VILLA" ? (
//           <div className="flex flex-col gap-8"> */}
//         {/* Images */}
//         {/* <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7">
//               {filteredCards.flatMap((card) =>
//                 card.images.map((image, index) => (
//                   <div
//                     key={`${card.location}-${index}`}
//                     className="relative aspect-[4/3.5] overflow-hidden rounded-2xl"
//                   >
//                     <Image
//                       src={image}
//                       alt={`Villa ${index + 1}`}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 ))
//               )}
//             </div> */}

//         {/* Buttons */}
//         {/* <div className="flex justify-center gap-4">
//               {filteredCards[0]?.buttons?.map((button, index) => (
//                 <LinkButton
//                   key={index}
//                   href={button.link}
//                   label={button.label}
//                   whatsAppIcon={index === 0}
//                   calendarIcon={index === 1}
//                   className={`rounded-md px-6 justify-center ${
//                     index === 0
//                       ? "bg-transparent text-p1"
//                       : "bg-p1 text-white border border-primary"
//                   }`}
//                 />
//               ))}
//             </div> */}
//         {/* </div>
//         ) :  */}

//         <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
//           {filteredCards.map((card, index) => (
//             <RoomsCard key={index} {...card} />
//           ))}
//         </div>
//       </div>
//     </SectionWithContainer>
//   );
// };

// export default RoomsSection;

// export const RoomsCard: React.FC<RoomsSectionProps["cards"][0]> = ({
//   title,
//   description,
//   amenities,
//   buttons,
//   images,
// }) => {
//   return (
//     <div className="flex flex-col rounded-2xl overflow-hidden box-shadow">
//       <div className="w-full relative aspect-4/3.5">
//         <Image
//           src={images[0]}
//           alt={title ?? "Room"}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div className="flex flex-col gap-3 border border-[#DFD6C9] bg-white p-4 rounded-b-2xl">
//         <p className="text-dark text-3xl font-primary">{title}</p>
//         <p className="text-light max-lg:text-sm">{description}</p>
//         <ul className="flex items-center gap-6 my-2">
//           {amenities?.map((amenity, index) => (
//             <li key={index} className="text-light text-sm">
//               {amenity.label}
//             </li>
//           ))}
//         </ul>
//         <div className="w-full h-px bg-[#DFD6C9] mb-3 mt-1" />
//         <ul className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 justify-center ">
//           {buttons?.map((button, index) => (
//             <li key={index}>
//               <LinkButton
//                 href={button.link}
//                 label={button.label}
//                 whatsAppIcon={index === 0}
//                 calendarIcon={index === 1}
//                 className={`rounded-md w-full text-nowrap text-sm! justify-center
//                     ${
//                       index === 0
//                         ? "bg-transparent text-p1"
//                         : "border border-primary text-white bg-p1"
//                     }
//                     `}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };


"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Link from "next/link";
import { WhatsAppIcon, CalendarIcon, SliderPrevIcon, SliderNextIcon } from "@/utils/icons";
import { SectionWithContainer } from "@/components/sectionComponants";
// import { BtnNext, BtnPrevIcon } from "@/utils/icons";

interface RoomCard {
  images: string[];
  title: string;
  description: string;
  amenities: {
    label: string;
  }[];
  buttons: {
    label: string;
    link: string;
  }[];
}

interface RoomsSectionProps {
  tagline: string;
  title: {
    main: string;
    italic: string;
  };
  description: string;
  cards: RoomCard[];
}

const RoomsSection: React.FC<RoomsSectionProps> = ({
  tagline,
  title,
  description,
  cards,
}) => {
  return (
    <SectionWithContainer
      sectionClassName="border-y border-[#DFD6C9] bg-tertiary"
    >
      <div className="flex flex-col">

        {/* ================= HEADING ================= */}
        <div className="grid grid-cols-1 items-center justify-between gap-6 lg:grid-cols-2 lg:gap-12">

          {/* LEFT */}
          <div>
            <p className="font-dmsans font-normal not-italic text-[16px] leading-[15px] tracking-[2.3px] text-secondary uppercase align-middle">
              {tagline}
            </p>

            <h2 className="mt-[24px] font-ivy font-normal text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.14] lg:leading-[64px] tracking-[0.07em] text-primary align-middle">
              <span className="not-italic uppercase block">{title.main}</span>
              <span className="block">
                <span className="italic normal-case">Timeless</span>
                <span className="not-italic uppercase"> ELEGANCE</span>
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <p className="max-w-[448px] justify-self-end font-montserrat font-medium not-italic text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px] tracking-normal text-secondary align-middle">
            {description}
          </p>
        </div>

        {/* ================= ROOM CARDS ================= */}
        <div className="mt-12 sm:mt-14 lg:mt-[56px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] justify-items-center">
          {cards.map((card, index) => (
            <RoomsCard key={index} {...card} />
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default RoomsSection;


/* =====================================================
   ROOM CARD 
===================================================== */

export const RoomsCard: React.FC<RoomCard> = ({
  title,
  description,
  amenities,
  buttons,
  images,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="flex flex-col w-full max-w-[424px] overflow-hidden">

      {/* ================= IMAGE SLIDER (424x382px) ================= */}
      <div className="relative w-full lg:w-[424px] h-[280px] sm:h-[320px] lg:h-[382px] overflow-hidden shrink-0">

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={images.length > 1}
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`${title} - image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

                {/* DEMO IMAGE */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
                    Demo Image
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* PREVIOUS */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label={`Previous ${title} image`}
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
          >
            <SliderPrevIcon className="w-10 h-10" />
          </button>
        )}

        {/* NEXT */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label={`Next ${title} image`}
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
          >
            <SliderNextIcon className="w-10 h-10" />
          </button>
        )}
      </div>

      {/* ================= CONTENT  ================= */}
      <div className="flex flex-col justify-between w-full lg:w-[424px] h-auto lg:h-[288px] min-h-[288px] p-[16px] gap-[21px] bg-[#F3EEE7] border-x border-b border-t-0 border-[#BCA049]">

        {/* TOP CONTENT */}
        <div className="flex flex-col items-start w-full">
          {/* TITLE */}
          <h3 className="font-ivy font-normal not-italic text-[20px] sm:text-[22px] lg:text-[24px] leading-[28px] lg:leading-[32px] tracking-[0.07em] text-primary align-middle">
            {title}
          </h3>

          {/* AMENITIES */}
          <ul className="mt-3 flex flex-wrap gap-[8px]">
            {amenities.map((amenity, index) => (
              <li
                key={index}
                className="flex items-center justify-center h-[29px] px-[12px] py-[4px] rounded-[24px] bg-[#FFFFFF] border-[0.5px] border-[#BCA049] font-montserrat text-[12px] sm:text-[13px] leading-none text-[#221811]"
              >
                {amenity.label}
              </li>
            ))}
          </ul>

          {/* DESCRIPTION */}
          <p className="mt-3 font-montserrat font-medium not-italic text-[15px] sm:text-[18px] leading-[24px] sm:leading-[30px] tracking-normal text-secondary align-middle">
            {description}
          </p>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center gap-[12px] w-full pt-2 border-t border-[#DFD6C9]/60">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.link}
              className={`flex items-center justify-center gap-[8px] w-full sm:flex-1 h-[41px] px-[16px] py-[12px] font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 ${index === 0
                  ? "bg-white text-[#221811] border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                  : "bg-[#221811] text-white border border-[#221811] hover:opacity-90 active:scale-[0.98]"
                }`}
            >
              {index === 0 ? (
                <WhatsAppIcon className="shrink-0 w-[14px] h-[14px]" />
              ) : (
                <CalendarIcon className="shrink-0 w-[16px] h-[16px]" />
              )}
              <span className="whitespace-nowrap">{button.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};