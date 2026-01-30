"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark } from 'lucide-react';

export default function BookmarkButton({ id, className = "" }: { id: string, className?: string }) {
    const { isBookmarked, toggleBookmark, isInitialized } = useBookmarks();
    const active = isBookmarked(id);

    if (!isInitialized) return (
        <button className={`px-6 py-2 rounded-full border border-border bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest ${className}`} disabled aria-label="Memuat bookmark">
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
                ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted border-border text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground'
                } ${className}`}
        >
            <Bookmark size={14} className={active ? 'fill-current' : ''} />
            {active ? 'Tersimpan' : 'Simpan'}
        </button>
    );
}
