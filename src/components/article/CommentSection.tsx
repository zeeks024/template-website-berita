"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatDateWIB } from '@/lib/dateUtils';

type Comment = {
    id: string;
    name: string;
    text: string;
    createdAt?: string;
    date?: string; // Legacy support if needed, but we use createdAt now
};

export default function CommentSection({ slug }: { slug: string }) {
    const { user, isLoading: authLoading } = useAuth();
    const pathname = usePathname();
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/comments?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setComments(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setSubmitting(true);
        setError(null);
        
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, slug }),
            });

            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setText("");
            } else if (res.status === 401) {
                setError("Sesi anda telah berakhir. Silakan login kembali.");
            } else {
                setError("Gagal mengirim komentar. Silakan coba lagi.");
            }
        } catch (error) {
            console.error(error);
            setError("Terjadi kesalahan jaringan.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-border" id="comments">
            <h3 className="text-sm font-black uppercase tracking-widest text-cyan-500 mb-8 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
                Diskusi ({comments.length})
            </h3>

            <div className="mb-12 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-2xl -m-1 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-muted border border-border rounded-2xl p-6 backdrop-blur-md">
                    {authLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : user ? (
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 font-bold text-xs">
                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span>Berkomentar sebagai <span className="text-foreground font-medium">{user.name}</span></span>
                            </div>
                            
                            <textarea
                                value={text}
                                onChange={e => setText(e.target.value)}
                                placeholder="Tulis pendapat anda..."
                                rows={3}
                                disabled={submitting}
                                className="bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all w-full resize-y min-h-[100px]"
                            />
                            
                            {error && (
                                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting || !text.trim()}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                >
                                    {submitting ? 'Mengirim...' : 'Kirim Komentar'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-8 space-y-4">
                            <p className="text-muted-foreground">
                                Silakan login untuk ikut berdiskusi dalam artikel ini.
                            </p>
                            <Link 
                                href={`/login?redirect=${encodeURIComponent(pathname + '#comments')}`}
                                className="inline-flex items-center justify-center bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 border border-cyan-500/50 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                            >
                                Login untuk berkomentar
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Comment List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center text-muted-foreground text-sm animate-pulse">Memuat komentar...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-sm">
                        Belum ada komentar. Jadilah yang pertama!
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-border flex items-center justify-center shrink-0 font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                                {comment.name[0].toUpperCase()}
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-bold text-foreground text-sm">{comment.name}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                        {formatDateWIB(new Date(comment.createdAt || Date.now()))}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed bg-muted p-4 rounded-r-xl rounded-bl-xl border border-border group-hover:border-border transition-colors">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
