"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { User2 } from "lucide-react"

export default function Navbar() {

    const { status, data } = useSession()


    return (
        <div className="w-full h-[11.5svh] border-b border-input bg-primary/5 flex items-center justify-end px-7">
            {status === "authenticated" ?
                <img onClick={()=> signOut()} className="h-10 w-10 object-cover border rounded-full" src={data.user.image} />
                : <Button size="sm" className="bg-background border-input border px-6 gap-2" onClick={() => signIn()}>
                    <User2 size={17}/>
                    Log in
                </Button>
            }
        </div>
    )
}
