'use client';

import { Mail, Phone , Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-center text-[#652293] mb-6">
          Let’s Connect
        </h1>
        <p className="text-center text-gray-600 mb-10">
          I’d love to hear from you whether it’s feedback, questions, or just a friendly hello. Here’s how you can reach me:
        </p>

        <div className="space-y-6">
          <div className="flex items-center">
            <Mail className="w-6 h-6 text-[#652293] mr-4" />
            <span className="text-gray-800 font-medium">mohamedbelalia.dev@gmail.com</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-6 h-6 text-[#652293] mr-4" />
            <span className="text-gray-800 font-medium">+212 678-993059</span>
          </div>
          <div className="flex items-center">
            <Linkedin className="w-6 h-6 text-[#652293] mr-4" />
            <a
              href="https://www.linkedin.com/in/mohamed-belalia-0b886a229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 font-medium underline"
            >
              Mohamed Belalia
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
