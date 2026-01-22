"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/admin/create');
                router.refresh();
            } else {
                setError('Password salah. Silakan coba lagi.');
            }
        } catch (err) {
            setError('Terjadi kesalahan. Coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#05090a] relative overflow-hidden px-4">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>

            <FadeIn className="w-full max-w-md bg-[#0a1214] border border-white/10 p-8 rounded-[2rem] relative z-10 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 text-cyan-500">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Admin Access</h1>
                    <p className="text-white/40 text-sm text-center">Masukkan password untuk mengakses dashboard admin Derap Serayu.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password Admin"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all text-center tracking-widest"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs text-center font-bold bg-red-900/10 py-2 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-xl font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    >
                        {loading ? 'Memverifikasi...' : 'Masuk Dashboard'}
                        {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            </FadeIn>
        </main>
    );
}
