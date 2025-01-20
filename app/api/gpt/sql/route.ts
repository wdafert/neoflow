//@ts-nocheck
import { NextResponse } from "next/server"


export const GET = async (request: Request) => {


    const options = (about: string) => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
                'Authorization': process.env.FIREWORKS_API_KEY,
            },
            body: JSON.stringify({
                model: "accounts/fireworks/models/qwen-14b-chat",
                stream: true,
                n: 1,
                messages: [
                    {
                        role: "user",
                        content: about
                    }
                ],
                stop: [
                    "<|im_start|>",
                    "<|im_end|>",
                    "<|endoftext|>"
                ],
                top_p: 1,
                top_k: 40,
                presence_penalty: 0,
                frequency_penalty: 0,
                context_length_exceeded_behavior: "truncate",
                temperature: 0.9,
                max_tokens: 4096
            }),
        }
    }

    const endpoint = "https://api.fireworks.ai/inference/v1/chat/completions"

    const { searchParams } = new URL(request.url);
    const input = searchParams.get("input")

    const template =
        ` transfom this class diagram to sql ${input} ?`;

    const reqData = await fetch(endpoint, options(template) as any)
    const data = await reqData.text()

    const dataFormat = async (dataGet) => {
        try {

            const inputText = dataGet.split("data: ").map((val) => {
                try {
                    return JSON.parse(val)
                } catch (e) {
                    return
                }
            }).filter((val) => {
                return val
            }).map((val) => {
                try {
                    return val.choices[0].delta.content
                } catch (e) {
                    return
                }
            }).join("")


            return inputText.split('```')[1].replace(/^[^\s]+/, '')

        } catch (e) {
            return e
        }
    }

    return NextResponse.json({
        apiResponse: await dataFormat(data)
    })
}