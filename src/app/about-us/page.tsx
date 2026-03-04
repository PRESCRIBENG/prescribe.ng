import Image from "next/image";
import Head from "next/head";

const AboutUs = () => {
  const solutions = [
    {
      icon: "/bitcoin-icons.svg",
      title: "Electronic Medical Records (EMR) Software",
      description:
        "Secure and scalable EMR solutions for hospitals and clinics across Nigeria. Manage patient records, clinical documentation, appointments, and referrals in one centralized system.",
    },
    {
      icon: "/bitcoin-icons.svg",
      title: "Pharmacy Management Software",
      description:
        "Advanced pharmacy software designed to streamline inventory management, prescription processing, sales tracking, and regulatory compliance.",
    },
    {
      icon: "/bitcoin-icons.svg",
      title: "Virtual Clinic Portal",
      description:
        "Enable remote consultations, digital prescriptions, secure messaging, and online appointment scheduling for modern healthcare delivery.",
    },
    {
      icon: "/bitcoin-icons.svg",
      title: "Integrated Healthcare Ecosystem",
      description:
        "Connect hospitals, clinics, pharmacies, and healthcare professionals into one secure digital healthcare network built specifically for Nigeria.",
    },
  ];

  return (
    <>
      <Head>
        <title>
          About Prescribeng | Integrated Healthcare Technology Platform in Nigeria
        </title>
        <meta
          name="description"
          content="Prescribeng is a Nigerian healthcare technology company providing EMR software, pharmacy management systems, and virtual clinic portals for hospitals, clinics, and pharmacies."
        />
        <meta
          name="keywords"
          content="EMR software Nigeria, hospital management system Nigeria, pharmacy management software Nigeria, virtual clinic portal Nigeria, healthcare technology company Nigeria, digital health platform Nigeria"
        />
      </Head>

      <main className="mt-20">

        {/* HERO SECTION */}
        <section className="relative w-full h-[500px] overflow-hidden">
          <Image
            src="/about.png"
            alt="Healthcare technology platform in Nigeria"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#002A40]/80 flex items-center px-6 xl:px-[130px]">
            <div className="max-w-3xl text-white space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Building Nigeria’s Integrated Digital Healthcare Infrastructure
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Prescribeng is a Nigerian healthcare technology company delivering
                secure, scalable, and locally-optimized digital health solutions
                for hospitals, clinics, pharmacies, and healthcare professionals.
              </p>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="bg-[#F8FBFF] px-6 xl:px-[130px] py-20 max-w-6xl mx-auto">
          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-[#002A40]">
              Who We Are
            </h2>

            <p>
              Prescribeng LTD is an integrated healthcare technology platform
              built in Nigeria, for Nigerians. We develop innovative digital
              infrastructure that simplifies healthcare operations, improves
              clinical efficiency, and enhances patient outcomes.
            </p>

            <p>
              Our solutions are designed to meet the realities of the Nigerian
              healthcare ecosystem — from regulatory requirements and operational
              complexity to scalability challenges and digital adoption gaps.
            </p>

            <p>
              We empower hospitals, clinics, pharmacies, and healthcare providers
              with reliable, secure, and intelligent health management systems
              that modernize healthcare delivery across the country.
            </p>
          </div>
        </section>

        {/* OUR SOLUTIONS */}
        <section className="bg-[#F8FAFC] py-20 px-6 xl:px-[130px]">
          <div className="max-w-6xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-center text-[#002A40]">
              Our Healthcare Technology Solutions
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {solutions.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 items-start bg-white shadow-md p-8 rounded-xl hover:shadow-xl transition"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                  <div>
                    <h3 className="font-semibold text-xl text-[#002A40] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY WE EXIST */}
        <section className="py-20 px-6 xl:px-[130px]">
          <div className="max-w-5xl mx-auto space-y-8 text-gray-700 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-[#0077B6] text-center">
              What we do
            </h2>

            <p className="text-lg text-gray-200 leading-relaxed">
              Healthcare systems in Nigeria face operational inefficiencies,
              fragmented patient data, prescription errors, and limited digital
              coordination between providers.
            </p>

            <p className="text-lg text-gray-200 leading-relaxed">
              Prescribeng was founded to bridge these gaps by building an
              integrated, secure, and locally-adapted digital health ecosystem.
              Our mission is to digitize healthcare workflows while maintaining
              the highest standards of data protection, reliability, and
              performance.
            </p>

            <p className="text-lg text-gray-200 leading-relaxed">
              We believe healthcare providers should focus on patient care —
              not administrative complexity.
            </p>
          </div>
        </section>

        {/* OUR MISSION */}
        <section className="bg-[#002A40] text-white py-20 px-6 xl:px-[130px]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Our Mission
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              To accelerate healthcare transformation in Nigeria by delivering
              intelligent, secure, and accessible digital solutions tailored to
              the Nigerian healthcare landscape.
            </p>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="bg-[#FFF1E8] py-16 px-6 xl:px-[130px]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-[#002A40]">
              Partner With Prescribeng
            </h2>
            <p className="text-lg text-gray-700">
              Whether you operate a hospital, clinic, pharmacy, or healthcare
              facility, Prescribeng provides the digital infrastructure you need
              to operate efficiently and scale confidently.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-[#0077B6] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#005f8f] transition">
                Request a Demo
              </button>
              <button className="bg-[#FE6F15] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#d95c0f] transition">
                Contact Our Team
              </button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default AboutUs;