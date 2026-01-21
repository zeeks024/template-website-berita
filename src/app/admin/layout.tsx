"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, PenTool, FolderOpen, ExternalLink, LogOut, Mountain, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Mock auth check for now
        setChecking(false);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (checking) return null;

    if (pathname === '/admin/login') {
        return children;
    }

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
        { label: 'Tulis Artikel', href: '/admin/create', icon: <PenTool size={20} /> },
        { label: 'Kategori', href: '/admin/categories', icon: <FolderOpen size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#05090a] flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="lg:hidden border-b border-white/5 bg-[#0a1214] p-4 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <Mountain size={20} className="text-cyan-500" />
                    <span className="font-bold tracking-tight uppercase text-white">
                        Banjar<span className="text-cyan-500">negara.</span>
                    </span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white/70 hover:text-white bg-white/5 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar Overlay (Mobile) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 h-screen w-64 bg-[#0a1214] border-r border-white/5 flex flex-col z-50 transition-transform duration-300
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-8 border-b border-white/5 hidden lg:block">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Mountain size={24} className="text-cyan-500" />
                        <span className="text-lg font-bold tracking-tight uppercase text-white">
                            Banjar<span className="text-cyan-500">negara.</span>
                        </span>
                    </Link>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-2 block pl-8">
                        Admin Console
                    </span>
                </div>

                <nav className="flex-1 p-6 space-y-2 mt-12 lg:mt-0">
                    {menuItems.map(item => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}

                    <a href="/" target="_blank" className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                        <ExternalLink size={20} />
                        Lihat Website
                    </a>
                </nav>

                <div className="p-6 border-t border-white/5">
                    <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl font-medium text-sm text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut size={20} />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-0 p-4 lg:p-12 w-full overflow-x-hidden">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
