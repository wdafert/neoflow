import { Check, Wallet } from 'lucide-react'
import { PinContainer } from "@/components/ui/3d-pin"

export async function metadata() {
    return {
        title: "Neoflow - Plans & Billing",
    };
}

export default function page() {

    const cost = {
        free: [
            "Unlimited Projects",
            "Unlimited Teams",
            "Unlimited AI Credits",
            "Unlimited AI Diagrams Chat",
            "Unlimited Realtime Collaboration",
        ]
    }

    return (
        <div className="p-10">
            <div className='flex gap-4'>
                <Wallet size={28} className='text-primary/70 ' />
                <div className='flex flex-col'>
                    <h1 className='flex items-center justify-center w-max gap-4 text-2xl font-semibold'>
                        Plans & Billing
                    </h1>
                    <p className='text-foreground/60'>You are currently on the Free plan. </p>
                </div>
            </div>
            <div className='mx-auto max-w-xl grid-cols-1 lg:grid-cols-2 gap-2  mt-20'>
                <PinContainer
                    title="YOUR CURRENT PLAN"
                >
                    <div className='w-full px-4 py-8'>
                        <h1 className='mb-6 text-2xl font-bold'>Free</h1>
                        {cost.free.map((f) => (
                            <div className='flex w-max gap-3 items-center text-foreground/80 justify-start my-1'>
                                <Check className='text-primary/80' size={18} /> {f}
                            </div>
                        ))}
                    </div>
                </PinContainer>
            </div>
        </div>
    )
}
