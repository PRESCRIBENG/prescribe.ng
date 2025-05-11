import Image from "next/image";

const Header = () => {
  return (
    <div className="relative overflow-hidden bg-[#FFF1E8] text-[16px] pt-8 pr-0 md:pb-0 pl-6 xl:pl-[130px] xl:pl-[130px]">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* TEXT BLOCK */}
        <div className="w-full md:w-[500px] space-y-6">
          <div className="space-y-[18px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px]">
              How It Works
            </h1>
            <div className="flex gap-4">
            <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
            <p>
                Register as a patient, donor, or healthcare professional. Patients upload a verified medical report, while healthcare providers submit credentials.
              </p>
            </div>
            <div className="flex gap-4">
            <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
            <p>
                Patients create fundraising requests, and donors browse verified cases to contribute securely. Every donation goes directly to medical expenses.
              </p>
            </div>
            <div className="flex gap-4">
            <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
            <p>
                Patients receive funds for treatment, while registered healthcare professionals offer their services to those in need.
              </p>
            </div>
          </div>
          <button className="w-[119px] h-[42px] bg-[#0077B6] p-2 mb-4 text-white rounded">
            Get Started
          </button>
        </div>

        {/* IMAGE BLOCK */}
        <div className="relative w-full md:w-auto mt-10 md:mt-0 flex flex-col items-center">
          {/* Heart Image: Normal on mobile, absolute on md+ */}
          <Image
            className="z-10 mb-[-20px] md:mb-0 md:absolute md:right-[300px] md:top-[40px]"
            src="/heart_rate.svg"
            alt="Heart Rate"
            width={217}
            height={68}
            priority
          />
          {/* Main Image */}
          <Image
            className="rounded-[5px] z-0"
            src="/Frame 25.svg"
            alt="Main"
            width={503}
            height={654}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
