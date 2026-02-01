"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle item click in mobile view
  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white text-black shadow-md mb-8">
      <div className="flex justify-between items-center px-4 xl:px-[130px] py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={91}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="/about"
            className={`${pathname === '/about' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
          >
            About
          </Link>
          {/*<Link
            href="/services"
            className={`${pathname === '/services' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
          >
            Services
          </Link>*/}
          <Link
            href="/become_a_partner"
            className={`${pathname === '/become_a_partner' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
          >
            Become a Partner
          </Link>
          <Link
            href="/top_up"
            className={`${pathname === '/top_up' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
          >
            Top Up
          </Link>
          <Link
            href="/save_a_life"
            className={`${pathname === '/save_a_life' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
          >
            Save a Life
          </Link>
          <Link
            href="/verify_letter"
            className={`${pathname === '/verify_letter' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
          >
            Verify Letter
          </Link>
          <Link
            href="/prescription_search"
            className={`${pathname === '/prescription_search' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
          >
            Search Prescriptions
          </Link>
        </nav>

        {/* Desktop Button */}
        <Link href="/login" className="">
          <button className="hidden lg:block w-[154px] h-[41px] bg-[#0077B6] text-white rounded">
            Clinician Portal
          </button>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block lg:hidden focus:outline-none"
        >
          <Image
            src={isOpen ? "/close.svg" : "/menu.svg"}
            alt="Menu Icon"
            width={28}
            height={28}
            className="transition-transform duration-300"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white text-black flex flex-col items-center pt-4 pb-6 overflow-y-auto max-h-[80vh]">
          <div className="space-y-5 text-center w-full">
            <Link
              href="/about"
              className={`block py-2 ${pathname === '/about' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
              onClick={handleItemClick}
            >
              About
            </Link>
            {/*<Link
              href="/services"
              className={`block py-2 ${pathname === '/services' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
              onClick={handleItemClick}
            >
              Services
            </Link>*/}
            <Link
              href="/become_a_partner"
              className={`block py-2 ${pathname === '/become_a_partner' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
              onClick={handleItemClick}
            >
              Become a Partner
            </Link>
            <Link
              href="/top_up"
              className={`block py-2 ${pathname === '/top_up' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
              onClick={handleItemClick}
            >
              Top Up
            </Link>
            <Link
              href="/save_a_life"
              className={`block py-2 ${pathname === '/save_a_life' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
              onClick={handleItemClick}
            >
              Save a Life
            </Link>
            <Link
              href="/verify_letter"
              className={`block py-2 ${pathname === '/verify_letter' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
              onClick={handleItemClick}
            >
              Verify Letter
            </Link>
            <Link
              href="/prescription_search"
              className={`block py-2 ${pathname === '/prescription_search' ? 'text-[#0077B6]' : ''} hover:text-[#0077B6]`}
              onClick={handleItemClick}
            >
              Search Prescriptions
            </Link>
          </div>

          <Link href="/login" className="mt-6" onClick={handleItemClick}>
            <button className="w-[154px] h-[41px] bg-[#0077B6] text-white rounded">
              Clinician Portal
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;