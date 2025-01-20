//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"
import Randrom from "randomstring"

const prisma = new PrismaClient()

export const PUT = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { state, teamId } = await req.json()

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
            message: "You don't have access to update the team"
        })
    }

    if (state) {

        await prisma.team.update({
            where: {
                id: teamId
            },
            data: {
                invitationState: true,
                invitationCode: Randrom.generate(7)
            }
        })

        return NextResponse.json({
            state: true,
        })
    } else {
        await prisma.team.update({
            where: {
                id: teamId
            },
            data: {
                invitationState: false,
                invitationCode: null
            }
        })

        return NextResponse.json({
            state: true,
        })
    }
}