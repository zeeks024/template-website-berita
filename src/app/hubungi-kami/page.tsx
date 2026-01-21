import type { Metadata } from 'next';
import FadeIn from '@/components/ui/FadeIn';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Hubungi Kami | Serayu',
    description: 'Hubungi tim redaksi dan manajemen Serayu.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-cyan-500 font-bold tracking-widest uppercase text-xs mb-3 block">Get in Touch</span>
                        <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                            Hubungi Kami
                        </h1>
                        <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
                            Punya cerita menarik tentang Banjarnegara? Atau ingin berkolaborasi? Pintu kami selalu terbuka.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        <div className="p-8 rounded-3xl bg-[#0a1214] border border-white/5 hover:border-cyan-500/50 transition-colors group text-center">
                            <div className="w-14 h-14 mx-auto bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                <Mail size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Email Redaksi</h3>
                            <p className="text-white/40 text-sm mb-4">Untuk rilis pers, liputan, dan kerjasama.</p>
                            <a href="mailto:redaksi@serayu.id" className="text-cyan-400 font-bold hover:underline">redaksi@serayu.id</a>
                        </div>

                        <div className="p-8 rounded-3xl bg-[#0a1214] border border-white/5 hover:border-emerald-500/50 transition-colors group text-center">
                            <div className="w-14 h-14 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                <Phone size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                            <p className="text-white/40 text-sm mb-4">Hotline pengaduan dan info cepat.</p>
                            <a href="https://wa.me/6281234567890" className="text-emerald-400 font-bold hover:underline">+62 812-3456-7890</a>
                        </div>

                        <div className="p-8 rounded-3xl bg-[#0a1214] border border-white/5 hover:border-purple-500/50 transition-colors group text-center">
                            <div className="w-14 h-14 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <MapPin size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Markas</h3>
                            <p className="text-white/40 text-sm mb-4">Datang dan ngopi bersama kami.</p>
                            <address className="text-purple-400 font-bold not-italic">Jl. Dipayuda No. 12,<br />Banjarnegara</address>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#0a1214] border border-white/5 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">Kirim Pesan</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Nama</label>
                                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Email</label>
                                    <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Pesan</label>
                                <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none" placeholder="Tulis pesan anda di sini..."></textarea>
                            </div>
                            <button type="button" className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-xl font-bold uppercase tracking-widest transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                <Send size={18} /> Kirim Pesan
                            </button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
