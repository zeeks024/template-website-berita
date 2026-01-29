import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({
            user: {
                id: user.userId,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch {
        return NextResponse.json({ user: null });
    }
}
