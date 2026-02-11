"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import { use, useEffect, useState } from 'react';

type Props = {
    params: Promise<{ tag: string }>;
};

interface Article {
    id: string;
    slug: string;
    title: string;
    summary: string;
    excerpt?: string;
    image: string;
    category: string;
    author: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
}

export default function TagPage({ params }: Props) {
    const { tag } = use(params);
    const decodedTag = decodeURIComponent(tag);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`/api/articles/by-tag/${encodeURIComponent(decodedTag)}`);
                const data = await res.json();
                setArticles(data.articles || []);
            } catch (error) {
                console.error('Failed to fetch articles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, [decodedTag]);

    if (loading) {
        return (
            <main className="min-h-screen pt-32 px-6 lg:px-12 max-w-[1600px] mx-auto pb-20">
                <div className="mb-16 border-b border-border pb-12">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse mb-6" />
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <div className="h-3 w-20 bg-muted rounded animate-pulse mb-4" />
                            <div className="h-12 w-64 bg-muted rounded animate-pulse" />
                        </div>
                        <div className="text-right">
                            <div className="h-10 w-16 bg-muted rounded animate-pulse ml-auto" />
                        </div>
                    </div>
                </div>
                <SkeletonGrid count={6} />
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 px-6 lg:px-12 max-w-[1600px] mx-auto pb-20">
            <FadeIn className="mb-16 text-center lg:text-left border-b border-border pb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 transition-colors">
                    <ArrowLeft size={12} /> Kembali ke Beranda
                </Link>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs mb-2 block">Tag</span>
                        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-foreground">
                            #{decodedTag}
                        </h1>
                    </div>
                    <div className="text-right">
                        <span className="text-4xl lg:text-6xl font-black text-muted-foreground/20">{articles.length.toString().padStart(2, '0')}</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">Artikel Tersedia</span>
                    </div>
                </div>
            </FadeIn>

            {articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <FadeIn key={article.id} delay={index * 100}>
                            <Link href={`/article/${article.slug}`} className="group block bg-card border border-border rounded-[2rem] overflow-hidden hover:bg-muted transition-all hover:-translate-y-2 h-full flex flex-col">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur rounded-full border border-border">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{article.category}</span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold uppercase leading-tight mb-4 group-hover:text-cyan-400 transition-colors line-clamp-3">
                                        {article.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-serif line-clamp-3 flex-1">
                                        {article.summary || article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                                        <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                                            <User size={12} />
                                            {article.author}
                                        </div>
                                        <div className="flex items-center gap-2 text-cyan-500/50 text-[10px] font-mono">
                                            <Clock size={12} />
                                            {article.readTime}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            ) : (
                <FadeIn className="min-h-[40vh] flex flex-col items-center justify-center text-center p-12 border border-border rounded-[3rem] bg-card">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground">
                        <Tag size={40} />
                    </div>
                    <h3 className="text-2xl font-bold uppercase text-foreground mb-2">Belum ada artikel</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        Tidak ada artikel dengan tag &quot;{decodedTag}&quot; yang ditemukan.
                    </p>
                    <Link href="/" className="px-8 py-3 bg-foreground text-background rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-colors">
                        Kembali ke Beranda
                    </Link>
                </FadeIn>
            )}
        </main>
    );
}
