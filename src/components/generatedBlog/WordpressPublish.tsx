import { marked } from 'marked';
import React from 'react'

type WordpressPublishProps = {
    markdown: string;
}

const WordpressPublish = ({ markdown }: WordpressPublishProps) => {

    async function publishPost(title: string, markdownContent: string) {
        const htmlContent = marked(markdownContent);
        const username = "elouazzani.m.a@gmail.com";
        const appPassword = "kqWz qmEr fyP0 xLTR bspu gIDK";
        const auth = btoa(`${username}:${appPassword}`);

        const response = await fetch("https://dmcmarrakech.com/wp-json/wp/v2/posts", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${auth}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: htmlContent,
                status: "draft",
                date: "2025-03-13T10:00:00"
            })
        });

        const data = await response.json();
        console.log("Published Post:", data);
    }


    const publishWP = () => {
        publishPost("What Is DMC ?", markdown);
    }

    return (
        <button
            onClick={publishWP}
            className="mt-2 px-4 py-2 bg-[#076d81] text-white rounded cursor-pointer">
            Publish to Wordpress
        </button>
    )
}

export default WordpressPublish

// pwd:simo123
// user:belalia