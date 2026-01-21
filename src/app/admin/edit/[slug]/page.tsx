"use client";

import { useState, useEffect, use } from 'react';
import { useNews } from '@/hooks/useNews';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { calculateReadTime } from '@/lib/dateUtils';
import { Save, X, Activity, Globe, Tag, User, Layout, FileText, Image as ImageIcon } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

type Props = {
    params: Promise<{ slug: string }>;
};

export default function EditArticlePage({ params }: Props) {
    const { slug } = use(params);
    const { allNews, updateArticle, loading } = useNews();
    const { categories } = useCategories();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

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

    useEffect(() => {
        if (!loading && allNews.length > 0 && !isInitialized) {
            const found = allNews.find(n => n.slug === decodeURIComponent(slug));
            if (found) {
                // Robust helper to get array from potential JSON string or Array
                const getArray = (data: any) => {
                    if (Array.isArray(data)) return data;
                    if (typeof data === 'string') {
                        try {
                            const parsed = JSON.parse(data);
                            return Array.isArray(parsed) ? parsed : [];
                        } catch {
                            return [];
                        }
                    }
                    return [];
                };

                // Handle Tags (Convert Array -> Comma String)
                let tagsString = '';
                const tagsRaw = found.tags;
                if (Array.isArray(tagsRaw)) {
                    tagsString = tagsRaw.join(', ');
                } else if (typeof tagsRaw === 'string') {
                    try {
                        const parsed = JSON.parse(tagsRaw);
                        if (Array.isArray(parsed)) tagsString = parsed.join(', ');
                        else tagsString = tagsRaw; // Fallback if plain string
                    } catch {
                        tagsString = tagsRaw;
                    }
                }

                // Handle Gallery
                const galleryArray = getArray(found.gallery);
                const finalImages = galleryArray.length > 0 ? galleryArray : (found.image ? [found.image] : []);

                setFormData({
                    id: found.id,
                    title: found.title,
                    category: found.category,
                    summary: found.summary,
                    excerpt: found.excerpt || '',
                    content: found.content,
                    images: finalImages,
                    imageCaption: found.imageCaption || '',
                    imageCredit: found.imageCredit || '',
                    author: found.author,
                    status: found.status || 'draft',
                    tags: tagsString,
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
        setIsSubmitting(true);

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

        setIsSubmitting(false);

        if (success) {
            localStorage.removeItem('editor_autosave_temp');
            router.push('/admin');
        } else {
            alert('Gagal menyimpan perubahan.');
        }
    };

    if (loading) return <div className="min-h-screen pt-32 text-center text-white/30 uppercase font-bold tracking-widest text-xs">Memuat data...</div>;

    return (
        <FadeIn>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Content Column (Left - 2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-cyan-500 font-bold uppercase tracking-widest text-[10px] mb-2 block">Mode Edit</span>
                            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Editor Berita</h1>
                            <p className="text-white/40">Melakukan perubahan pada konten artikel.</p>
                        </div>
                    </div>

                    {/* Title Input */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                            <FileText size={14} className="text-cyan-500" /> Judul Artikel
                        </label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-[#0a1214] border border-white/10 rounded-2xl p-6 text-2xl font-bold text-white placeholder:text-white/20 focus:border-cyan-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Excerpt Input */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                            <Layout size={14} className="text-cyan-500" /> Ringkasan (Excerpt)
                        </label>
                        <textarea
                            rows={3}
                            value={formData.excerpt}
                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full bg-[#0a1214] border border-white/10 rounded-2xl p-6 text-base text-white placeholder:text-white/20 focus:border-cyan-500 focus:outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                            <FileText size={14} className="text-cyan-500" /> Konten Utama
                        </label>
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                            <RichTextEditor value={formData.content} onChange={val => setFormData({ ...formData, content: val })} />
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                            <ImageIcon size={14} className="text-cyan-500" /> Media Utama
                        </label>
                        <div className="bg-[#0a1214] border border-white/10 rounded-2xl p-6">
                            <ImageUploader values={formData.images} onChange={(vals) => setFormData({ ...formData, images: vals })} />
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                                    placeholder="Caption Gambar..."
                                    value={formData.imageCaption}
                                    onChange={e => setFormData({ ...formData, imageCaption: e.target.value })}
                                />
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                                    placeholder="Kredit Foto..."
                                    value={formData.imageCredit}
                                    onChange={e => setFormData({ ...formData, imageCredit: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column (Right - 1/3) */}
                <div className="space-y-6">
                    {/* Publish Card */}
                    <div className="bg-[#0a1214] border border-white/10 rounded-3xl p-6 sticky top-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="text-cyan-400" size={20} />
                            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Publikasi</h3>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase">Status</label>
                                <div className="relative">
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none cursor-pointer"
                                    >
                                        <option value="draft" className="bg-[#0a1214]">📝 Draft (Konsep)</option>
                                        <option value="published" className="bg-[#0a1214]">🚀 Published (Terbit)</option>
                                        <option value="archived" className="bg-[#0a1214]">📦 Archived (Arsip)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={16} /> {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/admin')}
                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all"
                            >
                                <X size={16} /> Batal
                            </button>
                        </div>
                    </div>

                    {/* Meta Card */}
                    <div className="bg-[#0a1214] border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Tag className="text-emerald-400" size={20} />
                            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Metadata</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase">Kategori</label>
                                <select
                                    className="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none cursor-pointer"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(c => <option key={c} value={c} className="bg-[#0a1214]">{c}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase">Tags</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                />
                                <p className="text-[10px] text-white/30">Pisahkan dengan koma.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase flex items-center gap-1"><User size={10} /> Penulis</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Card */}
                    <div className="bg-[#0a1214] border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="text-purple-400" size={20} />
                            <h3 className="font-bold text-white uppercase tracking-wider text-sm">SEO (Google)</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase">Meta Title</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                                    value={formData.metaTitle}
                                    onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase">Meta Description</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none transition-colors resize-none"
                                    value={formData.metaDesc}
                                    onChange={e => setFormData({ ...formData, metaDesc: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </FadeIn>
    );
}
