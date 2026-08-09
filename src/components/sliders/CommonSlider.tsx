"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import SwiperCarousel from "./SwiperCarousel";
interface Props {
  title: string;
  images: string[];
  wrapperSliderClassName?: string;
  sectionClassName?: string;
}
const CommonSlider: React.FC<Props> = ({
  title,
  images,
  wrapperSliderClassName,
  sectionClassName,
}) => {
  return (
    <div className={`w-full ${sectionClassName}`}>
      <div className={`space-y-6 ${wrapperSliderClassName}`}>
        <SwiperCarousel
          data={images}
          slidesPerView={1}
          spaceBetween={16}
          loop
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          className="w-full"
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          renderSlide={(src) => (
            <div className="w-full relative aspect-4/4.5">
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  background: "white",
                }}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CommonSlider;
