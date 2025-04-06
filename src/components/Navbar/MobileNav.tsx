'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  isAuthenticated: boolean;
}

export default function MobileNav({ isAuthenticated }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(true)} className="text-[#652293] focus:outline-none">
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Full-screen overlay menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col">
          {/* Header with Close Button */}
          <div className="bg-white flex justify-between items-center p-4">
            <span className="text-xl font-bold text-[#652293]">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-[#652293] focus:outline-none">
              <X className="w-8 h-8" />
            </button>
          </div>
          {/* Navigation Links */}
          <div className="flex-grow bg-white p-8 flex flex-col justify-center">
            <ul className="flex flex-col space-y-8 text-center">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-medium hover:text-[#652293] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-medium hover:text-[#652293] transition-colors"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-medium hover:text-[#652293] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-medium hover:text-[#652293] transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
            {/* Authentication Links for non-authenticated users */}
            {!isAuthenticated && (
              <div className="mt-12 flex flex-col space-y-4 text-center">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-[#652293] font-medium hover:text-[#531a7a] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl bg-[#652293] text-white font-medium py-2 px-4 rounded-md inline-block hover:bg-[#531a7a] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
