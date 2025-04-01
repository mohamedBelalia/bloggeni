"use client"

import React, { useEffect, useState } from 'react'
import { GrArticle } from "react-icons/gr";
import BlogCard from './BlogCard';
import { IRetrivedBlog } from '@/lib/types';
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from 'next/link';

const SavedBlogs = () => {

    const [retrivedData, setRetrivedData] = useState<IRetrivedBlog[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true)
            const res = await fetch("/api/retriveblogs", { method: "GET", credentials: "include" });
            const data = await res.json();
            setRetrivedData(data.blogs)
            setIsLoading(false)
        };

        fetchBlogs()

    }, []);


    return (
        <div className='mt-7 w-[80%] mx-auto mb-20'>
            <h1 className='text-[#652293] text-3xl flex font-semibold items-center gap-4'>Yours Saved Blogs <GrArticle className='text-4xl' /> </h1>

            {
                isLoading
                    ?
                    <div>Loading ....</div>
                    :
                    <div className='flex flex-wrap mt-12 '>
                        {
                            retrivedData.map((blog, key) => (
                                <BlogCard {...blog} key={key} />
                            ))
                        }
                        <div className="md:w-1/3 w-full p-3">
                            <Link href={'blog-generator'} className="border h-full border-gray-200 text-gray-600 rounded-2xl shadow-[#652293] shadow-md transition-shadow bg-white p-4 flex justify-center items-center flex-col gap-3">
                                <IoIosAddCircleOutline className="text-6xl" />
                                Generate Your Next Blog
                            </Link>
                        </div>
                    </div>
            }


        </div>
    )
}

export default SavedBlogs