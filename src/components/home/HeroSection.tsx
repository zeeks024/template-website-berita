"use client";

import Link from 'next/link';
import Image from 'next/image';
import { newsData } from '@/data/news';

export default function HeroSection() {
    const featured = newsData.find(n => n.featured) || newsData[0];

    const getCategoryClass = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes('opini')) return 'opini';
        if (cat.includes('cerita')) return 'cerita';
        if (cat.includes('sosok')) return 'sosok';
        if (cat.includes('sudut')) return 'sudut';
        if (cat.includes('potensi')) return 'potensi';
        return '';
    };

    return (
        <section style={{ padding: '3rem 0 2rem' }}>
            <div className="container">
                {/* Hero Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="hero-badge">
                        <span>🌊</span>
                        <span>Media Komunitas Banjarnegara</span>
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '1rem',
                        background: 'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Cerita dari Serayu
                    </h1>
                    <p style={{ fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                        Mengangkat opini, cerita inspiratif, dan potensi dari setiap sudut Banjarnegara.
                    </p>
                </div>

                {/* Featured Article */}
                {featured && (
                    <Link href={`/article/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div className="card card-featured">
                            <div className="card-image" style={{ position: 'relative', height: '400px' }}>
                                <Image
                                    src={featured.image}
                                    alt={featured.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="100vw"
                                />
                            </div>
                            <div className="card-body">
                                <span className={`card-category ${getCategoryClass(featured.category)}`}>
                                    ⭐ Pilihan Editor
                                </span>
                                <h2 className="card-title">{featured.title}</h2>
                                <p className="card-excerpt" style={{ marginTop: '0.75rem', WebkitLineClamp: 3 }}>
                                    {featured.summary}
                                </p>
                                <div className="card-meta">
                                    <div className="card-author">
                                        <div className="avatar">{featured.author.charAt(0)}</div>
                                        <span>{featured.author}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{featured.readTime} baca</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </section>
    );
}
