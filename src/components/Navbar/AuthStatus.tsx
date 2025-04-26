"use server";

import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import AuthenticatedSection from './AuthenticatedSection';

export async function AuthStatus() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const isAuthenticated = !error && !!data?.user;
  const userEmail = data?.user?.email ?? 'user@example.com';

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-[#652293] hover:text-[#531a7a] transition-colors duration-200 font-medium"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="bg-[#652293] text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#531a7a] hover:shadow-md"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return <AuthenticatedSection email={userEmail} />;
} 