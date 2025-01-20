//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (req: Request) => {

    const { user: { id } }: any = await getServerSession(options)
    const { name, image } = await req.json()


    try {

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                image: image,
                name: name
            }
        })
        return NextResponse.json({
            success: true,
        })
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: e
        })
    }
}
