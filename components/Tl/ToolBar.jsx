import { GeoShapeGeoStyle } from "tldraw"
import { Button } from '../ui/button'
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, ArrowRight, CheckSquare2Icon, Circle, Cloud, Diamond, Eraser, FishIcon, Frame, Hand, Hexagon, Highlighter, LockKeyholeIcon, Minus, MousePointerClick, Pen, Shapes, SpellCheck2, Square, Squircle, Star, Triangle } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function ToolBar({ editor, tool, isLocked, readmode }) {


    const tools = readmode ? [{ icon: MousePointerClick, name: "select", key: "V" },
    { icon: Hand, name: "hand", key: "H" }] : [
        { icon: MousePointerClick, name: "select", key: "V" },
        { icon: Hand, name: "hand", key: "H" },
        // { icon: FishIcon, name: "card" },
        { icon: Frame, name: "frame", key: "F" },
        {
            icon: Shapes, children: [
                { icon: Square, name: "rectangle" },
                { icon: Diamond, name: "diamond" },
                { icon: Circle, name: "ellipse" },
                { icon: Triangle, name: "triangle" },
                { icon: Diamond, name: "trapezoid" }, //
                { icon: Hexagon, name: "hexagon" },
                { icon: Cloud, name: "cloud" },
                { icon: Star, name: "star" },
                { icon: Squircle, name: "oval" }, //
                { icon: Circle, name: "x-box" }, //
                { icon: CheckSquare2Icon, name: "check-box" }, //
                { icon: ArrowBigLeft, name: "arrow-left" },
                { icon: ArrowBigUp, name: "arrow-up" },
                { icon: ArrowBigDown, name: "arrow-down" },
                { icon: ArrowBigRight, name: "arrow-right" },
                { icon: Minus, name: "line", simple: true }, //
                { icon: Highlighter, name: "highlight", simple: true },
            ]
        },
        { icon: Pen, name: "draw", key: "D" },
        { icon: SpellCheck2, name: "text", key: "T" },
        { icon: ArrowRight, name: "arrow", key: "A" },
        { icon: Eraser, name: "eraser", key: "E" },
    ]

    const [open, setOpen] = useState(false)

    return (
        <div className='w-max h-max  p-0.5 rounded-md bg-gradient flex flex-col gap-0.5  shadow relative '>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button onClick={() => editor.updateInstanceState({ isToolLocked: !isLocked })} size="icon" className={`bg-background hover:bg-background ${isLocked && "opacity-80"} text-foreground hover: ease-in-out duration-200 custom-button`}>
                        <LockKeyholeIcon className="" size={17} />
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent side="left" className="bg-background border-input w-max p-1 mx-2 px-2 capitalize">
                    Lock
                </HoverCardContent>
            </HoverCard>

            {tools.map((val) => (
                !val.children ?
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button onClick={() => {
                                editor.setCurrentTool(val.name)
                            }} size="icon" className={`bg-background hover:bg-background ${(val.name === tool) && "opacity-80"} hover: ease-in-out duration-200 text-foreground custom-button relative`} >
                                <val.icon className="" size={17} />
                                {val?.key && <span className="absolute rounded-full  text-[9px] text-foreground/50 bottom-0 right-1">{val.key}</span>}
                            </Button>
                        </HoverCardTrigger>
                        {val?.name && <HoverCardContent side="left" className="bg-background border-input w-max p-1 mx-2 px-2 capitalize">
                            {val.name}
                        </HoverCardContent>}
                    </HoverCard>

                    : <Popover open={open} className="absolute" style={{ zIndex: 10000 }} >
                        <PopoverTrigger asChild>
                            <Button onClick={() => setOpen(true)} size="icon" className={`text-foreground bg-background hover:bg-background hover:opacity-80 ease-in-out duration-200  custom-button ${("geo" === tool) && "opacity-80"} relative`}>
                                <val.icon className="" size={17} />
                                <span className="absolute rounded-full  text-[9px] text-foreground/50 bottom-0 right-1">R</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent onPointerDownOutside={() => setOpen(false)} side="right" className="mx-2 !p-3 border-input shadow-lg space-y-2 w-max custom-layout-pop bg-background ">
                            <h1>Shapes</h1>
                            <div className="grid gap-2 grid-cols-5">
                                {val.children.map((child) => (
                                    <Button variant="outline" size="icon" onClick={() => {
                                        if (!child.simple) {
                                            editor.updateInstanceState({
                                                stylesForNextShape: {
                                                    ...editor.getInstanceState().stylesForNextShape,
                                                    [GeoShapeGeoStyle.id]: child.name,
                                                },
                                            }, { ephemeral: true });
                                            editor.setCurrentTool('geo')
                                        } else {


                                            editor.setCurrentTool(child.name)
                                        }

                                        setOpen(false)

                                    }} className={`bg-background hover:bg-background ${(child.name === tool) && "opacity-80"} hover: ease-in-out duration-200 text-foreground custom-button`} >
                                        <child.icon className="" size={17} />
                                    </Button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
            ))}
        </div>
    )
}
