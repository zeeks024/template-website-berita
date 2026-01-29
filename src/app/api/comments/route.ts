import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { slug },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { id: true, name: true }
                }
            }
        });

        const formattedComments = comments.map(c => ({
            id: c.id,
            text: c.text,
            slug: c.slug,
            name: c.user?.name || c.name || 'Anonim',
            userId: c.userId,
            createdAt: c.createdAt
        }));

        return NextResponse.json(formattedComments);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Login diperlukan untuk berkomentar' }, { status: 401 });
        }

        const { text, slug } = await request.json();

        if (!text || !slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: {
                text,
                slug,
                userId: user.userId,
            },
        });

        return NextResponse.json({
            ...comment,
            name: user.name
        });
    } catch {
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
    }
}
