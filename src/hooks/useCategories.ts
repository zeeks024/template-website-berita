"use client";

import { useState, useEffect } from 'react';

const DEFAULT_CATEGORIES = ['Opini', 'Cerita', 'Sosok Inspiratif', 'Sudut Kota', 'Potensi'];

export function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
                // Fallback to defaults if API fails
                setCategories(DEFAULT_CATEGORIES);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // NOTE: 'addCategory' and 'deleteCategory' are removed because categories 
    // should be managed by the existence of Articles in the DB.
    // If we need a dedicated "Category Management" page, we'd need a separate Table in DB.

    // For now, these functions are no-ops or can be removed. 
    // Keeping a dummy addCategory for compatibility if widely used, 
    // but ideally we refactor consumers to not rely on manual local addition.
    const addCategory = (cat: string) => {
        // Valid for local optimistic update
        if (!categories.includes(cat)) {
            setCategories([...categories, cat]);
        }
    };

    const deleteCategory = async (cat: string) => {
        try {
            const res = await fetch('/api/categories', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: cat })
            });

            if (res.ok) {
                // Optimistic update or re-fetch
                // Since deleting reassigns articles, re-fetching is safer to see if any remain (unlikely)
                // But for UI responsiveness:
                setCategories(categories.filter(c => c !== cat));

                // Also trigger a re-fetch to be sure
                // fetchCategories(); // (refactor to expose fetch if needed, currently inside useEffect)
            } else {
                alert("Gagal menghapus kategori");
            }
        } catch (error) {
            console.error("Failed to delete category", error);
            alert("Terjadi kesalahan saat menghapus");
        }
    };

    return { categories, loading, addCategory, deleteCategory };
}
