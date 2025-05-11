"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HealthCareProviders = () => {
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

  // Create a circular array for continuous display
  const getVisibleProviders = () => {
    // show current provider and the next few
    const visibleProviders = [];
    
    // How many cards to show at once
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

  return (
    <div className="bg-[#F5F5F5] py-8">
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

      {/* Indicator dots */}
      {/* <div className="flex justify-center gap-2 mt-6">
        {providers.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              activeIndex === index ? "bg-[#0077B6]" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      <div className="flex justify-center mt-8">
        <button className="w-[194px] h-[42px] bg-[#0077B6] p-2 text-white rounded">
          Join Us
        </button>
      </div>
    </div>
  );
};

export default HealthCareProviders;