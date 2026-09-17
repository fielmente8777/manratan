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

import "swiper/css";

import LinkButton from "@/components/buttons/LinkButton";
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
        <div className="grid grid-cols-1 items-end gap-6 border-b border-[#DFD6C9] pb-7 lg:grid-cols-2 lg:gap-12">

          {/* LEFT */}
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-secondary md:text-xs">
              {tagline}
            </p>

            <h2 className="font-ivy text-4xl font-normal uppercase leading-[0.95] text-primary sm:text-5xl md:text-[52px] lg:text-[54px]">
              {title.main}
              <br />
              <span className="italic">{title.italic}</span>
            </h2>
          </div>

          {/* RIGHT */}
          <p className="max-w-[420px] justify-self-end text-sm leading-[1.6] text-secondary md:text-base">
            {description}
          </p>
        </div>

        {/* ================= ROOM CARDS ================= */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="flex min-w-0 flex-col">

      {/* ================= IMAGE SLIDER ================= */}
      <div className="relative aspect-[4/3.1] w-full overflow-hidden">

        <Swiper
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
            className="
              absolute left-2 top-1/2 z-20
              flex h-9 w-9
              -translate-y-1/2
              items-center justify-center
              rounded-full
              bg-white
              text-primary
              transition-transform duration-300
              hover:scale-105
              md:h-10 md:w-10
            "
          >
            {/* <BtnPrevIcon /> */}
          </button>
        )}

        {/* NEXT */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label={`Next ${title} image`}
            onClick={() => swiperRef.current?.slideNext()}
            className="
              absolute right-2 top-1/2 z-20
              flex h-9 w-9
              -translate-y-1/2
              items-center justify-center
              rounded-full
              bg-white
              text-primary
              transition-transform duration-300
              hover:scale-105
              md:h-10 md:w-10
            "
          >
            {/* <BtnNext /> */}
          </button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col border-x border-b border-[#DFD6C9] bg-white p-3 md:p-4">

        {/* TITLE */}
        <h3 className="font-ivy text-xl leading-none text-primary md:text-[22px]">
          {title}
        </h3>

        {/* AMENITIES */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <li
              key={index}
              className="
                rounded-full
                border border-[#DFD6C9]
                px-2.5 py-1
                text-[9px]
                text-secondary
                md:text-[10px]
              "
            >
              {amenity.label}
            </li>
          ))}
        </ul>

        {/* DESCRIPTION */}
        <p className="mt-4 text-sm leading-[1.55] text-secondary md:text-[13px]">
          {description}
        </p>

        {/* DIVIDER */}
        <div className="mt-auto mb-3 pt-4">
          <div className="h-px w-full bg-[#DFD6C9]" />
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {buttons.map((button, index) => (
            <LinkButton
              key={index}
              href={button.link}
              label={button.label}
              whatsAppIcon={index === 0}
              calendarIcon={index === 1}
              className={`
                w-full
                justify-center
                rounded-md
                px-3
                py-2
                text-[10px]!
                uppercase
                ${
                  index === 0
                    ? "border border-primary bg-white text-primary"
                    : "border border-primary bg-primary text-white"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};