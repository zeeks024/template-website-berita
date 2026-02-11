"use client";

import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Folder } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import { use } from 'react';

type Props = {
    params: Promise<{ slug: string }>;
};

const getCategoryTitle = (slug: string): string => {
    const decoded = decodeURIComponent(slug);
    const titles: Record<string, string> = {
        'opini': 'Opini',
        'cerita': 'Cerita',
        'sosok-inspiratif': 'Sosok Inspiratif',
        'sosok inspiratif': 'Sosok Inspiratif',
        'sosok': 'Sosok Inspiratif',
        'sudut-kota': 'Sudut Kota',
        'sudut kota': 'Sudut Kota',
        'potensi': 'Potensi',
    };
    return titles[decoded.toLowerCase()] || decoded.charAt(0).toUpperCase() + decoded.slice(1);
};

export default function CategoryPage({ params }: Props) {
    const { slug } = use(params);
    const { allNews, loading } = useNews();

    // Fallback loading state
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

    const decodedSlug = decodeURIComponent(slug).toLowerCase().replace(/-/g, ' ');
    const categoryNews = allNews.filter(
        item => {
            const cat = item.category.toLowerCase();
            // Handle variations of category names
            if (decodedSlug === 'sosok inspiratif' || decodedSlug === 'sosok') {
                return cat.includes('sosok');
            }
            if (decodedSlug === 'sudut kota') {
                return cat.includes('sudut');
            }
            return cat === decodedSlug;
        }
    );
    const categoryTitle = getCategoryTitle(decodedSlug);

    return (
        <main className="min-h-screen pt-32 px-6 lg:px-12 max-w-[1600px] mx-auto pb-20">
            {/* Header */}
            <FadeIn className="mb-16 text-center lg:text-left border-b border-border pb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 transition-colors">
                    <ArrowLeft size={12} /> Kembali ke Beranda
                </Link>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs mb-2 block">Kategori</span>
                        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-foreground">
                            {categoryTitle}
                        </h1>
                    </div>
                        <div className="text-right">
                            <span className="text-4xl lg:text-6xl font-black text-muted-foreground/20">{categoryNews.length.toString().padStart(2, '0')}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">Artikel Tersedia</span>
                        </div>
                </div>
            </FadeIn>

            {/* Grid */}
            {categoryNews.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryNews.map((article, index) => (
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
                                        {article.summary || article.excerpt || article.content?.replace(/<[^>]*>/g, '').substring(0, 200)}
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
                        <Folder size={40} />
                    </div>
                    <h3 className="text-2xl font-bold uppercase text-foreground mb-2">Belum ada artikel</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        Kategori ini sedang dalam tahap kurasi atau belum memiliki artikel yang diterbitkan.
                    </p>
                    <Link href="/" className="px-8 py-3 bg-foreground text-background rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-colors">
                        Kembali ke Beranda
                    </Link>
                </FadeIn>
            )}
        </main>
    );
}
