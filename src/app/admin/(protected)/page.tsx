"use client";

import { useNews } from '@/hooks/useNews';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    FileText, Eye, Grid, Search, Plus,
    Edit, Trash2, ExternalLink, PenTool,
    FolderOpen, Clock, Users,
    Globe, Archive, AlertCircle
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Pagination from '@/components/ui/Pagination';
import TimeAgo from '@/components/ui/TimeAgo';
import { useUser } from './UserContext';
import { Card, StatCard, Badge, QuickActions } from '@/components/admin/ui';
import { useAdminStats } from '@/hooks/useAdminStats';

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64 text-muted-foreground animate-pulse">Memuat data dashboard...</div>}>
            <AdminDashboardInner />
        </Suspense>
    );
}

function AdminDashboardInner() {
    const user = useUser();
    const isAdmin = user.role === 'ADMIN';
    const searchParams = useSearchParams();
    const initialStatus = searchParams.get('status') || 'all';
    const { stats, loading: statsLoading } = useAdminStats();
    const { allNews, loading, deleteArticle, pagination, setPage } = useNews('all', !isAdmin, { paginate: true, pageSize: 10 });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState(initialStatus);

    const adminActions = [
        { icon: <PenTool size={20} />, label: 'Tulis Artikel', href: '/admin/create', color: 'cyan' },
        { icon: <FolderOpen size={20} />, label: 'Kategori', href: '/admin/categories', color: 'purple' },
        { icon: <Users size={20} />, label: 'Kelola Users', href: '/admin/users', color: 'amber' },
        { icon: <ExternalLink size={20} />, label: 'Lihat Website', href: '/', color: 'emerald' },
    ];

    const writerActions = [
        { icon: <PenTool size={20} />, label: 'Tulis Artikel', href: '/admin/create', color: 'cyan' },
        { icon: <FileText size={20} />, label: 'Artikel Saya', href: '/admin', color: 'emerald' },
        { icon: <Clock size={20} />, label: 'Draft', href: '/admin?status=draft', color: 'amber' },
        { icon: <ExternalLink size={20} />, label: 'Lihat Website', href: '/', color: 'purple' },
    ];

    const filteredNews = allNews.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const widthStatus = item.status || 'published';
        const matchesStatus = filterStatus === 'all' ? true : widthStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'published': return <Globe size={14} />;
            case 'draft': return <FileText size={14} />;
            case 'archived': return <Archive size={14} />;
            default: return <AlertCircle size={14} />;
        }
    };

    return (
        <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">
                        Selamat Datang, <span className="text-cyan-600 dark:text-cyan-400">{user.name || 'User'}</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        {isAdmin
                            ? 'Pantau performa portal berita dan kelola konten hari ini.'
                            : `Kamu memiliki ${stats.draftCount} artikel draft yang perlu diselesaikan.`}
                    </p>
                </div>
                <Link href="/admin/create" className="group relative px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 w-full sm:w-auto justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Plus size={16} className="relative z-10" />
                    <span className="relative z-10">Buat Artikel</span>
                </Link>
            </div>

            <div className="mb-10">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 pl-1">Akses Cepat</h3>
                <QuickActions actions={isAdmin ? adminActions : writerActions} />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    icon={<FileText size={24} />}
                    iconColor="cyan"
                    value={stats.totalArticles}
                    label="Total Artikel"
                    loading={statsLoading}
                />
                <StatCard
                    icon={<Eye size={24} />}
                    iconColor="emerald"
                    value={stats.totalViews.toLocaleString()}
                    label="Total Pembaca"
                    loading={statsLoading}
                />
                <StatCard
                    icon={<Grid size={24} />}
                    iconColor="purple"
                    value={stats.topCategory}
                    label="Kategori Populer"
                    loading={statsLoading}
                />
            </div>

            <Card className="mb-10 overflow-hidden border-l-4 border-l-cyan-500">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-foreground uppercase tracking-widest text-sm flex items-center gap-2">
                        Aktivitas Terbaru
                    </h3>
                </div>
                <div className="space-y-2">
                    {statsLoading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl animate-pulse">
                                <div className="h-4 w-1/3 bg-muted rounded"></div>
                                <div className="h-3 w-20 bg-muted rounded"></div>
                            </div>
                        ))
                    ) : stats.recentArticles.length > 0 ? (
                        stats.recentArticles.map((article) => (
                            <div key={article.id} className="group flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/60 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-500/20 hover:shadow-lg hover:-translate-y-0.5">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`p-2 rounded-lg flex-shrink-0 ${(article.status || 'published') === 'published'
                                        ? 'bg-emerald-500/10 text-emerald-500'
                                        : 'bg-amber-500/10 text-amber-500'
                                        }`}>
                                        {getStatusIcon(article.status || 'published')}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-foreground font-bold text-sm truncate pr-4 group-hover:text-cyan-500 transition-colors">
                                            {article.title}
                                        </span>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                            <span className={article.status === 'published' ? 'text-emerald-500' : article.status === 'rejected' ? 'text-red-500' : 'text-amber-500'}>
                                                {{ published: 'Terbit', draft: 'Draft', pending_review: 'Review', rejected: 'Ditolak', archived: 'Arsip' }[article.status || 'published'] || article.status}
                                            </span>
                                            <span>•</span>
                                            <TimeAgo date={article.publishedAt} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-muted-foreground text-sm text-center py-8 bg-muted/30 rounded-xl border border-dashed border-border">
                            Belum ada aktivitas terbaru.
                        </div>
                    )}
                </div>
            </Card>

            <Card className="p-0 overflow-hidden border-t-4 border-t-cyan-500">
                <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/10">
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="font-bold text-foreground uppercase tracking-wider text-sm">
                                {isAdmin ? 'Semua Artikel' : 'Artikel Saya'}
                            </h3>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">
                                Manajemen Konten
                            </p>
                        </div>
                        <span className="ml-2 px-2.5 py-0.5 bg-muted rounded-full text-[10px] font-bold text-muted-foreground">
                            {pagination.total}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="flex bg-muted p-1 rounded-xl overflow-x-auto no-scrollbar">
                            {['all', 'published', 'draft', 'pending_review', 'rejected', 'archived'].map(status => {
                                const statusLabels: Record<string, string> = {
                                    all: 'Semua', published: 'Terbit', draft: 'Draft',
                                    pending_review: 'Review', rejected: 'Ditolak', archived: 'Arsip'
                                };
                                return (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filterStatus === status
                                            ? 'bg-white dark:bg-black/40 text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        {statusLabels[status] || status}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative group">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-cyan-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Cari artikel..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-48 pl-9 pr-4 py-2 bg-white dark:bg-black/20 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-muted/30">
                                <th className="p-6 w-1/2">Artikel</th>
                                <th className="p-6">Kategori</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        <td className="p-6"><div className="h-4 w-3/4 bg-muted rounded animate-pulse mb-2"></div><div className="h-3 w-1/2 bg-muted rounded animate-pulse"></div></td>
                                        <td className="p-6"><div className="h-4 w-20 bg-muted rounded animate-pulse"></div></td>
                                        <td className="p-6"><div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div></td>
                                        <td className="p-6"><div className="h-8 w-24 bg-muted rounded ml-auto animate-pulse"></div></td>
                                    </tr>
                                ))
                            ) : filteredNews.length > 0 ? filteredNews.map(item => (
                                <tr key={item.id} className="group hover:bg-muted/30 dark:hover:bg-white/[0.02] transition-colors duration-200">
                                    <td className="p-6">
                                        <div className="font-bold text-foreground mb-1.5 line-clamp-1 text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                                            {item.title}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-2">
                                            <span className="flex items-center gap-1">
                                                <Users size={10} />
                                                {item.author}
                                            </span>
                                            <span className="w-1 h-1 bg-border rounded-full" />
                                            <span className="flex items-center gap-1">
                                                <Clock size={10} />
                                                <TimeAgo date={item.publishedAt || new Date().toISOString()} />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <Badge variant={
                                            (item.status || 'published') === 'published' ? 'success' :
                                                item.status === 'pending_review' ? 'info' :
                                                    item.status === 'rejected' ? 'danger' : 'warning'
                                        } dot>
                                            {{
                                                published: 'Terbit', draft: 'Draft',
                                                pending_review: 'Review', rejected: 'Ditolak',
                                                archived: 'Arsip', scheduled: 'Terjadwal'
                                            }[item.status || 'published'] || item.status}
                                        </Badge>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/article/${item.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-cyan-500/10 text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 hover:scale-110" title="Lihat">
                                                <ExternalLink size={16} />
                                            </Link>
                                            <Link href={`/admin/edit/${item.slug}`} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110" title="Edit">
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Hapus artikel "${item.title}"?`)) deleteArticle(item.id);
                                                }}
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 hover:scale-110"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-4">
                                            <div className="p-4 bg-muted/30 rounded-full">
                                                <Search size={24} className="opacity-50" />
                                            </div>
                                            <p className="text-sm font-medium">Tidak ada artikel yang ditemukan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredNews.length > 0 && (
                    <div className="border-t border-border/50 p-4 bg-muted/10">
                        <Pagination
                            page={pagination.page}
                            totalPages={pagination.totalPages}
                            total={pagination.total}
                            limit={pagination.limit}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </Card>
        </FadeIn>
    );
}
