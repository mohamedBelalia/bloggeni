import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { ProfileActions } from './ProfileActions';
import MobileNav from './MobileNav';

const MainNavbar = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const isAuthenticated = !error && !!data?.user;

  return (
    <nav className="bg-white shadow-md py-4 w-full">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-40">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/templogo.png" alt="Logo" width={100} height={100} className="object-contain mt-5" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-7 font-medium">
            <Link href="/" className="hover:text-[#652293] transition-colors">
              Home
            </Link>
            <Link href="/feedback" className="hover:text-[#652293] transition-colors">
              Feedback
            </Link>
            <Link href="/pricing" className="hover:text-[#652293] transition-colors">
              Pricing
            </Link>
            <Link href="/about-us" className="hover:text-[#652293] transition-colors">
              About Us
            </Link>
          </div>
          { !isAuthenticated ? (
            <div className="flex items-center gap-7 font-medium">
              <Link href="/login" className="text-[#652293] transition-colors">
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-[#652293] text-white px-4 py-2 rounded-md transition-colors hover:bg-[#531a7a]"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <ProfileActions email={data.user.email ?? 'user@example.com'} />
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
};

export default MainNavbar;
