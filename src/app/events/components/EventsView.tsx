"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    img: "/events-page/haldi-ceremony.jpg",
    alt: "Vibrant poolside Haldi ceremony setup with marigold flowers",
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
    <div className="mr-events-root">
      <style jsx global>{`
        @font-face {
          font-family: 'IvyOra Display';
          src: url('/events-page/3a117a2c7158f445282c120ea244476a.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Golden Hopes';
          src: url('/events-page/4c32b90e5c2a3f44a94f81486a4cde7e.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .mr-events-root {
          font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
          color: #54473C;
          background: #FBF7EF;
          -webkit-font-smoothing: antialiased;
          overflow-x: clip;
          position: relative;
        }
        .mr-events-root * {
          box-sizing: border-box;
        }
        .mr-events-root a {
          text-decoration: none;
          color: inherit;
        }

        .ev-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding-left: clamp(20px, 5.6vw, 80px);
          padding-right: clamp(20px, 5.6vw, 80px);
        }
        .ev-sec {
          position: relative;
          padding-top: clamp(88px, 9vw, 132px);
          padding-bottom: clamp(88px, 9vw, 132px);
        }
        .ev-sec > .ev-wrap {
          position: relative;
          z-index: 1;
        }
        .ev-sand {
          background: #F2EADD;
        }
        .ev-maroon {
          background: #3A1114;
          color: #E8D9C4;
        }

        .ev-eyebrow {
          font: 600 11px/1.5 'Montserrat', sans-serif;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #7A5F3A;
          margin: 0;
        }
        .ev-maroon .ev-eyebrow {
          color: #D8BE8E;
        }

        .ev-title {
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
        .ev-maroon .ev-title {
          color: #F6EFE4;
        }

        .ev-script {
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
        .ev-maroon .ev-script {
          color: #E3C78F;
        }
        .ev-center {
          text-align: center;
        }
        .ev-center .ev-script {
          padding-left: 1.8em;
        }

        .ev-lead {
          font-family: 'IvyOra Display', Georgia, serif;
          font-weight: 400;
          font-size: clamp(22px, 2vw, 28px);
          line-height: 1.4;
          color: #221811;
          margin: 0;
          text-wrap: pretty;
        }
        .ev-body {
          font-size: 15px;
          line-height: 1.85;
          margin: 0;
          max-width: 34em;
          text-wrap: pretty;
        }
        .ev-maroon .ev-body {
          color: #E8D9C4;
        }

        .ev-link {
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
        .ev-link:hover {
          color: #7A5F3A;
          gap: 22px;
        }
        .ev-maroon .ev-link {
          color: #F6EFE4;
        }
        .ev-maroon .ev-link:hover {
          color: #E3C78F;
        }

        .ev-btn {
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
        .ev-btn:hover {
          transform: translateY(-2px);
        }
        .ev-btn-gold,
        .mr-events-root a.ev-btn-gold {
          background: #C9A46C;
          color: #221811;
        }
        .ev-btn-gold:hover,
        .mr-events-root a.ev-btn-gold:hover {
          background: #D8BE8E;
          color: #221811;
        }
        .ev-btn-ghost,
        .mr-events-root a.ev-btn-ghost {
          background: transparent;
          color: #F6EFE4;
          border-color: rgba(246, 239, 228, 0.55);
        }
        .ev-btn-ghost:hover,
        .mr-events-root a.ev-btn-ghost:hover {
          background: #F6EFE4;
          color: #221811;
        }

        .ev-orn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #9C7A45;
        }
        .ev-orn span {
          display: block;
          width: 64px;
          height: 1px;
          background: currentColor;
          opacity: 0.6;
        }

        /* Hero */
        .ev-hero-box {
          position: relative;
          min-height: clamp(560px, 58vw, 760px);
          display: flex;
          flex-direction: column;
          color: #F6EFE4;
          background: #221811;
          overflow: hidden;
        }
        .ev-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 55%;
          transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .ev-hero-box:hover .ev-hero-img {
          transform: scale(1.05);
        }
        .ev-hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(25, 17, 11, 0.55) 0%,
            rgba(25, 17, 11, 0.2) 30%,
            rgba(25, 17, 11, 0.72) 100%
          );
        }
        .ev-hero-copy {
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
        .ev-hero-title {
          margin: 0;
          font-family: 'IvyOra Display', Georgia, serif;
          font-weight: 400;
          color: #F6EFE4;
          text-transform: uppercase;
          line-height: 0.98;
          text-align: center;
        }
        .ev-hero-big {
          display: block;
          font-size: clamp(48px, 6.8vw, 96px);
          letter-spacing: 0.02em;
        }
        .ev-hero-title .ev-script {
          color: #F6EFE4;
          font-size: clamp(44px, 5.8vw, 88px);
          padding-left: 1.4em;
          margin-top: -0.04em;
        }

        /* Intro Panel */
        .ev-panel {
          position: relative;
          z-index: 3;
          margin-top: -44px;
          border-radius: 44px 44px 0 0;
          background: #FBF7EF;
          padding-top: 0;
        }
        .ev-panel-wrap {
          position: relative;
          z-index: 2;
          padding-top: clamp(88px, 8vw, 120px);
          padding-bottom: clamp(88px, 9vw, 132px);
        }
        .ev-intro-head {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .ev-stats {
          display: flex;
          max-width: 960px;
          margin: clamp(56px, 6vw, 80px) auto 0;
          padding: 0;
          border-top: 1px solid rgba(34, 24, 17, 0.14);
          border-bottom: 1px solid rgba(34, 24, 17, 0.14);
        }
        .ev-stats div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 30px 16px;
          text-align: center;
        }
        .ev-stats div + div {
          border-left: 1px solid rgba(34, 24, 17, 0.14);
        }
        .ev-stats dt {
          font: 400 clamp(36px, 3.6vw, 52px)/1 'IvyOra Display', Georgia, serif;
          color: #221811;
        }
        .ev-stats dd {
          margin: 0;
          font: 600 10px/1.5 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A5F3A;
        }

        /* Venues – Expanding Gem Panels */
        .ev-gems-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px 48px;
          flex-wrap: wrap;
        }
        .ev-gems-head .ev-body {
          max-width: 30em;
        }
        .ev-gems {
          display: flex;
          gap: 12px;
          height: 660px;
          margin-top: clamp(48px, 5vw, 64px);
        }
        .ev-gem {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          display: block;
          padding: 0;
          border: 0;
          border-radius: 22px;
          overflow: hidden;
          background: #221811;
          color: #F6EFE4;
          text-align: left;
          cursor: pointer;
          isolation: isolate;
          transition: flex-grow 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .ev-gem.is-on {
          flex-grow: 3.6;
          cursor: default;
        }
        .ev-gem:focus-visible {
          outline: 2px solid #7A5F3A;
          outline-offset: 4px;
        }
        .ev-gem-img-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .ev-gem:hover .ev-gem-img-wrap {
          transform: scale(1.05);
        }
        .ev-gem-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            0deg,
            rgba(25, 17, 11, 0.82) 0%,
            rgba(25, 17, 11, 0.2) 46%,
            rgba(25, 17, 11, 0.08) 100%
          );
          transition: background 0.8s;
        }
        .ev-gem:not(.is-on) .ev-gem-scrim {
          background: linear-gradient(
            0deg,
            rgba(25, 17, 11, 0.78) 0%,
            rgba(25, 17, 11, 0.42) 100%
          );
        }
        .ev-gem-ico {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 2;
          width: 34px;
          height: 34px;
        }
        .ev-gem-n {
          position: absolute;
          top: 30px;
          right: 26px;
          z-index: 2;
          font: 600 10px/1 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          color: #EADBC2;
        }
        .ev-gem-v {
          position: absolute;
          left: 50%;
          bottom: 34px;
          z-index: 2;
          display: block;
          white-space: nowrap;
          font: 400 24px/1 'IvyOra Display', Georgia, serif;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          writing-mode: vertical-rl;
          transform: translateX(-50%) rotate(180deg);
          transition: opacity 0.5s ease;
        }
        .ev-gem.is-on .ev-gem-v {
          opacity: 0;
        }
        .ev-gem-body {
          position: absolute;
          left: 40px;
          right: 40px;
          bottom: 38px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
          pointer-events: none;
        }
        .ev-gem.is-on .ev-gem-body {
          opacity: 1;
          transform: none;
          transition-delay: 0.35s;
        }
        .ev-gem-cap {
          font: 600 10px/1.4 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #E3C78F;
        }
        .ev-gem-name {
          font: 400 clamp(34px, 3.2vw, 48px)/1 'IvyOra Display', Georgia, serif;
          text-transform: uppercase;
          color: #F6EFE4;
        }
        .ev-gem-desc {
          font-size: 15px;
          line-height: 1.75;
          color: #EFE6D8;
          max-width: 30em;
        }

        /* Reels */
        .ev-reels-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px 48px;
          flex-wrap: wrap;
        }
        .ev-reels-head-r {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          max-width: 26em;
        }
        .ev-reel-row {
          list-style: none;
          margin: clamp(48px, 5vw, 64px) 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 28px);
        }
        .ev-reel {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 0;
          border: 0;
          background: none;
          color: inherit;
          text-align: left;
          cursor: pointer;
          width: 100%;
        }
        .ev-reel-ph {
          position: relative;
          display: block;
          aspect-ratio: 9 / 16;
          border-radius: 20px;
          overflow: hidden;
          background: #2C0C0F;
        }
        .ev-reel-ph img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .ev-reel-ph::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(20, 6, 8, 0.18);
          transition: background 0.5s;
        }
        .ev-reel:hover .ev-reel-ph img {
          transform: scale(1.06);
        }
        .ev-reel:hover .ev-reel-ph::after {
          background: rgba(20, 6, 8, 0.05);
        }
        .ev-reel-play {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 1;
          width: 60px;
          height: 60px;
          margin: -30px 0 0 -30px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #F6EFE4;
          border: 1px solid rgba(246, 239, 228, 0.8);
          background: rgba(246, 239, 228, 0.12);
          backdrop-filter: blur(8px);
          transition: background 0.4s, color 0.4s, transform 0.4s;
        }
        .ev-reel:hover .ev-reel-play {
          background: #F6EFE4;
          color: #3A1114;
          transform: scale(1.06);
        }
        .ev-reel-cap {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 2px;
        }
        .ev-reel-cap span {
          font: 600 10px/1.4 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #D8BE8E;
        }
        .ev-reel-cap b {
          font: 400 20px/1.2 'IvyOra Display', Georgia, serif;
          text-transform: uppercase;
          color: #F6EFE4;
        }

        /* Occasions Card Grid */
        .ev-occ-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px 48px;
          flex-wrap: wrap;
        }
        .ev-occ-head-r {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          max-width: 26em;
        }
        .ev-occ-grid {
          list-style: none;
          margin: clamp(48px, 5vw, 64px) 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(36px, 3.4vw, 48px) clamp(20px, 2.4vw, 32px);
        }
        .ev-occ {
          display: flex;
        }
        .ev-occ-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          color: #221811;
          text-decoration: none;
          border-radius: 20px;
          outline-offset: 6px;
        }
        .ev-occ-ph2 {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 18px;
          overflow: hidden;
          background: #E3D9CB;
        }
        .ev-occ-ph2 img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .ev-occ-card:hover .ev-occ-ph2 img {
          transform: scale(1.06);
        }
        .ev-occ-chip {
          position: absolute;
          left: 14px;
          bottom: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(251, 247, 239, 0.92);
          backdrop-filter: blur(8px);
          font: 600 9px/1.2 'Montserrat', sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #221811;
        }
        .ev-occ-chip i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }
        .ev-occ-txt {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 22px 4px 0;
          flex: 1;
        }
        .ev-occ-txt h3 {
          margin: 0;
          font: 400 24px/1.15 'IvyOra Display', Georgia, serif;
          text-transform: uppercase;
          color: #221811;
        }
        .ev-occ-txt p {
          margin: 0;
          font-size: 14px;
          line-height: 1.75;
          color: #54473C;
          max-width: 30em;
        }
        .ev-occ-go {
          margin-top: auto;
          padding-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font: 600 10px/1 'Montserrat', sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A5F3A;
          transition: gap 0.4s, color 0.3s;
        }
        .ev-occ-card:hover .ev-occ-go {
          gap: 20px;
          color: #221811;
        }

        /* Closing CTA Card */
        .ev-close-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          min-height: 580px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background: #221811;
          color: #D9CDBD;
        }
        .ev-close-card > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 40% 50%;
          transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .ev-close-card:hover > img {
          transform: scale(1.05);
        }
        .ev-close-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(25, 17, 11, 0) 26%,
            rgba(25, 17, 11, 0.82) 66%
          );
        }
        .ev-close-txt {
          position: relative;
          z-index: 1;
          max-width: 620px;
          margin-right: clamp(24px, 6vw, 96px);
          padding: 64px 0;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }
        .ev-close-btns {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: nowrap;
        }
        .ev-close-btns .ev-btn {
          padding: 0 24px;
        }
        @media (max-width: 580px) {
          .ev-close-btns {
            flex-wrap: wrap;
          }
        }
        .ev-close-txt .ev-title {
          color: #F6EFE4;
        }
        .ev-close-txt .ev-script {
          color: #D8BE8E;
        }
        .ev-close-txt .ev-eyebrow {
          color: #D8BE8E;
        }
        .ev-close-txt .ev-lead {
          color: #F6EFE4;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .ev-occ-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 900px) {
          .ev-stats {
            flex-direction: column;
          }
          .ev-stats div + div {
            border-left: 0;
            border-top: 1px solid rgba(34, 24, 17, 0.14);
          }
          .ev-gems {
            flex-direction: column;
            height: auto;
            gap: 10px;
          }
          .ev-gem {
            flex: none;
            height: 96px;
            transition: height 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
          }
          .ev-gem.is-on {
            height: 460px;
          }
          .ev-gem-v {
            writing-mode: horizontal-tb;
            transform: none;
            left: 72px;
            bottom: auto;
            top: 36px;
            font-size: 20px;
          }
          .ev-gem-ico {
            top: 30px;
          }
          .ev-gem-body {
            left: 22px;
            right: 22px;
            bottom: 24px;
          }
          .ev-reel-row {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            gap: 14px;
            margin-right: calc(-1 * clamp(20px, 5.6vw, 80px));
            padding-right: clamp(20px, 5.6vw, 80px);
          }
          .ev-reel-row::-webkit-scrollbar {
            display: none;
          }
          .ev-reel-row > li {
            flex: 0 0 68%;
            scroll-snap-align: start;
          }
          .ev-close-card {
            justify-content: flex-start;
          }
          .ev-close-scrim {
            background: rgba(25, 17, 11, 0.66);
          }
          .ev-close-txt {
            margin: 0 24px;
          }
        }
        @media (max-width: 760px) {
          .ev-panel {
            border-radius: 28px 28px 0 0;
            margin-top: -28px;
          }
          .ev-panel-wrap {
            padding-top: 48px;
            padding-bottom: 48px;
          }
          .ev-intro-head {
            gap: 20px;
          }
          .ev-stats {
            margin-top: 36px;
          }
          .ev-hero-box {
            min-height: 500px;
          }
          .ev-hero-copy {
            padding-bottom: 64px;
            padding-left: 14px;
            padding-right: 14px;
          }
          .ev-hero-big {
            font-size: clamp(38px, 9.6vw, 56px);
            letter-spacing: 0.01em;
            line-height: 1;
          }
          .ev-hero-title .ev-script {
            font-size: clamp(44px, 11vw, 66px);
            padding-left: 0.4em;
          }
          .ev-reel-row {
            display: flex;
            flex-direction: column;
            overflow-x: visible;
            margin-right: 0;
            padding-right: 0;
            gap: 24px;
          }
          .ev-reel-row > li {
            flex: none;
            width: 100%;
          }
          .ev-close-card {
            min-height: auto;
            border-radius: 24px;
            justify-content: flex-start;
          }
          .ev-close-txt {
            margin: 0 20px;
            padding: 44px 0;
            gap: 20px;
            max-width: 100%;
          }
          .ev-close-txt .ev-title {
            font-size: clamp(28px, 7.5vw, 36px);
            line-height: 1.1;
          }
          .ev-close-txt .ev-script {
            font-size: clamp(32px, 8.5vw, 44px);
            padding-left: 0.6em;
          }
          .ev-close-txt .ev-lead {
            font-size: 16px;
            line-height: 1.5;
          }
          .ev-close-btns {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .ev-close-btns .ev-btn {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
            box-sizing: border-box;
          }
        }
        @media (max-width: 480px) {
          .ev-panel-wrap {
            padding-top: 42px;
            padding-bottom: 42px;
          }
          .ev-intro-head {
            gap: 16px;
          }
          .ev-stats {
            margin-top: 28px;
          }
          .ev-hero-box {
            min-height: 460px;
          }
          .ev-hero-copy {
            padding-bottom: 56px;
            padding-left: 8px;
            padding-right: 8px;
          }
          .ev-hero-big {
            font-size: clamp(33px, 9.2vw, 42px);
            letter-spacing: 0.005em;
            line-height: 1;
          }
          .ev-hero-title .ev-script {
            font-size: clamp(40px, 11vw, 52px);
            padding-left: 0.3em;
          }
          .ev-close-txt {
            margin: 0 16px;
            padding: 38px 0;
            gap: 18px;
          }
          .ev-close-txt .ev-title {
            font-size: clamp(25px, 7.2vw, 32px);
          }
          .ev-close-txt .ev-script {
            font-size: clamp(28px, 8.2vw, 38px);
            padding-left: 0.4em;
          }
          .ev-close-txt .ev-lead {
            font-size: 15px;
            line-height: 1.55;
          }
        }
        @media (max-width: 600px) {
          .ev-occ-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 40px;
          }
        }
      `}</style>

      {/* ============ 1. HERO ============ */}
      <header className="ev-hero-box">
        <Image
          className="ev-hero-img"
          src="/event-banner.jpg"
          alt="The Blue Sapphire banquet hall fully set for a celebration"
          fill
          priority
          sizes="100vw"
          quality={92}
        />
        <div className="ev-hero-scrim" aria-hidden="true" />
        <div className="ev-hero-copy ev-wrap">
          <h1 className="ev-hero-title">
            <span className="ev-hero-big">Celebrations</span>
            <span className="ev-script">at Manratan</span>
          </h1>
        </div>
      </header>

      {/* ============ 2. INTRO ============ */}
      <section className="ev-panel" aria-labelledby="intro-title">
        <div className="ev-wrap ev-panel-wrap">
          <div className="ev-intro-head">
            <div className="ev-orn" aria-hidden="true">
              <span />
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 1l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <span />
            </div>
            <p className="ev-eyebrow">Events &amp; celebrations</p>
            <h2 className="ev-title ev-center" id="intro-title">
              Crafted<span className="ev-script">to be remembered</span>
            </h2>
            <p className="ev-lead">
              From royal destination weddings and intimate family gatherings to poolside soirées and corporate retreats, every celebration here comes with elegant spaces, gracious hospitality and food people remember.
            </p>
            <p className="ev-body ev-center" style={{ maxWidth: "40em" }}>
              Set in the scenic hills of Narsinghgarh, the Mini Kashmir of Malwa, Manratan brings together the art of celebration and the warmth of belonging.
            </p>
          </div>
          <dl className="ev-stats">
            <div>
              <dt>4,000</dt>
              <dd>Guests on the Red Coral Lawn</dd>
            </div>
            <div>
              <dt>65</dt>
              <dd>Rooms for your guests</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>Pure vegetarian catering</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ============ 3. VENUES ============ */}
      <section className="ev-sec ev-sand" id="venues" aria-labelledby="ven-title">
        <div className="ev-wrap">
          <div className="ev-gems-head">
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <p className="ev-eyebrow">The venues</p>
              <h2 className="ev-title" id="ven-title">
                A collection<span className="ev-script">of gems</span>
              </h2>
            </div>
            <p className="ev-body">
              Our halls and lawns are named for jewels: sapphire, diamond, coral. Each one suits a different part of the celebration.
            </p>
          </div>

          <div className="ev-gems">
            {gems.map((g, idx) => {
              const isOn = activeGem === idx;
              return (
                <button
                  key={g.num}
                  className={`ev-gem ${isOn ? "is-on" : ""}`}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => setActiveGem(idx)}
                  onMouseEnter={() => setActiveGem(idx)}
                  onFocus={() => setActiveGem(idx)}
                >
                  <div className="ev-gem-img-wrap">
                    <Image
                      src={g.img}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      quality={88}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <span className="ev-gem-scrim" aria-hidden="true" />
                  <span className="ev-gem-n">{g.num}</span>
                  <span className="ev-gem-v" aria-hidden="true">
                    {g.name}
                  </span>
                  <span className="ev-gem-body">
                    <span className="ev-gem-cap">{g.cap}</span>
                    <span className="ev-gem-name">{g.name}</span>
                    <span className="ev-gem-desc">{g.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 4. REELS ============ */}
      <section className="ev-sec ev-maroon" id="reels" aria-labelledby="reel-title">
        <div className="ev-wrap">
          <div className="ev-reels-head">
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <p className="ev-eyebrow">Moments in motion</p>
              <h2 className="ev-title" id="reel-title">
                The reels<span className="ev-script">from our celebrations</span>
              </h2>
            </div>
            <div className="ev-reels-head-r">
              <p className="ev-body">
                Haldi mornings, sangeet nights and receptions under the open sky, as they happened at Manratan.
              </p>
            </div>
          </div>
          <ul className="ev-reel-row">
            {reels.map((r) => (
              <li key={r.title}>
                <a
                  className="ev-reel"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Play reel: ${r.title}`}
                >
                  <span className="ev-reel-ph">
                    <Image
                      src={r.img}
                      alt={r.title}
                      fill
                      sizes="(max-width: 900px) 70vw, 25vw"
                      quality={88}
                      style={{ objectFit: "cover" }}
                    />
                    <span className="ev-reel-play" aria-hidden="true">
                      <svg width="16" height="18" viewBox="0 0 22 24" fill="currentColor">
                        <path d="M2 1.5v21L21 12z" />
                      </svg>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(36px, 4vw, 54px)" }}>
            <a
              className="ev-link"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              style={{ alignSelf: "center" }}
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
      <section className="ev-sec" id="occasions" aria-labelledby="occ-title">
        <div className="ev-wrap">
          <div className="ev-occ-head">
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <p className="ev-eyebrow">Host your event</p>
              <h2 className="ev-title" id="occ-title">
                Every occasion<span className="ev-script">with us</span>
              </h2>
            </div>
            <div className="ev-occ-head-r">
              <p className="ev-body">
                Six ways to celebrate at Manratan, each with the venue that suits it best.
              </p>
            </div>
          </div>

          <ul className="ev-occ-grid">
            {occasions.map((o) => (
              <li key={o.title} className="ev-occ">
                <Link className="ev-occ-card" href="/contactus">
                  <div className="ev-occ-ph2">
                    <Image
                      src={o.img}
                      alt={o.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      quality={88}
                      style={{ objectFit: "cover" }}
                    />
                    <span className="ev-occ-chip">
                      <i style={{ backgroundColor: o.dot }} />
                      {o.venue}
                    </span>
                  </div>
                  <div className="ev-occ-txt">
                    <h3>{o.title}</h3>
                    <p>{o.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(36px, 4vw, 54px)" }}>
            <a className="ev-link" href="#venues">
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
        style={{ paddingBottom: "clamp(88px, 9vw, 132px)" }}
        id="enquire"
        aria-labelledby="close-title"
      >
        <div className="ev-wrap">
          <div className="ev-close-card">
            <Image
              src="/events-page/4c58e0c82a181387981f70379aee86ae.jpg"
              alt="Golden Sapphire banquet hall with gold-draped tables"
              fill
              sizes="100vw"
              quality={90}
              style={{ objectFit: "cover", objectPosition: "40% 50%" }}
            />
            <div className="ev-close-scrim" aria-hidden="true" />
            <div className="ev-close-txt">
              <p className="ev-eyebrow">Plan with us</p>
              <h2 className="ev-title" id="close-title">
                A celebration<span className="ev-script">people talk about</span>
              </h2>
              <p className="ev-lead">
                Tell us the date, the guest count and the moments you have in mind. Our events team will come back with venues, menus and rooms.
              </p>
              <div className="ev-close-btns">
                <Link className="ev-btn ev-btn-gold" href="/contactus">
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
                  className="ev-btn ev-btn-ghost"
                  href="https://wa.me/919171172205"
                  target="_blank"
                  rel="noreferrer"
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
                    <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" />
                    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1-.4-2-1.4-2.4-2.4l1-1-1-2z" />
                  </svg>
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
