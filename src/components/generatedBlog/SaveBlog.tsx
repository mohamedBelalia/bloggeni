"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IoSaveOutline } from "react-icons/io5";


interface SaveBlogProps {
  content: string;
  title: string;
}

export default function SaveBlog({ content, title }: SaveBlogProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [mainTitle, setMainTitle] = useState<string>(title)
  const [success, setSuccess] = useState<boolean | null>(null)

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/saveBlog", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ title: mainTitle, content }),
        credentials: "include"
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      
      setSuccess(true)

    } catch (error) {
      console.error("Save blog error:", error);
      setError(`There is an error while saving your blog: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-2 px-4 py-2 bg-[#076d81] text-white rounded cursor-pointer hover:bg-[#076d81]">Save <IoSaveOutline /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {
            !success
            ?
            <DialogHeader>
              <DialogTitle>Save Your Generated Blog</DialogTitle>
              <DialogDescription>
                You can access your saved blog by going to: <br />
                Account &#10148; Saved Blogs <br />
              </DialogDescription>
            </DialogHeader>
            :
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
          }

          {
            success == null
              ?
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    value={mainTitle}
                    name="mainTitle"
                    onChange={(e) => setMainTitle(e.target.value)}
                    className="col-span-3"
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
              :
              success === true
              && <div className="text-green-600 font-semibold text-lg text-center">Your blog has been successfully saved</div>
          }

          <DialogFooter>
            {
              loading
                ? <Button disabled className="mt-2 px-4 py-2 bg-[#652293] hover:bg-[#652293] text-white rounded cursor-not-allowed">Saving ...</Button>
                : success == null ?
                  <Button className="mt-2 px-4 py-2 bg-[#652293] hover:bg-[#652293] text-white rounded cursor-pointer" onClick={handleSave} type="submit">Save It</Button>
                  : success == true && <div></div>
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving Blog ..." : "Save Blog"}
      </button>
      {error && <p className="text-red-500">{error}</p>} */}
    </div>
  );
}
