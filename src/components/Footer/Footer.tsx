import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#076d81] text-white py-6 mt-40">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className="text-sm">&copy; 2025 SEO WISE. All rights reserved.</p>
        <div className="mt-4 flex space-x-4">
          <Link href="/about-us" className="text-sm hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Contact
          </Link>
          <Link href="/terms-and-conditions" className="text-sm hover:underline">
            Terms And Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
