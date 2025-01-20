//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/Options"
import Randrom from "randomstring"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async () => {
    const { user: { id } }: any = await getServerSession(options)

    const project = await prisma.project.create({
        data: {
            title: `Untitled-${Randrom.generate(7)}`,
            autherId: id,
            isSolo: true
        }
    })


    return NextResponse.json({
        state: "success",
        id: project.id
    })
}

