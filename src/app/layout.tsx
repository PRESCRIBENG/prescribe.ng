import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat, Poppins } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "prescribe.ng",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // manifest: "/site.webmanifest",
  // themeColor: "#ffffff",
  // appleWebApp: {
  //   statusBarStyle: "default",
  //   title: "prescribe.ng",
  //   capable: true,
  // },
  // openGraph: {
  //   title: "prescribe.ng",
  //   description: "Connecting You to Life Saving Care & Support",
  //   url: "https://prescribe.ng",
  //   siteName: "prescribe.ng",
  //   images: [
  //     {
  //       url: "https://prescribe.ng/og-image.png",
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  description: "Connecting You to Life Saving Care & Support",
  keywords: [
    "prescribe.ng",
    "prescribe",
    "prescribe ng",
    "prescribe.ng app",
    "prescribe.ng website",
    "prescribe.ng platform",
    "prescribe.ng healthcare",
    "prescribe.ng crowdfunding",
    "prescribe.ng medical needs",
    "prescribe.ng healthcare services",
    "prescribe.ng life saving care",
    "prescribe.ng support",
    "prescribe.ng medical crowdfunding",
    "prescribe.ng healthcare crowdfunding",
    "prescribe.ng medical support",
    "prescribe.ng healthcare support",
    "prescribe.ng medical assistance",
    "prescribe.ng healthcare assistance",
    "prescribe.ng medical care",
    "prescribe.ng healthcare needs",
    "prescribe.ng medical services",
    "prescribe.ng healthcare services",
    "prescribe.ng medical crowdfunding platform",
    "prescribe.ng healthcare crowdfunding platform",
    "prescribe.ng medical support platform",
    "prescribe.ng healthcare support platform",
    "prescribe.ng medical assistance platform",
    "prescribe.ng healthcare assistance platform",
    "prescribe.ng medical care platform",
    "prescribe.ng healthcare needs platform",
    "prescribe.ng medical services platform",
    "prescribe.ng healthcare services platform",
    "prescribe.ng medical crowdfunding website",
    "prescribe.ng healthcare crowdfunding website",
    "prescribe.ng medical support website",
    "prescribe.ng healthcare support website",
    "prescribe.ng medical assistance website",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
    ${geistSans.variable} 
    ${geistMono.variable}           
    ${montserrat.variable}
    ${poppins.variable}
    font-poppins antialiased`}
      >
                <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
