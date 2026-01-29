import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: { verificationToken: token },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        if (user.verificationTokenExpiry && user.verificationTokenExpiry < new Date()) {
            return NextResponse.json({ error: 'Verification link has expired. Please register again.' }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiry: null,
            },
        });

        return NextResponse.json({ success: true, message: 'Email verified successfully' });

    } catch {
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
