"use client";

import { useEffect, useState, useRef, useCallback } from 'react';

type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'restored';

interface UseAutosaveOptions<T> {
    key: string;
    data: T;
    enabled?: boolean;
    debounceMs?: number;
    onRestore?: (data: T) => void;
}

interface UseAutosaveReturn<T> {
    status: AutosaveStatus;
    lastSaved: Date | null;
    clear: () => void;
    restore: () => T | null;
    hasSavedData: boolean;
}

export function useAutosave<T>({
    key,
    data,
    enabled = true,
    debounceMs = 3000,
    onRestore
}: UseAutosaveOptions<T>): UseAutosaveReturn<T> {
    const [status, setStatus] = useState<AutosaveStatus>('idle');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [hasSavedData, setHasSavedData] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true);
    const storageKey = `autosave_${key}`;

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const saved = localStorage.getItem(storageKey);
        setHasSavedData(!!saved);
    }, [storageKey]);

    useEffect(() => {
        if (!enabled || typeof window === 'undefined') return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setStatus('saving');

        timeoutRef.current = setTimeout(() => {
            try {
                const payload = {
                    data,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem(storageKey, JSON.stringify(payload));
                setLastSaved(new Date());
                setStatus('saved');
                setHasSavedData(true);

                setTimeout(() => setStatus('idle'), 2000);
            } catch (error) {
                console.error('Autosave failed:', error);
                setStatus('idle');
            }
        }, debounceMs);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, enabled, debounceMs, storageKey]);

    const clear = useCallback(() => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(storageKey);
        setHasSavedData(false);
        setLastSaved(null);
        setStatus('idle');
    }, [storageKey]);

    const restore = useCallback((): T | null => {
        if (typeof window === 'undefined') return null;
        
        try {
            const saved = localStorage.getItem(storageKey);
            if (!saved) return null;

            const { data: savedData, timestamp } = JSON.parse(saved);
            setLastSaved(new Date(timestamp));
            setStatus('restored');
            
            if (onRestore) {
                onRestore(savedData);
            }
            
            setTimeout(() => setStatus('idle'), 2000);
            return savedData;
        } catch (error) {
            console.error('Failed to restore autosave:', error);
            return null;
        }
    }, [storageKey, onRestore]);

    return {
        status,
        lastSaved,
        clear,
        restore,
        hasSavedData
    };
}
