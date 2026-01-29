import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { getEncodedSecret, AUTH_CONFIG } from '@/lib/auth-config';
import { rateLimit, getClientIP, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';
import { loginSchema, formatZodErrors } from '@/lib/validations';

export async function POST(request: Request) {
    try {
        const ip = getClientIP(request);
        const rateLimitResult = rateLimit(`login:${ip}`, RATE_LIMIT_CONFIGS.login);
        
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: `Terlalu banyak percobaan login. Coba lagi dalam ${rateLimitResult.retryAfter} detik.` },
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
        const parsed = loginSchema.safeParse(body);
        
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (!user.isVerified) {
            return NextResponse.json({ error: 'Please verify your email first' }, { status: 403 });
        }

        // Create JWT using centralized config
        const secret = getEncodedSecret();
        const token = await new SignJWT({
            sub: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret);

        // Set Cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

        response.cookies.set(AUTH_CONFIG.cookieName, token, AUTH_CONFIG.cookieOptions);

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
