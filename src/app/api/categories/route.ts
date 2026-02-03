import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
    try {
        const [dbCategories, articleCategories] = await Promise.all([
            prisma.category.findMany({
                select: { name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.article.findMany({
                select: { category: true },
                distinct: ['category']
            })
        ]);

        const categoryNames = dbCategories.map(c => c.name);
        const articleCategoryNames = articleCategories.map(a => a.category).filter(Boolean);

        const allCategories = Array.from(new Set([...categoryNames, ...articleCategoryNames])).sort();

        return NextResponse.json(allCategories);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await requireAdmin();

        const { name } = await request.json();

        if (!name || typeof name !== 'string' || !name.trim()) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        const trimmedName = name.trim();

        const existing = await prisma.category.findUnique({
            where: { name: trimmedName }
        });

        if (existing) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
        }

        const category = await prisma.category.create({
            data: { name: trimmedName }
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'UNAUTHORIZED') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            if (error.message === 'FORBIDDEN') {
                return NextResponse.json({ error: 'Forbidden: Admin only' }, { status: 403 });
            }
        }
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await requireAdmin();

        const { category } = await request.json();

        if (!category) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        await prisma.category.deleteMany({
            where: { name: category }
        });

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
