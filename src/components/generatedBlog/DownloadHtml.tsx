"use client";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { FaHtml5 } from "react-icons/fa";
import { Button } from "../ui/button";

type DownloadHtmlProps = {
    markedText: string,
    title : string
}

const DownloadHtml = ({ markedText , title}: DownloadHtmlProps) => {
    const [markdown, setMarkdown] = useState<string>(markedText);

    useEffect(() => {
        setMarkdown(markedText)
    }, [markedText]);

    const convertAndDownload = () => {
        const htmlContent = marked(markdown);

        const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Markdown Converted</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1, h2, h3 { color: #333; }
                pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
            </style>
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
      `;

        const blob = new Blob([fullHTML], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button
            onClick={convertAndDownload}
            className="mt-2 px-4 py-2 bg-[#652293] hover:bg-[#652293] text-white rounded cursor-pointer flex justify-center items-center gap-2.5"
        >
            Download as HTML <FaHtml5 size={20} />
       </Button>
    );
}

export default DownloadHtml