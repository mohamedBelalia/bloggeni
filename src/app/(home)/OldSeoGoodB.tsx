
import { FaChartLine } from "react-icons/fa";
import React from 'react'
import { IconType } from "react-icons/lib";
import { RiArticleLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { HiOutlineRefresh } from "react-icons/hi";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const OldSeoGoodB = () => {
    return (
        <div className='md:mt-32 mt-20'>
            <h2 className='md:text-5xl text-3xl font-bold mb-5 text-center mainColor'>Ditch Other AI Writing Tools for Good</h2>
            <p className='text-center text-lg'>
                Craft Engaging, SEO-Optimized Content That Ranks and Resonates with Your Audience.
            </p>

            <div className='w-[80%] mx-auto mt-8'>
                <div className='flex flex-col md:flex-row gap-6'>
                    <CardLocal
                        Icon={FaChartLine}
                        title="Dominate Search Rankings"
                        description="Craft Powerful Articles Using Your Competitors’ Best Keywords"
                    />
                    <CardLocal
                        Icon={MdVerified}
                        title="Strengthen Your Domain Authority"
                        description="Build Search Engine Trust with In-Depth, High-Quality Blog Posts"
                    />
                    <CardLocal
                        Icon={AiOutlineFileText}
                        title="Professionally Formatted Articles"
                        description="Generate Structured Content with Bullet Points, Quotes, and Headings for Maximum Readability"
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-6 mt-6'>
                    <CardLocal
                        Icon={BsLink45Deg}
                        title="Earn Organic Backlinks"
                        description="Produce High-Value Content That Naturally Attracts Links and Boosts SEO"
                    />
                    <CardLocal
                        Icon={HiOutlineRefresh}
                        title="Effortless Content Refreshes"
                        description="Keep Your Articles Relevant with AI-Driven Updates for Better Rankings and Engagement"
                    />
                    <CardLocal
                        Icon={RiArticleLine}
                        title="Authentic Long-Form Content"
                        description="Turn Keywords into 6,000-Word Masterpieces Optimized for SEO and Readers"
                    />
                </div>
            </div>

            <div className="flex justify-center items-center mt-10">
            <Link
              href="/blog-generator"
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group"
            >
              <span>Start Generating Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            </div>

        </div>
    )
}

export default OldSeoGoodB


type CardLocalProps = {
    title: string
    description: string
    Icon: IconType
}

const CardLocal = ({ title, description, Icon }: CardLocalProps) => {
    return <div className='md:w-1/3 w-full p-5 bg-cyan-600 rounded-md'>
        <div className="bg-white p-2 rounded-md w-fit">
            <Icon size={20} className="text-[#144463]" />
        </div>
        <h3 className="my-2 text-white font-semibold text-lg">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
    </div>
}