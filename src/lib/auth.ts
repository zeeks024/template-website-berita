import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getEncodedSecret } from './auth-config';

export type AuthUser = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

/**
 * Get current authenticated user from JWT token in cookies
 * Returns user object if valid, null otherwise
 * 
 * Use this in Server Components and API routes
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, getEncodedSecret());
    
    return {
      userId: payload.userId as string,
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
