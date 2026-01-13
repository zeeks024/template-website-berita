import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, text, slug } = await request.json();

        if (!name || !text || !slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: {
                name,
                text,
                slug,
            },
        });

        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
    }
}
