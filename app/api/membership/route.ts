import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()



export const PUT = async (request: any) => {

    const data = await request.json()

    const { user: { id } }: any = await getServerSession(options)

    const changerRank = await prisma.memberShip.findFirst({
        where: {
            userId: id,
            teamId: data.team
        },
        include: {
            user: true,
        }
    })

    const changedRank = await prisma.memberShip.findFirst({
        where: {
            userId: data.userId,
            teamId: data.team
        },
        include: {
            user: true,
        }
    })

    if (changerRank?.role === "leader") {
        if (data.rank === "delete") {
            await prisma.memberShip.delete({
                where: {
                    id: changedRank?.id
                }
            })
        } else {
            await prisma.memberShip.update({
                where: {
                    id: changedRank?.id
                },
                data: {
                    role: data.rank
                }
            })
            if (data.rank === "leader") {
                await prisma.memberShip.update({
                    where: {
                        id: changerRank?.id
                    },
                    data: {
                        role: "assistant"
                    }
                })
            }
        }
    }

    if (changerRank?.role === "assistant") {
        if (["reader", "writer"].includes(changedRank?.role as string)) {
            await prisma.memberShip.update({
                where: {
                    id: changedRank?.id
                },
                data: {
                    role: data.rank
                }
            })
        }
    }

    return NextResponse.json({
        success: true
    })
}


export const DELETE = async (req: Request) => {

    const { user: { id } }: any = await getServerSession(options)
    const { teamId } = await req.json()

    const admin = await prisma.memberShip.findFirst({
        where: {
            teamId: teamId,
            userId: id
        }
    }) as any

    if (admin.role === "leader") {
        return NextResponse.json({
            state: false,
            callback: 403,
            message: "Admins can't leave the team directly. Assign a new admin first, then you can leave."
        })
    } else {

        await prisma.memberShip.delete({
            where: {
                id: admin.id
            }
        })
        return NextResponse.json({
            state: true,
        })
    }
}