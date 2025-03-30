"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IBlogData } from "@/lib/types"
import { MdOutlineGeneratingTokens } from "react-icons/md";


type BlogGenFormProps = {
  getBlogData: Dispatch<SetStateAction<IBlogData>>
  generateBlogFn: () => Promise<void>
}

export default function BlogGenForm({ getBlogData, generateBlogFn }: BlogGenFormProps) {
  const [formData, setFormData] = useState<IBlogData>({
    title: "",
    keywords: "",
    language: "",
    size: "",
    tone: "",
    details: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  useEffect(() => {
    getBlogData(formData);
  }, [formData, getBlogData]);

  return (
    <form className="space-y-8 w-full mx-auto py-10">
      <div>
        <label className="block text-sm font-medium mainColor mb-1">Title <span className="text-red-600">*</span></label>
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

      <button
        type="button"
        className="flex cursor-pointer w-full items-center uppercase justify-center px-6 py-3 bg-gradient-to-r bg-[#652293] text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        onClick={generateBlogFn}
      >
        <span className="mr-2">Generate</span>
        <MdOutlineGeneratingTokens className="text-2xl" />
      </button>
    </form>
  );
}

