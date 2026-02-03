"use client";

import { X, Clock, Calendar, User, Tag, Eye as EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { calculateReadTime, formatDateWIB } from '@/lib/dateUtils';
import Portal from '@/components/ui/Portal';

interface ArticlePreviewData {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    tags: string;
    images: string[];
    imageCaption?: string;
    imageCredit?: string;
}

interface ArticlePreviewModalProps {
    data: ArticlePreviewData;
    onClose: () => void;
}

export default function ArticlePreviewModal({ data, onClose }: ArticlePreviewModalProps) {
    const readTime = calculateReadTime(data.content);
    const tagsArray = data.tags.split(',').map(t => t.trim()).filter(Boolean);
    const heroImage = data.images[0] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80';

    return (
        <Portal>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-3xl overflow-hidden shadow-2xl border border-border">
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card border-b border-border">
                    <div className="flex items-center gap-3">
                        <EyeIcon size={20} className="text-cyan-500" />
                        <span className="font-bold text-foreground text-sm uppercase tracking-wider">Preview Artikel</span>
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-lg">
                            Belum Dipublikasi
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                        aria-label="Tutup preview"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-60px)]">
                    <div className="relative h-64 md:h-80 w-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                        <Image
                            src={heroImage}
                            alt={data.title || 'Preview'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 896px) 100vw, 896px"
                        />
                        
                        <div className="absolute bottom-0 left-0 w-full z-20 p-6">
                            <span className="inline-block px-3 py-1 bg-cyan-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                {data.category || 'Kategori'}
                            </span>
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {data.title || 'Judul Artikel'}
                            </h1>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-cyan-500" />
                                <span>{data.author || 'Penulis'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-cyan-500" />
                                <span>{formatDateWIB(new Date())}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-cyan-500" />
                                <span>{readTime}</span>
                            </div>
                        </div>

                        {data.excerpt && (
                            <p className="text-lg text-muted-foreground italic mb-6 pb-6 border-b border-border">
                                {data.excerpt}
                            </p>
                        )}

                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                                prose-p:leading-relaxed
                                prose-a:text-cyan-500 prose-a:no-underline hover:prose-a:underline
                                prose-strong:font-bold
                                prose-img:rounded-2xl prose-img:shadow-xl"
                            dangerouslySetInnerHTML={{ 
                                __html: data.content || '<p class="text-muted-foreground">Belum ada konten...</p>' 
                            }}
                        />

                        {tagsArray.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-border">
                                <div className="flex items-center gap-2 mb-3">
                                    <Tag size={16} className="text-cyan-500" />
                                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tagsArray.map((tag, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-full border border-border"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.imageCaption && (
                            <div className="mt-6 text-sm text-muted-foreground">
                                <span className="font-medium">Caption:</span> {data.imageCaption}
                                {data.imageCredit && <span className="ml-2">• Foto: {data.imageCredit}</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </Portal>
    );
}
