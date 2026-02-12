import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email
                token.name = user.name
                token.id = user.id
                
                try {
                    const dbUser = await prisma.user.findUnique({
                        where: { email: user.email! },
                        select: { role: true }
                    })
                    token.role = dbUser?.role || "READER"
                } catch (error) {
                    console.error("Failed to fetch user role from database:", error)
                    token.role = "READER"
                }
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                // @ts-expect-error NextAuth session user type has no custom role field by default
                session.user.role = token.role as string || "READER"
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
    },
    trustHost: true,
    debug: true,
})
