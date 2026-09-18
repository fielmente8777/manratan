"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import { countries } from "@/utils/constent";
import useBookingForm from "@/hooks/useBookingForm";
import { getDateInputLimits } from "@/hooks/getDateInputLimits";
import {
  BookingCalenderIcon,
  CalendarIcon,
  CallIcon,
  MailIcon,
  UserIcon,
} from "@/utils/formIcons";

interface Props {
  gridView?: boolean;
  formDomain?: string;
  formHid?: string;
  className?: string;
}

const Form2: React.FC<Props> = ({
  gridView = false,
  formDomain = "manratanresort.com",
  formHid,
  className = "",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {
    isSubmitting,
    errors,
    handleSubmit,
    formData,
    handleChange,
    setFieldValue,
  } = useBookingForm({
    includeCheckIn: true,
    includeCheckOut: true,
    formDomain,
    formHid,
    onSubmitSuccess: () => {
      setStartDate(null);
      setEndDate(null);
    },
  });

  const { min, max } = getDateInputLimits({
    showPast: false,
    showFuture: true,
  });

  const minDate = min ? new Date(min) : undefined;
  const maxDate = max ? new Date(max) : undefined;

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start) setFieldValue("checkIn", start.toISOString().split("T")[0]);
    if (end) setFieldValue("checkOut", end.toISOString().split("T")[0]);
  };

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
      icon: <UserIcon />,
    },
    {
      name: "phone",
      label: "Ph Number",
      type: "tel",
      value: formData.phone,
      onChange: handleChange,
      icon: <CallIcon />,
    },
    {
      name: "email",
      label: "Email ID",
      type: "email",
      value: formData.email,
      onChange: handleChange,
      icon: <MailIcon />,
    },
    {
      name: "checkIn",
      label: "Check-in & out",
      type: "date",
      value: formData.checkIn || "",
      onChange: handleChange,
      icon: <CalendarIcon />,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        gridView
          ? "flex flex-col gap-3"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-center gap-3 w-full max-w-[1320px] mx-auto"
      } ${className}`}
    >
      {formFields.map((field, index) => (
        <div key={index} className="flex flex-col w-full relative">
          {field.type === "date" ? (
            <div
              className={`bg-white border border-[#E5E0D8] flex items-center gap-2.5 rounded-[3px] h-[44px] px-3 shadow-sm`}
            >
              <label className="text-[#221811] shrink-0">
                {field.icon}
              </label>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={field.label}
                calendarClassName="!z-[99999]"
                popperClassName="!z-[99999]"
                className="w-full h-full bg-transparent outline-none text-[14px] font-montserrat font-normal not-italic leading-none tracking-[0.03em] text-[#221811] placeholder:text-[#5E534A]/80 placeholder:font-montserrat placeholder:font-normal placeholder:text-[14px] placeholder:tracking-[0.03em] cursor-pointer"
                wrapperClassName="w-full h-full !flex items-center"
              />
            </div>
          ) : field.type === "tel" ? (
            <div
              className={`bg-white border border-[#E5E0D8] flex items-center gap-2 rounded-[3px] h-[44px] px-3 shadow-sm`}
            >
              <label className="text-[#221811] shrink-0">
                {field.icon}
              </label>
              <div className="relative shrink-0">
                <select
                  className="ps-1 pe-4 cursor-pointer appearance-none bg-transparent text-[14px] font-montserrat font-normal not-italic leading-none tracking-[0.03em] text-[#221811] focus:outline-none"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => setFieldValue("countryCode", e.target.value)}
                  style={{ width: `${(formData.countryCode?.length || 3) * 2}ch` }}
                  aria-label="Country Code"
                >
                  {countries.map((country, idx) => (
                    <option
                      key={idx}
                      value={country.code}
                      className="text-[#221811] bg-white font-montserrat"
                    >
                      {country.code}
                    </option>
                  ))}
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#5E534A] text-xs">
                  <IoIosArrowDown />
                </span>
              </div>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                className="w-full bg-transparent outline-none text-[14px] font-montserrat font-normal not-italic leading-none tracking-[0.03em] text-[#221811] placeholder:text-[#5E534A]/80 placeholder:font-montserrat placeholder:font-normal placeholder:text-[14px] placeholder:tracking-[0.03em]"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ) : (
            <div
              className={`bg-white border border-[#E5E0D8] flex items-center gap-2.5 rounded-[3px] h-[44px] px-3 shadow-sm`}
            >
              <label className="text-[#221811] shrink-0">
                {field.icon}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                className="w-full bg-transparent outline-none text-[14px] font-montserrat font-normal not-italic leading-none tracking-[0.03em] text-[#221811] placeholder:text-[#5E534A]/80 placeholder:font-montserrat placeholder:font-normal placeholder:text-[14px] placeholder:tracking-[0.03em]"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
          {errors[field.name] && (
            <span className="text-red-400 text-[11px] absolute -bottom-4 left-1 font-montserrat">
              {errors[field.name]}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-[44px] px-4 rounded-[3px] bg-[#5C4E3E] hover:bg-[#6D5D4B] border border-[#BCA049] text-white font-montserrat font-normal not-italic text-[14px] leading-none tracking-[0.03em] uppercase transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <BookingCalenderIcon />
            <span>BOOK NOW</span>
          </>
        )}
      </button>
    </form>
  );
};

export default Form2;
