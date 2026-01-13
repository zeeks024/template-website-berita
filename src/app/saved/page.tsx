"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import BookmarkButton from '@/components/ui/BookmarkButton';
import { useEffect, useState } from 'react';

export default function SavedPage() {
    const { bookmarks, isInitialized } = useBookmarks();
    const { allNews } = useNews();
    const [savedArticles, setSavedArticles] = useState<any[]>([]);

    useEffect(() => {
        if (isInitialized && allNews.length > 0) {
            setSavedArticles(allNews.filter(item => bookmarks.includes(item.id)));
        }
    }, [bookmarks, isInitialized, allNews]);

    if (!isInitialized) return <div className="container" style={{ padding: '4rem 0' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '2rem' }}>Berita Tersimpan 🔖</h1>

            {savedArticles.length > 0 ? (
                <div className="articles-grid">
                    {savedArticles.map((item) => (
                        <div key={item.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', borderRadius: '18px', overflow: 'hidden' }}>
                            <Link href={`/article/${item.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
                                <div style={{ height: '200px', width: '100%', background: `url(${item.image}) center/cover` }}></div>
                                <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>{item.category}</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.publishedAt}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.25rem', lineHeight: 1.3, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{item.title}</h2>
                                </div>
                            </Link>
                            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                                <BookmarkButton id={item.id} className="btn-secondary" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--glass-bg)', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Belum ada berita tersimpan</h2>
                    <p style={{ marginBottom: '2rem' }}>Simpan berita menarik untuk dibaca nanti.</p>
                    <Link href="/" className="btn-primary">Jelajahi Berita</Link>
                </div>
            )}
        </div>
    );
}
