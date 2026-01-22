"use client";

import { useNews } from '@/hooks/useNews';
import { useState } from 'react';
import Link from 'next/link';
import {
    FileText, Eye, Grid, Search, Plus,
    Edit, Trash2, ExternalLink, Filter
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function AdminDashboard() {
    const { allNews, loading, deleteArticle } = useNews('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-white/40 animate-pulse">
            Memuat data dashboard...
        </div>
    );

    // Stats
    const totalArticles = allNews.length;
    const totalViews = allNews.reduce((sum, item) => sum + (item.views || 0), 0);
    const categoryCounts: Record<string, number> = {};
    allNews.forEach(news => {
        categoryCounts[news.category] = (categoryCounts[news.category] || 0) + 1;
    });
    const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    // Filters
    const filteredNews = allNews.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const widthStatus = item.status || 'published';
        const matchesStatus = filterStatus === 'all' ? true : widthStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <FadeIn>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Dashboard</h1>
                    <p className="text-white/40 text-sm">Ringkasan performa konten dan manajemen artikel.</p>
                </div>
                <Link href="/admin/create" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <Plus size={16} />
                    Buat Artikel
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-[2rem] bg-[#0a1214] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <FileText size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-4xl font-black text-white mb-1">{totalArticles}</h3>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Total Artikel</p>
                    </div>
                </div>

                <div className="p-6 rounded-[2rem] bg-[#0a1214] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <Eye size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                            <Eye size={24} />
                        </div>
                        <h3 className="text-4xl font-black text-white mb-1">{totalViews.toLocaleString()}</h3>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Total Pembaca</p>
                    </div>
                </div>

                <div className="p-6 rounded-[2rem] bg-[#0a1214] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <Grid size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                            <Grid size={24} />
                        </div>
                        <h3 className="text-4xl font-black text-white mb-1 capitalize truncate">{topCategory}</h3>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Kategori Populer</p>
                    </div>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-[#0a1214] border border-white/5 rounded-[2rem] overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">Semua Artikel</h3>
                        <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-mono text-white/40">{filteredNews.length}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Filter Tabs */}
                        <div className="flex bg-black/20 p-1 rounded-xl">
                            {['all', 'published', 'draft'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filterStatus === status
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/30 hover:text-white/60'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-black/20 border border-white/5 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all w-48"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30 bg-black/20">
                                <th className="p-6">Artikel</th>
                                <th className="p-6">Kategori</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredNews.length > 0 ? filteredNews.map(item => (
                                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-white mb-1 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                                            {item.title}
                                        </div>
                                        <div className="text-xs text-white/40 flex items-center gap-2">
                                            <span>{item.author}</span> • <span>{item.publishedAt}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-white/60">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${(item.status || 'published') === 'published'
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-amber-500/10 text-amber-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${(item.status || 'published') === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                                                }`}></span>
                                            {item.status || 'Published'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/article/${item.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-cyan-500/20 text-white/40 hover:text-cyan-400 transition-all" title="Lihat">
                                                <ExternalLink size={16} />
                                            </Link>
                                            <Link href={`/admin/edit/${item.slug}`} className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all" title="Edit">
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Hapus artikel "${item.title}"?`)) deleteArticle(item.id);
                                                }}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-white/30">
                                        Tidak ada artikel yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </FadeIn>
    );
}
