"use client";

import Link from 'next/link';
import Image from 'next/image';
import { NewsItem } from '@/types/news';
import { ArrowRight, Star } from 'lucide-react';

interface HeroSectionProps {
    articles: NewsItem[];
}

export default function HeroSection({ articles }: HeroSectionProps) {
    // Get all featured articles (max 4), fallback to first article if none
    const featuredArticles = articles.filter(n => n.featured).slice(0, 4);
    const mainFeatured = featuredArticles[0] || articles[0];
    const otherFeatured = featuredArticles.slice(1);

    const getCategoryClass = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes('opini')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
        if (cat.includes('cerita')) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
        if (cat.includes('sosok')) return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
        if (cat.includes('sudut')) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
        if (cat.includes('potensi')) return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    };

    return (
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    <div className="w-full lg:w-5/12 text-center lg:text-left space-y-8 z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span>🌊</span>
                            <span className="tracking-wide">Media Komunitas Banjarnegara</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            Cerita dari <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400">Serayu.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 text-balance">
                            Mengangkat opini, cerita inspiratif, dan potensi tersembunyi dari setiap sudut Banjarnegara dengan perspektif baru.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                             <Link 
                                href="/about"
                                className="px-8 py-4 rounded-full bg-foreground text-background font-medium hover:bg-cyan-600 hover:text-white transition-colors duration-300"
                            >
                                Tentang Kami
                            </Link>
                             <Link 
                                href="/category/cerita"
                                className="px-8 py-4 rounded-full border border-border bg-background hover:bg-muted transition-colors duration-300 font-medium flex items-center gap-2 group"
                            >
                                Baca Cerita <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {mainFeatured && (
                        <div className="w-full lg:w-7/12 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <Link href={`/article/${mainFeatured.slug}`} className="group block relative">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/5 dark:shadow-black/50 border border-white/20 dark:border-white/10 aspect-[4/3] lg:aspect-[16/9]">
                                    <Image
                                        src={mainFeatured.image}
                                        alt={mainFeatured.title}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryClass(mainFeatured.category)} bg-white/10 text-white backdrop-blur-md border border-white/20`}>
                                                {mainFeatured.category}
                                            </span>
                                            <span className="text-xs font-medium text-white/80 flex items-center gap-1">
                                                <Star size={12} className="text-amber-400 fill-amber-400" /> Pilihan Editor
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight group-hover:text-cyan-200 transition-colors">
                                            {mainFeatured.title}
                                        </h2>
                                        <div className="flex items-center gap-4 text-sm text-white/80">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-2xs font-bold">
                                                    {mainFeatured.author.charAt(0)}
                                                </div>
                                                <span>{mainFeatured.author}</span>
                                            </div>
                                            <span>•</span>
                                            <span>{mainFeatured.readTime} baca</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {otherFeatured.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                                    {otherFeatured.map((article) => (
                                        <Link 
                                            key={article.id} 
                                            href={`/article/${article.slug}`}
                                            className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 dark:border-white/5"
                                        >
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 33vw, 20vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                            <div className="absolute top-2 left-2">
                                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <h3 className="text-xs font-medium text-white line-clamp-2 group-hover:text-cyan-200 transition-colors">
                                                    {article.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
