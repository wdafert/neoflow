//@ts-nocheck
import { NextAuthOptions } from "next-auth"
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "email", type: "email" },
        //         name: { label: "name", type: "text" },
        //         image: { label: "image", type: "text" },
        //     },

        //     async authorize(credentials) {
        //         const user = await prisma.user.findUnique({
        //             where: {
        //                 email: credentials.email
        //             }
        //         });
        //         if (user) {
        //             return user;
        //         }

        //         const newUser = await prisma.user.create({
        //             data: {
        //                 image: credentials?.image,
        //                 email: credentials.email,
        //                 name: credentials?.name
        //             }
        //         })

        //         return newUser
        //     }
        // }),
    ],
    callbacks: {
        session: async ({ session, token }: any) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
}  