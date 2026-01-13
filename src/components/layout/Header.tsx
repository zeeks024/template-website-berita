"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <header className="sticky-header">
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

                        {/* Logo Area */}
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                            <div style={{
                                width: '38px', height: '38px',
                                background: 'linear-gradient(135deg, rgba(59,130,246,0.95), rgba(34,197,94,0.9))',
                                borderRadius: '12px',
                                boxShadow: '0 4px 14px rgba(59,130,246,0.3)'
                            }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '18px', fontWeight: 800, lineHeight: 1.1, color: 'var(--text-primary)' }}>Serayu</span>
                            </div>
                        </Link>

                        {/* Search Bar - Desktop */}
                        <form onSubmit={handleSearch} style={{
                            flex: 1, maxWidth: '480px', margin: '0 2rem',
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            alignItems: 'center', gap: '8px'
                        }} className="desktop-only">
                            <img src="/icons/Search.png" alt="Search" width={20} height={20} style={{ opacity: 0.7 }} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari topik..."
                                style={{
                                    background: 'transparent', border: 'none', outline: 'none',
                                    color: 'var(--text-primary)', width: '100%', fontSize: '14px',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </form>

                        {/* Mobile Search Icon */}
                        <Link href="/search" className="mobile-only btn-secondary" style={{ marginRight: 'auto', marginLeft: '1rem', padding: '8px', textDecoration: 'none' }}>
                            <img src="/icons/Search.png" alt="Search" width={20} height={20} />
                        </Link>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {/* Saved Articles Link */}
                            <Link href="/saved" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} title="Berita Tersimpan">
                                <img src="/icons/Bookmark.png" alt="Saved" width={20} height={20} />
                            </Link>

                            {/* Theme Toggle */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="btn-secondary"
                                style={{ padding: '8px 12px', fontSize: '18px', display: 'flex', alignItems: 'center' }}
                                aria-label="Toggle Theme"
                            >
                                {mounted && theme === 'dark' ? '🌙' : '☀️'}
                            </button>

                        </div>

                    </div>
                </div>
            </header>

            {/* Category Chips Bar */}
            <div style={{ padding: '1rem 0', overflowX: 'auto', borderBottom: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link href="/" className="glass-chip active">Beranda</Link>
                        {['Nusantara', 'Dunia', 'Ekonomi', 'Teknologi', 'Kesehatan', 'Olahraga', 'Hiburan', 'Opini'].map(cat => (
                            <Link href={`/category/${cat.toLowerCase()}`} key={cat} className="glass-chip">{cat}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
