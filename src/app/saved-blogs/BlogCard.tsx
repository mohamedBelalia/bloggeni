import { IRetrivedBlog } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { Calendar, Clock, ExternalLink } from 'lucide-react';

const BlogCard = ({ id_blog, title, created_at }: IRetrivedBlog) => {
    function formatReadableDate(isoString: string): string {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    function formatTime(isoString: string): string {
        const date = new Date(isoString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <div className="h-full">
            <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
                <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatReadableDate(created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(created_at)}</span>
                        </div>
                    </div>
                    <Link 
                        href={`/saved-blogs/${id_blog}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    >
                        <span>Read Blog</span>
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;

