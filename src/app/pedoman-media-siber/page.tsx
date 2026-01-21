import type { Metadata } from 'next';
import FadeIn from '@/components/ui/FadeIn';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Pedoman Media Siber | Serayu',
    description: 'Panduan etika dan standar operasional prosedur media siber Serayu.',
};

export default function PedomanPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center text-white/40 mb-6">
                            <ShieldAlert size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                            Pedoman Media Siber
                        </h1>
                        <p className="text-white/60 font-light">
                            Mengacu pada peraturan Dewan Pers untuk menjamin jurnalisme yang berkualitas dan bertanggung jawab.
                        </p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="bg-[#0a1214] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8">
                            <p className="lead text-white/80">
                                Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers.
                            </p>

                            <hr className="border-white/10" />

                            <section>
                                <h3 className="text-cyan-400 font-bold text-xl uppercase tracking-widest mb-4">1. Ruang Lingkup</h3>
                                <p className="text-white/60">
                                    Pedoman ini berlaku bagi seluruh media siber yang berada di bawah naungan <strong>Serayu Media Group</strong>, termasuk namun tidak terbatas pada website, media sosial, dan platform digital lainnya.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-cyan-400 font-bold text-xl uppercase tracking-widest mb-4">2. Verifikasi & Keberimbangan</h3>
                                <div className="space-y-4 text-white/60">
                                    <p>Pada prinsipnya setiap berita harus melalui verifikasi. Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.</p>
                                    <p>Ketentuan verifikasi dikecualikan jika:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Berita benar-benar mengandung kepentingan publik yang bersifat mendesak;</li>
                                        <li>Sumber berita yang pertama adalah sumber yang jelas kredibilitasnya;</li>
                                        <li>Subjek berita yang harus dikonfirmasi tidak diketahui keberadaannya dan atau tidak dapat diwawancarai;</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-cyan-400 font-bold text-xl uppercase tracking-widest mb-4">3. Konten Buatan Pengguna</h3>
                                <p className="text-white/60">
                                    Serayu tidak bertanggung jawab atas isi buatan pengguna (User Generated Content) yang melanggar hukum, namun berhak untuk menyunting, memoderasi, atau menghapus konten tersebut jika melanggar standar komunitas kami.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-cyan-400 font-bold text-xl uppercase tracking-widest mb-4">4. Ralat & Hak Jawab</h3>
                                <p className="text-white/60">
                                    Ralat, koreksi, dan hak jawab dilakukan secara proporsional. Serayu wajib meralat segera setiap pemberitaan yang di kemudian hari diketahui tidak akurat atau keliru.
                                </p>
                            </section>
                        </div>

                        <div className="mt-8 text-center text-sm text-white/20 uppercase tracking-widest">
                            Ditetapkan oleh Dewan Pers di Jakarta, 3 Februari 2012
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
