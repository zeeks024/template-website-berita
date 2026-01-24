import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken,
                isVerified: false,
            },
        });

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const verificationLink = `${baseUrl}/verify?token=${verificationToken}`;

        const emailSent = await sendEmail({
            to: email,
            subject: 'Verifikasi Email Derap Serayu',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #06b6d4;">Selamat Datang di Derap Serayu!</h1>
                    <p>Halo ${name},</p>
                    <p>Terima kasih telah mendaftar. Silakan klik tombol di bawah ini untuk memverifikasi akun Anda:</p>
                    <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background: #06b6d4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">Verifikasi Akun</a>
                    <p style="color: #666; font-size: 14px;">Atau copy link ini: <a href="${verificationLink}">${verificationLink}</a></p>
                    <p style="color: #999; font-size: 12px;">Link ini berlaku selama 24 jam.</p>
                </div>
            `
        });

        if (!emailSent) {
            console.error(`Failed to send verification email to ${email}`);
        }

        return NextResponse.json({
            success: true,
            message: 'Registration successful. Please check your email to verify your account.'
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
