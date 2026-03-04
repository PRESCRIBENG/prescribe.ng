"use client";

import Link from "next/link";

export default function PharmacyManagementSoftware() {
  return (
    <div className="mt-20">

      <section className="bg-[#F8FBFF] py-20 px-6 xl:px-[130px]">
        <h1 className="text-[40px] font-extrabold text-[#002A40]">
          Pharmacy Management Software in Nigeria
        </h1>
        <p className="mt-6 text-gray-700 text-[18px] max-w-4xl">
          A powerful digital pharmacy system designed to help Nigerian pharmacies
          manage inventory, prescriptions, sales, and financial reporting efficiently.
        </p>
        <Link href="/solutions/pharmacy-signup">
          <button className="mt-8 bg-[#0077B6] text-white px-8 py-3 rounded-lg">
            Signup For Our Pharmacy Management Software
          </button>
        </Link>
      </section>

      <section className="bg-[#F8FBFF] px-6 xl:px-[130px] py-20 space-y-10">

        <h2 className="text-[28px] font-bold text-[#002A40]">
          Digitize and Modernize Your Pharmacy
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Our Pharmacy Management Software helps pharmacies across Nigeria automate
          daily operations including inventory tracking, prescription processing,
          sales management, and revenue reporting.
        </p>

        <h2 className="text-[28px] font-bold text-[#002A40]">
          Key Features
        </h2>

        <ul className="list-disc ml-6 text-gray-700 space-y-3">
          <li>Real-time stock tracking</li>
          <li>Low-stock alerts</li>
          <li>Batch & expiry management</li>
          <li>Integrated POS system</li>
          <li>Sales & profit reporting</li>
          <li>Multi-branch capability</li>
        </ul>

        <h2 className="text-[28px] font-bold text-[#002A40]">
          Built for Nigerian Pharmacies
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Designed with Nigerian pharmacy workflows in mind, our system ensures
          compliance, transparency, and operational efficiency.
        </p>

      </section>

      <section className="bg-[#0077B6] text-white py-16 text-center">
        <h2 className="text-[28px] font-bold">
          Transform Your Pharmacy Operations Today
        </h2>
        <Link href="/solutions/pharmacy-signup">
          <button className="mt-6 bg-white text-[#0077B6] px-8 py-3 rounded-lg font-semibold">
            Signup For Our Pharmacy Management Software
          </button>
        </Link>
      </section>
    </div>
  );
}