import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Return success even if user not found to prevent enumeration
            return NextResponse.json({ success: true });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        console.log("==========================================");
        console.log("🔒 PASSWORD RESET REQUEST");
        console.log(`To: ${email}`);
        console.log(`Link: ${resetLink}`);
        console.log("==========================================");

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
