"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export interface BookingFormData {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  checkIn?: string;
  checkOut?: string;
  message?: string;
  city?: string;
  [key: string]: string | undefined;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  city?: string;
  guests?: string;
  [key: string]: string | undefined;
}

export interface UseBookingFormProps {
  includeCheckIn?: boolean;
  includeCheckOut?: boolean;
  includeMessage?: boolean;
  includeGuests?: boolean;
  formDomain?: string;
  formHid?: string;
  onSubmitSuccess?: () => void;
}

const initialFormData: BookingFormData = {
  name: "",
  countryCode: "+91",
  phone: "",
  email: "",
  checkIn: "",
  checkOut: "",
  message: "",
  city: "",
  guests: "1",
};

export const useBookingForm = ({
  includeCheckIn = true,
  includeCheckOut = true,
  includeMessage,
  includeGuests,
  formDomain = "manratanresort.com",
  formHid = "",
  onSubmitSuccess,
}: UseBookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const debouncedEmail = useDebounce(formData.email, 500);
  const debouncedPhone = useDebounce(formData.phone, 500);
  const debouncedName = useDebounce(formData.name, 500);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string): boolean => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  };

  useEffect(() => {
    if (debouncedEmail && !validateEmail(debouncedEmail)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else if (debouncedEmail && validateEmail(debouncedEmail)) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (debouncedPhone && !validatePhone(debouncedPhone)) {
      setErrors((prev) => ({ ...prev, phone: "Phone must be 10-15 digits" }));
    } else if (debouncedPhone && validatePhone(debouncedPhone)) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  }, [debouncedPhone]);

  useEffect(() => {
    if (debouncedName && !debouncedName.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name cannot be empty" }));
    } else if (debouncedName && debouncedName.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  }, [debouncedName]);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty";
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone must be 10-15 digits";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (includeCheckIn && !formData.checkIn) {
      newErrors.checkIn = "Check-in date is required";
      isValid = false;
    }

    if (includeCheckOut && !formData.checkOut) {
      newErrors.checkOut = "Check-out date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, includeCheckIn, includeCheckOut]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const setFieldValue = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const descriptionPart: string[] = [];
      if (includeCheckIn) descriptionPart.push(`Check-in: ${formData.checkIn}`);
      if (includeCheckOut) descriptionPart.push(`Check-out: ${formData.checkOut}`);
      if (includeMessage) descriptionPart.push(`Message: ${formData.message}`);
      if (formData.city) descriptionPart.push(`City: ${formData.city}`);

      const description = descriptionPart.join("\n");

      const { data } = await axios.post(
        "https://nexon.eazotel.com/eazotel/addcontacts",
        {
          Domain: formDomain,
          Name: formData.name,
          email: formData.email,
          Contact: formData.countryCode + formData.phone,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          Description: description,
          created_from: "webform",
          source_url: typeof window !== "undefined" ? window.location.href : "",
          hId: formHid,
        }
      );

      if (data.Status) {
        setSubmitSuccess(true);
        resetForm();
        if (onSubmitSuccess) onSubmitSuccess();
        setTimeout(() => setSubmitSuccess(false), 3000);
        window.open("/thank-you/", "_blank");
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
  };
};

export default useBookingForm;
