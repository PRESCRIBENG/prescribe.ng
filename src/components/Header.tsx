"use client";

import Image from "next/image";
import ECGLine from "@/components/ECGLine";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";



const Header = () => {
    const router = useRouter();
  
  return (
    <div className="relative w-full h-auto md:h-[684px] bg-[#FFF1E8] text-[16px] p-6 md:p-4 lg:p-[80px] xl:p-[130px] xl:py-[150px] mt-24 md:mb-32">
      {/* ECG Line */}
      <div className="absolute top-[110px] right-[110px] flex items-center gap-2">
        <ECGLine />
      </div>

      <div className="flex flex-col">
        {/* Top content section */}
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2 space-y-4 py-8">
            <p className="text-[24px] text-[#FE6F15] font-bold">prescribe.ng</p>

            <div className="space-y-[19px] text-[#002A40]">
              <h1 className="w-full md:w-[644px] text-[32px] md:text-[40px] font-montserrat font-extrabold leading-[50px]" style={{color:'red'}}>
                Connecting You to Life Saving Care & Support
                {/* THIS WEBSITE IS UNDER CONSTRUCTION */}
              </h1>
              <p className="text-[14px] sm:text-[16px]">
                World-Class Healthcare. Built on Trust. Powered by Connection.
              </p>
            </div>

            <div className="relative">
              <motion.div
                className="absolute top-44 md:top-32 left-[120px]"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/Clip-group-1.svg"
                  alt="Pointing Arrow"
                  width={106}
                  height={74}
                  priority
                />
              </motion.div>
            </div>

            <div className="flex space-x-4 mt-[50px] text-[16px] flex-wrap">
              <Link
                href="../self_signup"
              >
                <button className="w-[119px] h-[57px] bg-[#0077B6] p-2 text-[#ffffff] rounded mb-2 sm:mb-0">
                  Sign Up
                </button>
              </Link>

              <button 
              onClick={() => router.push("become_a_partner")}
              className="w-[213px] h-[57px] p-2 border border-[#0077B6] text-primaryLight rounded"
              
              >
                Become a Partner
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-1/2">
            <div>
              <Image
                className="absolute top-[60px] right-[280px] hidden sm:block"
                src="/shooting-star.svg"
                alt="Next.js logo"
                width={50}
                height={50}
                priority
              />
              <Image
                className="absolute top-[170px] -right-[40px] hidden sm:block"
                src="/fluent_star.svg"
                alt="Next.js logo"
                width={50}
                height={50}
                priority
              />
              <Image
                className="w-[45px] absolute bottom-[90px] right-[150px] md:right-[380px]"
                src="/Vector.svg"
                alt="Next.js logo"
                width={45}
                height={27}
                priority
              />

              <div className="absolute bottom-[70px] -right-[10px] w-[93px] h-[93px] border-[10px] border-[#FE6F15] rounded-[100px]"></div>
            </div>

            {/* Background rectangle */}
            <div className="w-full md:w-[350px] h-[350px] md:h-[400px] bg-[#D9EBF4] mt-12 md:mt-32 rounded-t-[100px]"></div>

            {/* Positioned image */}
            <div className="absolute -top-0 right-[20px] w-full md:w-[397px]">
              <Image
                className="object-cover"
                src="/image 1.svg"
                alt="Next.js logo"
                width={397}
                height={564}
                priority
              />
            </div>

            {/* <div className="w-full md:w-[210px] h-[400px] bg-[#D9EBF4] rounded-t-[100px] mt-12 md:mt-28 relative overflow-visible">
            <Image
                className="w-full md:w-[4870px] object-cover absolute top-4 right-[20px]"
                src="/image 1.svg"
                alt="Next.js logo"
                width={397}
                height={564}
                priority
              />
            </div> */}
          </div>
        </div>

        {/* Bottom info section - Now overlapping the image with negative margin and z-index */}
        <div className="w-full bg-[#0077B6] grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-[32px] rounded-[5px] mt-[2px] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[108px] bg-[#ffffff] rounded flex items-center justify-center">
              <Image
                className="w-[24px]"
                src="/mdi-light_clock.svg"
                alt="Next.js logo"
                width={24}
                height={24}
                priority
              />
            </div>
            <div className="w-full md:w-[272px] justify-center text-[#FFFFFF]">
              <p className="text-[16px] font-semibold">
                24/7 Access to Healthcare
              </p>
              <p className="text-[14px] font-regular">
                Round-the-clock support for patients and healthcare
                professionals. Get help or offer care anytime, anywhere
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[108px] bg-[#ffffff] rounded flex items-center justify-center">
              <Image
                className="w-[24px]"
                src="/verified.svg"
                alt="Next.js logo"
                width={24}
                height={24}
                priority
              />
            </div>
            <div className="w-full md:w-[272px] justify-center text-[#FFFFFF]">
              <p className="text-[16px] font-semibold">
                High-Quality, Verified Care
              </p>
              <p className="text-[14px] font-regular">
                Connect with licensed doctors, hospitals, and pharmacies.
                Reliable healthcare you can trust
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[108px] bg-[#ffffff] rounded flex items-center justify-center">
              <Image
                className="w-[24px]"
                src="/money-bag.svg"
                alt="Next.js logo"
                width={24}
                height={24}
                priority
              />
            </div>
            <div className="w-full md:w-[272px] justify-center text-[#FFFFFF]">
              <p className="text-[16px] font-semibold">
                Every Contribution Saves a Life
              </p>
              <p className="text-[14px] font-regular">
                Your support funds urgent treatments and medical care. Every
                donation brings hope to someone in need
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
