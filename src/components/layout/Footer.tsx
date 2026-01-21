"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mountain, Instagram, Twitter, Facebook, Youtube, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();

    // Hide on admin pages
    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer className="bg-[#020405] border-t border-white/5 pt-24 pb-12 relative overflow-hidden z-10">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">

                    {/* Column 1: Brand (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                <Mountain size={20} className="text-cyan-500" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase text-white">
                                Svara<span className="text-cyan-500">Serayu.</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-base leading-relaxed max-w-sm">
                            Suara dari jantung Banjarnegara. Mengabarkan kebenaran, mengangkat potensi, dan merayakan keberagaman budaya lokal dengan jurnalisme yang mendalam.
                        </p>
                        <div className="flex gap-3">
                            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Rubrik (2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500">Rubrik</h4>
                        <ul className="space-y-4">
                            {['Cerita', 'Opini', 'Sosok Inspiratif', 'Sudut Kota', 'Potensi', 'Galeri Foto'].map((item) => (
                                <li key={item}>
                                    <Link href={`/category/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-500 transition-colors"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Tentang (2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500">Tentang</h4>
                        <ul className="space-y-4">
                            {['Tentang Kami', 'Redaksi', 'Pedoman Siber', 'Hubungi Kami', 'Karir'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-500 transition-colors"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (4 cols) */}
                    <div className="lg:col-span-4 space-y-8 pl-0 lg:pl-8">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-4">Berlangganan</h4>
                            <p className="text-white/50 text-sm mb-6">Dapatkan rangkuman cerita terbaik Banjarnegara langsung di email Anda setiap minggu.</p>

                            <form className="relative group">
                                <input
                                    type="email"
                                    placeholder="Masukkan email anda..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:bg-white/10 outline-none transition-all pr-14"
                                />
                                <button className="absolute right-2 top-2 p-2 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-500 hover:text-white rounded-lg transition-all">
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>

                        <div className="flex flex-col gap-4 text-sm text-white/40 pt-8 border-t border-white/5">
                            <div className="flex items-start gap-4">
                                <MapPin size={18} className="text-cyan-500/50 mt-1 shrink-0" />
                                <span className="font-light">Jl. Dipayuda No. 12, Banjarnegara,<br />Jawa Tengah 53412</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone size={18} className="text-cyan-500/50 shrink-0" />
                                <span className="font-light hover:text-cyan-400 transition-colors cursor-pointer">(0286) 591234</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail size={18} className="text-cyan-500/50 shrink-0" />
                                <span className="font-light hover:text-cyan-400 transition-colors cursor-pointer">redaksi@svaraserayu.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex justify-center items-center">
                    <p className="text-white/30 text-xs font-medium tracking-wide text-center">
                        &copy; {new Date().getFullYear()} Svara Serayu. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
