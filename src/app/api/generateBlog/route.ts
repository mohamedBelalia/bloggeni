export async function POST(request: Request) {
    try {
        const { title, keywords, language, size, tone, details } = await request.json();

        if (!title || !keywords || !language || !details ) {
            return new Response(
                JSON.stringify({ message: `Missing required fields title : ${title} | keys :${keywords} | lang: ${language} | details ${details}` }),
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY
        // "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";
        if (!apiKey) {
            return new Response(
                JSON.stringify({ message: "Missing API Key. Set OPENROUTER_API_KEY in Vercel." }),
                { status: 500 }
            );
        }

        const prompt = `Act as a professional SEO content writer with expertise in crafting engaging, well-structured, and informative blog posts that feel natural and human-written. Your task is to write a high-quality blog post based on the following details:  

                - **Title:** ${title}
                - **Main Keywords:** ${keywords} (Use these naturally and strategically for SEO without overstuffing.)  
                - **Language:** ${language ?? "english"}
                - **Article Size:** ${size ?? "Medium"}
                - **Tone of Voice:** ${tone ?? "Formal"}  
                - **Details to Include:** ${details ?? "none"} 

                ### **SEO Optimization Guidelines:**  
                1. **Engaging Introduction:** Start with a compelling hook that captures the reader’s attention. Clearly define the purpose of the article and naturally introduce the main keyword within the first 100 words.  
                2. **Well-Structured Headings (H1, H2, H3, etc.):** Break the content into scannable sections, incorporating **long-tail keywords** and **semantic variations** naturally.  
                3. **Conversational and Human-Like Tone:** Avoid AI-generated patterns, use contractions, rhetorical questions, and an engaging narrative style. Make the content **feel like it was written by a real expert.**  
                4. **SEO Best Practices:** Use keywords strategically in headings, subheadings, and the body (without overstuffing). Implement **LSI (Latent Semantic Indexing) keywords** related to the topic to improve search rankings.  
                5. **Actionable and Valuable Content:** Provide in-depth explanations, examples, statistics (if possible), and practical advice. Use **bullet points** and **numbered lists** to enhance readability.  
                6. **Call to Action (CTA):** End with a natural and compelling CTA, encouraging engagement, comments, or social sharing.  

                ### **Formatting & Style:**  
                - Keep paragraphs short (2-4 sentences max) for readability.  
                - Use a mix of simple and complex sentences to maintain a natural flow.  
                - Avoid robotic repetition and keep the tone dynamic and engaging.  
                - If storytelling is preferred, add a relatable anecdote or an analogy to keep readers hooked.  

                Now, generate the **best-quality** blog post based on these guidelines! 🚀  
                `;

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
