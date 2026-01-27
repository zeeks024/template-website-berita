import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

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

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

        const emailSent = await sendEmail({
            to: email,
            subject: 'Reset Password Derap Serayu',
            html: `
                <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #06b6d4;">Reset Password</h1>
                    <p>Halo ${user.name},</p>
                    <p>Anda menerima email ini karena ada permintaan reset password untuk akun Anda.</p>
                    <p>Silakan klik tombol di bawah ini untuk membuat password baru:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #06b6d4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">Reset Password</a>
                    <p style="color: #666; font-size: 14px;">Atau copy link ini: <a href="${resetLink}">${resetLink}</a></p>
                    <p style="color: #999; font-size: 12px;">Link ini berlaku selama 1 jam.</p>
                    <p style="color: #999; font-size: 12px;">Jika Anda tidak merasa meminta ini, abaikan saja email ini.</p>
                </div>
            `
        });

        if (!emailSent) {
            console.error(`Failed to send reset password email to ${email}`);
            return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
