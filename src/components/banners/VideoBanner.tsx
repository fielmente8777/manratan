import { Container, Section } from "@/components/sectionComponants";
import { LazyLoadedVideo } from "@/components/Video";
import LandingNavbar from "../navbar/LandingNavbar";
import Form1 from "../forms/Form1";

interface VideoBannerProps {
  video: {
    src: string;
    poster: string;
  };
  benefit: string;
}

const VideoBanner: React.FC<VideoBannerProps> = ({ video, benefit }) => {
  return (
    <Section
      defaultPadding={false}
      className="relative w-full lg:aspect-[16/7.7] aspect-[4/3.7] overflow-hidden"
    >
      <div className="inset-x-0 absolute z-30 ">
        <LandingNavbar />
      </div>
      <LazyLoadedVideo src={video.src} poster={video.poster} />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80  to-black/10" />

      <div className="absolute inset-0  z-20 md:flex items-end pb-10 justify-center  hidden">
        <Container>
          <div
            className="bg-background/80 py-6 px-1.5 rounded-[20px] mt-8 flex flex-col gap-5 max-w-6xl w-full mx-auto"
            id="form"
          >
            <Form1 />
            <p
              className="text-sm text-light max-w-3xl text-center mx-auto"
              dangerouslySetInnerHTML={{ __html: benefit }}
            />
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default VideoBanner;
