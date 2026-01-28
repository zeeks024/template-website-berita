"use client";

import { useState } from 'react';
import { useNews } from '@/hooks/useNews';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import { useUser } from '../UserContext';
import Link from 'next/link';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { calculateReadTime } from '@/lib/dateUtils';
import { 
    Send, X, Rocket, Settings2, PenLine, 
    AlignLeft, Newspaper, ImagePlus, Hash,
    FolderOpen, ChevronDown, ArrowLeft, Sparkles, Star
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { Card, SectionHeader } from '@/components/admin/ui';

export default function CreateArticlePage() {
    const { addArticle } = useNews();
    const { categories } = useCategories();
    const router = useRouter();
    const user = useUser();
    const isAdmin = user.role === 'ADMIN';
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
        metaDesc: '',
        featured: false
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
            content: formData.content,
            image: formData.images.length > 0 ? formData.images[0] : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80',
            gallery: formData.images,
            imageCaption: formData.imageCaption,
            imageCredit: formData.imageCredit,
            author: formData.author,
            status: formData.status as 'draft' | 'published' | 'archived',
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            metaTitle: formData.metaTitle,
            metaDesc: formData.metaDesc,
            featured: formData.featured,
            publishedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            readTime: calculateReadTime(formData.content)
        });

        setIsSubmitting(false);

        if (success) {
            localStorage.removeItem('editor_autosave_temp');
            router.push('/admin');
        } else {
            alert('Gagal menerbitkan berita. Silakan coba lagi.');
        }
    };

    return (
        <FadeIn>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <SectionHeader
                        title="Tulis Berita Baru"
                        subtitle="Buat narasi menarik untuk pembaca Serayu."
                        action={
                            <Link 
                                href="/admin" 
                                className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
                            >
                                <ArrowLeft size={16} />
                                Kembali
                            </Link>
                        }
                    />

                    <Card>
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                                    <PenLine size={14} className="text-cyan-500" /> 
                                    Judul Artikel
                                    <span className="text-red-400">*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ketik judul yang menarik..."
                                    className="w-full bg-muted border border-border rounded-xl p-5 text-xl font-bold text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                                    <AlignLeft size={14} className="text-cyan-500" /> 
                                    Ringkasan (Excerpt)
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Tulis ringkasan singkat untuk SEO dan preview..."
                                    className="w-full bg-muted border border-border rounded-xl p-5 text-base text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="border border-border rounded-[2rem] bg-card overflow-hidden">
                        <div className="border-b border-border px-6 py-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Newspaper size={14} className="text-cyan-500" />
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Konten Utama
                                </span>
                                <span className="text-red-400">*</span>
                            </div>
                            <div className="h-10 w-full border border-border rounded-lg bg-muted flex items-center px-4">
                                <span className="text-sm text-muted-foreground truncate">
                                    {formData.title || 'Judul artikel akan muncul di sini...'}
                                </span>
                            </div>
                        </div>

                        <div className="min-h-[420px]">
                            <RichTextEditor value={formData.content} onChange={val => setFormData({ ...formData, content: val })} />
                        </div>
                    </div>

                    <Card>
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                            <ImagePlus size={14} className="text-cyan-500" /> 
                            Media & Gambar
                        </label>
                        <ImageUploader values={formData.images} onChange={(vals) => setFormData({ ...formData, images: vals })} />
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <input
                                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-all"
                                placeholder="Caption gambar..."
                                value={formData.imageCaption}
                                onChange={e => setFormData({ ...formData, imageCaption: e.target.value })}
                            />
                            <input
                                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-all"
                                placeholder="Kredit foto (opsional)..."
                                value={formData.imageCredit}
                                onChange={e => setFormData({ ...formData, imageCredit: e.target.value })}
                            />
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="sticky top-8 border-cyan-500/20 bg-gradient-to-b from-admin-surface to-admin-surface/80">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                <Rocket className="text-cyan-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-sm">Publikasi</h3>
                                <p className="text-muted-foreground text-xs">Atur status artikel</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                                    <Sparkles size={12} /> Status
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full appearance-none bg-muted border border-border rounded-xl px-4 py-3 pr-10 text-sm text-foreground focus:border-cyan-500 focus:outline-none cursor-pointer transition-all [&>option]:bg-[hsl(var(--admin-surface))] [&>option]:text-foreground"
                                    >
                                        <option value="draft">Draft (Konsep)</option>
                                        <option value="published">Terbitkan Sekarang</option>
                                        <option value="archived">Arsipkan</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                </div>
                            </div>

                            {isAdmin && (
                                <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <Star size={14} className="text-amber-400" />
                                        <span className="text-sm text-foreground/80">Pilihan Editor</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                                        className={`relative w-11 h-6 rounded-full transition-all ${
                                            formData.featured 
                                                ? 'bg-amber-500' 
                                                : 'bg-muted'
                                        }`}
                                    >
                                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                                            formData.featured ? 'left-6' : 'left-1'
                                        }`} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                            >
                                <Send size={16} /> 
                                {isSubmitting ? 'Menyimpan...' : 'Terbitkan Artikel'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="w-full py-3 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                            >
                                <X size={16} /> Batal
                            </button>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <Settings2 className="text-emerald-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-sm">Pengaturan</h3>
                                <p className="text-muted-foreground text-xs">Kategori & metadata</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                                    <FolderOpen size={12} /> Kategori
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none bg-muted border border-border rounded-xl px-4 py-3 pr-10 text-sm text-foreground focus:border-cyan-500 focus:outline-none cursor-pointer transition-all [&>option]:bg-[hsl(var(--admin-surface))] [&>option]:text-foreground"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="" disabled>Pilih Kategori</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                                    <Hash size={12} /> Tags
                                </label>
                                <input
                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-all"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="Viral, Tokoh, Wisata..."
                                />
                                <p className="text-2xs text-muted-foreground">Pisahkan dengan koma</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                                    <PenLine size={12} /> Penulis
                                </label>
                                <input
                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-cyan-500 focus:outline-none transition-all"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </form>
        </FadeIn>
    );
}
