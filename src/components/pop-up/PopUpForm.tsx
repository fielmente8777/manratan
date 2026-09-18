"use client";
import React from "react";
import { MdClose } from "react-icons/md";
import { useWebContext } from "@/context-api/WebContext";
import Form2 from "../forms/Form2";

interface PopUpFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  formDomain?: string;
  formHid?: string;
}

const PopUpForm: React.FC<PopUpFormProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  formDomain,
  formHid,
}) => {
  const { isOpenPopUpForm, setIsOpenPopUpForm } = useWebContext();

  const isVisible = propIsOpen !== undefined ? propIsOpen : isOpenPopUpForm;
  const handleClose = propOnClose !== undefined ? propOnClose : () => setIsOpenPopUpForm(false);

  return (
    <section
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className="max-w-[480px] w-full p-6 sm:p-7 bg-[#1C130D] text-white relative rounded-2xl shadow-2xl border border-[#BCA049]/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-2xl text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close form"
        >
          <MdClose />
        </button>

        <div className="mt-4">
          <Form2 gridView formDomain={formDomain} formHid={formHid} />
        </div>
      </div>
    </section>
  );
};

export default PopUpForm;
