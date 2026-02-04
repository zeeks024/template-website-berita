"use client";

import { useState, use, useMemo, useEffect, useCallback } from 'react';
import { useNews } from '@/hooks/useNews';
import { useCategories } from '@/hooks/useCategories';
import { useAutosave } from '@/hooks/useAutosave';
import { useRouter } from 'next/navigation';
import { useUser } from '../../UserContext';
import Link from 'next/link';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { calculateReadTime } from '@/lib/dateUtils';
import {
    Save, X, Rocket, Settings2, PenLine,
    AlignLeft, Newspaper, ImagePlus, Hash,
    FolderOpen, ChevronDown, ArrowLeft, Sparkles,
    Edit3, Star,
    Cloud, CheckCircle, CloudOff, Eye
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { Card, SectionHeader, Badge } from '@/components/admin/ui';
import ArticlePreviewModal from '@/components/admin/ArticlePreviewModal';

type Props = {
    params: Promise<{ slug: string }>;
};

interface FormData {
    id: string;
    title: string;
    category: string;
    summary: string;
    excerpt: string;
    content: string;
    images: string[];
    imageCaption: string;
    imageCredit: string;
    author: string;
    status: string;
    tags: string;
    featured: boolean;
}

const getArray = (data: unknown): string[] => {
    if (Array.isArray(data)) return data as string[];
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

const getTagsString = (tagsRaw: unknown): string => {
    if (Array.isArray(tagsRaw)) {
        return tagsRaw.join(', ');
    }
    if (typeof tagsRaw === 'string') {
        try {
            const parsed = JSON.parse(tagsRaw);
            if (Array.isArray(parsed)) return parsed.join(', ');
            return tagsRaw;
        } catch {
            return tagsRaw;
        }
    }
    return '';
};

export default function EditArticlePage({ params }: Props) {
    const { slug } = use(params);
    const { allNews, updateArticle, loading } = useNews('all');
    const { categories } = useCategories();
    const router = useRouter();
    const user = useUser();
    const isAdmin = user.role === 'ADMIN';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formInitialized, setFormInitialized] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const foundArticle = useMemo(() => {
        if (loading || allNews.length === 0) return null;
        return allNews.find(n => n.slug === decodeURIComponent(slug)) || null;
    }, [loading, allNews, slug]);

    const initialFormData = useMemo<FormData>(() => {
        if (!foundArticle) {
            return {
                id: '',
                title: '',
                category: '',
                summary: '',
                excerpt: '',
                content: '',
                images: [],
                imageCaption: '',
                imageCredit: '',
                author: 'Admin Redaksi',
                status: 'published',
                tags: '',
                featured: false
            };
        }

        const galleryArray = getArray(foundArticle.gallery);
        const finalImages = galleryArray.length > 0 ? galleryArray : (foundArticle.image ? [foundArticle.image] : []);

        return {
            id: foundArticle.id,
            title: foundArticle.title,
            category: foundArticle.category,
            summary: foundArticle.summary,
            excerpt: foundArticle.excerpt || '',
            content: foundArticle.content,
            images: finalImages,
            imageCaption: foundArticle.imageCaption || '',
            imageCredit: foundArticle.imageCredit || '',
            author: foundArticle.author,
            status: foundArticle.status || 'draft',
            tags: getTagsString(foundArticle.tags),
            featured: foundArticle.featured || false
        };
    }, [foundArticle]);

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleRestore = useCallback((data: FormData) => {
        setFormData(data);
    }, []);

    const { status: autosaveStatus, lastSaved, clear: clearAutosave } = useAutosave({
        key: `article_edit_${slug}`,
        data: formData,
        enabled: formInitialized && (formData.title.length > 0 || formData.content.length > 0),
        debounceMs: 2000,
        onRestore: handleRestore
    });

    useEffect(() => {
        if (foundArticle && !formInitialized) {
            setFormData(initialFormData);
            setFormInitialized(true);
        }
    }, [foundArticle, initialFormData, formInitialized]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;
        setIsSubmitting(true);

        const result = await updateArticle({
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
            status: formData.status as 'draft' | 'published' | 'archived',
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            featured: formData.featured,
            publishedAt: new Date().toISOString(),
            readTime: calculateReadTime(formData.content)
        });

        setIsSubmitting(false);

        if (result.success) {
            clearAutosave();
            router.push('/admin');
        } else {
            alert(result.error || 'Gagal menyimpan perubahan.');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-muted-foreground animate-pulse">
            Memuat data artikel...
        </div>
    );

    return (
        <FadeIn>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <SectionHeader
                        title="Edit Artikel"
                        subtitle="Perbarui konten artikel yang sudah ada."
                        action={
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {autosaveStatus === 'saving' && (
                                        <>
                                            <Cloud size={14} className="animate-pulse text-amber-500" />
                                            <span>Menyimpan...</span>
                                        </>
                                    )}
                                    {autosaveStatus === 'saved' && (
                                        <>
                                            <CheckCircle size={14} className="text-emerald-500" />
                                            <span>Tersimpan</span>
                                        </>
                                    )}
                                    {autosaveStatus === 'idle' && lastSaved && (
                                        <>
                                            <CloudOff size={14} />
                                            <span>Draft lokal</span>
                                        </>
                                    )}
                                </div>
                                <Badge variant="warning" dot>
                                    <Edit3 size={12} className="mr-1" />
                                    Mode Edit
                                </Badge>
                                <Link
                                    href="/admin"
                                    className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
                                >
                                    <ArrowLeft size={16} />
                                    Kembali
                                </Link>
                            </div>
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
                                    Ringkasan
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
                    <Card className="border-amber-500/20 bg-gradient-to-b from-admin-surface to-admin-surface/80">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Rocket className="text-amber-400" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-sm">Publikasi</h3>
                                <p className="text-muted-foreground text-xs">Simpan perubahan artikel</p>
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
                                        className={`relative w-11 h-6 rounded-full transition-all ${formData.featured
                                                ? 'bg-amber-500'
                                                : 'bg-muted'
                                            }`}
                                    >
                                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${formData.featured ? 'left-6' : 'left-1'
                                            }`} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => setShowPreview(true)}
                                disabled={!formData.title && !formData.content}
                                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Eye size={16} />
                                Preview
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                            >
                                <Save size={16} />
                                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/admin')}
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

            {showPreview && (
                <ArticlePreviewModal
                    data={formData}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </FadeIn>
    );
}
