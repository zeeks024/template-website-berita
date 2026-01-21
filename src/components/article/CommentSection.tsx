"use client";

import { useState, useEffect } from 'react';

type Comment = {
    id: string;
    name: string;
    text: string;
    createdAt?: string;
    date?: string; // Legacy support if needed, but we use createdAt now
};

export default function CommentSection({ slug }: { slug: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

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
        if (!name.trim() || !text.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, text, slug }),
            });

            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setText("");
                setName("");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-cyan-500 mb-8 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
                Diskusi ({comments.length})
            </h3>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mb-12 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-2xl -m-1 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <div className="grid gap-4">
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nama Anda"
                            disabled={submitting}
                            className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all w-full"
                        />
                        <textarea
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Tulis pendapat anda..."
                            rows={3}
                            disabled={submitting}
                            className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all w-full resize-y min-h-[100px]"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            >
                                {submitting ? 'Mengirim...' : 'Kirim Komentar'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Comment List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center text-white/30 text-sm animate-pulse">Memuat komentar...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl text-white/30 text-sm">
                        Belum ada komentar. Jadilah yang pertama!
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center shrink-0 font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                                {comment.name[0].toUpperCase()}
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-bold text-white text-sm">{comment.name}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-white/30">
                                        {new Date(comment.createdAt || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed bg-white/5 p-4 rounded-r-xl rounded-bl-xl border border-white/5 group-hover:border-white/10 transition-colors">
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
