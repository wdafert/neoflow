import {
    Copy,
    Eye,
    MoreHorizontal,
    Pen,
    TextCursorInput,
    Trash
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProjectAction({ handleDelete, setIsRename, hanldeRedirect, handleCopy, role }) {

    const myRole = () => ["leader", "assistant"].includes(role)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-0 bg-transparent ring-0 hover:cursor-context-menu" size="icon">
                    <MoreHorizontal size={15} className="text-for" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 bg-transparent backdrop-blur">
                <DropdownMenuLabel>Edit project</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={hanldeRedirect}>
                        {myRole() || role === "writer" ? <>
                            <Pen className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </> :
                            <>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View</span>
                            </>}
                    </DropdownMenuItem>
                    {myRole() && <>
                        <DropdownMenuItem onClick={() => setIsRename(true)}>
                            <TextCursorInput className="mr-2 h-4 w-4" />
                            <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCopy}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Duplicate</span>
                        </DropdownMenuItem>
                    </>}
                </DropdownMenuGroup>
                {myRole() && <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDelete} className="focus:bg-destructive ">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
