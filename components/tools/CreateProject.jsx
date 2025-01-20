import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

export default function CreateProject() {
    return (
        <div className='w-80 hover:w-96 p-4 bg-background/20 backdrop-blur-lg border border-input rounded-xl ease-in-out duration-200 '>
            Create New Project
            <p className=' mt-2 px-1 opacity-50 font-thin text-sm'>Creating sketches never been easier. enjoy free 5 project .</p>
            <div className='mt-2 flex items-end justify-end'>
                <Button className="rounded-lg px-5 gap-2 justify-center items-center" size="sm" variant="outline">
                    <Star size={15} />
                    Create Now
                </Button>
            </div>
        </div>
    )
}
