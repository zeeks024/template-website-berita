"use client";

import Link from 'next/link';
import Image from 'next/image';
import CommentSection from '@/components/article/CommentSection';
import ShareButtons from '@/components/ui/ShareButtons';
import BookmarkButton from '@/components/ui/BookmarkButton';
import { useState, useEffect } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { Clock, Calendar, User, Tag, Eye, ChevronRight, Home, Maximize2 } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';
import { NewsItem } from '@/types/news';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';
import { GalleryThumbnails } from '@/components/gallery/GalleryThumbnails';
import { AnimatePresence } from 'framer-motion';

type Props = {
    article: NewsItem;
    relatedArticles: NewsItem[];
};

export default function ArticleDetail({ article, relatedArticles }: Props) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const galleryImages = article.gallery || [];
    const allImages = [article.image, ...galleryImages].filter(Boolean);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    useEffect(() => {
        if (article.slug) {
            fetch('/api/views', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: article.slug }),
            }).catch(() => { });
        }
    }, [article.slug]);

    const articleUrl = `https://websiteberitademo.vercel.app/article/${article.slug}`;

    return (
        <article className="min-h-screen pb-20 bg-background">
            {/* Hero Image */}
            <div className="h-[50vh] lg:h-[70vh] relative w-full overflow-hidden group cursor-pointer" onClick={() => openLightbox(0)}>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10 pointer-events-none"></div>
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm p-4 rounded-full text-white border border-white/20">
                        <Maximize2 size={32} />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20 px-6 lg:px-12 pb-12 max-w-[1600px] mx-auto pointer-events-none">
                    <FadeIn>
                        <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10 shadow-xl shadow-black/30 pointer-events-auto">
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" className="mb-6">
                                <ol className="flex items-center gap-2 text-xs font-medium">
                                    <li>
                                        <Link href="/" className="flex items-center gap-1 text-white/60 hover:text-cyan-400 transition-colors">
                                            <Home size={14} />
                                            <span className="sr-only">Beranda</span>
                                        </Link>
                                    </li>
                                    <li className="text-white/40">
                                        <ChevronRight size={14} />
                                    </li>
                                    <li>
                                        <Link 
                                            href={`/category/${article.category.toLowerCase().replace(' ', '-')}`} 
                                            className="text-white/60 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                                        >
                                            {article.category}
                                        </Link>
                                    </li>
                                    <li className="text-white/40">
                                        <ChevronRight size={14} />
                                    </li>
                                    <li className="text-cyan-400 font-bold uppercase tracking-wider truncate max-w-[200px]">
                                        Artikel
                                    </li>
                                </ol>
                            </nav>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] mb-6 max-w-5xl text-white">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-white/60 text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6 max-w-2xl">
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-cyan-400" /> {article.author}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-cyan-400" /> {article.createdAt ? formatTimeAgo(article.createdAt) : article.publishedAt}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-cyan-400" /> {article.readTime}
                                </div>
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Tag size={14} /> {article.category}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye size={14} className="text-cyan-400" /> {article.views || 0}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 mt-12 relative z-20">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <FadeIn delay={200}>
                        <p className="text-xl lg:text-2xl font-serif italic text-foreground/80 leading-relaxed mb-12 pl-6 border-l-4 border-cyan-500">
                            &quot;{article.summary}&quot;
                        </p>

                        <div
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            className="prose prose-lg dark:prose-invert max-w-none break-words overflow-hidden min-w-0
                                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-foreground
                                prose-p:text-foreground/80 prose-p:leading-8 prose-p:font-light
                                prose-blockquote:border-l-cyan-500 prose-blockquote:bg-muted prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                                prose-strong:text-foreground prose-strong:font-bold
                                prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-[2rem] prose-img:border prose-img:border-border"
                        />

                        {galleryImages.length > 0 && (
                            <GalleryThumbnails 
                                images={galleryImages} 
                                onImageClick={(index) => openLightbox(index + 1)} 
                            />
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between gap-4 mt-16 pt-8 border-t border-border">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bagikan:</span>
                                <ShareButtons title={article.title} url={articleUrl} />
                            </div>
                            <BookmarkButton id={article.id} className="p-3 rounded-full bg-muted hover:bg-cyan-500 hover:text-white transition-all text-foreground" />
                        </div>

                        {/* Comments */}
                        <div className="mt-16 bg-card border border-border p-8 rounded-[2rem]">
                            <h3 className="text-xl font-black uppercase mb-8 text-foreground">Komentar</h3>
                            <CommentSection slug={article.slug} />
                        </div>
                    </FadeIn>
                </div>

                {/* Sidebar / Related */}
                <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
                    <div className="bg-card border border-border p-8 rounded-[2rem]">
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-foreground">
                            <span className="w-1 h-6 bg-cyan-500 block"></span> Baca Juga
                        </h3>
                        <div className="space-y-6">
                            {relatedArticles.map((item) => (
                                <Link key={item.id} href={`/article/${item.slug}`} className="group block">
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-3xs font-black uppercase text-cyan-600 dark:text-cyan-400 mb-1 block">{item.category}</span>
                                            <h4 className="font-bold text-sm leading-tight text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">{item.title}</h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isLightboxOpen && (
                    <GalleryLightbox
                        images={allImages}
                        initialIndex={lightboxIndex}
                        onClose={() => setIsLightboxOpen(false)}
                    />
                )}
            </AnimatePresence>
        </article>
    );
}
