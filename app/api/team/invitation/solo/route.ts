//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"
import Randrom from "randomstring"
import { Resend } from 'resend';
import { EmailTemplate } from "./EmailTemplate"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { emails, teamId } = await req.json()
    const inviId = Randrom.generate(7)

    const resend = new Resend(process.env.RESEND_API_KEY)

    const validMails = emails.trim().split(" ").map((em) => (
        /\S+@\S+\.\S+/.test(em) && em.trim().toLowerCase()
    ))

    const changerRank = await prisma.memberShip.findFirst({
        where: {
            userId: id,
            teamId: teamId
        },
        include: {
            user: true,
            team: {
                select: {
                    name: true
                }
            }
        }
    })

    if (!["leader", "assistant"].includes(changerRank.role)) {
        return NextResponse.json({
            state: false,
            message: "You don't have permission to send invitations."
        })
    }

    try {

        const { error } = await resend.emails.send({
            from: 'Neoflow <neoflow@resend.dev>',
            to: validMails,
            subject: `Invitation: Join ${changerRank?.team.name} on Neoflow`,
            react: EmailTemplate({ neolink: process.env.ROOT_URL, team: changerRank?.team.name, link: `${process.env.ROOT_URL}/app/team/invitation/solo/${inviId}` }),
        })

        const data = validMails.map((em) => {
            return {
                email: em,
                teamId: changerRank?.teamId,
                invitationCode: inviId
            }
        })

        await prisma.individualInvite.createMany({
            data: data
        })

        return NextResponse.json({
            state: true,
            message: "Invitations have been sent successfully! The user will receive an email inviting them to join the team."
        })

    } catch (error) {
        return Response.json({
            state: false,
            message: "Sorry, we're unable to send invitations to individuals with these email addresses. Please try again"
        })
    }
}