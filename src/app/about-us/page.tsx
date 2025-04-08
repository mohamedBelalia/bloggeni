'use client';

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#652293]">About Me & The Project</h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          This isn’t just another tool , it&apos;s something I built to make your life easier. Here&apos;s a little bit about why I created it and how it can help you.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Creator Section */}
          <div className="bg-gray-50 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#652293]">Hey, I’m <Link className="underline text-[#076d81]" target="_blank" href={"https://www.belalia.info/"}>Mohamed Belalia</Link></h2>
            <p className="text-gray-700 mb-4">
              I’m a full-stack developer who’s passionate about making things that help people create without all the stress. I know firsthand how overwhelming it can be to manage content, SEO, and everything else when you’re just trying to run a business or blog.
            </p>
            <p className="text-gray-700 mb-4">
              That’s why I created this tool  to help you generate high-quality blog posts, fast. I wanted to make something that anyone could use, whether you’re a business owner, freelancer, or someone who just doesn’t have time to write every day.
            </p>
            <p className="text-gray-700">
              This whole thing is built by me from the idea to the code, and I’m really proud of how it’s turned out. I hope it helps you take your content game to the next level.
            </p>
          </div>

          {/* Product Philosophy Section */}
          <div className="bg-gray-50 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#652293]">Why I Created This Tool</h2>
            <p className="text-gray-700 mb-4">
              I built this because I saw a gap  there are plenty of tools that claim to make content easier, but most are either too complex or just don&apos;t get the tone right. Here’s what I aimed for with this tool:
            </p>
            <ul className="space-y-4 list-disc list-inside text-gray-700">
              <li>Fast, efficient AI that actually understands your brand’s tone and voice.</li>
              <li>It’s built for people who want personalized, cultural style options.</li>
              <li>No complicated setup  just plug it into your WordPress or Shopify and start posting.</li>
              <li>A streamlined experience that gets out of your way, so you can focus on what matters: running your business.</li>
            </ul>
            <p className="text-gray-700">
              At the end of the day, I wanted to build something that I’d want to use myself. And I think that’s reflected in how easy it is to get started and start seeing results.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f5ff] py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#652293]">Let’s Connect</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Whether you’re using the tool or just want to chat about how AI is changing the content game, I’d love to hear from you. If you have any questions, feedback, or just want to connect, don’t hesitate to reach out.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#652293] hover:bg-[#531a7a] text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Contact Me
        </Link>
      </section>

    </div>
  );
}
