"use client";

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function HorizontalScroll({ children, className = '' }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        
        checkScroll();
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        
        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = scrollRef.current.clientWidth * 0.8;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative group/scroll">
            <div
                ref={scrollRef}
                className={`flex overflow-x-auto snap-x snap-mandatory no-scrollbar ${className}`}
            >
                {children}
            </div>

            {canScrollLeft && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-cyan-500 hover:border-cyan-500"
                    aria-label="Scroll kiri"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-cyan-500 hover:border-cyan-500"
                    aria-label="Scroll kanan"
                >
                    <ChevronRight size={24} />
                </button>
            )}

            <div className="flex justify-center gap-2 mt-6 md:hidden">
                <span className="text-white/40 text-xs font-medium flex items-center gap-2">
                    <ChevronLeft size={14} />
                    Geser
                    <ChevronRight size={14} />
                </span>
            </div>
        </div>
    );
}
