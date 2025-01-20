import { Button } from '../ui/button'
import { AlignCenter, AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical, AlignHorizontalDistributeCenter, AlignStartHorizontal, AlignStartVertical, AlignVerticalDistributeCenter, ArrowLeft, ArrowLeftToLine, CaseSensitive, Code, Columns3, Copy, Layers, LucideMaximize, Maximize, MoveDiagonal2, Paintbrush, Rows3, StretchHorizontal, StretchVertical, Trash, Triangle } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Box, Colors, Text, Arrow } from "./Styler"
import { useEffect, useState } from 'react'

export default function GroupActions({ editor, setOpenCode, openCode, readmode }) {

    const Alignment = [
        { name: "Align - left", icon: AlignEndHorizontal, void: () => editor.alignShapes(editor.getSelectedShapeIds(), 'left') },
        { name: "Align - horizontal", icon: AlignCenterHorizontal, void: () => editor.alignShapes(editor.getSelectedShapeIds(), 'center-horizontal') },
        { name: "Align - right", icon: AlignStartHorizontal, void: () => editor.alignShapes(editor.getSelectedShapeIds(), 'right') },
        { name: "Stretch - horizontal", icon: StretchVertical, void: () => editor.stretchShapes(editor.getSelectedShapeIds(), 'horizontal') },

        { name: "Align - top", icon: AlignStartVertical, void: () => editor.alignShapes(editor.getSelectedShapeIds(), 'top') },
        { name: "Align - vertical", icon: AlignCenterVertical, void: () => editor.alignShapes(editor.getSelectedShapeIds(), 'center-vertical') },
        { name: "Align - bottom", icon: AlignEndVertical, void: () => editor.alignShapes(editor.getSelectedShapeIds(), 'bottom') },
        { name: "Stretch - vertical", icon: StretchHorizontal, void: () => editor.stretchShapes(editor.getSelectedShapeIds(), 'vertical') },

        { name: "Distribute - horizontal", icon: AlignVerticalDistributeCenter, void: () => editor.distributeShapes(editor.getSelectedShapeIds(), 'horizontal') },
        { name: "Distribute - vertical", icon: AlignHorizontalDistributeCenter, void: () => editor.distributeShapes(editor.getSelectedShapeIds(), 'vertical') },
        { name: "Stack - verctical", icon: Columns3, void: () => editor.stackShapes(editor.getSelectedShapeIds(), 'verctical', 16) },
        { name: "Stack - horizontal", icon: Rows3, void: () => editor.stackShapes(editor.getSelectedShapeIds(), 'horizontal', 16) },

    ]

    const [types, setTypes] = useState(editor.getSelectedShapes().map((val) => { return val.type }))
    const containsNonEmptyValue = arr => arr.some(element => element !== undefined && element !== '')

    useEffect(() => {
        setTypes(editor.getSelectedShapes().map((val) => { return val.type }))
    }, [editor.getSelectedShapes()])


    if(readmode) return  <div className="flex items-center justify-center w-max gap-1"></div>

    return (
        <div className="flex items-center justify-center w-max gap-1">
            <Button onClick={() => editor.deleteShapes(editor.getSelectedShapeIds())} className="rounded-xl" size="icon" variant="outline">
                <Trash size={15} />
            </Button>
            <Button onClick={() => editor.duplicateShapes(editor.getSelectedShapeIds(), { x: 60, y: 60 })} className="rounded-xl " size="icon" variant="outline">
                <Copy size={15} />
            </Button>
            {(editor.getSelectedShapes().length === 1 && Array.from(new Set(types))[0] === "card") && <Button onClick={() => {
                if (openCode) {
                    setOpenCode(false)
                } else {
                    setOpenCode(true)
                    editor.zoomToSelection()
                    // editor.zoomToFit()
                }
            }} className="rounded-xl gap-3" variant="outline">
                <Code size={15} />
                Edit code
            </Button>}
            <Popover>
                <PopoverTrigger>
                    <Button className="rounded-xl gap-3" variant="outline">
                        <Layers size={15} /> Order
                    </Button>
                </PopoverTrigger>
                <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} className=" custom-layout-pop border-input flex flex-col p-1 w-max m-1">
                    <Button className="custom-button h-max w-full bg-transparent border-none justify-start gap-1.5 " variant="outline" onClick={() => editor.bringForward(editor.getSelectedShapeIds())}>
                        <ArrowLeft className="rotate-90 text-primary/60" size={19} />
                        <span className='text-foreground/80'>Bring forward</span>
                    </Button>
                    <Button className="custom-button h-max w-full bg-transparent border-none justify-start gap-1.5" variant="outline" onClick={() => editor.sendBackward(editor.getSelectedShapeIds())}>
                        <ArrowLeft className="-rotate-90 text-primary/60" size={19} />
                        <span className='text-foreground/80'>send backward</span>
                    </Button>
                    <Button className="custom-button h-max w-full bg-transparent border-none justify-start gap-1.5" variant="outline" onClick={() => editor.bringToFront(editor.getSelectedShapeIds())}>
                        <ArrowLeftToLine className="rotate-90 text-primary/60" size={19} />
                        <span className='text-foreground/80'>Bring to front</span>
                    </Button>
                    <Button className="custom-button h-max w-full bg-transparent border-none justify-start gap-1.5" variant="outline" onClick={() => editor.sendToBack(editor.getSelectedShapeIds())}>
                        <ArrowLeftToLine className="-rotate-90 text-primary/60" size={19} />
                        <span className='text-foreground/80'>send to back</span>
                    </Button>
                </PopoverContent>
            </Popover>
            {editor.getSelectedShapeIds().length > 1 &&
                <Popover>
                    <PopoverTrigger>
                        <Button className="rounded-xl gap-3" variant="outline">
                            <AlignCenter size={15} />
                            Alignment
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} className=" custom-layout-pop  m-1 border-input grid grid-cols-4 gap-1 w-max p-1.5">
                        <TooltipProvider >
                            {Alignment.map((side, index) => (
                                (index < 8 || editor.getSelectedShapeIds().length > 2) && <Tooltip defaultOpen={false} >
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="outline" onClick={side.void} className=' custom-button border-none'>
                                            <side.icon className="rotate-90 text-foreground/70 " size={19} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="border-input">
                                        <p>{side.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </PopoverContent>
                </Popover>
            }
            {(!(Array.from(new Set(types)).length && Array.from(new Set(types))[0] === "card") && editor.getSelectedShapeIds().length > 0) &&
                <>
                    <Popover>
                        <PopoverTrigger>
                            <Button className="rounded-xl gap-3 ml-3" variant="outline">
                                <Paintbrush size={15} />
                                Colors
                            </Button>
                        </PopoverTrigger>
                        <Colors editor={editor} />
                    </Popover>
                    {(types.includes("geo") || types.includes("arrow") || types.includes("draw")) && <Popover>
                        <PopoverTrigger>
                            <Button className="rounded-xl gap-3" variant="outline">
                                <Triangle size={15} />
                                Geo
                            </Button>
                        </PopoverTrigger>
                        <Box types={types} editor={editor} />
                    </Popover>}
                    {containsNonEmptyValue(editor.getSelectedShapes().map((el) => { return el.props.text })) && <Popover>
                        <PopoverTrigger>
                            <Button className="rounded-xl gap-3" variant="outline">
                                <CaseSensitive size={15} />
                                Text
                            </Button>
                        </PopoverTrigger>
                        <Text types={types} editor={editor} />
                    </Popover>}
                    {types.includes("arrow") && <Popover>
                        <PopoverTrigger>
                            <Button className="rounded-xl gap-3" variant="outline">
                                <MoveDiagonal2 size={15} />
                                Arrow
                            </Button>
                        </PopoverTrigger>
                        <Arrow editor={editor} />
                    </Popover>}
                </>
            }
        </div >
    )
}