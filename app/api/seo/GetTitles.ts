import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GetTeam = async (id: any) => {

    const team = await prisma.team.findFirst({
        where: {
            id: id
        },
        select: {
            color: true,
            name: true
        }
    })

    return team
}

export const GetProjectSeo = async (id: any) => {

    const team = await prisma.project.findFirst({
        where: {
            id: id
        },
        select: {
            title: true
        }
    })

    return team
}