"use client";

import { TestimonialsProps } from "@/@types/landingPageTypes";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay } from "swiper/modules";
import { StarIcon, QuoteIcon } from "@/utils/icons";

const TestimonialsSlider: React.FC<{
  reviews: TestimonialsProps["reviews"];
}> = ({ reviews }) => {
  const displayReviews =
    reviews.length > 0 && reviews.length < 6
      ? [...reviews, ...reviews]
      : reviews;

  return (
    <div className="w-full">
      <SwiperCarousel
        data={displayReviews}
        modules={[Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={24}
        loop
        className="w-full py-2"
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        renderSlide={(item) => (
          <div className="flex flex-col justify-between w-full lg:w-[424px] min-h-0 sm:min-h-[276px] p-4 sm:p-[24px] gap-3 sm:gap-[16px] bg-white">
            {/* Content */}
            <div className="flex flex-col gap-3 sm:gap-[16px]">
              {/* Quote Icon */}
              <QuoteIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />

              {/* Review Text */}
              <p className="font-dmsans font-normal not-italic text-[15px] sm:text-[18px] leading-[22px] sm:leading-[26px] tracking-normal align-middle text-[#5E534A]">
                {item.review}
              </p>
            </div>

            {/* Rating and Name */}
            <div className="mt-4 sm:mt-auto flex items-center gap-[8px]">
              <div className="flex items-center gap-[3px]">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3 h-3 shrink-0" />
                ))}
              </div>

              <p className="font-dmsans font-normal not-italic text-[12.5px] sm:text-[14px] leading-[18px] sm:leading-[20px] tracking-normal align-middle text-[#5E534A]">
                Guest From {item.name.replace(/^Guest\s+[Ff]rom\s*/i, "")}
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default TestimonialsSlider;
