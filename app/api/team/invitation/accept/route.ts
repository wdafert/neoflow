//@ts-nocheck
import { getServerSession } from "next-auth"
import { options } from "../../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const inviteRequest = async (inviteCode) => {
    const { user: { id } }: any = await getServerSession(options)

    const team = await prisma.team.findFirst({
        where: {
            invitationState: true,
            invitationCode: inviteCode
        },
        select: {
            id: true,
            name: true
        }
    })

    if (!team) {
        return {
            success: false,
        }
    }

    const member = await prisma.memberShip.findFirst({
        where: {
            userId: id,
            teamId: team.id
        },
        select: {
            id: true
        }
    })

    if (!member) {
        await prisma.memberShip.create({
            data: {
                teamId: team.id,
                userId: id
            }
        })
    }

    return {
        success: true,
        member: member,
        teamId: team.id,
        teamName: team.name
    }
}

export const soloInviteRequest = async (inviteCode) => {

    const { user: { id } }: any = await getServerSession(options)

    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            email: true
        }
    })


    const invi = await prisma.individualInvite.findFirst({
        where: {
            invitationCode: inviteCode,
            email: user?.email
        },
        select: {
            team: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    if (!invi) {
        return {
            success: false,
        }
    }

    const member = await prisma.memberShip.findFirst({
        where: {
            teamId: invi.team.id,
            userId: id
        },
        select: {
            id: true
        }
    })

    if (member) {
        return {
            success: true,
            teamId: invi.team.id,
            teamName: invi.team.name
        }
    }

    await prisma.individualInvite.deleteMany({
        where: {
            teamId: invi.team.id,
            email: user?.email
        }
    })

    await prisma.memberShip.create({
        data: {
            role: "member",
            teamId: invi.team.id,
            userId: id
        }
    })


    return {
        success: true,
        teamId: invi.team.id,
        teamName: invi.team.name
    }
}