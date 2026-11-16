import type { Metadata } from "next";
import AccommodationContent from "./AccommodationContent";
import "./accommodation-reference.css";

export const metadata: Metadata = {
  title: "Rooms & Suites in Narsinghgarh",
  description:
    "65 rooms in five styles at Manratan Resort, Narsinghgarh: Deluxe, Deluxe Interconnected, Executive Family, Premium with sofa-cum-bed, and two Executive Suites. Garden, pool and hill views with Wi-Fi, AC and in-room dining.",
  alternates: { canonical: "/accommodation" },
};

export default function AccommodationPage() {
  return <AccommodationContent />;
}
