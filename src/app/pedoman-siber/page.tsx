import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import { Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Pedoman Pemberitaan Media Siber | Derap Serayu',
    description: 'Pedoman pemberitaan media siber Derap Serayu mengacu pada peraturan Dewan Pers Indonesia.',
};

export default function PedomanSiberPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 -z-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -z-10" />

                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn>
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm mb-8">
                            <Link href="/" className="text-muted-foreground hover:text-amber-600 transition-colors flex items-center gap-1">
                                <Home size={14} />
                                Beranda
                            </Link>
                            <ChevronRight size={14} className="text-muted-foreground" />
                            <span className="text-amber-600 font-medium">Pedoman Siber</span>
                        </nav>

                        <div className="text-center max-w-3xl mx-auto">
                            <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                Media Guidelines
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                                Pedoman Pemberitaan{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                                    Media Siber
                                </span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Mengacu pada peraturan Dewan Pers untuk menjamin jurnalisme yang berkualitas, independen, dan bertanggung jawab.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12">
                            {/* Konten akan ditambahkan di sini */}
                            <div className="text-center text-muted-foreground py-12">
                                <p className="text-lg">Konten halaman ini sedang disiapkan.</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
