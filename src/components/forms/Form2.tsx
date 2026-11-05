"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import { countries } from "@/utils/constent";
import useBookingForm from "@/hooks/useBookingForm";
import { useWebContext } from "@/context-api/WebContext";
import { addDays, fromLocalISODate, startOfToday, toLocalISODate } from "@/utils/dates";
import { BookingCalenderIcon, CalendarIcon, CallIcon, MailIcon, UserIcon } from "@/utils/formIcons";

interface Props {
  gridView?: boolean;
  formDomain?: string;
  formHid?: string;
  className?: string;
}

const box = "bg-white border border-[#E5E0D8] flex items-center gap-2.5 rounded-[3px] h-[44px] px-3 shadow-sm";
const text =
  "w-full bg-transparent outline-none text-[14px] font-montserrat font-normal not-italic leading-none tracking-[0.03em] text-[#221811] placeholder:text-[#5E534A]/80 placeholder:font-montserrat placeholder:font-normal placeholder:text-[14px] placeholder:tracking-[0.03em]";

const Form2: React.FC<Props> = ({ gridView = false, formDomain = "manratanresort.com", formHid, className = "" }) => {
  const { bookingPrefill } = useWebContext();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [narrow, setNarrow] = useState(false);

  const { isSubmitting, errors, handleSubmit, formData, handleChange, setFieldValue } = useBookingForm({
    includeCheckIn: true,
    includeCheckOut: true,
    formDomain,
    formHid,
    onSubmitSuccess: () => {
      setCheckIn(null);
      setCheckOut(null);
    },
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Dates and guests chosen in the hero booking bar arrive here.
  useEffect(() => {
    if (!bookingPrefill) return;
    const inD = fromLocalISODate(bookingPrefill.checkIn);
    const outD = fromLocalISODate(bookingPrefill.checkOut);
    // Copying values handed over from the hero booking bar (shared context), once per hand-over.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckIn(inD);
    setCheckOut(outD);
    setFieldValue("checkIn", bookingPrefill.checkIn);
    setFieldValue("checkOut", bookingPrefill.checkOut);
    const { adults, children } = bookingPrefill;
    setFieldValue(
      "guests",
      `${adults} adult${adults === 1 ? "" : "s"}${children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingPrefill]);

  const today = startOfToday();

  const pickIn = (d: Date | null) => {
    setCheckIn(d);
    setFieldValue("checkIn", d ? toLocalISODate(d) : "");
    if (d && checkOut && checkOut <= d) {
      setCheckOut(null);
      setFieldValue("checkOut", "");
    }
  };
  const pickOut = (d: Date | null) => {
    setCheckOut(d);
    setFieldValue("checkOut", d ? toLocalISODate(d) : "");
  };

  const picker = {
    portalId: "mr-datepicker-portal",
    dateFormat: "d MMM yyyy",
    withPortal: narrow,
    calendarClassName: "mr-calendar",
    popperClassName: "!z-[99999]",
    className: `${text} cursor-pointer`,
    wrapperClassName: "w-full h-full !flex items-center",
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      // Keep the phone keyboard down; the calendar is the input.
      if (narrow) e.target.blur();
    },
  };

  const fields = [
    { name: "name", label: "Full name", type: "text", value: formData.name, icon: <UserIcon />, autoComplete: "name" },
    { name: "phone", label: "Phone number", type: "tel", value: formData.phone, icon: <CallIcon />, autoComplete: "tel-national" },
    { name: "email", label: "Email", type: "email", value: formData.email, icon: <MailIcon />, autoComplete: "email" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${
        gridView ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-center gap-3 w-full max-w-[1320px] mx-auto"
      } ${className}`}
    >
      {gridView && (
        <div className="mb-1">
          <p className="font-montserrat text-[11px] uppercase tracking-[0.22em] text-[#BCA049]">Reservations</p>
          <p className="mt-1 text-[1.35rem] leading-snug text-white" style={{ fontFamily: "var(--font-display)" }}>
            Check availability
          </p>
          <p className="mt-1 text-[13px] text-white/70">Our reservations team will confirm rates and availability for your dates.</p>
        </div>
      )}

      {fields.map((f) => (
        <div key={f.name} className="relative flex w-full flex-col">
          <div className={box}>
            <label htmlFor={`f2-${f.name}`} className="shrink-0 text-[#221811]">
              <span className="sr-only">{f.label}</span>
              {f.icon}
            </label>
            {f.type === "tel" && (
              <div className="relative shrink-0">
                <select
                  className="appearance-none bg-transparent ps-1 pe-4 text-[14px] text-[#221811] focus:outline-none"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => setFieldValue("countryCode", e.target.value)}
                  style={{ width: `${(formData.countryCode?.length || 3) * 2}ch` }}
                  aria-label="Country code"
                >
                  {countries.map((c, i) => (
                    <option key={i} value={c.code} className="bg-white text-[#221811]">
                      {c.code}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs text-[#5E534A]">
                  <IoIosArrowDown />
                </span>
              </div>
            )}
            <input
              id={`f2-${f.name}`}
              type={f.type}
              name={f.name}
              placeholder={f.label}
              autoComplete={f.autoComplete}
              inputMode={f.type === "tel" ? "numeric" : undefined}
              className={text}
              value={f.value}
              onChange={handleChange}
            />
          </div>
          {errors[f.name] && <span className="absolute -bottom-4 left-1 font-montserrat text-[11px] text-red-300">{errors[f.name]}</span>}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <div className={box}>
            <span className="shrink-0 text-[#221811]">
              <CalendarIcon />
            </span>
            <DatePicker
              {...picker}
              selected={checkIn}
              onChange={pickIn}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={today}
              placeholderText="Check-in"
              ariaLabelledBy="f2-checkin-label"
            />
          </div>
          <span id="f2-checkin-label" className="sr-only">Check-in date</span>
          {errors.checkIn && <span className="absolute -bottom-4 left-1 font-montserrat text-[11px] text-red-300">{errors.checkIn}</span>}
        </div>
        <div className="relative">
          <div className={box}>
            <span className="shrink-0 text-[#221811]">
              <CalendarIcon />
            </span>
            <DatePicker
              {...picker}
              selected={checkOut}
              onChange={pickOut}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
              placeholderText="Check-out"
              ariaLabelledBy="f2-checkout-label"
            />
          </div>
          <span id="f2-checkout-label" className="sr-only">Check-out date</span>
          {errors.checkOut && <span className="absolute -bottom-4 left-1 font-montserrat text-[11px] text-red-300">{errors.checkOut}</span>}
        </div>
      </div>

      {formData.guests && <p className="font-montserrat text-[12px] text-white/70">Guests: {formData.guests}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-[3px] border border-[#BCA049] bg-[#5C4E3E] px-4 font-montserrat text-[14px] uppercase leading-none tracking-[0.06em] text-white shadow-sm transition-all duration-200 hover:bg-[#6D5D4B] disabled:opacity-60"
      >
        {isSubmitting ? (
          "Sending…"
        ) : (
          <>
            <BookingCalenderIcon />
            <span>Send enquiry</span>
          </>
        )}
      </button>
    </form>
  );
};

export default Form2;
