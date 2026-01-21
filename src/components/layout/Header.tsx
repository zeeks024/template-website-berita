"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Mountain } from 'lucide-react';
import SearchModal from '@/components/ui/SearchModal';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Keyboard Shortcut: Ctrl + K / Cmd + K
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Don't render global header on admin pages
    if (pathname?.startsWith('/admin')) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const categories = ["Beranda", "Cerita", "Opini", "Sosok", "Sudut Kota", "Potensi"];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-4 lg:px-12 flex justify-center ${scrolled ? 'pt-4' : 'pt-6'
                }`}>
                <div className={`w-full max-w-[1600px] flex justify-between items-center transition-all duration-500 ${scrolled
                    ? 'bg-[#0a1214]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-black/50 max-w-5xl'
                    : 'bg-transparent py-4'
                    }`}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
                        <Mountain size={24} className="text-cyan-500" />
                        <span className="text-xl font-bold tracking-tight uppercase text-white">
                            Svara<span className="text-cyan-500">Serayu.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/60">
                        {categories.map(item => (
                            <Link
                                key={item}
                                href={item === "Beranda" ? "/" : `/category/${item.toLowerCase().replace(' ', '-')}`}
                                className="hover:text-cyan-400 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:flex p-2.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all items-center gap-2 group"
                        >
                            <Search size={18} />
                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">CTRL+K</span>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="px-5 py-2 bg-white text-black rounded-full font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 group"
                        >
                            Menu <Menu size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Instant Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#05090a]/95 backdrop-blur-xl z-[100] animate-in fade-in duration-300">
                    <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-20">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-4 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-all border border-white/5 group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>

                    <div className="h-full w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-center relative">
                        {/* Background Deco */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                        <div className="flex flex-col items-center justify-center relative z-10 w-full text-center">
                            {/* Navigation */}
                            <div className="flex flex-col space-y-4">
                                {categories.map((item, i) => (
                                    <div key={item} className="overflow-hidden flex justify-center">
                                        <Link
                                            href={item === "Beranda" ? "/" : `/category/${item.toLowerCase().replace(' ', '-')}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-transparent transition-all duration-500 hover:tracking-normal relative group-hover:text-cyan-400 py-2"
                                            style={{
                                                WebkitTextStroke: '1px rgba(255,255,255,0.5)',
                                            }}
                                        >
                                            <span className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none" aria-hidden="true">
                                                {item}
                                            </span>
                                            <span className="relative z-10 group-hover:text-transparent bg-clip-text bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 transition-colors">
                                                {item}
                                            </span>
                                            <span className="text-sm font-bold tracking-widest text-cyan-500 absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden lg:block" style={{ WebkitTextStroke: '0px' }}>
                                                0{i + 1}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
