import type { Metadata } from "next";
import Image from "next/image";
import { Container, Title } from "@/components/site/ui";
import { photo, site } from "@/data/site";
import { faqData } from "./components/pageData";

export const metadata: Metadata = {
  title: "Contact & Reservations",
  description:
    "Call, email or WhatsApp Manratan Resort, NH-46 Biaora Road, Narsinghgarh, Madhya Pradesh. Reservations, celebrations and directions.",
  alternates: { canonical: "/contactus" },
};

const reception = photo("reception-welcome", "The Manratan reception team greeting guests with a namaste");
const lobby = photo("lobby-chandeliers", "Lobby lounge with crystal chandeliers and red velvet sofas");

export default function ContactPage() {
  const { contact } = site;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <main className="bg-stone">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-20 sm:px-12 lg:px-16 xl:px-24">
          <Title as="h1" main="Contact us" script="Let's plan your stay" />
          <Image src="/images/bell.png" alt="" width={720} height={175} className="mt-10 h-auto w-full max-w-[420px] opacity-80" aria-hidden="true" />
          <p className="t-body mt-10 max-w-[44ch]">
            From booking questions to special requests, we are a message away. We look forward to welcoming you to Manratan.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="t-label bg-ink px-8 py-4 text-stone transition-colors hover:bg-ink-soft">
              View on Google Maps
            </a>
            <a href={contact.WhatsappCta} target="_blank" rel="noreferrer" className="t-label border border-ink/40 px-8 py-4 text-ink transition-colors hover:bg-ink hover:text-stone">
              WhatsApp us
            </a>
          </div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-[680px]">
          <Image src={reception.src} alt={reception.alt} fill preload sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative order-2 min-h-[380px] lg:order-1 lg:min-h-[600px]">
          <Image src={lobby.src} alt={lobby.alt} fill quality={85} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="order-1 bg-ink px-5 py-20 text-stone sm:px-12 lg:order-2 lg:px-16 xl:px-24">
          <dl className="divide-y divide-stone/15">
            <div className="pb-8">
              <dt className="t-display text-2xl">Email</dt>
              <dd className="mt-3 text-stone/80"><a href={`mailto:${contact.email}`} className="hover:text-white break-all">{contact.email}</a></dd>
            </div>
            <div className="py-8">
              <dt className="t-display text-2xl">Phone</dt>
              <dd className="mt-3 space-y-1 text-stone/80">
                {contact.phone.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-white">{p}</a>
                ))}
              </dd>
            </div>
            <div className="pt-8">
              <dt className="t-display text-2xl">Address</dt>
              <dd className="mt-3 max-w-[40ch] leading-relaxed text-stone/80">
                <address className="not-italic">{contact.address}</address>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="faq-title">
        <Container className="max-w-[820px]">
          <div id="faq-title">
            <Title main="FAQs" script="Stay informed" align="center" />
          </div>
          <div className="mt-14 border-t border-ink/20">
            {faqData.map((f) => (
              <details key={f.question} className="group border-b border-ink/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="t-display text-[1.05rem] sm:text-[1.15rem]">{f.question}</span>
                  <span className="text-xl font-light text-ink transition-transform duration-500 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="t-body max-w-[64ch] pb-6">{f.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
