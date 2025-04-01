"use client";

import MDXEditor from "@/components/MDXEditor";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import DownloadHtml from "@/components/generatedBlog/DownloadHtml";

export default function BlogPage() {
    const { id } = useParams();
    const supabase = createClient();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [generatedContent, setGeneratedContent] = useState<string>("")

    useEffect(() => {
        async function fetchBlog() {
            const { data, error } = await supabase
                .from("savedblogs")
                .select("*")
                .eq("id_blog", id)
                .single();

            if (!error) {
                setBlog(data)
                setGeneratedContent(data.content)
            };
            setLoading(false);
        }

        fetchBlog();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    return (
        <main className="md:w-[80%] mx-auto p-6 pb-20">
            <div className="mx-auto p-6 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{blog.title}</h1>
                    <p className="text-gray-500 text-sm">
                        Published on {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <DownloadHtml markedText={generatedContent} title={blog.title} />
                </div>
            </div>
            <MDXEditor mdxData={generatedContent} getGeneratedBlog={setGeneratedContent} />
        </main>
    );
}
