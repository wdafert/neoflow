import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Plus, Users } from 'lucide-react'
import Link from 'next/link'

export default function TopActions() {
    return (
        <div className="w-full overflow-auto gap-2 py-2 ">
            <div className="w-full gap-2 grid grid-cols-1 lg:grid-cols-2">
                <Link href={"/app/solo"} className="hover:cursor-pointer w-full bg-primary/20 rounded-lg p-2.5 flex flex-col gap-1 border-primary/70 border">
                    <div className='w-full'>
                        <img className='h-28 w-full rounded-md object-cover' src='https://st.depositphotos.com/2673929/55726/i/450/depositphotos_557266152-stock-photo-stairway-podium-geometric-shapes-blue.jpg' />
                    </div>
                    <div className='p-1.5'>
                        <h1 className='font-extrabold text-xl'>Create Your Project</h1>
                        <p className='text-foreground/70 text-sm'>Easily craft sketches and design diagrams with AI assistance.</p>
                    </div>
                </Link>
                <div className='w-full h-full flex flex-col gap-2'>
                    <div className="w-full  rounded-lg p-2.5 flex gap-2 border-input border flex-1 items-center justify-between ">
                        <div className='p-1.5'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-extrabold text-xl'>Build Your Team</h1>
                            </div>
                            <p className='text-foreground/70 text-sm max-w-sm'>Invite your friends , where together you'll create wonders.</p>
                        </div>
                        <Link href={"/app/team/new"} >
                            <Button size="icon" className="rounded-full bg-primary/70 shadow-[0_0_10px] shadow-primary mr-3">
                                <ChevronRight size={17} />
                            </Button>
                        </Link>
                    </div>
                    <div className="w-full  rounded-lg p-2.5 flex gap-2 border-input border flex-1 items-center justify-between ">
                        <div className='p-1.5'>
                            <div class='flex items-center justify-between'>
                                <h1 class='font-extrabold text-xl'>Subscribe</h1>
                            </div>
                            <p class='text-foreground/70 text-sm max-w-sm'>Become a Pro member to unlock Neoflow's premium features.</p>
                        </div>
                        <Link href={"/app/subscribe"} >
                            <Button size="icon" className="rounded-full bg-primary/70 shadow-[0_0_10px] shadow-primary mr-3">
                                <ChevronRight size={17} />
                            </Button>
                        </Link>
                    </div>
                </div>
                {/* <div className="h-48 w-full border-input border rounded-lg" /> */}
            </div>
        </div>
    )
}
