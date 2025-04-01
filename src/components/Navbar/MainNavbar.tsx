// 'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { createClient } from "@/utils/supabase/server";
import { ProfileActions } from './ProfileActions';
// import EmailAvatar from './EmailAvatar';

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
      <div
        className={`md:flex hidden items-center gap-24 top-0 left-0 h-full bg-white shadow-md static md:space-x-6 w-auto md:shadow-none p-4 md:p-0`}
      >

        <div className='flex items-center gap-7 font-medium'>
          <Link href="/" className="hover:text-[#652293] block md:inline">Home</Link>
          <Link href="/feedback" className="hover:text-[#652293] block md:inline">Feedback</Link>
          <Link href="/pricing" className="hover:text-[#652293] block md:inline">Pricing</Link>
          <Link href="/about-us" className="hover:text-[#652293] block md:inline">About Us</Link>
        </div>

        {
          error || !data?.user
            ? <div className='flex items-center gap-7 font-medium'>
              <Link href="/login" className="text-[#652293] block md:inline">Log in</Link>
              <Link href="/register" className="bg-[#652293] text-white px-4 py-2 rounded-md block md:inline">Sign Up</Link>
            </div>
            : <div>
              {/* <LogoutButton /> */}
              <ProfileActions email={data.user.email ?? "a"} />
              {/* <EmailAvatar email={data.user. ?? ""} /> */}
            </div>
        }
      </div>
    </nav>
  );
};

export default MainNavbar;