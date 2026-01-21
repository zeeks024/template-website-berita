"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useState, useMemo } from 'react';
import FadeIn from '@/components/ui/FadeIn';
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
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
                            Menampilkan: <span className="text-white/60">"{query}"</span>
                        </h1>

                        {/* Filters Bar */}
                        <div className="bg-[#0a1214] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Filter size={18} className="text-cyan-400" />
                                <span className="text-sm font-bold text-white/40 uppercase tracking-wider">Filter:</span>
                                <div className="relative flex-1 md:flex-none">
                                    <select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            updateFilters(e.target.value, sort);
                                        }}
                                        className="appearance-none bg-black/20 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:border-cyan-500 focus:outline-none w-full md:w-48 cursor-pointer hover:bg-white/5 transition-colors"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat} className="bg-[#0a1214] text-white">{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 group-hover:text-white">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <SlidersHorizontal size={18} className="text-emerald-400" />
                                <span className="text-sm font-bold text-white/40 uppercase tracking-wider">Urutkan:</span>
                                <div className="relative flex-1 md:flex-none">
                                    <select
                                        value={sort}
                                        onChange={(e) => {
                                            setSort(e.target.value);
                                            updateFilters(category, e.target.value);
                                        }}
                                        className="appearance-none bg-black/20 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:border-cyan-500 focus:outline-none w-full md:w-48 cursor-pointer hover:bg-white/5 transition-colors"
                                    >
                                        {SORT_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value} className="bg-[#0a1214] text-white">{opt.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-auto text-sm text-white/40 font-medium">
                                Ditemukan <span className="text-white font-bold">{filteredNews.length}</span> artikel
                            </div>
                        </div>
                    </div>

                    {filteredNews.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredNews.map((item, index) => (
                                <FadeIn key={item.id} delay={index * 0.05}>
                                    <Link href={`/article/${item.slug}`} className="group block h-full bg-[#0a1214] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20">
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1214] to-transparent opacity-60 z-10" />
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
                                                <span>{item.publishedAt}</span>
                                                <span>•</span>
                                                <span className="text-cyan-400">{item.readTime || '3 min'} read</span>
                                            </div>
                                            <h2 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                {item.title}
                                            </h2>
                                            <p className="text-sm text-white/60 line-clamp-3 mb-6 font-light">
                                                {item.summary}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                                                Baca Selengkapnya <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-[#0a1214] border border-white/5 rounded-3xl">
                            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-6">
                                <SearchIcon size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Tidak ditemukan</h3>
                            <p className="text-white/40 mb-8">Maaf, kami tidak menemukan artikel yang sesuai dengan kriteria anda.</p>
                            <button
                                onClick={() => {
                                    setCategory('Semua');
                                    setSort('relevance');
                                    updateFilters('Semua', 'relevance');
                                }}
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold text-sm uppercase tracking-wider transition-all"
                            >
                                Reset Filter
                            </button>
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
            <div className="min-h-screen pt-32 flex justify-center text-white/30 font-bold uppercase tracking-widest text-xs">
                Memuat pencarian...
            </div>
        }>
            <SearchResults />
        </Suspense>
    )
}
