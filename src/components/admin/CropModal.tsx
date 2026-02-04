"use client";

import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import { X, Check, ZoomIn, ZoomOut, RectangleHorizontal, RectangleVertical } from 'lucide-react';
import { cropToRegion } from '@/lib/imageUtils';
import Portal from '@/components/ui/Portal';

type AspectMode = 'landscape' | 'portrait' | 'free';

interface CropModalProps {
    imageSrc: string;
    onClose: () => void;
    onCropComplete: (croppedImageDataUrl: string) => void;
}

const ASPECT_CONFIGS = {
    landscape: { ratio: 16 / 9, width: 1280, height: 720, label: 'Landscape 16:9' },
    portrait: { ratio: 9 / 16, width: 720, height: 1280, label: 'Portrait 9:16' },
    free: { ratio: undefined, width: 1280, height: 720, label: 'Bebas' },
};

export default function CropModal({ imageSrc, onClose, onCropComplete }: CropModalProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [aspectMode, setAspectMode] = useState<AspectMode>('landscape');
    const [detectedOrientation, setDetectedOrientation] = useState<'landscape' | 'portrait'>('landscape');

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            const isPortrait = img.height > img.width;
            setDetectedOrientation(isPortrait ? 'portrait' : 'landscape');
            setAspectMode(isPortrait ? 'portrait' : 'landscape');
        };
        img.src = imageSrc;
    }, [imageSrc]);

    const handleCropComplete = useCallback(
        (_croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleSave = useCallback(async () => {
        if (!croppedAreaPixels) return;
        setIsProcessing(true);
        try {
            const config = ASPECT_CONFIGS[aspectMode];
            const croppedDataUrl = await cropToRegion(
                imageSrc, 
                croppedAreaPixels,
                config.width,
                config.height
            );
            onCropComplete(croppedDataUrl);
            onClose();
        } catch (error) {
            console.error('Crop error:', error);
            alert('Gagal memproses gambar');
        } finally {
            setIsProcessing(false);
        }
    }, [imageSrc, croppedAreaPixels, aspectMode, onCropComplete, onClose]);

    useEffect(() => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
    }, [imageSrc, aspectMode]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Enter') handleSave();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, handleSave]);

    const currentConfig = ASPECT_CONFIGS[aspectMode];

    return (
        <Portal>
            <div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-background/90 backdrop-blur-md"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <div 
                    className="relative w-full max-w-xl bg-card rounded-xl overflow-hidden shadow-xl border border-border"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-muted/30">
                        <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-muted rounded">
                            {detectedOrientation === 'portrait' ? 'Portrait' : 'Landscape'}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-muted rounded-md transition-colors"
                            aria-label="Tutup"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="relative w-full h-[320px] bg-muted">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={currentConfig.ratio}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                            showGrid={true}
                            style={{
                                containerStyle: { backgroundColor: 'hsl(var(--muted))' },
                                cropAreaStyle: { 
                                    border: '2px solid hsl(var(--primary))',
                                    borderRadius: '4px',
                                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                                },
                            }}
                        />
                    </div>

                    <div className="px-3 py-2.5 border-t border-border space-y-2.5 bg-muted/30">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground font-medium min-w-[35px]">Rasio:</span>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => setAspectMode('landscape')}
                                    className={`px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 transition-colors ${
                                        aspectMode === 'landscape' 
                                            ? 'bg-primary text-primary-foreground shadow-sm' 
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                                >
                                    <RectangleHorizontal size={12} />
                                    16:9
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAspectMode('portrait')}
                                    className={`px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 transition-colors ${
                                        aspectMode === 'portrait' 
                                            ? 'bg-primary text-primary-foreground shadow-sm' 
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                                >
                                    <RectangleVertical size={12} />
                                    9:16
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground font-medium min-w-[35px]">Zoom:</span>
                            <ZoomOut size={12} className="text-muted-foreground flex-shrink-0" />
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.05}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="flex-1 h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                            />
                            <ZoomIn size={12} className="text-muted-foreground flex-shrink-0" />
                            <span className="text-[10px] text-muted-foreground w-9 text-right font-medium">
                                {Math.round(zoom * 100)}%
                            </span>
                        </div>

                        <div className="flex gap-2 pt-1">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs font-medium transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isProcessing || !croppedAreaPixels}
                                className="flex-1 px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <span>Memproses...</span>
                                ) : (
                                    <>
                                        <Check size={14} />
                                        <span>Terapkan</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
