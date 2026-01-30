import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
        return NextResponse.redirect(new URL('/?newsletter=invalid', request.url))
    }

    try {
        const newsletter = await prisma.newsletter.findFirst({
            where: { verifyToken: token },
        })

        if (!newsletter) {
            return NextResponse.redirect(new URL('/?newsletter=invalid', request.url))
        }

        await prisma.newsletter.update({
            where: { id: newsletter.id },
            data: {
                verified: true,
                verifyToken: null,
            },
        })

        return NextResponse.redirect(new URL('/?newsletter=verified', request.url))

    } catch (error) {
        console.error('Newsletter verify error:', error)
        return NextResponse.redirect(new URL('/?newsletter=error', request.url))
    }
}
