import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { newsData } from '@/data/news';

export async function GET() {
    try {
        // Fetch distinct categories from DB
        const articles = await prisma.article.findMany({
            select: {
                category: true
            },
            distinct: ['category']
        });

        // Extract category strings and filter out valid ones
        const dbCategories = articles
            .map(a => a.category)
            .filter(Boolean);

        // Merge with DEFAULT/Static categories to ensure important ones always exist
        // (Optional: remove this merge if you want purely DB-driven)
        const staticCategories = Array.from(new Set(newsData.map(n => n.category)));

        // Combine and dedup
        const allCategories = Array.from(new Set([...staticCategories, ...dbCategories])).sort();

        return NextResponse.json(allCategories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { category } = await request.json();

        if (!category) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        // Update all articles with this category to "Umum" (or default)
        await prisma.article.updateMany({
            where: { category: category },
            data: { category: 'Umum' }
        });

        return NextResponse.json({ message: 'Category deleted and articles reassigned' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
