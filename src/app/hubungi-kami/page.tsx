import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import { Mail, Phone, MapPin, Send, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Hubungi Kami | Derap Serayu',
    description: 'Hubungi tim redaksi dan manajemen Derap Serayu.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-950/20 dark:to-cyan-950/20 -z-10" />
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn>
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm mb-8">
                            <Link href="/" className="text-muted-foreground hover:text-cyan-600 transition-colors flex items-center gap-1">
                                <Home size={14} />
                                Beranda
                            </Link>
                            <ChevronRight size={14} className="text-muted-foreground" />
                            <span className="text-cyan-600 font-medium">Hubungi Kami</span>
                        </nav>

                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                                Get in Touch
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                                Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">Kami</span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                Punya cerita menarik tentang Banjarnegara? Atau ingin berkolaborasi? Pintu kami selalu terbuka.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        <FadeIn>
                            <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center h-full">
                                <div className="w-14 h-14 mx-auto bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                    <Mail size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">Email Redaksi</h3>
                                <p className="text-muted-foreground text-sm mb-4">Untuk rilis pers, liputan, dan kerjasama.</p>
                                <a href="mailto:redaksi@derapserayu.com" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">redaksi@derapserayu.com</a>
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center h-full">
                                <div className="w-14 h-14 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                    <Phone size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">WhatsApp</h3>
                                <p className="text-muted-foreground text-sm mb-4">Hotline pengaduan dan info cepat.</p>
                                <a href="https://wa.me/6281234567890" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">+62 812-3456-7890</a>
                            </div>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center h-full">
                                <div className="w-14 h-14 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                    <MapPin size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">Kantor Redaksi</h3>
                                <p className="text-muted-foreground text-sm mb-4">Datang dan ngopi bersama kami.</p>
                                <address className="text-purple-600 dark:text-purple-400 font-bold not-italic">Jl. Dipayuda No. 12,<br />Banjarnegara</address>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Contact Form */}
                    <FadeIn delay={300}>
                        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Kirim Pesan</h3>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nama</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-muted/50 border border-border rounded-xl p-4 text-foreground focus:border-cyan-500 focus:outline-none transition-colors placeholder:text-muted-foreground" 
                                            placeholder="John Doe" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                                        <input 
                                            type="email" 
                                            className="w-full bg-muted/50 border border-border rounded-xl p-4 text-foreground focus:border-cyan-500 focus:outline-none transition-colors placeholder:text-muted-foreground" 
                                            placeholder="john@example.com" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pesan</label>
                                    <textarea 
                                        rows={4} 
                                        className="w-full bg-muted/50 border border-border rounded-xl p-4 text-foreground focus:border-cyan-500 focus:outline-none transition-colors resize-none placeholder:text-muted-foreground" 
                                        placeholder="Tulis pesan anda di sini..."
                                    ></textarea>
                                </div>
                                <button 
                                    type="button" 
                                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
                                >
                                    <Send size={18} /> Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-muted/30">
                <div className="container px-6 mx-auto max-w-6xl">
                    <FadeIn className="text-center mb-12">
                        <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase mb-4 block">Lokasi</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Temukan Kami</h2>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <div className="bg-card border border-border rounded-3xl overflow-hidden h-[400px] relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63310.04716880972!2d109.66799372167964!3d-7.398097199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa7d14fe8a5f7%3A0x3027a76e352bc30!2sBanjarnegara%2C%20Kec.%20Banjarnegara%2C%20Kabupaten%20Banjarnegara%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1699999999999!5m2!1sid!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
