// import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="overflow-hidden bg-[#F5F5F5] text-[16px] px-5 py-20 md:px-12 xl:px-[130px] md:p-[150px]">
      <Image
        className="w-[34px] -rotate-25 mb-4"
        src="/Vector.svg"
        alt="Vector"
        width={34}
        height={20}
        priority
      />

      <div className="flex flex-col sm:flex-row items-start justify-between gap-10">
        {/* Image section */}
        <div className="flex-shrink-0">
          <Image
            className="rounded-[5px] w-full sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[480px] h-auto object-cover"
            src="/image.svg"
            alt="About Image"
            width={480}
            height={403}
            priority
          />
        </div>

        {/* Text section */}
        <div className="flex-1 space-y-6 text-[#002A40] mt-6 sm:mt-0">
          <div className="space-y-[18px]">
            <h1 className="text-[28px] sm:text-[32px] font-montserrat font-extrabold leading-[40px] sm:leading-[50px]">
              About Us
            </h1>
            <p className="text-[14px] sm:text-[16px]">
              At Prescribeng, we believe that everyone deserves access to
              quality healthcare, regardless of their financial situation. Our
              platform connects patients in need with compassionate donors and
              dedicated healthcare professionals. Through crowdfunding,
              partnerships, and innovative solutions, we’re building a community
              that saves lives and transforms healthcare delivery. Join us in
              making a difference, one life at a time.
            </p>
          </div>
          <button className="w-[140px] h-[42px] bg-[#0077B6] text-white rounded">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
