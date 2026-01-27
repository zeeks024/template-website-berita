"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../UserContext';
import { Card, SectionHeader, Badge } from '@/components/admin/ui';
import { Users, Shield, Pen, CheckCircle, XCircle, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'WRITER';
    isVerified: boolean;
    createdAt: string;
    _count: { articles: number };
}

export default function UsersPage() {
    const currentUser = useUser();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data);
        } catch {
            setError('Gagal memuat data user');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (currentUser.role !== 'ADMIN') {
            router.replace('/admin');
            return;
        }
        fetchUsers();
    }, [currentUser.role, router, fetchUsers]);

    if (currentUser.role !== 'ADMIN') {
        return null;
    }

    const updateUser = async (userId: string, updates: Partial<Pick<User, 'role' | 'isVerified'>>) => {
        try {
            setUpdating(userId);
            setError(null);
            const res = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update');
            }

            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Gagal update user');
        } finally {
            setUpdating(null);
        }
    };

    const deleteUser = async (userId: string, userName: string) => {
        if (!confirm(`Hapus user "${userName}"? Aksi ini tidak dapat dibatalkan.`)) return;

        try {
            setUpdating(userId);
            setError(null);
            const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete');
            }

            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Gagal hapus user');
        } finally {
            setUpdating(null);
        }
    };

    const toggleRole = (user: User) => {
        const newRole = user.role === 'ADMIN' ? 'WRITER' : 'ADMIN';
        if (user.role === 'ADMIN' && newRole === 'WRITER') {
            if (!confirm(`Ubah ${user.name} dari ADMIN ke WRITER? Mereka akan kehilangan akses admin.`)) return;
        }
        updateUser(user.id, { role: newRole });
    };

    const toggleVerified = (user: User) => {
        updateUser(user.id, { isVerified: !user.isVerified });
    };

    return (
        <FadeIn>
            <div className="max-w-5xl">
                <SectionHeader
                    title="Manajemen User"
                    subtitle="Kelola pengguna dan hak akses sistem."
                    action={
                        <button
                            onClick={fetchUsers}
                            disabled={loading}
                            className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                    }
                />

                {error && (
                    <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                        <AlertTriangle size={18} />
                        <span className="text-sm">{error}</span>
                        <button onClick={() => setError(null)} className="ml-auto hover:text-red-300">
                            <XCircle size={16} />
                        </button>
                    </div>
                )}

                <Card className="p-0 overflow-hidden">
                    {loading ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <RefreshCw size={32} className="mx-auto mb-3 animate-spin opacity-50" />
                            <p className="text-sm font-medium">Memuat data user...</p>
                        </div>
                    ) : users.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Artikel</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {users.map((user) => {
                                        const isCurrentUser = user.id === currentUser.userId;
                                        const isUpdating = updating === user.id;

                                        return (
                                            <tr
                                                key={user.id}
                                                className={`hover:bg-muted transition-all duration-200 ${isUpdating ? 'opacity-50' : ''} group`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                                                            user.role === 'ADMIN'
                                                                ? 'bg-purple-500/10 text-purple-400'
                                                                : 'bg-cyan-500/10 text-cyan-400'
                                                        }`}>
                                                            {user.role === 'ADMIN' ? <Shield size={18} /> : <Pen size={18} />}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-foreground flex items-center gap-2">
                                                                {user.name}
                                                                {isCurrentUser && (
                                                                    <span className="text-2xs px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded uppercase font-bold">
                                                                        Anda
                                                                    </span>
                                                                )}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={user.role === 'ADMIN' ? 'warning' : 'default'}
                                                        dot
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={user.isVerified ? 'success' : 'danger'}
                                                        dot
                                                    >
                                                        {user.isVerified ? 'Verified' : 'Unverified'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-muted-foreground font-medium">
                                                        {user._count.articles}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {!isCurrentUser && (
                                                            <>
                                                                <button
                                                                    onClick={() => toggleRole(user)}
                                                                    disabled={isUpdating}
                                                                    title={user.role === 'ADMIN' ? 'Jadikan Writer' : 'Jadikan Admin'}
                                                                    className="p-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-110"
                                                                >
                                                                    <Shield size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => toggleVerified(user)}
                                                                    disabled={isUpdating}
                                                                    title={user.isVerified ? 'Batalkan Verifikasi' : 'Verifikasi'}
                                                                    className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-110 ${
                                                                        user.isVerified
                                                                            ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
                                                                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                                                                    }`}
                                                                >
                                                                    {user.isVerified ? <XCircle size={14} /> : <CheckCircle size={14} />}
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteUser(user.id, user.name)}
                                                                    disabled={isUpdating || user._count.articles > 0}
                                                                    title={user._count.articles > 0 ? 'Tidak bisa hapus user dengan artikel' : 'Hapus User'}
                                                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            <Users size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-medium">Tidak ada user ditemukan.</p>
                        </div>
                    )}
                </Card>

                {users.length > 0 && (
                    <p className="text-center text-muted-foreground text-xs mt-4 font-medium uppercase tracking-wider">
                        {users.length} user terdaftar
                    </p>
                )}
            </div>
        </FadeIn>
    );
}
