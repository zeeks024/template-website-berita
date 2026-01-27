import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Heart, Users, Award, TrendingUp, ChevronRight, Home } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export const metadata = {
    title: 'Tentang Kami | Derap Serayu',
    description: 'Mengenal lebih dekat Derap Serayu - Portal berita komunitas untuk Banjarnegara.',
};

export default function TentangKamiPage() {
    const values = [
        {
            icon: <Target size={28} />,
            title: 'Akurat',
            description: 'Menyajikan informasi yang terverifikasi dan dapat dipertanggungjawabkan.'
        },
        {
            icon: <Eye size={28} />,
            title: 'Transparan',
            description: 'Terbuka dalam setiap proses jurnalistik dan editorial yang kami lakukan.'
        },
        {
            icon: <Heart size={28} />,
            title: 'Berempati',
            description: 'Mengutamakan kepentingan masyarakat dalam setiap pemberitaan.'
        },
        {
            icon: <Users size={28} />,
            title: 'Inklusif',
            description: 'Memberikan ruang bagi semua suara dari berbagai lapisan masyarakat.'
        },
    ];

    const milestones = [
        { year: '2020', title: 'Didirikan', description: 'Derap Serayu lahir dari semangat jurnalis muda Banjarnegara.' },
        { year: '2021', title: '10.000 Pembaca', description: 'Mencapai milestone pembaca aktif pertama.' },
        { year: '2022', title: 'Penghargaan Media Lokal', description: 'Diakui sebagai media komunitas terbaik Jawa Tengah.' },
        { year: '2023', title: 'Ekspansi Digital', description: 'Meluncurkan platform baru dengan fitur interaktif.' },
        { year: '2024', title: '100.000 Pembaca', description: 'Menjadi portal berita terdepan di Banjarnegara.' },
    ];

    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 -z-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />
                
                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn>
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm mb-8">
                            <Link href="/" className="text-muted-foreground hover:text-cyan-600 transition-colors flex items-center gap-1">
                                <Home size={14} />
                                Beranda
                            </Link>
                            <ChevronRight size={14} className="text-muted-foreground" />
                            <span className="text-cyan-600 font-medium">Tentang Kami</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <span className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Siapa Kami
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground">
                                    Suara Hati <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Banjarnegara</span>
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                                    Derap Serayu adalah portal media komunitas yang berkomitmen mengangkat cerita, potensi, dan aspirasi masyarakat Banjarnegara dengan jurnalisme yang bertanggung jawab.
                                </p>
                            </div>

                            <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-cyan-900/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80"
                                    alt="Tim Derap Serayu"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-white/80 text-sm font-medium">Redaksi Derap Serayu</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20">
                <div className="container px-6 mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <FadeIn>
                            <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 h-full">
                                <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                                    <Eye size={28} />
                                </div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground">Visi</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    Menjadi media komunitas terdepan yang menginspirasi, mengedukasi, dan memberdayakan masyarakat Banjarnegara melalui informasi berkualitas.
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl p-8 lg:p-12 h-full text-white">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                                    <Target size={28} />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Misi</h2>
                                <ul className="space-y-3 text-white/90">
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                                        Menyajikan berita dan informasi yang akurat, berimbang, dan bermanfaat
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                                        Mengangkat potensi lokal dan kearifan budaya Banjarnegara
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                                        Menjadi wadah aspirasi dan partisipasi masyarakat
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                                        Mendorong kemajuan dan pembangunan daerah
                                    </li>
                                </ul>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-muted/30">
                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn className="text-center mb-16">
                        <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase mb-4 block">Prinsip Kami</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Nilai-Nilai yang Kami Junjung</h2>
                    </FadeIn>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <FadeIn key={value.title} delay={i * 100}>
                                <div className="bg-card border border-border rounded-2xl p-6 text-center h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-foreground">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn className="text-center mb-16">
                        <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase mb-4 block">Perjalanan Kami</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Milestone</h2>
                    </FadeIn>

                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
                        
                        {milestones.map((item, i) => (
                            <FadeIn key={item.year} delay={i * 100}>
                                <div className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="bg-card border border-border rounded-2xl p-6 inline-block hover:shadow-lg transition-shadow">
                                            <span className="text-cyan-600 font-bold text-sm">{item.year}</span>
                                            <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="w-4 h-4 rounded-full bg-cyan-600 border-4 border-background shadow-lg z-10 shrink-0 hidden md:block" />
                                    
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
                <div className="container px-6 mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: '100K+', label: 'Pembaca Aktif', icon: <Users size={24} /> },
                            { value: '5K+', label: 'Artikel', icon: <TrendingUp size={24} /> },
                            { value: '50+', label: 'Kontributor', icon: <Heart size={24} /> },
                            { value: '10+', label: 'Penghargaan', icon: <Award size={24} /> },
                        ].map((stat, i) => (
                            <FadeIn key={stat.label} delay={i * 100}>
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="text-4xl lg:text-5xl font-black mb-2">{stat.value}</div>
                                    <div className="text-white/70 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="container px-6 mx-auto max-w-4xl text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                            Ingin Bergabung Bersama Kami?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Kami selalu terbuka untuk kolaborasi, kontribusi, dan kemitraan yang membangun.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link 
                                href="/hubungi-kami" 
                                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                            >
                                Hubungi Kami
                            </Link>
                            <Link 
                                href="/redaksi" 
                                className="px-8 py-4 bg-muted hover:bg-muted/80 text-foreground rounded-full font-bold text-sm uppercase tracking-wider transition-all border border-border"
                            >
                                Lihat Tim Redaksi
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
