"use client";

import { useState, useEffect } from "react";

const PartnerSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [CurrentPage, setCurrentPage] = useState("");
  const [SignupFormSubpage, setSignupFormSubpage] = useState("instructions"); //shows the terms and conditions as well as instructions on how to signup
  const [formData, setFormData] = useState({
    //formData will be passed back and forth to the backend to make modifications on it, while screen visibility is determined by what changes the backend has made

    //Organisation details
    category: "",
    organisation: "",
    registrationNumber: "",
    organisationEmail: "",
    organisationTelephone: "",
    state: "",
    locality: "",
    address: "",
    postcode: "",
    gps: "",
    newLogo: {},

    //Keyperson-1 details
    kp1Title: "",
    kp1LastName: "",
    kp1FirstName: "",
    kp1Email: "",
    kp1Mobile: "",


    //Keyperson-2 details
    kp2Title: "",
    kp2LastName: "",
    kp2FirstName: "",
    kp2Email: "",
    kp2Mobile: "",
  });


  const [states] = useState<string[]>([
    'Federal Capital Territory', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ]);

  const [localities, setLocalities] = useState<string[]>([]);




  useEffect(() => {
    console.log("STATE CHANGED:", formData.state);
    if (!formData.state) return;

    const handFetchApprovedLocalities = async () => {
      try {
        const res = await fetch(
          `/api/web/approved_localities?state=${encodeURIComponent(formData.state)}`,
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

        const resData = JSON.parse(raw) as { localities: string[] };

        if (!res.ok) {
          throw new Error("Failed to fetch localities");
        }

        setLocalities(resData.localities);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Fetch error:", err.message);
        } else {
          console.error("Unknown error occurred");
        }
      }
    };

    handFetchApprovedLocalities();
  }, [formData.state]);




  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (
      e.target.name === "newLogo" &&
      e.target instanceof HTMLInputElement &&
      e.target.files?.[0]
    ) {
      const file = e.target.files[0];

      // Convert file to base64
      const base64 = await convertFileToBase64(file);

      setFormData({ ...formData, newLogo: base64 });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };





  //This function sends formData to backend when called where it is modified and returned based on user's registration status. The returned data is then used to manage screen visibility
  const handleCreatePartnerAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(formData)) {
      if (!value && !['postcode'].includes(key)) {
        alert("Please complete all areas marked with asterisk!");
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/web/partner_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      //const contentType = response.headers.get("content-type");
      //if (!contentType || !contentType.includes("application/json")) {
      //throw new Error("Server returned non-JSON response. Please try again later.");
      //}

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "pre signup failed");
      }

      Object.keys(data).forEach((key) => {
        setFormData((prev) => ({
          ...prev,
          [key]: data[key], // Use bracket notation for dynamic key
        }));
      });

      setCurrentPage('success');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Enrollment error:", err);
      }
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
      className={`overflow-hidden bg-[#F5F5F5] mt-50 mb-16 text-[16px] px-4 md:px-[130px] ${isLoading ? "cursor-wait" : "cursor-default"
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
                    PrescribeNG Terms & Conditions (PARTNERS)
                  </h1>
                </div>
                <div className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]">
                  {/* PrescribeNG signup terms (summary) */}
                  <div>
                    <p className="block text-sm font-medium text-[#002A40] mb-2">By creating a PrescribeNG account, you agree to the following:</p>

                    <div className="text-xs text-[#002A40] leading-relaxed">
                      <ol className="list-decimal list-inside space-y-3">

                        <li>
                          <strong>Acceptance of Terms</strong><br />
                          By registering to use <strong>PrescribeNG Pharmacy Software</strong>, your pharmacy or organisation agrees to be bound by these Terms and Conditions set by <strong>PrescribeNG LTD</strong>.
                        </li>

                        <li>
                          <strong>Authorised Use</strong><br />
                          The Software is provided to support legitimate pharmacy and healthcare operations, including prescription management, inventory, billing, and reporting. You agree to use the platform only for lawful and professional purposes.
                        </li>

                        <li>
                          <strong>Account Responsibility</strong><br />
                          Your organisation is responsible for maintaining the confidentiality of login credentials and for all activities carried out under your account, including actions by staff members.
                        </li>

                        <li>
                          <strong>Data & Compliance</strong><br />
                          All patient and operational data entered into the Software remains your organisation’s responsibility. You agree to comply with all applicable healthcare, pharmacy, financial, and data protection regulations.
                        </li>

                        <li>
                          <strong>Fees & Suspension</strong><br />
                          Where applicable, subscription or transaction fees must be paid as agreed. PrescribeNG LTD reserves the right to suspend or terminate access in cases of non-payment, misuse, or regulatory breach.
                        </li>

                        <li>
                          <strong>Intellectual Property</strong><br />
                          PrescribeNG Pharmacy Software remains the exclusive property of PrescribeNG LTD. Your organisation is granted a limited, non-transferable license to use the Software during the subscription period.
                        </li>

                        <li>
                          <strong>Limitation of Liability</strong><br />
                          The Software is provided “as is”. PrescribeNG LTD shall not be liable for indirect or consequential losses arising from its use. Total liability shall not exceed fees paid in the preceding three (3) months.
                        </li>

                      </ol>
                    </div>


                    {/* Accessible consent checkbox (recommended for signup) 
                    <div className="mt-3 flex items-start gap-2 text-sm">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-gray-300 text-[#002A40] focus:ring-[#002A40]"
                      />
                      <label htmlFor="acceptTerms" className="text-[#002A40]">
                        I agree to the <a href="/terms" className="underline">Terms &amp; Conditions</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                      </label>
                    </div>*/}
                  </div>


                  <button
                    type="submit"
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                    onClick={() => setSignupFormSubpage("OrganisationForm")}
                  >
                    Accept Terms and Conditions
                  </button>
                </div>
              </div>
            )}

            {SignupFormSubpage === "OrganisationForm" && (
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
                    Partner Signup
                  </h1>
                  <p className="text-[16px] text-center">
                  </p>
                </div>
                <form
                  //onSubmit={handleCreatePartnerAccount}
                  className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    >
                      <option value="" disabled>
                        Select Type Of Organiastion
                      </option>
                      <option value="pharmacy">Pharmacy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Name of Organisation (Trading Name)
                    </label>
                    <input
                      type="text"
                      name="organisation"
                      placeholder="Enter Name of your organisation"
                      required
                      value={formData.organisation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      CAC Reg Number
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      placeholder="Eg RCXXXXXX"
                      required
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Organisation Email
                    </label>
                    <input
                      type="email"
                      name="organisationEmail"
                      placeholder="Enter your email"
                      required
                      value={formData.organisationEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Organisation Telephone
                    </label>
                    <input
                      type="text"
                      name="organisationTelephone"
                      placeholder="Eg RCXXXXXX"
                      required
                      value={formData.organisationTelephone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      State (Where your head office is located)
                    </label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states.map((state) => (
                        <option key={state} value={state}>{state.toUpperCase()} STATE</option>))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Locality
                    </label>
                    <select
                      name="locality"
                      required
                      value={formData.locality}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    >
                      <option value="" disabled>
                        Select Locality
                      </option>
                      {localities.map((locality) => (
                        <option key={locality} value={locality}>{locality}</option>))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      //placeholder="Eg RCXXXXXX"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Postal Code (if known)
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      //placeholder="Eg RCXXXXXX"
                      required
                      value={formData.postcode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      GPS coordinates (if known)
                    </label>
                    <input
                      type="text"
                      name="gps"
                      //placeholder="Eg RCXXXXXX"
                      required
                      value={formData.gps}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Logo (JPG, JPEG, PNG)
                    </label>
                    <input
                      type="file"
                      name="newLogo"
                      onChange={handleChange}
                      accept=".jpg,.jpeg,.png" // Optional: limit to specific file types
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={() => setSignupFormSubpage("KP1Form")}
                    disabled={isLoading}
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                  >
                    Next Page
                  </button>
                </form>
              </div>
            )}

            {SignupFormSubpage === "KP1Form" && (
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
                    First Key Person Details
                  </h1>
                  <p className="text-[16px] text-center">
                  </p>
                </div>
                <form
                  //onSubmit={handleCreatePartnerAccount}
                  className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Title
                    </label>
                    <select
                      name="kp1Title"
                      required
                      value={formData.kp1Title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    >
                      <option value="" disabled>
                        Select Title
                      </option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Last Name (Surname)
                    </label>
                    <input
                      type="text"
                      name="kp1LastName"
                      placeholder="Enter Name of your kp1LastName"
                      required
                      value={formData.kp1LastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      First Name (+ Other names)
                    </label>
                    <input
                      type="text"
                      name="kp1FirstName"
                      placeholder="Enter Name of your kp1FirstName"
                      required
                      value={formData.kp1FirstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Keyperson-1 Email
                    </label>
                    <input
                      type="email"
                      name="kp1Email"
                      placeholder="Enter your email"
                      required
                      value={formData.kp1Email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Keyperson-1 Mobile Number
                    </label>
                    <input
                      type="text"
                      name="kp1Mobile"
                      placeholder="Eg RCXXXXXX"
                      required
                      value={formData.kp1Mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => setSignupFormSubpage("KP2Form")}
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                  >
                    Next Page
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => setSignupFormSubpage("OrganisationForm")}
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                  >
                    Back
                  </button>
                </form>
              </div>
            )}


            {SignupFormSubpage === "KP2Form" && (
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
                    Second Key Person Details
                  </h1>
                  <p className="text-[16px] text-center">
                  </p>
                </div>
                <form
                  onSubmit={handleCreatePartnerAccount}
                  className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Keyperson-2 Title
                    </label>
                    <select
                      name="kp2Title"
                      required
                      value={formData.kp2Title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    >
                      <option value="" disabled>
                        Select Title
                      </option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Keyperson-2 Last Name (Surname)
                    </label>
                    <input
                      type="text"
                      name="kp2LastName"
                      placeholder="Enter Name of your kp2LastName"
                      required
                      value={formData.kp2LastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Keyperson-2 First Name (+ Other names)
                    </label>
                    <input
                      type="text"
                      name="kp2FirstName"
                      placeholder="Enter Name of your kp2FirstName"
                      required
                      value={formData.kp2FirstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Keyperson-2 Email
                    </label>
                    <input
                      type="email"
                      name="kp2Email"
                      placeholder="Enter your email"
                      required
                      value={formData.kp2Email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#002A40] mb-1">
                      Keyperson-1 Mobile Number
                    </label>
                    <input
                      type="text"
                      name="kp2Mobile"
                      placeholder="Eg RCXXXXXX"
                      required
                      value={formData.kp2Mobile}
                      onChange={handleChange}
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => setSignupFormSubpage("KP1Form")}
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                  >
                    Back
                  </button>
                </form>
              </div>
            )}

          </div>
        )}






        {CurrentPage === "error" && (
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
                Account creation successful. Certificates sent to the
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

export default PartnerSignup;
