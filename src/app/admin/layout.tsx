"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // If we are already on login page, don't check
        if (pathname === '/admin/login') {
            setChecking(false);
            return;
        }

        const token = localStorage.getItem('serayu_admin_token');
        if (!token) {
            window.location.href = '/admin/login';
        } else {
            setIsAuth(true);
            setChecking(false);
        }
    }, [pathname]);

    if (checking) return null; // Or loading spinner

    // If on login page, just render children (Login Form) without Sidebar
    if (pathname === '/admin/login') {
        return children;
    }

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: '📊' },
        { label: 'Tulis Berita', href: '/admin/create', icon: '✍️' },
        { label: 'Kategori', href: '/admin/categories', icon: '🏷️' },
        { label: 'Lihat Website', href: '/', icon: '👀' },
    ];

    return (
        <div className="admin-container" style={{ background: 'var(--bg-color)' }}>
            {/* Sidebar */}
            <aside className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>NusaDaily <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin</span></span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                    {menuItems.map(item => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    padding: '10px 16px', borderRadius: '12px',
                                    background: isActive ? 'var(--accent-blue)' : 'transparent',
                                    color: isActive ? 'white' : 'var(--text-secondary)',
                                    fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px',
                                    textDecoration: 'none', transition: 'all 0.2s'
                                }}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="desktop-only" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Logged in as <strong>Admin</strong>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-content" style={{ overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}
