"use client";

import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import CommentSection from '@/components/article/CommentSection';
import ShareButtons from '@/components/ui/ShareButtons';
import BookmarkButton from '@/components/ui/BookmarkButton';
import { use, useEffect, useState } from 'react';

// Use params as a Promise for Next.js 15+
type Props = {
    params: Promise<{ slug: string }>;
};

export default function ArticlePage({ params }: Props) {
    // Unwrap params using React.use()
    const { slug } = use(params);

    const { allNews, loading } = useNews();
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        if (!loading) {
            const found = allNews.find(n => n.slug === slug);
            setArticle(found);
        }
    }, [allNews, loading, slug]);

    // Track article view
    useEffect(() => {
        if (slug) {
            fetch('/api/views', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug }),
            }).catch(() => { }); // Silent fail
        }
    }, [slug]);

    if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading article...</div>;

    if (!article) {
        return <div className="container" style={{ padding: '4rem' }}>Artikel tidak ditemukan. <Link href="/" className="text-blue-500">Kembali</Link></div>;
    }

    // Base URL for sharing (mocking for dev)
    const articleUrl = `https://nusadaily.com/article/${slug}`;

    return (
        <article>
            {/* Full Header - Responsive Font Size */}
            <div style={{
                height: '50vh', minHeight: '400px', position: 'relative', display: 'flex', alignItems: 'flex-end',
                background: `linear-gradient(to top, var(--bg-color), transparent), url(${article.image}) center/cover`
            }}>
                <div className="container" style={{ paddingBottom: '3rem', position: 'relative', zIndex: 10 }}>
                    <span className="glass-chip" style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', marginBottom: '1rem', display: 'inline-block' }}>
                        {article.category}
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', fontWeight: 900,
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)', color: 'var(--text-primary)', maxWidth: '900px'
                    }}>
                        {article.title}
                    </h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc', backgroundImage: 'url(https://i.pravatar.cc/100)', backgroundSize: 'cover' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 700, fontSize: '14px' }}>{article.author}</span>
                                <span style={{ fontSize: '12px', opacity: 0.8 }}>{article.publishedAt}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <div className="news-grid">

                    {/* Main Content Column */}
                    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                        {/* Toolbar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{article.readTime} read</span>
                            <BookmarkButton id={article.id} className="btn-secondary" />
                        </div>

                        <div className="article-content">
                            <p style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                {article.summary}
                            </p>
                            <div
                                dangerouslySetInnerHTML={{ __html: article.content }}
                                style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}
                            />
                        </div>

                        {/* Social Features */}
                        <ShareButtons title={article.title} url={articleUrl} />
                        <CommentSection slug={article.slug} />
                    </div>

                    {/* Sticky Sidebar */}
                    <aside>
                        <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Artikel Terkait</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {allNews
                                    .filter(n => n.id !== article.id && n.category === article.category)
                                    .slice(0, 3)
                                    .concat(
                                        allNews
                                            .filter(n => n.id !== article.id && n.category !== article.category)
                                            .slice(0, 3 - allNews.filter(n => n.id !== article.id && n.category === article.category).length)
                                    )
                                    .slice(0, 3)
                                    .map(item => (
                                        <Link key={item.id} href={`/article/${item.slug}`} style={{ display: 'flex', gap: '12px', textDecoration: 'none' }}>
                                            <div style={{
                                                width: '70px', height: '70px', borderRadius: '8px',
                                                background: `url(${item.image}) center/cover`, flexShrink: 0
                                            }}></div>
                                            <div>
                                                <h5 style={{ fontSize: '14px', lineHeight: 1.3, marginBottom: '4px' }}>{item.title}</h5>
                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.publishedAt}</span>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
