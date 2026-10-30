"use client";

import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import useBookingForm from "@/hooks/useBookingForm";

// --- Clean SVG Icons matching Screenshot 3 ---
const FillUserIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-white"
  >
    <path
      d="M7.99992 6.66665C9.47268 6.66665 10.6666 5.47274 10.6666 3.99998C10.6666 2.52722 9.47268 1.33331 7.99992 1.33331C6.52716 1.33331 5.33325 2.52722 5.33325 3.99998C5.33325 5.47274 6.52716 6.66665 7.99992 6.66665Z"
      fill="currentColor"
    />
    <path
      d="M13.3334 11.6667C13.3334 13.3234 13.3334 14.6667 8.00008 14.6667C2.66675 14.6667 2.66675 13.3234 2.66675 11.6667C2.66675 10.01 5.05475 8.66669 8.00008 8.66669C10.9454 8.66669 13.3334 10.01 13.3334 11.6667Z"
      fill="currentColor"
    />
  </svg>
);

const FillCalenderIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-white"
  >
    <path
      d="M1.33325 12.6666C1.33325 13.8 2.19992 14.6666 3.33325 14.6666H12.6666C13.7999 14.6666 14.6666 13.8 14.6666 12.6666V7.33331H1.33325V12.6666ZM12.6666 2.66665H11.3333V1.99998C11.3333 1.59998 11.0666 1.33331 10.6666 1.33331C10.2666 1.33331 9.99992 1.59998 9.99992 1.99998V2.66665H5.99992V1.99998C5.99992 1.59998 5.73325 1.33331 5.33325 1.33331C4.93325 1.33331 4.66658 1.59998 4.66658 1.99998V2.66665H3.33325C2.19992 2.66665 1.33325 3.53331 1.33325 4.66665V5.99998H14.6666V4.66665C14.6666 3.53331 13.7999 2.66665 12.6666 2.66665Z"
      fill="currentColor"
    />
  </svg>
);

export interface BookingFormProps {
  gridView?: boolean;
  className?: string;
  onSearch?: (data: {
    name: string;
    checkin: string;
    checkout: string;
    adults: number;
    children: number;
  }) => void;
}

export default function BookingForm({
  gridView = false,
  className = "",
  onSearch,
}: BookingFormProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const guestRef = useRef<HTMLDivElement>(null);

  // Hook for original form validation & submission exactly as before
  const {
    isSubmitting,
    errors,
    handleSubmit,
    formData,
    handleChange,
    setFieldValue,
  } = useBookingForm({
    includeGuests: true,
    includeCheckIn: true,
    includeCheckOut: true,
    includePhone: false,
    includeEmail: false,
    onSubmitSuccess: () => {
      setStartDate(null);
      setEndDate(null);
    },
  });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setGuestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const guestLabel =
    children > 0
      ? `${adults} Adult${adults !== 1 ? "s" : ""}, ${children} Child${children !== 1 ? "ren" : ""}`
      : `${adults} ${adults === 1 ? "Adult" : "Adults"}`;

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start) {
      setFieldValue("checkIn", start.toISOString().split("T")[0]);
    } else {
      setFieldValue("checkIn", "");
    }

    if (end) {
      setFieldValue("checkOut", end.toISOString().split("T")[0]);
    } else {
      setFieldValue("checkOut", "");
    }
  };

  const handleAdultsChange = (val: number) => {
    setAdults(val);
    const label = `${val} Adults${children > 0 ? `, ${children} Children` : ""}`;
    setFieldValue("guests", label);
  };

  const handleChildrenChange = (val: number) => {
    setChildren(val);
    const label = `${adults} Adults${val > 0 ? `, ${val} Children` : ""}`;
    setFieldValue("guests", label);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (onSearch) {
      e.preventDefault();
      onSearch({
        name: formData.name,
        checkin: formData.checkIn || "",
        checkout: formData.checkOut || "",
        adults,
        children,
      });
      return;
    }
    handleSubmit(e);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className={`w-full max-w-5xl mx-auto ${className}`}
    >
      {/* Search Bar Container with frosted white background matching Screenshot 3 */}
      <div
        className={`w-full bg-white/20 backdrop-blur-md border border-white/20 shadow-lg ${
          gridView
            ? "flex flex-col gap-0"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.2fr_auto] items-stretch"
        }`}
      >
        {/* 1. Name Field (Location ki jagah Your Name) */}
        <div
          className={`relative flex items-center gap-3 px-5 h-13 text-white ${
            gridView
              ? "border-b border-white/20"
              : "border-b md:border-b-0 md:border-r border-white/20"
          }`}
        >
          <FillUserIcon />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-transparent outline-none border-none text-sm text-white placeholder:text-white/80 font-normal tracking-wide"
          />

          {errors.name && (
            <p className="absolute -bottom-5 left-5 text-red-400 text-xs font-normal whitespace-nowrap pointer-events-none">
              {errors.name}
            </p>
          )}
        </div>

        {/* 2. Guests Selector with single user silhouette icon */}
        <div
          ref={guestRef}
          onClick={() => setGuestOpen((prev) => !prev)}
          className={`relative flex items-center justify-between gap-3 px-5 h-13 text-white cursor-pointer hover:bg-white/5 transition-colors select-none ${
            gridView
              ? "border-b border-white/20"
              : "border-b md:border-b-0 lg:border-r border-white/20"
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <FillUserIcon />
            <span className="text-sm font-normal text-white tracking-wide truncate">
              {guestLabel}
            </span>
          </div>

          <IoIosArrowDown
            size={12}
            className={`text-white/80 shrink-0 transition-transform duration-200 ${
              guestOpen ? "rotate-180" : ""
            }`}
          />

          {/* Guest Counter Dropdown (Opens UPWARDS above the form so it never clips) */}
          {guestOpen && (
            <div
              className="absolute left-0 bottom-full mb-2 w-64 sm:w-72 z-50 bg-[#1c130d]/95 backdrop-blur-lg text-white p-4 shadow-2xl border border-white/20 rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              <GuestRow
                label="Adults"
                subtitle="Age 13+"
                value={adults}
                min={1}
                onChange={handleAdultsChange}
              />
              <div className="border-t border-white/10 my-3" />
              <GuestRow
                label="Children"
                subtitle="Ages 0-12"
                value={children}
                min={0}
                onChange={handleChildrenChange}
              />
            </div>
          )}
        </div>

        {/* 3. Dates Field (Range Picker opening upwards into banner) */}
        <div
          className={`relative flex items-center gap-3 px-5 h-13 text-white ${
            gridView
              ? "border-b border-white/20"
              : "border-b md:border-b-0 lg:border-r border-white/20"
          }`}
        >
          <FillCalenderIcon />
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            placeholderText="Select Dates"
            dateFormat="MMM d, yyyy"
            popperPlacement="top-start"
            calendarClassName="!z-[99999]"
            popperClassName="!z-[99999]"
            className="w-full bg-transparent outline-none border-none text-sm text-white placeholder:text-white/80 font-normal tracking-wide cursor-pointer"
            wrapperClassName="w-full"
          />

          {errors.checkIn && (
            <p className="absolute -bottom-5 left-5 text-red-400 text-xs font-normal whitespace-nowrap pointer-events-none">
              {errors.checkIn}
            </p>
          )}
        </div>

        {/* 4. Action Button (Clean White button matching request) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-13 px-8 bg-white text-[#1C130D] text-[13px] font-medium tracking-widest uppercase hover:bg-white/90 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer flex items-center justify-center shadow-sm disabled:opacity-75"
        >
          {isSubmitting ? "Submitting..." : "FIND A ROOM"}
        </button>
      </div>
    </form>
  );
}

function GuestRow({
  label,
  subtitle,
  value,
  min,
  onChange,
}: {
  label: string;
  subtitle?: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">{label}</span>
        {subtitle && (
          <span className="text-[11px] text-white/50">{subtitle}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => value > min && onChange(value - 1)}
          disabled={value <= min}
          className="w-7 h-7 rounded-full border border-white/30 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center text-base leading-none text-white cursor-pointer select-none"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-semibold text-white">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-full border border-white/30 hover:bg-white/10 transition flex items-center justify-center text-base leading-none text-white cursor-pointer select-none"
        >
          +
        </button>
      </div>
    </div>
  );
}
