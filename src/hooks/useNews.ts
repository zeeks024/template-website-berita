"use client";

import { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '@/types/news';

export function useNews(filterStatus: string = 'published', myArticlesOnly: boolean = false) {
    const [allNews, setAllNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = useCallback(async () => {
        try {
            const params = new URLSearchParams({ status: filterStatus });
            if (myArticlesOnly) {
                params.set('my', 'true');
            }
            const res = await fetch(`/api/articles?${params.toString()}`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                setAllNews(data as NewsItem[]);
            }
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            setLoading(false);
        }
    }, [filterStatus, myArticlesOnly]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

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

    const incrementView = () => { };

    return { allNews, loading, addArticle, updateArticle, deleteArticle, incrementView };
}
