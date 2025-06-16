"use client";

import { useState, useEffect } from "react";

const TopUp = () => {
  const [formData, setFormData] = useState({
    ppn: "",
    patient: "",
    paystackPublicKey: "",
    email: "",
    amount: "",
    description: "",
    reference: "",
  });
  //const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleAccountVerification = async () => {
      if (!formData.ppn) return;
  
      if (formData.ppn.length !== 9) {
        setFormData((prev) => ({ ...prev, patient: "", paystackPublicKey: "" }));
        return;
      }
  
      try {
        const verificationResponse = await fetch(
          `/api/web/verify_account?query=${encodeURIComponent(formData.ppn)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const contentType = verificationResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response.");
        }
  
        const verificationData = await verificationResponse.json();
  
        if (!verificationResponse.ok) {
          throw new Error(verificationData.message || "Verification failed");
        }
  
        setFormData((prev) => ({
          ...prev,
          ...verificationData,
        }));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Verification error:", err.message);
        } else {
          console.error("Verification error:", err);
        }
      }
    };
  
    handleAccountVerification();
  }, [formData.ppn]);
  

  // Load Paystack SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  //Handle payment on paystack
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!window.PaystackPop) {
        alert("Payment gateway not loaded. Please refresh the page.");
        return;
      }

      if (!formData.paystackPublicKey || !formData.ppn || !formData.amount) {
        alert("Incomplete payment data. Please try again.");
        return;
      }

      const desiredAmount = parseInt(formData.amount) * 100; // in kobo
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
        key: formData.paystackPublicKey,
        email: formData.email,
        amount: paystackAmount,
        currency: "NGN",
        metadata: {
          ppn: formData.ppn,
          transactionCategory: "patient",
          email: formData.email,
          description: formData.description,
        },
        callback: (response: { reference: string }) => {
          setFormData((prev) => ({
            ...prev,
            reference: response.reference,
          }));
          console.log("Payment complete:", response);
          alert("Payment successful!");
          setSubmitted(true);
        },
        onClose: () => {
          alert("Transaction cancelled.");
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  

  return (
    <div className="overflow-hidden bg-[#F5F5F5] mt-50 mb-16 text-[16px] px-4 md:px-[130px]">
      <div className="md:flex md:flex-col items-center space-y-8">
        <div className="bg-white space-y-6">
          <div className="space-y-[16px] text-[#002A40]">
          <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
            Patient Top up
            </h1>
            <p className="text-[16px] text-center">
            Easily add funds for yourself or a loved one to access medical care when needed.
          </p>
          </div>

          {submitted ? (
            <p className="text-green-600 text-center">
              Thank you! We&apos;ll your PrescribeNg Patient Wallet is being credited.
            </p>
          ) : (
            <form onSubmit={handlePayment} className="w-full md:w-[790px] px-8 py-8 space-y-8">
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  PPN
                </label>
                <input
                  type="text"
                  name="ppn"
                  required
                  placeholder="Enter your unique PPN or NHIS number"
                  value={formData.ppn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {formData.patient  && (
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="patient"
                  placeholder="Enter your full name"
                  required
                  value={formData.patient}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>                                  
                )}

              { formData.patient && ( 
                
                <div>
                <input
                  type="hidden"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />   
                </div>
              )}

              {formData.patient && (
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Amount (₦)
                </label>
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter the amount"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              )}

              {formData.patient && (
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Note or reference"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>                
              )}


              <button
                type="submit"
                className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
              >
                Proceed to Payment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUp;
