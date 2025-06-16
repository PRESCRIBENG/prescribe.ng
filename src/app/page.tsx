// import Image from "next/image";

import Header from "@/components/Header";
import AboutUs from "@/components/index/AboutUs";
import HowItWorks from "@/components/index/HowItWorks";
import Discover from "@/components/index/Discover";
import SaveALife from "@/components/index/SaveALife";
import HealthCareProviders from "@/components/index/HealthCareProviders";
import FAQs from "@/components/index/FAQs";
import GetInTouch from "@/components/index/GetInTouch";
import { getSaveALifeData } from "./lib/save_a_life";

export default async function Home() {
    let patients = [];
  
  try {
    patients = await getSaveALifeData();
    console.log('Display Patients in Home:', patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
  }

  return (
    <>
      <main className="mt-20">
        <Header />
        <AboutUs />
        <HowItWorks />
        <Discover />
        {/* <SaveALife /> */}
        <SaveALife patients={patients} />

        <HealthCareProviders />
        <FAQs />
        <GetInTouch />

      </main>
    </>
  );
}
