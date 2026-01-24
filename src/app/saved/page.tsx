"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';

interface SavedArticle {
    id: string;
    slug: string;
    title: string;
    image: string;
    category: string;
    publishedAt: string;
}

export default function SavedPage() {
    const { bookmarks, isInitialized, toggleBookmark } = useBookmarks();
    const { allNews } = useNews();

    const savedArticles = useMemo<SavedArticle[]>(() => {
        if (!isInitialized || allNews.length === 0) return [];
        return allNews.filter(item => bookmarks.includes(item.id));
    }, [bookmarks, isInitialized, allNews]);

    if (!isInitialized) return (
        <div className="min-h-screen pt-32 text-center text-white/30 uppercase font-bold tracking-widest text-xs">
            Memuat koleksi...
        </div>
    );

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <FadeIn>
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                        <div>
                            <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 block">Personal Collection</span>
                            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                                Berita Tersimpan
                            </h1>
                        </div>
                        <div className="text-white/40 text-sm font-medium">
                            Menyimpan <span className="text-white font-bold">{savedArticles.length}</span> artikel
                        </div>
                    </div>

                    {savedArticles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedArticles.map((item, index) => (
                                <FadeIn key={item.id} delay={index * 0.05}>
                                    <div className="group block h-full bg-[#0a1214] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/10 relative">
                                        <Link href={`/article/${item.slug}`} className="block relative aspect-[16/9] overflow-hidden">
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
                                        </Link>

                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
                                                <span>{item.publishedAt}</span>
                                            </div>
                                            <Link href={`/article/${item.slug}`}>
                                                <h2 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                    {item.title}
                                                </h2>
                                            </Link>

                                            <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                                                <Link href={`/article/${item.slug}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                                                    Baca <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                                <button
                                                    onClick={() => toggleBookmark(item.id)}
                                                    className="p-2 hover:bg-red-500/10 hover:text-red-400 text-white/20 rounded-full transition-colors"
                                                    title="Hapus dari simpanan"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-[#0a1214] border border-white/5 rounded-3xl">
                            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-6">
                                <Bookmark size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Belum ada koleksi</h3>
                            <p className="text-white/40 mb-8">Anda belum menyimpan artikel apapun. Mulai jelajahi sekarang.</p>
                            <Link
                                href="/"
                                className="inline-flex px-8 py-3 bg-white text-black hover:bg-cyan-400 hover:text-black rounded-full font-bold text-sm uppercase tracking-wider transition-all"
                            >
                                Jelajahi Berita
                            </Link>
                        </div>
                    )}
                </FadeIn>
            </div>
        </main>
    );
}
