import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';
import { verificationEmailTemplate } from '@/lib/email-templates';
import { rateLimit, getClientIP, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';
import { registerSchema, formatZodErrors } from '@/lib/validations';

export async function POST(request: Request) {
    try {
        const ip = getClientIP(request);
        const rateLimitResult = rateLimit(`register:${ip}`, RATE_LIMIT_CONFIGS.register);
        
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: `Terlalu banyak percobaan registrasi. Coba lagi dalam ${Math.ceil((rateLimitResult.retryAfter || 0) / 60)} menit.` },
                { 
                    status: 429,
                    headers: {
                        'Retry-After': String(rateLimitResult.retryAfter),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': String(rateLimitResult.resetTime)
                    }
                }
            );
        }

        const body = await request.json();
        const parsed = registerSchema.safeParse(body);
        
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }

        const { name, email, password, role } = parsed.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                verificationToken,
                verificationTokenExpiry,
                isVerified: false,
            },
        });

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const verificationLink = `${baseUrl}/verify?token=${verificationToken}`;

        const emailSent = await sendEmail({
            to: email,
            subject: '✉️ Verifikasi Email - Derap Serayu',
            html: verificationEmailTemplate(name, verificationLink)
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
