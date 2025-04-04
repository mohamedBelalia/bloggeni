import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#076d81] text-white py-6 mt-40">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className="text-sm">&copy; 2025 SEO WISE. All rights reserved.</p>
        <div className="mt-4 flex space-x-4">
          <a href="/about" className="text-sm hover:underline">
            About
          </a>
          <a href="/contact" className="text-sm hover:underline">
            Contact
          </a>
          <a href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
