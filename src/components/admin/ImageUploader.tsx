"use client";

import { useState, useRef } from 'react';
import { validateImageFile, readFileAsDataURL, fitTo16By9, uploadImage, uploadImageBlob } from '@/lib/imageUtils';
import { Upload, X, Sparkles, Scissors, Loader2 } from 'lucide-react';
import CropModal from './CropModal';

interface Props {
    values: string[];
    onChange: (values: string[]) => void;
}

export default function ImageUploader({ values, onChange }: Props) {
    const [dragActive, setDragActive] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [uploadingIndices, setUploadingIndices] = useState<Set<number>>(new Set());
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [cropImageIndex, setCropImageIndex] = useState<number | null>(null);
    const [previewImages, setPreviewImages] = useState<Map<number, string>>(new Map());
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: FileList | null) => {
        if (!files) return;
        setProcessing(true);

        const newUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const error = validateImageFile(file);
            if (error) {
                alert(`File ${file.name}: ${error}`);
                continue;
            }

            try {
                const url = await uploadImage(file);
                newUrls.push(url);
            } catch (err) {
                console.error(err);
                alert(`Gagal mengupload ${file.name}`);
            }
        }

        if (newUrls.length > 0) {
            onChange([...values, ...newUrls]);
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
        
        const newPreviews = new Map(previewImages);
        newPreviews.delete(index);
        setPreviewImages(newPreviews);
    };

    const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
        const response = await fetch(dataUrl);
        return response.blob();
    };

    const applyEdit = async (index: number, mode: 'fit' | 'crop') => {
        if (processing || uploadingIndices.has(index)) return;
        
        if (mode === 'crop') {
            setCropImageIndex(index);
            setCropModalOpen(true);
            return;
        }
        
        setUploadingIndices(prev => new Set(prev).add(index));
        try {
            const original = values[index];
            
            let sourceUrl = original;
            if (!original.startsWith('data:')) {
                const separator = original.includes('?') ? '&' : '?';
                const corsUrl = `${original}${separator}_cors=${Date.now()}`;
                const response = await fetch(corsUrl, { mode: 'cors' });
                const blob = await response.blob();
                sourceUrl = await readFileAsDataURL(new File([blob], 'image.jpg'));
            }
            
            const processedDataUrl = await fitTo16By9(sourceUrl);
            const blob = await dataUrlToBlob(processedDataUrl);
            const newUrl = await uploadImageBlob(blob, `processed-${Date.now()}.jpg`);

            const newValues = [...values];
            newValues[index] = newUrl;
            onChange(newValues);
        } catch (e) {
            alert("Gagal mengedit gambar");
            console.error(e);
        } finally {
            setUploadingIndices(prev => {
                const next = new Set(prev);
                next.delete(index);
                return next;
            });
        }
    };

    const handleCropComplete = async (croppedImageDataUrl: string) => {
        if (cropImageIndex === null) return;
        
        const index = cropImageIndex;
        setCropModalOpen(false);
        setCropImageIndex(null);
        
        setUploadingIndices(prev => new Set(prev).add(index));
        try {
            const blob = await dataUrlToBlob(croppedImageDataUrl);
            const newUrl = await uploadImageBlob(blob, `cropped-${Date.now()}.jpg`);
            
            const newValues = [...values];
            newValues[index] = newUrl;
            onChange(newValues);
        } catch (e) {
            alert("Gagal mengupload gambar yang sudah di-crop");
            console.error(e);
        } finally {
            setUploadingIndices(prev => {
                const next = new Set(prev);
                next.delete(index);
                return next;
            });
        }
    };

    const getImageSrc = (img: string, index: number): string => {
        if (previewImages.has(index)) {
            return previewImages.get(index)!;
        }
        return img;
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
                        <span className="text-sm">Mengupload gambar...</span>
                    </div>
                ) : (
                    <div className="text-muted-foreground">
                        <Upload size={32} className="mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">Klik atau tarik gambar ke sini</p>
                        <p className="text-xs mt-1 opacity-60">Format: JPG, PNG, WEBP • Maks 5MB per file</p>
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

                            {uploadingIndices.has(idx) && (
                                <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center z-20">
                                    <Loader2 size={24} className="animate-spin text-primary" />
                                </div>
                            )}

                            <div 
                                className="h-24 bg-card rounded-lg mb-2 bg-contain bg-no-repeat bg-center"
                                style={{ backgroundImage: `url(${getImageSrc(img, idx)})` }}
                            />

                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => applyEdit(idx, 'fit')}
                                    disabled={processing || uploadingIndices.has(idx)}
                                    className="flex-1 p-2 bg-muted hover:bg-primary/10 border border-border hover:border-primary/50 rounded-lg text-muted-foreground hover:text-primary transition-all flex items-center justify-center disabled:opacity-50"
                                    title="Blur Background"
                                >
                                    <Sparkles size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyEdit(idx, 'crop')}
                                    disabled={processing || uploadingIndices.has(idx)}
                                    className="flex-1 p-2 bg-muted hover:bg-primary/10 border border-border hover:border-primary/50 rounded-lg text-muted-foreground hover:text-primary transition-all flex items-center justify-center disabled:opacity-50"
                                    title="Crop Image"
                                >
                                    <Scissors size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cropModalOpen && cropImageIndex !== null && (
                <CropModal
                    imageSrc={(() => {
                        const src = values[cropImageIndex];
                        if (src.startsWith('data:')) return src;
                        const separator = src.includes('?') ? '&' : '?';
                        return `${src}${separator}_cors=${Date.now()}`;
                    })()}
                    onClose={() => {
                        setCropModalOpen(false);
                        setCropImageIndex(null);
                    }}
                    onCropComplete={handleCropComplete}
                />
            )}
        </div>
    );
}
