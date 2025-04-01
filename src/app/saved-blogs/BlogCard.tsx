import { IRetrivedBlog } from "@/lib/types";
import Link from "next/link";
import React from "react";

const BlogCard = ({ id_blog , title , created_at } : IRetrivedBlog) => {

    function formatReadableDate(isoString: string): string {
        const date = new Date(isoString);
        
        return date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        //   second: "2-digit",
        //   timeZoneName: "short",
        });
      }

  return (
    <div className="md:w-1/3 w-full p-3">
      <div className="border shadow-[#652293] border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white p-4 flex flex-col gap-3">
        <h4 className="text-lg font-semibold text-gray-800">
          {title}
        </h4>
        <p className="text-sm text-gray-500">Created on {formatReadableDate(created_at)}</p>
        <Link href={`/saved-blogs/${id_blog}`} className="self-start mt-2 text-sm text-[#652293] cursor-pointer hover:underline font-medium">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
