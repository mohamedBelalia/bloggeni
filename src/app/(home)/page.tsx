"use client"
import { AiFillStar } from "react-icons/ai";
import ThreeSteps from "./ThreeSteps";
import OldSeoGoodB from "./OldSeoGoodB";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Section4 from "./Section4";
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import { TbLetterA , TbLetterS , TbLetterE } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";



export default function Home() {
  const setNewView = async () => {
    const { data, error } = await supabase.from('Views').insert({ name: "simo" })
    if (data) console.log(data);
    if (error) console.log(error);
  }

  const handleBtnClick = () => {
    setNewView()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
            <Zap className="w-5 h-5" />
            <span>AI-Powered Blog Generation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="gradient-text">Create Engaging</span> Blog Posts
            <br />
            <span className="text-gray-800">In Minutes, Not Hours</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Generate SEO-optimized, high-quality blog content that ranks and resonates with your audience. 
            Save time and boost your website&apos;s visibility with our advanced AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/blog-generator"
              onClick={handleBtnClick}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group"
            >
              <span>Start Generating Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary text-lg px-8 py-4"
            >
              View Pricing
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>5 free blog posts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <p className="text-4xl font-bold gradient-text mb-2">10K+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <p className="text-4xl font-bold gradient-text mb-2">50K+</p>
              <p className="text-gray-600">Blogs Generated</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <p className="text-4xl font-bold gradient-text mb-2">4.9/5</p>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Turbo Blog?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you create high-quality content that ranks and converts.
            </p>
          </div>
          <ThreeSteps />
          <OldSeoGoodB />
          <Section4 />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their content creation process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FiveStars />
              <p className="text-gray-700 mt-4">
              &quot;The ultimate AI tool for SEO-optimized blogging! It&apos;s transformed how we create content for our websites.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center"><TbLetterS /></div>
                <div>
                  <p className="font-medium">Soufiane Bensediq</p>
                  <p className="text-sm text-gray-500">Full Stack Web Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FiveStars />
              <p className="text-gray-700 mt-4">
              &quot;My go-to AI for effortless content creation! Saves me hours every week.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center"><TbLetterA /></div>
                <div>
                  <p className="font-medium">Abdoulah Allaoui</p>
                  <p className="text-sm text-gray-500">Copywriter</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FiveStars />
              <p className="text-gray-700 mt-4">
              &quot;Best AI blog writer I&apos;ve ever used! The quality of content is exceptional.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center"><TbLetterE /></div>
                <div>
                  <p className="font-medium">Emily Browns</p>
                  <p className="text-sm text-gray-500">SEO Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and protected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <FaMoneyBillTransfer className="w-8 h-8 text-primary"  />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you succeed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <MdOutlineSupportAgent className="w-8 h-8 text-primary"  />
              </div>
              <h3 className="text-lg font-semibold mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600">30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Content?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who have transformed their content creation process with Turbo Blog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog-generator"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition flex items-center gap-2 group"
            >
              <span>Start Generating Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const FiveStars = () => {
  return (
    <div className="flex justify-center items-center gap-1 text-yellow-400">
      <AiFillStar size={20} />
      <AiFillStar size={20} />
      <AiFillStar size={20} />
      <AiFillStar size={20} />
      <AiFillStar size={20} />
    </div>
  )
}