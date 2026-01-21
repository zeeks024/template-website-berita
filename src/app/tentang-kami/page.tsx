import type { Metadata } from 'next';
import FadeIn from '@/components/ui/FadeIn';
import { Mountain, Users, Heart, Target } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Tentang Kami | Svara Serayu',
    description: 'Mengenal lebih dekat visi dan misi Svara Serayu sebagai platform komunitas Banjarnegara.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <Mountain size={14} />
                            <span>Since 2024</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
                            Suara dari <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                                Jantung Jawa.
                            </span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                            Bukan sekadar portal berita. Svara Serayu adalah ruang kolektif untuk merayakan narasi lokal, potensi tersembunyi, dan denyut nadi kehidupan Banjarnegara.
                        </p>
                    </div>
                </FadeIn>

                <div className="space-y-24">
                    {/* Mission Section */}
                    <FadeIn delay={0.2}>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                                <Target className="w-12 h-12 text-cyan-400 mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">Misi Kami</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Kami percaya bahwa setiap sudut Banjarnegara menyimpan cerita yang layak didengar. Misi kami adalah mendemokratisasi informasi, mengangkat potensi lokal ke panggung digital, dan menjadi jembatan antara tradisi dengan modernitas.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                                        <Heart size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Humanis & Inklusif</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">Mengedepankan sisi kemanusiaan dalam setiap liputan, menjadikan warga sebagai subjek utama, bukan objek berita.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Kolaboratif</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">Membangun ekosistem informasi yang partisipatif. Siapapun bisa menjadi kontributor, karena suara Anda berharga.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Stats / Impact */}
                    <FadeIn delay={0.4}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Kecamatan", value: "20" },
                                { label: "Desa", value: "266" },
                                { label: "Komunitas", value: "50+" },
                                { label: "Pembaca", value: "10k+" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group">
                                    <div className="text-3xl md:text-5xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">{stat.value}</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-white/30">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Team Section */}
                    <FadeIn delay={0.6}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Di Balik Layar</h2>
                            <p className="text-white/40">Orang-orang yang bekerja keras merawat ingatan kolektif kota ini.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: "Arzak", role: "Founder & Editor in Chief", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
                                { name: "Siti Aminah", role: "Head of Community", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
                                { name: "Budi Santoso", role: "Creative Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" }
                            ].map((member, i) => (
                                <div key={i} className="group relative overflow-hidden rounded-2xl">
                                    <div className="aspect-[3/4] bg-gray-800">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                                        <p className="text-sm text-cyan-400 font-medium uppercase tracking-wider">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
