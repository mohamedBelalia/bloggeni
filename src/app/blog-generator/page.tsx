"use client";

import { useState } from "react";

export default function BlogGeneratePage() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("formal");
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state for the loader

  const generateBlog = async () => {
    setLoading(true);
    setGeneratedBlog(""); // Clear previous blog content
    setProgress(0); // Reset progress bar

    // Simulate progress bar increase during the request
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10; // Increment progress by 10% every 500ms
      });
    }, 500);

    try {
      const response = await fetch("/api/generateBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          keywords: keywords.split(",").map((k) => k.trim()),
          language,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedBlog(data.result); // Set the generated blog content
      } else {
        alert(data.message || "Error generating blog content");
      }
    } catch (error) {
      alert(`Error generating blog post ${error}`);
    }
    setLoading(false);
    clearInterval(progressInterval); // Stop progress bar on completion
    setProgress(100); // Ensure the progress bar reaches 100%
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">AI Blog Post Generator</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter blog title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter keywords (comma separated)"
          className="w-full p-2 border rounded mb-4"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mb-4"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="Arabic">Arabic</option>
        </select>

        Tone 
        <select
          className="w-full p-2 border rounded mb-4"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="formal">Formal</option>
          <option value="informal">Informal</option>
          <option value="conversational">Conversational</option>
        </select>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={generateBlog}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Blog Post"}
        </button>
      </div>

      {loading && (
        <div className="mt-6 w-full max-w-2xl">
          <div className="bg-gray-200 h-2 rounded-full w-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">{progress}%</p>
        </div>
      )}

      {generatedBlog && (
        <div className="mt-6 bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-2">Generated Blog</h2>
          <p className="whitespace-pre-line">{generatedBlog}</p>
        </div>
      )}
    </div>
  );
}
