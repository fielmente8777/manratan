import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./style.scss";
import { WebProvider } from "@/context-api/WebContext";
import PopUpForm from "@/components/pop-up/PopUpForm";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Chrome from "@/components/site/Chrome";
import { site } from "@/data/site";

// Display faces subset to Latin and served as WOFF2 (was ~450 KB of TTF/OTF).
const ivyOra = localFont({
  src: "../../public/fonts/IvyOraDisplay-Regular.woff2",
  variable: "--font-ivyora",
  display: "swap",
});
const goldenHopes = localFont({
  src: "../../public/fonts/GoldenHopes_PERSONAL_USE_ONLY.woff2",
  variable: "--font-golden-hopes",
  display: "swap",
});

// Self-hosted (no request to Google Fonts): Montserrat for the site, DM Sans for the ad landing page.
const montserrat = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-ext-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});
const dmSans = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  weight: "100 1000",
  variable: "--font-dmsans",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Manratan Resort, Narsinghgarh", template: "%s | Manratan Resort" },
  description:
    "Manratan Resort, Narsinghgarh: 65 rooms and suites, Swadika pure vegetarian restaurant, the Blue Diamond pool, banquet halls and wedding lawns in the hills of Malwa, Madhya Pradesh.",
  openGraph: {
    type: "website",
    siteName: "Manratan Resort",
    locale: "en_IN",
    images: [{ url: "/media/facade-dusk.webp", width: 1448, height: 1086, alt: "Manratan Resort at dusk" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#221811" };

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": ["Hotel", "LodgingBusiness"],
  name: "Manratan Resort",
  url: site.url,
  image: [`${site.url}/media/facade-dusk.webp`, `${site.url}/media/pool-dusk.webp`, `${site.url}/media/suite-1.webp`],
  description:
    "Resort in Narsinghgarh, Madhya Pradesh with 65 rooms and suites, a pure vegetarian restaurant, an outdoor swimming pool, banquet halls and wedding lawns.",
  telephone: site.contact.phone[0],
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "NH-46, Biaora Road",
    addressLocality: "Narsinghgarh",
    addressRegion: "Madhya Pradesh",
    postalCode: "465669",
    addressCountry: "IN",
  },
  numberOfRooms: 65,
  checkinTime: "14:00",
  checkoutTime: "11:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Outdoor swimming pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Banquet hall", value: true },
  ],
  servesCuisine: ["Vegetarian", "North Indian", "Malwa"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} ${ivyOra.variable} ${goldenHopes.variable} h-full antialiased`}
    >
      <body className="site-body min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
        <WebProvider>
          <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-stone focus:px-4 focus:py-2 focus:text-ink">
            Skip to content
          </a>
          <Chrome>
            <Header />
          </Chrome>
          <div id="content" className="flex-1">{children}</div>
          <Chrome>
            <Footer />
          </Chrome>
          <PopUpForm />
        </WebProvider>
      </body>
    </html>
  );
}
