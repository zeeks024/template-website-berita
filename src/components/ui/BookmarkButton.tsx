"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark } from 'lucide-react';

export default function BookmarkButton({ id, className = "" }: { id: string, className?: string }) {
    const { isBookmarked, toggleBookmark, isInitialized } = useBookmarks();
    const active = isBookmarked(id);

    if (!isInitialized) return (
        <button className={`px-6 py-2 rounded-full border border-border bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest ${className}`} disabled>
            <Bookmark size={14} />
        </button>
    );

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                toggleBookmark(id);
            }}
            className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${active
                ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-muted border-border text-foreground hover:bg-cyan-500 hover:border-cyan-500 hover:text-white'
                } ${className}`}
        >
            <Bookmark size={14} className={active ? 'fill-current' : ''} />
            {active ? 'Tersimpan' : 'Simpan'}
        </button>
    );
}
