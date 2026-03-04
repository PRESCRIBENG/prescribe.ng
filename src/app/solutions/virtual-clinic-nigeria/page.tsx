"use client";

//import Image from "next/image";
import Link from "next/link";

export default function VirtualClinic() {
    return (
        <div className="mt-20">

            {/* HERO - LIGHT */}
            <section className="bg-[#F8FBFF] py-20 px-6 xl:px-[130px]">
                <div className="max-w-4xl">
                    <h1 className="text-[40px] font-extrabold text-[#002A40] leading-tight">
                        Virtual Clinic in Nigeria – 24/7 Online Doctor Consultation Platform
                    </h1>
                    <p className="mt-6 text-[18px] text-gray-700">
                        Prescribe-NG provides secure, real-time telemedicine services across Nigeria,
                        allowing patients to consult licensed doctors via audio or video from anywhere.
                    </p>
                    <Link href="https://patient.prescribe.ng">
                        <button className="mt-8 bg-[#0077B6] text-white px-8 py-3 rounded-lg">
                            Visit Our Virtual Clinic
                        </button>
                    </Link>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="px-6 xl:px-[130px] py-20 space-y-12 bg-[#F8FBFF]">

                <h2 className="text-[28px] font-bold text-[#002A40]">
                    What is Prescribe-NG Virtual Clinic?
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    Prescribe-NG Virtual Clinic is a fully integrated telemedicine platform designed
                    specifically for Nigerians and residents in Nigeria. It enables patients
                    to create profiles, book appointments, and consult doctors securely
                    through high-quality audio and video technology.
                </p>

                <p className="text-gray-700 leading-relaxed">
                    With increasing healthcare demands across Lagos, Abuja, Port Harcourt,
                    Kano, and rural communities, digital healthcare access is no longer optional —
                    it is essential. Our platform eliminates long queues, reduces travel stress,
                    and ensures 24/7 access to qualified healthcare professionals.
                </p>

                <h2 className="text-[28px] font-bold text-[#002A40]">
                    Core Features of Our Telemedicine Platform
                </h2>

                <ul className="list-disc ml-6 space-y-3 text-gray-700">
                    <li><strong>Secure Audio & Video Consultations:</strong> Real-time communication with licensed Nigerian doctors.</li>
                    <li><strong>Electronic Prescriptions:</strong> Receive digitally signed prescriptions instantly.</li>
                    <li><strong>Clinical Documentation:</strong> Full medical history and consultation notes securely stored.</li>
                    <li><strong>Dependants Management:</strong> Add children, spouse, or elderly parents under one dashboard.</li>
                    <li><strong>Wallet Payment System:</strong> Fund your wallet and pay seamlessly.</li>
                    <li><strong>24/7 Doctor Availability:</strong> Access healthcare anytime.</li>
                    <li><strong>Encrypted & Secure Platform:</strong> Built with strong data protection standards.</li>
                </ul>

                <h2 className="text-[28px] font-bold text-[#002A40]">
                    Who Can Use Our Virtual Clinic?
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    Our platform serves patients nationwide, including working professionals,
                    families, elderly individuals, students, and people living in underserved
                    communities. We also welcome licensed doctors and specialists who want to
                    expand their practice digitally and reach more patients.
                </p>

                <h2 className="text-[28px] font-bold text-[#002A40]">
                    Why Choose Prescribe-NG for Online Consultation in Nigeria?
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    Unlike generic telemedicine tools, our Virtual Clinic is built for the
                    Nigerian healthcare system. We understand regulatory expectations,
                    payment infrastructure, and connectivity realities across the country.
                </p>

            </section>

            {/* CTA */}
            <section className="bg-[#0077B6] text-white py-16 text-center">
                <h2 className="text-[28px] font-bold">
                    Ready to Access Quality Healthcare Anywhere in Nigeria?
                </h2>
                <Link href="https://patient.prescribe.ng">
                    <button className="mt-6 bg-white text-[#0077B6] px-8 py-3 rounded-lg font-semibold">
                        Visit Our Virtual Clinic
                    </button>
                </Link>
            </section>
        </div>
    );
}