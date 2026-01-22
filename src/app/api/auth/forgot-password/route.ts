import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

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

        await sendEmail({
            to: email,
            subject: 'Reset Password Derap Serayu',
            html: `
                <h1>Reset Password</h1>
                <p>Anda menerima email ini karena ada permintaan reset password untuk akun Anda.</p>
                <p>Silakan klik link di bawah ini untuk membuat password baru:</p>
                <a href="${resetLink}" style="padding: 10px 20px; background: #06b6d4; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>Atau copy link ini: ${resetLink}</p>
                <p>Link ini berlaku selama 1 jam.</p>
                <p>Jika Anda tidak merasa meminta ini, abaikan saja email ini.</p>
            `
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
