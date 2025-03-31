// 'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { createClient } from "@/utils/supabase/server";
import LogoutButton from './LogoutButton';
import EmailAvatar from './EmailAvatar';

const MainNavbar = async () => {
  // const [dropdown, setDropdown] = useState<string | null>(null);
  // const [mobileMenu, setMobileMenu] = useState(false);

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();


  return (
    <nav className="bg-white shadow-md md:px-40 py-4 gap-10 flex justify-between items-center w-full">
      <div className="flex items-center space-x-4">
        <Image  
          src="/templogo.png" 
          alt="test" 
          width={150} 
          height={150} />
      </div>
      <button className="md:hidden">
        { <Menu size={24} />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform translate-x-0 transition-transform duration-300 ease-in-out md:static md:flex md:items-center md:space-x-6 md:w-auto md:translate-x-0 md:shadow-none p-4 md:p-0`}
      >
        <div className="relative group">
          <button
            className="flex items-center space-x-1 hover:[#652293] w-full md:w-auto"
          >
            <span>Products</span>
            <ChevronDown size={16} />
          </button>
        </div>
        <div className="relative group">
          <button
            className="flex items-center space-x-1 hover:[#652293] w-full md:w-auto"
          >
            <span>Resources</span>
            <ChevronDown size={16} />
          </button>
        </div>
        <Link href="#" className="hover:text-[#652293] block md:inline">Pricing</Link>
        {
          error || !data?.user
          ? <div>
            <Link href="#" className="text-[#652293] block md:inline">Sign in</Link>
            <Link href="#" className="bg-[#652293] text-white px-4 py-2 rounded-md block md:inline">Get Started</Link>
          </div>
          : <div>
              <LogoutButton />
              {/* <EmailAvatar email={data.user.email ?? ""} /> */}
          </div>
        }
      </div>
    </nav>
  );
};

export default MainNavbar;