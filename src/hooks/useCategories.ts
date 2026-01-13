"use client";

import { useState, useEffect } from 'react';

const DEFAULT_CATEGORIES = ['Nasional', 'Dunia', 'Ekonomi', 'Teknologi', 'Olahraga', 'Opini', 'Gaya Hidup', 'Sains'];

export function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('serayu_categories');
        if (saved) {
            setCategories(JSON.parse(saved));
        } else {
            setCategories(DEFAULT_CATEGORIES);
            localStorage.setItem('serayu_categories', JSON.stringify(DEFAULT_CATEGORIES));
        }
    }, []);

    const addCategory = (cat: string) => {
        if (categories.includes(cat)) return;
        const newCats = [...categories, cat];
        setCategories(newCats);
        localStorage.setItem('serayu_categories', JSON.stringify(newCats));
    };

    const deleteCategory = (cat: string) => {
        const newCats = categories.filter(c => c !== cat);
        setCategories(newCats);
        localStorage.setItem('serayu_categories', JSON.stringify(newCats));
    };

    return { categories, addCategory, deleteCategory };
}
