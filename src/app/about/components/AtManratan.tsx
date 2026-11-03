"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionWithContainer } from "@/components/sectionComponants";

interface Slide {
  image: string;
  logo?: string;
  description: string;
}

interface AtManratanProps {
  title: string;
  subTitle: string;
  slides: Slide[];
}

// Layered deck slot coordinates:
// Left margin (50px per step) is larger than top margin (25px per step).
// Front card rests at bottom-right, middle and back cards stagger with prominent left margin.
const DESKTOP_SLOTS = [
  { x: "100px", y: "50px", a: 1, z: 3, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)" },
  { x: "50px", y: "25px", a: 1, z: 2, shadow: "0 18px 36px -8px rgba(0, 0, 0, 0.35)" },
  { x: "0px", y: "0px", a: 1, z: 1, shadow: "0 12px 24px -5px rgba(0, 0, 0, 0.25)" },
];

// Mobile 3-Card Balanced Deck Slots:
// Center card is full height (scale 1).
// Side cards are scaled (scale 0.93) and positioned so that:
// - Top sits lower than front card (staggered crown)
// - Bottom curves inward and terminates cleanly above the front card's bottom curve
const MOBILE_DECK_SLOTS = [
  {
    x: "0px",
    y: "0px",
    rotate: "0deg",
    scale: 1,
    zIndex: 10,
    overlayOpacity: 0,
    shadow: "0 20px 40px -10px rgba(0, 0, 0, 0.55)",
  },
  {
    x: "20px",
    y: "-6px",
    rotate: "3deg",
    scale: 0.93,
    zIndex: 2,
    overlayOpacity: 0.38,
    shadow: "0 14px 28px -6px rgba(0, 0, 0, 0.35)",
  },
  {
    x: "-20px",
    y: "-6px",
    rotate: "-3deg",
    scale: 0.93,
    zIndex: 1,
    overlayOpacity: 0.38,
    shadow: "0 10px 20px -4px rgba(0, 0, 0, 0.3)",
  },
];

const AtManratan = ({ title, subTitle, slides }: AtManratanProps) => {
  // 3 card elements in DOM, managed by order [slot0, slot1, slot2]
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const [cardImages, setCardImages] = useState<string[]>([
    slides[0]?.image || "",
    slides[1 % (slides.length || 1)]?.image || "",
    slides[2 % (slides.length || 1)]?.image || "",
  ]);
  const [copyState, setCopyState] = useState<"normal" | "leaving" | "entering">("normal");
  const [isPaused, setIsPaused] = useState(false);
  const isLockedRef = useRef(false);

  // Mobile circular deck state: 1 in Center (Slot 0), 1 on Right (Slot 1), 1 on Left (Slot 2)
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileOrder, setMobileOrder] = useState<number[]>([0, 1, 2]);
  const [mobileCards, setMobileCards] = useState<Slide[]>([
    slides[0] || { image: "", description: "" },
    slides[1 % (slides.length || 1)] || { image: "", description: "" },
    slides[(slides.length - 1) % (slides.length || 1)] || { image: "", description: "" },
  ]);
  const isMobileLockedRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const goMobileNext = () => {
    if (isMobileLockedRef.current || slides.length === 0) return;
    isMobileLockedRef.current = true;

    const nextIdx = (mobileIndex + 1) % slides.length;
    // Current Slot 0 moves to Slot 2 (Left)
    // Current Slot 1 moves to Slot 0 (Center)
    // Current Slot 2 moves to Slot 1 (Right)
    const newOrder = [mobileOrder[1], mobileOrder[2], mobileOrder[0]];

    // The card moving to Slot 1 (Right) receives the upcoming right slide
    setMobileCards((prev) => {
      const updated = [...prev];
      updated[mobileOrder[2]] = slides[(nextIdx + 1) % slides.length];
      return updated;
    });

    setMobileOrder(newOrder);
    setMobileIndex(nextIdx);

    setTimeout(() => {
      isMobileLockedRef.current = false;
    }, 450);
  };

  const goMobilePrev = () => {
    if (isMobileLockedRef.current || slides.length === 0) return;
    isMobileLockedRef.current = true;

    const prevIdx = (mobileIndex - 1 + slides.length) % slides.length;
    // Current Slot 0 moves to Slot 1 (Right)
    // Current Slot 1 moves to Slot 2 (Left)
    // Current Slot 2 moves to Slot 0 (Center)
    const newOrder = [mobileOrder[2], mobileOrder[0], mobileOrder[1]];

    // The card moving to Slot 2 (Left) receives the upcoming left slide
    setMobileCards((prev) => {
      const updated = [...prev];
      updated[mobileOrder[1]] = slides[(prevIdx - 1 + slides.length) % slides.length];
      return updated;
    });

    setMobileOrder(newOrder);
    setMobileIndex(prevIdx);

    setTimeout(() => {
      isMobileLockedRef.current = false;
    }, 450);
  };

  // Synchronized slot shuffle matching khufus.com
  const goNext = () => {
    if (isLockedRef.current || slides.length === 0) return;
    isLockedRef.current = true;

    const nextIndex = (index + 1) % slides.length;
    // Current slot 0 moves to slot 2, slot 1 moves to slot 0, slot 2 moves to slot 1
    const nextOrder = [order[1], order[2], order[0]];

    // Outgoing front card (order[0]) takes the upcoming deck image as it moves behind
    setCardImages((prev) => {
      const updated = [...prev];
      updated[order[0]] = slides[(nextIndex + 2) % slides.length]?.image || "";
      return updated;
    });

    // Content blur-swap transition (exact Khufu's 210ms curve)
    setCopyState("leaving");
    setTimeout(() => {
      setIndex(nextIndex);
      setCopyState("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCopyState("normal");
        });
      });
    }, 210);

    // Apply new order to trigger 520ms CSS transform transition
    setOrder(nextOrder);

    setTimeout(() => {
      isLockedRef.current = false;
    }, 550);
  };

  const goPrev = () => {
    if (isLockedRef.current || slides.length === 0) return;
    isLockedRef.current = true;

    const prevIndex = (index - 1 + slides.length) % slides.length;
    // Current slot 2 steps up to slot 0, slot 0 moves to slot 1, slot 1 moves to slot 2
    const prevOrder = [order[2], order[0], order[1]];

    // Incoming front card (order[2]) takes the previous slide image
    setCardImages((prev) => {
      const updated = [...prev];
      updated[order[2]] = slides[prevIndex]?.image || "";
      return updated;
    });

    setCopyState("leaving");
    setTimeout(() => {
      setIndex(prevIndex);
      setCopyState("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCopyState("normal");
        });
      });
    }, 210);

    setOrder(prevOrder);

    setTimeout(() => {
      isLockedRef.current = false;
    }, 550);
  };

  // Auto-play interval increased to 8.5 seconds (with pause on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goNext();
    }, 8500);

    return () => clearInterval(timer);
  }, [index, order, isPaused]);

  // Mobile Auto-play interval (8.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goMobileNext();
    }, 8500);

    return () => clearInterval(timer);
  }, [mobileIndex, mobileOrder, isPaused]);

  // Style generators for Desktop & Mobile
  const getDesktopCardStyle = (cardId: number): React.CSSProperties => {
    const slotIdx = order.indexOf(cardId);
    const slot = DESKTOP_SLOTS[slotIdx >= 0 ? slotIdx : 0];
    return {
      transform: `translate3d(${slot.x}, ${slot.y}, 0)`,
      opacity: slot.a,
      zIndex: slot.z,
      boxShadow: slot.shadow,
    };
  };

  const getMobileCardStyle = (cardId: number): React.CSSProperties => {
    const slotIdx = mobileOrder.indexOf(cardId);
    const slot = MOBILE_DECK_SLOTS[slotIdx >= 0 ? slotIdx : 0];
    return {
      transform: `translate3d(${slot.x}, ${slot.y}, 0) rotate(${slot.rotate}) scale(${slot.scale})`,
      zIndex: slot.zIndex,
      boxShadow: slot.shadow,
      transformOrigin: "center center",
      transition: "transform 450ms cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 450ms ease",
      willChange: "transform",
    };
  };

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="bg-tertiary pt-12 md:pt-20 pb-16 md:pb-28 lg:pb-32"
    >
      {/* ================= TITLE ================= */}
      <div className="mb-8 md:mb-10 flex flex-col items-center justify-center text-center">
        <div className="relative inline-block text-left">
          <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-[serif] uppercase leading-none">
            {title}
          </h2>

          <p className="font-golden text-primary text-2xl sm:text-3xl leading-none text-right mt-1 -mr-2">
            {subTitle}
          </p>
        </div>
      </div>

      {/* ================= MOBILE SLIDER (1 IN CENTER, 1 ON RIGHT, 1 ON LEFT) ================= */}
      <div
        className="block md:hidden w-full max-w-[360px] mx-auto pt-4 px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const diffX = e.changedTouches[0].clientX - touchStartX.current;
          if (diffX < -35) {
            goMobileNext();
          } else if (diffX > 35) {
            goMobilePrev();
          }
          touchStartX.current = null;
        }}
      >
        <div className="relative w-full h-[450px] mx-auto select-none">
          {[0, 1, 2].map((cardId) => {
            const slotIdx = mobileOrder.indexOf(cardId);
            const slot = MOBILE_DECK_SLOTS[slotIdx >= 0 ? slotIdx : 0];
            const slide = mobileCards[cardId];

            return (
              <div
                key={`m-card-${cardId}`}
                style={getMobileCardStyle(cardId)}
                onClick={() => {
                  if (slotIdx === 1) {
                    goMobileNext();
                  } else if (slotIdx === 2) {
                    goMobilePrev();
                  } else {
                    goMobileNext();
                  }
                }}
                className="absolute inset-x-0 bottom-0 top-0 w-[265px] xs:w-[285px] h-[450px] mx-auto rounded-[24px] overflow-hidden bg-primary cursor-pointer shadow-2xl"
              >
                {slide?.image && (
                  <Image
                    src={slide.image}
                    alt={title}
                    fill
                    priority={slotIdx === 0}
                    className="object-cover"
                  />
                )}

                {/* Dark tint overlay for side cards to differentiate depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: "#1A120B",
                    opacity: slot.overlayOpacity,
                    transition: "opacity 450ms cubic-bezier(0.2, 0.9, 0.2, 1)",
                  }}
                />

                {/* Bottom Dark Gradient Overlay with Fixed Logo & Description */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-20 pb-7 px-5 flex flex-col items-center justify-end text-center pointer-events-none">
                  {slide?.logo && (
                    <div className="relative h-[65px] w-[175px] mb-3 pointer-events-auto">
                      <Image
                        src={slide.logo}
                        alt="Swadika"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  <p className="text-white/95 text-[13px] leading-relaxed text-center font-light pointer-events-auto">
                    {slide?.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide Navigation Controls Below Cards */}
        <div className="flex items-center justify-center gap-6 mt-6 text-primary select-none">
          <button
            type="button"
            onClick={goMobilePrev}
            aria-label="Previous slide"
            className="text-lg p-2 hover:opacity-70 transition cursor-pointer"
          >
            ‹
          </button>

          <span className="text-sm font-ivy font-['IvyOra_Display',serif] tracking-[0.07em] text-primary font-normal">
            {mobileIndex + 1}/{slides.length}
          </span>

          <button
            type="button"
            onClick={goMobileNext}
            aria-label="Next slide"
            className="text-lg p-2 hover:opacity-70 transition cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      {/* ================= DESKTOP SLIDER (KHUFU'S LAYERED CARD DECK) ================= */}
      <div
        className="hidden md:block w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_0.9fr] items-start">
          {/* ================= 3D CARD LAYERED DECK ================= */}
          <div className="relative w-full h-[540px] select-none">
            {[0, 1, 2].map((cardId) => {
              const slotIdx = order.indexOf(cardId);
              return (
                <div
                  key={`desk-card-${cardId}`}
                  style={getDesktopCardStyle(cardId)}
                  onClick={goNext}
                  className="absolute top-0 left-0 w-[calc(100%-100px)] h-[490px] overflow-hidden rounded-xs cursor-pointer group exp-card-transition"
                >
                  {cardImages[cardId] && (
                    <Image
                      src={cardImages[cardId]}
                      alt={title}
                      fill
                      priority={cardId === 0}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}

                  {/* Dark/Warm Tint Overlay to Differentiate Background Layers */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: "#1A120B",
                      opacity: slotIdx === 0 ? 0 : slotIdx === 1 ? 0.32 : 0.52,
                      transition: "opacity 520ms cubic-bezier(0.2, 0.9, 0.2, 1)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* ================= CONTENT PANEL (WITH FIXED LOGO & ANIMATED COPY) ================= */}
          <div className="w-full lg:pl-10">
            <div className="w-full h-[540px] bg-primary p-8 lg:p-10 flex flex-col justify-between shadow-2xl">
              <div aria-hidden="true" className="h-2" />

              {/* Centered Area: Fixed Logo + Animated Description */}
              <div className="my-auto flex flex-col items-center justify-center text-center w-full">
                {/* Fixed Logo (Prominent Size, Stable, Does NOT Animate on Slide Change) */}
                {slides[0]?.logo && (
                  <div className="relative h-[90px] w-[230px] lg:h-[95px] lg:w-[250px] mx-auto mb-10 lg:mb-12">
                    <Image
                      src={slides[0].logo}
                      alt="Swadika"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Animated Description Only */}
                <div
                  className={`w-full exp-copy-transition ${
                    copyState === "leaving"
                      ? "exp-copy-leaving"
                      : copyState === "entering"
                      ? "exp-copy-entering"
                      : ""
                  }`}
                >
                  <p className="text-[16px] leading-7 text-white text-center font-light max-w-sm mx-auto">
                    {slides[index]?.description}
                  </p>
                </div>
              </div>

              {/* ================= SLIDE COUNT & NEXT BUTTON ================= */}
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-4 text-white text-[32px] leading-none w-fit hover:opacity-80 transition cursor-pointer font-ivy font-['IvyOra_Display',serif] tracking-[0.07em]"
              >
                <span>
                  {index + 1}/{slides.length}
                </span>

                <span className="text-[32px] leading-none">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default AtManratan;
