"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";

const gems = [
  {
    num: "01",
    name: "Blue Sapphire",
    cap: "Banquet hall · 300–400 guests",
    desc: "Chandeliers and a sapphire carpet, for weddings, sangeet, mehendi, haldi, receptions and corporate events.",
    img: "/events-page/fb3f33ecb5693c969ba11a9d05f2508b.jpg",
    alt: "Blue Sapphire banquet hall set with round tables under crystal chandeliers",
    color: "#4A78C0",
  },
  {
    num: "02",
    name: "Golden Sapphire",
    cap: "Banquet hall · 25–80 guests",
    desc: "An intimate hall for birthdays, anniversaries, engagements and meetings, with a projector provided.",
    img: "/events-page/b6c9d4ee7b169d2e1bcc67ac96263532.jpg",
    alt: "Golden Sapphire hall set in black and gold with balloon decor",
    color: "#D9A94E",
  },
  {
    num: "03",
    name: "Blue Diamond",
    cap: "Poolside · 300–400 guests",
    desc: "Sundowners, poolside parties, pre-wedding mixers, candlelight dinners and proposals by the water.",
    img: "/events-page/818adea292603515b98d4a0156693684.jpg",
    alt: "A floral mandap beside the Blue Diamond pool, with guests gathered around",
    color: "#A9D8EC",
  },
  {
    num: "04",
    name: "Sky Lawn",
    cap: "Open-air terrace · up to 20 guests",
    desc: "An intimate open-air space for private celebrations and small gatherings.",
    img: "/events-page/7271f0ff0b4466e1112fca030f17a117.jpg",
    alt: "The Sky Lawn terrace with lounge seating",
    color: "#E9D7B4",
  },
  {
    num: "05",
    name: "Red Coral Lawn",
    cap: "Open-air lawn · 500–4,000 guests",
    desc: "Our largest venue: grand weddings, receptions, musical evenings, festivals and large corporate events under the open sky.",
    img: "/events-page/c8bf4789cea881bd92707e31a0a2b3dd.jpg",
    alt: "The wide green Red Coral Lawn under a soft evening sky",
    color: "#D9573F",
  },
];

const reels = [
  {
    tag: "Receptions",
    title: "The Red Coral Lawn at golden hour",
    img: "/events-page/c8bf4789cea881bd92707e31a0a2b3dd.jpg",
  },
  {
    tag: "Weddings",
    title: "A mandap by the Blue Diamond pool",
    img: "/events-page/818adea292603515b98d4a0156693684.jpg",
  },
  {
    tag: "Sangeet",
    title: "Blue Sapphire, set for the night",
    img: "/events-page/845d3c50e24e5a1e1b672c66abc701e9.jpg",
  },
  {
    tag: "Proposals",
    title: "A yes by the water",
    img: "/events-page/0b64d8ee48683a1436cce01ef0bd9fb8.jpg",
  },
];

const occasions = [
  {
    title: "Destination weddings",
    desc: "Rooms for the family, halls and lawns for every ceremony, all in one place.",
    venue: "All venues",
    dot: "#C9A46C",
    img: "/events-page/818adea292603515b98d4a0156693684.jpg",
    alt: "A floral mandap beside the pool with wedding guests",
  },
  {
    title: "Haldi, mehendi & sangeet",
    desc: "Marigold mornings by the pool and music nights in the Blue Sapphire hall.",
    venue: "Blue Diamond · Blue Sapphire",
    dot: "#4A78C0",
    img: "/haldi.jpeg",
    alt: "Vibrant Haldi ceremony setup with marigold flowers",
  },
  {
    title: "Receptions",
    desc: "The Red Coral Lawn takes up to 4,000 guests under the open sky.",
    venue: "Red Coral Lawn · up to 4,000",
    dot: "#D9573F",
    img: "/events-page/c8bf4789cea881bd92707e31a0a2b3dd.jpg",
    alt: "The Red Coral Lawn, ready for a reception",
  },
  {
    title: "Birthdays & anniversaries",
    desc: "The Golden Sapphire hall, a Sky Lawn evening or a long family dinner at Swadika.",
    venue: "Golden Sapphire · Sky Lawn",
    dot: "#D9A94E",
    img: "/events-page/b6c9d4ee7b169d2e1bcc67ac96263532.jpg",
    alt: "Golden Sapphire hall with balloon decor for a birthday",
  },
  {
    title: "Candlelight dinners & proposals",
    desc: "A table for two by the Blue Diamond pool, and proposals arranged at the poolside.",
    venue: "Blue Diamond poolside",
    dot: "#A9D8EC",
    img: "/events-page/0b64d8ee48683a1436cce01ef0bd9fb8.jpg",
    alt: "A flower-draped pavilion by the pool set for a proposal",
  },
  {
    title: "Corporate events",
    desc: "Conference set-ups with screen and podium, a projector in the Golden Sapphire hall, and rooms for the team.",
    venue: "Golden Sapphire · Blue Sapphire",
    dot: "#D9A94E",
    img: "/events-page/4c58e0c82a181387981f70379aee86ae.jpg",
    alt: "The Golden Sapphire hall set for a gathering",
  },
];

export default function EventsView() {
  const [activeGem, setActiveGem] = useState<number>(2);

  return (
    <div className="max_screen_width font-sans text-[#54473C] bg-[#FBF7EF] antialiased overflow-x-clip relative mx-auto">
      {/* ============ 1. HERO ============ */}
      <header className="group relative min-h-[460px] sm:min-h-[500px] md:min-h-[clamp(560px,58vw,760px)] flex flex-col text-[#F6EFE4] bg-[#221811] overflow-hidden">
        <Image
          className="absolute inset-0 w-full h-full object-cover object-[50%_55%] transition-transform duration-1000 ease-out group-hover:scale-105"
          src="/event-banner.jpg"
          alt="The Blue Sapphire banquet hall fully set for a celebration"
          fill
          priority
          sizes="100vw"
          quality={92}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#19110b]/55 via-[#19110b]/20 to-[#19110b]/72 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-[2] mt-auto pb-14 sm:pb-16 md:pb-[clamp(96px,10vw,136px)] px-2 sm:px-3.5 md:px-[clamp(20px,5.6vw,80px)] max-w-[1440px] mx-auto w-full flex flex-col items-center gap-[22px] text-center">
          <h1 className="m-0 font-display font-normal text-[#F6EFE4] uppercase leading-[0.98] text-center">
            <span className="block text-[clamp(33px,9.2vw,42px)] sm:text-[clamp(38px,9.6vw,56px)] md:text-[clamp(48px,6.8vw,96px)] tracking-[0.005em] sm:tracking-[0.01em] md:tracking-[0.02em] leading-none md:leading-[0.98]">
              Celebrations
            </span>
            <span className="block font-script font-normal normal-case text-[#F6EFE4] leading-none text-[clamp(40px,11vw,52px)] sm:text-[clamp(44px,11vw,66px)] md:text-[clamp(44px,5.8vw,88px)] pl-[0.3em] sm:pl-[0.4em] md:pl-[1.4em] -mt-[0.04em]">
              at Manratan
            </span>
          </h1>
        </div>
      </header>

      {/* ============ 2. INTRO ============ */}
      <section className="relative z-[3] -mt-7 md:-mt-[44px] rounded-t-[28px] md:rounded-t-[44px] bg-[#FBF7EF] pt-0" aria-labelledby="intro-title">
        <div className="relative z-[2] max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)] py-[42px] sm:py-12 md:pt-[clamp(88px,8vw,120px)] md:pb-[clamp(88px,9vw,132px)]">
          <div className="max-w-[820px] mx-auto text-center flex flex-col items-center gap-4 sm:gap-5 md:gap-7">
            <div className="flex items-center justify-center gap-3.5 text-[#9C7A45]" aria-hidden="true">
              <span className="block w-16 h-px bg-current opacity-60" />
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 1l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <span className="block w-16 h-px bg-current opacity-60" />
            </div>
            <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#7A5F3A]">
              Events &amp; celebrations
            </p>
            <h2 className="m-0 font-display font-normal text-[clamp(40px,4.5vw,64px)] leading-[1.02] uppercase text-[#221811] text-center text-balance" id="intro-title">
              Crafted
              <span className="block font-script font-normal normal-case tracking-normal text-[0.8em] leading-none -mt-[0.06em] pl-[1.8em] text-[#221811]">
                to be remembered
              </span>
            </h2>
            <p className="m-0 font-display font-normal text-[clamp(22px,2vw,28px)] leading-[1.4] text-[#221811] text-pretty">
              From royal destination weddings and intimate family gatherings to poolside soirées and corporate retreats, every celebration here comes with elegant spaces, gracious hospitality and food people remember.
            </p>
            <p className="m-0 font-sans text-[15px] leading-[1.85] text-[#54473C] max-w-[40em] mx-auto text-pretty text-center">
              Set in the scenic hills of Narsinghgarh, the Mini Kashmir of Malwa, Manratan brings together the art of celebration and the warmth of belonging.
            </p>
          </div>
          <dl className="flex flex-col md:flex-row max-w-[960px] mx-auto mt-7 sm:mt-9 md:mt-[clamp(56px,6vw,80px)] p-0 border-y border-[#221811]/14">
            <div className="flex-1 flex flex-col items-center gap-2.5 py-[30px] px-4 text-center">
              <dt className="font-display font-normal text-[clamp(36px,3.6vw,52px)] leading-none text-[#221811]">
                4,000
              </dt>
              <dd className="m-0 font-sans font-semibold text-[10px] leading-[1.5] tracking-[0.22em] uppercase text-[#7A5F3A]">
                Guests on the Red Coral Lawn
              </dd>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2.5 py-[30px] px-4 text-center border-t border-[#221811]/14 md:border-t-0 md:border-l md:border-[#221811]/14">
              <dt className="font-display font-normal text-[clamp(36px,3.6vw,52px)] leading-none text-[#221811]">
                65
              </dt>
              <dd className="m-0 font-sans font-semibold text-[10px] leading-[1.5] tracking-[0.22em] uppercase text-[#7A5F3A]">
                Rooms for your guests
              </dd>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2.5 py-[30px] px-4 text-center border-t border-[#221811]/14 md:border-t-0 md:border-l md:border-[#221811]/14">
              <dt className="font-display font-normal text-[clamp(36px,3.6vw,52px)] leading-none text-[#221811]">
                100%
              </dt>
              <dd className="m-0 font-sans font-semibold text-[10px] leading-[1.5] tracking-[0.22em] uppercase text-[#7A5F3A]">
                Pure vegetarian catering
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ============ 3. VENUES ============ */}
      <section className="relative py-[clamp(88px,9vw,132px)] bg-[#F2EADD]" id="venues" aria-labelledby="ven-title">
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)]">
          <div className="flex items-end justify-between gap-6 md:gap-12 flex-wrap">
            <div className="flex flex-col gap-[22px]">
              <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#7A5F3A]">
                The venues
              </p>
              <h2 className="m-0 font-display font-normal text-[clamp(40px,4.5vw,64px)] leading-[1.02] uppercase text-[#221811] text-balance" id="ven-title">
                A collection
                <span className="block font-script font-normal normal-case tracking-normal text-[0.8em] leading-none -mt-[0.06em] pl-[2.2em] text-[#221811]">
                  of gems
                </span>
              </h2>
            </div>
            <p className="m-0 font-sans text-[15px] leading-[1.85] text-[#54473C] max-w-[30em] text-pretty">
              Our halls and lawns are named for jewels: sapphire, diamond, coral. Each one suits a different part of the celebration.
            </p>
          </div>

          {/* Desktop Gem Accordion */}
          <div className="hidden md:flex gap-3 h-[660px] mt-[clamp(48px,5vw,64px)]">
            {gems.map((g, idx) => {
              const isOn = activeGem === idx;
              return (
                <button
                  key={g.num}
                  style={{ flexGrow: isOn ? 3.6 : 1 }}
                  className={`group relative min-w-0 p-0 border-0 rounded-[22px] overflow-hidden bg-[#221811] text-[#F6EFE4] text-left isolate transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-visible:outline-2 focus-visible:outline-[#7A5F3A] focus-visible:outline-offset-4 ${
                    isOn ? "cursor-default" : "cursor-pointer"
                  }`}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => setActiveGem(idx)}
                  onMouseEnter={() => setActiveGem(idx)}
                  onFocus={() => setActiveGem(idx)}
                >
                  <div className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105">
                    <Image
                      src={g.img}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      quality={88}
                      className="object-cover"
                    />
                  </div>
                  <span
                    className={`absolute inset-0 z-[1] transition-all duration-700 pointer-events-none ${
                      isOn
                        ? "bg-gradient-to-t from-[#19110b]/82 via-[#19110b]/20 to-[#19110b]/[0.08]"
                        : "bg-gradient-to-t from-[#19110b]/78 to-[#19110b]/42"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="absolute top-[30px] right-[26px] z-[2] font-sans font-semibold text-[10px] leading-none tracking-[0.22em] text-[#EADBC2]">
                    {g.num}
                  </span>
                  <span
                    className={`absolute left-1/2 bottom-[34px] z-[2] block whitespace-nowrap font-display font-normal text-[24px] leading-none uppercase tracking-[0.02em] [writing-mode:vertical-rl] -translate-x-1/2 rotate-180 transition-opacity duration-500 ease-out ${
                      isOn ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                    aria-hidden="true"
                  >
                    {g.name}
                  </span>
                  <span
                    className={`absolute left-10 right-10 bottom-[38px] z-[2] flex flex-col gap-3.5 transition-all duration-500 ease-out pointer-events-none ${
                      isOn
                        ? "opacity-100 translate-y-0 delay-300 pointer-events-auto"
                        : "opacity-0 translate-y-[18px]"
                    }`}
                  >
                    <span className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#E3C78F]">
                      {g.cap}
                    </span>
                    <span className="font-display font-normal text-[clamp(34px,3.2vw,48px)] leading-none uppercase text-[#F6EFE4]">
                      {g.name}
                    </span>
                    <span className="font-sans text-[15px] leading-[1.75] text-[#EFE6D8] max-w-[30em]">
                      {g.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Swiper */}
          <div className="block md:hidden">
            <Swiper
              modules={[Autoplay, A11y]}
              slidesPerView={1}
              spaceBetween={14}
              speed={850}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              a11y={{ containerMessage: "Venues at Manratan Resort" }}
              className="mt-8 [--swiper-wrapper-transition-timing-function:var(--ease-lux)]"
            >
              {gems.map((g) => (
                <SwiperSlide key={g.num}>
                  <div className="group relative block h-[460px] sm:h-[520px] w-full overflow-hidden rounded-[20px] bg-[#221811]">
                    <Image
                      src={g.img}
                      alt={g.alt}
                      fill
                      quality={88}
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="img-drift object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-5 right-6 z-10 text-[11px] font-semibold tracking-[0.22em] text-[#EADBC2]">
                      {g.num}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-6 text-center text-[#F3EEE7] z-10">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E3C78F] mb-1.5">
                        {g.cap}
                      </span>
                      <span className="font-script block text-[2.6rem] leading-none text-[#F6EFE4] mb-2.5">
                        {g.name}
                      </span>
                      <span className="block text-sm text-[#F3EEE7]/85 max-w-sm mx-auto leading-relaxed">
                        {g.desc}
                      </span>
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ============ 4. REELS ============ */}
      <section className="relative py-[clamp(88px,9vw,132px)] bg-[#3A1114] text-[#E8D9C4]" id="reels" aria-labelledby="reel-title">
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)]">
          <div className="flex items-end justify-between gap-6 md:gap-12 flex-wrap">
            <div className="flex flex-col gap-[22px]">
              <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#D8BE8E]">
                Moments in motion
              </p>
              <h2 className="m-0 font-display font-normal text-[clamp(40px,4.5vw,64px)] leading-[1.02] uppercase text-[#F6EFE4] text-balance" id="reel-title">
                The reels
                <span className="block font-script font-normal normal-case tracking-normal text-[0.8em] leading-none -mt-[0.06em] pl-[2.2em] text-[#E3C78F]">
                  from our celebrations
                </span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 max-w-[26em]">
              <p className="m-0 font-sans text-[15px] leading-[1.85] text-[#E8D9C4] text-pretty">
                Haldi mornings, sangeet nights and receptions under the open sky, as they happened at Manratan.
              </p>
            </div>
          </div>
          <ul className="list-none m-0 p-0 mt-[clamp(48px,5vw,64px)] flex flex-col md:flex-row md:overflow-x-auto lg:grid lg:grid-cols-4 gap-6 md:gap-3.5 lg:gap-[clamp(16px,2vw,28px)] snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mr-[clamp(20px,5.6vw,80px)] pr-[clamp(20px,5.6vw,80px)] md:-mr-[clamp(20px,5.6vw,80px)] md:pr-[clamp(20px,5.6vw,80px)] lg:mr-0 lg:pr-0">
            {reels.map((r) => (
              <li key={r.title} className="w-full md:w-[68%] md:shrink-0 lg:w-auto snap-start">
                <a
                  className="group flex flex-col gap-[18px] p-0 border-0 bg-transparent text-inherit text-left cursor-pointer w-full"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Play reel: ${r.title}`}
                >
                  <span className="relative block aspect-[9/16] rounded-[20px] overflow-hidden bg-[#2C0C0F] after:content-[''] after:absolute after:inset-0 after:bg-[#140608]/[0.18] after:transition-colors after:duration-500 group-hover:after:bg-[#140608]/[0.05]">
                    <Image
                      src={r.img}
                      alt={r.title}
                      fill
                      sizes="(max-width: 900px) 70vw, 25vw"
                      quality={88}
                      className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
                    />
                    <span className="absolute left-1/2 top-1/2 z-[1] w-[60px] h-[60px] -ml-[30px] -mt-[30px] rounded-full grid place-items-center text-[#F6EFE4] border border-[#F6EFE4]/80 bg-[#F6EFE4]/[0.12] backdrop-blur-md transition-all duration-400 group-hover:bg-[#F6EFE4] group-hover:text-[#3A1114] group-hover:scale-105" aria-hidden="true">
                      <svg width="16" height="18" viewBox="0 0 22 24" fill="currentColor">
                        <path d="M2 1.5v21L21 12z" />
                      </svg>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-[clamp(36px,4vw,54px)]">
            <a
              className="inline-flex items-center gap-3.5 min-h-[44px] font-sans font-semibold text-[11px] leading-none tracking-[0.22em] uppercase text-[#F6EFE4] border-b border-current self-center transition-all duration-300 hover:gap-[22px] hover:text-[#E3C78F]"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Follow @manratanresort{" "}
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============ 5. HOST YOUR EVENT ============ */}
      <section className="relative py-[clamp(88px,9vw,132px)] bg-[#FBF7EF]" id="occasions" aria-labelledby="occ-title">
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)]">
          <div className="flex items-end justify-between gap-6 md:gap-12 flex-wrap">
            <div className="flex flex-col gap-[22px]">
              <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#7A5F3A]">
                Host your event
              </p>
              <h2 className="m-0 font-display font-normal text-[clamp(40px,4.5vw,64px)] leading-[1.02] uppercase text-[#221811] text-balance" id="occ-title">
                Every occasion
                <span className="block font-script font-normal normal-case tracking-normal text-[0.8em] leading-none -mt-[0.06em] pl-[2.2em] text-[#221811]">
                  with us
                </span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 max-w-[26em]">
              <p className="m-0 font-sans text-[15px] leading-[1.85] text-[#54473C] text-pretty">
                Six ways to celebrate at Manratan, each with the venue that suits it best.
              </p>
            </div>
          </div>

          <ul className="list-none p-0 mt-[clamp(48px,5vw,64px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-x-[clamp(20px,2.4vw,32px)] sm:gap-y-[clamp(36px,3.4vw,48px)]">
            {occasions.map((o) => (
              <li key={o.title} className="flex">
                <Link className="group flex-1 flex flex-col text-[#221811] no-underline rounded-[20px] outline-offset-[6px]" href="/contactus">
                  <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden bg-[#E3D9CB]">
                    <Image
                      src={o.img}
                      alt={o.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      quality={88}
                      className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
                    />
                    <span className="absolute left-3.5 bottom-3.5 inline-flex items-center gap-2 py-2 px-3 rounded-full bg-[#FBF7EF]/90 backdrop-blur-md font-sans font-semibold text-[9px] leading-[1.2] tracking-[0.18em] uppercase text-[#221811]">
                      <i className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ backgroundColor: o.dot }} />
                      {o.venue}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5 pt-[22px] px-1 flex-1">
                    <h3 className="m-0 font-display font-normal text-[24px] leading-[1.15] uppercase text-[#221811]">
                      {o.title}
                    </h3>
                    <p className="m-0 font-sans text-[14px] leading-[1.75] text-[#54473C] max-w-[30em]">
                      {o.desc}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-[clamp(36px,4vw,54px)]">
            <a className="inline-flex items-center gap-3.5 min-h-[44px] font-sans font-semibold text-[11px] leading-none tracking-[0.22em] uppercase text-[#221811] border-b border-current self-center transition-all duration-300 hover:gap-[22px] hover:text-[#7A5F3A]" href="#venues">
              See all venues{" "}
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============ 6. CLOSING CTA ============ */}
      <section
        className="relative pb-[clamp(88px,9vw,132px)] bg-[#FBF7EF]"
        id="enquire"
        aria-labelledby="close-title"
      >
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)]">
          <div className="group relative rounded-[24px] md:rounded-[28px] overflow-hidden min-h-[440px] sm:min-h-[480px] lg:min-h-[580px] flex flex-col justify-center items-center lg:items-end lg:justify-center bg-[#221811] text-[#D9CDBD] w-full">
            <Image
              src="/events-page/4c58e0c82a181387981f70379aee86ae.jpg"
              alt="Golden Sapphire banquet hall with gold-draped tables"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-[40%_50%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-[#19110b]/66 lg:bg-gradient-to-r lg:from-[#19110b]/0 lg:from-[26%] lg:to-[#19110b]/82 lg:to-[66%] pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-[1] w-full max-w-[100%] lg:max-w-[620px] mx-auto lg:mx-0 lg:mr-[clamp(24px,6vw,96px)] p-[38px_16px] sm:p-[44px_20px] md:p-[48px_24px] lg:py-16 lg:px-0 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 md:gap-[26px]">
              <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#D8BE8E]">
                Plan with us
              </p>
              <h2 className="m-0 font-display font-normal text-[clamp(25px,7.2vw,32px)] sm:text-[clamp(28px,7.5vw,36px)] lg:text-[clamp(40px,4.5vw,64px)] leading-[1.1] lg:leading-[1.02] uppercase text-[#F6EFE4]" id="close-title">
                A celebration
                <span className="block font-script font-normal normal-case tracking-normal text-[clamp(28px,8.2vw,38px)] sm:text-[clamp(32px,8.5vw,44px)] lg:text-[0.8em] leading-none lg:-mt-[0.06em] lg:pl-[2.2em] text-[#D8BE8E]">
                  people talk about
                </span>
              </h2>
              <p className="m-0 font-display font-normal text-[15px] sm:text-[16px] lg:text-[clamp(22px,2vw,28px)] leading-[1.55] lg:leading-[1.4] text-[#F6EFE4] max-w-[28em] lg:max-w-none">
                Tell us the date, the guest count and the moments you have in mind. Our events team will come back with venues, menus and rooms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start w-full sm:w-auto max-w-[400px] lg:max-w-none">
                <Link
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 min-h-[52px] px-6 rounded-full font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] uppercase text-[#221811] bg-[#C9A46C] hover:bg-[#D8BE8E] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  href="/contactus"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Send an enquiry
                </Link>
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 min-h-[52px] px-6 rounded-full font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] uppercase text-[#F6EFE4] hover:text-[#221811] bg-transparent hover:bg-[#F6EFE4] border border-[#F6EFE4]/55 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  href="https://wa.me/919171172205"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-4 h-4 shrink-0 text-[16px]" />
                  WhatsApp the events team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
