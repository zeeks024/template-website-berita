"use client";

import { useState, useEffect } from 'react';

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('serayu_bookmarks');
        if (saved) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- loading from localStorage
            setBookmarks(JSON.parse(saved));
        }
        setIsInitialized(true);
    }, []);

    const toggleBookmark = (id: string) => {
        let newBookmarks;
        if (bookmarks.includes(id)) {
            newBookmarks = bookmarks.filter(b => b !== id);
        } else {
            newBookmarks = [...bookmarks, id];
        }
        setBookmarks(newBookmarks);
        localStorage.setItem('serayu_bookmarks', JSON.stringify(newBookmarks));
    };

    const isBookmarked = (id: string) => bookmarks.includes(id);

    return { bookmarks, toggleBookmark, isBookmarked, isInitialized };
}
