"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, Menu, X, Mountain } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import AccessibilityMenu from '@/components/ui/AccessibilityMenu';

const SearchModal = dynamic(() => import('@/components/ui/SearchModal'), {
    ssr: false,
    loading: () => null
});

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
                    ? 'bg-background/80 backdrop-blur-xl border border-border rounded-full px-6 py-3 shadow-2xl shadow-black/5 dark:shadow-black/50 max-w-5xl'
                    : 'bg-transparent py-4'
                    }`}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
                        <Mountain size={24} className="text-cyan-600 dark:text-cyan-400" />
                        <span className="text-xl font-serif font-bold tracking-tight text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            Derap<span className="text-cyan-600 dark:text-cyan-400">Serayu.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 text-2xs font-bold uppercase tracking-widest text-muted-foreground">
                        {categories.map(item => (
                            <Link
                                key={item}
                                href={item === "Beranda" ? "/" : `/category/${item.toLowerCase().replace(' ', '-')}`}
                                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-600 dark:bg-cyan-400 transition-all group-hover:w-full rounded-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <AccessibilityMenu />
                        <ThemeToggle />
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:flex p-2.5 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-all items-center gap-2 group"
                        >
                            <Search size={18} />
                            <span className="text-2xs bg-muted px-1.5 py-0.5 rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity">CTRL+K</span>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="px-5 py-2 bg-foreground text-background rounded-full font-bold text-xs uppercase tracking-wider hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-2 group"
                        >
                            Menu <Menu size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Instant Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Menu Dropdown */}
            {isMenuOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="fixed top-20 right-4 lg:right-12 w-72 max-h-[80vh] bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50 z-50 overflow-hidden overflow-y-auto animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="p-2">
                            {categories.map((item, i) => (
                                <Link
                                    key={item}
                                    href={item === "Beranda" ? "/" : `/category/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted transition-colors group"
                                >
                                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 w-5">0{i + 1}</span>
                                    <span className="font-medium text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {item}
                                    </span>
                                </Link>
                            ))}
                        </div>
                        <div className="p-4 border-t border-border bg-muted/30">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>DerapSerayu</span>
                                <span className="flex items-center gap-1">
                                    <Mountain size={12} className="text-cyan-600 dark:text-cyan-400" />
                                    Banjarnegara
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
