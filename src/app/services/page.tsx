"use client";

import Image from "next/image";
import { useState } from "react";
import FormModal from "@/components/forms/FormModal"; 

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("");

const openModal = (formType: string) => {
  setActiveForm(formType);
  setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveForm("");
  };

  return (
    <div className="relative mt-20">
      {/* Background Image */}
      <div className="relative w-full h-[433px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src="/services.svg"
          alt="Background"
          width={1920}
          height={1080}
          priority
        />
        {/* Page title */}
        <div className="absolute inset-0 flex items-center px-6 xl:px-[130px]">
          <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px] text-[#002A40]">
            Services
          </h1>
        </div>
      </div>

      {/* Page content */}
      <div className="px-6 xl:px-[130px] py-12">
        <div className=" grid grid-cols-1 md:grid-cols-3 justify-between w-full gap-4 md:gap-8 lg:gap-12 mt-8">
          {[
            {
              name: "Medical Crowdfunding",
              need: "Raise funds for urgent medical treatments through our secure crowdfunding platform.",
              image: "/ri_funds-fill.svg",
              button: "Start Fundraiser",
              formType: "fundraiser",
            },
            {
              name: "Trusted Healthcare Network",
              need: "Get connected with verified doctors, hospitals, and pharmacies to receive quality treatment.",
              image: "/ri_funds-fill.svg",
              button: "View Partners",
              formType: "partners",
            },
            {
              name: "Secure & Transparent Donations",
              need: "Support patients in need with confidence—every campaign is verified before going live.",
              image: "/ri_funds-fill.svg",
              button: "Donate",
              formType: "donate",
            },
            {
              name: "Medical Report Verification",
              need: "Easily verify the authenticity of a medical report before contributing.",
              image: "/ri_funds-fill.svg",
              button: "Verify Now",
              formType: "verify",
            },
            {
              name: "Top-Up Wallet for Medical Expenses",
              need: "Fund your Prescribeng account to make quick donations or pay for medical services.",
              image: "/ri_funds-fill.svg",
              button: "Top Up Wallet",
              formType: "topup",
            },
            {
              name: "Healthcare Partnership & Training",
              need: "Doctors, pharmacies, and hospitals can join our platform to offer services or access professional training programs.",
              image: "/ri_funds-fill.svg",
              button: "Become Partner",
              formType: "partnership",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group w-full md:w-[350px] bg-white rounded-[5px] p-5 space-y-4 hover:bg-[#0077B6] hover:text-white hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className=" w-[86px] h-[77px] p-4 space-y-4 bg-[#D9EBF4] rounded-[20px] flex items-center justify-center">
                <Image
                  className="w-[50px] h-[50px] object-cover rounded-t-[5px]"
                  src={card.image}
                  alt={`Image of ${card.name}`}
                  width={50}
                  height={50}
                />
              </div>
              <div className="space-y-2">
                <p className="font-montserrat text-[16px] font-bold">
                  {card.name}
                </p>
                <p className="text-[16px] w-full md:w-[304px]">{card.need}</p>
              </div>

              <button 
                className="flex border border-[#0077B6] group-hover:border-white group-hover:text-white py-2 px-4 rounded-[10px] text-[#0077B6] text-[16px]"
                onClick={() => openModal(card.formType)}
              >
                {card.button}
                <Image
                  className="w-[24px] h-[24px] ml-2 group-hover:filter group-hover:brightness-0 group-hover:invert"
                  src="/arrow-up-right.svg"
                  alt="Arrow"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#FFF1E8] px-6 xl:px-[130px] py-12 space-y-4">
          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
              Have any questions?
            </h1>
            <p className="text-[16px]">
              Don&apos;t hesitate to reach out to us
            </p>
          </div>
          <div className="flex justify-center">
            <button 
              className="bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]"
              onClick={() => openModal("contact")}
            >
              Contact Us
            </button>
            </div>
      </div>
      {isModalOpen && (
        <FormModal 
          formType={activeForm} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Services;