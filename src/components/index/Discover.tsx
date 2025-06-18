"use client";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleNavigation = (index: number) => {
    if (index === 0) {
      router.push("/save_a_life");
    } else if (index === 1) {
      router.push("/become_a_partner");
    } else if (index === 2) {
      router.push("/verify_letter");
    }
  };

  return (
    <div className="overflow-hidden text-[16px] p-6 md:p-4 lg:p-[80px] xl:p-[130px] xl:py-[150px]">
      <div className="space-y-[45px] flex flex-col justify-center text-[#002A40]">
        <h1 className="w-[740px] mx-auto text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
          Discover the tools and services that make healthcare accessible for
          everyone.
        </h1>

        {/* Navigation arrows for mobile only */}
        <div className="flex items-center justify-between mt-4 md:hidden">
          <button onClick={scrollLeft} className="p-2">
            <Image src="/arrow-left.svg" alt="Left" width={24} height={24} />
          </button>
          <button onClick={scrollRight} className="p-2">
            <Image src="/arrow-right.svg" alt="Right" width={24} height={24} />
          </button>
        </div>

        {/* Carousel wrapper */}
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-full min-w-full md:min-w-0 gap-2 text-center border border-[#FE6F15] rounded-[5px] p-4 flex flex-col items-center justify-center"
            >
              <p className="text-[16px] font-montserrat">
                {i === 0 && "Crowdfund for Patients"}
                {i === 1 && "Healthcare Partnerships"}
                {i === 2 && "Verify Medical Reports"}
              </p>

              <Image
                className="w-[50px] h-[50px]"
                src={
                  i === 0 ? "/mingcute_love-fill.svg" : "/mdi_partnership.svg"
                }
                alt="Icon"
                width={50}
                height={50}
                priority
              />

              <p className="w-full lg:w-[280px] text-[16px]">
                {i === 0 &&
                  "Help those in need by contributing to their medical expenses"}
                {i === 1 &&
                  "Join us as a healthcare professional or institution."}
                {i === 2 && "Ensure the authenticity of medical documents."}
              </p>

              <div
                onClick={() => handleNavigation(i)}
                className="flex gap-2 items-center justify-center"
              >
                <p className="text-[16px] text-[#0077B6]">
                  {i === 0 && "Donate Now"}
                  {i === 1 && "Become a Partner"}
                  {i === 2 && "Verify Now"}
                </p>
                <Image
                  className="w-[24px] h-[24px]"
                  src="/arrow-right.svg"
                  alt="Arrow"
                  width={24}
                  height={24}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
