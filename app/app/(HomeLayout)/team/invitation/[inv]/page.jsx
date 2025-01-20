import { redirect } from 'next/navigation'
import { PrismaClient } from "@prisma/client"
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Rediector from "./redirector"
import { inviteRequest } from '@/app/api/team/invitation/accept/route'

export default function page({ params }) {

    return (
        <Suspense fallback={<LoaderUi />}>
            <Loader params={params} />
        </Suspense>
    )
}

const Loader = async ({ params }) => {

    const team = await inviteRequest(params.inv)

    if (!team) {
        return <div className="h-full w-full flex items-center justify-center flex-col gap-2">
            <h1 className="text-5xl font-bold">404</h1>
            <p className="text-primary/60">Page not found !</p>
            <Link href="/app/team/new">
                <Button variant="outline" className="mt-3 rounded-full bg-primary/60 px-7">
                    Create new team
                </Button>
            </Link>
        </div>
    }


    return <Rediector url={`/app/team/${team.teamId}/projects`} name={team.teamName}/>
}

const LoaderUi = () => {

    return <div className='flex h-[100svh] w-full items-center justify-center gap-4'>
        <Loader2 className='animate-spin text-primary/70' />
        Find Team ...
    </div>
}