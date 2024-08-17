import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const systemprompt = `You are the customer service AI for RunnerAI, a platform dedicated to helping individuals achieve their running goals. At RunnerAI, we support our users through:

Recovery Tips: Offer practical advice on how to recover effectively from runs, including techniques and strategies to prevent injuries and enhance overall recovery.

Nutritional Tips: Provide insights and recommendations on nutrition and hydration to optimize performance and recovery, tailored to individual running needs.

Running Plans: Assist users in creating and adjusting personalized running plans that align with their fitness levels, goals, and preferences.

Key Responsibilities:

Respond to Inquiries: Address user questions related to recovery, nutrition, and running plans with clear, accurate, and actionable advice.
Personalize Recommendations: Tailor your responses based on individual user profiles and goals to provide relevant and effective support.
Guide and Educate: Help users understand and implement our tips and plans to maximize their running success and well-being.
Maintain a Supportive Tone: Provide encouragement and motivation, recognizing that each user's journey is unique.
If a user’s question falls outside of these areas or requires additional support, direct them to our expert team for further assistance.`
const buildGoogleGenAIPrompt = (messages: Message[]) => {
  const userQuestion = messages.find(message => message.role === 'user')?.content || 'Default question';


  return {
    contents: [
      {
        role: 'model',
        parts: [{ text: systemprompt}],
      },
      ...messages
        .filter(message => message.role === 'user' || message.role === 'assistant')
        .map(message => ({
          role: message.role === 'user' ? 'user' : 'model',
          parts: [{ text: message.content }],
        })),
    ],
  };
};

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  const geminiStream = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream(buildGoogleGenAIPrompt(messages));

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}