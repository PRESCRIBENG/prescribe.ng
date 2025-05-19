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
            PrescribeNg LTD is a healthcare technology company that provides digital health solutions, particularly in prescription management, patients records management and safe and secure patient data migration as required by patient and providing integrated healthcare platform where licensed and verified healthcare services providers can connect with patients in need of their services.
            At PrescribeNg, we treamline the prescription process, clinicial appointments and medical referral processes, enhancing patient care, and improving healthcare outcomes through technology. <br/><br/>

            Some potential features and benefits of PrescribeNg LTD solutions include:<br/>

            * Electronic Prescriptions: Simplifying prescription management and reducing errors.<br/>
            * Medication Management: Helping patients adhere to medication regimens.<br/>
            * Clinical Decision Support: Providing healthcare professionals with informed decision-making tools.<br/>
            * Patient Engagement: Enhancing patient-doctor communication and education.<br/>
            * We also assist patients who are unable to afford their healthcare cost in raising funds strictly for the purposes of accessing healthcare services.<br/>
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
