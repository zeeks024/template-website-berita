import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    try {
        await requireAdmin();

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: { articles: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(users);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'UNAUTHORIZED') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            if (error.message === 'FORBIDDEN') {
                return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
            }
        }
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
