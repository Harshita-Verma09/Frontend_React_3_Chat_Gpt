
//  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

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
});

export async function main() {
    const chatCompletion = await getGroqChatCompletion("Explain the importance of fast language models");
    console.log(chatCompletion.choices[0]?.message?.content || "No response content available");
}

export async function getGroqChatCompletion(input) {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: input,
                },
            ],
            model: "llama3-8b-8192",
        });
        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}
