"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useState, useMemo } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import { Search as SearchIcon, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';

const CATEGORIES = ['Semua', 'Teknologi', 'Ekonomi', 'Nusantara', 'Daerah', 'Kesehatan', 'Opini', 'Cerita', 'Sosok Inspiratif', 'Sudut Kota', 'Potensi'];
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
            // Sort by publishedAt desc (assuming string comparison works for ISO dates, or modify logic if needed)
            results.sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
        } else if (sort === 'oldest') {
            results.sort((a, b) => (new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()));
        }
        // 'relevance' keeps the default order/filter finding order

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
        <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <FadeIn>
                    <div className="mb-12">
                        <span className="text-cyan-500 font-bold tracking-widest uppercase text-xs mb-3 block">Search Results</span>
                        {query ? (
                            <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-6">
                                Menampilkan: <span className="text-muted-foreground">&quot;{query}&quot;</span>
                            </h1>
                        ) : (
                            <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-6">
                                Cari Artikel
                            </h1>
                        )}

                        {/* Filters Bar */}
                        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Filter size={18} className="text-cyan-400" />
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Filter:</span>
                                <div className="relative flex-1 md:flex-none">
                                    <select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            updateFilters(e.target.value, sort);
                                        }}
                                        className="appearance-none bg-muted border border-border rounded-lg py-2 pl-4 pr-10 text-sm text-foreground focus:border-cyan-500 focus:outline-none w-full md:w-48 cursor-pointer hover:bg-muted/80 transition-colors"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat} className="bg-card text-foreground">{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-foreground">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <SlidersHorizontal size={18} className="text-emerald-400" />
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Urutkan:</span>
                                <div className="relative flex-1 md:flex-none">
                                    <select
                                        value={sort}
                                        onChange={(e) => {
                                            setSort(e.target.value);
                                            updateFilters(category, e.target.value);
                                        }}
                                        className="appearance-none bg-muted border border-border rounded-lg py-2 pl-4 pr-10 text-sm text-foreground focus:border-cyan-500 focus:outline-none w-full md:w-48 cursor-pointer hover:bg-muted/80 transition-colors"
                                    >
                                        {SORT_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value} className="bg-card text-foreground">{opt.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-auto text-sm text-muted-foreground font-medium">
                                Ditemukan <span className="text-foreground font-bold">{filteredNews.length}</span> artikel
                            </div>
                        </div>
                    </div>

                    {!query ? (
                        <div className="text-center py-24 bg-card border border-border rounded-3xl">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-8">
                                <SearchIcon size={48} className="text-cyan-400" />
                            </div>
                            <h3 className="text-3xl font-black text-foreground mb-4">Mulai Pencarian</h3>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                                Ketik kata kunci di kolom pencarian untuk menemukan artikel yang Anda cari.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider self-center mr-2">Populer:</span>
                                {['Dieng', 'UMKM', 'Wisata', 'Pertanian'].map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/search?q=${tag.toLowerCase()}`}
                                        className="px-4 py-2 bg-muted hover:bg-cyan-500/20 border border-border hover:border-cyan-500/50 rounded-full text-sm text-muted-foreground hover:text-cyan-400 transition-all"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : filteredNews.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredNews.map((item, index) => (
                                <FadeIn key={item.id} delay={index * 0.05}>
                                    <Link href={`/article/${item.slug}`} className="group block h-full bg-card border border-border rounded-3xl overflow-hidden hover:border-muted-foreground/30 transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20">
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60 z-10" />
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3 py-1 bg-background/10 backdrop-blur-md border border-border/50 rounded-full text-2xs font-bold uppercase tracking-wider text-foreground">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-2xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                                                <span>{item.publishedAt}</span>
                                                <span>•</span>
                                                <span className="text-cyan-400">{item.readTime || '3 min'} read</span>
                                            </div>
                                            <h2 className="text-xl font-bold text-foreground leading-tight mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                {item.title}
                                            </h2>
                                            <p className="text-sm text-muted-foreground line-clamp-3 mb-6 font-light">
                                                {item.summary}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                                Baca Selengkapnya <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-card border border-border rounded-3xl">
                            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-8">
                                <SearchIcon size={48} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-3xl font-black text-foreground mb-4">Tidak Ditemukan</h3>
                            <p className="text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed">
                                Tidak ada artikel yang cocok dengan <span className="text-foreground font-semibold">&quot;{query}&quot;</span>
                                {category !== 'Semua' && <span> dalam kategori <span className="text-cyan-400">{category}</span></span>}.
                            </p>
                            <p className="text-muted-foreground/60 text-sm mb-8">Coba kata kunci lain atau hapus filter kategori.</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {category !== 'Semua' && (
                                    <button
                                        onClick={() => {
                                            setCategory('Semua');
                                            updateFilters('Semua', sort);
                                        }}
                                        className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-full text-cyan-400 font-bold text-sm uppercase tracking-wider transition-all"
                                    >
                                        Hapus Filter Kategori
                                    </button>
                                )}
                                <Link
                                    href="/search"
                                    className="px-6 py-3 bg-muted hover:bg-muted/80 border border-border rounded-full text-foreground font-bold text-sm uppercase tracking-wider transition-all"
                                >
                                    Pencarian Baru
                                </Link>
                            </div>
                        </div>
                    )}
                </FadeIn>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <div className="h-3 w-24 bg-muted rounded animate-pulse mb-4" />
                        <div className="h-10 w-72 bg-muted rounded animate-pulse mb-6" />
                        <div className="bg-card border border-border rounded-2xl p-4 h-16 animate-pulse" />
                    </div>
                    <SkeletonGrid count={6} />
                </div>
            </div>
        }>
            <SearchResults />
        </Suspense>
    )
}
