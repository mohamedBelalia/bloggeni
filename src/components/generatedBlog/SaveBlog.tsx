"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-nextjs"; // Import Session type

interface SaveBlogProps {
  content: string;
  title: string;
}

export default function SaveBlog({ content, title }: SaveBlogProps) {
  const supabase = createClientComponentClient();
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, []);

  const handleSave = async () => {
    if (!session) {
      setError("You must be logged in to save your blog");
      return;
    }

    try {
      const response = await fetch("/api/storeBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "An error occurred");
      }

      alert("Blog saved successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Blog
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
