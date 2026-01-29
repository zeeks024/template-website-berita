import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

type BookmarkRecord = { slug: string };

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ bookmarks: [] });
        }

        const bookmarks = await (prisma as unknown as { bookmark: { findMany: (args: unknown) => Promise<BookmarkRecord[]> } }).bookmark.findMany({
            where: { userId: user.userId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ 
            bookmarks: bookmarks.map((b: BookmarkRecord) => b.slug) 
        });
    } catch {
        return NextResponse.json({ bookmarks: [] });
    }
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await request.json();
        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        const db = prisma as unknown as { 
            bookmark: { 
                findUnique: (args: unknown) => Promise<unknown>,
                create: (args: unknown) => Promise<unknown>
            } 
        };

        const existing = await db.bookmark.findUnique({
            where: { userId_slug: { userId: user.userId, slug } }
        });

        if (existing) {
            return NextResponse.json({ message: 'Already bookmarked' });
        }

        await db.bookmark.create({
            data: { userId: user.userId, slug }
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to bookmark' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await request.json();
        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        const db = prisma as unknown as { 
            bookmark: { deleteMany: (args: unknown) => Promise<unknown> } 
        };

        await db.bookmark.deleteMany({
            where: { userId: user.userId, slug }
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
    }
}
