"use client";

import { useState, useEffect } from "react";

const SelfSignup = () => {
  const [CurrentPage, setCurrentPage] = useState('');
  const [SignupFormSubpage, setSignupFormSubpage] = useState('instructions');  //shows the terms and conditions as well as instructions on how to signup
  const [formData, setFormData] = useState({    //formData will be passed back and forth to the backend to make modifications on it, while screen visibility is determined by what changes the backend has made
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
  });
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = 'https://gelataskia.prescribe.ng/web';
  //const backendUrl = 'http://127.0.0.1:5002/web';


  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (e.target.name === 'fileAttachment' && e.target instanceof HTMLInputElement && e.target.files?.[0]) {
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
      try {
        setIsLoading(true);
        const statusDataResponse = await fetch(`${backendUrl}/pre_signup`, {
          method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
         })
        
         if (statusDataResponse.ok){
          const statusData = await statusDataResponse.json();

          Object.keys(statusData).forEach((key) => {
            setFormData((prev) => ({
              ...prev,
              [key]: statusData[key], // Use bracket notation for dynamic key
            }));
          });

          if(statusData.routeTo!==CurrentPage){
            setCurrentPage(statusData.routeTo);   //We let the backend determine what screen is visible at every given time
          }
         }
      } catch (error) {
      console.error("Status and Screen Update error:", error);
      //alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
    };
  
    screenManager();
  }, [formData.routeTo, refresh]);
  

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
      const preEnrolmentResponse = await fetch(`${backendUrl}/pre_signup`, {
        method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       })
   
       if(preEnrolmentResponse.ok){
          const data = await preEnrolmentResponse.json();

        Object.keys(data).forEach((key) => {
          setFormData((prev) => ({
            ...prev,
            [key]: data[key], // Use bracket notation for dynamic key
          }));
        });

        if(data.routeTo==='paygate'){   //take user to paystack page if backend indicates user needs to pay
          try {
            if (!window.PaystackPop) {
              alert("Payment gateway not loaded. Please refresh the page.");
              return;
            }
      
            if (!data?.paystackPublicKey || !data?.amount || !data?.metaPayload.idNumber || !data?.metaPayload.ppn ) {
              alert("Incomplete payment data. Please try again.");
              return;
            }
      
            const paystackAmount = parseInt(data.amount) //Already converted to kobo from backend;
      
            const handler = window.PaystackPop.setup({
              key: data.paystackPublicKey,
              email: data.email,
              amount: paystackAmount,
              currency: "NGN",
              reference: data.metaPayload.ppn,    //We use the same ppn generated as our payment reference, so that we can track transaction status in real time at any stage
              metadata: data.metaPayload,
              callback: (response: { reference: string }) => {
                //setFormData((prev) => ({
                  //...prev,
                  //reference: response.reference,
                  //routeTo: 'verification',        //the 'useEffect' function that manages screens also makes a post request to backend whenever there is a change, in order to get the latest status of the signup process
                //}));
                console.log("Payment complete:", response);
                setRefresh(prev=>!prev);  // Trigger a rerendering of the the screenManager to go to backEnd and retrieve signup data.
              },
              onClose: () => {
                alert("Transaction cancelled.");
                setRefresh(prev=>!prev);
              },
            });
      
            handler.openIframe();
          } catch (error) {
            console.error("Payment error:", error);
            alert("An error occurred. Please try again.");
          }
        }
       } else {
        const err = await preEnrolmentResponse.json();
        alert(err.message);
       }
       
       
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally{
      setIsLoading(false);
    }
  };




  //This function sends formData to backend where user data is extracted and user records updated accordingly
  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updatedFormData = { ...formData };  // Clone formData
  
      // Convert fileAttachment to base64
      if (formData.fileAttachment instanceof File) {
        const file = formData.fileAttachment;
        const base64 = await convertFileToBase64(file);
        updatedFormData.fileAttachment = base64;  // Replace file with base64 string
      }
  
      const otpResponse = await fetch(`${backendUrl}/self_signup_verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (otpResponse.ok) {
        const data = await otpResponse.json();
        console.log(data);
        setCurrentPage('success');
      } else {
        const err = await otpResponse.json();
        alert(err.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally{
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
    className={`overflow-hidden bg-[#F5F5F5] mt-50 mb-16 text-[16px] px-4 md:px-[130px] ${isLoading ? 'cursor-wait' : 'cursor-default'}`}
    >
      <div className="md:flex md:flex-col items-center space-y-8">
      
        {CurrentPage==='' && (<div className="bg-white space-y-6">

          {SignupFormSubpage==='instructions' && (<div>
            <div className="space-y-[16px] text-[#002A40]">
              <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
                TERMS AND  CONDITIONS (read carefully).
                </h1>
            </div>
            <div className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]">
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  <b>Requirements:</b> <br/>
                  * PrescribeNg services is currently open to only Nigerians and Nigerian residents with NIN <br/>
                  * User must first generate a virtual NIN from the NIMC app or from the registered mobile number before proceeding with the vendor ID - &apos;715461&apos; <br/>
                    DIAL *346*3*YOUR_NIN*715461# <br/>
                  * Intending users must have access to the Nigerian mobile number linked to their NIN <br/>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  <b>How we use your data:</b> <br/>
                  * PrescribeNg is an e-commerce-styled healthcare platform where qualified, licensed and thoroughly vetted healthcare services providers/personnels meet healthcare services users <br/>
                  * Data access and visibility is strictly consent based. We restrict the viewing of
                    your data to only the heathcare services providers you have authorized, and only to the right personnels. <br/>
                  * Users can authorize access at their own <br/>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  <b>Safety Precautions:</b> <br/>
                  * At PrescribeNG our aim is to put you in control of your healthcare data, and to keep you safe as you navigate through the journey of seeking healthcare in Nigeria, 
                    ensuring you would only ever come across licensed and thoroughly vetted healthcare services providers and personnels 
                    through our vigorous and multi-layered vetting and verification procedures <br/>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  <b>Fraud Prevention:</b> <br/>
                  * PrescribeNg Healthcare platform frowns at any attempts at impersonations and has taken all necessary measures to discourage impersonation. <br/>
                  * Where it has been determined that an impersonation attempt has occured, PrescribeNG LTD WILL pursue a criminal prosecution against perpetrators <br/>
                  * Occasionally we do assist patients who required urgent life-saving medical treatments but are not able to afford it... on such occasions,
                   we carry out detailed background checks and verification of claims provided by such patients. Only upon successful verification of such claims
                    do we grant approval for such fund raisers through our <b>SAVE A LIFE</b> initiative. <br/>
                  * Funds raised under the save a life initiative are neither transferrable or withdrawable to any bank account, but can only be directly used in settling
                    cost of healthcare services at point of care.
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  <b>Warning:</b> <br/>
                  * We do charge a token of ₦1,500 at signup... this is to cover the cost of verification of the data provided to us, before approving users on our platform <br/>
                  * Providing an invalid/incorrect details would lead to the failure of the authentication processes, in which case we would not be able to issue a refund.<br/>
                  * Where a user has failed to supply us with the correct OTPs after 3 attempts, such signup attempt is invalidated and user would have to start afresh.<br/>
                  * Only procede to the next page if you accept our terms and conditions.
                </label>
              </div>

                <button
                  type="submit"
                  className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                  onClick={()=>setSignupFormSubpage('signupForm')}
                >
                  Accept Terms and Conditions
                </button>
              </div>
          </div>)}

          {SignupFormSubpage==='signupForm' && (<div>
            <div className="space-y-[16px] text-[#002A40]">
              <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
                Self Signup
                </h1>
                <p className="text-[16px] text-center">
                Easily add funds for yourself or a loved one to access medical care when needed.
              </p>
            </div>
              <form onSubmit={handlePreEnrollment} className="w-full md:w-[790px] px-8 py-8 space-y-8 text-[#002A40]">
                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Title
                  </label>
                  <select
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    //placeholder="Enter your full name"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    City/Town
                  </label>
                  <input
                    type="text"
                    name="locality"
                    placeholder="Enter your City/Town"
                    required
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    State of residence
                  </label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    <option value="Federal Capital Territory">Federal Capital Territory</option>
                    <option value="Abia">Abia</option>
                    <option value="Adamawa">Adamawa</option>
                    <option value="Akwa Ibom">Akwa Ibom</option>
                    <option value="Anambra">Anambra</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Ebonyi">Ebonyi</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nasarawa">Nasarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Sokoto">Sokoto</option>
                    <option value="Taraba">Taraba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamfara</option>
                  </select>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Mobile Number (Must be same number associated with your NIN)
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Virtual NIN
                  </label>
                  <input
                    type="text"
                    name="vnin"
                    placeholder="Enter your virtual idNumber generated from NIMC app or NIMC website"
                    required
                    value={formData.vnin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    accept=".jpg,.jpeg,.png"  // Optional: limit to specific file types
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>


                <button
                  type="submit"
                  className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
                >
                  Submit
                </button>
              </form>
          </div>)}

        </div>)}


        
        {CurrentPage==='paygate' && (<div className="bg-white space-y-6">
          
          <div className="space-y-[16px] text-[#002A40]">
          <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
            Paygate
            </h1>*
            <p className="text-[16px] text-center text-green-600">
            Easily add funds for yourself or a loved one to access medical care when needed.
          </p>
          </div>
          
        </div>)}


        {CurrentPage==='verification' && (<div className="bg-white space-y-6">
          
          <div className="space-y-[16px] text-[#002A40]">
          <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
            Verification
            </h1>*
            <p className="text-[16px] text-center">
            Please enter OTP sent to your email and the phone number associated with your NIN
          </p>
          </div>
            <form onSubmit={handleOTPVerification} className="w-full md:w-[790px] px-8 py-8 space-y-8">
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  OTP from {formData.registeredEmail}
                </label>
                <input
                  type="text"
                  name="otpEmail"
                  placeholder="Enter OTP"
                  required
                  value={formData.otpEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  OTP from {formData.registeredMobileNumber}
                </label>
                <input
                  type="text"
                  name="otpMobile"
                  placeholder="Enter OTP"
                  required
                  value={formData.otpMobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#e35c00] transition"
              >
                Verify
              </button>
            </form>
        </div>)}


        {CurrentPage==='success' && (<div className="bg-white space-y-6">
          <div className="space-y-[16px] text-[#002A40]">
          <h1 className="text-[32px] font-extrabold text-center leading-[50px]">
            Success Page
            </h1>*
            <p className="text-[16px] text-center">
            Account creation successful and certificate sent to the registered email 
            </p>

            <p>
              You can view and manage your healthcare appointments and that of your dependants on patient.prescribe.ng. <br/>

              For any technical hitches, please contact on on support@prescribe.ng
            </p>
          </div>
        </div>)}

      </div>
    </div>
  );
};

export default SelfSignup;
