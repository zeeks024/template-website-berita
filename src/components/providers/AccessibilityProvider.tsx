"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
    reducedMotion: boolean;
    highContrast: boolean;
    setHighContrast: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

const FONT_SIZE_KEY = 'serayu-font-size';
const HIGH_CONTRAST_KEY = 'serayu-high-contrast';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSizeState] = useState<FontSize>('normal');
    const [highContrast, setHighContrastState] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const savedFontSize = localStorage.getItem(FONT_SIZE_KEY) as FontSize;
        if (savedFontSize && ['normal', 'large', 'xlarge'].includes(savedFontSize)) {
            setFontSizeState(savedFontSize);
        }

        const savedHighContrast = localStorage.getItem(HIGH_CONTRAST_KEY);
        if (savedHighContrast === 'true') {
            setHighContrastState(true);
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);
        
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove('font-normal', 'font-large', 'font-xlarge');
        html.classList.add(`font-${fontSize}`);
        localStorage.setItem(FONT_SIZE_KEY, fontSize);
    }, [fontSize]);

    useEffect(() => {
        const html = document.documentElement;
        if (highContrast) {
            html.classList.add('high-contrast');
        } else {
            html.classList.remove('high-contrast');
        }
        localStorage.setItem(HIGH_CONTRAST_KEY, String(highContrast));
    }, [highContrast]);

    const setFontSize = (size: FontSize) => setFontSizeState(size);
    const setHighContrast = (enabled: boolean) => setHighContrastState(enabled);

    return (
        <AccessibilityContext.Provider value={{ fontSize, setFontSize, reducedMotion, highContrast, setHighContrast }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within AccessibilityProvider');
    }
    return context;
}
