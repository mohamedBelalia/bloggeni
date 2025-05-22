'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, MessageSquare, DollarSign, Users, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { logout } from './action';

interface MobileNavProps {
  isAuthenticated: boolean;
}

export default function MobileNav({ isAuthenticated }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };
    getUser();
  }, [supabase.auth]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>

      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>


      <div 
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Sidebar Menu */}
        <div 
          className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              {isAuthenticated && userEmail && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-lg font-semibold text-gray-900">
                {isAuthenticated ? 'Account' : 'Menu'}
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>


          <div className="p-4">
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/feedback"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Feedback</span>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <DollarSign className="w-5 h-5" />
                <span>Pricing</span>
              </Link>
              <Link
                href="/about-us"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>About Us</span>
              </Link>
            </nav>


            <div className="mt-6 pt-6 border-t">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/saved-blogs"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Saved Blogs</span>
                  </Link>
                  <Link
                    href="/user/subscriptions"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Subscriptions</span>
                  </Link>
                  {/* <form action="/auth/signout" method="post"> */}
                    <button
                      type="submit"
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Log out</span>
                    </button>
                  {/* </form> */}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Log in</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
