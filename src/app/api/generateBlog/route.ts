export async function POST(request: Request) {
    try {
        const { title, keywords, language } = await request.json();

        if (!title || !keywords || !language) {
            return new Response(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY ?? "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";
        if (!apiKey) {
            return new Response(
                JSON.stringify({ message: "Missing API Key. Set OPENROUTER_API_KEY in Vercel." }),
                { status: 500 }
            );
        }

        const prompt = `Write a well-structured and SEO-friendly blog post in ${language} with the title '${title}'. 
        The tone should feel natural and human—avoid robotic or repetitive phrasing. 
        Use varied sentence structures, personal insights, and a mix of short and long sentences. 
        Do NOT include any calls to action like 'Drop a comment below' or 'Share your thoughts.' 
        Focus purely on delivering valuable content without any engagement prompts. 
        Include keywords like ${keywords.join(", ")} naturally without over-optimization. 
        Make the writing sound like it comes from a real person—add rhetorical questions, a conversational flow, 
        and even an occasional anecdote or opinion. The goal is to make the content feel as if an expert is speaking rather than AI-generated.`;

        const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat-v3-0324:free",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const contentType = apiResponse.headers.get("content-type");
        const textResponse = await apiResponse.text(); // Read response before parsing

        if (!contentType || !contentType.includes("application/json")) {
            console.error("Unexpected response from OpenRouter:", textResponse);
            return new Response(
                JSON.stringify({ message: "Invalid response from OpenRouter", details: textResponse }),
                { status: 500 }
            );
        }

        const data = JSON.parse(textResponse);

        if (!apiResponse.ok || !data.choices || !data.choices[0]) {
            return new Response(
                JSON.stringify({ message: "Error generating blog post", details: data }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify({ result: data.choices[0].message.content }), { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
        return new Response(
            JSON.stringify({ message: "Server Error", error: error instanceof Error ? error.message : String(error) }),
            { status: 500 }
        );
    }
}
