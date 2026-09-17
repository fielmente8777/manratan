"use client";
import React from "react";
import { MdClose } from "react-icons/md";
import Form2 from "../forms/Form2";

interface PopUpFormProps {
  isOpen: boolean;
  onClose: () => void;
  formDomain?: string;
  formHid?: string;
}

const PopUpForm: React.FC<PopUpFormProps> = ({
  isOpen,
  onClose,
  formDomain,
  formHid,
}) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      <div className="max-w-md w-full p-6 bg-[#221811] text-white relative rounded-xl shadow-2xl border border-[#BCA049]/40">
        <button
          onClick={onClose}
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
