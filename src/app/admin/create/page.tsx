"use client";

import { useState } from 'react';
import { useNews } from '@/hooks/useNews';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { calculateReadTime } from '@/lib/dateUtils';
import { Save, X, Activity, Globe, Tag, User, Layout, FileText, Image as ImageIcon } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function CreateArticlePage() {
    const { addArticle } = useNews();
    const { categories } = useCategories();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        summary: '',
        excerpt: '',
        content: '',
        images: [] as string[],
        imageCaption: '',
        imageCredit: '',
        author: 'Admin Serayu',
        status: 'published',
        tags: '',
        metaTitle: '',
        metaDesc: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;
        setIsSubmitting(true);

        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const success = await addArticle({
            id: Date.now().toString(),
            slug: slug,
            title: formData.title,
            category: formData.category || categories[0] || 'Nasional',
            summary: formData.summary,
            excerpt: formData.excerpt,
            content: formData.content, // RichTextEditor returns HTML
            image: formData.images.length > 0 ? formData.images[0] : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
            gallery: formData.images,
            imageCaption: formData.imageCaption,
            imageCredit: formData.imageCredit,
            author: formData.author,
            status: formData.status as any,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            metaTitle: formData.metaTitle,
            metaDesc: formData.metaDesc,
            publishedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            readTime: calculateReadTime(formData.content)
        });

        setIsSubmitting(false);

        if (success) {
            localStorage.removeItem('editor_autosave_temp'); // Clear draft
            // Show toast or nice alert here later
            router.push('/admin');
        } else {
            alert('Gagal menerbitkan berita. Silakan coba lagi.');
        }
    };

    return (
        <FadeIn>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Content Column (Left - 2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Tulis Berita</h1>
                            <p className="text-white/40">Buat narasi baru untuk pembaca Serayu.</p>
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
                            placeholder="Ketik judul yang menarik..."
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
                            placeholder="Tulis ringkasan singkat untuk SEO dan preview..."
                            className="w-full bg-[#0a1214] border border-white/10 rounded-2xl p-6 text-base text-white placeholder:text-white/20 focus:border-cyan-500 focus:outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                            <FileText size={14} className="text-cyan-500" /> Konten Utama
                        </label>
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                            {/* Keep Editor white for "Paper" feel, or style to dark if preferred. Sticking to white for readability/WYSIWYG accuracy for now */}
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
                                <Save size={16} /> {isSubmitting ? 'Menyimpan...' : 'Simpan & Terbit'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
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
                                    <option value="" disabled className="bg-[#0a1214]">Pilih Kategori</option>
                                    {categories.map(c => <option key={c} value={c} className="bg-[#0a1214]">{c}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase">Tags</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none transition-colors"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="Viral, Tokoh, Wisata..."
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

                    {/* SEO Card Removed as per request */}
                </div>
            </form>
        </FadeIn>
    );
}
