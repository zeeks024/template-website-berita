"use client";

import { useState, useRef } from 'react';
import { validateImageFile, readFileAsDataURL, fitTo16By9, cropTo16By9 } from '@/lib/imageUtils';

interface Props {
    values: string[];
    onChange: (values: string[]) => void;
}

export default function ImageUploader({ values, onChange }: Props) {
    const [dragActive, setDragActive] = useState(false);
    const [processing, setProcessing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- File Handlers ---

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;
        setProcessing(true);

        const newImages: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // 1. Validation
            const error = validateImageFile(file);
            if (error) {
                alert(`File ${file.name}: ${error}`);
                continue;
            }

            // 2. Read
            try {
                const dataUrl = await readFileAsDataURL(file);
                newImages.push(dataUrl);
            } catch (err) {
                console.error(err);
                alert("Gagal membaca file.");
            }
        }

        if (newImages.length > 0) {
            onChange([...values, ...newImages]);
        }
        setProcessing(false);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    // --- Edit Handlers ---

    const removeImage = (index: number) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        onChange(newValues);
    };

    const applyEdit = async (index: number, mode: 'fit' | 'crop') => {
        if (processing) return;
        setProcessing(true);
        try {
            const original = values[index];
            let result = original;

            if (mode === 'fit') {
                result = await fitTo16By9(original);
            } else {
                result = await cropTo16By9(original);
            }

            const newValues = [...values];
            newValues[index] = result;
            onChange(newValues);
        } catch (e) {
            alert("Gagal mengedit gambar");
            console.error(e);
        }
        setProcessing(false);
    };

    return (
        <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Galeri Gambar (Max 10MB)</label>

            {/* Drop Zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                style={{
                    border: `2px dashed ${dragActive ? 'var(--accent-blue)' : 'var(--glass-border)'}`,
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: dragActive ? 'rgba(59, 130, 246, 0.1)' : 'var(--glass-bg)',
                    marginBottom: '1rem',
                    position: 'relative'
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                />

                {processing ? (
                    <span>Memproses gambar...</span>
                ) : (
                    <div style={{ color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>📂</span>
                        Klik atau Tarik gambar ke sini (Bisa banyak)
                    </div>
                )}
            </div>

            {/* Gallery Grid */}
            {values.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                    {values.map((img, idx) => (
                        <div key={idx} className="glass-panel" style={{ padding: '0.5rem', position: 'relative' }}>
                            {/* Toolbar */}
                            <div style={{
                                position: 'absolute', top: 5, right: 5, zIndex: 10, display: 'flex', gap: '4px'
                            }}>
                                <button type="button" onClick={() => removeImage(idx)} style={{ background: 'red', color: 'white', border: 'none', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer' }}>×</button>
                            </div>

                            {/* Image Preview */}
                            <div style={{
                                height: '100px', backgroundColor: '#000', borderRadius: '6px', marginBottom: '0.5rem',
                                backgroundImage: `url(${img})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
                            }}></div>

                            {/* Edit Controls */}
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <button type="button" onClick={() => applyEdit(idx, 'fit')} className="btn-secondary" style={{ fontSize: '10px', flex: 1, padding: '4px' }}>
                                    ✨ Blur BG
                                </button>
                                <button type="button" onClick={() => applyEdit(idx, 'crop')} className="btn-secondary" style={{ fontSize: '10px', flex: 1, padding: '4px' }}>
                                    ✂ Crop
                                </button>
                            </div>

                            {idx === 0 && (
                                <span style={{ position: 'absolute', top: 5, left: 5, background: 'var(--accent-blue)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>
                                    Cover
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
