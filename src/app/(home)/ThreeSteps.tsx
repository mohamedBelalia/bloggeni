import TimeLine from '@/components/comp-534';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { MdOutlineGeneratingTokens } from 'react-icons/md';

const ThreeSteps = () => {

    return (
        <div className='flex flex-col md:flex-row gap-5'>
            <div className='p-6 md:w-1/2 w-full'>
                <h2 className='md:text-5xl text-3xl md:text-start text-center md:w-[90%] font-bold leading-[130%] text-[#076d81]'>
                    Boost Your Rankings with In-Depth Content
                </h2>
                <p className='mt-6 md:text-lg text-base font-medium md:text-start text-center'>
                    Increase Your Website Traffic with High Quality Content Starting This Week!
                </p>
                <Link
                    href="/blog-generator"
                    className="btn-primary text-lg px-8 py-4 w-fit mt-5 flex items-center gap-2 group"
                >
                    <span>Generate Your Blog Post Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            <div className='md:w-1/2 w-full md:p-0 p-8'>
                <TimeLine />
            </div>
        </div>
    )
}

export default ThreeSteps