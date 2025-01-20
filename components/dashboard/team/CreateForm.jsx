"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { GooSpinner } from "react-spinners-kit"

export default function CreateForm({ user }) {

    const fancyColorsHex = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#0ea5e9", "#6366f1" ];
    const [index, setIndex] = useState(0)

    const [isPending, startTransition] = useTransition()
    const [teamName, setTeamName] = useState(`${user.name}'s Team`)

    const router = useRouter()

    const handleCreateTeam = () => {
        if (teamName.length < 5) {
            alert("Name should be at least 5 letters")
        } else {
            startTransition(async () => {
                const teamData = await fetch("/api/team", {
                    cache: "no-cache",
                    method: "Post",
                    body: JSON.stringify({
                        teamName: teamName,
                        color: fancyColorsHex[index]
                    })
                })
                const team = await teamData.json()

                router.push(`/app/team/${team.newTeam.id}/projects`)
                router.refresh()
            })
        }
    }

    return (
        <div className="mx-auto flex flex-col items-center justify-center h-full  w-full max-w-lg ">
            <div className="w-full">
                <Label className="font-medium">Team's Name </Label>
                <Input autoFocus={true} value={teamName} onChange={e => setTeamName(e.target.value)} className="bg-transparent h-12 text-foreground/70 placeholder:text-foreground/40 mt-2" placeholder={"Team's name"} />
            </div>
            <div className="flex items-start w-full justify-start gap-2 m-5 ">
                {fancyColorsHex.map((col, i) => (
                    <button onClick={() => setIndex(i)} style={{ backgroundColor: col }} className={`h-7 w-7 rounded-full items-center justify-center flex ease-in-out duration-200 hover:scale-105 ${index === i && "scale-105"} `}>
                        {(index === i) && <Check className={`${(col === "white") ? "text-background" : "text-foreground"}`} size={17} />}
                    </button>
                ))}
            </div>
            <div className="flex items-start w-full justify-end  gap-2 m-5 ">
                {!isPending ? <Button onClick={handleCreateTeam} variant="outline" className="px-14 rounded-full hover:bg-primary/80 bg-primary/50 font-medium">
                    Create
                </Button>
                    : <Button disabled variant="outline" className="rounded-full bg-primary/50 overflow-hidden">
                        <GooSpinner size={30} color="white" />
                    </Button>
                }
            </div>
        </div>
    )
}
