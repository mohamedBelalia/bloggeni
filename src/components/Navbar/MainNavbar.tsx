'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';

const MainNavbar = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-md md:px-40 py-4 gap-10 flex justify-between items-center w-full">
      <div className="flex items-center space-x-4">
        <Image  
          src="/templogo.png" 
          alt="test" 
          width={150} 
          height={150} />
      </div>
      <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${mobileMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:static md:flex md:items-center md:space-x-6 md:w-auto md:translate-x-0 md:shadow-none p-4 md:p-0`}
      >
        <div className="relative group">
          <button
            className="flex items-center space-x-1 hover:[#652293] w-full md:w-auto"
            onMouseEnter={() => setDropdown('products')}
            onMouseLeave={() => setDropdown(null)}
          >
            <span>Products</span>
            <ChevronDown size={16} />
          </button>
          {dropdown === 'products' && (
            <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md p-2 md:block hidden" onMouseEnter={() => setDropdown('products')} onMouseLeave={() => setDropdown(null)}>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Product 1</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Product 2</Link>
            </div>
          )}
        </div>
        <div className="relative group">
          <button
            className="flex items-center space-x-1 hover:[#652293] w-full md:w-auto"
            onMouseEnter={() => setDropdown('resources')}
            onMouseLeave={() => setDropdown(null)}
          >
            <span>Resources</span>
            <ChevronDown size={16} />
          </button>
          {dropdown === 'resources' && (
            <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md p-2 md:block hidden" onMouseEnter={() => setDropdown('resources')} onMouseLeave={() => setDropdown(null)}>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Resource 1</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Resource 2</Link>
            </div>
          )}
        </div>
        <Link href="#" className="hover:text-[#652293] block md:inline">Pricing</Link>
        <Link href="#" className="text-[#652293] block md:inline">Sign in</Link>
        <Link href="#" className="bg-[#652293] text-white px-4 py-2 rounded-md block md:inline">Get Started</Link>
      </div>
    </nav>
  );
};

export default MainNavbar;