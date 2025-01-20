import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { options } from "../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {

    const { user: { id } }: any = await getServerSession(options)
    const data = await request.json()
    const searchParams = params

    const project = await prisma.project.update({
        where: {
            id: searchParams.id,
            autherId: id
        },
        data: data
    })

    return NextResponse.json({
        state: project,
        success: true
    })
}


export const DELETE = async (request: Request) => {

    const { user: { id } }: any = await getServerSession(options)
    const { projectId } = await request.json()


    await prisma.project.delete({
        where: {
            id: projectId,
            autherId: id
        }
    })

    return NextResponse.json({
        success: true
    })
}