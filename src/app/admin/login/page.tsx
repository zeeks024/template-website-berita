"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const verified = searchParams.get('verified');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = '/admin';
            } else {
                setError(data.error || 'Login gagal.');
            }
        } catch {
            setError('Terjadi kesalahan koneksi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#05090a] relative overflow-hidden px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>

            <FadeIn className="w-full max-w-md bg-[#0a1214] border border-white/10 p-8 rounded-[2rem] relative z-10 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 text-cyan-500">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Masuk</h1>
                    <p className="text-white/40 text-sm text-center">Akses dashboard penulis Derap Serayu.</p>
                </div>

                {verified && (
                    <div className="mb-6 bg-green-900/20 border border-green-500/30 text-green-400 p-4 rounded-xl text-center text-sm font-bold">
                        🎉 Email berhasil diverifikasi! Silakan login.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:border-cyan-500 focus:outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:border-cyan-500 focus:outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-xs text-cyan-500 hover:text-cyan-400 font-bold">Lupa Password?</Link>
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs text-center font-bold bg-red-900/10 py-2 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-xl font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                        {loading ? 'Memproses...' : 'Masuk'}
                        {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-white/40 text-sm">Belum punya akun?</p>
                    <Link href="/register" className="text-cyan-500 font-bold hover:text-cyan-400 transition-colors">Daftar Penulis Baru</Link>
                </div>
            </FadeIn>
        </main>
    );
}
