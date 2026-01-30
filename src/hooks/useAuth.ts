"use client";

import { useState, useEffect, useCallback } from 'react';
import { signOut } from "next-auth/react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        user: null,
        isLoading: true,
        error: null
    });

    const fetchUser = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            const response = await fetch('/api/auth/me');

            if (response.ok) {
                const data = await response.json();
                setState({
                    user: data.user,
                    isLoading: false,
                    error: null
                });
            } else {
                // If 401 or other error, user is not authenticated
                setState({
                    user: null,
                    isLoading: false,
                    error: null
                });
            }
        } catch (err) {
            setState({
                user: null,
                isLoading: false,
                error: err instanceof Error ? err : new Error('Failed to fetch user')
            });
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const logout = async () => {
        try {
            // 1. NextAuth SignOut (Client-side)
            await signOut({ redirect: false });

            // 2. Custom SignOut (Server-side)
            await fetch('/api/auth/logout', { method: 'POST' });

            setState({
                user: null,
                isLoading: false,
                error: null
            });

            // Reload to clear state fully
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return {
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: !!state.user,
        error: state.error,
        logout,
        refetch: fetchUser
    };
}
