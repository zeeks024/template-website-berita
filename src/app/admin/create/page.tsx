"use client";

import { useState, useEffect } from 'react';
import { useNews } from '@/hooks/useNews';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { formatWIB, calculateReadTime } from '@/lib/dateUtils';

export default function CreateArticlePage() {
    const { addArticle } = useNews();
    const { categories } = useCategories();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        summary: '',
        excerpt: '',
        content: '',
        images: [] as string[],
        imageCaption: '',
        imageCredit: '',
        author: 'Admin Redaksi',
        status: 'published',
        tags: '',
        metaTitle: '',
        metaDesc: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;

        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const success = await addArticle({
            id: Date.now().toString(),
            slug: slug,
            title: formData.title,
            category: formData.category || categories[0] || 'Nasional',
            summary: formData.summary,
            excerpt: formData.excerpt,
            content: formData.content.split('\n').map(p => `<p>${p}</p>`).join(''),
            image: formData.images.length > 0 ? formData.images[0] : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
            gallery: formData.images,
            imageCaption: formData.imageCaption,
            imageCredit: formData.imageCredit,
            author: formData.author,
            status: formData.status as any,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            metaTitle: formData.metaTitle,
            metaDesc: formData.metaDesc,
            publishedAt: new Date().toISOString(),
            readTime: calculateReadTime(formData.content)
        });

        if (success) {
            localStorage.removeItem('editor_autosave_temp'); // Clear draft
            alert('Berita berhasil diterbitkan!');
            router.push('/admin');
        } else {
            alert('Gagal menerbitkan berita. Cek konsol atau koneksi database.');
        }
    };

    return (
        <div className="admin-form-grid">
            {/* Main Content Column */}
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Tulis Berita Baru</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Buat konten berkualitas untuk pembaca Anda.</p>
                </div>

                {/* Title */}
                <div>
                    <label className="label-bold">📝 Judul Berita</label>
                    <input
                        required
                        className="input-field"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Masukkan judul artikel yang menarik..."
                        style={{ width: '100%', fontSize: '1.1rem', padding: '12px' }}
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label className="label-bold">📄 Ringkasan (Excerpt)</label>
                    <textarea
                        className="input-field"
                        rows={2}
                        value={formData.excerpt}
                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Tulis ringkasan singkat untuk tampilan homepage dan SEO..."
                        style={{ width: '100%' }}
                    />
                </div>

                {/* Main Content */}
                <div>
                    <label className="label-bold">📰 Konten Berita</label>
                    <RichTextEditor value={formData.content} onChange={val => setFormData({ ...formData, content: val })} />
                </div>

                {/* Image Component */}
                <div>
                    <label className="label-bold">🖼️ Media Utama</label>
                    <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <ImageUploader values={formData.images} onChange={(vals) => setFormData({ ...formData, images: vals })} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                            <input className="input-field" placeholder="Caption Gambar..." value={formData.imageCaption} onChange={e => setFormData({ ...formData, imageCaption: e.target.value })} />
                            <input className="input-field" placeholder="Kredit/Sumber Foto..." value={formData.imageCredit} onChange={e => setFormData({ ...formData, imageCredit: e.target.value })} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Publish Box */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--accent-blue)' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>🚀 Publikasi</h3>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className="label-bold">Status Artikel</label>
                        <select className="input-field" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ width: '100%' }}>
                            <option value="draft">Draft (Konsep)</option>
                            <option value="published">Published (Terbit)</option>
                            <option value="archived">Archived (Arsip)</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <span>💾</span> Simpan & Terbitkan
                    </button>
                    <button onClick={() => router.back()} className="btn-secondary" style={{ width: '100%', marginTop: '0.75rem' }}>
                        Batal
                    </button>
                </div>

                {/* Metadata */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🏷️ Metadata</h3>

                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label-bold">Kategori</label>
                        <select className="input-field" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%' }}>
                            <option value="" disabled>Pilih Kategori</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label-bold">Tags</label>
                        <input className="input-field" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="Politik, Viral, ..." style={{ width: '100%' }} />
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Pisahkan dengan koma (contoh: berita, viral)</div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label-bold">Penulis</label>
                        <input className="input-field" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} style={{ width: '100%' }} />
                    </div>
                </div>

                {/* SEO */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🔍 SEO (Google)</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label-bold">Meta Title</label>
                        <input className="input-field" value={formData.metaTitle} onChange={e => setFormData({ ...formData, metaTitle: e.target.value })} placeholder="Judul di hasil pencarian..." style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label className="label-bold">Meta Description</label>
                        <textarea className="input-field" rows={3} value={formData.metaDesc} onChange={e => setFormData({ ...formData, metaDesc: e.target.value })} placeholder="Deskripsi di hasil pencarian..." style={{ width: '100%' }} />
                    </div>
                </div>

            </div>

            <style jsx>{`
                .label-bold { display: block; margin-bottom: 8px; fontWeight: 600; font-size: 0.9rem; color: var(--text-secondary); }
            `}</style>
        </div>
    );
}
