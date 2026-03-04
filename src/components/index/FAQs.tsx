"use client";

import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "What is Prescribe-NG?",
    answer:
      "Prescribeng is an integrated telehealthcare platform where Nigerians can access a wide range of virtual and in-person healthcare services at any time of the day.",
  },
  {
    question: "How do I get started?",
    answer:
      "Visit https://patient.prescribe.ng and Sign up as a patient and complete id verification. Once completed, you can login and book virtual or physical consultations, as well access your clinical records such as prescriptions and clinical letters.",
  },
  {
    question: "Are the Doctors real?",
    answer:
      "Yes. We maintain a verified and upto date record of all our doctors such as their licenses, as well as ensure a strict adherence to set standards, to give you the best experience.",
  },
  /*{
    question: "How do I know the campaigns are real?",
    answer:
      "Every campaign undergoes a strict verification process, requiring medical reports from recognized hospitals before approval.",
  },
  {
    question: "How can I donate?",
    answer:
      "You can donate securely using debit/credit cards, bank transfers, or mobile wallets. Simply click 'Donate Now' on any campaign.",
  },
  {
    question: "Can I donate anonymously?",
    answer: "Yes, you can choose to remain anonymous when making a donation.",
  },
  {
    question: "How do I withdraw the funds I raise?",
    answer:
      "Funds are disbursed directly to your medical provider or hospital to ensure they are used for treatment.",
  },
  {
    question: "What happens if I don’t reach my fundraising goal?",
    answer:
      "You will still receive the funds raised to help with your treatment.",
  },
  {
    question: "How do I verify a medical report?",
    answer:
      'Visit the "Verify Letter" page, enter the report code, or upload a scanned copy to check authenticity.',
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes! We prioritize security and do not share your personal data with third parties without consent.",
  },
  {
    question: "What should I do if I suspect fraud?",
    answer:
      'Report any suspicious activity immediately through our "Contact Us" page. You can find the contact us feature on the footer',
  },*/
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="overflow-hidden bg-[#FFF1E8] space-y-8 text-[16px] p-4 md:p-[130px]">
      <div className="w-full space-y-[18px] flex justify-center text-[#002A40]">
        <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px]">
          FAQs
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className="cursor-pointer flex flex-col gap-2 bg-[#FFFFFF] p-[24px] rounded-[8px] transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-semibold text-[#002A40]">{faq.question}</p>
                <Image
                  className="w-[24px] h-[24px] transition duration-300"
                  src={isOpen ? "/minus.svg" : "/plus.svg"}
                  alt={isOpen ? "Collapse" : "Expand"}
                  width={24}
                  height={24}
                />
              </div>

              {isOpen && (
                <div className="text-[#4C4D4F] text-[14px] leading-[20px]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
