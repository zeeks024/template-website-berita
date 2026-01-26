"use client";

import { useState } from 'react';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { Type, Eye } from 'lucide-react';

export default function AccessibilityMenu() {
    const { fontSize, setFontSize, highContrast, setHighContrast } = useAccessibility();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all border border-border cursor-pointer z-50"
                aria-label="Pengaturan Aksesibilitas"
                aria-expanded={isOpen}
            >
                <Type className="h-[1.2rem] w-[1.2rem] text-cyan-600 dark:text-cyan-400" />
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div 
                        className="absolute right-0 top-full mt-3 w-64 bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right"
                    >
                        <div className="p-5 space-y-5">
                            <div>
                                <label className="text-2xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                                    <Type size={12} />
                                    Ukuran Teks
                                </label>
                                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
                                    <button
                                        onClick={() => setFontSize('normal')}
                                        className={`flex-1 py-2 rounded-lg text-center transition-all text-xs font-medium ${
                                            fontSize === 'normal'
                                                ? 'bg-background text-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                        aria-pressed={fontSize === 'normal'}
                                    >
                                        <span className="text-sm">A</span>
                                    </button>
                                    <button
                                        onClick={() => setFontSize('large')}
                                        className={`flex-1 py-2 rounded-lg text-center transition-all text-xs font-medium ${
                                            fontSize === 'large'
                                                ? 'bg-background text-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                        aria-pressed={fontSize === 'large'}
                                    >
                                        <span className="text-base">A</span>
                                    </button>
                                    <button
                                        onClick={() => setFontSize('xlarge')}
                                        className={`flex-1 py-2 rounded-lg text-center transition-all text-xs font-medium ${
                                            fontSize === 'xlarge'
                                                ? 'bg-background text-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                        aria-pressed={fontSize === 'xlarge'}
                                    >
                                        <span className="text-lg">A</span>
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <button
                                    onClick={() => setHighContrast(!highContrast)}
                                    className="w-full flex items-center justify-between gap-3 group"
                                    aria-pressed={highContrast}
                                >
                                    <span className="flex items-center gap-2 text-2xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <Eye size={12} />
                                        Kontras Tinggi
                                    </span>
                                    <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                                        highContrast ? 'bg-cyan-500' : 'bg-muted'
                                    }`}>
                                        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                                            highContrast ? 'translate-x-4' : 'translate-x-0'
                                        }`} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
