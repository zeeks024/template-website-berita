"use client";

import { useState } from 'react';
import { LogIn, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
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

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-6 bg-card text-muted-foreground relative z-10">atau masuk dengan</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all border border-gray-200"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Masuk dengan Google
                        </button>
                    </div>
                </div>

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
