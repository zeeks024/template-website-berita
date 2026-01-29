"use client";

import { useState } from 'react';
import { LogIn, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import FadeIn from '@/components/ui/FadeIn';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');
    const verified = searchParams.get('verified');
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await res.json();

            if (res.ok) {
                const userRole = data.user?.role;
                
                if (userRole === 'ADMIN' || userRole === 'WRITER') {
                    router.push(redirect || '/admin');
                } else {
                    router.push(redirect || '/');
                }
                router.refresh();
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
        <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <FadeIn className="w-full max-w-md bg-card border border-border p-8 rounded-2xl relative z-10 shadow-xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-cyan-500/20 text-cyan-500 rounded-full flex items-center justify-center mb-4">
                        <LogIn size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Masuk ke Akun</h1>
                    <p className="text-muted-foreground text-sm text-center">Login untuk mengakses fitur lengkap Serayu.</p>
                </div>

                {verified && (
                    <div className="mb-6 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 p-4 rounded-xl text-center text-sm font-bold">
                        Email berhasil diverifikasi! Silakan login.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center font-medium bg-red-500/10 py-2.5 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                        {loading ? 'Memproses...' : 'Masuk'}
                        {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-3">
                    <Link href="/forgot-password" className="text-muted-foreground hover:text-cyan-500 text-sm transition-colors block">
                        Lupa password?
                    </Link>
                    <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground text-sm mb-2">Belum punya akun?</p>
                        <Link href="/daftar" className="inline-flex items-center gap-2 text-cyan-500 font-semibold hover:text-cyan-400 transition-colors">
                            <UserPlus size={16} />
                            Daftar Sekarang
                        </Link>
                    </div>
                </div>
            </FadeIn>
        </main>
    );
}
