import GalleryGrid from "./components/Grid";
import GalleryIntro from "./components/Intro";
import { galleryData } from "./components/pagedata";


export default function GalleryPage() {
  return (
    <main>
      <GalleryIntro
        title={galleryData.title}
        description={galleryData.description}
      />

      <GalleryGrid images={galleryData.images} />
    </main>
  );
}