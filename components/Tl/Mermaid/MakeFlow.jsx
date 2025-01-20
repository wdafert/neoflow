import randomstring from "randomstring"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Database, Loader, Loader2, Sparkles, Workflow } from "lucide-react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"


export default function MakeFlow({ editor, setOpenCode }) {

    const [select, setSelect] = useState(-1)
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const chartStates = [
        {
            name: "Flowchart Diagram", type: "flowchart", text: `graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D`, placeholder: "Payment system, validation of user credentials, transaction flow..."
        },
        {
            name: "Sequence Diagram", type: "sequence", text: `sequenceDiagram
        Alice->>John: Hello John, how are you?
        John-->>Alice: Great!
        Alice-)John: See you later!`,
            placeholder: "Authentication system using Firebase and React, user interactions..."
        },
        {
            name: "Class Diagram", type: "class", text: `classDiagram
        note "From Duck till Zebra"
        Animal <|-- Duck
        note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
        Animal <|-- Fish
        Animal <|-- Zebra
        Animal : +int age
        Animal : +String gender
        Animal: +isMammal()
        Animal: +mate()
        class Duck{
            +String beakColor
            +swim()
            +quack()
        }
        class Fish{
            -int sizeInFeet
            -canEat()
        }
        class Zebra{
            +bool is_wild
            +run()
        }`, placeholder: "Class diagram depicting the structure of a shopping app, relationships between classes..."
        },
    ];

    const [isPanding, statTransition] = useTransition()

    const handleAiResponse = async () => {
        if (text) {
            statTransition(async () => {
                try {
                    const reqAi = await fetch(`/api/gpt?input=${text}&type=${chartStates[select].type}`)
                    const ai = await reqAi.json()

                    if (ai.apiResponse) {
                        createDiagram(ai.apiResponse)
                    } else {
                        throw Error("Invalid response")
                    }
                } catch (e) {
                    toast.error(e)
                }
            })
        } else {
            toast.error("description is required !")
        }
    }

    const createDiagram = (e) => {
        const id = "shape:" + randomstring.generate()

        editor.createShape({
            id: id,
            type: "card",
            props: {
                text: e,
                x: editor.getCamera().x,
                y: editor.getCamera().y
            }
        })
        editor.select(id)
        editor.zoomToSelection()
        editor.setCurrentTool("select")
        setSelect(-1)
        setOpen(false)
        setOpenCode(true)
        setText("")
    }


    return (
        <Dialog open={open} onClose={() => setOpen(false)} onOpenChange={(e) => e ? setSelect(-1) : setOpen(false)}>
            <DialogTrigger>
                <Button onClick={() => setOpen(true)} size="icon" className="bg-background hover:bg-background hover:opacity-80 ease-in-out duration-200  text-foreground  custom-button ">
                    <Workflow size={17} />
                </Button>
            </DialogTrigger>
            <DialogContent className="z-[1000] w-full max-w-xl border-input overflow-hiddenx ">
                <div className="absolute shadow-[0_0_100px_15px] shadow-indigo-500 top-10 left-10 h-32 -z-30 opacity-80"></div>
                <div className="absolute shadow-[0_0_150px_50px] shadow-pink-500 top-10 left-24 h-1 -z-30 opacity-80"></div>
                <div className="absolute shadow-[0_0_100px_15px] shadow-indigo-500 bottom-10 right-10 h-32 -z-30 opacity-80"></div>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center justify-between gap-3 w-full  mt-1">
                            <h1 className="flex gap-2 items-center justify-center ">
                                <Workflow />
                                Start {select === -1 ? "with mermaid js " : "a " + chartStates[select].name}
                            </h1>
                            {select === -1 && <Link href="https://mermaid.js.org/intro/" target="_blank" className="flex items-center justify-center text-primary text-sm font-light gap-1 bg-primary/20 px-3 py-0.5 rounded-full hover:underline">
                                learn mermaid js
                                <ArrowRight size={17} />
                            </Link>}
                        </div>
                        {select === -1 && <p className="text-sm mt-1.5 font-extralight text-foreground/40">
                            This Neoflow's feature utilizes Mermaid.js for diagrams. Learn about it from the link above. Also, create diagrams with AI powered by Mistral AI.
                        </p>}
                    </DialogTitle>
                    <DialogDescription>
                        {select === -1 ? <div className="flex items-center justify-center flex-col gap-2 mt-5  w-full">
                            <div className="grid grid-cols-3 gap-2 w-full">
                                {chartStates.map((v, i) => (
                                    <div onClick={() => setSelect(i)} key={v.type} className="font-bold  text-foreground p-3 border backdrop-blur-lg  border-input rounded hover:border-primary flex flex-col items-center justify-end gap-1 hover:shadow-[0_0_10px] hover:shadow-primary ease-in-out duration-200 cursor-pointer h-max !bg-primary/10 overflow-hidden ">
                                        {v.name}
                                    </div>
                                ))}
                            </div>
                            <div onClick={() => createDiagram("")} className="overflow-hidden font-bold  text-foreground p-3 border backdrop-blur-lg bg-secondary/20 border-input rounded hover:border-primary flex items-center px-5 justify-start gap-4 hover:shadow-[0_0_10px] hover:shadow-primary ease-in-out duration-200 w-full py-4  cursor-pointer">
                                <Sparkles size={17} />
                                Start from scratch.
                            </div>
                        </div>
                            : <div className="flex items-center justify-center flex-col gap-2 mt-5  w-full">
                                <div className="w-full flex items-center justify-stqrt">
                                    <Button className="border-none rounded-full bg-primary/20 text-foreground px-7" onClick={() => setSelect(-1)} variant="outline">
                                        <ArrowLeft size={17} />
                                    </Button>
                                </div>
                                <div onClick={() => createDiagram(chartStates[select].text)} className="font-bold  text-foreground p-3 border backdrop-blur-lg bg-secondary/20 border-input rounded hover:border-primary flex items-center px-5 justify-start gap-4 hover:shadow-[0_0_10px] hover:shadow-primary ease-in-out duration-200 w-full py-4  cursor-pointer">
                                    <Sparkles size={17} />
                                    Commence with a foundational {chartStates[select].name} theme.
                                </div>
                                <div className="font-bold  text-foreground p-3 border backdrop-blur-lg bg-secondary/20 border-input rounded hover:border-primary flex flex-col items-center justify-center gap-1 hover:shadow-[0_0_10px] hover:shadow-primary ease-in-out duration-200 w-full">
                                    <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={chartStates[select].placeholder} className="bg-background/50" />
                                </div>
                                <div className="w-full flex items-center justify-end">
                                    {!isPanding ? <Button className="hover:shadow-[0_0_10px] hover:shadow-primary ease-in-out duration-200 hover:bg-primary/70 rounded-full bg-primary/50 text-foreground font-medium px-6 border-none gap-2 " onClick={() => handleAiResponse()} variant="outline">
                                        <Sparkles size={17} />
                                        Generate with AI
                                    </Button>
                                        : <Button className="rounded-full min-w-12 flex items-center justify-center" variant="outline" >
                                            <Loader2 className="animate-spin" size={17} />
                                        </Button>}
                                </div>
                            </div>}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
