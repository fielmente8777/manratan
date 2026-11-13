"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { site } from "@/data/site";
import { Container } from "@/components/sectionComponants";

const explore = [
  { label: "Our story", href: "/about" },
  { label: "Rooms & suites", href: "/accommodation" },
  { label: "Weddings & events", href: "/events" },
  { label: "Swadika", href: "/gallery?category=dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/blogs" },
];
const gettingHere = [
  { from: "Bhopal Airport", detail: "approx. 70 km · 1.5 hrs" },
  { from: "Railway station", detail: "approx. 30 km · 30 mins" },
  { from: "Indore", detail: "approx. 210 km · 3–4 hrs" },
];

function FooterGroup({ title, id, expanded, onToggle, children }: { title: string; id: string; expanded: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="border-b border-stone/15 pb-5 md:border-0 md:pb-0">
      <h3 className="t-label mb-6 hidden !text-base text-brass md:block">{title}</h3>
      <button type="button" aria-expanded={expanded} aria-controls={`footer-${id}`} onClick={onToggle} className="t-label flex w-full items-center justify-between !text-base text-brass md:hidden">
        {title}
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}><path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.2" /></svg>
      </button>
      <div id={`footer-${id}`} className={`${expanded ? "block" : "hidden"} pt-5 md:block md:pt-0`}>{children}</div>
    </div>
  );
}

export default function Footer() {
  const { contact } = site;
  const [open, setOpen] = useState<string | null>("explore");
  const toggle = (id: string) => setOpen((current) => current === id ? null : id);
  return (
    <footer className="max_screen_width bg-ink text-base text-stone">
      <Container className="pb-10 pt-12 md:pt-20">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <Link href="/" aria-label="Manratan Resort home"><Image src="/images/footer.png" alt="Manratan Resort" width={220} height={68} className="h-auto w-[180px] sm:w-[190px]" /></Link>
          <p className="t-script text-[clamp(1.9rem,3.2vw,2.9rem)] text-brass">{site.tagline}</p>
        </div>
        <div className="mt-10 h-px bg-stone/15 md:mt-14" aria-hidden="true" />

        <div className="mt-6 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10">
          <FooterGroup title="Visit" id="visit" expanded={open === "visit"} onToggle={() => toggle("visit")}>
            <address className="text-base not-italic leading-[1.9] text-stone/70">NH-46, Biaora Road,<br />Narsinghgarh, Dist. Rajgarh,<br />Madhya Pradesh &ndash; 465669</address>
            <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="link-line t-label mt-6 !text-base text-stone">Get directions</a>
          </FooterGroup>
          <FooterGroup title="Explore" id="explore" expanded={open === "explore"} onToggle={() => toggle("explore")}>
            <nav aria-label="Footer"><ul className="space-y-3 text-base text-stone/90">{explore.map((link) => <li key={link.href}><Link href={link.href} className="transition-colors hover:text-brass-light">{link.label}</Link></li>)}</ul></nav>
          </FooterGroup>
          <FooterGroup title="Getting here" id="getting-here" expanded={open === "getting-here"} onToggle={() => toggle("getting-here")}>
            <ul className="space-y-4 text-base leading-[1.6]">{gettingHere.map((place) => <li key={place.from}><span className="block text-stone/60">{place.from}</span><span className="block text-stone/90">{place.detail}</span></li>)}</ul>
          </FooterGroup>
          <FooterGroup title="Reservations" id="reservations" expanded={open === "reservations"} onToggle={() => toggle("reservations")}>
            <ul className="space-y-4 text-base text-stone/90">
              {contact.phone.map((phone) => <li key={phone}><a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 hover:text-white"><FiPhone className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />{phone}</a></li>)}
              <li><a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 break-all hover:text-white"><FiMail className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />{contact.email}</a></li>
            </ul>
          </FooterGroup>
        </div>

        <div className="mt-10 h-px bg-stone/15 md:mt-16" aria-hidden="true" />
        <div className="mt-8 flex flex-col items-center gap-3 text-center text-sm tracking-[0.04em] md:flex-row md:justify-between">
          <p className="text-stone/70">&copy; Manratan Resort {new Date().getFullYear()}</p>
          <p className="text-brass-light/90">Powered by <a href="https://fielmente.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Fielmente</a></p>
        </div>
      </Container>
    </footer>
  );
}
