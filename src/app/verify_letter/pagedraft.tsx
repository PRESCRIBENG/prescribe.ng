"use client";

import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

const VerifyLetter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] ">
      <div className="p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
              Verify Medical Report
            </h1>
            <p className="text-[16px] text-center">
              Enter the reference ID below to confirm if a report was issued by
              a verified healthcare provider.
            </p>
          </div>
          <div className="bg-white space-y-6 ">
            {submitted ? (
              <p className="text-green-600 text-center">
                Thank you! We&apos;ll get back to you soon.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full md:w-[790px] px-8 py-8 space-y-8"
              >
                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Enter Refrence ID
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter the reference ID"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-[] bg-[#0077B6] flex justify-end text-white py-2 px-2 rounded-md hover:bg-[#e35c00] transition"
                >
                  Proceed to Payment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#FFF1E8] px-6 xl:px-[130px] py-12 space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
            Your Donation Can Save a Life!
          </h1>
          <p className="text-[16px]">
            Every contribution, big or small, brings hope to those in need. Join
            us in making a difference today!
          </p>
        </div>
        <div className="flex justify-center">
          <button className="bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyLetter;
