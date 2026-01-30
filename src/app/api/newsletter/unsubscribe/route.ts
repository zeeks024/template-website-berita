import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const email = request.nextUrl.searchParams.get('email')
    const token = request.nextUrl.searchParams.get('token')

    try {
        let newsletter = null

        if (token) {
            newsletter = await prisma.newsletter.findFirst({
                where: { verifyToken: token },
            })
        } else if (email) {
            newsletter = await prisma.newsletter.findUnique({
                where: { email: email.toLowerCase() },
            })
        }

        if (!newsletter) {
            return new NextResponse(
                `<!DOCTYPE html>
                <html>
                <head><title>Berhenti Langganan</title></head>
                <body style="font-family: sans-serif; padding: 40px; text-align: center;">
                    <h2>Email tidak ditemukan</h2>
                    <p>Email tidak terdaftar di newsletter kami.</p>
                </body>
                </html>`,
                { headers: { 'Content-Type': 'text/html' } }
            )
        }

        await prisma.newsletter.update({
            where: { id: newsletter.id },
            data: { unsubscribedAt: new Date() },
        })

        return new NextResponse(
            `<!DOCTYPE html>
            <html>
            <head><title>Berhenti Langganan</title></head>
            <body style="font-family: sans-serif; padding: 40px; text-align: center;">
                <h2>Berhasil Berhenti Langganan</h2>
                <p>Anda tidak akan menerima newsletter dari Derap Serayu lagi.</p>
                <a href="/" style="color: #0891b2;">Kembali ke beranda</a>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html' } }
        )

    } catch (error) {
        console.error('Newsletter unsubscribe error:', error)
        return new NextResponse(
            `<!DOCTYPE html>
            <html>
            <head><title>Error</title></head>
            <body style="font-family: sans-serif; padding: 40px; text-align: center;">
                <h2>Terjadi Kesalahan</h2>
                <p>Silakan coba lagi nanti.</p>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html' }, status: 500 }
        )
    }
}
