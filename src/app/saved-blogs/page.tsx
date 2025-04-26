"use client"

import React, { useEffect, useState } from 'react'
import { GrArticle } from "react-icons/gr";
import BlogCard from './BlogCard';
import { IRetrivedBlog } from '@/lib/types';
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

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
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="gradient-text">Your Saved Blogs</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Access and manage all your generated blog posts in one place.
                    </p>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-gray-600">Loading your blogs...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Blog Cards */}
                        {retrivedData.map((blog, key) => (
                            <BlogCard {...blog} key={key} />
                        ))}
                        
                        {/* Generate New Blog Card */}
                        <div className="h-full">
                            <Link 
                                href={'blog-generator'} 
                                className="h-full flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <IoIosAddCircleOutline className="text-3xl text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Generate New Blog</h3>
                                <p className="text-gray-600 text-sm">
                                    Create a new blog post with our AI-powered generator
                                </p>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && retrivedData.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <GrArticle className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Saved Blogs Yet</h3>
                        <p className="text-gray-600 mb-6">
                            You haven't saved any blog posts yet. Start by generating your first blog!
                        </p>
                        <Link
                            href="/blog-generator"
                            className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition"
                        >
                            Generate Your First Blog
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedBlogs