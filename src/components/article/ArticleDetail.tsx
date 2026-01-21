"use client";

import { useNews } from '@/hooks/useNews';
import Link from 'next/link';
import Image from 'next/image';
import CommentSection from '@/components/article/CommentSection';
import ShareButtons from '@/components/ui/ShareButtons';
import BookmarkButton from '@/components/ui/BookmarkButton';
import { useEffect, useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { Clock, Calendar, User, Tag } from 'lucide-react';

type Props = {
    slug: string;
};

export default function ArticleDetail({ slug }: Props) {
    const { allNews, loading } = useNews();
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        if (!loading) {
            const found = allNews.find(n => n.slug === slug);
            setArticle(found);
        }
    }, [allNews, loading, slug]);

    useEffect(() => {
        if (slug) {
            fetch('/api/views', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug }),
            }).catch(() => { });
        }
    }, [slug]);

    if (loading) return <div className="h-screen flex items-center justify-center text-white/50 animate-pulse">Memuat...</div>;

    if (!article) return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-black uppercase mb-4 text-white/20">404</h1>
            <p className="text-white/50 mb-8">Artikel tidak ditemukan.</p>
            <Link href="/" className="px-6 py-3 bg-white text-black rounded-full font-bold text-xs uppercase hover:bg-cyan-400 transition-colors">Kembali</Link>
        </div>
    );

    const articleUrl = `https://serayu.vercel.app/article/${slug}`;

    return (
        <article className="min-h-screen pb-20 bg-[#05090a]">
            {/* Hero Image */}
            <div className="h-[50vh] lg:h-[70vh] relative w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#05090a] via-[#05090a]/50 to-transparent z-10 pointer-events-none"></div>
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />

                <div className="absolute bottom-0 left-0 w-full z-20 px-6 lg:px-12 pb-12 max-w-[1600px] mx-auto">
                    <FadeIn>
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.1] mb-8 max-w-5xl text-white drop-shadow-2xl">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-6 max-w-2xl">
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-cyan-400" /> {article.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-cyan-400" /> {article.publishedAt}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-cyan-400" /> {article.readTime}
                            </div>
                            <div className="flex items-center gap-2 text-cyan-200">
                                <Tag size={14} className="text-cyan-400" /> {article.category}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 mt-12 relative z-20">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <FadeIn delay={200}>
                        <p className="text-xl lg:text-2xl font-serif italic text-white/80 leading-relaxed mb-12 pl-6 border-l-4 border-cyan-500">
                            "{article.summary}"
                        </p>

                        <div
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            className="prose prose-lg prose-invert max-w-none break-words overflow-hidden min-w-0
                                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white
                                prose-p:text-white/70 prose-p:leading-8 prose-p:font-light
                                prose-blockquote:border-l-cyan-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                                prose-strong:text-white prose-strong:font-bold
                                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10"
                        />

                        {/* Actions */}
                        <div className="flex items-center justify-between gap-4 mt-16 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Bagikan:</span>
                                <ShareButtons title={article.title} url={articleUrl} />
                            </div>
                            <BookmarkButton id={article.id} className="p-3 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-black transition-all text-white" />
                        </div>

                        {/* Comments */}
                        <div className="mt-16 bg-[#0a1214] border border-white/5 p-8 rounded-[2rem]">
                            <h3 className="text-xl font-black uppercase mb-8">Komentar</h3>
                            <CommentSection slug={article.slug} />
                        </div>
                    </FadeIn>
                </div>

                {/* Sidebar / Related */}
                <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
                    <div className="bg-[#0a1214] border border-white/5 p-8 rounded-[2rem]">
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500 block"></span> Baca Juga
                        </h3>
                        <div className="space-y-6">
                            {allNews
                                .filter(n => n.id !== article.id)
                                .slice(0, 3)
                                .map((item, i) => (
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
                                                <span className="text-[9px] font-black uppercase text-cyan-500 mb-1 block">{item.category}</span>
                                                <h4 className="font-bold text-sm leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">{item.title}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
