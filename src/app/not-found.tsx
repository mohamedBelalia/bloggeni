// app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-[#076d81] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-6">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#652293] text-white rounded-full hover:bg-[#55197c] transition"
      >
        Go Home
      </Link>
    </div>
  );
}
