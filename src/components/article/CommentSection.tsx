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
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Diskusi ({comments.length})</h3>

            {/* Input Form - Responsive Layout */}
            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nama Anda"
                        disabled={submitting}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '12px',
                            background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)'
                        }}
                    />
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Tulis komentar..."
                        rows={3}
                        disabled={submitting}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '12px',
                            background: 'var(--bg-color)', border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ minWidth: '100px', opacity: submitting ? 0.7 : 1 }}
                            disabled={submitting}
                        >
                            {submitting ? 'Mengirim...' : 'Kirim'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Comment List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Memuat komentar...</div>
                ) : comments.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada komentar. Jadilah yang pertama!</div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: 'var(--glass-highlight)', border: '1px solid var(--glass-border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, fontWeight: 700, color: 'var(--accent-blue)'
                            }}>
                                {comment.name[0].toUpperCase()}
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{comment.name}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                        {new Date(comment.createdAt || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{comment.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
