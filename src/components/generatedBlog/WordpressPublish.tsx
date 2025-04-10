import { marked } from 'marked';
import React from 'react'
import { FaWordpress } from 'react-icons/fa';

type WordpressPublishProps = {
    markdown: string;
}

const WordpressPublish = ({ markdown }: WordpressPublishProps) => {

    async function publishPost(title: string, markdownContent: string) {
        const htmlContent = marked(markdownContent);
        const username = "elouazzani.m.a@gmail.com";
        const appPassword = "uS6E 0IJK CAAw Xna5 rFPU Hozt";
        const auth = btoa(`${username}:${appPassword}`);

        const response = await fetch("https://desiertotours.es/wp-json/wp/v2/posts", {
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
            className="mt-2 px-4 py-2 bg-[#2271b1] text-white rounded cursor-pointer flex items-center gap-3">
            Publish to Wordpress <FaWordpress size={23} />
        </button>
    )
}

export default WordpressPublish

// pwd:simo123
// user:belalia