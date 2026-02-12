"use client";

import { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '@/types/news';

interface PaginationState {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface UseNewsReturn {
    allNews: NewsItem[];
    loading: boolean;
    pagination: PaginationState;
    setPage: (page: number) => void;
addArticle: (article: NewsItem) => Promise<{ success: boolean; error?: string }>;
    updateArticle: (article: NewsItem) => Promise<{ success: boolean; error?: string }>;
    deleteArticle: (id: string) => Promise<void>;
    incrementView: () => void;
    refetch: () => Promise<void>;
}

export function useNews(
    filterStatus: string = 'published',
    myArticlesOnly: boolean = false,
    options?: { paginate?: boolean; pageSize?: number }
): UseNewsReturn {
    const [allNews, setAllNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        limit: options?.pageSize || 10,
        total: 0,
        totalPages: 0
    });

    const fetchNews = useCallback(async (page?: number) => {
        try {
            setLoading(true);
            const currentPage = page ?? pagination.page;
            const params = new URLSearchParams({ status: filterStatus });
            
            if (myArticlesOnly) {
                params.set('my', 'true');
            }
            
            if (options?.paginate) {
                params.set('paginate', 'true');
                params.set('page', String(currentPage));
                params.set('limit', String(pagination.limit));
            }
            
            const res = await fetch(`/api/articles?${params.toString()}`, {
                credentials: 'include'
            });
            const data = await res.json();
            
            if (options?.paginate && data.articles) {
                setAllNews(data.articles as NewsItem[]);
                setPagination(prev => ({
                    ...prev,
                    page: data.page,
                    total: data.total,
                    totalPages: data.totalPages
                }));
            } else if (Array.isArray(data)) {
                setAllNews(data as NewsItem[]);
                setPagination(prev => ({
                    ...prev,
                    total: data.length,
                    totalPages: 1
                }));
            }
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            setLoading(false);
        }
    }, [filterStatus, myArticlesOnly, options?.paginate, pagination.page, pagination.limit]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const setPage = useCallback((newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
            fetchNews(newPage);
        }
    }, [pagination.totalPages, fetchNews]);

const addArticle = async (article: NewsItem): Promise<{ success: boolean; error?: string }> => {
        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article)
            });
            const data = await res.json();
            if (!res.ok) {
                return { success: false, error: data.error || 'Gagal menyimpan artikel' };
            }
            fetchNews();
            return { success: true };
        } catch (error) {
            console.error("Failed to add article", error);
            return { success: false, error: 'Terjadi kesalahan koneksi' };
        }
    };

    const updateArticle = async (article: NewsItem): Promise<{ success: boolean; error?: string }> => {
        try {
            const res = await fetch(`/api/articles/${article.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article)
            });
            const data = await res.json();
            if (!res.ok) {
                return { success: false, error: data.error || 'Gagal mengupdate artikel' };
            }
            fetchNews();
            return { success: true };
        } catch (error) {
            console.error("Failed to update article", error);
            return { success: false, error: 'Terjadi kesalahan koneksi' };
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

    const refetch = useCallback(async () => {
        await fetchNews();
    }, [fetchNews]);

    return { 
        allNews, 
        loading, 
        pagination,
        setPage,
        addArticle, 
        updateArticle, 
        deleteArticle, 
        incrementView,
        refetch
    };
}
