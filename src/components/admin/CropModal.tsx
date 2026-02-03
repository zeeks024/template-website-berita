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
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <div 
                    className="relative w-full max-w-2xl bg-card rounded-2xl overflow-hidden shadow-2xl border border-border"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-foreground">Crop Gambar</h3>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                            {detectedOrientation === 'portrait' ? 'Portrait' : 'Landscape'} terdeteksi
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                        aria-label="Tutup"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="relative w-full h-[400px] bg-muted">
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
                            cropAreaStyle: { border: '2px solid #06b6d4' },
                        }}
                    />
                </div>

                <div className="p-4 border-t border-border space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-medium">Rasio:</span>
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => setAspectMode('landscape')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                                    aspectMode === 'landscape' 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <RectangleHorizontal size={14} />
                                16:9
                            </button>
                            <button
                                type="button"
                                onClick={() => setAspectMode('portrait')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                                    aspectMode === 'portrait' 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <RectangleVertical size={14} />
                                9:16
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <ZoomOut size={16} className="text-muted-foreground" />
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.05}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <ZoomIn size={16} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground w-12 text-right">
                            {Math.round(zoom * 100)}%
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-muted hover:bg-muted/80 border border-border rounded-xl text-sm font-medium transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isProcessing || !croppedAreaPixels}
                            className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <span>Memproses...</span>
                            ) : (
                                <>
                                    <Check size={16} />
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
