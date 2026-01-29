"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../UserContext';
import { Card, SectionHeader } from '@/components/admin/ui';
import { Settings, Save, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Image from 'next/image';

type SiteSettings = {
    id: string;
    heroTitle: string;
    heroDescription: string;
    sectionOpini: string;
    sectionCerita: string;
    sectionSosok: string;
    sectionPotensi: string;
    statsDesaWisata: string;
    statsLabel: string;
    quoteText: string;
    quoteAuthor: string;
    contactAddress: string;
    contactPhone: string;
    contactEmail: string;
    sosokImageUrl: string | null;
    socialFacebook: string | null;
    socialInstagram: string | null;
    socialTwitter: string | null;
    socialYoutube: string | null;
};

export default function SettingsPage() {
    const user = useUser();
    const router = useRouter();
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user.role !== 'ADMIN') {
            router.replace('/admin');
            return;
        }
        fetchSettings();
    }, [user.role, router]);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' });
            } else {
                const data = await res.json();
                setMessage({ type: 'error', text: data.error || 'Gagal menyimpan pengaturan.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Terjadi kesalahan.' });
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: keyof SiteSettings, value: string) => {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                updateField('sosokImageUrl', data.url);
                setMessage({ type: 'success', text: 'Gambar berhasil diupload!' });
            } else {
                const data = await res.json();
                setMessage({ type: 'error', text: data.error || 'Gagal upload gambar.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Terjadi kesalahan saat upload.' });
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    if (user.role !== 'ADMIN') return null;
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <Settings size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Gagal memuat pengaturan.</p>
            </div>
        );
    }

    const inputClass = "w-full px-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-colors";
    const labelClass = "block text-sm font-medium text-foreground mb-2";

    return (
        <FadeIn>
            <div className="max-w-4xl">
                <SectionHeader
                    title="Pengaturan Situs"
                    subtitle="Kelola konten homepage dan informasi situs."
                />

                {message && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                        message.type === 'success' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-500" />
                            Hero Section
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Judul Hero</label>
                                <input
                                    value={settings.heroTitle}
                                    onChange={e => updateField('heroTitle', e.target.value)}
                                    className={inputClass}
                                    placeholder="Cerita dari Serayu."
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi Hero</label>
                                <textarea
                                    value={settings.heroDescription}
                                    onChange={e => updateField('heroDescription', e.target.value)}
                                    className={`${inputClass} min-h-[100px]`}
                                    placeholder="Mengangkat opini, cerita inspiratif..."
                                />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                            Label Section
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Section Opini</label>
                                <input
                                    value={settings.sectionOpini}
                                    onChange={e => updateField('sectionOpini', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Section Cerita</label>
                                <input
                                    value={settings.sectionCerita}
                                    onChange={e => updateField('sectionCerita', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Section Sosok</label>
                                <input
                                    value={settings.sectionSosok}
                                    onChange={e => updateField('sectionSosok', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Section Potensi</label>
                                <input
                                    value={settings.sectionPotensi}
                                    onChange={e => updateField('sectionPotensi', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Statistik & Quote
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className={labelClass}>Angka Statistik</label>
                                <input
                                    value={settings.statsDesaWisata}
                                    onChange={e => updateField('statsDesaWisata', e.target.value)}
                                    className={inputClass}
                                    placeholder="266"
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Label Statistik</label>
                                <input
                                    value={settings.statsLabel}
                                    onChange={e => updateField('statsLabel', e.target.value)}
                                    className={inputClass}
                                    placeholder="Desa Wisata"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Teks Quote</label>
                                <textarea
                                    value={settings.quoteText}
                                    onChange={e => updateField('quoteText', e.target.value)}
                                    className={`${inputClass} min-h-[80px]`}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Author Quote</label>
                                <input
                                    value={settings.quoteAuthor}
                                    onChange={e => updateField('quoteAuthor', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            Informasi Kontak
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Alamat</label>
                                <input
                                    value={settings.contactAddress}
                                    onChange={e => updateField('contactAddress', e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Telepon</label>
                                    <input
                                        value={settings.contactPhone}
                                        onChange={e => updateField('contactPhone', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input
                                        value={settings.contactEmail}
                                        onChange={e => updateField('contactEmail', e.target.value)}
                                        className={inputClass}
                                        type="email"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Media Sosial & Gambar
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Gambar Sosok</label>
                                <div className="space-y-3">
                                    <div className="flex gap-3">
                                        <input
                                            value={settings.sosokImageUrl || ''}
                                            onChange={e => updateField('sosokImageUrl', e.target.value)}
                                            className={`${inputClass} flex-1`}
                                            placeholder="https://images.unsplash.com/... atau upload gambar"
                                        />
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="px-4 py-3 bg-muted hover:bg-muted/80 disabled:opacity-50 border border-border rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
                                        >
                                            {uploading ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Upload size={16} />
                                            )}
                                            Upload
                                        </button>
                                    </div>
                                    {settings.sosokImageUrl && (
                                        <div className="relative inline-block">
                                            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-border">
                                                <Image
                                                    src={settings.sosokImageUrl}
                                                    alt="Preview Sosok"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => updateField('sosokImageUrl', '')}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Facebook URL</label>
                                    <input
                                        value={settings.socialFacebook || ''}
                                        onChange={e => updateField('socialFacebook', e.target.value)}
                                        className={inputClass}
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Instagram URL</label>
                                    <input
                                        value={settings.socialInstagram || ''}
                                        onChange={e => updateField('socialInstagram', e.target.value)}
                                        className={inputClass}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Twitter URL</label>
                                    <input
                                        value={settings.socialTwitter || ''}
                                        onChange={e => updateField('socialTwitter', e.target.value)}
                                        className={inputClass}
                                        placeholder="https://twitter.com/..."
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>YouTube URL</label>
                                    <input
                                        value={settings.socialYoutube || ''}
                                        onChange={e => updateField('socialYoutube', e.target.value)}
                                        className={inputClass}
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-600/50 text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:hover:scale-100"
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Simpan Pengaturan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </FadeIn>
    );
}
