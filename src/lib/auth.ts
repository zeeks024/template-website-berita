import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getEncodedSecret } from './auth-config';

export type AuthUser = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

import { auth } from "@/auth";

type SessionUserWithRole = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  role?: string;
};

/**
 * Get current authenticated user from JWT token in cookies OR NextAuth session
 * Returns user object if valid, null otherwise
 * 
 * Use this in Server Components and API routes
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    // 1. Check NextAuth Session first (Google Login)
    const session = await auth();
    if (session?.user) {
      const sessionUser = session.user as SessionUserWithRole;
      return {
        userId: sessionUser.id || '',
        email: sessionUser.email || '',
        name: sessionUser.name || '',
        role: sessionUser.role || 'READER', // Default role for OAuth users
      };
    }

    // 2. Fallback to manual JWT token (Legacy Login)
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, getEncodedSecret());

    return {
      userId: (payload.sub || payload.userId) as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 * Use this when you need to ensure user is logged in
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  return user;
}

/**
 * Check if user has admin role
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();

  if (user.role !== 'ADMIN') {
    throw new Error('FORBIDDEN');
  }

  return user;
}
