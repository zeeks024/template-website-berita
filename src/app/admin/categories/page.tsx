"use client";

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';

export default function CategoriesPage() {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCat, setNewCat] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCat.trim()) {
            addCategory(newCat.trim());
            setNewCat("");
        }
    };

    return (
        <div style={{ maxWidth: '600px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Manajemen Kategori</h1>

            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <input
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    placeholder="Nama Kategori Baru..."
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                />
                <button className="btn-primary">Tambah</button>
            </form>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                {categories.map((cat, index) => (
                    <div key={cat} style={{
                        padding: '1rem 2rem', borderBottom: '1px solid var(--glass-border)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <span style={{ fontWeight: 600 }}>{cat}</span>
                        <button
                            onClick={() => {
                                if (confirm(`Hapus kategori "${cat}"?`)) deleteCategory(cat);
                            }}
                            className="btn-secondary"
                            style={{ color: '#ef4444', borderColor: '#ef4444', fontSize: '12px', padding: '6px 12px' }}
                        >
                            Hapus
                        </button>
                    </div>
                ))}
                {categories.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Belum ada kategori custom.</div>}
            </div>
        </div>
    );
}
