"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle, Loader } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    const verifyToken = useCallback(async (verifyToken: string) => {
        try {
            const res = await fetch(`/api/auth/verify?token=${verifyToken}`);
            if (res.ok) {
                window.location.href = '/login?verified=true';
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            return;
        }
        verifyToken(token);
    }, [token, verifyToken]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#05090a] text-white">
            <div className="text-center">
                {status === 'loading' && (
                    <>
                        <Loader className="animate-spin text-cyan-500 mx-auto mb-4" size={48} />
                        <p>Memverifikasi email...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <XCircle className="text-red-500 mx-auto mb-6" size={64} />
                        <h1 className="text-2xl font-bold mb-2">Verifikasi Gagal</h1>
                        <p className="text-white/60 mb-8">Token tidak valid atau sudah kadaluarsa.</p>
                        <Link href="/register" className="text-cyan-500 font-bold hover:underline">Daftar Ulang</Link>
                    </>
                )}
            </div>
        </main>
    );
}
