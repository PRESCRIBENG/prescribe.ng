import Image from "next/image";

const About = () => {
  const features = [
    {
      icon: "/bitcoin-icons.svg",
      title: "Verified Medical Cases –",
      description:
        "Every fundraising request is carefully reviewed and approved before being published.",
    },
    {
      icon: "/bitcoin-icons.svg",
      title: "Trusted Healthcare Providers –",
      description:
        "We work with licensed medical professionals and institutions.",
    },
    {
      icon: "/bitcoin-icons.svg",
      title: "Secure & Seamless Donations –",
      description:
        "Donors can contribute with confidence, knowing their funds are making a real impact.",
    },
    {
      icon: "/bitcoin-icons.svg",
      title: "Empowering Healthcare Professionals –",
      description:
        "Doctors, hospitals, and pharmacies can join our network to provide life-saving care.",
    },
  ];

  const meetTheTeam = [
    {
      icon: "/image8.png",
      title: "Dr. Jane Doe",
      subTitle: "Co-Founder & Healthcare Advisor",
      description:
        "With over 15 years of experience in healthcare, Dr. Jane is passionate about making medical care accessible to all",
    },
    {
      icon: "/image.png",
      title: "John Smith",
      subTitle: "Co-Founder & Tech Lead",
      description:
        "John is a seasoned software engineer with over a decade of experience in building scalable and secure platforms...",
    },
    {
      icon: "/image-1.png",
      title: "Sarah Johnson",
      subTitle: "Head of Partnerships",
      description:
        "Sarah brings a wealth of experience in healthcare management and strategic partnerships. She is dedicated to building...",
    },
  ];
  const reviews = [
    {
      review:
        '"When my son was diagnosed with a critical heart condition, we had no idea how we would afford the surgery. Thanks to Prescribeng, we raised the needed funds in just two weeks. Today, he is healthy and strong! I am forever grateful."',
      reviewer: "Aisha O., Abuja",

      description:
        "With over 15 years of experience in healthcare, Dr. Jane is passionate about making medical care accessible to all",
    },
    {
      review: `"I was hesitant about online fundraising, but Prescribeng's verification process gave me confidence. Every donation I received went directly to my treatment, and now I'm on my way to recovery. Thank you for giving me hope!`,
      reviewer: "John Smith",

      description:
        "John is a seasoned software engineer with over a decade of experience in building scalable and secure platforms...",
    },
    {
      review: `"I’ve always wanted to help people in need, but I didn’t know how. Prescribeng made it simple and transparent. Seeing the progress of the patients I donate to gives me so much fulfillment!"`,
      reviewer: "Sarah Johnson",

      description:
        "Sarah brings a wealth of experience in healthcare management and strategic partnerships. She is dedicated to building...",
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
          <h1 className="text-[32px] font-montserrat font-extrabold leading-[50px] text-[#002A40]">
            About
          </h1>
        </div>
      </div>

      <div className="px-6 xl:px-[130px] py-12 space-y-16">
        <div className="items-center space-y-3">
          <h1 className="text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
            Welcome to <span className="text-[#FE6F15]">prescribeng</span>
          </h1>
          <p className="text-[16px]">
          PrescribeNg LTD is a healthcare technology company that provides digital health solutions, particularly in prescription management, patients records management and safe and secure patient data migration as required by patient and providing integrated healthcare platform where licensed and verified healthcare services providers can connect with patients in need of their services.
            At PrescribeNg, we treamline the prescription process, clinicial appointments and medical referral processes, enhancing patient care, and improving healthcare outcomes through technology. <br/><br/>

            Some potential features and benefits of PrescribeNg LTD's solutions include:<br/>

            * Electronic Prescriptions: Simplifying prescription management and reducing errors.<br/>
            * Medication Management: Helping patients adhere to medication regimens.<br/>
            * Clinical Decision Support: Providing healthcare professionals with informed decision-making tools.<br/>
            * Patient Engagement: Enhancing patient-doctor communication and education.<br/>
            * We also assist patients who are unable to afford their healthcare cost in raising funds strictly for the purposes of accessing healthcare services.<br/>
          </p>
        </div>

        <div className="overflow-hidden bg-[#FFF1E8] text-[16px] px-5 py-10 md:px-5 md:py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 lg:gap-24">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Image
                src="/fluent_star.svg"
                alt="Star icon"
                width={50}
                height={50}
                priority
              />
              <h1 className="text-[28px] sm:text-[32px] font-montserrat font-extrabold leading-[40px] sm:leading-[50px]">
                Our Mission
              </h1>
            </div>

            {/* Text section - full width with proper padding */}
            <div className="w-full md:w-[630px] md:flex-1 justify-between mt-6 md:mt-0">
              <div className=" flex  relative bg-white p-4 md:p-6 text-[#002A40]">
                {/* Quotation mark positioned at the end */}
                <div className="flex justify-end -top-[10px] right-4 absolute">
                  <Image
                    src="/Vector.svg"
                    alt="Quotation mark"
                    width={34}
                    height={20}
                    priority
                  />
                </div>
                <p className=" text-[14px] sm:text-[16px]">
                  At Prescribeng, our mission is to bridge the gaps in healthcare services using home grown technologies tailore to the Nigerian environment.

                  Our platform is built on trust and connections, and we ensure tranparency in all our processes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* TEXT BLOCK */}
          <div className="w-full space-y-6">
            <div className="space-y-[18px] text-[#002A40]">
              <h1 className="text-[32px] flex justify-center font-montserrat font-extrabold leading-[50px]">
                What We Do
              </h1>
              <div className=" grid grid-cols-1 md:grid-cols-2 justify-between w-full gap-4 md:gap-8 lg:gap-12 mt-8">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                  <p>
                    <span className="text-[#002A40] font-bold">
                      Medical Crowdfunding:
                    </span>{" "}
                    We help patients facing financial barriers raise funds for
                    urgent medical treatments.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                  <p>
                    <span className="text-[#002A40] font-bold">
                      Medical Report Verification:
                    </span>{" "}
                    We provide a tool to authenticate medical reports, reducing
                    fraud and ensuring trust within the system.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                  <p>
                    <span className="text-[#002A40] font-bold">
                      Trusted Healthcare Network:
                    </span>{" "}
                    We connect patients with verified doctors, pharmacies, and
                    hospitals to ensure they receive proper medical care.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                  <p>
                    <span className="text-[#002A40] font-bold">
                      Secure & Transparent Giving:
                    </span>{" "}
                    Every campaign undergoes a strict verification process,
                    ensuring donations go directly toward genuine medical needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-[#FFF1E8] text-[16px] px-5 py-10 md:px-5 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-[500px] space-y-6">
              <div className="space-y-[18px] text-[#002A40]">
                <h1 className="text-[32px] text-center md:text-left font-montserrat font-extrabold leading-[50px]">
                  Why Choose Prescribeng?
                </h1>

                {features.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={48}
                        height={48}
                        priority
                      />
                    ) : (
                      <div className="flex-shrink-0 w-[25px] h-[25px] border-[5px] border-[#FE6F15] rounded-full" />
                    )}
                    <p>
                      <span className="text-[#002A40] font-bold">
                        {item.title}{" "}
                      </span>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGE BLOCK */}
            <div className="relative w-full md:w-auto mt-10 md:mt-0 flex flex-col items-center">
              <Image
                className="rounded-[5px]"
                src="/choose-us.png"
                alt="Main"
                width={463}
                height={394}
                priority
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="flex justify-center text-[32px] font-montserrat font-extrabold leading-[50px] text-[#002A40]">
            Meet the Team
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12 mt-8">
            {meetTheTeam.map((item, index) => (
              <div key={index} className="">
                <div className="bg-white p-2 rounded-[5px]">
                  <Image
                    className="w-full md:w-[342px] h-[220px] flex-justify-center "
                    src={item.icon}
                    alt={item.title}
                    width={342}
                    height={220}
                    priority
                  />
                  <div className="space-y-2 mt-4">
                    <h2 className="text-[16px] font-bold text-[#002A40]">
                      {item.title}
                    </h2>
                    <h2 className="text-[16px] italic text-[#002A40]">
                      {item.subTitle}
                    </h2>

                    <p className="text-[16px] text-[#002A40]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#FFF1E8] px-6 xl:px-[130px] py-12 space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-center md:text-left text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
            Join Us In Making a Difference
          </h1>
          <p className="text-center md:text-left text-[16px]">
            Whether you’re a patient, donor, or healthcare professional, your
            contribution matters.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button className="bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]">
            I need help
          </button>
          <button className="bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]">
            I want to help
          </button>
        </div>
      </div>

      <div className="space-y-6 py-12  overflow-hidden">
        <h1 className="text-[32px] font-montserrat font-extrabold flex justify-center leading-[50px] text-[#002A40]">
          What People Are Saying About Prescribeng
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
          {reviews.map((item, index) => (
            <div key={index} className="">
              <div className="bg-white p-2 rounded-[5px]">
                <div className="w-full px-4  h-[313px] text-center space-y-5 py-16 items-center">
                  <h2 className="text-[16px] w-full  italic text-[#002A40]">
                    {item.review}
                  </h2>
                  <div className="space-y-2">
                    <Image
                      className="w-[85px] flex justify-center items-center h-[17px]"
                      src="/ratings.svg"
                      alt="ratings"
                      width={85}
                      height={17}
                    />
                    <h2 className="text-[16px] font-bold text-[#002A40]">
                      {item.reviewer}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
