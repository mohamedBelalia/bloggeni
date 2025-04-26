"use client";

import { useEffect, useState } from "react";
import BlogGenForm from "./BlogGenForm";
import { IBlogData } from "@/lib/types";
import MDXEditor from "@/components/MDXEditor";
import Image from "next/image";
import DownloadHtml from "@/components/generatedBlog/DownloadHtml";
import { FaEarlybirds } from "react-icons/fa";
import SaveBlog from "@/components/generatedBlog/SaveBlog";
import WordpressPublish from "@/components/generatedBlog/WordpressPublish";
import { supabase } from '@/lib/supabase';

export default function BlogGeneratePage({ userId }: { userId: string }) {

  const [generatedBlog, setGeneratedBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [userTitle, setUserTitle] = useState<string>("")
  const [pending, setPending] = useState(false);
  const [planTitle, setPlanTitle] = useState<string>("starter")
  // const [blogsCount , setBlogsCount] = useState<number>(0)
  // ######################
  const [jobId, setJobId] = useState<string | null>(null);

  const [blogData, setBlogData] = useState<IBlogData>({ title: "", keywords: "", language: "", size: "", tone: "", details: "" });

  // useEffect(() => {
      
  //   const fetchBlogsStatus = async () => {
  //     const { data: subs, error } = await supabase
  //       .from("subscription_of_user")
  //       .select("id, blogs_count , plan_title")
  //       .eq("user_id", userId);


  //     if (error) {
  //       console.error("Supabase query error:", error.message);
  //       throw new Error("Failed to fetch subscription.");
  //     }

  //     const sub = subs[0];
  //     setPlanTitle(sub?.plan_title)
  //     setBlogsCount(sub?.blogs_count)

  //     console.log('data : ' , sub);
      
  //   }
    
  //   fetchBlogsStatus()

  // }, []);

  const generateBlog = async () => {
    setLoading(true);
    setPending(true);
    setGeneratedBlog("");

    try {
      const response = await fetch("/api/jobgenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogData.title,
          keywords: blogData.keywords.split(",").map((k) => k.trim()),
          language: blogData.language,
          size: blogData.size,
          tone: blogData.tone,
          details: blogData.details,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || "Failed to create blog");
      }

      const data = await response.json();
      setJobId(data.jobId);

      const { data: subs, error } = await supabase
        .from("subscription_of_user")
        .select("id, blogs_count , plan_title")
        .eq("user_id", userId);
        

      if (error) {
        console.error("Supabase query error:", error.message);
        throw new Error("Failed to fetch subscription.");
      }

      if (!subs || subs.length === 0) {
        throw new Error("No subscription found for this user.");
      }

      const sub = subs[0];
      setPlanTitle(sub.plan_title)
      const newCount = Math.max(sub.blogs_count - 1, 0);
      await supabase
        .from("subscription_of_user")
        .update({ blogs_count: newCount })
        .eq("id", sub.id);

        // setBlogsCount(newCount)

    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };


  const pollJobStatus = async (jobId: string) => {
    const { data, error } = await supabase
      .from('blog_jobs')
      .select('status, result')
      .eq('id', jobId)
      .single();

    if (error) {
      console.error('Polling error:', error.message);
      return;
    }

    if (data.status === 'done') {
      if(data.result.length > 0){
        setGeneratedBlog(data.result);
      }
      else{
        alert("Something wrong in the server (please contact the support)")
      }
      setPending(false);
    } else if (data.status === 'error') {
      console.error('Job failed');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (jobId && generateBlog.length === 0) {
        pollJobStatus(jobId);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobId]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">Blog Generator</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Remaining Posts:</span> 3
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Plan:</span> {planTitle.charAt(0).toUpperCase() + planTitle.slice(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 gradient-text">Blog Settings</h2>
              <BlogGenForm 
                userId={userId} 
                getBlogData={setBlogData} 
                generateBlogFn={generateBlog} 
                getUserTitle={setUserTitle} 
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 gradient-text">Blog Preview</h2>
              {pending || loading ? (
                <div className="w-full h-[600px] border-2 border-dashed border-gray-200 rounded-lg flex justify-center items-center flex-col">
                  <Image 
                    src={"/duck-loading.gif"} 
                    alt="generating the blog" 
                    width={200} 
                    height={200} 
                    className="mb-4"
                  />
                  <h3 className="text-xl font-semibold text-primary mb-2">Generating Your Blog...</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Our AI is crafting your perfect blog post. This usually takes about 30-60 seconds.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span>Processing your request</span>
                  </div>
                </div>
              ) : generatedBlog.length === 0 ? (
                <div className="w-full h-[600px] border-2 border-dashed border-gray-200 rounded-lg flex justify-center items-center flex-col">
                  <FaEarlybirds size={70} className="text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Blog Preview</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Fill out the form and click "Generate" to create your blog post. 
                    Your generated content will appear here.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-end gap-4 mb-6">
                    <SaveBlog content={generatedBlog} title={userTitle} />
                    {planTitle === 'growth' && (
                      <DownloadHtml markedText={generatedBlog} title={userTitle} />
                    )}
                    {planTitle === 'unlimited' && (
                      <>
                        <DownloadHtml markedText={generatedBlog} title={userTitle} />
                        <WordpressPublish markdown={generatedBlog} blogTitle={userTitle} />
                      </>
                    )}
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <MDXEditor mdxData={generatedBlog} getGeneratedBlog={setGeneratedBlog} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
