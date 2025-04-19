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
    <div className="min-h-screen md:p-10 p-5 bg-white flex flex-col md:flex-row gap-10">

      <div className="md:w-1/3 w-full">
        <BlogGenForm userId={userId} getBlogData={setBlogData} generateBlogFn={generateBlog} getUserTitle={setUserTitle} />
      </div>
      <div className="border-0 border-l border-gray-400"></div>
      <div className="w-full">
        {/* <div className="flex justify-end">
            <p className="w-fit px-9 bg-indigo-500 text-white rounded-lg">9/30</p>
        </div> */}
        {
          pending || loading
            ?
            <div className="w-full h-[80%] border border-gray-100 flex justify-center items-center flex-col ">
              <Image src={"/duck-loading.gif"} alt="generating the blog" width={300} height={300} />
              <h3 className="mainColor text-xl font-semibold">Please Wait a Few Seconds ...</h3>
              <p className="italic mt-3 text-sm">“Never give up. Great things take time.” - Frank Zane</p>
            </div>
            :
            generatedBlog.length == 0
              ? <div className="w-full h-[80%] rounded-md border border-gray-100 flex justify-center items-center flex-col">
                {/* <Image src={"/pro-duck.png"} alt="generating the blog" width={300} height={300} /> */}
                <FaEarlybirds size={70} />
                <p>Your generated Blog will appear here</p>
              </div>
              : <div>
                <div className="w-full flex justify-end mb-6 items-center gap-7">
                  <SaveBlog content={generatedBlog} title={userTitle} />
                  {
                    planTitle === 'growth'
                      ?
                      <DownloadHtml markedText={generatedBlog} title={userTitle} />
                      :
                      planTitle === 'unlimited'
                        ?
                        <>
                          <DownloadHtml markedText={generatedBlog} title={userTitle} />
                          <WordpressPublish markdown={generatedBlog} blogTitle={userTitle} />
                        </>
                        :
                        <div></div>
                  }
                </div>
                <MDXEditor mdxData={generatedBlog} getGeneratedBlog={setGeneratedBlog} />
              </div>
        }
      </div>

      {/* {loading ? "Generating..." : "Generate Blog Post"} */}

      {/* {generatedBlog && (
        <div className="mt-6 bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-2">Generated Blog</h2>
          <p className="whitespace-pre-line">{generatedBlog}</p>
        </div>
      )} */}

    </div>
  );
}
