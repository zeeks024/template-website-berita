"use client";

import { useState, useEffect, useCallback } from 'react';

export function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            if (Array.isArray(data)) {
                setCategories(data);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const addCategory = async (name: string) => {
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (res.ok) {
                setCategories(prev => [...prev, name].sort());
                return true;
            } else {
                const data = await res.json();
                alert(data.error || "Gagal menambah kategori");
                return false;
            }
        } catch (error) {
            console.error("Failed to add category", error);
            alert("Terjadi kesalahan saat menambah kategori");
            return false;
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
                setCategories(prev => prev.filter(c => c !== cat));
                return true;
            } else {
                alert("Gagal menghapus kategori");
                return false;
            }
        } catch (error) {
            console.error("Failed to delete category", error);
            alert("Terjadi kesalahan saat menghapus");
            return false;
        }
    };

    return { categories, loading, addCategory, deleteCategory, refetch: fetchCategories };
}
