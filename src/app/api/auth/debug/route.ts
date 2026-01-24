import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getEncodedSecret, getSecretInfo } from '@/lib/auth-config';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  const secretInfo = getSecretInfo();
  
  const debug = {
    tokenExists: !!token,
    tokenLength: token?.length || 0,
    secretInfo,
    nodeEnv: process.env.NODE_ENV,
  };

  if (token) {
    try {
      const secret = getEncodedSecret();
      const { payload } = await jwtVerify(token, secret);
      return NextResponse.json({
        ...debug,
        tokenValid: true,
        user: payload,
        message: 'Token is valid'
      });
    } catch (err: unknown) {
      const error = err as Error & { code?: string };
      return NextResponse.json({
        ...debug,
        tokenValid: false,
        error: error.message,
        errorCode: error.code,
        message: 'Token verification failed'
      }, { status: 401 });
    }
  }

  return NextResponse.json({
    ...debug,
    message: 'No token found in cookies'
  });
}
