// import Image from "next/image";

import Header from "@/components/Header";
import AboutUs from "@/components/index/AboutUs";
import HowItWorks from "@/components/index/HowItWorks";
import Discover from "@/components/index/Discover";
import SaveALife from "@/components/index/SaveALife";
import HealthCareProviders from "@/components/index/HealthCareProviders";
import FAQs from "@/components/index/FAQs";
import GetInTouch from "@/components/index/GetInTouch";

export default function Home() {
  return (
    <>
      <main className="mt-20">
        <Header />
        <AboutUs />
        <HowItWorks />
        <Discover />
        <SaveALife />
        <HealthCareProviders />
        <FAQs />
        <GetInTouch />

      </main>
    </>
  );
}
