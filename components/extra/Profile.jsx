"use client"
// import AvatarEditor from 'react-avatar-editor'
import { useState, useTransition } from "react"
import { Input } from "../ui/input"
import { ModeToggle } from "@/components/dashboard/Side/ThemeMode"
import { Button } from "../ui/button"
import { LogOut, RefreshCcw } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { GooSpinner } from "react-spinners-kit"
// import { storage } from "@/lib/firebase/connection"
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Profile = ({ user }) => {

    const [name, setName] = useState(user.user.name)
    const [selectedImage, setSelectedImage] = useState(user.user.image)
    const [file, setFile] = useState()

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0]

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setSelectedImage(reader.result);
    //         }

    //         setFile(file)
    //         reader.readAsDataURL(file)
    //     }
    // }

    // const compressImage = async (file) => {
    //     const buffer = await sharp(file.buffer)
    //         .webp({ quality: 80 })
    //         .toBuffer()

    //     return new File([buffer], 'compressed-image.webp', { type: 'image/webp' })
    // }

    // const uploadToFirebase = async (file) => {
    //     const storageRef = ref(storage, 'images/avatars/' + Date.now());
    //     await uploadBytes(storageRef, file)

    //     const downloadURL = await getDownloadURL(storageRef)

    //     return downloadURL
    // }

    const router = useRouter()

    const [panding, startTransition] = useTransition()

    const handleSave = () => {
        startTransition(async () => {

            // let imageUrl = user.user.image
            // if (selectedImage !== user.user.image && file) {
            //     imageUrl = await uploadToFirebase(file)
            // }

            const newData = {
                name: name,
                // image: imageUrl
            }

            const resultData = await fetch("/api/user", {
                cache: "no-cache",
                method: "PATCH",
                body: JSON.stringify(newData)
            })
            const result = await resultData.json()

            if (result.success) {

                await signIn('jwt', { redirect: false })
                router.refresh()
            } else {
                toast.error("Unable to update your profile. Please check your information and try again.");
            }
        })
    }

    return (
        <div className='mx-auto max-w-3xl lg:flex-row flex-col flex lg:items-end lg:justify-end my-auto min-h-[60svh] mt-5'>
            <div className='p-5 flex-1'>
                <div className='flex flex-col items-center justify-center relative gap-2'>
                    <Dialog>
                        {/* <DialogTrigger>
                            <Button className="absolute top-1/2 right-1/2 z-10 mx-auto" variant="outline">Change profile</Button>
                        </DialogTrigger> */}
                        <DialogContent className="z-[9999999]">
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    {/* <AvatarEditor
                                        image={selectedImage}
                                        width={200}
                                        height={200}
                                        border={20}
                                        scale={1}
                                        borderRadius={100}
                                        rotate={0}
                                    /> */}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Avatar className="h-60 w-60 object-cover rounded-full border border-input">
                        <AvatarImage className="object-cover" src={selectedImage} />
                        <AvatarFallback className="text-3xl font-bold tracking-widest">{name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                </div>
                {/* <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                /> */}
            </div>
            <div className='flex items-start justify-end flex-col gap-2 flex-1 self-end w-full'>
                <Input autoFocus={true} value={name} onChange={(e) => setName(e.target.value)} placeholder="User name" />
                <Input value={user.user.email} disabled={true} />
                <ModeToggle />
                <div className='w-full mt-8 flex items-center justify-end gap-2 '>
                    {
                        !panding ? <Button disabled={(name === user.user.name && selectedImage === user.user.image)} onClick={handleSave} variant="outline" className="gap-3 px-6 rounded-full hover:bg-primary/80 bg-primary/50 font-medium">
                            Update
                            <RefreshCcw size={16} />
                        </Button>
                            : <Button disabled variant="outline" className="rounded-full bg-primary/50 overflow-hidden">
                                <GooSpinner size={30} color="white" />
                            </Button>}
                    <Button onClick={() => signOut()} className="hover:bg-destructive bg-destructive opacity-80 ease-in-out duration-200 hover:opacity-100 gap-3 px-7 rounded-full text-destructive-foreground">
                        Logout
                        <LogOut className="" size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Profile