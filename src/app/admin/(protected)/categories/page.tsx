"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories';
import { useUser } from '../UserContext';
import { Card, SectionHeader } from '@/components/admin/ui';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function CategoriesPage() {
    const user = useUser();
    const router = useRouter();
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCat, setNewCat] = useState("");

    useEffect(() => {
        if (user.role !== 'ADMIN') {
            router.replace('/admin');
        }
    }, [user.role, router]);

    if (user.role !== 'ADMIN') {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCat.trim()) {
            addCategory(newCat.trim());
            setNewCat("");
        }
    };

    return (
        <FadeIn>
            <div className="max-w-2xl">
                <SectionHeader
                    title="Manajemen Kategori"
                    subtitle="Kelola kategori artikel untuk portal berita."
                />

                <Card className="mb-6">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FolderOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                value={newCat}
                                onChange={e => setNewCat(e.target.value)}
                                placeholder="Nama kategori baru..."
                                className="w-full pl-11 pr-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                        >
                            <Plus size={16} />
                            Tambah
                        </button>
                    </form>
                </Card>

                <Card className="p-0 overflow-hidden">
                    {categories.length > 0 ? (
                        <div className="divide-y divide-border">
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    className="flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                            <FolderOpen size={14} />
                                        </div>
                                        <span className="text-foreground font-medium">{cat}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Hapus kategori "${cat}"?`)) deleteCategory(cat);
                                        }}
                                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={12} />
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-medium">Belum ada kategori.</p>
                            <p className="text-xs mt-1">Tambah kategori pertama di form atas.</p>
                        </div>
                    )}
                </Card>

                {categories.length > 0 && (
                    <p className="text-center text-muted-foreground text-xs mt-4 font-medium uppercase tracking-wider">
                        {categories.length} kategori terdaftar
                    </p>
                )}
            </div>
        </FadeIn>
    );
}
