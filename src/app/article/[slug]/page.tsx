import prisma from '@/lib/prisma';
import ArticleDetail from '@/components/article/ArticleDetail';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/types/news';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getArticle(slug: string): Promise<NewsItem | null> {
    const article = await prisma.article.findUnique({
        where: { slug },
    });

    if (!article) return null;

    return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        excerpt: article.excerpt || '',
        content: article.content,
        category: article.category,
        author: article.author,
        image: article.image || '',
        imageCaption: article.imageCaption || '',
        imageCredit: article.imageCredit || '',
        readTime: article.readTime || '1 menit',
        publishedAt: article.publishedAt?.toISOString() || '',
        createdAt: article.createdAt.toISOString(),
        views: article.views,
        featured: article.featured,
        trendingRank: article.trendingRank ?? undefined,
        tags: article.tags ? JSON.parse(article.tags) : [],
        gallery: article.gallery ? JSON.parse(article.gallery) : [],
    };
}

async function getRelatedArticles(
    currentSlug: string,
    currentCategory: string,
    currentTags: string[],
    limit: number = 3
): Promise<NewsItem[]> {
    const candidates = await prisma.article.findMany({
        where: {
            slug: { not: currentSlug },
            status: 'published',
        },
        orderBy: { publishedAt: 'desc' },
        take: 20,
    });

    const scored = candidates.map(article => {
        let score = 0;

        if (article.category === currentCategory) {
            score += 10;
        }

        const articleTags: string[] = article.tags ? JSON.parse(article.tags) : [];
        const matchingTags = articleTags.filter(t => currentTags.includes(t));
        score += matchingTags.length * 3;

        return { article, score };
    });

    scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const dateA = a.article.publishedAt?.getTime() || 0;
        const dateB = b.article.publishedAt?.getTime() || 0;
        return dateB - dateA;
    });

    return scored.slice(0, limit).map(({ article }) => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        excerpt: article.excerpt || '',
        content: article.content,
        category: article.category,
        author: article.author,
        image: article.image || '',
        readTime: article.readTime || '1 menit',
        publishedAt: article.publishedAt?.toISOString() || '',
        createdAt: article.createdAt.toISOString(),
        views: article.views,
        featured: article.featured,
        trendingRank: article.trendingRank ?? undefined,
        tags: article.tags ? JSON.parse(article.tags) : [],
        gallery: article.gallery ? JSON.parse(article.gallery) : [],
    }));
}

// Generate Metadata for SEO/Social Sharing
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        return {
            title: 'Artikel Tidak Ditemukan | Derap Serayu',
            description: 'Berita tidak ditemukan atau telah dihapus.',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${article.title} | Derap Serayu`,
        description: article.summary,
        openGraph: {
            title: article.title,
            description: article.summary,
            url: `https://websiteberitademo.vercel.app/article/${slug}`,
            siteName: 'Derap Serayu',
            images: [
                {
                    url: article.image || '',
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
                ...previousImages,
            ],
            locale: 'id_ID',
            type: 'article',
            publishedTime: typeof article.createdAt === 'string' ? article.createdAt : undefined,
            authors: [article.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.summary,
            images: [article.image || ''],
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    const relatedArticles = await getRelatedArticles(
        slug,
        article.category,
        article.tags || []
    );

    return <ArticleDetail article={article} relatedArticles={relatedArticles} />;
}
