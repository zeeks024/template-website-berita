"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useNews } from '@/hooks/useNews';
import { Eye, ArrowUpRight } from 'lucide-react';

const categories = [
    { name: 'Opini', icon: '💭', description: 'Pendapat & Gagasan' },
    { name: 'Cerita', icon: '📖', description: 'Kisah Warga' },
    { name: 'Sosok Inspiratif', icon: '⭐', description: 'Tokoh Hebat' },
    { name: 'Sudut Kota', icon: '📍', description: 'Jelajah Tempat' },
    { name: 'Potensi', icon: '🌱', description: 'Peluang Daerah' },
];

const getCategoryClass = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('opini')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    if (cat.includes('cerita')) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
    if (cat.includes('sosok')) return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    if (cat.includes('sudut')) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
    if (cat.includes('potensi')) return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
};

const getCategorySlug = (name: string) => {
    return name.toLowerCase();
};

export default function MainNewsGrid() {
    const { allNews, loading } = useNews();

    if (loading) {
        return (
            <div className="container py-32 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
                    <div className="text-muted-foreground animate-pulse">Memuat cerita...</div>
                </div>
            </div>
        );
    }

    return (
        <section className="pb-24">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/category/${getCategorySlug(cat.name)}`}
                            className="group relative bg-card hover:bg-card/80 border border-border/50 hover:border-cyan-500/50 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/5 dark:hover:shadow-cyan-900/20 flex flex-col items-center text-center overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{cat.icon}</div>
                            <div className="font-serif font-bold text-foreground text-lg mb-1">{cat.name}</div>
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{cat.description}</div>
                        </Link>
                    ))}
                </div>

                {categories.map((cat) => {
                    const categoryArticles = allNews.filter(
                        n => n.category.toLowerCase() === cat.name.toLowerCase()
                    );

                    if (categoryArticles.length === 0) return null;

                    return (
                        <div key={cat.name} className="mb-24 last:mb-0">
                            <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl hidden md:block">{cat.icon}</span>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{cat.name}</h2>
                                        <p className="text-muted-foreground mt-1">{cat.description}</p>
                                    </div>
                                </div>
                                <Link 
                                    href={`/category/${getCategorySlug(cat.name)}`} 
                                    className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-cyan-500 transition-colors"
                                >
                                    Lihat semua
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                                {categoryArticles.slice(0, 2).map((article) => (
                                    <Link
                                        href={`/article/${article.slug}`}
                                        key={article.id}
                                        className="group block h-full"
                                    >
                                        <article className="h-full flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/10 dark:hover:shadow-black/50 transition-all duration-500 hover:-translate-y-1">
                                            <div className="relative h-64 md:h-72 overflow-hidden">
                                                <Image
                                                    src={article.image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute top-4 left-4">
                                                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryClass(article.category)} backdrop-blur-sm shadow-sm`}>
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 p-6 md:p-8 flex flex-col">
                                                <h3 className="text-2xl font-serif font-bold mb-3 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                                                    {article.summary}
                                                </p>
                                                
                                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-xs font-bold text-cyan-700 dark:text-cyan-300">
                                                            {article.author.charAt(0)}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-foreground">{article.author}</span>
                                                            <span className="text-2xs text-muted-foreground uppercase tracking-wider">{article.readTime} baca</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                                        <Eye size={14} />
                                                        <span>{article.views || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
