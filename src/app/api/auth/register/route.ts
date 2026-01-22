import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken,
                isVerified: false, // Must verify email first
            },
        });

        // Send verification email
        const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify?token=${verificationToken}`;

        await sendEmail({
            to: email,
            subject: 'Verifikasi Email Derap Serayu',
            html: `
                <h1>Selamat Datang di Derap Serayu!</h1>
                <p>Halo ${name},</p>
                <p>Terima kasih telah mendaftar. Silakan klik link di bawah ini untuk memverifikasi akun Anda:</p>
                <a href="${verificationLink}" style="padding: 10px 20px; background: #06b6d4; color: white; text-decoration: none; border-radius: 5px;">Verifikasi Akun</a>
                <p>Atau copy link ini: ${verificationLink}</p>
                <p>Link ini berlaku selama 24 jam.</p>
            `
        });

        console.log(`Verification email sent to ${email}`);

        return NextResponse.json({
            success: true,
            message: 'Registration successful. Please check your email to verify your account.'
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
