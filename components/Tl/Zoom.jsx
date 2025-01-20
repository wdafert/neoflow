import { Button } from '../ui/button'
import { Minus, Plus, Redo, SaveAll, Undo } from 'lucide-react'

export default function Zoom({ editor, zoom, handleSave, setOpenCode, readmode }) {
    return (
        <div className='flex'>
            <div className='flex rounded-md text-foreground scale-90 pointer-events-auto'>
                <Button onClick={() => editor.zoomOut()} className="rounded-l-xl rounded-r-none" size="icon" variant="outline">
                    <Minus size={15} />
                </Button>
                <Button onClick={() => editor.zoomToFit()} className="rounded-none px-4" variant="outline">
                    {Math.floor(zoom * 100)}%
                </Button>
                <Button onClick={() => editor.zoomIn()} className="rounded-r-xl rounded-l-none" size="icon" variant="outline">
                    <Plus size={15} />
                </Button>
            </div>
            <div className='flex rounded-md text-foreground scale-90 pointer-events-auto'>
                <Button onClick={() => editor.undo()} className={`rounded-l-xl rounded-r-none ${!editor.getCanUndo() && "opacity-50"}`} size="icon" variant="outline">
                    <Undo size={15} />
                </Button>
                <Button onClick={() => editor.redo()} className={`${!editor.getCanRedo() && "opacity-50"} rounded-r-xl rounded-l-none`} size="icon" variant="outline">
                    <Redo size={15} />
                </Button>
            </div>
             {!readmode && <div className='flex rounded-md text-foreground scale-90 pointer-events-auto'>
                <Button onClick={async()=>{
                    await handleSave()
                }}  variant="outline" className="rounded-xl gap-3  ">
                    <SaveAll size={15} />
                    Save
                </Button>
            </div>}
        </div>
    )
}
