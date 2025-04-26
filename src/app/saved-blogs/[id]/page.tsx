"use client";

import MDXEditor from "@/components/MDXEditor";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import DownloadHtml from "@/components/generatedBlog/DownloadHtml";
import { Loader2, Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
    const { id } = useParams();
    const supabase = createClient();
    const [blog, setBlog] = useState<{ title: string; created_at: string; content: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [generatedContent, setGeneratedContent] = useState<string>("");

    useEffect(() => {
        async function fetchBlog() {
            const { data, error } = await supabase
                .from("savedblogs")
                .select("*")
                .eq("id_blog", id)
                .single();

            if (!error) {
                setBlog(data);
                setGeneratedContent(data.content);
            }
            setLoading(false);
        }

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-gray-600">Loading your blog...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
                    <p className="text-gray-600 mb-6">The blog you are looking for does not exist or has been removed.</p>
                    <Link 
                        href="/saved-blogs"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Saved Blogs</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <div className="mb-8">
                    <Link 
                        href="/saved-blogs"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Saved Blogs</span>
                    </Link>
                </div>

                {/* Blog Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{new Date(blog.created_at).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <DownloadHtml markedText={generatedContent} title={blog.title} />
                        </div>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <MDXEditor mdxData={generatedContent} getGeneratedBlog={setGeneratedContent} />
                </div>
            </div>
        </div>
    );
}
