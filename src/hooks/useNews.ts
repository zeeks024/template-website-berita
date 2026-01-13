"use client";

import { useState, useEffect } from 'react';
import { NewsItem } from '@/data/news';

export function useNews() {
    const [allNews, setAllNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const res = await fetch('/api/articles');
            const data = await res.json();
            if (Array.isArray(data)) {
                // Map Prisma Article to NewsItem interface if needed
                // Currently they match closely enough, but handling 'content' vs not having it in list might be optimization later
                setAllNews(data as NewsItem[]);
            }
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Placeholder functions for compatibility - enabled later for Admin
    const addArticle = async (article: NewsItem) => {
        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                body: JSON.stringify(article)
            });
            if (!res.ok) throw new Error('Failed to add article');
            fetchNews();
            return true;
        } catch (error) {
            console.error("Failed to add article", error);
            return false;
        }
    };

    const updateArticle = async (article: NewsItem) => {
        try {
            // Ensure gallery is included in the payload
            const res = await fetch(`/api/articles/${article.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article)
            });
            if (!res.ok) throw new Error('Failed to update article');
            fetchNews();
            return true;
        } catch (error) {
            console.error("Failed to update article", error);
            return false;
        }
    };

    const deleteArticle = async (id: string) => {
        const article = allNews.find(n => n.id === id);
        if (!article) return;

        try {
            await fetch(`/api/articles/${article.slug}`, {
                method: 'DELETE'
            });
            fetchNews();
        } catch (error) {
            console.error("Failed to delete article", error);
        }
    };

    // Use the API route we created earlier for tracking views
    const incrementView = (slug: string) => { };

    return { allNews, loading, addArticle, updateArticle, deleteArticle, incrementView };
}
