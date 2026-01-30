"use client";

import { useState } from 'react';
import { UserPlus, ArrowRight, LogIn, PenTool, BookOpen } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

type UserRole = 'READER' | 'WRITER';

export default function DaftarPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [role, setRole] = useState<UserRole | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) return;
        
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role }),
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
            <main className="min-h-screen flex items-center justify-center bg-background px-4">
                <FadeIn className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserPlus size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">Cek Email Anda!</h1>
                    <p className="text-muted-foreground mb-8">
                        Kami telah mengirimkan tautan verifikasi ke <strong className="text-foreground">{formData.email}</strong>.
                        Silakan klik tautan tersebut untuk mengaktifkan akun Anda.
                    </p>
                    <Link href="/login" className="text-cyan-500 font-bold hover:underline">
                        Kembali ke Login
                    </Link>
                </FadeIn>
            </main>
        );
    }

    if (!role) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

                <FadeIn className="w-full max-w-lg relative z-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-foreground mb-3">Buat Akun Baru</h1>
                        <p className="text-muted-foreground">Pilih jenis akun yang ingin Anda daftarkan</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => setRole('READER')}
                            className="bg-card border border-border p-6 rounded-2xl text-left hover:border-cyan-500 hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <BookOpen size={24} />
                            </div>
                            <h2 className="text-lg font-bold text-foreground mb-2">Pembaca</h2>
                            <p className="text-muted-foreground text-sm">Simpan bookmark artikel dan berkomentar.</p>
                        </button>

                        <button
                            onClick={() => setRole('WRITER')}
                            className="bg-card border border-border p-6 rounded-2xl text-left hover:border-purple-500 hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-purple-500/20 text-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <PenTool size={24} />
                            </div>
                            <h2 className="text-lg font-bold text-foreground mb-2">Penulis</h2>
                            <p className="text-muted-foreground text-sm">Tulis dan publikasikan artikel di Serayu.</p>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-muted-foreground text-sm mb-2">Sudah punya akun?</p>
                        <Link href="/login" className="inline-flex items-center gap-2 text-cyan-500 font-semibold hover:text-cyan-400 transition-colors">
                            <LogIn size={16} />
                            Masuk di sini
                        </Link>
                    </div>
                </FadeIn>
            </main>
        );
    }

    const isWriter = role === 'WRITER';
    const accentColor = isWriter ? 'purple' : 'cyan';

    return (
        <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-${accentColor}-900/10 rounded-full blur-[100px] pointer-events-none`}></div>

            <FadeIn className="w-full max-w-md bg-card border border-border p-8 rounded-2xl relative z-10 shadow-xl">
                <div className="flex flex-col items-center mb-8">
                    <div className={`w-16 h-16 ${isWriter ? 'bg-purple-500/20 text-purple-500' : 'bg-cyan-500/20 text-cyan-500'} rounded-full flex items-center justify-center mb-4`}>
                        {isWriter ? <PenTool size={28} /> : <BookOpen size={28} />}
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Daftar sebagai {isWriter ? 'Penulis' : 'Pembaca'}
                    </h1>
                    <p className="text-muted-foreground text-sm text-center">
                        {isWriter 
                            ? 'Bergabung dengan tim redaksi Serayu.'
                            : 'Simpan bookmark dan berkomentar di artikel.'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-all"
                            required
                        />
                    </div>
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
                            placeholder="Password (min 6 karakter)"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-all"
                            required
                            minLength={6}
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
                        className={`w-full ${isWriter ? 'bg-purple-600 hover:bg-purple-500' : 'bg-cyan-600 hover:bg-cyan-500'} text-white py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group`}
                    >
                        {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                        {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between text-sm">
                    <button 
                        onClick={() => setRole(null)} 
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        ← Pilih ulang
                    </button>
                    <Link href="/login" className="text-cyan-500 font-semibold hover:text-cyan-400 transition-colors">
                        Sudah punya akun?
                    </Link>
                </div>
            </FadeIn>
        </main>
    );
}
