"use client";

import { useState, useEffect } from "react";

const DirectDebit = () => {
  const [formData, setFormData] = useState({
    ppn: "",
    dobString: "",
    patient: "",
    dob: "",
    authorizationToken:"",
    accessCode: "",
    registeredMobileNumber: "",
    paystackPublicKey: "",
    email: "",
    amount: "",
    description: "",
    reference: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState('');
  //const [showSecondForm, setShowSecondForm] = useState(false);
  //const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


    const handlePreInitialization = async (e: React.FormEvent) => {   //User has to prove they have authorized access to account before we let them set up or modify direct debit on it
        e.preventDefault();
        if (!formData.ppn) return;

      if (formData.ppn.length !== 9 && formData.ppn.length !== 11) {
        alert('Invalid patient ID'!);
        setFormData((prev) => ({
          ...prev,
          patient: "",
          paystackPublicKey: "",
          authorizationToken: "",
          ppn: "",
          dobString: "",
          email: "",
          amount: "",
          description: "",
        }));
        return;
      }

      try {
        setIsLoading(true);
        const preInitializationResponse = await fetch(
          `/api/web/pre_initialize_direct_debit?query=${encodeURIComponent(formData.ppn)}&dobString=${encodeURIComponent(formData.dobString)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const contentType = preInitializationResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response.");
        }

        const preInitializationData = await preInitializationResponse.json();

        if (!preInitializationResponse.ok) {
          throw new Error(preInitializationData.message || "Account not found!");
        }

        setFormData((prev) => ({
          ...prev,
          ...preInitializationData,
        }));
        setCurrentPage('preInitialization');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Verification error:", err.message);
        } else {
          console.error("Verification error:", err);
        }
      } finally{
        setIsLoading(false);
      }
    };



    const handleInitialization = async (e: React.FormEvent) => {   //User accessCode is verified and if successful, they are allowed to procede to the next stage
        e.preventDefault();

        if (!formData.accessCode) return;
  
        if (formData.accessCode.length !== 6) {
          return;
        }
  
        try {
            setIsLoading(true);
          const initializationResponse = await fetch(
            `/api/web/initialize_direct_debit?accessCode=${encodeURIComponent(formData.accessCode)}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${formData.authorizationToken}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          const contentType = initializationResponse.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server returned non-JSON response.");
          }
  
          const initializationData = await initializationResponse.json();
  
          if (!initializationResponse.ok) {
            throw new Error(initializationData.message || "Invalid OR Expired accessCode!");
          }
  
          setFormData((prev) => ({
            ...prev,
            ...initializationData,
          }));
          setCurrentPage('initialization');
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Verification error:", err.message);
          } else {
            console.error("Verification error:", err);
          }
        } finally{
            setIsLoading(false);
        }
      };



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



  //Handle direct debit payment on paystack
  const handleDirectDebitSetup = (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (!window.PaystackPop) {
        alert("Payment gateway not loaded. Please refresh the page.");
        return;
      }
  
      const { paystackPublicKey, ppn, amount, email, description } = formData;
  
      if (!paystackPublicKey || !ppn || !amount || !email) {
        alert("Incomplete payment data. Please fill out all required fields.");
        return;
      }
  
      const debitAmount = parseInt(amount) * 100; // Convert Naira to Kobo
  
      if (isNaN(debitAmount) || debitAmount < 500000) {
        alert("Minimum amount for direct debit is ₦5000.");
        return;
      }
  
      const handler = window.PaystackPop.setup({
        key: paystackPublicKey,
        email: email,
        amount: 10000, // ₦100 mandate fee just to initialize setup, will be refunded immediately by the webhook.
        currency: "NGN",
        channels: ["bank"], // Required for direct debit
        metadata: {
            transactionCategory: 'patientDebitInitialization',
            ppn: formData.ppn,
            debitAmount: debitAmount,
        },
        //Call back ommitted completely to allow all payment related functions to be handled by the webhook
        onClose: function () {
          alert("Direct debit setup was cancelled.");
        },
      });
  
      handler.openIframe();
    } catch (error) {
      console.error("Error setting up direct debit:", error);
      alert("Something went wrong while setting up direct debit.");
    }
  };



  const handleDirectDebitSetupSavedVersion = (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (!window.PaystackPop) {
        alert("Payment gateway not loaded. Please refresh the page.");
        return;
      }
  
      const { paystackPublicKey, ppn, amount, email, description } = formData;
  
      if (!paystackPublicKey || !ppn || !amount || !email) {
        alert("Incomplete payment data. Please fill out all required fields.");
        return;
      }
  
      const debitAmount = parseInt(amount) * 100; // Convert Naira to Kobo
  
      if (isNaN(debitAmount) || debitAmount < 500000) {
        alert("Minimum amount for direct debit is ₦5000.");
        return;
      }
  
      const handler = window.PaystackPop.setup({
        key: paystackPublicKey,
        email: email,
        amount: 10000, // ₦100 mandate fee just to initialize setup, will be refunded immediately by the webhook.
        currency: "NGN",
        channels: ["bank"], // Required for direct debit
        metadata: {
            transactionCategory: 'patientDebitInitialization',
            ppn: formData.ppn,
            debitAmount: debitAmount,
        },
        callback: function (response: { reference: string }) {
          console.log("Mandate authorization successful. Ref:", response.reference);
  
          // Send reference to your backend for recording the mandate
          fetch("/api/web/record_direct_debit_reference", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reference: response.reference,
              ppn,
              email,
              amount: debitAmount,
              description,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Saved direct debit reference:", data);
              //setSubmitted(true);
              setCurrentPage("success");
            })
            .catch((err) => {
              console.error("Failed to save reference:", err);
              alert("Setup succeeded, but we couldn’t record your mandate.");
            });
        },
        onClose: function () {
          alert("Direct debit setup was cancelled.");
        },
      });
  
      handler.openIframe();
    } catch (error) {
      console.error("Error setting up direct debit:", error);
      alert("Something went wrong while setting up direct debit.");
    }
  };


  
  return (
    <div className="overflow-hidden bg-[#F5F5F5] mt-50 mb-16 text-[16px] px-4 md:px-[130px]">
      <div className="md:flex md:flex-col items-center space-y-8">
        <div className="bg-white space-y-6">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
              DIRECT DEBIT
            </h1>
            <p className="text-[16px] text-center">
              Easily add funds for yourself or a loved one to access medical
              care when needed.
            </p>
          </div>

          {
          CurrentPage==='preInitialization' ? (
            <form
              onSubmit={handleInitialization}
              className="w-full md:w-[790px] px-8 py-8 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Enter accessCode from {formData.registeredMobileNumber}
                </label>
                <input
                  type="text"
                  name="accessCode"
                  required
                  placeholder="Enter accessCode"
                  value={formData.accessCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
              </div>

              <button
                type="submit"
                className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
              >
                {isLoading ? 'Verifying access code...' : 'Verify access code'}
              </button>
            </form>
          ) 
          
          
          : 
          
          
          CurrentPage==='initialization' ? (
            <form
              onSubmit={handleDirectDebitSetup}
              className="w-full md:w-[790px] px-8 py-8 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  PPN
                </label>
                <input
                  type="text"
                  name="ppn"
                  required
                  value={formData.ppn}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
              </div>

              
                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="patient"
                    required
                    value={formData.patient}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Birth Day
                  </label>
                  <input
                    type="text"
                    name="dob"
                    required
                    value={formData.dob}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>
              
                <div>
                  <input
                    type="hidden"
                    name="email"
                    required
                    value={formData.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>
              
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>
             

              <button
                type="submit"
                className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
              >
                {isLoading ? 'Setting up Direct Debit...':'Setup Direct Debit'}
              </button>
            </form>
          ) 
          
          
          : 
          
          //SUCCESS PAGE
          CurrentPage==='success' ? (
            <p className="text-green-600 text-center">
              Direct debit successfully setup.
            </p>
          ) 
          
          
          : 
          
          
          ( //HOME PAGE
            <form
              onSubmit={handlePreInitialization}
              className="w-full md:w-[790px] px-8 py-8 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  PPN
                </label>
                <input
                  type="text"
                  name="ppn"
                  required
                  placeholder="Enter your unique PPN"
                  value={formData.ppn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
              
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                    DOB
                  </label>
                  <input
                    type="date"
                    name="dobString"
                    placeholder="Date of birth"
                    required
                    value={formData.dobString}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                </div>

              <button
                type="submit"
                className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
              >
                {isLoading ? 'Submitting...':'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectDebit;
