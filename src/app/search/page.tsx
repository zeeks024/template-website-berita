"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import { Suspense, useState, useMemo } from 'react';

const CATEGORIES = ['Semua', 'Teknologi', 'Ekonomi', 'Nusantara', 'Daerah', 'Kesehatan'];
const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevansi' },
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
];

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const categoryParam = searchParams.get('category') || 'Semua';
    const sortParam = searchParams.get('sort') || 'relevance';

    const [category, setCategory] = useState(categoryParam);
    const [sort, setSort] = useState(sortParam);

    const { allNews } = useNews();

    const filteredNews = useMemo(() => {
        let results = allNews.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.summary.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        // Apply category filter
        if (category !== 'Semua') {
            results = results.filter(item => item.category === category);
        }

        // Apply sorting
        if (sort === 'newest') {
            results = [...results].reverse(); // Assuming data is oldest first
        } else if (sort === 'oldest') {
            // Keep original order
        }
        // 'relevance' keeps the default order from search

        return results;
    }, [allNews, query, category, sort]);

    const updateFilters = (newCategory: string, newSort: string) => {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (newCategory !== 'Semua') params.set('category', newCategory);
        if (newSort !== 'relevance') params.set('sort', newSort);
        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="container" style={{ padding: '2rem 0 4rem', minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '1.5rem' }}>Hasil Pencarian: "{query}"</h1>

            {/* Filters */}
            <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Kategori:</label>
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            updateFilters(e.target.value, sort);
                        }}
                        style={{
                            padding: '8px 12px', borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--bg-color)', color: 'var(--text-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Urutkan:</label>
                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            updateFilters(category, e.target.value);
                        }}
                        style={{
                            padding: '8px 12px', borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--bg-color)', color: 'var(--text-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    {filteredNews.length} hasil ditemukan
                </span>
            </div>

            {filteredNews.length > 0 ? (
                <div className="articles-grid">
                    {filteredNews.map((item) => (
                        <Link key={item.id} href={`/article/${item.slug}`} className="glass-panel" style={{ display: 'block', borderRadius: '18px', overflow: 'hidden', textDecoration: 'none' }}>
                            <div style={{ height: '200px', width: '100%', background: `url(${item.image}) center/cover` }}></div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>{item.category}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.publishedAt}</span>
                                </div>
                                <h2 style={{ fontSize: '1.25rem', lineHeight: 1.3, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{item.title}</h2>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.summary}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <p>Tidak ditemukan berita dengan kriteria tersebut.</p>
                    <button
                        onClick={() => {
                            setCategory('Semua');
                            setSort('relevance');
                            updateFilters('Semua', 'relevance');
                        }}
                        className="btn-secondary"
                        style={{ marginTop: '1rem' }}
                    >
                        Reset Filter
                    </button>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem 0' }}>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
