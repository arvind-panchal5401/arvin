import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-3.5-flash-lite',
    apiKey: process.env.GOOGLE_API_KEY,
});

export async function aiService() {
    model.invoke('what is the captail of america?').then((response) => {
        console.log('AI Response:', response.content);
    })
}
        