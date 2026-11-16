"use client";

import { useState } from "react";
import BookingForm from "@/components/BookingForm";

const tags = [
  ["suite", "couple"],
  ["couple"],
  ["family"],
  ["family"],
  ["couple", "family"],
];

export default function AccommodationContent() {
  const [filter, setFilter] = useState("all");
  const matches = (room: string[]) => filter === "all" || room.includes(filter);
  const shown = tags.filter(matches).length;
  const roomClass = (index: number) => {
    const visible = matches(tags[index]);
    const preceding = tags.slice(0, index).filter(matches).length;
    return `rm${visible && preceding % 2 ? " flip" : ""}${visible ? "" : " is-hidden"}`;
  };
  return (
    <main className="accommodation-page" id="top">
      <header className="hero ab-hero acc-hero">
        <img
          className="hero-img"
          src="/accommodation-reference/4434b49f370d9431e97678d7fb0767b1.jpg"
          alt="Executive Suite bedroom with a panoramic window over the hills"
          style={{ objectPosition: "50% 50%" }}
        />
        <div className="hero-scrim" aria-hidden="true"></div>
        <div className="ab-hero-copy wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <a href="/">{"Home"}</a>
            <span aria-hidden="true">{"/"}</span>
            <span>{"Rooms & suites"}</span>
          </nav>
          <h1 className="hero-title" style={{ textAlign: "center" }}>
            <span className="hero-big">{"Rooms & Suites"}</span>
            <span className="script" style={{ paddingLeft: "1.4em" }}>
              {"stay a little longer"}
            </span>
          </h1>
        </div>
      </header>
      <section className="panel" aria-labelledby="intro-title">
        <div
          className="wrap"
          style={{
            position: "relative",
            zIndex: 2,
            paddingBottom: "clamp(56px, 6vw, 88px)",
          }}
        >
          <div id="book" className="accommodation-booking">
            <BookingForm />
          </div>
          <div className="intro-head rv" style={{ marginTop: "24px" }}>
            <div className="orn" aria-hidden="true">
              <span></span>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path
                  d="M7 1l6 8-6 8-6-8z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                ></path>
              </svg>
              <span></span>
            </div>
            <p className="eyebrow">{"Accommodation"}</p>
            <h2 className="title center" id="intro-title">
              {"Sixty-five rooms"}
              <span className="script">{"made to feel like home"}</span>
            </h2>
            <p className="lead">
              {
                "Stylish interiors, plush bedding and generous layouts, made for families, couples and friends travelling together."
              }
            </p>
            <p className="body center" style={{ maxWidth: "40em" }}>
              {
                "Wake up to garden, pool or hill views. Whether you are here for a weekend or a family wedding, it should feel like home from the first night."
              }
            </p>
          </div>
        </div>
      </section>
      <section
        className="sec"
        id="rooms"
        aria-labelledby="rooms-title"
        style={{ paddingTop: "clamp(40px, 4vw, 64px)" }}
      >
        <div className="wrap">
          <div className="gems-head rv">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "22px" }}
            >
              <p className="eyebrow">{"Choose your room"}</p>
              <h2 className="title" id="rooms-title">
                {"Five ways"}
                <span className="script">{"to stay"}</span>
              </h2>
            </div>
            <p className="body">
              {
                "From a suite with its own living room to interconnected rooms for the whole family."
              }
            </p>
          </div>
          <div className="flt-bar rv">
            <div className="flts" role="group" aria-label="Filter rooms">
              <button
                className={filter === "all" ? "flt is-on" : "flt"}
                type="button"
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
              >
                {"All rooms "}
                <b>{"5"}</b>
              </button>
              <button
                className={filter === "suite" ? "flt is-on" : "flt"}
                type="button"
                aria-pressed={filter === "suite"}
                onClick={() => setFilter("suite")}
              >
                {"Suites "}
                <b>{"1"}</b>
              </button>
              <button
                className={filter === "family" ? "flt is-on" : "flt"}
                type="button"
                aria-pressed={filter === "family"}
                onClick={() => setFilter("family")}
              >
                {"For families "}
                <b>{"3"}</b>
              </button>
              <button
                className={filter === "couple" ? "flt is-on" : "flt"}
                type="button"
                aria-pressed={filter === "couple"}
                onClick={() => setFilter("couple")}
              >
                {"For couples "}
                <b>{"3"}</b>
              </button>
            </div>
            <p className="flt-note" aria-live="polite">
              {"Showing "}
              {shown}
              {" of 5 room types"}
            </p>
          </div>
          <article className={roomClass(0)} aria-labelledby="rm0">
            <a
              className="rm-ph rv"
              href="/accommodation/executive-suite"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src="/accommodation-reference/73c62d41018b83f97f6087d2a566c056.jpg"
                alt="Executive Suite living room with sofa, armchair and floor-to-ceiling window"
                loading="lazy"
              />
              <span className="rm-badge">{"2 suites"}</span>
            </a>
            <div className="rm-txt rv">
              <p className="eyebrow">{"01 · Suite"}</p>
              <h3 className="rm-name" id="rm0">
                {"Executive Suite"}
              </h3>
              <p className="rm-desc">
                {
                  "A separate living room, a white-marble bath and the widest view in the house."
                }
              </p>
              <dl className="rm-specs">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 18v-7h18v7M3 14.5h18M5 11V7.5h6V11M13 11V7.5h6V11M3 18v2M21 18v2"></path>
                  </svg>
                  <dt>{"Beds"}</dt>
                  <dd>{"Master bedroom"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="1.5"></rect>
                    <path d="M3 17l5-5 4 4 3-3 6 5"></path>
                    <circle cx="16" cy="9" r="1.6"></circle>
                  </svg>
                  <dt>{"View"}</dt>
                  <dd>{"Panoramic view"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 21h14M7 21V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V21"></path>
                    <circle
                      cx="14.2"
                      cy="12"
                      r=".9"
                      fill="currentColor"
                    ></circle>
                  </svg>
                  <dt>{"Available"}</dt>
                  <dd>{"2 suites"}</dd>
                </div>
              </dl>
              <div className="rm-cta">
                <a className="btn btn-ink" href="#book">
                  {"Book this room"}
                </a>
                <a className="link" href="/accommodation/executive-suite">
                  {"View room "}
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 5h16M12 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
          <article className={roomClass(1)} aria-labelledby="rm1">
            <a
              className="rm-ph rv"
              href="/accommodation/premium-room"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src="/accommodation-reference/f0252e30d215acb82a369beb8f5f50bf.jpg"
                alt="Premium Room with king bed, sofa and window view"
                loading="lazy"
              />
              <span className="rm-badge">{"16 rooms"}</span>
            </a>
            <div className="rm-txt rv">
              <p className="eyebrow">{"02 · Room"}</p>
              <h3 className="rm-name" id="rm1">
                {"Premium Room"}
              </h3>
              <p className="rm-desc">
                {
                  "A king bed, a sofa-cum-bed by the window and the hills beyond."
                }
              </p>
              <dl className="rm-specs">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 18v-7h18v7M3 14.5h18M5 11V7.5h6V11M13 11V7.5h6V11M3 18v2M21 18v2"></path>
                  </svg>
                  <dt>{"Beds"}</dt>
                  <dd>{"King + sofa-cum-bed"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="1.5"></rect>
                    <path d="M3 17l5-5 4 4 3-3 6 5"></path>
                    <circle cx="16" cy="9" r="1.6"></circle>
                  </svg>
                  <dt>{"View"}</dt>
                  <dd>{"Nature view"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 21h14M7 21V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V21"></path>
                    <circle
                      cx="14.2"
                      cy="12"
                      r=".9"
                      fill="currentColor"
                    ></circle>
                  </svg>
                  <dt>{"Available"}</dt>
                  <dd>{"16 rooms"}</dd>
                </div>
              </dl>
              <div className="rm-cta">
                <a className="btn btn-ink" href="#book">
                  {"Book this room"}
                </a>
                <a className="link" href="/accommodation/premium-room">
                  {"View room "}
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 5h16M12 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
          <article className={roomClass(2)} aria-labelledby="rm2">
            <a
              className="rm-ph rv"
              href="/accommodation/executive-family-room"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src="/accommodation-reference/4dccf3c70be945be9694b8a9841d5b22.jpg"
                alt="Executive Family Room with two beds made up side by side"
                loading="lazy"
              />
              <span className="rm-badge">{"8 rooms"}</span>
            </a>
            <div className="rm-txt rv">
              <p className="eyebrow">{"03 · Family"}</p>
              <h3 className="rm-name" id="rm2">
                {"Executive Family Room"}
              </h3>
              <p className="rm-desc">
                {"Room for the whole family, with a view of the pool."}
              </p>
              <dl className="rm-specs">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 18v-7h18v7M3 14.5h18M5 11V7.5h6V11M13 11V7.5h6V11M3 18v2M21 18v2"></path>
                  </svg>
                  <dt>{"Beds"}</dt>
                  <dd>{"Twin beds"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="1.5"></rect>
                    <path d="M3 17l5-5 4 4 3-3 6 5"></path>
                    <circle cx="16" cy="9" r="1.6"></circle>
                  </svg>
                  <dt>{"View"}</dt>
                  <dd>{"Pool view"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 21h14M7 21V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V21"></path>
                    <circle
                      cx="14.2"
                      cy="12"
                      r=".9"
                      fill="currentColor"
                    ></circle>
                  </svg>
                  <dt>{"Available"}</dt>
                  <dd>{"8 rooms"}</dd>
                </div>
              </dl>
              <div className="rm-cta">
                <a className="btn btn-ink" href="#book">
                  {"Book this room"}
                </a>
                <a className="link" href="/accommodation/executive-family-room">
                  {"View room "}
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 5h16M12 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
          <article className={roomClass(3)} aria-labelledby="rm3">
            <a
              className="rm-ph rv"
              href="/accommodation/deluxe-interconnected-room"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src="/accommodation-reference/73f38aa930e39f06b393dd84005492dc.jpg"
                alt="Deluxe Interconnected Room with two connected bedrooms"
                loading="lazy"
              />
              <span className="rm-badge">{"12 rooms"}</span>
            </a>
            <div className="rm-txt rv">
              <p className="eyebrow">{"04 · Family"}</p>
              <h3 className="rm-name" id="rm3">
                {"Deluxe Interconnected Room"}
              </h3>
              <p className="rm-desc">
                {"Two rooms behind one door, for families travelling together."}
              </p>
              <dl className="rm-specs">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 18v-7h18v7M3 14.5h18M5 11V7.5h6V11M13 11V7.5h6V11M3 18v2M21 18v2"></path>
                  </svg>
                  <dt>{"Beds"}</dt>
                  <dd>{"Two connected rooms"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="1.5"></rect>
                    <path d="M3 17l5-5 4 4 3-3 6 5"></path>
                    <circle cx="16" cy="9" r="1.6"></circle>
                  </svg>
                  <dt>{"View"}</dt>
                  <dd>{"Pool & garden view"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 21h14M7 21V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V21"></path>
                    <circle
                      cx="14.2"
                      cy="12"
                      r=".9"
                      fill="currentColor"
                    ></circle>
                  </svg>
                  <dt>{"Available"}</dt>
                  <dd>{"12 rooms"}</dd>
                </div>
              </dl>
              <div className="rm-cta">
                <a className="btn btn-ink" href="#book">
                  {"Book this room"}
                </a>
                <a className="link" href="/accommodation/deluxe-interconnected-room">
                  {"View room "}
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 5h16M12 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
          <article className={roomClass(4)} aria-labelledby="rm4">
            <a
              className="rm-ph rv"
              href="/accommodation/deluxe-room"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src="/accommodation-reference/ee837becad6523c696faf319c7d4af5a.jpg"
                alt="Deluxe Room with double bed, warm-lit curtains and a writing desk"
                loading="lazy"
              />
              <span className="rm-badge">{"25 rooms"}</span>
            </a>
            <div className="rm-txt rv">
              <p className="eyebrow">{"05 · Room"}</p>
              <h3 className="rm-name" id="rm4">
                {"Deluxe Room"}
              </h3>
              <p className="rm-desc">
                {"Calm, warm-lit rooms looking out over the gardens."}
              </p>
              <dl className="rm-specs">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 18v-7h18v7M3 14.5h18M5 11V7.5h6V11M13 11V7.5h6V11M3 18v2M21 18v2"></path>
                  </svg>
                  <dt>{"Beds"}</dt>
                  <dd>{"Twin or double bed"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="1.5"></rect>
                    <path d="M3 17l5-5 4 4 3-3 6 5"></path>
                    <circle cx="16" cy="9" r="1.6"></circle>
                  </svg>
                  <dt>{"View"}</dt>
                  <dd>{"Garden view"}</dd>
                </div>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 21h14M7 21V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V21"></path>
                    <circle
                      cx="14.2"
                      cy="12"
                      r=".9"
                      fill="currentColor"
                    ></circle>
                  </svg>
                  <dt>{"Available"}</dt>
                  <dd>{"25 rooms"}</dd>
                </div>
              </dl>
              <div className="rm-cta">
                <a className="btn btn-ink" href="#book">
                  {"Book this room"}
                </a>
                <a className="link" href="/accommodation/deluxe-room">
                  {"View room "}
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 5h16M12 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="sec ink" id="in-room" aria-labelledby="inroom-title">
        <div className="wrap">
          <div
            className="center rv"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "22px",
            }}
          >
            <div className="orn" aria-hidden="true">
              <span></span>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path
                  d="M7 1l6 8-6 8-6-8z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                ></path>
              </svg>
              <span></span>
            </div>
            <p className="eyebrow">{"In every room"}</p>
            <h2 className="title center" id="inroom-title">
              {"The little"}
              <span className="script">{"things"}</span>
            </h2>
          </div>
          <ul className="amen-grid amen-6">
            <li className="amen rv">
              <div className="amen-box">
                <div className="amen-ico" aria-hidden="true">
                  <svg
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path d="M32 6v52M9.5 19l45 26M9.5 45l45-26"></path>
                    <path d="M26 10l6 5 6-5M26 54l6-5 6 5M10 27l7.5-2.5L16 17M48 47l-1.5-7.5L54 37M10 37l7.5 2.5L16 47M48 17l-1.5 7.5L54 27"></path>
                  </svg>
                </div>
                <h3 className="amen-name">{"Air conditioning"}</h3>
              </div>
            </li>
            <li className="amen rv">
              <div className="amen-box">
                <div className="amen-ico" aria-hidden="true">
                  <svg
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path d="M8 27a34 34 0 0 1 48 0"></path>
                    <path d="M15 34.5a24 24 0 0 1 34 0"></path>
                    <path d="M22.5 42a13.5 13.5 0 0 1 19 0"></path>
                    <circle
                      cx="32"
                      cy="49"
                      r="2.4"
                      fill="currentColor"
                    ></circle>
                  </svg>
                </div>
                <h3 className="amen-name">{"Free Wi-Fi"}</h3>
              </div>
            </li>
            <li className="amen rv">
              <div className="amen-box">
                <div className="amen-ico" aria-hidden="true">
                  <svg
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path d="M12 28h34v10a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14z"></path>
                    <path d="M46 32h4a6 6 0 0 1 0 12h-5"></path>
                    <path d="M8 56h42"></path>
                    <path d="M22 20c0-4 4-4 4-8M30 20c0-4 4-4 4-8"></path>
                  </svg>
                </div>
                <h3 className="amen-name">{"Tea & coffee"}</h3>
              </div>
            </li>
            <li className="amen rv">
              <div className="amen-box">
                <div className="amen-ico" aria-hidden="true">
                  <svg
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path d="M24 22h16v6l4 6v20a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V34l4-6z"></path>
                    <path d="M26 22v-6h12v6M32 16V9h8"></path>
                    <path d="M20 40h24"></path>
                    <circle cx="50" cy="16" r="3"></circle>
                    <circle cx="14" cy="24" r="2"></circle>
                  </svg>
                </div>
                <h3 className="amen-name">{"Premium bath amenities"}</h3>
              </div>
            </li>
            <li className="amen rv">
              <div className="amen-box">
                <div className="amen-ico" aria-hidden="true">
                  <svg
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path d="M10 44a22 22 0 0 1 44 0"></path>
                    <path d="M6 44h52"></path>
                    <path d="M10 50h44"></path>
                    <path d="M32 22v-3"></path>
                    <circle cx="32" cy="16.5" r="2.5"></circle>
                    <path d="M19 36a14 14 0 0 1 8-8"></path>
                  </svg>
                </div>
                <h3 className="amen-name">{"Room service"}</h3>
              </div>
            </li>
            <li className="amen rv">
              <div className="amen-box">
                <div className="amen-ico" aria-hidden="true">
                  <svg
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path d="M6 36h48"></path>
                    <path d="M9 36v18h42V36"></path>
                    <path d="M9 45h42"></path>
                    <path d="M22 36a8 8 0 0 1 16 0"></path>
                    <path d="M30 28v-2.5M27 25.5h6"></path>
                    <circle cx="50" cy="15" r="9"></circle>
                    <path d="M50 10v5.5l3.5 2"></path>
                  </svg>
                </div>
                <h3 className="amen-name">{"24-hour front desk"}</h3>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="sec" aria-labelledby="close-title">
        <div className="wrap">
          <div className="close-card rv">
            <img
              src="/accommodation-reference/1ff8fae4a595e88dc0e19896b4804a26.jpg"
              alt="A guest reading by a tall window that looks out over green countryside"
            />
            <div className="close-scrim" aria-hidden="true"></div>
            <div className="close-txt">
              <p className="eyebrow">{"Plan your stay"}</p>
              <h2 className="title" id="close-title">
                {"Your room"}
                <span className="script">{"is waiting"}</span>
              </h2>
              <p className="lead">
                {
                  "Tell us your dates and who is coming. Our reservations team will find the right room for you."
                }
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a className="btn btn-gold" href="#book">
                  {"Check availability"}
                </a>
                <a className="btn btn-ghost" href="tel:+919171172205">
                  {"Call +91 91711 72205"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
