import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Diamond } from "@/components/site/ui";
import { photo, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your enquiry has reached Manratan Resort.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

const bg = photo("facade-night-full", "Manratan Resort lit up at night");

export default function ThankYouPage() {
  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-5 py-20 text-center text-stone">
      <Image src={bg.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
      <div className="max-w-[560px]">
        <Diamond className="mx-auto h-6 w-6 text-brass-light" />
        <h1 className="t-display mt-6 text-[clamp(2.4rem,6vw,4rem)]">Thank you</h1>
        <p className="t-script mt-1 text-[clamp(1.6rem,3vw,2.2rem)]">Your enquiry is with us</p>
        <p className="t-body-light mx-auto mt-6 max-w-[46ch]">
          Our reservations team will call or write back to confirm availability and rates for your dates.
        </p>
        <p className="mt-6 text-sm text-stone/80">
          Prefer to talk now?{" "}
          <a href={`tel:${site.contact.phone[0].replace(/\s/g, "")}`} className="link-line">
            {site.contact.phone[0]}
          </a>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="/" className="t-label bg-stone px-8 py-4 text-ink transition-colors hover:bg-white">
            Back to the resort
          </Link>
          <a href={site.contact.WhatsappCta} target="_blank" rel="noreferrer" className="link-line t-label">
            WhatsApp us
          </a>
        </div>
      </div>
    </main>
  );
}
