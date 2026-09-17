export interface TestimonialsProps {
  tagline: string;
  title: string;
  reviews: {
    location?: string;
    name: string;
    review: string;
  }[];
}