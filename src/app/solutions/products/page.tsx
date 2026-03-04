"use client";

import Image from "next/image";
import Link from "next/link";

const OurProducts = () => {
  const products = [
    {
      title: "Virtual Clinic Portal",
      description:
        "24/7 online doctor consultations in Nigeria with secure video chat, electronic prescriptions, wallet payments, and full medical record management.",
      link: "/solutions/virtual-clinic-nigeria",
      button: "Explore Virtual Clinic",
    },
    {
      title: "Pharmacy Management Software",
      description:
        "Smart pharmacy software built for Nigerian pharmacies to manage inventory, prescriptions, sales tracking, and reporting efficiently.",
      link: "/solutions/pharmacy-management-software-nigeria",
      button: "Explore Pharmacy Software",
    },
    {
      title: "Proprietary EMR System",
      description:
        "Secure Electronic Medical Records (EMR) system for hospitals and clinics in Nigeria with digital patient records and clinical documentation.",
      link: "/solutions/emr-software-nigeria",
      button: "Explore EMR System",
    },
  ];

  const partners = [
    {
      title: "Doctors & Specialists",
      text: "Provide virtual consultations, diagnoses, and follow-up care.",
    },
    {
      title: "Hospitals & Clinics",
      text: "Digitize patient records and access verified funded patients.",
    },
    {
      title: "Pharmacies",
      text: "Manage prescriptions digitally and connect to secure patient payments.",
    },
    {
      title: "Laboratories & Diagnostic Centres",
      text: "Integrate test results and improve diagnostic efficiency.",
    },
  ];

  return (
    <div className="relative mt-20">

      {/* HERO SECTION */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <Image
          src="/about.png"
          alt="Digital Healthcare Solutions in Nigeria"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="px-6 xl:px-[130px] text-white max-w-3xl">
            <h1 className="text-[36px] md:text-[42px] font-extrabold leading-tight">
              Our Healthcare Technology Products in Nigeria
            </h1>
            <p className="mt-4 text-[16px] md:text-[18px]">
              Prescribe-NG provides secure, scalable, and innovative digital healthcare solutions including Virtual Clinics, Pharmacy Software, and EMR systems built for Nigeria.
              Our products are designed to improve access to care, enhance clinical efficiency, and digitize healthcare operations across Nigeria.
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section className="px-6 xl:px-[130px] py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-8 hover:shadow-lg transition"
            >
              <h3 className="text-[22px] font-bold text-[#0077B6]">
                {product.title}
              </h3>
              <p className="mt-4 text-gray-600 text-[15px]">
                {product.description}
              </p>
              <Link href={product.link}>
                <button className="mt-6 w-full bg-[#0077B6] text-white py-3 rounded-lg hover:bg-[#005f8f] transition">
                  {product.button}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
      <section className="bg-[#F9FAFB] px-6 xl:px-[130px] py-16">
        <div className="max-w-4xl mx-auto space-y-6 text-[16px] text-gray-700">
          <h2 className="text-[28px] font-extrabold text-[#002A40]">
            Why Choose Prescribe-NG?
          </h2>
          <p>
            Prescribe-NG is a leading digital healthcare platform in Nigeria offering telemedicine services, pharmacy management systems, and hospital EMR solutions. Our technology is built with security, scalability, and compliance at its core.
          </p>
          <p>
            Whether you are a patient seeking 24/7 online doctor consultation in Nigeria, a pharmacy looking for better inventory management, or a hospital ready to digitize patient records, our solutions are tailored to meet your needs.
          </p>
          <p>
            We are committed to improving healthcare accessibility across Lagos, Abuja, Port Harcourt, Kano, and beyond through innovative health technology.
          </p>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="px-6 xl:px-[130px] py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <Image
              src="/partner-with-us.svg"
              alt="Partner with Prescribe-NG"
              width={500}
              height={450}
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-[28px] font-extrabold text-[#002A40]">
              Who Can Partner With Us?
            </h2>

            {partners.map((partner, index) => (
              <div key={index}>
                <h4 className="font-bold text-[#0077B6]">
                  {partner.title}
                </h4>
                <p className="text-gray-600">{partner.text}</p>
              </div>
            ))}

            <Link href="/contact">
              <button className="mt-6 bg-[#0077B6] text-white px-6 py-3 rounded-lg hover:bg-[#005f8f] transition">
                Become a Partner
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0077B6] text-white py-16 text-center px-6">
        <h2 className="text-[28px] font-extrabold">
          Ready to Transform Healthcare in Nigeria?
        </h2>
        <p className="mt-4 text-[16px] max-w-2xl mx-auto">
          Explore our Virtual Clinic, Pharmacy Software, and EMR systems today and take the next step toward smarter healthcare delivery.
        </p>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <Link href="/virtual-clinic-nigeria">
            <button className="bg-white text-[#0077B6] px-6 py-3 rounded-lg font-semibold">
              Visit Virtual Clinic
            </button>
          </Link>
          <Link href="/solutions/pharmacy-management-software-nigeria">
            <button className="bg-white text-[#0077B6] px-6 py-3 rounded-lg font-semibold">
              View Pharmacy Software
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurProducts;