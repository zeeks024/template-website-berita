"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, Menu, LogIn, LogOut, Bookmark, ChevronDown, LayoutDashboard, Sun, Moon, Type, Eye, Settings } from 'lucide-react';
import SettingsMenu from '@/components/ui/SettingsMenu';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';

const SearchModal = dynamic(() => import('@/components/ui/SearchModal'), {
    ssr: false,
    loading: () => null
});

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    const { user, isLoading: loading, logout } = useAuth();
    const { fontSize, setFontSize, highContrast, setHighContrast } = useAccessibility();
    const { theme, setTheme } = useTheme();

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
                } ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className={`w-full max-w-[1600px] flex justify-between items-center transition-all duration-500 ${scrolled
                    ? 'bg-background/80 backdrop-blur-xl border border-border rounded-full px-6 py-3 shadow-2xl shadow-black/5 dark:shadow-black/50 max-w-5xl'
                    : 'bg-transparent py-4'
                    }`}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group" onClick={scrollToTop}>
<Image 
                            src="/icon.png" 
                            alt="Derap Serayu" 
                            width={72} 
                            height={72} 
                            className="h-[72px] w-[72px] object-contain"
                            priority
                            unoptimized
                        />
                        <span className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            Derap<span className="text-cyan-600 dark:text-cyan-400">Serayu</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide text-muted-foreground">
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
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:flex p-2.5 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-all items-center gap-2 group"
                            aria-label="Buka pencarian (Ctrl+K)"
                        >
                            <Search size={18} />
                            <span className="text-2xs bg-muted px-1.5 py-0.5 rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity">CTRL+K</span>
                        </button>
                        <div className="hidden lg:block">
                            <SettingsMenu />
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="px-5 py-2 bg-foreground text-background rounded-full font-bold text-xs uppercase tracking-wider hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-2 group"
                            aria-label="Buka menu navigasi"
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
                            <Link
                                href="/search"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted transition-colors group mb-2 bg-cyan-500/10 border border-cyan-500/20"
                            >
                                <Search size={18} className="text-cyan-500" />
                                <span className="font-medium text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                    Cari Artikel
                                </span>
                            </Link>
                            {!loading && (
                                user ? (
                                    <div className="mb-2 pb-2 border-b border-border px-4 py-2">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800">
                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="font-medium truncate text-sm">{user.name}</p>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{user.role}</p>
                                            </div>
                                        </div>
                                        <Link 
                                            href="/saved"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                        >
                                            <Bookmark size={16} />
                                            Tersimpan
                                        </Link>
                                        {(user.role === 'ADMIN' || user.role === 'WRITER') && (
                                            <Link 
                                                href="/admin"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                            >
                                                <LayoutDashboard size={16} />
                                                Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="flex items-center gap-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 transition-colors w-full"
                                        >
                                            <LogOut size={16} />
                                            Keluar
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 font-medium hover:bg-cyan-600/20 transition-colors"
                                    >
                                        <LogIn size={18} />
                                        Masuk Akun
                                    </Link>
                                )
                            )}

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
                            
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted transition-colors group w-full"
                                >
                                    <Settings size={18} className="text-muted-foreground" />
                                    <span className="font-medium text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex-1 text-left">
                                        Pengaturan
                                    </span>
                                    <ChevronDown size={16} className={`text-muted-foreground transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {isSettingsOpen && (
                                    <div className="px-4 pb-3 space-y-4">
                                        <div>
                                            <label className="text-2xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                                                <Sun size={12} className="dark:hidden" />
                                                <Moon size={12} className="hidden dark:block" />
                                                Tema
                                            </label>
                                            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
                                                <button
                                                    onClick={() => setTheme('light')}
                                                    className={`flex-1 py-2 rounded-lg text-center transition-all text-xs font-medium flex items-center justify-center gap-2 ${
                                                        theme === 'light'
                                                            ? 'bg-background text-foreground shadow-sm'
                                                            : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                                >
                                                    <Sun size={14} />
                                                    Terang
                                                </button>
                                                <button
                                                    onClick={() => setTheme('dark')}
                                                    className={`flex-1 py-2 rounded-lg text-center transition-all text-xs font-medium flex items-center justify-center gap-2 ${
                                                        theme === 'dark'
                                                            ? 'bg-background text-foreground shadow-sm'
                                                            : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                                >
                                                    <Moon size={14} />
                                                    Gelap
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-2xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
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
                                                >
                                                    <span className="text-lg">A</span>
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setHighContrast(!highContrast)}
                                            className="w-full flex items-center justify-between gap-3"
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
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-t border-border bg-muted/30">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>DerapSerayu</span>
                                <span className="flex items-center gap-1">
                                    <Image src="/icon.png" alt="" width={12} height={12} className="opacity-70" />
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
