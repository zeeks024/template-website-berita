import type { Metadata } from 'next';
import FadeIn from '@/components/ui/FadeIn';
import { Briefcase, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Karir | Serayu',
    description: 'Bergabung dengan tim Serayu dan bangun narasi lokal bersama kami.',
};

export default function CareerPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Shapes */}
            <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 block">Join Our Squad</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-8">
                            Berkarya<br />Bersama Serayu.
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
                            Kami mencari pencerita, pemimpi, dan kreator yang percaya bahwa konten lokal bisa mendunia. Apakah itu Anda?
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="p-10 rounded-[2.5rem] bg-[#0a1214] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <Briefcase size={120} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">Program Magang</h3>
                            <p className="text-white/60 mb-8 leading-relaxed">
                                Kesempatan bagi mahasiswa untuk belajar langsung dari jurnalis senior. Dapatkan pengalaman lapangan, mentoring, dan portofolio nyata.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm text-white/80">
                                    <Star size={16} className="text-yellow-500" /> Jurnalis Muda
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white/80">
                                    <Star size={16} className="text-yellow-500" /> Social Media Specialist
                                </li>
                                <li className="flex items-center gap-3 text-sm text-white/80">
                                    <Star size={16} className="text-yellow-500" /> UI/UX Designer
                                </li>
                            </ul>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all">
                                Daftar Magang <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-900/20 to-[#0a1214] border border-cyan-500/20 relative overflow-hidden">
                            <h3 className="text-2xl font-black text-white mb-6">Open Positions</h3>
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-black/20 hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-cyan-500/30 group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Video Journalist</h4>
                                        <span className="text-[10px] font-bold uppercase bg-white/10 px-2 py-1 rounded text-white/60">Full Time</span>
                                    </div>
                                    <p className="text-xs text-white/40">Banjarnegara • Minimal 2 Tahun Pengalaman</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-black/20 hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-cyan-500/30 group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">React Frontend Dev</h4>
                                        <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Remote</span>
                                    </div>
                                    <p className="text-xs text-white/40">Anywhere • Portfolio Required</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-black/20 hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-cyan-500/30 group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Editor Bahasa</h4>
                                        <span className="text-[10px] font-bold uppercase bg-white/10 px-2 py-1 rounded text-white/60">Part Time</span>
                                    </div>
                                    <p className="text-xs text-white/40">Banjarnegara • Sastra Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
