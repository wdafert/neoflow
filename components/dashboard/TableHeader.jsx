"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { AlertTriangle, Dot, Loader2Icon, MenuIcon, MoreHorizontal, Pen, Plus } from "lucide-react";
import { useTransition } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { GooSpinner } from "react-spinners-kit"
import { toast } from "sonner";

export default function TableTop({ total, children }) {

    const router = useRouter()

    const [panding, startTransition] = useTransition()

    const handleCreate = () => {
        startTransition(async () => {
            const projectsReq = await fetch("/api/soloProjects", {
                cache: "no-cache",
                method: "Post",
            })
            const projects = await projectsReq.json()

            toast.success("Project created successfully! ✨")
            router.push(`/app/${projects.id}`)
            router.refresh()

        })
    }

    return (
        <>
            <div className="mb-3 flex items-center justify-between overflow-hidden">
                <h1><span className="font-semibold">Projects</span> ({total})</h1>
                {!panding ? <Button onClick={handleCreate} variant="outline" className="gap-3 px-6 rounded-full hover:bg-primary/80 bg-primary/50 font-medium">
                    New project
                    <Plus size={17} />
                </Button>
                    : <Button disabled variant="outline" className="rounded-full bg-primary/50">
                        <GooSpinner size={30} color="white" />
                    </Button>}
            </div>
            <div className="border border-input rounded-xl overflow-hidden">
                <Table >
                    <TableHeader className="bg-primary/5">
                        <TableRow className="border-input">
                            <TableHead className="font-medium">Name</TableHead>
                            <TableHead className="font-medium">Last update</TableHead>
                            <TableHead className="font-medium">Created at</TableHead>
                            <TableHead className="font-medium">Auther</TableHead>
                            <TableHead className="font-medium"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {panding && [...Array(5)].map(() => (
                            <TableCell>
                                <div className="w-full p-2 rounded bg-primary/10 animate-pulse" />
                            </TableCell>
                        ))}
                        {(total < 1 && !panding) && <TableRow >
                            <TableCell colspan="5">
                                <div className="w-full h-full p-4 flex items-center justify-center gap-3">
                                    <AlertTriangle size={18} />
                                    No project has been created yet!
                                </div>
                            </TableCell>
                        </TableRow>
                        }
                        {children}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
