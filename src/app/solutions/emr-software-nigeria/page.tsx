"use client";

import Link from "next/link";

export default function EMRSoftware() {
  return (
    <div className="mt-20">

      <section className="bg-[#F8FBFF] py-20 px-6 xl:px-[130px]">
        <h1 className="text-[40px] font-extrabold text-[#002A40]">
          Electronic Medical Records (EMR) Software in Nigeria
        </h1>
        <p className="mt-6 text-gray-700 text-[18px] max-w-4xl">
          Secure, cloud-based EMR system built for Nigerian hospitals,
          clinics, and diagnostic centres.
        </p>
        <Link href="/contact">
          <button className="mt-8 bg-[#0077B6] text-white px-8 py-3 rounded-lg">
            Partner With Us
          </button>
        </Link>
      </section>

      <section className="bg-[#F8FBFF] px-6 xl:px-[130px] py-20 space-y-10">

        <h2 className="text-[28px] font-bold text-[#002A40]">
          Why Your Hospital Needs EMR Software
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Paper-based medical systems increase errors and reduce efficiency.
          Our EMR software digitizes patient records, improves collaboration,
          and enhances clinical documentation accuracy.
        </p>

        <h2 className="text-[28px] font-bold text-[#002A40]">
          Core Capabilities
        </h2>

        <ul className="list-disc ml-6 text-gray-700 space-y-3">
          <li>Digital patient records</li>
          <li>Consultation documentation</li>
          <li>Lab & diagnostic integration</li>
          <li>e-Prescribing</li>
          <li>Role-based permissions</li>
          <li>Secure cloud infrastructure</li>
        </ul>

        <h2 className="text-[28px] font-bold text-[#002A40]">
          Designed for Nigerian Healthcare Institutions
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Our system supports both small private clinics and large multi-specialty hospitals.
        </p>

      </section>

      <section className="bg-[#0077B6] text-white py-16 text-center">
        <h2 className="text-[28px] font-bold">
          Digitize Your Hospital Today
        </h2>
        <Link href="/contact">
          <button className="mt-6 bg-white text-[#0077B6] px-8 py-3 rounded-lg font-semibold">
            Partner With Us
          </button>
        </Link>
      </section>
    </div>
  );
}