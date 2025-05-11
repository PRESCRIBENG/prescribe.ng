"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0077B6] text-white">
      <div className="mx-auto px-4 md:px-[130px] py-12">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Subscribe Newsletter
              </h3>
              <p className="text-gray-100">
                Join our mailing list for the latest news and events. We assure
                you that we will not send unnecessary emails.
              </p>
            </div>
            <div className="w-full">
              <form className="relative font-regular">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 rounded-md text-[#FFFFFF] border border-[#E6F1F8]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#0077B6] p-2 rounded-full"
                  aria-label="Submit"
                >
                  <Image
                    src="/arrow-up-right.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Top Up
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Save a Life
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Verify Letter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Neurology
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Cardiology
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Crowdfunding
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Dermatology
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Dentistry
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
              <Image
              src="/social1.svg"
              alt="Company Logo"
              width={32}
              height={32}
              className="mr-2"
            />
                <span>(+234) 803 826 6633</span>
              </li>
              <li className="flex items-start">
              <Image
              src="/social2.svg"
              alt="Company Logo"
              width={32}
              height={32}
              className="mr-2"
            />
                <span>info@prescribe.ng</span>
              </li>
              <li className="flex items-start">
                <Image
                  src="/social3.svg"
                  alt="Company Logo"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                <span>NO. 13 WORUKWO STREET, OFF ST JOHN BUS STOP D/LINE BY ABA ROAD, PORT HARCOURT , RIVERS STATE, NIGERIA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo and Social Links */}
        <div className="flex bg-[#ffffff] text-[#121212] px-4 py-4 mt-8 rounded-md flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Company Logo"
              width={72}
              height={62}
              className="mr-2"
            />
            <h2 className="text-xl font-bold text-[#FE6F15]">prescribe.ng</h2>
          </div>
          <p className="text-center md:text-left">
            © 2025 prescribeng. All Rights Reserved
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <Image
                className="w-[24px] h-[24px] rounded-full"
                src="/ri_facebook-fill.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Image
                className="w-[24px] h-[24px] rounded-full"
                src="/ri_twitter-x-line.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Image
                className="w-[24px] h-[24px] rounded-full"
                src="/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Image
                className="w-[24px] h-[24px] rounded-full"
                src="/ri_linkedin-fill.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        {/* <div className="mt-12 text-center border-t border-blue-400 pt-8">
          <p>
            &copy; {new Date().getFullYear()} HealthConnect. All rights
            reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="#" className="hover:underline text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline text-sm">
              Cookie Policy
            </Link>
          </div> */}
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
