import { getNewsByCategory, newsData } from '@/data/news';
import Link from 'next/link';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const categories = Array.from(new Set(newsData.map(n => n.category.toLowerCase())));
    return categories.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const categoryNews = getNewsByCategory(decodeURIComponent(slug));
    const categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{categoryTitle}</h1>

            {/* Updated to use CSS Class for mobile responsiveness */}
            <div className="articles-grid">
                {categoryNews.map(item => (
                    <Link key={item.id} href={`/article/${item.slug}`} className="glass-panel" style={{ overflow: 'hidden', textDecoration: 'none' }}>
                        <div style={{ height: '200px', background: `url(${item.image}) center/cover` }}></div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>{item.category}</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.publishedAt}</span>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', lineHeight: 1.3, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
