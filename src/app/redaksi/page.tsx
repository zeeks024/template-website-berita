import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import { Home, ChevronRight, Shield, Pen, Camera, Globe, Users, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Redaksi | Derap Serayu',
    description: 'Susunan tim redaksi dan kontributor Derap Serayu Banjarnegara.',
};

const leadership = [
    {
        name: 'Ahmad Fadillah',
        role: 'Pemimpin Redaksi',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        description: 'Berpengalaman 15 tahun di dunia jurnalistik.'
    },
    {
        name: 'Siti Nurhaliza',
        role: 'Wakil Pemimpin Redaksi',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        description: 'Spesialis investigasi dan liputan khusus.'
    },
    {
        name: 'Budi Santoso',
        role: 'Redaktur Pelaksana',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        description: 'Mengawal kualitas editorial harian.'
    },
];

const departments = [
    { icon: <Globe size={20} />, name: 'Tim Berita', members: ['Reporter Daerah', 'Reporter Kota', 'Koresponden'] },
    { icon: <Pen size={20} />, name: 'Tim Opini & Feature', members: ['Editor Opini', 'Penulis Feature', 'Kolumnis'] },
    { icon: <Camera size={20} />, name: 'Tim Visual', members: ['Fotografer', 'Videografer', 'Desainer Grafis'] },
    { icon: <Shield size={20} />, name: 'Tim Digital', members: ['Web Developer', 'Social Media', 'SEO Specialist'] },
];

export default function RedaksiPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 -z-10" />
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn>
                        <nav className="flex items-center gap-2 text-sm mb-8">
                            <Link href="/" className="text-muted-foreground hover:text-cyan-600 transition-colors flex items-center gap-1">
                                <Home size={14} />
                                Beranda
                            </Link>
                            <ChevronRight size={14} className="text-muted-foreground" />
                            <span className="text-cyan-600 font-medium">Redaksi</span>
                        </nav>

                        <div className="text-center max-w-3xl mx-auto">
                            <span className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                Editorial Team
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                                Dapur <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Redaksi</span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Mereka yang meracik kata, memburu fakta, dan memastikan setiap cerita sampai ke Anda dengan jernih dan bermakna.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section className="py-16">
                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Pimpinan Redaksi</h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {leadership.map((person, i) => (
                            <FadeIn key={person.name} delay={i * 100}>
                                <div className="bg-card border border-border rounded-3xl p-8 text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-cyan-100 dark:border-cyan-900/50 group-hover:border-cyan-500 transition-colors">
                                        <Image
                                            src={person.image}
                                            alt={person.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-1">{person.name}</h3>
                                    <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm uppercase tracking-wider mb-3">{person.role}</p>
                                    <p className="text-muted-foreground text-sm">{person.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-muted/30">
                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Struktur Tim</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Tim profesional yang bekerja sama menghadirkan informasi berkualitas untuk Anda.
                        </p>
                    </FadeIn>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {departments.map((dept, i) => (
                            <FadeIn key={dept.name} delay={i * 100}>
                                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg hover:border-cyan-500/30 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
                                        {dept.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-4">{dept.name}</h3>
                                    <ul className="space-y-2">
                                        {dept.members.map((member) => (
                                            <li key={member} className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                                {member}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/30 rounded-3xl p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
                                <Shield size={28} className="text-amber-600 dark:text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">Kode Etik Jurnalistik</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Wartawan <strong className="text-foreground">Derap Serayu</strong> selalu dibekali tanda pengenal pers yang sah dan tercantum dalam Box Redaksi ini. Kami tidak diperkenankan menerima imbalan dalam bentuk apapun dari narasumber.
                            </p>
                            <Link 
                                href="/pedoman-siber" 
                                className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium hover:underline"
                            >
                                Baca Pedoman Siber <ChevronRight size={16} />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section className="py-16">
                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                                        <Users size={28} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">Ingin Bergabung?</h2>
                                    <p className="text-muted-foreground mb-6">
                                        Kami selalu mencari talenta-talenta baru yang bersemangat di bidang jurnalisme, fotografi, dan konten digital.
                                    </p>
                                    <Link 
                                        href="/hubungi-kami"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all"
                                    >
                                        <Mail size={16} />
                                        Kirim Lamaran
                                    </Link>
                                </div>
                                <div className="relative h-[250px] rounded-2xl overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                        alt="Join our team"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
