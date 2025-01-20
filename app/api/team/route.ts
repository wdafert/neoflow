//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { teamName, color } = await req.json()

    const newTeam = await prisma.team.create({
        data: {
            name: teamName,
            color: color,
            autherId: id,
            memberShip: {
                create: {
                    userId: id,
                    role: "leader"
                }
            }
        }
    })

    return NextResponse.json({
        state: "success",
        newTeam
    })
}

export const PATCH = async (req: Request) => {

    const { user: { id } }: any = await getServerSession(options)
    const { teamName, color, teamId } = await req.json()

    const changerRank = await prisma.memberShip.findFirst({
        where: {
            userId: id,
            teamId: teamId
        },
        include: {
            user: true,
        }
    })

    if (["leader"].includes(changerRank.role)) {

        await prisma.team.update({
            where: {
                id: teamId
            }, 
            data: {
                name: teamName,
                color: color
            }
        })

        return NextResponse.json({
            state: true,
            changerRank
        })
    } else {
        return NextResponse.json({
            state: false,
            message: "Team updates are restricted to the team leader only."
        })
    }

}

export const PUT = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { teamName, color } = await req.json()

    const changerRank = await prisma.memberShip.findFirst({
        where: {
            userId: id,
            teamId: data.team
        },
        include: {
            user: true,
        }
    })

    return NextResponse.json(changerRank)
}

export const DELETE = async (req: Request) => {

    const { user: { id } }: any = await getServerSession(options)
    const { teamId } = await req.json()

    const admin = await prisma.memberShip.findFirst({
        where: {
            teamId: teamId,
            userId: id
        }
    })

    if (admin.role !== "leader") {
        return NextResponse.json({
            state: false,
            callback: 403,
            message: "You don't have access to delete this team"
        })
    } else {

        await prisma.team.delete({
            where: {
                id: admin?.teamId
            }
        })
        return NextResponse.json({
            state: true,
            membership: admin
        })
    }
}