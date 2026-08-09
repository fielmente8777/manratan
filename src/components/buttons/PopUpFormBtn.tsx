"use client";
import { useWebContext } from "@/context-api/WebContext";

const PopUpFormBtn = ({ cta, className }: { cta: string , className?: string}) => {
  const { setIsOpenPopUpForm } = useWebContext();
  return (
    <button
      onClick={() => setIsOpenPopUpForm(true)}
      className={`flex text-nowrap whitespace-nowrap items-center gap-6 bg-p1 text-white rounded-sm w-fit px-4 py-2 font-semibold hover:scale-95 transition-all duration-300 ease-in-out hover:scale-x-105 active:scale-95 ${className}`}
    >
      {cta}
    </button>
  );
};

export default PopUpFormBtn;

export const ArrowIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3L14 8M14 8L9 13M14 8H2"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
