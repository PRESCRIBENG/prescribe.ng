"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HealthCareProviders = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [serviceProviders, setServiceProviders] = useState([
    {
      organisation: "St. TEST Hospital",
      location: "Lagos, Nigeria",
      description:
        "Multispecialty hospital offering advanced surgical and medical care.",
      image: "/image 5.svg",
    },
  ]);


  useEffect(() => {
   
    const handleFetchRandomPatientsInNeed = async () => {
      
      try {
        const res = await fetch(
          `/api/web/service_providers`,
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

        const data = JSON.parse(raw) as { serviceProviders: [] };

        if (!res.ok) {
          throw new Error(data as unknown as string);
        }

        setServiceProviders(data.serviceProviders);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Fetch error:", err.message);
        } else {
          console.error("Unknown error occurred");
        }
      }
    };

    handleFetchRandomPatientsInNeed();
  }, []);

  // Create a circular array for continuous display
  const getVisibleProviders = () => {
    // show current provider and the next few
    const visibleProviders = [];
    
    // How many cards to show at once
    const visibleCount = 5;
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % serviceProviders.length;
      visibleProviders.push(serviceProviders[index]);
    }
    
    return visibleProviders;
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % serviceProviders.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [serviceProviders.length]);

  return (
    <div className="bg-[#F5F5F5] py-8">
      <h1 className="w-full text-[32px] text-center text-black font-montserrat font-extrabold mb-8">
        Our Partner Healthcare Providers
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
                  alt={provider.organisation}
                  width={290}
                  height={161}
                  priority
                />
                <div className="h-[200px] p-4 space-y-2 bg-white rounded-b-[5px]">
                  <p className="font-montserrat text-[16px] font-bold">{provider.organisation}</p>
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
        {serviceProviders.map((_, index) => (
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