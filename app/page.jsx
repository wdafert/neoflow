"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeroParallaxDemo() {

    const router = useRouter()
    useEffect(() => {
        router.push("/app")
    }, [])
    return <p>  Page</p>
}
export const products = [
    {
        title: "Rogue",
        link: "https://userogue.com",
        thumbnail:
            "/3.png",
    },
    {
        title: "Moonbeam",
        link: "https://gomoonbeam.com",
        thumbnail:
            "/1.png",
    },
    {
        title: "Cursor",
        link: "https://cursor.so",
        thumbnail:
            "/2.png",
    },
];
