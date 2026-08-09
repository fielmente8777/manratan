"use client";

import { getDateInputLimits } from "@/hooks/getDateInputLimits";
import useBookingForm from "@/hooks/useBookingForm";
import { BookingCalenderIcon, UserIcon } from "@/utils/formIcons";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoPeople } from "react-icons/io5";

interface Props {
  gridView?: boolean;
}

const Form1 = ({ gridView }: Props) => {
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

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);

    if (start) {
      setFieldValue("checkIn", start.toISOString().split("T")[0]);
    }

    if (end) {
      setFieldValue("checkOut", end.toISOString().split("T")[0]);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      value: formData.name,
      onChange: handleChange,
      icon: <UserIcon />,
    },

    {
      name: "guests",
      label: "Select Guests",
      type: "select",
      value: formData.guests || "",
      onChange: handleChange,
      icon: <IoPeople size={16} />,
      options: [
        { label: "1 Guest", value: "1" },
        { label: "2 Guests", value: "2" },
        { label: "3 Guests", value: "3" },
        { label: "4 Guests", value: "4" },
        { label: "5 Guests", value: "5" },
        { label: "6 Guests", value: "6" },
      ],
    },

    {
      name: "checkIn",
      label: "Select Dates",
      type: "date",
      value: formData.checkIn || "",
      onChange: handleChange,
      icon: <BookingCalenderIcon />,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        ${gridView ? "flex flex-col" : "grid grid-cols-[1fr_1fr_1fr_0.75fr] w-fit"}
        mx-auto
    
    bg-black/40
    border
    border-white/30
    border-r-white
    font-body
      `}
    >
      {formFields.map((field, index) => (
        <React.Fragment key={field.name}>
          {field.type === "date" ? (
            /* ================= DATE ================= */
            <div
              className={`
                relative
                flex
                items-center
                gap-2
                text-white
                ${
                  gridView
                    ? "px-3 py-2 border-b border-white/60"
                    : "px-3 py-2 border-r border-white/60"
                }
              `}
            >
              <span className="shrink-0">{field.icon}</span>

              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={`${field.label}`}
                calendarClassName="!z-[99999]"
                popperClassName="!z-[99999]"
                className="
                  pointer-events-auto
                  outline-none
                  w-full
                  bg-transparent
                  text-sm
                  text-white
                  placeholder:text-white
                  placeholder:opacity-100
                "
                wrapperClassName="w-full"
              />

              {errors[field.name] && (
                <p className="absolute top-full left-0 text-red-500 text-xs">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ) : field.type === "select" ? (
            /* ================= GUESTS ================= */
            <div
              className={`
                relative
                flex
                items-center
                gap-2
                text-white
                ${
                  gridView
                    ? "px-3 py-2 border-b border-white/60"
                    : "px-3 py-2 border-r border-white/60"
                }
              `}
            >
              <span className="shrink-0">{field.icon}</span>

              <select
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                className="
                  appearance-none
                  outline-none
                  border-none
                  bg-transparent
                  w-full
                  text-sm
                  text-white
                  cursor-pointer
                "
              >
                <option value="" disabled className="text-black">
                  {field.label}
                </option>

                {field.options?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <IoIosArrowDown
                size={10}
                className="absolute right-2 pointer-events-none"
              />

              {errors[field.name] && (
                <p className="absolute top-full left-0 text-red-500 text-xs">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ) : (
            /* ================= TEXT ================= */
            <div
              className={`
                relative
                flex
                items-center
                gap-2
                text-white
                ${
                  gridView
                    ? "px-3 py-2 border-b border-white/60"
                    : "px-3 py-2 border-r border-white/60"
                }
              `}
            >
              <span className="shrink-0">{field.icon}</span>

              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  border-none
                  text-sm
                  text-white
                  placeholder:text-white
                  placeholder:opacity-100
                "
                value={field.value}
                onChange={field.onChange}
              />

              {errors[field.name] && (
                <p className="absolute top-full left-0 text-red-500 text-xs">
                  {errors[field.name]}
                </p>
              )}
            </div>
          )}
        </React.Fragment>
      ))}

      {/* ================= FIND A ROOM ================= */}
      <button
        type="submit"
        className="
          bg-white
          text-primary
          px-5
          py-2
          text-sm
          whitespace-nowrap
          font-medium
          flex
          items-center
          justify-center
        "
      >
        {isSubmitting ? "Submitting..." : "FIND A ROOM"}
      </button>
    </form>
  );
};

export default Form1;
