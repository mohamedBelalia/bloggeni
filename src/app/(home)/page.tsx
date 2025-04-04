"use client"
import { AiFillStar } from "react-icons/ai";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import ThreeSteps from "./ThreeSteps";
import OldSeoGoodB from "./OldSeoGoodB";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Section4 from "./Section4";

export default function Home() {

  const setNewView = async () => {
     const { data , error } = await supabase.from('Views').insert({name:"simo"})

     if(data) console.log(data);
     if(error) console.log(error);
  }

  const handleBtnClick = () => {
      setNewView()
  }


  return (
    <div className="mt-12">

      <div className="md:w-[75%] w-[90%] mx-auto flex gap-5 mb-6">
        <div className="md:w-1/3 w-full p-2 flex justify-center flex-col items-center">
          <FiveStars />
          <p className="text-sm font-semibold text-center mt-1 text-gray-700">
          &quot;The ultimate AI tool for SEO-optimized blogging!&quot;
          </p>
        </div>
        <div className="w-1/3 p-2 md:flex hidden justify-center flex-col items-center">
          <FiveStars />
          <p className="text-sm font-semibold text-center mt-1 text-gray-700">
          &quot;My go-to AI for effortless content creation!&quot;
          </p>
        </div>
        <div className="w-1/3 p-2 md:flex hidden justify-center flex-col items-center">
          <FiveStars />
          <p className="text-sm font-semibold text-center mt-1 text-gray-700">
          &quot;Best AI blog writer I’ve ever used!&quot;
          </p>
        </div>
      </div>

      <div className="md:w-[60%] w-[90%] mx-auto">
        <h1 className="md:text-6xl text-4xl md:h-[170px] leading-[140%] font-semibold text-center bg-gradient-to-r from-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
          Create High-Quality Blog Posts <br /> & Boost Traffic Instantly</h1>

        <p className="text-center text-lg font-normal mt-6 text-gray-800">Supercharge your website’s SEO with our AI-powered blog generator.
          Increase organic reach, enhance visibility, and rank higher with
          expertly crafted, SEO-optimized content effortlessly.</p>
      </div>

      <div className="flex w-[90%] mx-auto justify-center items-center mt-10">
        <Link
          href="/blog-generator"
          onClick={handleBtnClick}
          type="button"
          className="flex shadow-cyan-500/50 cursor-pointer items-center uppercase justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-700 to-cyan-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <span className="mr-2">Get Your First AI-Generated Blog Post Now</span>
          <MdOutlineGeneratingTokens className="text-2xl md:block hidden" />
        </Link>
      </div>

      <div className="md:w-[80%] w-full mx-auto md:mt-36 mt-20">
        <ThreeSteps />
        <OldSeoGoodB />
        <Section4 />
      </div>
    </div>
  );
}



const FiveStars = () => {
  return (
    <div className="flex justify-center items-center gap-1 mainColor">
      <AiFillStar size={26} />
      <AiFillStar size={26} />
      <AiFillStar size={26} />
      <AiFillStar size={26} />
      <AiFillStar size={26} />
    </div>
  )
}