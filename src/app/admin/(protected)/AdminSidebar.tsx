"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, PenTool, FolderOpen, Users, ExternalLink, LogOut, Mountain, Menu, X } from 'lucide-react';
import { UserProvider, type AuthUser } from './UserContext';

export default function AdminSidebar({ 
  children,
  user 
}: { 
  children: React.ReactNode;
  user: AuthUser;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            window.location.href = '/admin/login';
        }
    };

    const isAdmin = user.role === 'ADMIN';
    
    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
        { label: 'Tulis Artikel', href: '/admin/create', icon: <PenTool size={20} /> },
        ...(isAdmin ? [
            { label: 'Kategori', href: '/admin/categories', icon: <FolderOpen size={20} /> },
            { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
        ] : []),
    ];

    return (
        <div className="min-h-screen bg-admin-bg flex flex-col lg:flex-row">
            <header className="lg:hidden border-b border-white/5 bg-admin-surface p-4 flex items-center justify-between sticky top-0 z-50">
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

            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            <aside className={`
                fixed lg:sticky top-0 h-screen w-64 bg-admin-surface border-r border-white/5 flex flex-col z-50 transition-transform duration-300
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-8 border-b border-white/5 hidden lg:block">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Mountain size={24} className="text-cyan-500" />
                        <span className="text-lg font-bold tracking-tight uppercase text-white">
                            Banjar<span className="text-cyan-500">negara.</span>
                        </span>
                    </Link>
                    <span className="text-2xs font-bold uppercase tracking-widest text-white/30 mt-2 block pl-8">
                        {isAdmin ? 'Admin Console' : 'Penulis Console'}
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
                    <div className="mb-4 px-4 py-2 bg-white/5 rounded-lg">
                        <p className="text-xs text-white/40">Logged in as</p>
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-2xs font-bold uppercase tracking-wider ${
                            isAdmin ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                            {isAdmin ? 'Admin' : 'Penulis'}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full rounded-xl font-medium text-sm text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={20} />
                        Keluar
                    </button>
                </div>
            </aside>

            <main className="flex-1 lg:ml-0 p-4 lg:p-12 w-full overflow-x-hidden">
                <div className="max-w-6xl mx-auto">
                    <UserProvider user={user}>
                        {children}
                    </UserProvider>
                </div>
            </main>
        </div>
    );
}
