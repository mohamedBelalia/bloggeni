import FAQAccordion from '@/components/QAs'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Section4 = () => {
    return (
        <div className='mt-28 md:p-0 p-4'>
            <h2 className='text-center text-4xl font-semibold'>Ready To Dominate SEO ?</h2>
            <p className='text-center md:w-[60%] w-full mx-auto mt-5 font-medium text-gray-600'>
                Say farewell to endless writing with little SEO benefit.
                With the leading AI SEO writer, create content faster and attract more clicks on your blogs.
            </p>

            <div className='flex flex-col md:flex-row justify-center items-center gap-14 mt-10 text-sm font-semibold'>
                <p className='flex items-center gap-2 font-semibold text-gray-700'>
                    <Check />
                    No Credit Card Needed
                </p>
                <p className='flex items-center gap-2 font-semibold text-gray-700'>
                    <Check />
                    Supports 30+ Languages
                </p>
                <p className='flex items-center gap-2 font-semibold text-gray-700'>
                    <Check />
                    Try It Free Today
                </p>
            </div>

            <div className='mt-32'>
                <h2 className='text-center font-semibold text-4xl mb-4'>Frequently Asked Questions</h2>
                <FAQAccordion />
            </div>

            <div className="flex justify-center items-center mt-10">
                <Link
                    href="/blog-generator"
                    type="button"
                    className="flex shadow-cyan-500/50 cursor-pointer items-center uppercase justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-700 to-cyan-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    <span className="mr-2">Boost Your SEO with AI</span>
                </Link>
            </div>

        </div>
    )
}

export default Section4