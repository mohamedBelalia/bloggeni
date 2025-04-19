"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IBlogData } from "@/lib/types"
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { supabase } from '@/lib/supabase';
import { LuLockKeyhole } from "react-icons/lu";
import Link from "next/link"


type BlogGenFormProps = {
  getBlogData: Dispatch<SetStateAction<IBlogData>>
  generateBlogFn: () => Promise<void>
  getUserTitle: Dispatch<SetStateAction<string>>
  userId: string
}

export default function BlogGenForm({ getBlogData, generateBlogFn, getUserTitle, userId }: BlogGenFormProps) {
  const [formData, setFormData] = useState<IBlogData>({
    title: "",
    keywords: "",
    language: "",
    size: "",
    tone: "",
    details: ""
  });

  const [blogsCount, setBlogsCount] = useState<number | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchBlogsCount = async () => {
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

    console.log('blogs count : ', subs[0].blogs_count);


    setBlogsCount(subs[0].blogs_count)
  }


  const submitForm = async () => {
    await generateBlogFn()
    fetchBlogsCount()
  }

  useEffect(() => {
    fetchBlogsCount()
  }, []);

  useEffect(() => {
    getBlogData(formData);
    getUserTitle(formData.title)
  }, [formData, getBlogData]);

  return (
    <form className={`space-y-8 w-full mx-auto py-10 ${blogsCount === 0 && 'pointer-events-none opacity-50'}`}>
      <div>
        <label className="block text-sm font-medium mainColor mb-1">Title<span className="text-red-600">*</span></label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Best 3 places to visit in Marrakech"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mainColor mb-1">Main Keywords</label>
        <Input
          value={formData.keywords}
          onChange={(e) => handleChange("keywords", e.target.value)}
          placeholder="marrakech, visit"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mainColor mb-1">Language</label>
        <Select
          onValueChange={(value) => handleChange("language", value)}
          value={formData.language}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select The Article's Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mainColor mb-1">Article Size</label>
        <Select
          onValueChange={(value) => handleChange("size", value)}
          value={formData.size}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select The Article's Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mainColor mb-1">Tone of Voice</label>
        <Select
          onValueChange={(value) => handleChange("tone", value)}
          value={formData.tone}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select The Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="informative">Informative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mainColor mb-1">Details to Include</label>
        <Textarea
          name="details"
          value={formData.details}
          onChange={(e) => handleChange("details", e.target.value)}  // Change includedDetails to details
          placeholder="Include any specific details..."
          className="resize-none"
        />
      </div>

      {
        blogsCount === 0
          ?
          <Link
          href={'/pricing'}
            className="flex cursor-pointer w-full items-center uppercase justify-center px-6 py-3 bg-gradient-to-r bg-[#8a5da8] text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            type="button">
              <span className="mr-2">Upgrade Your Plan</span>
              <LuLockKeyhole className="text-2xl"  />
          </Link>
          :
          <button
            type="button"
            className="flex cursor-pointer w-full items-center uppercase justify-center px-6 py-3 bg-gradient-to-r bg-[#652293] text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={submitForm}
          >
            <span className="mr-2">Generate</span>
            <MdOutlineGeneratingTokens className="text-2xl" />
          </button>
      }

    </form>
  );
}

