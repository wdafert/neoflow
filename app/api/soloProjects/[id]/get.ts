import { getServerSession } from "next-auth"
import { options } from "../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GetProject = async (params: any) => {

    const searchParams = params
    const { user: { id } }: any = await getServerSession(options)

    const project = await prisma.project.findUnique({
        where: {
            id: searchParams.projectId,
            OR: [
                {
                    autherId: id,
                    isSolo: true
                },
                {
                    isSolo: false,
                    Team: {
                        memberShip: {
                            some: {
                                userId: id
                            }
                        }
                    }
                }
            ]
        },
        include: {
            Team:{
                include:{
                    memberShip: {
                        where: {
                            userId: id
                        }
                    }
                }
            }
        }
    })
 
 
    return project
}
