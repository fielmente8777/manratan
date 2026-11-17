"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { countries } from "@/utils/constent";
import { startOfToday, toLocalISODate } from "@/utils/dates";

const faqs = [
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be requested and is subject to availability.",
  },
  {
    q: "Is Wi-Fi complimentary?",
    a: "Yes. Complimentary Wi-Fi is available throughout the resort.",
  },
  {
    q: "Does the resort have a restaurant?",
    a: "Yes. Swadika, our pure vegetarian restaurant, serves North Indian, regional Malwa and global dishes in a chandelier-lit hall that seats up to 100 guests.",
  },
  {
    q: "Is parking available?",
    a: "Yes. Complimentary on-site parking is available for resort guests.",
  },
  {
    q: "Can I host a wedding or event at Manratan?",
    a: "Yes. The Blue Sapphire and Golden Sapphire banquet halls, the Sky Lawn, the poolside and the Red Coral Lawn (up to 4,000 guests) host weddings, receptions and corporate events. Call or WhatsApp us to plan yours.",
  },
  {
    q: "How can I make a reservation?",
    a: "Use the booking form on this website, call our reservations team or send us a WhatsApp message. We will confirm your dates and room.",
  },
];

export default function ContactView() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+91",
    email: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });

  const todayStr = toLocalISODate(startOfToday());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => {
      const next = { ...prev, checkIn: val };
      if (val && prev.checkOut && prev.checkOut <= val) {
        next.checkOut = "";
      }
      return next;
    });
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (formData.checkIn && val && val <= formData.checkIn) {
      return;
    }
    setFormData((prev) => ({ ...prev, checkOut: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.checkIn && formData.checkOut && formData.checkOut <= formData.checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    const text = `*New Website Enquiry*\nName: ${formData.name}\nPhone: ${formData.countryCode} ${formData.phone}\nEmail: ${formData.email || "Not specified"}\nCheck-in: ${formData.checkIn || "Not specified"}\nCheck-out: ${formData.checkOut || "Not specified"}\nMessage: ${formData.message || "None"}`;
    window.open(`https://wa.me/919171172205?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="max_screen_width relative font-sans text-[#54473C] bg-[#FBF7EF] overflow-x-clip antialiased mx-auto">
      {/* ============ HERO ============ */}
      <header className="relative min-h-[520px] md:min-h-[640px] flex flex-col text-[#F6EFE4] bg-[#221811] overflow-hidden group">
        <Image
          className="absolute inset-0 w-full h-full object-cover object-[50%_36%] transition-transform duration-1000 ease-out group-hover:scale-105"
          src="/bright-images/contact/667bce410c47b5664b47aa936e0306fb.jpg"
          alt="The Manratan reception team greeting guests with a namaste"
          fill
          priority
          sizes="100vw"
          quality={92}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#19110b]/55 via-[#19110b]/25 to-[#19110b]/72 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-[2] mt-auto pb-[clamp(96px,10vw,136px)] flex flex-col items-center gap-[22px] text-center max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)] w-full">
          <h1 className="m-0 font-display font-normal text-[#F6EFE4] uppercase leading-[0.98] text-center">
            <span className="block text-[clamp(48px,6.8vw,96px)] tracking-[0.02em]">
              Contact Us
            </span>
            <span className="block font-script font-normal normal-case tracking-normal text-[clamp(44px,5.8vw,88px)] text-[#F6EFE4] pl-[0.8em] md:pl-[1.4em] -mt-[0.04em]">
              let’s plan your stay
            </span>
          </h1>
        </div>
      </header>

      {/* ============ REACH US + ENQUIRY ============ */}
      <section className="relative z-[3] -mt-[44px] rounded-t-[28px] md:rounded-t-[44px] bg-[#FBF7EF] pt-0" id="enquire" aria-labelledby="reach-title">
        <div className="relative z-[2] max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)] pt-[clamp(72px,7vw,104px)] pb-[clamp(88px,9vw,132px)]">
          <div className="flex justify-center overflow-hidden" aria-hidden="true">
            <Image
              src="/bright-images/contact/59c1f39cea474b4a6be5caa4ed8a7b43.png"
              alt=""
              width={720}
              height={175}
              priority
              className="w-[min(720px,100%)] h-auto"
            />
          </div>

          <div className="max-w-[720px] mx-auto mt-8 flex flex-col items-center gap-[18px] text-center">
            <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#7A5F3A]">
              At your service
            </p>
            <p className="m-0 font-display font-normal text-[18px] md:text-[clamp(22px,2vw,28px)] leading-[1.4] text-[#221811] text-pretty" id="reach-title">
              From booking questions to special requests, we are a message away. We look forward to welcoming you to Manratan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-9 md:gap-[clamp(40px,6vw,96px)] items-center mt-9 md:mt-[clamp(64px,7vw,96px)]">
            {/* Contact Details */}
            <div className="flex flex-col gap-4 md:gap-[30px] self-center">
              <div className="flex flex-col gap-1.5 md:gap-2 pb-4 md:pb-[26px] border-b border-[#221811]/14">
                <p className="m-0 mb-0.5 md:mb-1 font-sans font-semibold text-[9px] md:text-[10px] leading-[1.4] tracking-[0.24em] uppercase text-[#7A5F3A]">
                  Call
                </p>
                <a className="font-display font-normal text-[16px] sm:text-[17px] md:text-[24px] leading-[1.3] text-[#221811] hover:text-[#7A5F3A] transition-colors w-fit" href="tel:+919171172205">
                  +91 91711 72205
                </a>
                <a className="font-display font-normal text-[16px] sm:text-[17px] md:text-[24px] leading-[1.3] text-[#221811] hover:text-[#7A5F3A] transition-colors w-fit" href="tel:+919171172206">
                  +91 91711 72206
                </a>
                <a className="font-display font-normal text-[16px] sm:text-[17px] md:text-[24px] leading-[1.3] text-[#221811] hover:text-[#7A5F3A] transition-colors w-fit" href="tel:+919171172208">
                  +91 91711 72208
                </a>
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2 pb-4 md:pb-[26px] border-b border-[#221811]/14">
                <p className="m-0 mb-0.5 md:mb-1 font-sans font-semibold text-[9px] md:text-[10px] leading-[1.4] tracking-[0.24em] uppercase text-[#7A5F3A]">
                  Email
                </p>
                <a className="font-display font-normal text-[16px] sm:text-[17px] md:text-[24px] leading-[1.3] text-[#221811] hover:text-[#7A5F3A] transition-colors w-fit break-all" href="mailto:reservation@manratanresort.com">
                  reservation@manratanresort.com
                </a>
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2 pb-4 md:pb-[26px] border-b border-[#221811]/14">
                <p className="m-0 mb-0.5 md:mb-1 font-sans font-semibold text-[9px] md:text-[10px] leading-[1.4] tracking-[0.24em] uppercase text-[#7A5F3A]">
                  Visit
                </p>
                <address className="font-display font-normal text-[14px] sm:text-[15px] md:text-[20px] leading-[1.45] sm:leading-[1.5] not-italic text-[#221811]">
                  NH-46, Biaora Road, Narsinghgarh,<br />
                  Dist. Rajgarh, Madhya Pradesh – 465669
                </address>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-wrap mt-1.5 w-full sm:w-auto">
                <a
                  className="inline-flex items-center justify-center gap-3 min-h-[52px] px-[30px] rounded-full font-sans font-semibold text-[11px] tracking-[0.2em] uppercase text-[#F6EFE4] bg-[#221811] hover:bg-[#3A2A1E] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  href="https://wa.me/919171172205"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-4 h-4 shrink-0 text-[16px]" />
                  WhatsApp us
                </a>
                <a
                  className="inline-flex items-center justify-center gap-3 min-h-[52px] px-[30px] rounded-full font-sans font-semibold text-[11px] tracking-[0.2em] uppercase text-[#221811] hover:text-[#F6EFE4] bg-transparent hover:bg-[#221811] border border-[#221811]/35 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  href="https://maps.google.com/?q=Manratan+Resort+Narsinghgarh+MP"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Form */}
            <form
              className="bg-[#FFFDF8] border border-[#221811]/10 rounded-[20px] md:rounded-[24px] p-[22px_18px] md:p-[clamp(28px,4vw,48px)] shadow-[0_40px_80px_-40px_rgba(34,24,17,0.25)] flex flex-col gap-4 md:gap-7 [&_input]:!outline-none [&_input]:focus:!outline-none [&_input]:focus-visible:!outline-none [&_select]:!outline-none [&_select]:focus:!outline-none [&_select]:focus-visible:!outline-none [&_textarea]:!outline-none [&_textarea]:focus:!outline-none [&_textarea]:focus-visible:!outline-none [&_input]:!shadow-none [&_select]:!shadow-none [&_textarea]:!shadow-none"
              aria-labelledby="form-title"
              onSubmit={handleSubmit}
            >
              <style>{`
                #enquire input,
                #enquire select,
                #enquire textarea,
                #enquire button[type="submit"] {
                  outline: none !important;
                  box-shadow: none !important;
                }
                #enquire input:focus,
                #enquire input:focus-visible,
                #enquire select:focus,
                #enquire select:focus-visible,
                #enquire textarea:focus,
                #enquire textarea:focus-visible,
                #enquire button[type="submit"]:focus,
                #enquire button[type="submit"]:focus-visible {
                  outline: none !important;
                  outline-offset: 0 !important;
                  box-shadow: none !important;
                  -webkit-tap-highlight-color: transparent !important;
                }
              `}</style>
              <h2 className="m-0 font-display font-normal text-[26px] md:text-[32px] leading-[1.1] uppercase text-[#221811]" id="form-title">
                Send an enquiry
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-[22px_24px]">
                <div className="sm:col-span-2 flex flex-col gap-1 md:gap-2">
                  <label htmlFor="c-name" className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Full name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-sans font-normal text-[14px] md:text-[15px] leading-[1.4] text-[#221811] bg-transparent border-0 border-b border-[#221811]/25 py-1.5 md:py-2.5 rounded-none outline-none ring-0 !outline-none focus:outline-none focus:ring-0 focus:!outline-none focus:border-[#221811] focus-visible:outline-none focus-visible:!outline-none focus-visible:ring-0 focus-visible:!ring-0 w-full transition-colors placeholder:text-[#221811]/45"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <label htmlFor="c-phone" className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Phone
                  </label>
                  <div className="flex items-end gap-3">
                    <div className="relative w-[72px] shrink-0">
                      <select
                        aria-label="Country code"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-full pr-[18px] py-1.5 md:py-2.5 bg-transparent border-0 border-b border-[#221811]/25 focus:border-[#221811] outline-none ring-0 !outline-none focus:outline-none focus:ring-0 focus:!outline-none focus-visible:outline-none focus-visible:!outline-none focus-visible:ring-0 focus-visible:!ring-0 appearance-none font-sans text-[14px] md:text-[15px] text-[#221811] cursor-pointer"
                      >
                        {countries.map((c, i) => (
                          <option key={`${c.code}-${i}`} value={c.code} className="bg-white text-[#221811]">
                            {c.code}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-[2px] top-1/2 -translate-y-1/2 text-[11px] text-[#7A5F3A]" aria-hidden="true">
                        <IoIosArrowDown />
                      </span>
                    </div>
                    <input
                      id="c-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="font-sans font-normal text-[14px] md:text-[15px] leading-[1.4] text-[#221811] bg-transparent border-0 border-b border-[#221811]/25 py-1.5 md:py-2.5 rounded-none outline-none ring-0 !outline-none focus:outline-none focus:ring-0 focus:!outline-none focus:border-[#221811] focus-visible:outline-none focus-visible:!outline-none focus-visible:ring-0 focus-visible:!ring-0 w-full transition-colors placeholder:text-[#221811]/45"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <label htmlFor="c-email" className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-sans font-normal text-[14px] md:text-[15px] leading-[1.4] text-[#221811] bg-transparent border-0 border-b border-[#221811]/25 py-1.5 md:py-2.5 rounded-none outline-none ring-0 !outline-none focus:outline-none focus:ring-0 focus:!outline-none focus:border-[#221811] focus-visible:outline-none focus-visible:!outline-none focus-visible:ring-0 focus-visible:!ring-0 w-full transition-colors placeholder:text-[#221811]/45"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <label htmlFor="c-in" className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Check-in
                  </label>
                  <input
                    id="c-in"
                    name="checkIn"
                    type="date"
                    min={todayStr}
                    value={formData.checkIn}
                    onChange={handleCheckInChange}
                    className="font-sans font-normal text-[14px] md:text-[15px] leading-[1.4] text-[#221811] bg-transparent border-0 border-b border-[#221811]/25 py-1.5 md:py-2.5 rounded-none outline-none ring-0 !outline-none focus:outline-none focus:ring-0 focus:!outline-none focus:border-[#221811] focus-visible:outline-none focus-visible:!outline-none focus-visible:ring-0 focus-visible:!ring-0 w-full transition-colors cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <label htmlFor="c-out" className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Check-out
                  </label>
                  <input
                    id="c-out"
                    name="checkOut"
                    type="date"
                    min={formData.checkIn || todayStr}
                    value={formData.checkOut}
                    onChange={handleCheckOutChange}
                    className="font-sans font-normal text-[14px] md:text-[15px] leading-[1.4] text-[#221811] bg-transparent border-0 border-b border-[#221811]/25 py-1.5 md:py-2.5 rounded-none outline-none ring-0 !outline-none focus:outline-none focus:ring-0 focus:!outline-none focus:border-[#221811] focus-visible:outline-none focus-visible:!outline-none focus-visible:ring-0 focus-visible:!ring-0 w-full transition-colors cursor-pointer"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1 md:gap-2">
                  <label htmlFor="c-msg" className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Message <span className="tracking-[0.06em] normal-case text-[#8C7D6E] font-medium">(optional)</span>
                  </label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="font-sans font-normal text-[14px] md:text-[15px] leading-[1.4] text-[#221811] bg-transparent border-0 border-b border-[#221811]/25 py-1.5 md:py-2.5 rounded-none outline-none ring-0 !outline-none focus:outline-none focus:ring-0 focus:!outline-none focus:border-[#221811] focus-visible:outline-none focus-visible:!outline-none focus-visible:ring-0 focus-visible:!ring-0 w-full transition-colors min-h-[48px] resize-y placeholder:text-[#221811]/45"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 md:gap-4 flex-wrap">
                <p className="m-0 font-sans text-[13px] leading-[1.7] text-[#6B5D50]">
                  Our team will confirm your dates and rates.
                </p>
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 min-h-[52px] px-[30px] rounded-full font-sans font-semibold text-[11px] tracking-[0.2em] uppercase text-[#F6EFE4] bg-[#221811] hover:bg-[#3A2A1E] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap outline-none focus:outline-none focus-visible:outline-none !outline-none focus:!outline-none focus-visible:!outline-none"
                  type="submit"
                >
                  Send enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============ GETTING HERE ============ */}
      <section className="relative py-[clamp(88px,9vw,132px)] bg-[#F2EADD]" id="getting-here" aria-labelledby="gh-title">
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)]">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-7 lg:gap-x-[clamp(20px,2.8vw,40px)] lg:gap-y-6 lg:items-center">
            {/* Header: Desktop Row 1 Col 9-12 | Mobile Order 1 */}
            <div className="order-1 lg:order-none lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:self-end flex flex-col gap-3">
              <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#7A5F3A]">
                Getting here
              </p>
              <h2 className="m-0 font-display font-normal text-[clamp(40px,4.5vw,64px)] leading-[1.02] uppercase text-[#221811] text-balance" id="gh-title">
                On NH-46
                <span className="block font-script font-normal normal-case tracking-normal text-[0.8em] leading-none -mt-[0.06em] pl-[2.2em] text-[#221811]">
                  in Narsinghgarh
                </span>
              </h2>
            </div>

            {/* Figure: Desktop Row 1-2 Col 1-7 | Mobile Order 2 */}
            <figure className="order-2 lg:order-none lg:col-span-7 lg:row-span-2 m-0 group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
                <Image
                  src="/bright-images/contact/3818a080cb8483c7fd9da712ae025096.jpg"
                  alt="The lobby lounge with crystal chandeliers and red velvet sofas"
                  fill
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
                />
              </div>
            </figure>

            {/* Body: Desktop Row 2 Col 9-12 | Mobile Order 3 */}
            <div className="order-3 lg:order-none lg:col-start-9 lg:col-span-4 lg:row-start-2 lg:self-start flex flex-col gap-[26px]">
              <ul className="list-none m-0 p-0 border-t border-[#221811]/16">
                <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-[18px] border-b border-[#221811]/16">
                  <span className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Bhopal Airport
                  </span>
                  <b className="font-display font-normal text-[24px] leading-none text-[#221811] row-span-2 self-center">
                    70 km
                  </b>
                  <em className="not-italic font-sans text-[13px] text-[#54473C]">
                    approx. 1.5 hrs
                  </em>
                </li>
                <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-[18px] border-b border-[#221811]/16">
                  <span className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Railway station
                  </span>
                  <b className="font-display font-normal text-[24px] leading-none text-[#221811] row-span-2 self-center">
                    30 km
                  </b>
                  <em className="not-italic font-sans text-[13px] text-[#54473C]">
                    approx. 30 mins
                  </em>
                </li>
                <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-[18px] border-b border-[#221811]/16">
                  <span className="font-sans font-semibold text-[10px] leading-[1.4] tracking-[0.22em] uppercase text-[#7A5F3A]">
                    Indore
                  </span>
                  <b className="font-display font-normal text-[24px] leading-none text-[#221811] row-span-2 self-center">
                    210 km
                  </b>
                  <em className="not-italic font-sans text-[13px] text-[#54473C]">
                    approx. 3–4 hrs
                  </em>
                </li>
              </ul>
              <a
                className="inline-flex items-center gap-3.5 hover:gap-5 min-h-[44px] font-sans font-semibold text-[11px] tracking-[0.22em] uppercase text-[#221811] hover:text-[#7A5F3A] border-b border-current self-start transition-all duration-300"
                href="https://maps.google.com/?q=Manratan+Resort+Narsinghgarh+MP"
                target="_blank"
                rel="noreferrer"
              >
                Get directions
                <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" className="transition-transform duration-300">
                  <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQS ============ */}
      <section className="relative py-[clamp(88px,9vw,132px)] bg-[#FBF7EF]" id="faqs" aria-labelledby="faq-title">
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,5.6vw,80px)] grid grid-cols-12 gap-x-[clamp(20px,2.8vw,40px)] gap-y-12 items-start">
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <p className="m-0 font-sans font-semibold text-[11px] leading-[1.5] tracking-[0.24em] uppercase text-[#7A5F3A]">
              FAQs
            </p>
            <h2 className="m-0 font-display font-normal text-[clamp(40px,4.5vw,64px)] leading-[1.02] uppercase text-[#221811]" id="faq-title">
              Stay
              <span className="block font-script font-normal normal-case tracking-normal text-[0.8em] leading-none pl-[1.8em] text-[#221811]">
                informed
              </span>
            </h2>
            <p className="m-0 font-sans text-[15px] leading-[1.85] text-[#54473C] max-w-[34em] text-pretty">
              Can’t find your answer? Call or WhatsApp our reservations team.
            </p>
          </div>

          <div className="col-span-12 lg:col-start-6 lg:col-span-7 border-t border-[#221811]/16">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={f.q} className="border-b border-[#221811]/16">
                  <h3 className="m-0">
                    <button
                      className="flex items-center justify-between gap-6 w-full py-[26px] bg-transparent border-0 cursor-pointer text-left font-display font-normal text-[17px] md:text-[21px] leading-[1.3] uppercase text-[#221811] hover:text-[#7A5F3A] transition-colors focus-visible:outline-2 focus-visible:outline-[#B08D57] focus-visible:outline-offset-4"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      {f.q}
                      <span
                        className={`relative w-9 h-9 shrink-0 rounded-full border transition-all duration-300 flex items-center justify-center ${
                          isOpen
                            ? "bg-[#221811] border-[#221811] text-[#F6EFE4]"
                            : "bg-transparent border-[#221811]/30 text-[#221811]"
                        }`}
                        aria-hidden="true"
                      >
                        {/* Minus / horizontal line */}
                        <span className="w-3 h-px bg-current transition-transform duration-300" />
                        {/* Plus / vertical line (hidden or rotated to 0 when open) */}
                        <span
                          className={`w-px h-3 bg-current absolute transition-transform duration-300 ${
                            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    role="region"
                  >
                    <div className="overflow-hidden">
                      <p className="m-0 pt-0 pb-[26px] pr-0 md:pr-16 font-sans text-[15px] leading-[1.8] text-[#54473C]">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
