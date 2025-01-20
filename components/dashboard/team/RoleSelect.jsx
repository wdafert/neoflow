"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Check } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GooSpinner } from "react-spinners-kit"
import { Trash, Eye, Pen, UserRoundCog, Sparkle } from "lucide-react"

export default function RoleSelect({ doerId, doerRank, userId, userRank, team }) {

    const router = useRouter()

    const assistantStates = [
        { id: "assistant", name: "Assistant", icon: UserRoundCog },
        { id: "writer", name: "Writer", icon: Pen },
        { id: "reader", name: "Reader", icon: Eye },
    ]

    const leaderState = [
        { id: "leader", name: "Team leader", icon: Sparkle },
        { id: "assistant", name: "Assistant", icon: UserRoundCog },
        { id: "writer", name: "Writer", icon: Pen },
        { id: "reader", name: "Reader", icon: Eye },
        { id: "delete", name: "Delete Member", icon: Trash },
    ]

    const [isPending, startTransition] = useTransition()

    const handleUpdate = (rank) => {
        startTransition(async () => {
            const resultData = await fetch("/api/membership", {
                cache: "no-cache",
                method: "PUT",
                body: JSON.stringify({
                    userId: userId,
                    rank: rank,
                    team: team
                })
            })
            const result = await resultData.json()

            if (result.success) {
                router.refresh()
            }
        })
    }

    if (doerId === userId || userRank === "leader") return null
    if (["reader", "writer"].includes(doerRank)) return null
    if (doerRank === "assistant" && userRank === "assistant") return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="w-full h-full flex items-center justify-center">
                    {isPending ? <Button disabled variant="outline" className="rounded-full bg-primary/50 overflow-hidden">
                        <GooSpinner size={30} color="white" />
                    </Button>
                        : <Button disabled={doerRank === "member" || (doerRank === "assistant" && userRank !== "member")} variant="outline" className="border-0 bg-transparent ring-0" size="icon">
                            <MoreHorizontal size={15} className="text-for" />
                        </Button>}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-input backdrop-blur-lg w-[180px] bg-transparent ">
                <DropdownMenuLabel>Update Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {((doerRank === "leader") ? leaderState : (doerRank === "assistant") ? assistantStates : []).map((role) => (
                    <>
                        {role.id === "delete" && <DropdownMenuSeparator />}
                        <DropdownMenuItem className={`${role.id === "delete" && "focus:bg-destructive"} ${userRank !== role.id && "text-foreground/70"}`} onClick={() => handleUpdate(role.id)}>
                            {(userRank !== role.id) && <role.icon size={15} className={`${userRank !== role.id ? "text-foreground/70" : "text-foreground "} mr-2 `} />}
                            {(userRank === role.id) && <Check size={15} className="text-foreground mr-3" />}
                            {role.name}
                        </DropdownMenuItem>
                    </>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
