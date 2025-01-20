import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getTeam = async (teamId: any) => {

    const { user: { id } }: any = await getServerSession(options)

    const team = await prisma.team.findUnique({
        where: {
            id: teamId,
            memberShip: {
                some: {
                    userId: id
                }
            }
        },
        include: {
            memberShip: {
                where: {
                    userId: id
                }
            }
        }
    })

    return team
}

export const GetProjects = async (id: String) => {

    const count = await prisma.project.count({
        where: {
            teamId: id as any,
            isSolo: false
        }
    })

    const projects = await prisma.project.findMany({
        where: {
            teamId: id as any,
            isSolo: false
        },
        orderBy: {
            createAt: "desc",
        },
        include: {
            auther: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    memberShip: {
                        where: {
                            teamId: id as any
                        },
                        select: {
                            createAt: true
                        }
                    }
                }
            }
        }
    })

    return {
        total: count,
        projects: projects
    }
}