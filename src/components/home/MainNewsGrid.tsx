"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useNews } from '@/hooks/useNews';
import { Eye } from 'lucide-react';

// Category definitions with icons and colors
const categories = [
    { name: 'Opini', icon: '💭', description: 'Pendapat & Gagasan' },
    { name: 'Cerita', icon: '📖', description: 'Kisah Warga' },
    { name: 'Sosok Inspiratif', icon: '⭐', description: 'Tokoh Hebat' },
    { name: 'Sudut Kota', icon: '📍', description: 'Jelajah Tempat' },
    { name: 'Potensi', icon: '🌱', description: 'Peluang Daerah' },
];

const getCategoryClass = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('opini')) return 'opini';
    if (cat.includes('cerita')) return 'cerita';
    if (cat.includes('sosok')) return 'sosok';
    if (cat.includes('sudut')) return 'sudut';
    if (cat.includes('potensi')) return 'potensi';
    return '';
};

const getCategorySlug = (name: string) => {
    return name.toLowerCase();
};

export default function MainNewsGrid() {
    const { allNews, loading } = useNews();

    if (loading) {
        return (
            <div className="container py-20 text-center">
                <div className="text-white/50 animate-pulse">Memuat berita...</div>
            </div>
        );
    }

    return (
        <section style={{ paddingBottom: '4rem' }}>
            <div className="container">
                {/* Quick Category Navigation */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/category/${getCategorySlug(cat.name)}`}
                            className="bg-card border border-border p-6 rounded-2xl text-center hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                            <div className="font-bold text-foreground mb-1">{cat.name}</div>
                            <div className="text-xs text-muted-foreground">{cat.description}</div>
                        </Link>
                    ))}
                </div>

                {/* Each Category Section */}
                {categories.map((cat) => {
                    const categoryArticles = allNews.filter(
                        n => n.category.toLowerCase() === cat.name.toLowerCase()
                    );

                    if (categoryArticles.length === 0) return null;

                    return (
                        <div key={cat.name} style={{ marginBottom: '4rem' }}>
                            {/* Section Header */}
                            <div className="section-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                                    <h2 className="section-title">{cat.name}</h2>
                                </div>
                                <Link href={`/category/${getCategorySlug(cat.name)}`} className="see-all">
                                    Lihat semua
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Articles Grid - 2 columns for this section */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {categoryArticles.slice(0, 2).map((article, index) => (
                                    <Link
                                        href={`/article/${article.slug}`}
                                        key={article.id}
                                        style={{ textDecoration: 'none', height: '100%' }}
                                    >
                                        <article className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <div className="card-image" style={{ position: 'relative', height: '200px', flexShrink: 0 }}>
                                                <Image
                                                    src={article.image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <span className={`card-category ${getCategoryClass(article.category)}`}>
                                                    {article.category}
                                                </span>
                                                <h3 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</h3>
                                                <p className="card-excerpt" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.summary}</p>
                                                <div className="card-meta" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div className="card-author">
                                                            <div className="avatar">{article.author.charAt(0)}</div>
                                                            <span>{article.author}</span>
                                                        </div>
                                                        <span>•</span>
                                                        <span>{article.readTime}</span>
                                                    </div>

                                                    {/* View Count */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                        <Eye size={12} />
                                                        <span>{article.views || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
