"use client";

import { useBookmarks } from '@/hooks/useBookmarks';

export default function BookmarkButton({ id, className = "btn-secondary" }: { id: string, className?: string }) {
    const { isBookmarked, toggleBookmark, isInitialized } = useBookmarks();
    const active = isBookmarked(id);

    if (!isInitialized) return <button className={className} disabled>Loading...</button>;

    return (
        <button
            onClick={(e) => {
                e.preventDefault(); // Prevent navigating if inside a Link
                toggleBookmark(id);
            }}
            className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${active
                ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                : 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-white'
                } ${className}`}
        >
            {active ? 'Tersimpan' : 'Simpan'}
        </button>
    );
}
