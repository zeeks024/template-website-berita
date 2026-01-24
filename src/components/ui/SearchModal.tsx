"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Loader } from 'lucide-react';
import { useNews } from '@/hooks/useNews';
import Image from 'next/image';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: Props) {
    const [query, setQuery] = useState('');
    const { allNews, loading } = useNews();
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting query on modal close
            setQuery('');
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const filteredNews = query
        ? allNews.filter(n =>
            n.title.toLowerCase().includes(query.toLowerCase()) ||
            n.summary.toLowerCase().includes(query.toLowerCase()) ||
            n.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : [];

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-[#0a1214] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Search Header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-white/5">
                    <Search className="text-white/40" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Cari berita, opini, atau tokoh..."
                        className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/20"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="text-white/50" size={20} />
                    </button>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-white/30 gap-2">
                            <Loader className="animate-spin" size={16} /> Memuat data...
                        </div>
                    ) : query.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-white/30 text-sm">Ketik sesuatu untuk mulai mencari</p>
                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                {['Opini', 'Cerita', 'Sosok', 'Potensi'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setQuery(tag)}
                                        className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-xs text-white/50 hover:bg-white/10 hover:text-cyan-400 transition-all"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : filteredNews.length > 0 ? (
                        filteredNews.map(item => (
                            <Link
                                key={item.id}
                                href={`/article/${item.slug}`}
                                onClick={onClose}
                                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
                            >
                                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.category.toLowerCase().includes('opini') ? 'text-purple-400' : 'text-cyan-400'
                                            }`}>
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] text-white/30">• {item.publishedAt}</span>
                                    </div>
                                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 truncate">{item.title}</h4>
                                </div>
                                <ArrowRight className="text-white/20 group-hover:-rotate-45 transition-transform" size={16} />
                            </Link>
                        ))
                    ) : (
                        <div className="py-12 text-center text-white/30">
                            Tidak ada hasil untuk &quot;{query}&quot;
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] text-white/30 font-mono uppercase tracking-widest">
                    <span>ESC untuk tutup</span>
                    <span>{allNews.length} Artikel Terindeks</span>
                </div>
            </div>
        </div>
    );
}
