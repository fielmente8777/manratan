"use client";

import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import Headings from "@/components/typography/Headings";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay, EffectCoverflow } from "swiper/modules";

interface CategoryItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}

interface HostYourEventsProps {
  title: {
    heading: string;
    subHeading: string;
  };
  categories: CategoryItem[];
}

export default function HostYourEvents({
  title,
  categories,
}: HostYourEventsProps) {
  const data = categories.length < 5 ? [...categories, ...categories, ...categories] : categories;

  return (
    <SectionWithContainer sectionClassName="bg-tertiary py-16 md:py-24 overflow-hidden">
      <div className="max-w mx-auto text-center">
        {/* Section Header */}
        <div className="w-fit mx-auto text-right mb-12">
          <Headings
            level={2}
            heading={title.heading}
            className="text-primary text-3xl sm:text-4xl md:text-5xl font-[serif] font-normal uppercase tracking-[0.05em]"
          />

          <p className="font-golden text-primary/80 text-2xl sm:text-3xl md:text-4xl mt-1 text-right -mr-4 sm:-mr-8 md:-mr-12">
            {title.subHeading}
          </p>
        </div>

        {/* Swiper Carousel using project SwiperCarousel component */}
        <div>
          <SwiperCarousel
            data={data || []}
            modules={[EffectCoverflow, Autoplay]}
            className="w-full we-offer-slider"
            swiperSlideClassName="swiper-slide"
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 20,
              depth: 300,
              modifier: 2.5,
              slideShadows: false,
            }}
            speed={800}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            renderSlide={(item) => (
              <div className="w-full">
                <div className="w-full relative aspect-[4/2.5] rounded-none overflow-hidden shadow-[20px_0_25px_-5px_rgba(0,0,0,0.35),-20px_0_25px_-5px_rgba(0,0,0,0.35)] border border-black/10">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Title Text Below Image */}
                <div className="mt-4 text-center">
                  <p className="text-sm sm:text-base font-normal tracking-[0.1em] uppercase text-primary font-[serif]">
                    {item.title}
                  </p>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </SectionWithContainer>
  );
}
