"use client";

import { useEffect, MouseEvent, KeyboardEvent } from "react";
import FundraiserForm from "./FundraiserForm";
import PartnersForm from "./PartnersForm";
import DonateForm from "./DonateForm";
import VerifyForm from "./VerifyForm";
import TopUpForm from "./TopUpForm";
import ContactForm from "./ContactForm";

type FormModalProps = {
  formType: string;
  onClose: () => void;
};

// type FormData = Record<string, string | number | boolean | undefined>;
type FormSubmissionData = Record<string, string | number | boolean | File | null | undefined>;



const FormModal = ({ formType, onClose }: FormModalProps) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent<Document>) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.addEventListener(
        "keydown",
        handleEscKey as unknown as EventListener
      );
      document.removeEventListener(
        "keydown",
        handleEscKey as unknown as EventListener
      );
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

const getFormTitle = () => {
  switch (formType) {
    case "fundraiser":
      return {
        title: "Start a Fundraiser",
        description:
          "Fill out the form below to create a verified medical crowdfunding campaign. Our team will review your request before publishing it.",
      };
    case "partners":
      return {
        title: "View Healthcare Partners",
        description: "Connect with our healthcare partners.",
      };
    case "donate":
      return {
        title: "Make a Donation",
        description: "Support a cause by making a donation.",
      };
    case "verify":
      return {
        title: "Verify Medical Report",
        description: "Verify the authenticity of a medical report.",
      };
    case "topup":
      return {
        title: "Top Up Your Wallet",
        description: "Add funds to your account wallet.",
      };
    case "partnership":
      return {
        title: "Become a Partner",
        description: "Join our network of partners.",
      };
    case "contact":
      return {
        title: "Contact Us",
        description: "Get in touch with our team.",
      };
    default:
      return {
        title: formType.charAt(0).toUpperCase() + formType.slice(1) + " Form",
        description: "Please fill out the form below.",
      };
  }
};

  // Render the appropriate form based on formType
  const renderForm = () => {
    switch (formType) {
      case "fundraiser":
        return <FundraiserForm onSubmit={handleSubmit} />;
      case "partners":
        return <PartnersForm onSubmit={handleSubmit} />;
      case "donate":
        return <DonateForm onSubmit={handleSubmit} />;
      case "verify":
        return <VerifyForm onSubmit={handleSubmit} />;
      case "topup":
        return <TopUpForm onSubmit={handleSubmit} />;
      case "contact":
        return <ContactForm onSubmit={handleSubmit} />;
      default:
        return <div>Form not found</div>;
    }
  };

  const handleSubmit = (data: FormSubmissionData) => {
    console.log("Form submitted:", data);

    onClose();
  };

  // Stop propagation on modal content click to prevent closing
  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 py-16 flex items-center justify-center">
      {/* Overlay with blur effect */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[4px]"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        // className="relative bg-white rounded-lg w-full max-w-xl p-6 shadow-xl"
        className="relative bg-white rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col p-9 shadow-xl"
        onClick={handleContentClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#002A40]">
            {getFormTitle().title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-9">{getFormTitle().description}</p>

        <div className="max-h-[90vh] overflow-y-auto pr-2">{renderForm()}</div>
      </div>
    </div>
  );
};

export default FormModal;
