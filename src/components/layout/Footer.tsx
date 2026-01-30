"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';

type FooterSettings = {
    contactAddress: string;
    contactPhone: string;
    contactEmail: string;
    socialFacebook: string | null;
    socialInstagram: string | null;
    socialTwitter: string | null;
    socialYoutube: string | null;
};

const DEFAULT_SETTINGS: FooterSettings = {
    contactAddress: 'Jl. Dipayuda No. 12, Banjarnegara, Jawa Tengah 53412',
    contactPhone: '(0286) 591234',
    contactEmail: 'redaksi@derapserayu.com',
    socialFacebook: null,
    socialInstagram: null,
    socialTwitter: null,
    socialYoutube: null,
};

export default function Footer() {
    const pathname = usePathname();
    const [settings, setSettings] = useState<FooterSettings>(DEFAULT_SETTINGS);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.ok ? res.json() : DEFAULT_SETTINGS)
            .then(data => setSettings({
                contactAddress: data.contactAddress || DEFAULT_SETTINGS.contactAddress,
                contactPhone: data.contactPhone || DEFAULT_SETTINGS.contactPhone,
                contactEmail: data.contactEmail || DEFAULT_SETTINGS.contactEmail,
                socialFacebook: data.socialFacebook,
                socialInstagram: data.socialInstagram,
                socialTwitter: data.socialTwitter,
                socialYoutube: data.socialYoutube,
            }))
            .catch(() => setSettings(DEFAULT_SETTINGS));
    }, []);

    // Hide on admin pages
    if (pathname?.startsWith('/admin')) return null;

    const socialLinks = [
        { Icon: Instagram, url: settings.socialInstagram },
        { Icon: Twitter, url: settings.socialTwitter },
        { Icon: Facebook, url: settings.socialFacebook },
        { Icon: Youtube, url: settings.socialYoutube },
    ];

    return (
        <footer className="bg-background border-t border-border pt-24 pb-12 relative overflow-hidden z-10">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 dark:bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">

                    {/* Column 1: Brand (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <Image 
                                src="/icon.png" 
                                alt="Derap Serayu" 
                                width={40} 
                                height={40} 
                                className="w-10 h-10 object-contain"
                                unoptimized
                            />
                            <span className="text-2xl font-serif font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                Derap<span className="text-primary">Serayu</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                            Suara dari jantung Banjarnegara. Mengabarkan kebenaran, mengangkat potensi, dan merayakan keberagaman budaya lokal dengan jurnalisme yang mendalam.
                        </p>
<div className="flex gap-3">
                            {socialLinks.map(({ Icon, url }, i) => (
                                <a 
                                    key={i} 
                                    href={url || '#'} 
                                    target={url ? '_blank' : undefined}
                                    rel={url ? 'noopener noreferrer' : undefined}
                                    className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Rubrik (2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Rubrik</h4>
                        <ul className="space-y-4">
                            {['Cerita', 'Opini', 'Sosok Inspiratif', 'Sudut Kota', 'Potensi', 'Galeri Foto'].map((item) => (
                                <li key={item}>
                                    <Link href={`/category/${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Tentang (2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
<h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tentang</h4>
                        <ul className="space-y-4">
                            {['Cari Artikel', 'Tentang Kami', 'Redaksi', 'Pedoman Siber', 'Hubungi Kami'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Cari Artikel' ? '/search' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (4 cols) */}
                    <div className="lg:col-span-4 space-y-8 pl-0 lg:pl-8">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Berlangganan</h4>
                            <p className="text-muted-foreground text-sm mb-6">Dapatkan rangkuman cerita terbaik Banjarnegara langsung di email Anda setiap minggu.</p>

                            <form className="relative group">
                                <input
                                    type="email"
                                    placeholder="Masukkan email anda..."
                                    className="w-full bg-muted/50 border border-border rounded-xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background outline-none transition-all pr-14"
                                />
                                <button className="absolute right-2 top-2 p-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded-lg transition-all">
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>

<div className="flex flex-col gap-4 text-sm text-muted-foreground pt-8 border-t border-border">
                            <div className="flex items-start gap-4">
                                <MapPin size={18} className="text-primary/50 mt-1 shrink-0" />
                                <span className="font-light">{settings.contactAddress}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone size={18} className="text-primary/50 shrink-0" />
                                <span className="font-light hover:text-primary transition-colors cursor-pointer">{settings.contactPhone}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail size={18} className="text-primary/50 shrink-0" />
                                <span className="font-light hover:text-primary transition-colors cursor-pointer">{settings.contactEmail}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex justify-center items-center">
                    <p className="text-muted-foreground/60 text-xs font-medium tracking-wide text-center">
                        &copy; {new Date().getFullYear()} Derap Serayu. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
