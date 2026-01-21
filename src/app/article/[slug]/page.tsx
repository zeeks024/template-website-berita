import prisma from '@/lib/prisma';
import ArticleDetail from '@/components/article/ArticleDetail';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate Metadata for SEO/Social Sharing
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;

    // Fetch directly from DB for server-side metadata
    const article = await prisma.article.findUnique({
        where: { slug },
    });

    if (!article) {
        return {
            title: 'Artikel Tidak Ditemukan | Svara Serayu',
            description: 'Berita tidak ditemukan atau telah dihapus.',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${article.title} | Svara Serayu`,
        description: article.summary,
        openGraph: {
            title: article.title,
            description: article.summary,
            url: `https://serayu.vercel.app/article/${slug}`,
            siteName: 'Svara Serayu',
            images: [
                {
                    url: article.image || '', // Using the raw image URL from DB
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
                ...previousImages,
            ],
            locale: 'id_ID',
            type: 'article',
            publishedTime: new Date(article.createdAt).toISOString(),
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
    return <ArticleDetail slug={slug} />;
}
