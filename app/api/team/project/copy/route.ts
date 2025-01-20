//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {

    const { user: { id } }: any = await getServerSession(options)

    const { teamId, projectId } = await req.json()

    const changerRank = await prisma.memberShip.findFirst({
        where: {
            userId: id,
            teamId: teamId
        },
        include: {
            user: true,
        }
    })


    if (!["leader", "assistant"].includes(changerRank.role)) {
        return NextResponse.json({
            state: false,
            message: "You don't have access to delete a project"
        })
    }

    const copy = await prisma.project.findFirst({
        where: {
            id: projectId,
            autherId: id
        }
    })


    if (!copy) {
        return NextResponse.json({
            success: false
        })
    }

    delete copy.id

    const project = await prisma.project.create({
        data: {
            title: copy.title + ' (copy)',
            autherId: id,
            teamId: teamId,
            isSolo: false,
            state: copy.state,
        }
    })


    return NextResponse.json({
        success: true,
        id: project.id
    })
}