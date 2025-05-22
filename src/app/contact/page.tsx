'use client';

import { Mail, Phone, Linkedin, MapPin, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#652293] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you. Our team is here to help and will get back to you as soon as possible.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#652293]/10 p-3 rounded-lg mr-4">
                <Mail className="w-6 h-6 text-[#652293]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Email</h2>
            </div>
            <a 
              href="mailto:mohamedbelalia.dev@gmail.com" 
              className="text-gray-800 hover:text-[#652293] transition-colors text-lg"
            >
              mohamedbelalia.dev@gmail.com
            </a>
            <p className="text-sm text-gray-500 mt-2">For general inquiries and support</p>
          </div>


          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#652293]/10 p-3 rounded-lg mr-4">
                <Phone className="w-6 h-6 text-[#652293]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Phone</h2>
            </div>
            <a 
              href="tel:+212678993059" 
              className="text-gray-800 hover:text-[#652293] transition-colors text-lg"
            >
              +212 678-993059
            </a>
            <p className="text-sm text-gray-500 mt-2">Get in Touch On Whatsapp</p>
          </div>


          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#652293]/10 p-3 rounded-lg mr-4">
                <Linkedin className="w-6 h-6 text-[#652293]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">LinkedIn</h2>
            </div>
            <a
              href="https://www.linkedin.com/in/mohamed-belalia-0b886a229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#652293] transition-colors text-lg"
            >
              Mohamed Belalia
            </a>
            <p className="text-sm text-gray-500 mt-2">Connect with me on LinkedIn</p>
          </div>

          {/* Portfolio Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-[#652293]/10 p-3 rounded-lg mr-4">
                <Globe className="w-6 h-6 text-[#652293]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
            </div>
            <a
              href="https://www.belalia.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#652293] transition-colors text-lg"
            >
              www.belalia.info
            </a>
            <p className="text-sm text-gray-500 mt-2">Check out my Portfolio</p>
          </div>
        </div>


        <div className="mt-12 text-center">
          <div className="inline-flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Based in Morocco</span>
          </div>
        </div>
      </div>
    </div>
  );
}
