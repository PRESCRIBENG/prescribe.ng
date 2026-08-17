"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface ShareCodeProgress {
  shareCodeReason: string;
  shareCode: string;
  targetAmount: number;
  raisedAmount: number;
  startDate: string;
  endDate: string;
}

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
  shareCodeProgress?: ShareCodeProgress[];
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

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

// Backend sends dates as "DD-MM-YYYY", which `new Date()` cannot parse reliably.
const parseDMYDate = (value: string) => {
  const [day, month, year] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const SaveALife = () => {
  const params = useParams<{ shareCode?: string | string[] }>();

  const [currentPage, setCurrentPage] = useState<"home" | "donationForm">(
    "home"
  );
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedPatient({ ...selectedPatient, [e.target.name]: e.target.value });
  };

  const handleFetchPatientsInNeed = async () => {
    const searchParameter = selectedPatient.shareCode?.trim() || "random";

    // Validate only if it's not the special 'random' keyword
    if (searchParameter !== "random" && searchParameter.length !== 6) {
      // || !/^\d{6}$/.test(searchParameter))) {
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
    if (
      searchParameter !== "random" &&
      (searchParameter.length !== 6 || !/^\d{6}$/.test(searchParameter))
    ) {
      //alert("Share code must be exactly 6 digits.");
      return;
    }

    const handleFetchRandomPatientsInNeed = async () => {
      const searchParameter = selectedPatient.shareCode?.trim() || "random";

      // Validate only if it's not the special 'random' keyword
      if (searchParameter !== "random" && searchParameter.length !== 6) {
        // || !/^\d{6}$/.test(searchParameter))) {
        //alert("Share code must be exactly 6 digits.");
        return;
      }

      try {
        const res = await fetch(
          `/api/web/save_a_life?shareCode=${encodeURIComponent(
            searchParameter
          )}`,
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

  useEffect(() => {
    const storedPatient = sessionStorage.getItem("selectedPatient");
    if (storedPatient) {
      try {
        const patientData = JSON.parse(storedPatient);
        setSelectedPatient((prev) => ({ ...prev, ...patientData }));
        setCurrentPage("donationForm");
        sessionStorage.removeItem("selectedPatient");
      } catch (error) {
        console.error("Error parsing patient data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const codeFromUrl = Array.isArray(params.shareCode)
      ? params.shareCode[0]
      : params.shareCode;

    if (!codeFromUrl) return;

    const fetchPatientFromUrl = async () => {
      try {
        const res = await fetch(
          `/api/web/save_a_life?shareCode=${encodeURIComponent(codeFromUrl)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const contentType = res.headers.get("content-type");
        const raw = await res.text();

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid server response");
        }

        const data = JSON.parse(raw) as { patientsList: Patient[] };

        if (!res.ok || !data.patientsList?.length) {
          throw new Error("Patient not found for share code");
        }

        setSelectedPatient((prev) => ({ ...prev, ...data.patientsList[0] }));
        setCurrentPage("donationForm");
      } catch (err) {
        console.error("Error fetching patient from URL:", err);
      }
    };

    fetchPatientFromUrl();
  }, [params.shareCode]);

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();

    if (!window.PaystackPop) {
      alert("Payment gateway not loaded. Please refresh the page.");
      return;
    }

    if (
      !selectedPatient.paystackPublicKey ||
      !selectedPatient.shareCode ||
      !selectedPatient.amount
    ) {
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

  const progress = selectedPatient.shareCodeProgress?.[0];
  const targetAmount = progress?.targetAmount ?? 0;
  const raisedAmount = progress?.raisedAmount ?? 0;
  const percentRaised =
    targetAmount > 0
      ? Math.min(100, Math.round((raisedAmount / targetAmount) * 100))
      : 0;

  const endDate = progress?.endDate ? parseDMYDate(progress.endDate) : null;
  const daysLeft = endDate
    ? Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const endDateLabel = endDate
    ? endDate.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="relative mt-24 bg-gradient-to-b from-[#F3F9FC] to-white">
      {currentPage === "home" && (
        <div>
          <div className="px-6 xl:px-[130px] py-16 md:py-20 space-y-10">
            <div className="max-w-[820px] space-y-5">
              <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#0077B6] bg-[#0077B6]/10 px-3 py-1 rounded-full">
                Community Crowdfunding
              </span>
              <h1 className="text-[32px] md:text-[40px] font-montserrat font-bold leading-tight text-[#002A40]">
                <span className="text-[#FE6F15]">PrescribeNg</span> Save A Life
                Initiative
              </h1>
              <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                At Prescribeng, we believe that no one should be denied
                healthcare due to financial constraints. Our Save a Life
                initiative is a crowdfunding platform where you can directly
                contribute to the medical expenses of patients in need, after
                a thorough verification exercise. Every contribution, no
                matter how small, brings hope and healing to those who need
                it most.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-[900px]">
              {[
                "Every case is independently verified before it's published",
                "Funds go toward the patient's verified medical bills",
                "Full transparency in the rare event of a patient's passing",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-sm font-bold shrink-0">
                    ✓
                  </span>
                  <p className="text-sm text-gray-700 leading-snug">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 max-w-[600px] space-y-3">
              <p className="text-sm font-semibold text-[#002A40]">
                Have a share code?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="shareCode"
                  placeholder="Input share code"
                  value={selectedPatient.shareCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0077B6]/40 text-gray-900 bg-white placeholder-gray-400 font-sans text-base leading-normal"
                />
                <button
                  onClick={handleFetchPatientsInNeed}
                  className="shrink-0 px-6 py-3 bg-[#0077B6] hover:bg-[#00659c] transition-colors text-white rounded-full text-[15px] font-semibold"
                >
                  Find case
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 xl:px-[130px] pb-20 space-y-6">
            <h2 className="text-[22px] font-montserrat font-bold text-[#002A40]">
              Active Cases
            </h2>
            <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide w-full">
              {patientsList.map((card, i) => {
                const cardTarget = card.shareCodeProgress?.[0]?.targetAmount ?? 0;
                const cardRaised = card.shareCodeProgress?.[0]?.raisedAmount ?? 0;
                const cardPercent =
                  cardTarget > 0
                    ? Math.min(100, Math.round((cardRaised / cardTarget) * 100))
                    : null;

                return (
                  <div
                    key={i}
                    className="snap-start flex-shrink-0 w-[320px] md:w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4"
                  >
                    <div className="w-[110px] h-[140px] shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                      <Image
                        className="w-full h-full object-contain"
                        src={card.image}
                        alt={`Photo of ${card.name}`}
                        width={110}
                        height={140}
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="font-montserrat text-[16px] font-bold text-[#002A40] truncate">
                        {card.name}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {card.shareCodeReason}
                      </p>
                      <p className="text-xs text-gray-400">{card.location}</p>

                      {cardPercent !== null ? (
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0077B6] rounded-full"
                              style={{ width: `${cardPercent}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs font-semibold text-[#002A40]">
                            <span>{formatNaira(cardRaised)} raised</span>
                            <span>{cardPercent}%</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Goal: {formatNaira(cardTarget)}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#002A40]">
                            Raised:
                          </span>{" "}
                          {card.credit}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">
                          Code: {card.shareCode}
                        </span>
                        <div
                          className="flex gap-1 items-center cursor-pointer"
                          onClick={() => {
                            setSelectedPatient({ ...selectedPatient, ...card });
                            setCurrentPage("donationForm");
                          }}
                        >
                          <p className="text-[#0077B6] text-sm font-semibold">
                            Donate Now
                          </p>
                          <Image
                            className="w-[18px] h-[18px]"
                            src="/arrow-right.svg"
                            alt="Arrow"
                            width={18}
                            height={18}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {currentPage === "donationForm" && (
        <div className="md:flex md:flex-col items-center space-y-4 py-12 px-6">
          <div className="w-full md:w-[790px]">
            <button
              type="button"
              onClick={resetAndReturnHome}
              className="text-sm text-gray-500 hover:text-[#0077B6] transition-colors mb-4"
            >
              ← Back to all cases
            </button>
          </div>
          <div className="bg-white w-full md:w-[790px] rounded-2xl shadow-md overflow-hidden text-[#002A40]">
            <div className="flex flex-col sm:flex-row gap-6 p-8 border-b border-gray-100">
              <div className="w-[140px] h-[175px] shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 shadow-sm mx-auto sm:mx-0 flex items-center justify-center">
                <Image
                  className="w-full h-full object-contain"
                  src={selectedPatient.image}
                  alt={`Photo of ${selectedPatient.name}`}
                  width={140}
                  height={175}
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-[28px] font-extrabold leading-tight">
                  {selectedPatient.name}
                </h1>
                <p className="text-gray-600">{selectedPatient.location}</p>
                <span className="inline-block bg-[#F5F5F5] text-[#0077B6] text-sm font-semibold px-3 py-1 rounded-full">
                  Share Code: {selectedPatient.shareCode}
                </span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <p>
                <strong>Condition:</strong> {selectedPatient.shareCodeReason}
              </p>

              {progress ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-2">
                    <span className="font-bold text-[18px]">
                      {formatNaira(raisedAmount)}
                    </span>
                    <span className="text-sm text-gray-500">
                      raised of {formatNaira(targetAmount)} goal
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0077B6] rounded-full transition-all"
                      style={{ width: `${percentRaised}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-2 text-sm text-gray-500">
                    <span>{percentRaised}% funded</span>
                    {endDateLabel && (
                      <span>
                        {daysLeft !== null && daysLeft >= 0
                          ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left · Ends ${endDateLabel}`
                          : `Campaign ended ${endDateLabel}`}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <p>
                  <strong>Raised:</strong> {selectedPatient.credit}
                </p>
              )}

            {submitted ? (
              <div className="text-center space-y-4">
                <p className="text-green-600">
                  Thank you! We&apos;ll get back to you soon.
                </p>
                <button
                  onClick={resetAndReturnHome}
                  className="bg-[#0077B6] text-white py-2.5 px-5 rounded-full font-semibold hover:bg-[#00659c] transition-colors"
                >
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]/40 text-gray-900 bg-white placeholder-gray-400 font-sans text-base leading-normal"
                />
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter amount (₦)"
                  required
                  value={selectedPatient.amount || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]/40 text-gray-900 bg-white placeholder-gray-400 font-sans text-base leading-normal"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Note (optional)"
                  value={selectedPatient.description || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]/40 text-gray-900 bg-white placeholder-gray-400 font-sans text-base leading-normal"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-[#0077B6] text-white py-2.5 px-5 rounded-full font-semibold hover:bg-[#00659c] transition-colors"
                  >
                    Donate
                  </button>
                  <button
                    type="button"
                    onClick={resetAndReturnHome}
                    className="bg-gray-100 text-gray-700 py-2.5 px-5 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveALife;
