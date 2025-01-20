"use client"
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProjectAction from "./ProjectAction";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { Input } from "./../../ui/input"
import { Button } from "../../ui/button";
import { GooSpinner } from "react-spinners-kit";
import { toast } from "sonner";

function timeAgo(dateString) {
    const inputDate = new Date(dateString);
    return formatDistanceToNow(inputDate, { addSuffix: true });
}

export default function Cell({ project }) {

    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const hanldeRedirect = () => {
        router.push(`/app/${project.id}`)
    }

    const [isRename, setIsRename] = useState(false)
    const [text, setText] = useState(project.title)


    const handleDelete = () => {
        startTransition(async () => {
            const projectReq = await fetch(`/api/soloProjects/${project.id}`, {
                method: "DELETE",
                cache: "no-cache",
                body: JSON.stringify({ projectId: project.id }),
            })

            const res = await projectReq.json()
            if (res.success) {
                toast.success("Project deleted successfully! 🗑️")
                router.refresh()
            }
        })
    }

    const handleCopy = () => {
        startTransition(async () => {
            const projectReq = await fetch(`/api/soloProjects/copy`, {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify({ projectId: project.id }),
            })

            const res = await projectReq.json()
            if (res.success) {
                router.push(res.id)
                router.refresh()
                toast.success("Project copied successfully! 🎉")
            } else {
                toast.error("Unable to copy this project. Please try again later.")
            }
        })
    }

    const handleSave = (e) => {
        startTransition(async () => {
            const projectReq = await fetch(`/api/soloProjects/${project.id}`, {
                cache: "no-cache",
                body: JSON.stringify({ title: e }),
                method: "PUT",
            })

            const res = await projectReq.json()
            if (res.success) {
                toast.success("Project renamed successfully! 🔄")
                router.refresh()
            }
        })
    }

    return (
        <TableRow className="hover:cursor-pointer border-input whitespace-nowrap">
            <TableCell onClick={!isRename && hanldeRedirect}>
                {isRename ? <Form text={text} setText={setText} setIsRename={setIsRename} project={project} isRename={isRename} handleSave={handleSave} />
                    : project.title.length > 22 ? `${project.title.substring(0, 22)}...` : project.title}
            </TableCell>
            <TableCell onClick={!isRename && hanldeRedirect}>{timeAgo(project.updatedAt)}</TableCell>
            <TableCell onClick={!isRename && hanldeRedirect} >{timeAgo(project.createAt)}</TableCell>
            <TableCell onClick={!isRename && hanldeRedirect} className="hover:cursor-pointer">
                <Avatar>
                    <AvatarImage className="object-cover" src={project.auther.image} />
                    <AvatarFallback>{project.auther.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell>
                {isPending ?
                    <Button disabled variant="outline" className="rounded-full bg-primary/50 overflow-hidden">
                        <GooSpinner size={30} color="white" />
                    </Button>
                    : <ProjectAction
                        handleDelete={handleDelete}
                        handleCopy={handleCopy}
                        hanldeRedirect={hanldeRedirect}
                        setIsRename={setIsRename}
                        id={project.id} />}
            </TableCell>
        </TableRow>
    )
}


const Form = ({ setIsRename, text, setText, project, isRename, handleSave }) => {

    const beforeSave = async (e) => {
        if (e && e !== project.title) {
            await handleSave(e)
        }

        setIsRename(false)
    }

    const inputRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 300);
    }, [isRename]);

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            beforeSave(text)
        }} className={`${!isRename && "hidden"}`} >
            <Input ref={inputRef} onBlur={() => beforeSave(text)} onChange={(e) => setText(e.target.value)} variant="outline" value={text} className="bg-transparent" />
        </form>
    )
}