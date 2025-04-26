'use client';

import Link from "next/link";
import { Mail, Linkedin, Github } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">About BlogGenius</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering content creators with AI-powered blog generation. 
          Our mission is to make high-quality content creation accessible to everyone.
        </p>
      </section>

      {/* Creator Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-gray-100 overflow-hidden">
                {/* Replace with your actual image */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Creator Image</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-semibold mb-4">
                Hey, I&apos;m <Link 
                  className="text-primary underline" 
                  target="_blank" 
                  href="https://www.belalia.info/"
                >
                  Mohamed Belalia
                </Link>
              </h2>
              <p className="text-gray-700 mb-4">
                I&apos;m a full-stack developer passionate about creating tools that help people create content without the stress. 
                I understand how overwhelming it can be to manage content, SEO, and everything else when you&apos;re trying to run a business or blog.
              </p>
              <p className="text-gray-700 mb-6">
                That&apos;s why I created BlogGenius - to help you generate high-quality blog posts quickly and efficiently. 
                Whether you&apos;re a business owner, freelancer, or someone who doesn&apos;t have time to write every day, 
                this tool is designed to make your life easier.
              </p>
              <div className="flex gap-4">
                <a 
                  href="mailto:mohamedbelalia.dev@gmail.com"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/mohamed-belalia-0b886a229/"
                  target="_blank"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/mohamedbelalia"
                  target="_blank"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Philosophy Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-6">Why I Created BlogGenius</h2>
          <p className="text-gray-700 mb-6">
            I built BlogGenius because I saw a gap in the market. While there are many tools claiming to make content creation easier, 
            most are either too complex or don&apos;t get the tone right. Here&apos;s what I aimed for with this tool:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Fast, Efficient AI</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI understands your brand&apos;s tone and voice, creating content that feels authentic.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Cultural Style Options</h3>
                  <p className="text-gray-600 text-sm">
                    Built for people who want personalized, culturally relevant content.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Easy Integration</h3>
                  <p className="text-gray-600 text-sm">
                    Simple setup with WordPress and Shopify integration for seamless publishing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Streamlined Experience</h3>
                  <p className="text-gray-600 text-sm">
                    Focus on what matters - running your business - while we handle the content creation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">Let&apos;s Connect</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re using BlogGenius or just want to chat about how AI is changing the content game, 
            I&apos;d love to hear from you. If you have any questions, feedback, or just want to connect, 
            don&apos;t hesitate to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
}
