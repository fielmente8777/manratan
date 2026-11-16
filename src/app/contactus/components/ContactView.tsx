"use client";

import { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
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
      alert("Check-out date must be after check-in date.");
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
    <div className="mr-contact-root">
      <style jsx global>{`
        @font-face {
          font-family: 'IvyOra Display';
          src: url('/contact/3a117a2c7158f445282c120ea244476a.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Golden Hopes';
          src: url('/contact/4c32b90e5c2a3f44a94f81486a4cde7e.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .mr-contact-root {
          font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
          color: #54473C;
          background: #FBF7EF;
          -webkit-font-smoothing: antialiased;
          overflow-x: clip;
          position: relative;
        }
        .mr-contact-root * {
          box-sizing: border-box;
        }
        .mr-contact-root a {
          text-decoration: none;
          color: inherit;
        }

        .mr-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding-left: clamp(20px, 5.6vw, 80px);
          padding-right: clamp(20px, 5.6vw, 80px);
        }
        .mr-sec {
          position: relative;
          padding-top: clamp(88px, 9vw, 132px);
          padding-bottom: clamp(88px, 9vw, 132px);
        }
        .mr-sec > .mr-wrap {
          position: relative;
          z-index: 1;
        }
        .mr-sand {
          background: #F2EADD;
        }

        .mr-eyebrow {
          font: 600 11px/1.5 'Montserrat', sans-serif;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #7A5F3A;
          margin: 0;
        }
        .mr-title {
          font-family: 'IvyOra Display', Georgia, 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(40px, 4.5vw, 64px);
          line-height: 1.02;
          letter-spacing: 0;
          text-transform: uppercase;
          color: #221811;
          margin: 0;
          text-wrap: balance;
        }
        .mr-script {
          display: block;
          font-family: 'Golden Hopes', 'Brush Script MT', cursive;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
          font-size: 0.8em;
          line-height: 1;
          margin-top: -0.06em;
          padding-left: 2.2em;
          color: #221811;
        }
        .mr-center {
          text-align: center;
        }
        .mr-center .mr-script {
          padding-left: 1.8em;
        }
        .mr-lead {
          font-family: 'IvyOra Display', Georgia, serif;
          font-weight: 400;
          font-size: clamp(22px, 2vw, 28px);
          line-height: 1.4;
          color: #221811;
          margin: 0;
          text-wrap: pretty;
        }
        .mr-body {
          font-size: 15px;
          line-height: 1.85;
          margin: 0;
          max-width: 34em;
          text-wrap: pretty;
        }
        .mr-small {
          font-size: 13px;
          line-height: 1.7;
          margin: 0;
        }
        .mr-link {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          min-height: 44px;
          font: 600 11px/1 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #221811;
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          align-self: flex-start;
          transition: gap 0.4s, color 0.3s;
        }
        .mr-link:hover {
          color: #7A5F3A;
          gap: 22px;
        }

        .mr-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 52px;
          padding: 0 30px;
          border-radius: 999px;
          font: 600 11px/1 'Montserrat', sans-serif;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.35s, color 0.35s, transform 0.35s;
        }
        .mr-btn:hover {
          transform: translateY(-2px);
        }
        .mr-btn-ink,
        .mr-contact-root a.mr-btn-ink,
        .mr-contact-root button.mr-btn-ink {
          background: #221811;
          color: #F6EFE4;
        }
        .mr-btn-ink:hover,
        .mr-contact-root a.mr-btn-ink:hover,
        .mr-contact-root button.mr-btn-ink:hover {
          background: #3A2A1E;
          color: #F6EFE4;
        }
        .mr-ct-outline,
        .mr-contact-root a.mr-ct-outline {
          background: transparent;
          color: #221811;
          border-color: rgba(34, 24, 17, 0.35);
        }
        .mr-ct-outline:hover,
        .mr-contact-root a.mr-ct-outline:hover {
          background: #221811;
          color: #F6EFE4;
        }

        .mr-grid12 {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          column-gap: clamp(20px, 2.8vw, 40px);
          row-gap: 48px;
        }
        .mr-ph {
          overflow: hidden;
          border-radius: 16px;
          position: relative;
        }
        .mr-ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .mr-ph:hover img {
          transform: scale(1.06);
        }

        /* Hero */
        .mr-hero {
          position: relative;
          min-height: 640px;
          display: flex;
          flex-direction: column;
          color: #F6EFE4;
          background: #221811;
          overflow: hidden;
        }
        .mr-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 36%;
          transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .mr-hero:hover .mr-hero-img {
          transform: scale(1.05);
        }
        .mr-hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(25, 17, 11, 0.55) 0%,
            rgba(25, 17, 11, 0.25) 30%,
            rgba(25, 17, 11, 0.72) 100%
          );
        }
        .mr-ab-hero-copy {
          position: relative;
          z-index: 2;
          margin-top: auto;
          padding-bottom: clamp(96px, 10vw, 136px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          text-align: center;
        }
        .mr-hero-title {
          margin: 0;
          font-family: 'IvyOra Display', Georgia, serif;
          font-weight: 400;
          color: #F6EFE4;
          text-transform: uppercase;
          line-height: 0.98;
          text-align: center;
        }
        .mr-hero-big {
          display: block;
          font-size: clamp(48px, 6.8vw, 96px);
          letter-spacing: 0.02em;
        }
        .mr-hero-title .mr-script {
          color: #F6EFE4;
          font-size: clamp(44px, 5.8vw, 88px);
          padding-left: 1.4em;
          margin-top: -0.04em;
        }

        /* Panel */
        .mr-panel {
          position: relative;
          z-index: 3;
          margin-top: -44px;
          border-radius: 44px 44px 0 0;
          background: #FBF7EF;
          padding-top: 0;
        }
        .mr-bell {
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .mr-bell img {
          width: min(720px, 100%);
          height: auto;
        }

        /* Contact Grid */
        .mr-ct-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: clamp(40px, 6vw, 96px);
          align-items: center;
          margin-top: clamp(64px, 7vw, 96px);
        }
        .mr-ct-info {
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-self: center;
        }
        .mr-ct-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 26px;
          border-bottom: 1px solid rgba(34, 24, 17, 0.14);
        }
        .mr-ct-k {
          margin: 0 0 4px;
          font: 600 10px/1.4 'Montserrat', sans-serif;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #7A5F3A;
        }
        .mr-ct-v {
          font: 400 24px/1.3 'IvyOra Display', Georgia, serif;
          color: #221811;
          text-decoration: none;
          width: fit-content;
        }
        .mr-ct-v:hover {
          color: #7A5F3A;
        }
        .mr-ct-addr {
          font: 400 20px/1.45 'IvyOra Display', Georgia, serif;
          font-style: normal;
          color: #221811;
        }

        /* Form */
        .mr-ct-form {
          background: #FFFDF8;
          border: 1px solid rgba(34, 24, 17, 0.1);
          border-radius: 24px;
          padding: clamp(28px, 4vw, 48px);
          box-shadow: 0 40px 80px -40px rgba(34, 24, 17, 0.25);
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .mr-ct-form-t {
          margin: 0;
          font: 400 32px/1.1 'IvyOra Display', Georgia, serif;
          text-transform: uppercase;
          color: #221811;
        }
        .mr-ct-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px 24px;
        }
        .mr-fld {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mr-fld.full {
          grid-column: 1 / -1;
        }
        .mr-fld label {
          font: 600 10px/1.4 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A5F3A;
        }
        .mr-fld label span {
          letter-spacing: 0.06em;
          text-transform: none;
          color: #8C7D6E;
          font-weight: 500;
        }
        .mr-fld input,
        .mr-fld input[type="text"],
        .mr-fld input[type="date"],
        .mr-fld input[type="tel"],
        .mr-fld input[type="email"],
        .mr-fld select,
        .mr-fld textarea {
          font: 400 15px/1.4 'Montserrat', sans-serif;
          color: #221811;
          background: transparent;
          border: 0 !important;
          border-bottom: 1px solid rgba(34, 24, 17, 0.25) !important;
          padding: 10px 0;
          border-radius: 0;
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 100%;
          transition: border-color 0.3s;
        }
        .mr-fld input:focus,
        .mr-fld input:focus-visible,
        .mr-fld select:focus,
        .mr-fld select:focus-visible,
        .mr-fld textarea:focus,
        .mr-fld textarea:focus-visible {
          outline: none !important;
          box-shadow: none !important;
          border: 0 !important;
          border-bottom: 1px solid #221811 !important;
        }
        .mr-fld input::placeholder,
        .mr-fld textarea::placeholder {
          color: rgba(34, 24, 17, 0.45);
        }
        .mr-fld textarea {
          resize: vertical;
        }
        /* Native datepicker styling without outline box */
        .mr-fld input[type="date"] {
          border: 0 !important;
          border-bottom: 1px solid rgba(34, 24, 17, 0.25) !important;
          outline: none !important;
          box-shadow: none !important;
          color: #221811;
        }
        .mr-fld input[type="date"]:focus,
        .mr-fld input[type="date"]:focus-visible {
          border: 0 !important;
          border-bottom: 1px solid #221811 !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .mr-fld input[type="date"]::-webkit-datetime-edit,
        .mr-fld input[type="date"]::-webkit-datetime-edit-fields-wrapper,
        .mr-fld input[type="date"]::-webkit-datetime-edit-text,
        .mr-fld input[type="date"]::-webkit-datetime-edit-month-field,
        .mr-fld input[type="date"]::-webkit-datetime-edit-day-field,
        .mr-fld input[type="date"]::-webkit-datetime-edit-year-field {
          outline: none !important;
          border: none !important;
          background: transparent;
        }
        .mr-fld input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
          outline: none !important;
        }
        .mr-ct-phone {
          display: flex;
          align-items: flex-end;
          gap: 12px;
        }
        .mr-ct-phone-code {
          position: relative;
          width: 72px;
          flex: none;
        }
        .mr-ct-phone-code select {
          width: 100%;
          padding-right: 18px;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          outline: none !important;
        }
        .mr-ct-phone-code select:focus,
        .mr-ct-phone-code select:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .mr-ct-phone-arrow {
          pointer-events: none;
          position: absolute;
          right: 2px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 11px;
          color: #7A5F3A;
        }
        .mr-ct-form button:focus,
        .mr-ct-form button:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .mr-ct-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .mr-ct-foot .mr-small {
          color: #6B5D50;
        }

        /* Getting Here */
        .mr-gh-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(34, 24, 17, 0.16);
        }
        .mr-gh-list li {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: baseline;
          gap: 4px 16px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(34, 24, 17, 0.16);
        }
        .mr-gh-list span {
          font: 600 10px/1.4 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A5F3A;
        }
        .mr-gh-list b {
          font: 400 24px/1 'IvyOra Display', Georgia, serif;
          color: #221811;
          grid-row: span 2;
          align-self: center;
        }
        .mr-gh-list em {
          font-style: normal;
          font-size: 13px;
          color: #54473C;
        }

        /* FAQs */
        .mr-faq {
          border-top: 1px solid rgba(34, 24, 17, 0.16);
        }
        .mr-faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          width: 100%;
          padding: 26px 0;
          background: none;
          border: 0;
          cursor: pointer;
          text-align: left;
          font: 400 21px/1.3 'IvyOra Display', Georgia, serif;
          text-transform: uppercase;
          color: #221811;
          transition: color 0.3s;
        }
        .mr-faq-q:hover {
          color: #7A5F3A;
        }
        .mr-faq-q:focus-visible {
          outline: 2px solid #B08D57;
          outline-offset: 4px;
        }
        .mr-faq-ic {
          position: relative;
          width: 36px;
          height: 36px;
          flex: none;
          border-radius: 50%;
          border: 1px solid rgba(34, 24, 17, 0.3);
          color: #221811;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }
        .mr-faq-ic::before,
        .mr-faq-ic::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 12px;
          height: 1px;
          background: currentColor;
          transform: translate(-50%, -50%);
          transition: transform 0.4s;
        }
        .mr-faq-ic::after {
          transform: translate(-50%, -50%) rotate(90deg);
        }
        .mr-faq-it {
          border-bottom: 1px solid rgba(34, 24, 17, 0.16);
        }
        .mr-faq-it.is-open .mr-faq-ic {
          background: #221811;
          border-color: #221811;
          color: #F6EFE4;
        }
        .mr-faq-it.is-open .mr-faq-ic::after {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        .mr-faq-a {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .mr-faq-it.is-open .mr-faq-a {
          grid-template-rows: 1fr;
        }
        .mr-faq-a > div {
          overflow: hidden;
        }
        .mr-faq-a p {
          margin: 0;
          padding: 0 64px 26px 0;
          font-size: 15px;
          line-height: 1.8;
          color: #54473C;
        }

        .mr-gh-wrap {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          column-gap: clamp(20px, 2.8vw, 40px);
          row-gap: 24px;
          align-items: center;
        }
        .mr-gh-fig {
          grid-column: 1 / span 7;
          grid-row: 1 / span 2;
          margin: 0;
        }
        .mr-gh-head {
          grid-column: 9 / span 4;
          grid-row: 1;
          align-self: end;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mr-gh-body {
          grid-column: 9 / span 4;
          grid-row: 2;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .mr-gh-wrap {
            display: flex;
            flex-direction: column;
            gap: 28px;
          }
          .mr-gh-head {
            order: 1;
            width: 100%;
          }
          .mr-gh-fig {
            order: 2;
            width: 100%;
          }
          .mr-gh-body {
            order: 3;
            width: 100%;
          }
          .mr-grid12 > * {
            grid-column: 1 / -1 !important;
            margin-top: 0 !important;
          }
          .mr-ct-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .mr-ct-fields {
            grid-template-columns: minmax(0, 1fr);
          }
          .mr-faq-q {
            font-size: 17px;
          }
          .mr-faq-a p {
            padding-right: 0;
          }
        }
        @media (max-width: 760px) {
          .mr-panel {
            border-radius: 28px 28px 0 0;
          }
          .mr-hero {
            min-height: 520px;
          }
          .mr-hero-title .mr-script {
            padding-left: 0.8em;
          }
          .mr-ct-form {
            padding: 22px 18px;
            gap: 16px;
            border-radius: 20px;
          }
          .mr-ct-form-t {
            font-size: 26px;
          }
          .mr-ct-fields {
            gap: 14px;
          }
          .mr-fld {
            gap: 4px;
          }
          .mr-fld input,
          .mr-fld input[type="text"],
          .mr-fld input[type="date"],
          .mr-fld input[type="tel"],
          .mr-fld input[type="email"],
          .mr-fld select,
          .mr-fld textarea {
            padding: 6px 0;
            font-size: 14px;
          }
          .mr-fld textarea {
            min-height: 48px;
          }
          .mr-ct-foot {
            gap: 12px;
          }
          .mr-ct-foot .mr-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <header className="mr-hero">
        <Image
          className="mr-hero-img"
          src="/contact/667bce410c47b5664b47aa936e0306fb.jpg"
          alt="The Manratan reception team greeting guests with a namaste"
          fill
          priority
          sizes="100vw"
          quality={92}
        />
        <div className="mr-hero-scrim" aria-hidden="true" />
        <div className="mr-ab-hero-copy mr-wrap">
          {/* Note: User specifically requested: "home contact wali line hatado" */}
          <h1 className="mr-hero-title">
            <span className="mr-hero-big">Contact Us</span>
            <span className="mr-script">let’s plan your stay</span>
          </h1>
        </div>
      </header>

      {/* ============ REACH US + ENQUIRY ============ */}
      <section className="mr-panel" id="enquire" aria-labelledby="reach-title">
        <div
          className="mr-wrap"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "clamp(72px, 7vw, 104px)",
            paddingBottom: "clamp(88px, 9vw, 132px)",
          }}
        >
          <div className="mr-bell" aria-hidden="true">
            <Image
              src="/contact/59c1f39cea474b4a6be5caa4ed8a7b43.png"
              alt=""
              width={720}
              height={175}
              priority
              style={{ width: "min(720px, 100%)", height: "auto" }}
            />
          </div>

          <div
            className="mr-center"
            style={{
              maxWidth: "720px",
              margin: "32px auto 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <p className="mr-eyebrow">At your service</p>
            <p className="mr-lead" id="reach-title">
              From booking questions to special requests, we are a message away. We look forward to welcoming you to Manratan.
            </p>
          </div>

          <div className="mr-ct-grid">
            <div className="mr-ct-info">
              <div className="mr-ct-item">
                <p className="mr-ct-k">Call</p>
                <a className="mr-ct-v" href="tel:+919171172205">
                  +91 91711 72205
                </a>
                <a className="mr-ct-v" href="tel:+919171172206">
                  +91 91711 72206
                </a>
                <a className="mr-ct-v" href="tel:+919171172208">
                  +91 91711 72208
                </a>
              </div>

              <div className="mr-ct-item">
                <p className="mr-ct-k">Email</p>
                <a className="mr-ct-v" href="mailto:reservation@manratanresort.com">
                  reservation@manratanresort.com
                </a>
              </div>

              <div className="mr-ct-item">
                <p className="mr-ct-k">Visit</p>
                <address className="mr-ct-addr">
                  NH-46, Biaora Road, Narsinghgarh,<br />
                  Dist. Rajgarh, Madhya Pradesh – 465669
                </address>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
                <a
                  className="mr-btn mr-btn-ink"
                  href="https://wa.me/919171172205"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" />
                    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1-.4-2-1.4-2.4-2.4l1-1-1-2z" />
                  </svg>
                  WhatsApp us
                </a>
                <a
                  className="mr-btn mr-ct-outline"
                  href="https://maps.google.com/?q=Manratan+Resort+Narsinghgarh+MP"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </div>

            <form className="mr-ct-form" aria-labelledby="form-title" onSubmit={handleSubmit}>
              <h2 className="mr-ct-form-t" id="form-title">
                Send an enquiry
              </h2>
              <div className="mr-ct-fields">
                <div className="mr-fld full">
                  <label htmlFor="c-name">Full name</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mr-fld">
                  <label htmlFor="c-phone">Phone</label>
                  <div className="mr-ct-phone">
                    <div className="mr-ct-phone-code">
                      <select
                        aria-label="Country code"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                      >
                        {countries.map((c, i) => (
                          <option key={`${c.code}-${i}`} value={c.code} style={{ background: "#FFFFFF", color: "#221811" }}>
                            {c.code}
                          </option>
                        ))}
                      </select>
                      <span className="mr-ct-phone-arrow" aria-hidden="true">
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
                    />
                  </div>
                </div>
                <div className="mr-fld">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mr-fld">
                  <label htmlFor="c-in">Check-in</label>
                  <input
                    id="c-in"
                    name="checkIn"
                    type={formData.checkIn ? "date" : "text"}
                    min={todayStr}
                    placeholder="Add date"
                    value={formData.checkIn}
                    onChange={handleCheckInChange}
                    onFocus={(e) => {
                      e.target.type = "date";
                      try {
                        if ("showPicker" in HTMLInputElement.prototype) {
                          e.target.showPicker();
                        }
                      } catch {}
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                  />
                </div>
                <div className="mr-fld">
                  <label htmlFor="c-out">Check-out</label>
                  <input
                    id="c-out"
                    name="checkOut"
                    type={formData.checkOut ? "date" : "text"}
                    min={formData.checkIn || todayStr}
                    placeholder="Add date"
                    value={formData.checkOut}
                    onChange={handleCheckOutChange}
                    onFocus={(e) => {
                      e.target.type = "date";
                      try {
                        if ("showPicker" in HTMLInputElement.prototype) {
                          e.target.showPicker();
                        }
                      } catch {}
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                  />
                </div>
                <div className="mr-fld full">
                  <label htmlFor="c-msg">
                    Message <span>(optional)</span>
                  </label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mr-ct-foot">
                <p className="mr-small">Our team will confirm your dates and rates.</p>
                <button className="mr-btn mr-btn-ink" type="submit">
                  Send enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============ GETTING HERE ============ */}
      <section className="mr-sec mr-sand" id="getting-here" aria-labelledby="gh-title">
        <div className="mr-wrap mr-gh-wrap">
          <div className="mr-gh-head">
            <p className="mr-eyebrow">Getting here</p>
            <h2 className="mr-title" id="gh-title">
              On NH-46<span className="mr-script">in Narsinghgarh</span>
            </h2>
          </div>
          <figure className="mr-gh-fig">
            <div className="mr-ph" style={{ aspectRatio: "16 / 10", borderRadius: "20px" }}>
              <Image
                src="/contact/3818a080cb8483c7fd9da712ae025096.jpg"
                alt="The lobby lounge with crystal chandeliers and red velvet sofas"
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </figure>
          <div className="mr-gh-body">
            <ul className="mr-gh-list">
              <li>
                <span>Bhopal Airport</span>
                <b>70 km</b>
                <em>approx. 1.5 hrs</em>
              </li>
              <li>
                <span>Railway station</span>
                <b>30 km</b>
                <em>approx. 30 mins</em>
              </li>
              <li>
                <span>Indore</span>
                <b>210 km</b>
                <em>approx. 3–4 hrs</em>
              </li>
            </ul>
            <a
              className="mr-link"
              href="https://maps.google.com/?q=Manratan+Resort+Narsinghgarh+MP"
              target="_blank"
              rel="noreferrer"
            >
              Get directions
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQS ============ */}
      <section className="mr-sec" id="faqs" aria-labelledby="faq-title">
        <div className="mr-wrap mr-grid12" style={{ alignItems: "start" }}>
          <div
            style={{
              gridColumn: "1 / span 4",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <p className="mr-eyebrow">FAQs</p>
            <h2 className="mr-title" id="faq-title">
              Stay<span className="mr-script">informed</span>
            </h2>
            <p className="mr-body">Can’t find your answer? Call or WhatsApp our reservations team.</p>
          </div>

          <div className="mr-faq" style={{ gridColumn: "6 / span 7" }}>
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={f.q} className={`mr-faq-it ${isOpen ? "is-open" : ""}`}>
                  <h3 style={{ margin: 0 }}>
                    <button
                      className="mr-faq-q"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      {f.q}
                      <span className="mr-faq-ic" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="mr-faq-a" role="region">
                    <div>
                      <p>{f.a}</p>
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
