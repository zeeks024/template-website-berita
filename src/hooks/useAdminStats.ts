"use client";

import { useState, useEffect } from 'react';

export interface AdminStats {
    totalArticles: number;
    totalViews: number;
    topCategory: string;
    draftCount: number;
    pendingReviewCount: number;
    recentArticles: Array<{
        id: string;
        title: string;
        status: string;
        publishedAt: string;
    }>;
}

const defaultStats: AdminStats = {
    totalArticles: 0,
    totalViews: 0,
    topCategory: '-',
    draftCount: 0,
    pendingReviewCount: 0,
    recentArticles: []
};

let cachedPromise: Promise<AdminStats> | null = null;
let cachedData: AdminStats | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30_000;

function fetchStats(): Promise<AdminStats> {
    const now = Date.now();
    if (cachedData && now - cacheTimestamp < CACHE_TTL) {
        return Promise.resolve(cachedData);
    }
    if (cachedPromise) return cachedPromise;

    cachedPromise = fetch('/api/articles/stats', { credentials: 'include' })
        .then(res => res.json())
        .then((data: AdminStats) => {
            cachedData = data;
            cacheTimestamp = Date.now();
            cachedPromise = null;
            return data;
        })
        .catch(() => {
            cachedPromise = null;
            return defaultStats;
        });

    return cachedPromise;
}

export function useAdminStats(enabled = true) {
    const [stats, setStats] = useState<AdminStats>(cachedData || defaultStats);
    const [loading, setLoading] = useState(!cachedData);

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return;
        }
        let cancelled = false;
        fetchStats().then(data => {
            if (!cancelled) {
                setStats(data);
                setLoading(false);
            }
        });
        return () => { cancelled = true; };
    }, [enabled]);

    return { stats, loading };
}
