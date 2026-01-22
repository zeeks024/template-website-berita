import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // 1. Verify Token
    let user = null;
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key-123');
            const { payload } = await jwtVerify(token, secret);
            user = payload;
        } catch (err) {
            // Invalid token
        }
    }

    // 2. Protected Routes (Admin Dashboard)
    if (pathname.startsWith('/admin')) {
        // Allow access to login page even if unauthenticated
        if (pathname === '/admin/login') {
            if (user) {
                // If already logged in, redirect to dashboard
                // Check role if needed, but for now just redirect
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            return NextResponse.next();
        }

        // For all other admin routes, require login
        if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Role-based access control (Optional based on requirements)
        // if (user.role !== 'ADMIN') { ... }
    }

    // 3. Auth Pages (Login/Register/Verify)
    // If user is logged in, redirect them away from auth pages to dashboard
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (user) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login', '/register'],
};
