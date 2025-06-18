"use client";

import { useState, useEffect } from "react";

const SelfSignup = () => {
  const [error, setError] = useState("");
  const [CurrentPage, setCurrentPage] = useState("");
  const [SignupFormSubpage, setSignupFormSubpage] = useState("instructions"); //shows the terms and conditions as well as instructions on how to signup
  const [formData, setFormData] = useState({
    //formData will be passed back and forth to the backend to make modifications on it, while screen visibility is determined by what changes the backend has made
    ppn: "",
    title: "",
    lastName: "",
    firstName: "",
    middleName: "",
    dob: "",
    gender: "",
    address: "",
    locality: "",
    state: "",
    email: "",
    mobile: "",
    idNumber: "",
    vnin: "",
    emc1: "",
    emc1Mobile: "",
    emc1Relationship: "",
    emc2: "",
    emc2Mobile: "",
    emc2Relationship: "",
    registeredEmail: "*****@gmail.com",
    registeredMobileNumber: "****4738",
    paystackPublicKey: "",
    amount: "",
    description: "",
    reference: "",
    metaPayload: {},
    routeTo: "",
    promoCode: "",
    token: "",
    otpEmail: "",
    otpMobile: "",
    fileAttachment: {},
    warning: "",
  });

  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const backendUrl = 'https://gelataskia.prescribe.ng/web';
  //const backendUrl = 'http://127.0.0.1:5002/web';

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (
      e.target.name === "fileAttachment" &&
      e.target instanceof HTMLInputElement &&
      e.target.files?.[0]
    ) {
      const file = e.target.files[0];

      // Convert file to base64
      const base64 = await convertFileToBase64(file);

      setFormData({ ...formData, fileAttachment: base64 });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const screenManager = async () => {
      //Makes a 'POST' call to the backend to retrieve latest state of user and to manage screen accordingly
      if (CurrentPage === "success") {
        return;
      }
      // Only make API call if we have some meaningful data or this is a refresh
      // Skip initial empty state unless refresh is triggered
      if (!refresh && !formData.ppn && !formData.email && !formData.idNumber) {
        return;
      }
      try {
        setIsLoading(true);
        const statusDataResponse = await fetch("/api/web/pre_signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        // Check if response is JSON
        //const contentType = statusDataResponse.headers.get("content-type");
        //if (!contentType || !contentType.includes("application/json")) {
        //throw new Error("Server returned non-JSON response. Please try again later.");
        //}

        const data = await statusDataResponse.json();

        if (!statusDataResponse.ok) {
          throw new Error("pre signup failed");
        }

        Object.keys(data).forEach((key) => {
          setFormData((prev) => ({
            ...prev,
            [key]: data[key], // Use bracket notation for dynamic key
          }));
        });

        setCurrentPage(data.routeTo);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Screen manager error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    screenManager();
  }, [refresh]);

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

  //This function sends formData to backend when called where it is modified and returned based on user's registration status. The returned data is then used to manage screen visibility
  const handlePreEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const preEnrolmentResponse = await fetch("/api/web/pre_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      //const contentType = preEnrolmentResponse.headers.get("content-type");
      //if (!contentType || !contentType.includes("application/json")) {
      //throw new Error("Server returned non-JSON response. Please try again later.");
      //}

      const data = await preEnrolmentResponse.json();

      if (!preEnrolmentResponse.ok) {
        throw new Error(data.message || "pre signup failed");
      }

      Object.keys(data).forEach((key) => {
        setFormData((prev) => ({
          ...prev,
          [key]: data[key], // Use bracket notation for dynamic key
        }));
      });

      setCurrentPage(data.routeTo);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Enrollment error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  //This function sends formData to backend when called where it is modified and returned based on user's registration status. The returned data is then used to manage screen visibility
  const handlePaystackPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!window.PaystackPop) {
        alert("Payment gateway not loaded. Please refresh the page.");
        return;
      }

      if (
        !formData?.paystackPublicKey ||
        !formData?.amount ||
        !formData?.metaPayload
      ) {
        alert("Incomplete payment data. Please try again.");
        return;
      }

      const paystackAmount = parseInt(formData.amount); //Already converted to kobo from backend;

      const handler = window.PaystackPop.setup({
        key: formData.paystackPublicKey,
        email: formData.email,
        amount: paystackAmount,
        currency: "NGN",
        reference: formData.ppn, //We use the same ppn generated as our payment reference, so that we can track transaction status in real time at any stage
        metadata: formData.metaPayload,
        callback: (response: { reference: string }) => {
          setRefresh((prev) => !prev);
          console.log("Payment complete:", response);
        },
        onClose: () => {
          alert("Transaction cancelled.");
        },
      });

      handler.openIframe();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);

      console.error("Payment error:", err);
      // alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //This function sends formData to backend where user data is extracted and user records updated accordingly
  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updatedFormData = { ...formData }; // Clone formData

      // Convert fileAttachment to base64
      if (formData.fileAttachment instanceof File) {
        const file = formData.fileAttachment;
        const base64 = await convertFileToBase64(file);
        updatedFormData.fileAttachment = base64; // Replace file with base64 string
      }

      const otpResponse = await fetch("/api/web/self_signup_verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (otpResponse.ok) {
        const data = await otpResponse.json();
        console.log(data);
        setCurrentPage("success");
      } else {
        const err = await otpResponse.json();
        alert(err.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);

      console.error("Otp verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Utility function to convert a File object to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  return (
    <div //className="overflow-hidden bg-[#F5F5F5] mt-50 mb-16 text-[16px] px-4 md:px-[130px]"
      className={`overflow-hidden bg-[#F5F5F5] mt-50 mb-16 text-[16px] px-4 md:px-[130px] ${
        isLoading ? "cursor-wait" : "cursor-default"
      }`}
    >
      <div className="md:flex md:flex-col items-center space-y-8">
        {CurrentPage === "" && (
          <div className="bg-white space-y-6">
            {SignupFormSubpage === "instructions" && (
              <div>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button
                      onClick={() => setError("")}
                      className="float-right font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="space-y-[16px] text-[#002A40]">
                  <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
                    TERMS AND CONDITIONS (read carefully).
                  </h1>
                </div>
                <div className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]">
                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      <b>Requirements:</b> <br />
                      * PrescribeNg services is currently open to only Nigerians
                      and Nigerian residents with NIN <br />
                      * User must have access to the mobile phone number linked
                      to their NIN * Intending users must have access to the
                      Nigerian mobile number linked to their NIN <br />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      <b>How we use your data:</b> <br />
                      * PrescribeNg is an e-commerce-styled healthcare platform
                      where qualified, licensed and thoroughly vetted healthcare
                      services providers/personnels meet healthcare services
                      users <br />
                      * Data access and visibility is strictly consent based. We
                      restrict the viewing of your data to only the heathcare
                      services providers you have authorized, and only to the
                      right personnels. <br />
                      * Users can authorize access at their own <br />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      <b>Safety Precautions:</b> <br />
                      * At PrescribeNG our aim is to put you in control of your
                      healthcare data, and to keep you safe as you navigate
                      through the journey of seeking healthcare in Nigeria,
                      ensuring you would only ever come across licensed and
                      thoroughly vetted healthcare services providers and
                      personnels through our vigorous and multi-layered vetting
                      and verification procedures <br />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      <b>Fraud Prevention:</b> <br />
                      * PrescribeNg Healthcare platform frowns at any attempts
                      at impersonations and has taken all necessary measures to
                      discourage impersonation. <br />
                      * Where it has been determined that an impersonation
                      attempt has occured, PrescribeNG LTD WILL pursue a
                      criminal prosecution against perpetrators <br />*
                      Occasionally we do assist patients who required urgent
                      life-saving medical treatments but are not able to afford
                      it... on such occasions, we carry out detailed background
                      checks and verification of claims provided by such
                      patients. Only upon successful verification of such claims
                      do we grant approval for such fund raisers through our{" "}
                      <b>SAVE A LIFE</b> initiative. <br />* Funds raised under
                      the save a life initiative are neither transferrable or
                      withdrawable to any bank account, but can only be directly
                      used in settling cost of healthcare services at point of
                      care.
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      <b>Warning:</b> <br />
                      * We do charge a token of ₦1,500 at signup... this is to
                      cover the cost of verification of the data provided to us,
                      before approving users on our platform. Providing a valid
                      promo code from any of our promoters would reduce this fee
                      to ₦500 <br />
                      * Providing an invalid/incorrect details would lead to the
                      failure of the authentication processes, in which case we
                      would not be able to issue a refund.
                      <br />
                      * Where a user has failed to supply us with the correct
                      OTPs after 3 attempts, such signup attempt is invalidated
                      and user would have to start afresh.
                      <br />* Only procede to the next page if you accept our
                      terms and conditions.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                    onClick={() => setSignupFormSubpage("signupForm")}
                  >
                    Accept Terms and Conditions
                  </button>
                </div>
              </div>
            )}

            {SignupFormSubpage === "signupForm" && (
              <div>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                    <button
                      onClick={() => setError("")}
                      className="float-right font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="space-y-[16px] text-[#002A40]">
                  <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
                    Self Signup
                  </h1>
                  <p className="text-[16px] text-center">
                    Easily add funds for yourself or a loved one to access
                    medical care when needed.
                  </p>
                </div>
                <form
                  onSubmit={handlePreEnrollment}
                  className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Title
                    </label>
                    <select
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    >
                      <option value="" disabled>
                        Select Title
                      </option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Chief">Chief</option>
                      <option value="Engr.">Engr.</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your full name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your full name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Enter your full name"
                      required
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      NIN
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      placeholder="Enter your idNumber"
                      required
                      value={formData.idNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Emergency Contact 1
                    </label>
                    <input
                      type="text"
                      name="emc1"
                      required
                      value={formData.emc1}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Emergency Contact1 Mobile Number
                    </label>
                    <input
                      type="text"
                      name="emc1Mobile"
                      required
                      value={formData.emc1Mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Relationship with Emergency Contact 1
                    </label>
                    <input
                      type="text"
                      name="emc1Relationship"
                      required
                      value={formData.emc1Relationship}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Emergency Contact 2
                    </label>
                    <input
                      type="text"
                      name="emc2"
                      value={formData.emc2}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Emergency Contact2 Mobile Number
                    </label>
                    <input
                      type="text"
                      name="emc2Mobile"
                      value={formData.emc2Mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Relationship with Emergency Contact 2
                    </label>
                    <input
                      type="text"
                      name="emc2Relationship"
                      value={formData.emc2Relationship}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Promo Code
                    </label>
                    <input
                      type="text"
                      name="promoCode"
                      placeholder="Enter your promoCode if you have any"
                      value={formData.promoCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Attach Government-issued ID Document (JPG, JPEG, PNG)
                    </label>
                    <input
                      type="file"
                      name="fileAttachment"
                      onChange={handleChange}
                      accept=".jpg,.jpeg,.png" // Optional: limit to specific file types
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {CurrentPage === "paygate" && (
          <div className="bg-white space-y-6">
            <div className="space-y-[16px] text-[#002A40]">
              <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
                PAYGATE
              </h1>
              {/* Display error to users */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                  <button
                    onClick={() => setError("")}
                    className="float-right font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
              {/* Display warning to users */}
              {formData.warning && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                  {formData.warning}
                </div>
              )}
              {/* <p className="text-[16px] text-center">
                You will be taken to our payment page to pay ₦
                {parseInt(formData.amount) / 100}. Click OK to continue.
              </p> */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Verification Fee
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-[#002A40]">
                      ₦{parseInt(formData.amount) / 100}
                    </div>
                    <p className="text-gray-600 text-sm">
                      Secure payment processing via Paystack
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={handlePaystackPayment}
              className="w-full md:w-[790px] px-8 py-8 space-y-8"
            >
              {/* <button
                type="submit"
                className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
              >
                OK
              </button> */}

              <button
                type="submit"
                disabled={isLoading}
                className="h-[41px] bg-[#0077B6] hover:bg-[#005f94] disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-[10px] shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Proceed to Secure Payment</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {CurrentPage === "verification" && (
          <div className="bg-white space-y-6">
            <div className="space-y-[16px] text-[#002A40]">
              <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
                Verification
              </h1>
              *
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                  <button
                    onClick={() => setError("")}
                    className="float-right font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
              <p className="text-[16px] text-center">
                Please enter OTP sent to your email and the phone number
                associated with your NIN
              </p>
            </div>
            <form
              onSubmit={handleOTPVerification}
              className="w-full md:w-[790px] px-8 py-8 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  OTP from {formData.registeredEmail}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="otpEmail"
                    placeholder="Enter OTP"
                    required
                    value={formData.otpEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  OTP from {formData.registeredMobileNumber}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="otpMobile"
                    placeholder="Enter OTP"
                    required
                    value={formData.otpMobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />

                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
              >
                {isLoading ? "Loading..." : "Verify OTPs"}
              </button>
            </form>
          </div>
        )}

        {CurrentPage === "success" && (
          <div className="bg-white space-y-6">
            <div className="space-y-[16px] text-[#002A40]">
              <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
                Success Page
              </h1>
              *
              <p className="text-[16px] text-center">
                Account creation successful and certificate sent to the
                registered email
              </p>
              <p>
                You can view and manage your healthcare appointments and that of
                your dependants on patient.prescribe.ng. <br />
                For any technical hitches, please contact on on
                support@prescribe.ng
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfSignup;
