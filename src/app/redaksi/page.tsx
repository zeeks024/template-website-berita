import type { Metadata } from 'next';
import FadeIn from '@/components/ui/FadeIn';

export const metadata: Metadata = {
    title: 'Redaksi | Svara Serayu',
    description: 'Susunan tim redaksi dan kontributor Svara Serayu Banjarnegara.',
};

export default function RedaksiPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-cyan-500 font-bold tracking-widest uppercase text-xs mb-3 block">Editorial Team</span>
                        <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                            Dapur Redaksi
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
                            Mereka yang meracik kata, memburu fakta, dan memastikan setiap cerita sampai ke Anda dengan jernih.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {/* Editor in Chief */}
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center">
                            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2">Pemimpin Redaksi</h3>
                            <p className="text-3xl font-black text-white">Arzak L.</p>
                        </div>

                        {/* Editors */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-3xl bg-[#0a1214] border border-white/5 text-center hover:border-white/20 transition-colors">
                                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Redaktur Pelaksana</h3>
                                <p className="text-2xl font-bold text-white">Budi Santoso</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-[#0a1214] border border-white/5 text-center hover:border-white/20 transition-colors">
                                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Sekretaris Redaksi</h3>
                                <p className="text-2xl font-bold text-white">Siti Aminah</p>
                            </div>
                        </div>

                        {/* Journalists */}
                        <div className="p-8 rounded-3xl bg-[#0a1214] border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4">Tim Jurnalis</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { name: "Sarah Wijaya", desk: "Teknologi & Sains" },
                                    { name: "Aditya Pratama", desk: "Ekonomi Kreatif" },
                                    { name: "Rian Hidayat", desk: "Liputan Khusus" },
                                    { name: "Dr. Lina Mardiana", desk: "Kesehatan" },
                                    { name: "Dewi Kusuma", desk: "Seni & Budaya" },
                                    { name: "Eko Prasetyo", desk: "Pertanian" }
                                ].map((person, i) => (
                                    <div key={i} className="group">
                                        <p className="font-bold text-white group-hover:text-cyan-400 transition-colors">{person.name}</p>
                                        <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{person.desk}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center">
                        <p className="text-amber-200/80 text-sm">
                            ⚠️ Wartawan <strong>Svara Serayu</strong> selalu dibekali tanda pengenal pers yang sah dan tercantum dalam Box Redaksi ini. Kami tidak diperkenankan menerima imbalan dalam bentuk apapun dari narasumber.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
