"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ShareCodeProgress {
  shareCodeReason: string;
  shareCode: string;
  targetAmount: number;
  raisedAmount: number;
  startDate: string;
  endDate: string;
}

interface Patient {
  name: string;
  shareCodeReason: string;
  credit: string;
  image: string;
  shareCode: string;
  location: string;
  shareCodeProgress?: ShareCodeProgress[];
}

interface SaveALifeProps {
  patients: Patient[];
}

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

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
            {patients?.slice(0, 4).map((card, i) => {
              const cardTarget = card.shareCodeProgress?.[0]?.targetAmount ?? 0;
              const cardRaised = card.shareCodeProgress?.[0]?.raisedAmount ?? 0;
              const cardPercent =
                cardTarget > 0
                  ? Math.min(100, Math.round((cardRaised / cardTarget) * 100))
                  : null;

              return (
                <div
                  key={i}
                  className="snap-start flex-shrink-0 w-[320px] md:w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4"
                >
                  <div className="w-[110px] h-[140px] shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <Image
                      className="w-full h-full object-contain"
                      src={card.image}
                      alt={`Photo of ${card.name}`}
                      width={110}
                      height={140}
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="font-montserrat text-[16px] font-bold text-[#002A40] truncate">
                      {card.name}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {card.shareCodeReason}
                    </p>
                    <p className="text-xs text-gray-400">{card.location}</p>

                    {cardPercent !== null ? (
                      <div className="space-y-1">
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0077B6] rounded-full"
                            style={{ width: `${cardPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs font-semibold text-[#002A40]">
                          <span>{formatNaira(cardRaised)} raised</span>
                          <span>{cardPercent}%</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Goal: {formatNaira(cardTarget)}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-[#002A40]">
                          Raised:
                        </span>{" "}
                        {card.credit}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        Code: {card.shareCode}
                      </span>
                      <div
                        onClick={() => {
                          sessionStorage.setItem(
                            "selectedPatient",
                            JSON.stringify(card)
                          );
                          router.push("/save_a_life?");
                        }}
                        className="flex gap-1 items-center cursor-pointer"
                      >
                        <p className="text-[#0077B6] text-sm font-semibold">
                          Donate Now
                        </p>
                        <Image
                          className="w-[18px] h-[18px]"
                          src="/arrow-right.svg"
                          alt="Arrow"
                          width={18}
                          height={18}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
