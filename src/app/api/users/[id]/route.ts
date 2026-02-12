import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams) {
    try {
        await requireAdmin();
        const { id } = await params;

        const user = await prisma.user.findUnique({
            where: { id },
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
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
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
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const currentUser = await requireAdmin();
        const { id } = await params;

        const body = await request.json();
        const { role, isVerified, name } = body;

        // Prevent admin from demoting themselves
        if (currentUser.userId === id && role && role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Cannot change your own role' },
                { status: 400 }
            );
        }

        const updateData: Record<string, unknown> = {};
        if (role !== undefined) updateData.role = role;
        if (isVerified !== undefined) updateData.isVerified = isVerified;
        if (name !== undefined) updateData.name = name;

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return NextResponse.json(user);
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
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const currentUser = await requireAdmin();
        const { id } = await params;

        // Prevent admin from deleting themselves
        if (currentUser.userId === id) {
            return NextResponse.json(
                { error: 'Cannot delete your own account' },
                { status: 400 }
            );
        }

        // Check if user has articles
        const user = await prisma.user.findUnique({
            where: { id },
            include: { _count: { select: { articles: true } } }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user._count.articles > 0) {
            return NextResponse.json(
                { error: `Cannot delete user with ${user._count.articles} articles. Reassign or delete articles first.` },
                { status: 400 }
            );
        }

        await prisma.user.delete({ where: { id } });

        return NextResponse.json({ success: true });
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
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}
