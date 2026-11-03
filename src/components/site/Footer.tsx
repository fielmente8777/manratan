import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { ButtonLink, Container, GemRule } from "./ui";

export default function Footer() {
  const { contact } = site;
  return (
    <footer className="bg-ink text-stone">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1.05fr_1fr]">
          <div>
            <Link href="/" aria-label="Manratan Resort home" className="inline-block">
              <Image src="/images/footer.png" alt="Manratan Resort" width={220} height={68} className="h-auto w-[200px]" />
            </Link>
            <p className="t-body-light mt-6 max-w-xs">
              {site.tagline}. Sixty-five rooms and suites, Swadika, the Blue Diamond pool and celebration venues on NH-46, Narsinghgarh.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="t-display text-lg mb-5">Links</p>
            <ul className="space-y-3 text-sm text-stone/75">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-display text-lg mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-stone/75">
              {contact.phone.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{p}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
              </li>
              <li>
                <a href={contact.WhatsappCta} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp us</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-6">
            <ButtonLink href="/accommodation" tone="light">Find a room</ButtonLink>
            <address className="not-italic text-sm leading-relaxed text-stone/75 max-w-xs">
              {contact.address}
              <br />
              <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="link-line t-label mt-3 text-stone">
                Get directions
              </a>
            </address>
          </div>
        </div>

        <GemRule tone="light" className="mt-16" />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs tracking-[0.14em] uppercase text-stone/55">
          <p>© Manratan Resort {new Date().getFullYear()}</p>
          <p>
            Crafted by{" "}
            <a href="https://fielmente.com" target="_blank" rel="noreferrer" className="hover:text-stone">Fielmente</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
