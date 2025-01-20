import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GetProjects = async () => {
    const { user: { id } }: any = await getServerSession(options)
    const count = await prisma.project.count({
        where: {
            autherId: id,
            isSolo: true
        }
    })

    const projects = await prisma.project.findMany({
        where: {
            autherId: id,
            isSolo: true
        },
        select: {
            id: true,
            title: true,
            isSolo: true,
            createAt: true,
            updatedAt: true,
            auther: true,
        },
        orderBy: {
            createAt: "desc"
        },
    })


    return {
        total: count,
        projects: projects
    }
}