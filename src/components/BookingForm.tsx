"use client";

import { forwardRef, useEffect, useId, useRef, useState, type ButtonHTMLAttributes } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import { useWebContext, type BookingPrefill } from "@/context-api/WebContext";
import { addDays, formatShort, nightsBetween, startOfToday, toLocalISODate } from "@/utils/dates";

export interface BookingFormProps {
  variant?: "hero" | "room";
  gridView?: boolean;
  className?: string;
  onSearch?: (data: { checkin: string; checkout: string; adults: number; children: number }) => void;
}

type TriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fieldLabel: string;
  shown: string;
  emptyText: string;
  hint?: string;
};

const DateTrigger = forwardRef<HTMLButtonElement, TriggerProps>(function DateTrigger(
  { fieldLabel, shown, emptyText, hint, onClick, id, className, onKeyDown, onFocus, onBlur, disabled },
  ref,
) {
  return (
    <button
      ref={ref}
      id={id}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      aria-haspopup="dialog"
      className={`mr-bf-field w-full text-left ${className ?? ""}`}
    >
      <span className="mr-bf-label">
        {fieldLabel}
        {hint && <span className="ml-2 normal-case tracking-normal text-white/70">{hint}</span>}
      </span>
      <span className={`mr-bf-value ${shown ? "" : "text-white/60"}`}>{shown || emptyText}</span>
    </button>
  );
});

export default function BookingForm({ variant = "hero", gridView = false, className = "", onSearch }: BookingFormProps) {
  const { openEnquiry } = useWebContext();
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);
  const [error, setError] = useState("");
  const [narrow, setNarrow] = useState(false);

  const guestRef = useRef<HTMLDivElement>(null);
  const ids = useId();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!guestOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) setGuestOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGuestOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [guestOpen]);

  const today = startOfToday();
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  const pickRange = (dates: [Date | null, Date | null]) => {
    setError("");
    setCheckIn(dates[0]);
    setCheckOut(dates[1]);
  };

  const guestLabel = `${adults} ${adults === 1 ? "adult" : "adults"}${children ? `, ${children} ${children === 1 ? "child" : "children"}` : ""}`;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkIn) return setError("Choose a check-in date.");
    if (!checkOut) return setError("Choose a check-out date.");
    if (checkOut <= checkIn) return setError("Check-out must be after check-in.");
    const data: BookingPrefill = { checkIn: toLocalISODate(checkIn), checkOut: toLocalISODate(checkOut), adults, children };
    if (onSearch) {
      onSearch({ checkin: data.checkIn, checkout: data.checkOut, adults, children });
      return;
    }
    openEnquiry(data);
  };

  const picker = {
    portalId: "mr-datepicker-portal",
    dateFormat: "EEE, d MMM",
    withPortal: narrow,
    popperPlacement: "top-start" as const,
    popperClassName: "!z-[80]",
    calendarClassName: "mr-calendar",
    monthsShown: narrow ? 1 : 2,
    showPopperArrow: false,
  };

  if (variant === "room") {
    const shownDate = (date: Date | null) => date?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) ?? "";
    return <form onSubmit={submit} noValidate className={`room-booking ${className}`} aria-label="Check availability">
      <div className="room-booking-dates">
        <DatePicker {...picker} id={`${ids}-checkin`} selected={checkIn} startDate={checkIn} endDate={checkOut} selectsStart
          onChange={(date: Date | null) => { setCheckIn(date); if (date && checkOut && checkOut <= date) setCheckOut(null); setError(""); }}
          minDate={today} customInput={<DateTrigger fieldLabel="Check-in" shown={shownDate(checkIn)} emptyText="Add date" />} />
        <DatePicker {...picker} id={`${ids}-checkout`} selected={checkOut} startDate={checkIn} endDate={checkOut} selectsEnd
          onChange={(date: Date | null) => { setCheckOut(date); setError(""); }}
          minDate={addDays(checkIn ?? today, 1)} customInput={<DateTrigger fieldLabel="Check-out" shown={shownDate(checkOut)} emptyText="Add date" />} />
      </div>
      <label className="room-booking-guests" htmlFor={`${ids}-room-guests`}>
        <span>Guests</span>
        <select id={`${ids}-room-guests`} aria-label="Guests" value={`${adults}-${children}`} onChange={(event) => {
          const [adultCount, childCount] = event.target.value.split("-").map(Number); setAdults(adultCount); setChildren(childCount);
        }}>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => <option key={count} value={`${count}-0`}>{count} {count === 1 ? "Adult" : "Adults"}</option>)}
          <option value="2-1">2 Adults, 1 Child</option><option value="2-2">2 Adults, 2 Children</option>
        </select>
      </label>
      <button type="submit" className="room-booking-submit">Check availability</button>
      <p aria-live="polite" className={error ? "room-booking-error" : "sr-only"}>{error}</p>
    </form>;
  }

  return (
    <form onSubmit={submit} noValidate className={`min-w-0 w-full ${className}`} aria-label="Check availability">
      <div
        className={`mr-booking-bar grid border border-white/25 bg-black/25 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md ${
          gridView ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)_auto]"
        }`}
      >
        {/* Name */}
        <div className={`min-w-0 border-b border-white/20 ${gridView ? "" : "lg:border-b-0 lg:border-r"}`}>
          <label htmlFor={`${ids}-name`} className="mr-bf-field flex flex-col">
            <span className="mr-bf-label">Name</span>
            <input
              id={`${ids}-name`}
              type="text"
              name="heroName"
              placeholder="Your name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mr-bf-value w-full bg-transparent text-white outline-none placeholder:text-white/60"
            />
          </label>
        </div>

        {/* Combined Check-in & Check-out — single range field */}
        <div className={`min-w-0 border-b border-white/20 ${gridView ? "" : "lg:border-b-0 lg:border-r"}`}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <DatePicker
            {...picker}
            selectsRange={true as any}
            startDate={checkIn}
            endDate={checkOut}
            onChange={(dates: unknown) => pickRange(dates as [Date | null, Date | null])}
            minDate={today}
            id={`${ids}-dates`}
            customInput={
              <DateTrigger
                fieldLabel="Check-in & out"
                shown={
                  checkIn && checkOut
                    ? `${formatShort(checkIn)} – ${formatShort(checkOut)}`
                    : checkIn
                    ? formatShort(checkIn)
                    : ""
                }
                emptyText="Add dates"
                hint={nights ? `${nights} ${nights === 1 ? "night" : "nights"}` : undefined}
              />
            }
          />
        </div>

        {/* Guests */}
        <div ref={guestRef} className={`relative min-w-0 border-b border-white/20 ${gridView ? "" : "lg:border-b-0 lg:border-r"}`}>
          <button
            type="button"
            onClick={() => setGuestOpen((v) => !v)}
            aria-expanded={guestOpen}
            aria-controls={`${ids}-guests`}
            className="mr-bf-field w-full text-left"
          >
            <div className="flex items-center justify-between gap-3">
              <span>
                <span className="mr-bf-label">Guests</span>
                <span className="mr-bf-value">{guestLabel}</span>
              </span>
              <IoIosArrowDown aria-hidden="true" className={`h-3 w-3 shrink-0 text-white/80 transition-transform ${guestOpen ? "rotate-180" : ""}`} />
            </div>
          </button>
          {guestOpen && (
            <div
              id={`${ids}-guests`}
              className="absolute bottom-full left-0 z-[80] mb-2 w-full border border-white/20 bg-[#1c130d]/95 p-4 text-white shadow-2xl backdrop-blur-lg lg:min-w-[280px] lg:p-5"
            >
              <Counter label="Adults" sub="13 years and over" value={adults} min={1} max={12} onChange={setAdults} />
              <div className="my-4 h-px bg-white/10" />
              <Counter label="Children" sub="Up to 12 years" value={children} min={0} max={8} onChange={setChildren} />
              <button type="button" onClick={() => setGuestOpen(false)} className="t-label mt-5 w-full border border-white/30 py-2.5 text-white hover:bg-white hover:text-ink">
                Done
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="t-label flex min-h-13 items-center justify-center bg-stone px-5 py-4 text-ink transition-colors duration-300 hover:bg-white lg:px-7"
        >
          Check availability
        </button>
      </div>

      <p aria-live="polite" className={`mt-2 min-h-5 text-[0.8rem] text-[#ffd9c7] ${error ? "" : "sr-only"}`}>
        {error}
      </p>
    </form>
  );
}

function Counter({
  label, sub, value, min, max, onChange,
}: {
  label: string; sub: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[11px] text-white/55">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 hover:bg-white/10 disabled:opacity-35"
        >−</button>
        <span className="w-5 text-center text-sm tabular-nums" aria-live="polite">{value}</span>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 hover:bg-white/10 disabled:opacity-35"
        >+</button>
      </div>
    </div>
  );
}
