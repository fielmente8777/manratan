// "use client";

// import { TestimonialsProps } from "@/@types/landingPageTypes";
// import SwiperCarousel from "@/components/sliders/SwiperCarousel";
// import { Autoplay } from "swiper/modules";

// const TestimonialsSlider: React.FC<{
//   reviews: TestimonialsProps["reviews"];
// }> = ({ reviews }) => {
//   return (
//     <div className="w-full">
//       <SwiperCarousel
//         data={reviews}
//         modules={[Autoplay]}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         slidesPerView={1}
//         spaceBetween={26}
//         loop
//         className="p-1!"
//         breakpoints={{
//           640: {
//             slidesPerView: 1,
//           },
//           768: {
//             slidesPerView: 2,
//           },
//           1024: {
//             slidesPerView: 3,
//           },
//         }}
//         renderSlide={(item) => (
//           <div className="rounded-2xl  backdrop-blur-sm border border-[#DFD6C9] bg-background-dark-2 p-6 flex flex-col gap-5">
//             <p className="text-p1">★★★★★</p>
//             <p className="text-dark">{item.review}</p>
//             <div className="w-full h-px bg-[#DFD6C9]" />
//             <p className="text-lg text-dark capitalize">{item.name}</p>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default TestimonialsSlider;

"use client";

import { TestimonialsProps } from "@/@types/landingPageTypes";
import SwiperCarousel from "@/components/sliders/SwiperCarousel";
import { Autoplay } from "swiper/modules";
import { StarIcon, QuoteIcon } from "@/utils/icons";

const TestimonialsSlider: React.FC<{
  reviews: TestimonialsProps["reviews"];
}> = ({ reviews }) => {
  return (
    <div className="w-full">
      <SwiperCarousel
        data={reviews}
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
          <div className="flex flex-col justify-between w-full lg:w-[424px] min-h-[276px] p-[24px] gap-[16px] bg-white">
            {/* Top Content: Quote & Review */}
            <div className="flex flex-col gap-[16px]">
              {/* Quote Icon */}
              <QuoteIcon className="w-5 h-5 shrink-0" />

              {/* Review Text */}
              <p className="font-dmsans font-normal not-italic text-[18px] leading-[26px] tracking-normal align-middle text-[#5E534A]">
                {item.review}
              </p>
            </div>

            {/* Bottom Row: Rating + Guest Name */}
            <div className="mt-auto flex items-center gap-[8px]">
              <div className="flex items-center gap-[3px]">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3 h-3 shrink-0" />
                ))}
              </div>

              <p className="font-dmsans font-normal not-italic text-[14px] leading-[20px] tracking-normal align-middle text-[#5E534A]">
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
