// app/api/generateBlog/route.ts

export async function POST(request: Request) {
    try {
        const { title, keywords, language, tone } = await request.json();

        if (!title || !keywords || !language) {
            return new Response(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400 }
            );
        }

        const prompt = `Write a well-structured and SEO-friendly blog post in  ${language} with the title '${title}'.  The tone should feel natural and human—avoid robotic or repetitive phrasing. Use varied sentence structures, personal insights, and a mix of short and long sentences. Do NOT include any calls to action like 'Drop a comment below' or 'Share your thoughts.' Focus purely on delivering valuable content without any engagement prompts. Include keywords like ${keywords.join(", ")} naturally without over-optimization. Make the writing sound like it comes from a real person—add rhetorical questions, a conversational flow, and even an occasional anecdote or opinion. The goal is to make the content feel as if an expert is speaking rather than AI-generated.`
      
      
                    // const promptq = `Generate a detailed and SEO-friendly blog post in ${language} with the title '${title}'. The article should be well-structured, engaging, and optimized for search engines. Include relevant keywords such as ${keywords.join(", ")} throughout the content, ensuring natural integration. add bullet points for readability, and include a compelling introduction and conclusion. Keep the tone ${tone}. Also, suggest a meta description under 160 characters and a few SEO-friendly URL slug options.`

        const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat-v3-0324:free", // Choose the model that you prefer
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            return new Response(
                JSON.stringify({ message: "Error generating blog post", details: data }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify({ result: data.choices[0].message.content }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Server Error", error: error }), {
            status: 500,
        });
    }
}
