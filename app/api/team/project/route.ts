//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/Options"
import Randrom from "randomstring"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)

    const { teamId } = await req.json()

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
            message: "You don't have access to create a project"
        })
    }

    const project = await prisma.project.create({
        data: {
            title: `Untitled-${Randrom.generate(7)}`,
            autherId: id,
            isSolo: false,
            teamId: teamId
        }
    })

    return NextResponse.json({
        state: "success",
        id: project.id
    })
}

export const DELETE = async (req: Request) => {
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

    await prisma.project.delete({
        where: {
            id: projectId,
            teamId: teamId
        }
    })

    return NextResponse.json({
        state: "success",
    })
}

export const PUT = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)

    const { teamId, projectId, data } = await req.json()

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

    await prisma.project.update({
        where: {
            id: projectId,
            teamId: teamId
        },
        data: data
    })

    return NextResponse.json({
        state: "success",
    })
}
