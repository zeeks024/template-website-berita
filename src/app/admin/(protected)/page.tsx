"use client";

import { useNews } from '@/hooks/useNews';
import { useState } from 'react';
import Link from 'next/link';
import {
    FileText, Eye, Grid, Search, Plus,
    Edit, Trash2, ExternalLink, PenTool, 
    FolderOpen, BarChart3, Clock, Activity, Users
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Pagination from '@/components/ui/Pagination';
import { useUser } from './UserContext';
import { Card, StatCard, Badge, QuickActions } from '@/components/admin/ui';

export default function AdminDashboard() {
    const user = useUser();
    const isAdmin = user.role === 'ADMIN';
    const { allNews, loading, deleteArticle, pagination, setPage } = useNews('all', !isAdmin, { paginate: true, pageSize: 10 });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-muted-foreground animate-pulse">
            Memuat data dashboard...
        </div>
    );

    const totalArticles = allNews.length;
    const totalViews = allNews.reduce((sum, item) => sum + (item.views || 0), 0);
    const draftCount = allNews.filter(n => n.status === 'draft').length;
    
    const categoryCounts: Record<string, number> = {};
    allNews.forEach(news => {
        categoryCounts[news.category] = (categoryCounts[news.category] || 0) + 1;
    });
    const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    const adminActions = [
        { icon: <PenTool size={24} />, label: 'Tulis Artikel', href: '/admin/create', color: 'cyan' },
        { icon: <FolderOpen size={24} />, label: 'Kategori', href: '/admin/categories', color: 'purple' },
        { icon: <Users size={24} />, label: 'Kelola Users', href: '/admin/users', color: 'amber' },
        { icon: <ExternalLink size={24} />, label: 'Lihat Website', href: '/', color: 'emerald' },
    ];

    const writerActions = [
        { icon: <PenTool size={24} />, label: 'Tulis Artikel', href: '/admin/create', color: 'cyan' },
        { icon: <FileText size={24} />, label: 'Artikel Saya', href: '/admin', color: 'emerald' },
        { icon: <Clock size={24} />, label: 'Draft', href: '/admin?status=draft', color: 'amber' },
        { icon: <ExternalLink size={24} />, label: 'Lihat Website', href: '/', color: 'purple' },
    ];

    const filteredNews = allNews.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const widthStatus = item.status || 'published';
        const matchesStatus = filterStatus === 'all' ? true : widthStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-foreground mb-2">
                        Selamat Datang, {user.name || 'User'}!
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {isAdmin 
                            ? 'Kelola portal berita dan pantau performa konten.' 
                            : `Kamu memiliki ${draftCount} artikel draft yang perlu diselesaikan.`}
                    </p>
                </div>
                <Link href="/admin/create" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 w-full sm:w-auto justify-center">
                    <Plus size={16} />
                    Buat Artikel
                </Link>
            </div>

            <div className="mb-8">
                <QuickActions actions={isAdmin ? adminActions : writerActions} />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    icon={<FileText size={24} />}
                    iconColor="cyan"
                    value={totalArticles}
                    label="Total Artikel"
                    trend={{ value: 12, isUp: true }}
                />
                <StatCard 
                    icon={<Eye size={24} />}
                    iconColor="emerald"
                    value={totalViews.toLocaleString()}
                    label="Total Pembaca"
                    trend={{ value: 5, isUp: true }}
                />
                <StatCard 
                    icon={<Grid size={24} />}
                    iconColor="purple"
                    value={topCategory}
                    label="Kategori Populer"
                />
            </div>

            <Card className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-foreground uppercase tracking-wider text-sm flex items-center gap-2">
                        <Activity size={16} className="text-cyan-400" />
                        Aktivitas Terbaru
                    </h3>
                </div>
                <div className="space-y-1">
                    {allNews.slice(0, 5).map(article => (
                        <div key={article.id} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted px-3 -mx-3 rounded-lg transition-all duration-200 hover:translate-x-1">
                            <div className="flex items-center gap-4">
                                <Badge variant={(article.status || 'published') === 'published' ? 'success' : 'warning'} dot>
                                    {article.status || 'Published'}
                                </Badge>
                                <span className="text-foreground font-medium text-sm truncate max-w-xs md:max-w-md">{article.title}</span>
                            </div>
                            <span className="text-muted-foreground text-xs font-mono">{article.publishedAt}</span>
                        </div>
                    ))}
                    {allNews.length === 0 && (
                        <div className="text-muted-foreground text-sm text-center py-4">Belum ada aktivitas.</div>
                    )}
                </div>
            </Card>

            <Card className="p-0 overflow-hidden">
                <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <FileText size={16} className="text-cyan-400" />
                        <h3 className="font-bold text-foreground uppercase tracking-wider text-sm">
                            {isAdmin ? 'Semua Artikel' : 'Artikel Saya'}
                        </h3>
                        <span className="px-2 py-1 bg-muted rounded-md text-xs font-mono text-muted-foreground">
                            {filteredNews.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-muted p-1 rounded-xl">
                            {['all', 'published', 'draft', 'archived'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filterStatus === status
                                        ? 'bg-background text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all w-48"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border text-2xs font-black uppercase tracking-widest text-muted-foreground bg-muted">
                                <th className="p-6">Artikel</th>
                                <th className="p-6">Kategori</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredNews.length > 0 ? filteredNews.map(item => (
                                <tr key={item.id} className="group hover:bg-muted/50 transition-all duration-200">
                                    <td className="p-6">
                                        <div className="font-bold text-foreground mb-1 line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                                            {item.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                                            <span>{item.author}</span> • <span>{item.publishedAt}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-1.5 py-0.5 rounded bg-muted border border-border text-3xs font-semibold capitalize tracking-wide text-muted-foreground">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <Badge variant={(item.status || 'published') === 'published' ? 'success' : 'warning'} dot>
                                            {item.status || 'Published'}
                                        </Badge>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/article/${item.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-cyan-500/20 text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 hover:scale-110" title="Lihat">
                                                <ExternalLink size={16} />
                                            </Link>
                                            <Link href={`/admin/edit/${item.slug}`} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110" title="Edit">
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Hapus artikel "${item.title}"?`)) deleteArticle(item.id);
                                                }}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 hover:scale-110"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-muted-foreground">
                                        Tidak ada artikel yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    total={pagination.total}
                    limit={pagination.limit}
                    onPageChange={setPage}
                />
            </Card>
        </FadeIn>
    );
}
