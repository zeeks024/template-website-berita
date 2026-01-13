"use client";

import BookmarkButton from "@/components/ui/BookmarkButton";
import { useNews } from "@/hooks/useNews";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import TimeAgo from "@/components/ui/TimeAgo";

export default function HeroSection() {
    const { allNews, loading } = useNews();

    if (loading) return null; // Let MainGrid handle loading state or add skeleton here
    if (allNews.length === 0) return null;

    const featured = allNews[0];
    const subNews = allNews.slice(1, 5); // Take 4 items for the bottom row

    return (
        <section style={{ paddingBottom: '2rem' }}>

            {/* Main Feature - Full Width Edge-to-Edge */}
            <FadeIn>
                <article style={{
                    position: 'relative',
                    width: '100%',
                    height: '85vh', // Cinematic height
                    maxHeight: '700px',
                    minHeight: '500px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    marginBottom: '3rem'
                }}>
                    {/* Background Image - Absolute Full */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: `url(${featured.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0
                    }}></div>

                    {/* Dark Overlay Gradient */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)',
                        zIndex: 1
                    }}></div>

                    {/* Content - Constrained to Container */}
                    <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '3rem' }}>
                        <div style={{ maxWidth: '900px' }}>
                            <span style={{
                                display: 'inline-block',
                                background: '#b59449', // Intisari Gold
                                color: 'white',
                                padding: '6px 16px', borderRadius: '4px',
                                fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem',
                                textTransform: 'uppercase',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}>
                                {featured.category || 'TERBARU'}
                            </span>

                            <Link href={`/article/${featured.slug}`} style={{ textDecoration: 'none' }}>
                                <h1 style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                                    lineHeight: 1.1, marginBottom: '1.5rem',
                                    fontFamily: 'serif',
                                    color: 'white',
                                    fontWeight: 700,
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                    cursor: 'pointer'
                                }}>
                                    {featured.title}
                                </h1>
                            </Link>

                            <p style={{
                                fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6,
                                color: 'rgba(255,255,255,0.95)', maxWidth: '800px',
                                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                            }}>
                                {featured.excerpt || featured.summary}
                            </p>

                            {/* Meta */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '15px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                                <span style={{ color: '#ffd700' }}>{featured.author}</span>
                                <span style={{ width: 4, height: 4, background: 'currentColor', borderRadius: '50%' }}></span>
                                <span><TimeAgo date={featured.publishedAt} /></span>
                            </div>
                        </div>
                    </div>
                </article>
            </FadeIn>

            {/* Sub News - 4 Column Grid */}
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '2rem'
                }}>
                    {subNews.map((item, i) => (
                        <FadeIn key={item.id} delay={i * 0.1}>
                            <Link href={`/article/${item.slug}`} className="glass-panel" style={{
                                display: 'flex', flexDirection: 'column',
                                height: '100%', textDecoration: 'none',
                                border: 'none', background: 'transparent', boxShadow: 'none'
                            }}>
                                <div style={{
                                    aspectRatio: '16/9', width: '100%', borderRadius: '8px',
                                    backgroundColor: 'var(--glass-border)',
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    marginBottom: '1rem'
                                }}></div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '11px', color: '#b59449', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                                        {item.category}
                                    </span>
                                    <h3 style={{
                                        fontSize: '1.2rem', lineHeight: 1.3, margin: '0 0 0.5rem 0',
                                        fontFamily: 'serif',
                                        color: 'var(--text-primary)',
                                        fontWeight: 600
                                    }}>
                                        {item.title}
                                    </h3>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}><TimeAgo date={item.publishedAt} /></div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
