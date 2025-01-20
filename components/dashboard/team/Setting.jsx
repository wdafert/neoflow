"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Link2 } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { GooSpinner } from "react-spinners-kit"
import { toast } from "sonner"

export default function Setting({ team, rootUrl }) {

    const tabs = [
        { id: "profile", name: "Profile" },
        { id: "invitation", name: "Invitiation" },
        { id: "leave", name: "Leave Team" },
        { id: "delete", name: "Delete" },
    ]

    const context = {
        invitation: <Invitation rootUrl={rootUrl} team={team} />,
        profile: <UpdateForm team={team} />,
        delete: <DeleteForm team={team} />,
        leave: <Leave team={team} />
    }

    const searchParams = tabs.map((val) => { return val.id }).includes(useSearchParams().get('tab')) ? useSearchParams().get('tab') : "profile"
    const [tab, setTab] = useState(searchParams)

    return (
        <div className="w-full h-full flex flex-col-reverse lg:flex-row">
            <div className='lg:px-3 w-full max-w-2xl mx-auto lg:py-0 py-10 h-full flex lg:items-center lg:justify-center flex-col gap-8'>
                {context[tab]}
            </div>
            <div className="lg:w-60 flex-1 lg:h-full flex items-center justify-center ">
                <div className="w-max h-max flex lg:flex-col gap-2 lg:border-l border-input flex-row">
                    {tabs.map((val) => (
                        <button onClick={() => setTab(val.id)} className={`${(val.id === tab) ? "lg:border-l-4 lg:border-b-0 border-b border-primary/50 backdrop-blur-3xl text-primary/80 font-semibold" : "border-l-4 border-transparent text-foreground/80 hover:text-primary hover:font-semibold"} lg:p-3  -translate-x-0.5 w-max`}>
                            <h1 >{val.name}</h1>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Invitation = ({ team, rootUrl }) => {

    const [isPublic, setIsPublic] = useState(team.invitationState)
    const [isPendingSw, startTransitionSw] = useTransition()
    const [isPendingE, startTransitionE] = useTransition()
    const router = useRouter()

    const handleswitchUp = (e) => {

        startTransitionSw(async () => {
            const teamData = await fetch("/api/team/invitation", {
                cache: "no-cache",
                method: "PUT",
                body: JSON.stringify({
                    teamId: team.id,
                    state: e
                })
            })
            const _team = await teamData.json()

            if (_team.state) {
                router.refresh()
                setIsPublic(e)
                toast.success("The team information has been successfully updated")
            } else {
                toast.error(_team.message)
            }
        })
    }


    const handleCopy = () => {

        navigator.clipboard.writeText(`${rootUrl}/app/team/invitation/${team.invitationCode}`)
        toast.success('Inviation link copied')
    }

    const [emails, setEmails] = useState('')

    const handleInviteMails = () => {
        startTransitionE(async () => {
            const teamData = await fetch("/api/team/invitation/solo", {
                cache: "no-cache",
                method: "POST",
                body: JSON.stringify({
                    teamId: team.id,
                    emails: emails
                })
            })
            const _team = await teamData.json()

            if (_team.state) {
                toast.success(_team.message)
                setEmails("")
                router.refresh()
            } else {
                toast.error(_team.message)
            }
        })
    }

    return (
        <>
            <div className='w-full px-5 rounded-md'>
                <div className="w-full flex items-center justify-start gap-5">
                    <h1>Invitiation link</h1>
                    {
                        !isPendingSw ?
                            <Switch checked={isPublic} onCheckedChange={handleswitchUp} />
                            : <div className="w-14 h-7 rounded-full bg-primary/5 animate-pulse" />
                    }
                </div>
                {isPublic && <div className="w-full flex items-center justify-between mt-1.5">
                    {!isPendingSw ? <>
                        <Input className="h-8 px-0 bg-transparent backdrop-blur-xl text-foreground/60 border-transparent -z-10" value={`${rootUrl}/app/team/invitation/${team.invitationCode}`} />
                        <button onClick={handleCopy} className="text- text-primary/50 flex items-center justify-end gap-2 w-32">
                            <Link2 size={18} />
                            Copy link
                        </button>
                    </> : <>
                        <Input className="h-8 px-0 bg-primary/5 backdrop-blur-xl text-foreground/60 border-transparent -z-10 animate-pulse" value="" />
                        <button className="bg-primary/50 animate-pulse h-8 flex items-center justify-end gap-2 w-32 ml-2 rounded">
                        </button>
                    </>}
                </div>}
            </div>
            {/* <div className='w-full px-5 rounded-md'>
                <h1 >Invite</h1>
                <p className="mb-3 font-light text-foreground/70 text-sm">You can invite users by adding their email addresses.</p>
                <Input value={emails} onChange={(e) => setEmails(e.target.value)} type="email" className="h-12 bg-transparent backdrop-blur-xl mb-1" placeholder="Separate the emails with commas 'space' " />
                <div className="flex flex-wrap gap-1 py-1 max-h-20 overflow-auto">
                    {emails.trim().split(" ").map((em) => (
                        /\S+@\S+\.\S+/.test(em) && <div className="bg-primary/20 border border-primary px-2 py-1 rounded text-sm font-medium">{em}</div>
                    ))}
                </div>
                <div className="w-full flex items-center justify-end">
                    {isPendingE ?
                        <Button className="px-8 rounded-full font-medium mt-3 overflow-hidden  bg-primary/50">
                            <GooSpinner size={30} color="white" />
                        </Button> :
                        <Button onClick={handleInviteMails} className="px-8 rounded-full hover:bg-primary/80 bg-primary/50 font-medium mt-3">
                            Send Email
                        </Button>
                    }
                </div>
            </div> */}
        </>
    )
}


const UpdateForm = ({ team }) => {

    const fancyColorsHex = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#0ea5e9", "#6366f1"];
    const [index, setIndex] = useState(fancyColorsHex.findIndex((col) => { return col === team.color }))

    const [isPending, startTransition] = useTransition()
    const [teamName, setTeamName] = useState(team.name)

    const router = useRouter()

    const handleUpdateTeam = () => {
        if (teamName.length < 5) {
            toast.error("Name should be at least 5 letters")
        } else {
            startTransition(async () => {
                const teamData = await fetch("/api/team", {
                    cache: "no-cache",
                    method: "PATCH",
                    body: JSON.stringify({
                        teamId: team.id,
                        teamName: teamName,
                        color: fancyColorsHex[index]
                    })
                })
                const _team = await teamData.json()

                if (_team.state) {
                    toast.success("The team information has been successfully updated")
                    router.refresh()
                } else {
                    toast.error(_team.message)
                }
            })
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-5">
            <div className="w-full">
                <Label className="font-medium">Team's Name </Label>
                <Input autoFocus={true} value={teamName} onChange={e => setTeamName(e.target.value)} className="bg-transparent h-12 text-foreground/70 placeholder:text-foreground/40 mt-2" placeholder={"Team's name"} />
            </div>
            <div className="flex items-start w-full justify-start gap-2">
                {fancyColorsHex.map((col, i) => (
                    <button onClick={() => setIndex(i)} style={{ backgroundColor: col }} className={`h-7 w-7 rounded-full items-center justify-center flex ease-in-out duration-200 hover:scale-105 ${index === i && "scale-105"} `}>
                        {(index === i) && <Check className={`${(col === "white") ? "text-background" : "text-foreground"}`} size={17} />}
                    </button>
                ))}
            </div>
            <div className="flex items-start w-full justify-end  gap-2 mt5">
                {!isPending ? <Button onClick={handleUpdateTeam} variant="outline" className="px-14 rounded-full hover:bg-primary/80 bg-primary/50 font-medium">
                    Update
                </Button>
                    : <Button disabled variant="outline" className="rounded-full bg-primary/50">
                        <GooSpinner size={30} color="white" />
                    </Button>
                }
            </div>
        </div>
    )
}

const DeleteForm = ({ team }) => {

    const [isPending, startTransition] = useTransition()
    const [confirmation, setConfirmation] = useState("")

    const router = useRouter()

    const handleDelete = async () => {
        if (confirmation.trim() !== `delete ${team.name}`.trim()) {
            toast.error("Incorrect confirmation code")
        } else {
            startTransition(async () => {
                try {
                    const teamData = await fetch("/api/team", {
                        cache: "no-cache",
                        method: "DELETE",
                        body: JSON.stringify({
                            teamId: team.id
                        })
                    })
                    const _team = await teamData.json()

                    if (_team.state) {
                        router.push("/app/")
                        router.refresh()
                    } else {
                        toast.error(_team.message)
                    }
                } catch (e) {
                    toast.error("Error")
                }
            })
        }
    }

    return (
        <>
            <div className='w-full px-5 rounded-md'>
                <h1 className="text-xl font-semibold">Delete Team</h1>
                <p className="font-light text-foreground/70 text-sm">This team will be deleted, along with all of its projects, memberships, and Settings.</p>
                <div className="my-4 text-red-400 p-3 bg-destructive/40 font-bold rounded-md">
                    Warning:
                    This action is not reversible. Please be certain.
                </div>
                <div className='w-full mt-16 rounded-md max-w-lg mx-auto'>
                    <p className="mb-1 font-light text-foreground/70 text-sm">To verify, type <span className="font-bold">delete {team.name}</span> below:</p>
                    <Input autoFocus={true} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} className="h-12 bg-transparent backdrop-blur-xl" placeholder="confirmation" />
                    <div className="w-full flex items-center justify-end">
                        {isPending ?
                            <Button className="px-8 rounded-full hover:bg-red-500 bg-red-500/70 font-medium mt-3 overflow-hidden">
                                <GooSpinner size={30} color="white" />
                            </Button>
                            : <Button onClick={handleDelete} className="px-8 rounded-full hover:bg-red-500 bg-red-500/70 font-medium mt-3">
                                Delete Team
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const Leave = ({ team }) => {

    const [isPending, startTransition] = useTransition()
    const [confirmation, setConfirmation] = useState("")

    const router = useRouter()

    const handleDelete = async () => {
        if (confirmation !== `leave`.trim()) {
            toast.error("Incorrect confirmation code")
        } else {
            startTransition(async () => {
                try {
                    const teamData = await fetch("/api/membership", {
                        cache: "no-cache",
                        method: "DELETE",
                        body: JSON.stringify({
                            teamId: team.id
                        })
                    })
                    const _team = await teamData.json()

                    if (_team.state) {
                        router.push("/app/")
                        router.refresh()
                    } else {
                        toast.error(_team.message)
                    }
                } catch (e) {
                    toast.error("Error")
                }
            })
        }
    }

    return (
        <>
            <div className='w-full px-5 rounded-md'>
                <div className='w-full mt-16 rounded-md max-w-lg mx-auto'>
                    <h1 className="text-xl font-semibold">Leave Team</h1>
                    <p className="mb-2 font-light text-foreground/70 text-sm">To verify, type <span className="font-bold">leave</span> my project below:</p>
                    <Input autoFocus={true} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} className="h-12 bg-transparent backdrop-blur-xl" placeholder="confirmation" />
                    <div className="w-full flex items-center justify-end">
                        {isPending ?
                            <Button onClick={handleDelete} className="px-8 rounded-full hover:bg-red-500 bg-red-500/70 font-medium mt-3 overflow-hidden">
                                <GooSpinner size={30} color="white" />
                            </Button>
                            : <Button onClick={handleDelete} className="px-8 rounded-full hover:bg-red-500 bg-red-500/70 font-medium mt-3">
                                Leave Team
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}