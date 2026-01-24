// Centralized auth configuration
// This ensures JWT_SECRET is consistent across all auth-related code

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-123';

export const AUTH_CONFIG = {
  jwtSecret: JWT_SECRET,
  cookieName: 'token',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  },
} as const;

// Helper to get encoded secret for jose
export function getEncodedSecret() {
  return new TextEncoder().encode(AUTH_CONFIG.jwtSecret);
}

// Debug helper
export function getSecretInfo() {
  return {
    isSet: !!process.env.JWT_SECRET,
    value: process.env.JWT_SECRET ? 'SET' : 'FALLBACK',
    length: AUTH_CONFIG.jwtSecret.length,
  };
}
