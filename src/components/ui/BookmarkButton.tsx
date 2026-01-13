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
            className={className}
            style={active ? { background: 'var(--accent-orange)', color: 'white', borderColor: 'var(--accent-orange)' } : {}}
        >
            {active ? '✔ Tersimpan' : 'Simpan'}
        </button>
    );
}
