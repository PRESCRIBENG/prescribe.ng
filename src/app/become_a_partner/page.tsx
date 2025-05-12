"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const BecomeAPartner = () => {
		const [activeIndex, setActiveIndex] = useState(0);
	
		const providers = [
			{
				name: "St. Luke's Specialist Hospital",
				location: "Lagos, Nigeria",
				description:
					"Multispecialty hospital offering advanced surgical and medical care.",
				image: "/image 5.svg",
			},
			{
				name: "MediPlus Pharmacy",
				location: "Abuja, Nigeria",
				description:
					"Trusted pharmacy providing genuine prescription and over-the-counter drugs.",
				image: "/image-4.svg",
			},
			{
				name: "Dr. Adebayo Williams",
				location: "Cardiologist | Enugu, Nigeria",
				description:
					"Heart specialist with 10+ years of experience in cardiovascular treatments",
				image: "/image-5.svg",
			},
			{
				name: "Hope Alive Clinic",
				location: "Port Harcourt, Nigeria",
				description:
					"Affordable primary healthcare and maternity services.",
				image: "/image 6.svg",
			},
			{
				name: "Dr. Fatima Musa",
				location: "Pediatrician | Kano, Nigeria",
				description:
					"Expert child healthcare specialist providing consultations for infants and kids.",
				image: "/image-6.svg",
			},
		];
	
		// Circular array for continuous display
		const getVisibleProviders = () => {
			// Show the current provider
			const visibleProviders = [];
			
			// number of cards to show at once
			const visibleCount = 5;
			
			for (let i = 0; i < visibleCount; i++) {
				const index = (activeIndex + i) % providers.length;
				visibleProviders.push(providers[index]);
			}
			
			return visibleProviders;
		};
	
		// Auto-slide every 5 seconds
		useEffect(() => {
			const interval = setInterval(() => {
				setActiveIndex((current) => (current + 1) % providers.length);
			}, 5000);
			
			return () => clearInterval(interval);
		}, [providers.length]);
	

 
  const become_a_partner = [
    {
      title: "Expand Your Reach",
      text: "Get connected with patients who need medical care and have secured funding.",
    },
    {
      title: "Verified Network",
      text: `Work within a secure system that ensures transparency in healthcare services.`,
    },
    {
      title: " Increase Access to Treatment",
      text: `Help those who otherwise cannot afford medical care.`,
    },
    {
      title: "Seamless Payments",
      text: `Receive payments quickly and securely from funded patients.`,
    },
  ];
  return (
    <div className="relative mt-20">
      {/* Background Image */}
      <div className="relative w-full h-[433px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src="/about.png"
          alt="Background"
          width={1920}
          height={1080}
          priority
        />

        {/* Page title */}
        <div className="absolute inset-0 flex items-center px-6 xl:px-[130px]">
          <div className="space-y-4">
            <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px] text-[#002A40]">
              Become a Prescribeng Partner
            </h1>
            <p className="text-[14px] w-full md:w-[719px] sm:text-[16px]">
              Join our network of trusted healthcare professionals, hospitals,
              and pharmacies to provide life-saving care to those in need.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 xl:px-[130px] py-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap- mt-8">
          {become_a_partner.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:w-full  p-4 rounded-[5px] h-[137px]"
            >
              <div className=" text-center space-y-2 items-center">
                <h2 className="text-[16px] font-bold text-[#002A40]">
                  {item.title}
                </h2>
                <h2 className="text-[16px] w-[100%]  italic text-[#002A40]">
                  {item.text}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden bg-[#FFF1E8] text-[16px] pt-8 px-4 xl:px-[130px]">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-[500px] space-y-6">
            <div className="space-y-[18px] text-[#002A40]">
              <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px]">
                How It Works (Step-by-Step Guide)
              </h1>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                <p>
                  <span className="text-[#002A40] font-bold">
                    Indicate Interest –
                  </span>{" "}
                  Indicate interest by contacting our us at info@prescribe.ng, telling us bits about your organisation as well as attaching relevant registrations and licenses.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                <p>
                  <span className="text-[#002A40] font-bold">
									Get Verified –
                  </span>{" "} Our team reviews and verifies your information.. this involves reaching out to the authorities for a thorough verification and relevant regulatory bodies.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                <p>
                  <span className="text-[#002A40] font-bold">
									Get Onboarded –
                  </span>{" "} Upon successful verification, we would send our recruitment team to your stated address to carry out further physical verifications and to ensure your organisation meets our standard, following which your organisation will be onboarded on our platform
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                <p>
                  <span className="text-[#002A40] font-bold">
									Connect with Patients –
                  </span>{" "}Access a pool of patients who need your services, as well as a guarantee of payments for services rendered.
                </p>
              </div>
            </div>
          </div>

          <div className=" w-full md:w-auto mt-10  flex flex-col items-center">
            {/* Main Image */}
            <Image
              className=""
              src="/hiwpartner.png"
              alt="Main"
              width={450}
              height={409}
              priority
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden  text-[16px] pt-8 px-4 xl:px-[130px]">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* IMAGE BLOCK */}
          <div className="relative w-full md:w-auto flex flex-col items-center">
            {/* Main Image */}
            <Image
              className=""
              src="/partner-with-us.svg"
              alt="Main"
              width={450}
              height={409}
              priority
            />
          </div>					
          <div className="w-full md:w-[500px] space-y-6">
            <div className="space-y-[18px] text-[#002A40]">
              <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px]">
                Who Can Partner With Us
              </h1>
              <div className="flex gap-4 items-start">
                <p>
                  <span className="text-[#002A40] font-bold">
									🔹 Doctors & Specialists –
                  </span>{" "} Provide consultations, diagnoses, and treatments.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <p>
                  <span className="text-[#002A40] font-bold">
									🔹 Hospitals & Clinics –
                  </span>{" "} Offer inpatient and outpatient care for funded patients.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <p>
                  <span className="text-[#002A40] font-bold">
									🔹 Pharmacies –
                  </span>{" "}Access a pool of funded patients who need your services.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <p>
                  <span className="text-[#002A40] font-bold">
									🔹 Laboratories & Diagnostic Centers –
                  </span>{" "}Conduct medical tests for accurate diagnoses.
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>

					<div className="bg-[#F5F5F5] py-8 space-y-8">
						<h1 className="w-full text-[32px] text-center font-montserrat font-extrabold mb-8">
							Healthcare Providers
						</h1>
						
						<div className="relative max-w-screen-full mx-auto">
							<div className="flex justify-center overflow-hidden">
								<div className="flex gap-6 transition-all duration-1000 ease-in-out">
									{getVisibleProviders().map((provider, index) => (
										<div
											key={`${activeIndex}-${index}`}
											className="flex-shrink-0 w-[290px] rounded-[5px]"
										>
											<Image
												className="w-[290px] h-[161px] rounded-t-[5px] object-cover"
												src={provider.image}
												alt={provider.name}
												width={290}
												height={161}
												priority
											/>
											<div className="h-[200px] p-4 space-y-2 bg-white rounded-b-[5px]">
												<p className="font-montserrat text-[16px] font-bold">{provider.name}</p>
												<p className="text-[16px]">{provider.location}</p>
												<p>{provider.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
		
						<div className="relative max-w-screen-full mx-auto">
							<div className="flex justify-center overflow-hidden">
								<div className="flex gap-6 transition-all duration-1000 ease-in-out">
									{getVisibleProviders().map((provider, index) => (
										<div
											key={`${activeIndex}-${index}`}
											className="flex-shrink-0 w-[290px] rounded-[5px]"
										>
											<Image
												className="w-[290px] h-[161px] rounded-t-[5px] object-cover"
												src={provider.image}
												alt={provider.name}
												width={290}
												height={161}
												priority
											/>
											<div className="h-[200px] p-4 space-y-2 bg-white rounded-b-[5px]">
												<p className="font-montserrat text-[16px] font-bold">{provider.name}</p>
												<p className="text-[16px]">{provider.location}</p>
												<p>{provider.description}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
		
			
						<div className="flex justify-center mt-8">
							<button className="w-[194px] h-[42px] bg-[#0077B6] p-2 text-white rounded">
								Join Us
							</button>
						</div>
					</div>
    </div>
  );
};

export default BecomeAPartner;
