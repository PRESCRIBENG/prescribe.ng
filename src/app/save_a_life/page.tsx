"use client";

import Image from "next/image";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Patient {
  name: string;
  shareCodeReason: string;
  credit: string;
  image: string;
  shareCode: string;
  location: string;
  patientEmail?: string;
  donorEmail?: string;
  paystackPublicKey?: string;
  amount?: string;
  description?: string;
  reference?: string;
}

interface PaystackHandler {
  setup: (options: Record<string, unknown>) => {
    openIframe: () => void;
  };
}

declare global {
  interface Window {
    PaystackPop: PaystackHandler;
  }
}


const SaveALife = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "donationForm">("home");
  const [patientsList, setPatientsList] = useState<Patient[]>([
    //{
    //  name: "Aisha Bello",
    //  shareCodeReason: "₦1,200,000",
    //  credit: "₦450,000 | 37%",
    //  image: "/image 4.svg",
    //  shareCode: "123456",
    //  location: "Lagos, Nigeria",
    //},
    //{
    //  name: "Michael Adewale",
    //  shareCodeReason: "Needs ₦2,500,000 for kidney transplant",
    //  credit: "₦850,000 | 34%",
    //  image: "/image-3.svg",
    //  shareCode: "123456",
    //  location: "Lagos, Nigeria",
    //},
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient>({
    name: "",
    shareCodeReason: "",
    credit: "",
    image: "",
    shareCode: "",
    location: "",
    patientEmail: "",
    donorEmail: "",
    paystackPublicKey: "",
    amount: "",
    description: "",
    reference: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedPatient({ ...selectedPatient, [e.target.name]: e.target.value });
  };

  
  const handleFetchPatientsInNeed = async () => {
    const searchParameter = selectedPatient.shareCode?.trim() || "random";

  // Validate only if it's not the special 'random' keyword
  if (searchParameter !== "random" && (searchParameter.length !== 6)) {// || !/^\d{6}$/.test(searchParameter))) {
    //alert("Share code must be exactly 6 digits.");
    return;
  }

    try {
      const res = await fetch(
        `/api/web/save_a_life?shareCode=${encodeURIComponent(searchParameter)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = res.headers.get("content-type");
      const raw = await res.text();

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid server response");
      }

      const patients = JSON.parse(raw) as { patientsList: Patient[] };

      if (!res.ok) {
        throw new Error(patients as unknown as string);
      }

      setPatientsList(patients.patientsList);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Fetch error:", err.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };


  useEffect(() => {
    
      const searchParameter = selectedPatient.shareCode?.trim() || "random";
  
    // Validate only if it's not the special 'random' keyword
    if (searchParameter !== "random" && (searchParameter.length !== 6 || !/^\d{6}$/.test(searchParameter))) {
      //alert("Share code must be exactly 6 digits.");
      return;
    }

    const handleFetchRandomPatientsInNeed = async () => {
      const searchParameter = selectedPatient.shareCode?.trim() || "random";
  
    // Validate only if it's not the special 'random' keyword
    if (searchParameter !== "random" && (searchParameter.length !== 6)) {// || !/^\d{6}$/.test(searchParameter))) {
      //alert("Share code must be exactly 6 digits.");
      return;
    }
  
      try {
        const res = await fetch(
          `/api/web/save_a_life?shareCode=${encodeURIComponent(searchParameter)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const contentType = res.headers.get("content-type");
        const raw = await res.text();
  
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid server response");
        }
  
        const patients = JSON.parse(raw) as { patientsList: Patient[] };
  
        if (!res.ok) {
          throw new Error(patients as unknown as string);
        }
  
        setPatientsList(patients.patientsList);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Fetch error:", err.message);
        } else {
          console.error("Unknown error occurred");
        }
      }
    };
  
    handleFetchRandomPatientsInNeed();
  }, [selectedPatient.shareCode]);
  
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();

    if (!window.PaystackPop) {
      alert("Payment gateway not loaded. Please refresh the page.");
      return;
    }

    if (!selectedPatient.paystackPublicKey || !selectedPatient.shareCode || !selectedPatient.amount) {
      alert("Incomplete payment data. Please try again.");
      return;
    }

    const desiredAmount = parseInt(selectedPatient.amount) * 100; // in kobo
      let fee = desiredAmount * 0.015;

      // Add ₦100 only if desired amount is ₦2500 or more
      if (desiredAmount >= 250000) {
        fee += 10000;
      }

      // Cap fee at ₦2000
      if (fee > 200000) {
        fee = 200000;
      }

      const paystackAmount = desiredAmount + Math.ceil(fee);


    const handler = window.PaystackPop.setup({
      key: selectedPatient.paystackPublicKey,
      email: selectedPatient.donorEmail,
      amount: paystackAmount,
      currency: "NGN",
      metadata: {
        shareCode: selectedPatient.shareCode,
        transactionCategory: "shareCode",
        email: selectedPatient.patientEmail,
        description: selectedPatient.description,
      },
      callback: (response: { reference: string }) => {
        setSelectedPatient((prev) => ({
          ...prev,
          reference: response.reference,
        }));
        alert("Payment successful!");
        setSubmitted(true);
      },
      onClose: () => {
        alert("Transaction cancelled.");
      },
    });

    handler.openIframe();
  };

  const resetAndReturnHome = () => {
    setSelectedPatient({
      name: "",
      shareCodeReason: "",
      credit: "",
      image: "",
      shareCode: "",
      location: "",
      patientEmail: "",
      donorEmail: "",
      paystackPublicKey: "",
      amount: "",
      description: "",
      reference: "",
    });
    setCurrentPage("home");
  };

  return (
    <div className="relative mt-24">
      {currentPage === "home" && (
        <div className="px-6 xl:px-[130px] py-12 space-y-16">
          <div className="space-y-3">
            <h1 className="text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
              <span className="text-[#FE6F15]">PrescribeNg</span> Save A Life Initiative
            </h1>
            <p className="text-[16px]">
              At Prescribeng, we believe that no one should be denied healthcare due to financial
              constraints. Our Save a Life initiative is a crowdfunding platform where you can
              directly contribute to the medical expenses of patients in need.
            </p>
            <p>✅ 100% of your donation goes directly to medical care – we do not charge any commission.</p>
            <p>
              ✅ Funds are strictly for settling hospital bills at the point of service and cannot be
              withdrawn or transferred by the patient or their family.
            </p>
            <p>
              ✅ In the unfortunate event of a patient&apos;s passing, we ensure full transparency by
              issuing the raised funds to the family via a cheque, upon presenting a verified death
              certificate.
            </p>
            <p className="text-[16px]">
              Every contribution, no matter how small, brings hope and healing to those who need it
              most.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              name="shareCode"
              placeholder="Input share code"
              value={selectedPatient.shareCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
            <button
              onClick={handleFetchPatientsInNeed}
              className="w-[149px] bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]"
            >
              Find case
            </button>
          </div>

          <div className="overflow-hidden bg-[#F5F5F5] text-[16px]">
            <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide w-full">
              {patientsList.map((card, i) => (
                <div
                  key={i}
                  className="snap-start flex-shrink-0 w-[342px] md:w-[342px] bg-white rounded-[5px]"
                >
                  <Image
                    className="w-[342px] h-[187px] object-cover rounded-t-[5px]"
                    src={card.image}
                    alt={`Image of ${card.name}`}
                    width={342}
                    height={178}
                  />
                  <div className="p-4 space-y-2">
                    <p className="font-montserrat text-[16px] font-bold">{card.name}</p>
                    <p>
                      <span className="font-bold">Condition: </span> {card.shareCodeReason}
                    </p>
                    <p>
                      <span className="font-bold">Location: </span> {card.location}
                    </p>
                    <p>
                      <span className="font-bold">Raised: </span> {card.credit} ✅
                    </p>
                    <p>
                      <span className="font-bold">Share Code: </span> {card.shareCode}
                    </p>
                    <div
                      className="flex gap-2 items-center cursor-pointer"
                      onClick={() => {
                        setSelectedPatient({ ...selectedPatient, ...card });
                        setCurrentPage("donationForm");
                      }}
                    >
                      <p className="text-[#0077B6] text-[16px]">Donate Now</p>
                      <Image
                        className="w-[24px] h-[24px]"
                        src="/arrow-right.svg"
                        alt="Arrow"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPage === "donationForm" && (
        <div className="md:flex md:flex-col items-center space-y-8 py-12">
          <div className="bg-white space-y-6 w-full md:w-[790px] px-8 py-8">
            <h1 className="text-[32px] font-extrabold text-center">{selectedPatient.name}</h1>
            <Image
              className="w-full h-[187px] object-cover rounded"
              src={selectedPatient.image}
              alt={`Image of ${selectedPatient.name}`}
              width={342}
              height={178}
            />
            <p><strong>Condition:</strong> {selectedPatient.shareCodeReason}</p>
            <p><strong>Location:</strong> {selectedPatient.location}</p>
            <p><strong>Raised:</strong> {selectedPatient.credit}</p>
            <p><strong>Share Code:</strong> {selectedPatient.shareCode}</p>

            {submitted ? (
              <div className="text-center space-y-4">
                <p className="text-green-600">Thank you! We&apos;ll get back to you soon.</p>
                <button onClick={resetAndReturnHome} className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePayment} className="space-y-6">
                <input
                  type="email"
                  name="donorEmail"
                  placeholder="Enter your email"
                  required
                  value={selectedPatient.donorEmail || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter amount (₦)"
                  required
                  value={selectedPatient.amount || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Note (optional)"
                  value={selectedPatient.description || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition">
                  Donate
                </button>
                <button type="button" onClick={resetAndReturnHome} className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition">
                  Back
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveALife;
