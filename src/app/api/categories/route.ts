import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { newsData } from '@/data/news';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            select: {
                category: true
            },
            distinct: ['category']
        });

        const dbCategories = articles
            .map(a => a.category)
            .filter(Boolean);

        const staticCategories = Array.from(new Set(newsData.map(n => n.category)));

        const allCategories = Array.from(new Set([...staticCategories, ...dbCategories])).sort();

        return NextResponse.json(allCategories);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await requireAdmin();

        const { category } = await request.json();

        if (!category) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        await prisma.article.updateMany({
            where: { category: category },
            data: { category: 'Umum' }
        });

        return NextResponse.json({ message: 'Category deleted and articles reassigned' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'UNAUTHORIZED') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            if (error.message === 'FORBIDDEN') {
                return NextResponse.json({ error: 'Forbidden: Admin only' }, { status: 403 });
            }
        }
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
