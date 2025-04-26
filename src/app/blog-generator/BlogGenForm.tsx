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
    <form className={`space-y-6 w-full ${blogsCount === 0 && 'pointer-events-none opacity-50'}`}>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Title<span className="text-red-500 ml-1">*</span>
        </label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Best 3 places to visit in Marrakech"
          className="input-field"
        />
        <p className="text-xs text-gray-500">Enter a clear and engaging title for your blog post</p>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Main Keywords
        </label>
        <Input
          value={formData.keywords}
          onChange={(e) => handleChange("keywords", e.target.value)}
          placeholder="marrakech, visit, travel, morocco"
          className="input-field"
        />
        <p className="text-xs text-gray-500">Separate keywords with commas</p>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <Select
          onValueChange={(value) => handleChange("language", value)}
          value={formData.language}
        >
          <SelectTrigger className="input-field">
            <SelectValue placeholder="Select The Article's Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Article Size
        </label>
        <Select
          onValueChange={(value) => handleChange("size", value)}
          value={formData.size}
        >
          <SelectTrigger className="input-field">
            <SelectValue placeholder="Select The Article's Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short (300-500 words)</SelectItem>
            <SelectItem value="medium">Medium (500-1000 words)</SelectItem>
            <SelectItem value="long">Long (1000+ words)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Tone of Voice
        </label>
        <Select
          onValueChange={(value) => handleChange("tone", value)}
          value={formData.tone}
        >
          <SelectTrigger className="input-field">
            <SelectValue placeholder="Select The Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="formal">Formal (Professional)</SelectItem>
            <SelectItem value="casual">Casual (Conversational)</SelectItem>
            <SelectItem value="informative">Informative (Educational)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Additional Details
        </label>
        <Textarea
          name="details"
          value={formData.details}
          onChange={(e) => handleChange("details", e.target.value)}
          placeholder="Include any specific details, requirements, or points you want to cover..."
          className="input-field resize-none h-32"
        />
        <p className="text-xs text-gray-500">Add any specific requirements or points you want to include</p>
      </div>

      {blogsCount === 0 ? (
        <Link
          href={'/pricing'}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <span>Upgrade Your Plan</span>
          <LuLockKeyhole className="text-xl" />
        </Link>
      ) : (
        <button
          type="button"
          className="btn-primary w-full flex items-center justify-center gap-2"
          onClick={submitForm}
          disabled={!formData.title}
        >
          <span>Generate Blog Post</span>
          <MdOutlineGeneratingTokens className="text-xl" />
        </button>
      )}

      {blogsCount !== null && (
        <div className="text-center text-sm text-gray-500">
          <p>You have {blogsCount} blog posts remaining this month</p>
          {blogsCount < 3 && (
            <Link href="/pricing" className="text-primary hover:underline">
              Upgrade for more posts
            </Link>
          )}
        </div>
      )}
    </form>
  );
}

