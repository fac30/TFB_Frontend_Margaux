import OpenAI from "openai";

// Ensure the environment variable is accessible
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("Missing VITE_OPENAI_API_KEY in environment variables");
}

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey, // Use the API key from the environment variable
});

const generateChatResponse = async (userQuestion: string) => {
    // Send the user's question as a "system" message
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Or "gpt-4" if you have access
        messages: [
            {
                role: "system",
                content: userQuestion, // Pass the user question directly
            },
        ],
    });

    // Return the response content from the AI
    return completion.choices[0]?.message?.content || "Sorry, I didn't understand that.";
};

export { generateChatResponse };
