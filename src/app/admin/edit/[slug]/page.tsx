"use client";

import { useState, useEffect, use } from 'react';
import { useNews } from '@/hooks/useNews';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { formatWIB, calculateReadTime } from '@/lib/dateUtils';

type Props = {
    params: Promise<{ slug: string }>;
};

export default function EditArticlePage({ params }: Props) {
    const { slug } = use(params);
    const { allNews, updateArticle, loading } = useNews();
    const { categories } = useCategories();
    const router = useRouter();

    const [formData, setFormData] = useState({
        id: '',
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

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!loading && allNews.length > 0 && !isInitialized) {
            const found = allNews.find(n => n.slug === decodeURIComponent(slug));
            if (found) {
                setFormData({
                    id: found.id,
                    title: found.title,
                    category: found.category,
                    summary: found.summary,
                    excerpt: found.excerpt || '',
                    content: found.content,
                    images: found.gallery && found.gallery.length > 0 ? found.gallery : [found.image],
                    imageCaption: found.imageCaption || '',
                    imageCredit: found.imageCredit || '',
                    author: found.author,
                    status: found.status || 'draft',
                    tags: found.tags ? found.tags.join(', ') : '',
                    metaTitle: found.metaTitle || '',
                    metaDesc: found.metaDesc || ''
                });
                setIsInitialized(true);
            }
        }
    }, [loading, allNews, slug, isInitialized]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;

        const success = await updateArticle({
            id: formData.id,
            slug: slug,
            title: formData.title,
            category: formData.category,
            summary: formData.summary,
            excerpt: formData.excerpt,
            content: formData.content,
            image: formData.images[0] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
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
            alert('Perubahan disimpan!');
            router.push('/admin');
        } else {
            alert('Gagal menyimpan perubahan.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-form-grid">
            {/* Main Content */}
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Edit Berita</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Perbarui konten artikel ini.</p>
                </div>

                <div>
                    <label className="label-bold">📝 Judul Berita</label>
                    <input
                        required
                        className="input-field"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        style={{ width: '100%', fontSize: '1.1rem', padding: '12px' }}
                    />
                </div>

                <div>
                    <label className="label-bold">📄 Ringkasan (Excerpt)</label>
                    <textarea
                        className="input-field"
                        rows={2}
                        value={formData.excerpt}
                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                        style={{ width: '100%' }}
                    />
                </div>

                <div>
                    <label className="label-bold">📰 Konten Berita</label>
                    <RichTextEditor value={formData.content} onChange={val => setFormData({ ...formData, content: val })} />
                </div>

                <div>
                    <label className="label-bold">🖼️ Media Utama</label>
                    <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <ImageUploader values={formData.images} onChange={(vals) => setFormData({ ...formData, images: vals })} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                            <input className="input-field" placeholder="Caption..." value={formData.imageCaption} onChange={e => setFormData({ ...formData, imageCaption: e.target.value })} />
                            <input className="input-field" placeholder="Credit..." value={formData.imageCredit} onChange={e => setFormData({ ...formData, imageCredit: e.target.value })} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid var(--accent-orange)' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>🚀 Publikasi</h3>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className="label-bold">Status Artikel</label>
                        <select className="input-field" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ width: '100%' }}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <span>💾</span> Simpan Perubahan
                    </button>
                    <button onClick={() => router.push('/admin')} className="btn-secondary" style={{ width: '100%', marginTop: '0.75rem' }}>Batal</button>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🏷️ Metadata</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label-bold">Kategori</label>
                        <select className="input-field" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%' }}>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label-bold">Tags</label>
                        <input className="input-field" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label className="label-bold">Penulis</label>
                        <input className="input-field" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} style={{ width: '100%' }} />
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🔍 SEO</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        <label className="label-bold">Meta Title</label>
                        <input className="input-field" value={formData.metaTitle} onChange={e => setFormData({ ...formData, metaTitle: e.target.value })} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label className="label-bold">Meta Description</label>
                        <textarea className="input-field" rows={3} value={formData.metaDesc} onChange={e => setFormData({ ...formData, metaDesc: e.target.value })} style={{ width: '100%' }} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .label-bold { display: block; margin-bottom: 8px; fontWeight: 600; font-size: 0.9rem; color: var(--text-secondary); }
            `}</style>
        </div>
    );
}
