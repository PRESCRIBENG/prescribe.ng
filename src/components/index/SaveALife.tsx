"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Patient {
  name: string;
  shareCodeReason: string;
  credit: string;
  image: string;
  shareCode: string;
  location: string;
}

interface SaveALifeProps {
  patients: Patient[];
}

// const SaveALife = () => {

const SaveALife = ({ patients }: SaveALifeProps) => {
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

  return (
    <div className="overflow-hidden bg-[#F5F5F5] text-[16px] p-6 md:p-4 xl:p-[130px] xl:py-[150px]">
      {/* Text section for small screens */}
      <div className="block md:hidden mb-6 space-y-4 text-[#002A40]">
        <h1 className="text-[24px] font-montserrat font-extrabold leading-[36px]">
          Save a Life – Urgent Medical Cases
        </h1>
        <p className="text-[16px]">
          Every fundraising campaign on{" "}
          <span className="font-bold">Prescribeng</span>goes through a strict
          verification process to ensure authenticity. Patients are required to
          submit a valid medical report from a recognized hospital, which is
          carefully reviewed before their campaign is approved and published.
          This process helps protect donors from fraudulent cases and ensures
          that funds go directly to those who genuinely need medical assistance.
          By donating, you are not just giving money, you are giving hope,
          relief, and a chance at life. No matter the amount, your support can
          make a real difference for someone fighting for their health.
          Together, we can save lives.
        </p>
        <button
          onClick={() => router.push("save_a_life")}
          className="w-full bg-[#0077B6] p-2 text-white rounded"
        >
          View More Cases
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        {/* Cards section */}

        <div className="">
          {/* Arrows for small screens only */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <button onClick={scrollLeft} className="p-2">
              <Image
                src="/arrow-left.svg"
                alt="Scroll Left"
                width={24}
                height={24}
              />
            </button>
            <button onClick={scrollRight} className="p-2">
              <Image
                src="/arrow-right.svg"
                alt="Scroll Right"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Carousel (scroll on sm, grid on md+) */}
          <div
            ref={carouselRef}
            // className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide"

            className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide w-full"
          >
            {patients?.slice(0, 4).map((card, i) => (
              // {[
              //   {
              //     name: "Aisha Bello",
              //     need: "Needs ₦1,200,000 for surgery",
              //     raised: "₦450,000 | 37%",
              //     image: "/image 4.svg",
              //   },
              //   {
              //     name: "Michael Adewale",
              //     need: "Needs ₦2,500,000 for kidney transplant",
              //     raised: "₦850,000 | 34%",
              //     image: "/image-3.svg",
              //   },
              //   {
              //     name: "Emeka Onwuchekwa",
              //     need: "Needs ₦2,000,000 for chemotherapy",
              //     raised: "₦740,000 | 40%",
              //     image: "/image-1.svg",
              //   },
              //   {
              //     name: "Fatima Yusuf",
              //     need: "Needs ₦1,500,000 for heart surgery",
              //     raised: "₦900,000 | 37%",
              //     image: "/image-2.svg",
              //   },
              // ].map((card, i) => (
              <div
                key={i}
                className="snap-start flex-shrink-0 w-[234px] md:w-[234px] bg-white rounded-[5px]"
              >
                <Image
                  className="w-[234px] h-[148px] object-cover rounded-t-[5px]"
                  src={card.image}
                  alt={`Image of ${card.name}`}
                  width={234}
                  height={148}
                />

                <div className="p-4 space-y-2">
                  <p className="font-montserrat text-[16px] font-bold">
                    {card.name}
                  </p>
                  <p>
                    <span className="font-bold">Condition: </span>{" "}
                    {card.shareCodeReason}
                  </p>
                  <p>
                    <span className="font-bold">Location: </span>{" "}
                    {card.location}
                  </p>
                  <p>
                    <span className="font-bold">Raised: </span> {card.credit} ✅
                  </p>
                  <p>
                    <span className="font-bold">Share Code: </span>{" "}
                    {card.shareCode}
                  </p>
                  <div
                    onClick={() => {
                      sessionStorage.setItem(
                        "selectedPatient",
                        JSON.stringify(card)
                      );
                      router.push("/save_a_life?");
                    }}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <p className="text-[#0077B6] text-[16px]">Donate Now</p>
                    <Image
                      className="w-[24px] h-[24px]"
                      src="/arrow-right.svg"
                      alt="Arrow"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text section for md+ */}
        <div className="hidden md:block md:w-[500px] space-y-6 text-[#002A40]">
          <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px]">
            Save a Life – Urgent Medical Cases
          </h1>
          <p className="text-[16px]">
            Every fundraising campaign on{" "}
            <span className="font-bold">Prescribeng</span> goes through a strict
            verification process to ensure authenticity. Patients are required
            to submit a valid medical report from a recognized hospital, which
            is carefully reviewed before their campaign is approved and
            published. This process helps protect donors from fraudulent cases
            and ensures that funds go directly to those who genuinely need
            medical assistance. By donating, you are not just giving money, you
            are giving hope, relief, and a chance at life. No matter the amount,
            your support can make a real difference for someone fighting for
            their health. Together, we can save lives.
          </p>
          <button
            onClick={() => router.push("save_a_life")}
            className="w-[194px] h-[42px] bg-[#0077B6] p-2 text-white rounded"
          >
            View More Cases
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveALife;
