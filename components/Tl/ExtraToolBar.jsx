import { Button } from '@/components/ui/button'
import { Check, Code, DraftingCompass, Grid2X2, ImageDown, Info, Magnet, Workflow } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { exportAs } from "tldraw"
import { Separator } from '@radix-ui/react-dropdown-menu'
import MakeFlow from "./Mermaid/MakeFlow"

export default function ExtraToolBar({ editor, elements, setOpenCode, readmode }) {


    return (
        <div className='w-max h-max  bg-white p-0.5 rounded-md bg-gradient flex flex-col gap-0.5 shadow '>
            <DropdownMenu className="!border-0 ">
                <DropdownMenuTrigger asChild>
                    <Button size="icon" className="bg-background hover:bg-background hover:opacity-80 ease-in-out duration-200  text-foreground  custom-button ">
                        <DraftingCompass size={17} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-max border-input mx-2   custom-layout-pop">
                    <DropdownMenuGroup className='bg-background rounded-md p-1'>
                        {/* <DropdownMenuItem onClick={() => console.log(elements)} className="gap-5 py-2">
                            <ImageDown className="text-primary/60" size={15} />
                            Export image (PNG)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => exportAs(editor.getSelectedShapeIds(), 'svg')} className="gap-5 py-2">
                            <Code className="text-primary/60" size={15} />
                            Export image (SVG)
                        </DropdownMenuItem>
                        <Separator className='border-input my-1 w-full border-b' /> */}
                        <DropdownMenuItem onClick={() => editor.updateInstanceState({ isGridMode: !editor.getInstanceState().isGridMode })} className="gap-5 py-2">
                            <Grid2X2 className="text-primary/60" size={15} />
                            Show grid
                            {editor.getInstanceState().isGridMode && <Check className='ml-auto' size={14} />}

                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor.user.updateUserPreferences({ isSnapMode: !editor.user.getIsSnapMode() })} className="gap-5 py-2">
                            <Magnet className="text-primary/60" size={15} />
                            Always snap

                            {editor.user.getIsSnapMode() && <Check className='ml-auto' size={14} />}
                        </DropdownMenuItem>
                        {/* <Separator className='border-input my-1 w-full border-b' />
                        <DropdownMenuItem onClick={() => exportAs(elements, 'svg')} className="gap-5 py-2">
                            <Info className="text-primary/60" size={15} />
                            Show help
                        </DropdownMenuItem> */}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {!readmode && <MakeFlow setOpenCode={setOpenCode} editor={editor} />}
        </div >
    )
}
