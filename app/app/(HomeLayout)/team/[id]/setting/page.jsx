import { getTeam } from "@/app/api/team/get"
import Link from "next/link"
import Setting from "@/components/dashboard/team/Setting"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ColorTranslator } from 'colortranslator'

export default async function page({ params, searchParams }) {

    return (
        <Suspense fallback={<LoadUi />}>
            <Loader params={params} rootUrl={process.env.ROOT_URL} />
        </Suspense>
    )
}

export async function generateMetadata({ params }) {

    const team = await getTeam(params.id)

    return {
        title: team ? `${team.name} - Settings` : '404 - Page not found !'
    };
}


const Loader = async ({ params, rootUrl }) => {

    const team = await getTeam(params.id)

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


    return <>
        <style>
            {`:root { --primaryBase: ${new ColorTranslator(team.color).HSL.replace("hsl(", "").replace(")", "")} !important}`}
        </style>
        <div className="w-full p-3 lg:p-7 border-b border-input lg:flex hidden">
            <h1 className="text-lg text-foreground/70">Dashboard / Team / <span style={{ backgroundColor: team.color }} className="px-3 mx-1 rounded-full !text-foreground/100">{team.name}</span> / Setting</h1>
        </div>
        <div className="p-3 lg:p-7 w-full  max-h-[80svh] h-full " >
            <div className="w-full h-full max-w-7xl mx-auto 2xl:pt-14">
                <div className="bg-transparent mb-4 inline-flex h-10 items-center justify-center rounded-md  p-1 text-muted-foreground">
                    <Link className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm`} href='./projects'>Projects</Link>
                    <Link className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm`} href='./members'>Members</Link>
                    <Link style={{ color: team.color, borderColor: team.color }} className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b shadow-sm opacity-100 font-semibold`} href='./setting'>Setting</Link>
                </div>
                <div className="pb-7 h-full w-full z-10">
                    <Setting rootUrl={rootUrl} team={team} />
                </div>
            </div>
        </div>
    </>

}

const LoadUi = () => {

    return (

        <>
            <div className="w-full p-3 lg:p-7 border-b border-input">
                <h1 className="text-lg text-foreground/70 flex gap-2">Dashboard / Team / <div className="bg-primary/5 w-24 h-7 rounded-full animate-pulse" /> / Setting</h1>
            </div>
            <div className="p-3 lg:p-7 w-full  max-h-[80svh] h-full max-w-7xl mx-auto 2xl:pt-14" >
                <div className="w-full h-full">
                    <div className="bg-transparent mb-4 inline-flex h-10 items-center justify-center rounded-md  p-1 text-muted-foreground gap-4">
                        <div className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm bg-primary/5 w-24 h-7 rounded-full animate-pulse`} ></div>
                        <div className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm bg-primary/5 w-24 h-7 rounded-full animate-pulse`} ></div>
                        <div className={`inline-flex items-center border-input justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:text-foreground data-[state=active]:shadow-sm bg-primary/5 w-24 h-7 rounded-full animate-pulse`} ></div>
                    </div>
                    <div className="pb-7 h-full w-full">
                        <div className="w-full h-full flex">
                            <div className='px-3 w-full max-w-2xl mx-auto h-full flex items-center justify-center flex-col gap-8'>
                                <div className='w-full px-5 rounded-md'>
                                    <h1 className="w-52 h-6 bg-primary/5 backdrop-blur-xl animate-pulse mb-2"></h1>
                                    <p className="w-full h-6 bg-primary/5 backdrop-blur-xl animate-pulse"></p>
                                    <div className="h-16 mt-4 w-full bg-primary/5 backdrop-blur-xl animate-pulse">
                                    </div>
                                    <div className='w-full mt-10 rounded-md max-w-lg mx-auto'>
                                        <p className="h-6 bg-primary/5 backdrop-blur-xl animate-pulse w-1/3"></p>
                                        <div className="h-10 my-2 w-full bg-primary/5 backdrop-blur-xl animate-pulse" />
                                        <div className="w-full flex items-center justify-end">
                                            <div className="h-10 w-44 rounded-full bg-primary/5 backdrop-blur-xl animate-pulse">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-60 h-full flex items-center justify-center ">
                                <div className="w-max h-max flex flex-col gap-2 border-l border-input">
                                    <button className={`${(true) ? "border-l-4 border-primary/50 font-semibold" : "border-l-4 border-transparent text-foreground/80 hover:text-primary hover:font-semibold"} p-3  -translate-x-0.5 w-max`}>
                                        <h1 className="w-48 h-6 bg-primary/5 backdrop-blur-2xl animate-pulse"></h1>
                                    </button>
                                    <button className={`${(!true) ? "border-l-4 border-primary/50 font-semibold" : "border-l-4 border-transparent text-foreground/80 hover:text-primary hover:font-semibold"} p-3  -translate-x-0.5 w-max`}>
                                        <h1 className="w-48 h-6 bg-primary/5 backdrop-blur-2xl animate-pulse"></h1>
                                    </button>
                                    <button className={`${(!true) ? "border-l-4 border-primary/50 font-semibold" : "border-l-4 border-transparent text-foreground/80 hover:text-primary hover:font-semibold"} p-3  -translate-x-0.5 w-max`}>
                                        <h1 className="w-48 h-6 bg-primary/5 backdrop-blur-2xl animate-pulse"></h1>
                                    </button>
                                    <button className={`${(!true) ? "border-l-4 border-primary/50 font-semibold" : "border-l-4 border-transparent text-foreground/80 hover:text-primary hover:font-semibold"} p-3  -translate-x-0.5 w-max`}>
                                        <h1 className="w-48 h-6 bg-primary/5 backdrop-blur-2xl animate-pulse"></h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}