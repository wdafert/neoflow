import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Editor, { loader } from '@monaco-editor/react'
import { Loader2, Sparkles } from "lucide-react"
import { useLayoutEffect } from "react"
import { config } from "./monaco-mermaid"


loader.init().then((monaco) => {
    config(monaco)

    monaco.editor.defineTheme("transparentTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#00000000",
        },
    });


});

export default function Code({ editor, setOpenCode, open }) {

    useLayoutEffect(() => {
        const types = editor.getSelectedShapes().map((val) => { return val.type })
        if (editor.getSelectedShapes().length !== 1 || !(Array.from(new Set(types)).length && Array.from(new Set(types))[0] === "card")) {
            setOpenCode(false)
        }
    }, [editor.getSelectedShapeIds()])

    return (
        <div onClick={() => setOpenCode(false)} className={`w-full h-full absolute z-[1000] flex items-center justify-end ${open ? "translate-x-0" : "translate-x-[100svw]"} duration-500 pointer-events-none `}>
            <div onClick={(e) => e.stopPropagation()} className=" h-full w-96 bg-background border-l border-input  pointer-events-auto flex flex-col">
                <div className="w-full h-full flex flex-col">
                    <div className="w-full h-full flex-1 bg-muted/10">
                        <Editor
                            language="mermaid"
                            onChange={(e) => {
                                editor.updateShape({
                                    id: editor.getSelectedShapes().map((v) => { return v.id })[0],
                                    props: {
                                        text: e
                                    }
                                })
                            }}
                            theme="transparentTheme"
                            options={{
                                minimap: { enabled: false },
                                automaticLayout: true,
                            }}
                            value={editor.getSelectedShapes().map((v) => { return v.props.text })[0]}
                        />
                    </div>
                    {/* <div className="w-full p-3  ">
                        <div className="font-bold flex-col text-foreground p-3 border backdrop-blur-lg bg-secondary/20 border-input rounded flex items-center px-5 justify-start gap-4 w-full py-4  cursor-pointer">
                            <div className="w-full flex items-center justify-start gap-2">
                                <Sparkles size={17} />
                                Edit using AI
                            </div>
                            <Textarea className="bg-background/50 focus:shadow-[0_0_10px] focus:shadow-primary  hover:shadow-[0_0_10px] hover:shadow-primary ease-in-out duration-200  hover:border-primary  focus:border-primary " />
                            <div className="w-full flex items-center justify-end">
                                {!false ? <Button className="hover:shadow-[0_0_10px] hover:shadow-primary ease-in-out duration-200 hover:bg-primary/70 rounded-full bg-primary/50 text-foreground font-medium px-6 border-none gap-2 " variant="outline">
                                    <Sparkles size={17} />
                                    Generate with AI
                                </Button>
                                    : <Button className="rounded-full min-w-12 flex items-center justify-center" variant="outline" >
                                        <Loader2 className="animate-spin" size={17} />
                                    </Button>}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    )
}
