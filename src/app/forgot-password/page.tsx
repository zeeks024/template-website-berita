"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            // Always show success to prevent enumeration
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#05090a] px-4">
                <FadeIn className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-cyan-500/20 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-4">Cek Kotak Masuk</h1>
                    <p className="text-white/60 mb-8">
                        Jika email terdaftar, kami telah mengirimkan instruksi reset password ke <strong>{email}</strong>.
                    </p>
                    <Link href="/admin/login" className="text-white font-bold bg-white/10 py-3 px-6 rounded-xl hover:bg-white/20 transition-all">
                        Kembali ke Login
                    </Link>
                </FadeIn>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#05090a] px-4">
            <FadeIn className="w-full max-w-md bg-[#0a1214] border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                <div className="mb-8">
                    <Link href="/admin/login" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-4 transition-colors">
                        <ArrowLeft size={16} /> Kembali
                    </Link>
                    <h1 className="text-2xl font-black uppercase text-white mb-2">Lupa Password?</h1>
                    <p className="text-white/40 text-sm">Masukkan email Anda untuk mereset kata sandi.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email Terdaftar"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:border-cyan-500 focus:outline-none transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-xl font-black uppercase tracking-widest transition-all disabled:opacity-50"
                    >
                        {loading ? 'Mengirim...' : 'Kirim Link Reset'}
                    </button>
                </form>
            </FadeIn>
        </main>
    );
}
