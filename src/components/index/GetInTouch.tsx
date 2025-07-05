"use client";

import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="overflow-hidden bg-[#F5F5F5] text-base p-4 md:p-8 lg:p-16 xl:p-[130px]">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:justify-between">
        {/* Image container - hidden on small screens, visible from medium screens up */}
        <div className="hidden md:block w-full lg:w-1/2 xl:w-auto">
          <Image
            className="rounded-md w-full h-auto max-h-[600px] lg:max-h-[719px] object-cover"
            src="/image2.svg"
            alt="Contact us"
            width={562}
            height={719}
            priority
          />
        </div>

        {/* Form container */}
        <div className="w-full lg:w-1/2 xl:w-[500px] space-y-6">
          <div className="space-y-4 text-[#002A40]">
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-montserrat font-extrabold leading-tight">
              Get in Touch with Us
            </h1>
            <p className="text-sm md:text-base">
              Have questions, need support, or want to partner with us?
              We&apos;re here to help! Fill out the form below, and our team
              will get back to you as soon as possible.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-green-600 text-center">
                Thank you! We&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Subject
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Select Subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Support">Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-[154px] bg-[#0077B6] text-white py-3 rounded-md hover:bg-[#0066a1] transition"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
