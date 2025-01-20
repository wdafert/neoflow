"use client"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Redirector({name, url}) {

    const router = useRouter()
    useEffect(()=>{
        router.push(url)
        router.refresh()
    }, [])

    return (
        <div className='flex h-[100svh] w-full items-center justify-center gap-4'>
            <Loader2 className='animate-spin text-primary/70' />
            redirecting to {name} ...
        </div>
    )
}
