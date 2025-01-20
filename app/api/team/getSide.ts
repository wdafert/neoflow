import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getTeam = async (teamId: any) => {

    const { user: { id } }: any = await getServerSession(options)

    const team = await prisma.team.findMany({
        where: {
            memberShip: {
                some: {
                    userId: id
                }
            }
        },
        select: {
            id: true,
            name: true,
            color: true,
            Project: {
                orderBy: {
                    updatedAt: "desc"
                },
                take: 3,
                select: {
                    id: true,
                    title: true
                }
            },
            memberShip: {
                take: 3,
                select: {
                    user: {
                        select: {
                            image: true,
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createAt: "desc"
        }
    })

    return team
}
