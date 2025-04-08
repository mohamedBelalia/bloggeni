import TimeLine from '@/components/comp-534';
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
                    type="button"
                    className="flex mt-8 w-fit shadow-cyan-500/50 cursor-pointer items-center uppercase justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-700 to-cyan-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    <span className="mr-2">Generate Your Blog Post Now</span>
                    <MdOutlineGeneratingTokens className="text-2xl md:block hidden" />
                </Link>
            </div>
            <div className='md:w-1/2 w-full md:p-0 p-8'>
                <TimeLine />
            </div>
        </div>
    )
}

export default ThreeSteps