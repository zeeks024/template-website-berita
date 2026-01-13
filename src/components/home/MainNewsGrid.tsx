"use client";

import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import TimeAgo from '@/components/ui/TimeAgo';

// Separate component for Newsletter to use hooks
function NewsletterCard() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email.trim()) setSubscribed(true);
    };

    if (subscribed) {
        return (
            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Terima Kasih!</h3>
                <p style={{ fontSize: '0.9rem' }}>Anda telah berlangganan newsletter kami.</p>
            </div>
        )
    }

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Langganan Newsletter</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Dapatkan ringkasan berita terpopuler setiap pagi.</p>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: '12px', borderRadius: '8px',
                        border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-primary)',
                        width: '100%'
                    }}
                    placeholder="Email Anda..."
                />
                <button onClick={handleSubscribe} className="btn-primary" style={{ width: '100%' }}>Kirim</button>
            </div>
        </div>
    );
}


export default function MainNewsGrid() {
    const { allNews, loading } = useNews();

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                Memuat Berita Terbaru...
            </div>
        );
    }

    // Slice news to avoid duplication with HeroSection (which takes 0-4)
    const startIdx = 5;
    const featuredTerkini = allNews[startIdx];
    const subTerkini = allNews.slice(startIdx + 1, startIdx + 5);
    const popularNews = allNews.slice(0, 5); // Just mimic popular with top news

    if (!featuredTerkini) return null;

    return (
        <section style={{ padding: '2rem 0' }}>
            <div className="container">

                {/* Header Terkini */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0 3rem' }}>
                    <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }}></div>
                    <h2 style={{
                        fontFamily: 'serif', fontSize: '2rem', margin: 0,
                        color: 'var(--text-primary)', fontWeight: 700
                    }}>
                        Terkini
                    </h2>
                    <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }}></div>
                </div>

                <div className="news-grid">
                    {/* LEFT COLUMN: Content */}
                    <div style={{ flex: 2, minWidth: '0' /* Fix flex/grid overflow */ }}>
                        {/* 1. Large Feature Article */}
                        <FadeIn>
                            <Link href={`/article/${featuredTerkini.slug}`} className="glass-panel" style={{
                                display: 'block', textDecoration: 'none', border: 'none', boxShadow: 'none', background: 'transparent',
                                marginBottom: '3rem'
                            }}>
                                <div style={{
                                    aspectRatio: '16/9', width: '100%', borderRadius: '12px',
                                    backgroundImage: `url(${featuredTerkini.image})`,
                                    backgroundSize: 'cover', backgroundPosition: 'center',
                                    marginBottom: '1.5rem'
                                }}></div>

                                <span style={{
                                    display: 'inline-block', border: '1px solid #b59449', color: '#b59449',
                                    padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700,
                                    textTransform: 'uppercase', marginBottom: '1rem'
                                }}>
                                    {featuredTerkini.category}
                                </span>

                                <h2 style={{
                                    fontFamily: 'serif', fontSize: '2rem', lineHeight: 1.2,
                                    marginBottom: '1rem', color: 'var(--text-primary)'
                                }}>
                                    {featuredTerkini.title}
                                </h2>

                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
                                    {featuredTerkini.summary}
                                </p>

                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                    {featuredTerkini.author} • <TimeAgo date={featuredTerkini.publishedAt} />
                                </div>
                            </Link>
                        </FadeIn>

                        {/* 2. Row of 4 Thumbnails */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem'
                        }}>
                            {subTerkini.map((item, i) => (
                                <FadeIn key={item.id} delay={i * 0.1}>
                                    <Link href={`/article/${item.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <div style={{
                                            aspectRatio: '1/1', width: '100%', borderRadius: '8px',
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: 'cover', backgroundPosition: 'center',
                                            marginBottom: '1rem'
                                        }}></div>
                                        <span style={{
                                            fontSize: '10px', border: '1px solid #cbd5e1', color: '#64748b',
                                            padding: '2px 8px', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '0.5rem'
                                        }}>
                                            {item.category}
                                        </span>
                                        <h4 style={{
                                            fontFamily: 'serif', fontSize: '1rem', lineHeight: 1.3,
                                            color: 'var(--text-primary)', marginBottom: '0.5rem'
                                        }}>
                                            {item.title}
                                        </h4>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Popular) */}
                    <div style={{ flex: 1 }}>
                        <div style={{ position: 'sticky', top: '2rem' }}>
                            <div style={{ borderBottom: '3px solid #b59449', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Popular</h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {popularNews.map((item, i) => (
                                    <Link key={item.id} href={`/article/${item.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <span style={{
                                            fontSize: '2rem', fontFamily: 'serif', fontWeight: 700,
                                            color: '#e2e8f0', lineHeight: 1, marginTop: '-5px'
                                        }}>
                                            {i + 1}
                                        </span>
                                        <div>
                                            <span style={{ fontSize: '10px', color: '#b59449', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                                                {item.category}
                                            </span>
                                            <h4 style={{
                                                fontFamily: 'serif', fontSize: '1.1rem', margin: 0,
                                                color: 'var(--text-primary)', lineHeight: 1.3
                                            }}>
                                                {item.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Existing Sidebar Logic */}
                            <div style={{ marginTop: '3rem' }}>
                                <NewsletterCard />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
