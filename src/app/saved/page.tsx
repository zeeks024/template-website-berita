"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { Bookmark, ArrowRight, Trash2, Home, ChevronRight } from 'lucide-react';

interface SavedArticle {
    id: string;
    slug: string;
    title: string;
    image: string;
    category: string;
    publishedAt?: string;
}

export default function SavedPage() {
    const { bookmarks, isInitialized, toggleBookmark } = useBookmarks();
    const { allNews } = useNews();

    const savedArticles = useMemo<SavedArticle[]>(() => {
        if (!isInitialized || allNews.length === 0) return [];
        return allNews.filter(item => bookmarks.includes(item.id));
    }, [bookmarks, isInitialized, allNews]);

    if (!isInitialized) return (
        <div className="min-h-screen pt-32 text-center text-muted-foreground uppercase font-bold tracking-widest text-xs">
            Memuat koleksi...
        </div>
    );

    return (
        <main className="min-h-screen pt-24 pb-20">
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20 -z-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn>
                        <nav className="flex items-center gap-2 text-sm mb-8">
                            <Link href="/" className="text-muted-foreground hover:text-cyan-600 transition-colors flex items-center gap-1">
                                <Home size={14} />
                                Beranda
                            </Link>
                            <ChevronRight size={14} className="text-muted-foreground" />
                            <span className="text-cyan-600 font-medium">Tersimpan</span>
                        </nav>

                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Personal Collection
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground">
                                    Berita <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Tersimpan</span>
                                </h1>
                            </div>
                            <div className="text-muted-foreground text-sm font-medium">
                                Menyimpan <span className="text-foreground font-bold">{savedArticles.length}</span> artikel
                            </div>
                        </div>
                    </FadeIn>

                    {savedArticles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedArticles.map((item, index) => (
                                <FadeIn key={item.id} delay={index * 50}>
                                    <div className="group block h-full bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                                        <Link href={`/article/${item.slug}`} className="block relative aspect-[16/9] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3 py-1 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-foreground dark:text-white">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                                                <span>{item.publishedAt}</span>
                                            </div>
                                            <Link href={`/article/${item.slug}`}>
                                                <h2 className="text-xl font-bold text-foreground leading-tight mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                    {item.title}
                                                </h2>
                                            </Link>

                                            <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
                                                <Link href={`/article/${item.slug}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                                    Baca <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                                <button
                                                    onClick={() => toggleBookmark(item.id)}
                                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 text-muted-foreground rounded-full transition-colors"
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
                        <FadeIn>
                            <div className="text-center py-24 bg-card border border-border rounded-3xl">
                                <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-6">
                                    <Bookmark size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Belum ada koleksi</h3>
                                <p className="text-muted-foreground mb-8">Anda belum menyimpan artikel apapun. Mulai jelajahi sekarang.</p>
                                <Link
                                    href="/"
                                    className="inline-flex px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-emerald-500/25"
                                >
                                    Jelajahi Berita
                                </Link>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>
        </main>
    );
}
