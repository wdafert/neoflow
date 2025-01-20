// app/api/chat/route.ts

import { HfInference } from '@huggingface/inference'
import { HuggingFaceStream, StreamingTextResponse } from 'ai'

const HF_API_KEY = ''

// Create a new HuggingFace Inference instance
const Hf = new HfInference(HF_API_KEY)

// Build a prompt from the messages
function buildPrompt(messages: { content: string; role: 'system' | 'user' | 'assistant' }[]) {
    return (
        messages
            .map(({ content, role }) => {
                if (role === 'user') {
                    return `Human: ${content}`;
                } else {
                    return `Assistant: ${content}`;
                }
            })
            .join('\n\n') + 'Assistant:'
    );
}

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    // Request the HuggingFace API for the response based on the prompt
    const response = await Hf.textGenerationStream({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        inputs: buildPrompt(messages),
        parameters: {
            max_new_tokens: 2000,
            temperature: 0.5,
            top_p: 0.95,
            top_k: 12,
            repetition_penalty: 1.03,
            truncate: 1000,
        }
    })

    // Convert the response into a friendly text-stream
    const stream = HuggingFaceStream(response)

    // Respond with the stream
    return new StreamingTextResponse(stream)
}