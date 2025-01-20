import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"

const prisma = new PrismaClient()
export const TeamMembers = async (teamId: any) => {

    const { user: { id } }: any = await getServerSession(options)

    const members = await prisma.memberShip.findMany({
        where: {
            teamId: teamId
        },
        orderBy: {
            createAt: "desc",
        },
        include: {
            user: true,
        }
    })

    const myRank = await prisma.memberShip.findFirst({
        where: {
            userId: id,
            teamId: teamId
        },
        include: {
            user: true,
        }
    })

    return {
        members, myRank
    }
}


