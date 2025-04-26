
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/Navbar/MainNavbar";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turbo Blog - AI-Powered Blog Generation Platform",
  description: "Create professional, SEO-optimized blog posts in minutes with our AI-powered blog generation platform. Perfect for content creators, marketers, and businesses.",
  keywords: "blog generator, AI content creation, content marketing, SEO writing, blog writing tool",
  authors: [{ name: "Turbo Blog Team" }],
  creator: "Turbo Blog",
  publisher: "Turbo Blog",
  metadataBase: new URL("https://turboblog.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://turboblog.vercel.app",
    title: "Turbo Blog - AI-Powered Blog Generation Platform",
    description: "Create professional, SEO-optimized blog posts in minutes with our AI-powered blog generation platform.",
    siteName: "Turbo Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turbo Blog - AI-Powered Blog Generation Platform",
    description: "Create professional, SEO-optimized blog posts in minutes with our AI-powered blog generation platform.",
    creator: "@Turbo Blog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
