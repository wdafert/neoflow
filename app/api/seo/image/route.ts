//@ts-nocheck
import { NextResponse } from "next/server"


export const GET = async (request: Request) => {


    const { searchParams } = new URL(request.url);
    const color = searchParams.get("color")

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <circle cx="10" cy="10" r="10" fill="${color}" />
        </svg>
    `;

    return new NextResponse(svg,
        {headers: { 'content-type': 'text/html' } }
    )
}