"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FadeIn from '@/components/ui/FadeIn';

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });

            if (res.ok) {
                router.push('/admin/login');
            } else {
                const data = await res.json();
                setError(data.error || 'Gagal mereset password');
            }
        } catch {
            setError('Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    if (!token) return <p className="text-white text-center mt-20">Token tidak valid.</p>;

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#05090a] px-4">
            <FadeIn className="w-full max-w-md bg-[#0a1214] border border-white/10 p-8 rounded-[2rem]">
                <h1 className="text-2xl font-black text-white mb-6">Reset Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Password Baru"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white"
                        required
                        minLength={6}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 text-black py-4 rounded-xl font-bold uppercase"
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
                    </button>
                </form>
            </FadeIn>
        </main>
    );
}
