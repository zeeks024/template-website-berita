"use client";

import { useState, useRef } from 'react';
import { validateImageFile, readFileAsDataURL, fitTo16By9, cropTo16By9 } from '@/lib/imageUtils';
import { Upload, X, Sparkles, Scissors, Loader2 } from 'lucide-react';

interface Props {
    values: string[];
    onChange: (values: string[]) => void;
}

export default function ImageUploader({ values, onChange }: Props) {
    const [dragActive, setDragActive] = useState(false);
    const [processing, setProcessing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;
        setProcessing(true);

        const newImages: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const error = validateImageFile(file);
            if (error) {
                alert(`File ${file.name}: ${error}`);
                continue;
            }

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
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`
                    border-2 border-dashed rounded-xl p-8 text-center cursor-pointer mb-4 transition-all
                    ${dragActive 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border bg-muted hover:border-muted-foreground/30 hover:bg-muted/80'
                    }
                `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleInputChange}
                    className="hidden"
                />

                {processing ? (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 size={20} className="animate-spin" />
                        <span className="text-sm">Memproses gambar...</span>
                    </div>
                ) : (
                    <div className="text-muted-foreground">
                        <Upload size={32} className="mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">Klik atau tarik gambar ke sini</p>
                        <p className="text-xs mt-1 opacity-60">Bisa upload banyak gambar (Max 10MB)</p>
                    </div>
                )}
            </div>

            {values.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {values.map((img, idx) => (
                        <div 
                            key={idx} 
                            className="relative bg-muted border border-border rounded-xl p-2 group"
                        >
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-3 right-3 z-10 w-6 h-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                            >
                                <X size={14} />
                            </button>

                            {idx === 0 && (
                                <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-primary text-primary-foreground text-2xs font-bold uppercase tracking-wider rounded">
                                    Cover
                                </span>
                            )}

                            <div 
                                className="h-24 bg-card rounded-lg mb-2 bg-contain bg-no-repeat bg-center"
                                style={{ backgroundImage: `url(${img})` }}
                            />

                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => applyEdit(idx, 'fit')}
                                    disabled={processing}
                                    className="flex-1 px-2 py-1.5 bg-muted hover:bg-muted/80 border border-border rounded-lg text-2xs font-medium text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                                >
                                    <Sparkles size={10} />
                                    Blur BG
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyEdit(idx, 'crop')}
                                    disabled={processing}
                                    className="flex-1 px-2 py-1.5 bg-muted hover:bg-muted/80 border border-border rounded-lg text-2xs font-medium text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                                >
                                    <Scissors size={10} />
                                    Crop
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
