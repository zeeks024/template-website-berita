"use client";

import { useState } from 'react';
import { UserPlus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.error || 'Pendaftaran gagal.');
            }
        } catch {
            setError('Terjadi kesalahan koneksi.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#05090a] px-4">
                <FadeIn className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserPlus size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-4">Cek Email Anda!</h1>
                    <p className="text-white/60 mb-8">
                        Kami telah mengirimkan tautan verifikasi ke <strong>{formData.email}</strong>.
                        Silakan klik tautan tersebut untuk mengaktifkan akun Anda.
                    </p>
                    <Link href="/admin/login" className="text-cyan-500 font-bold hover:underline">
                        Kembali ke Login
                    </Link>
                </FadeIn>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#05090a] relative overflow-hidden px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

            <FadeIn className="w-full max-w-md bg-[#0a1214] border border-white/10 p-8 rounded-[2rem] relative z-10 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Daftar Penulis</h1>
                    <p className="text-white/40 text-sm text-center">Bergabung dengan tim redaksi Derap Serayu.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:border-cyan-500 focus:outline-none transition-all"
                            required
                        />
                    </div>
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
                            minLength={6}
                        />
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
                        {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                        {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-white/40 text-sm">Sudah punya akun?</p>
                    <Link href="/admin/login" className="text-cyan-500 font-bold hover:text-cyan-400 transition-colors">Masuk di sini</Link>
                </div>
            </FadeIn>
        </main>
    );
}
