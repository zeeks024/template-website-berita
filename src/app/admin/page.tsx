"use client";

import { useNews } from '@/hooks/useNews';
import { useState } from 'react';
import Link from 'next/link';



export default function AdminDashboard() {
    const { allNews, loading, deleteArticle } = useNews();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, published, draft, archived

    if (loading) return <div>Loading dashboard...</div>;

    // --- Real Stats Calculation ---
    const totalArticles = allNews.length;
    const totalViews = allNews.reduce((sum, item) => sum + (item.views || 0), 0);

    // Calculate Top Category
    const categoryCounts: Record<string, number> = {};
    allNews.forEach(news => {
        categoryCounts[news.category] = (categoryCounts[news.category] || 0) + 1;
    });
    const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    // --- Filtering Logic ---
    const filteredNews = allNews.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory ? item.category === filterCategory : true;
        const widthStatus = item.status || 'published'; // Default old articles to published
        const matchesStatus = filterStatus === 'all' ? true : widthStatus === filterStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const categories = Array.from(new Set(allNews.map(n => n.category)));

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard Redaksi</h1>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/icons/Category.png" alt="Articles" width={24} height={24} />
                </div>
                <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total Artikel</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{totalArticles}</div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(22, 163, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/icons/Show.png" alt="Views" width={24} height={24} />
                </div>
                <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total Pembaca</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{totalViews.toLocaleString()}</div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(217, 119, 6, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/icons/Bookmark.png" alt="Favorite" width={24} height={24} />
                </div>
                <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Kategori Favorit</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{topCategory}</div>
                </div>
            </div>

            {/* Recent Articles Table */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', background: 'var(--bg-color)' }}>
                    <div className="admin-controls">
                        <h3 style={{ margin: 0, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>Manajemen Berita</h3>

                        <div className="admin-controls-right">
                            {/* Status Tabs */}
                            <div className="status-tabs" style={{ display: 'flex', background: 'var(--glass-border)', padding: '4px', borderRadius: '8px' }}>
                                {['all', 'published', 'draft', 'archived'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            background: filterStatus === status ? 'var(--bg-color)' : 'transparent',
                                            color: filterStatus === status ? 'var(--text-primary)' : 'var(--text-muted)',
                                            boxShadow: filterStatus === status ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                            cursor: 'pointer',
                                            textTransform: 'capitalize',
                                            flexShrink: 0
                                        }}
                                    >
                                        {status === 'all' ? 'Semua' : status}
                                    </button>
                                ))}
                            </div>

                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="input-field"
                                style={{ padding: '8px', borderRadius: '6px', fontSize: '14px', maxWidth: '150px' }}
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>

                            <input
                                type="text"
                                placeholder="Cari judul..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field"
                                style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '14px', width: '200px' }}
                            />

                            <Link href="/admin/create" className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center' }}>+ Artikel Baru</Link>
                        </div>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                        <thead style={{ background: 'var(--bg-color)' }}>
                            <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)' }}>Judul Artikel</th>
                                <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)' }}>Kategori</th>
                                <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)' }}>Statistik</th>
                                <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)' }}>Terbit</th>
                                <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)', textAlign: 'right' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNews.length > 0 ? filteredNews.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: '10px', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700,
                                                background: item.status === 'draft' ? '#f59e0b' : item.status === 'archived' ? '#78716c' : '#22c55e',
                                                color: 'white'
                                            }}>
                                                {item.status || 'PUBLISHED'}
                                            </span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.author}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span className="glass-chip" style={{ fontSize: '11px', padding: '2px 8px' }}>{item.category}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.views || 0}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Views</div>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{item.publishedAt}</td>
                                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                                            <Link href={`/article/${item.slug}`} target="_blank" className="btn-secondary" title="Lihat" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center' }}>
                                                <img src="/icons/Show.png" alt="View" width={16} height={16} />
                                            </Link>
                                            <Link href={`/admin/edit/${item.slug}`} className="btn-secondary" title="Edit" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center' }}>
                                                <img src="/icons/Edit Square.png" alt="Edit" width={16} height={16} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Hapus artikel "${item.title}"?`)) deleteArticle(item.id);
                                                }}
                                                className="btn-secondary" title="Hapus" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', borderColor: 'var(--glass-border)' }}>
                                                <img src="/icons/Delete.png" alt="Delete" width={16} height={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        Tidak ada berita yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
