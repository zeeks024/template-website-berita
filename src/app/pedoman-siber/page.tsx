import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import { Home, ChevronRight, Shield, FileText, Scale, AlertCircle, CheckCircle, BookOpen, Users, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Pedoman Pemberitaan Media Siber | Derap Serayu',
    description: 'Pedoman pemberitaan media siber Derap Serayu mengacu pada peraturan Dewan Pers Indonesia.',
};

const guidelines = [
    {
        number: '01',
        icon: <CheckCircle size={24} />,
        title: 'Verifikasi dan Keberimbangan Berita',
        content: `Pada prinsipnya setiap berita harus melalui verifikasi. Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.

Ketentuan verifikasi ini dikecualikan, dengan syarat:
• Berita benar-benar mengandung kepentingan publik yang bersifat mendesak
• Sumber berita yang pertama adalah sumber yang jelas kredibilitasnya
• Subjek berita yang harus dikonfirmasi tidak diketahui keberadaannya dan/atau tidak dapat diwawancarai
• Media memberikan penjelasan kepada pembaca bahwa berita tersebut masih memerlukan verifikasi lebih lanjut yang diupayakan dalam waktu secepatnya`
    },
    {
        number: '02',
        icon: <Users size={24} />,
        title: 'Isi Buatan Pengguna (User Generated Content)',
        content: `Media siber wajib mencantumkan syarat dan ketentuan mengenai Isi Buatan Pengguna yang tidak bertentangan dengan Undang-Undang No. 40 tahun 1999 tentang Pers dan Kode Etik Jurnalistik, yang ditempatkan secara terang dan jelas.

Media siber mewajibkan setiap pengguna untuk melakukan registrasi keanggotaan dan menyetujui syarat dan ketentuan yang ditetapkan.

Media siber memiliki kewenangan untuk menyunting dan/atau menghapus Isi Buatan Pengguna yang bertentangan dengan peraturan perundang-undangan.`
    },
    {
        number: '03',
        icon: <Scale size={24} />,
        title: 'Ralat, Koreksi, dan Hak Jawab',
        content: `Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan Dewan Pers.

Ralat, koreksi dan/atau hak jawab wajib ditautkan pada berita yang diralat, dikoreksi atau yang diberi hak jawab.

Di setiap berita ralat, koreksi, dan hak jawab wajib dicantumkan waktu pemuatan ralat, koreksi, dan atau hak jawab tersebut.

Bila suatu berita media siber tertentu disebarluaskan media siber lain, maka:
• Tanggung jawab media siber pembuat berita terbatas pada berita yang dipublikasikan di media siber tersebut
• Koreksi berita yang dilakukan oleh media siber pembuat berita harus dilakukan pula oleh media siber yang menyebarluaskan`
    },
    {
        number: '04',
        icon: <AlertCircle size={24} />,
        title: 'Pencabutan Berita',
        content: `Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait dengan:
• Isu SARA (Suku, Agama, Ras, dan Antargolongan)
• Kesusilaan
• Berita bohong
• Penghinaan dan pencemaran nama baik
• Prasangka atau penyesatan
• Pelanggaran asas praduga tak bersalah

Pencabutan dilakukan atas permintaan yang bersangkutan dan atau yang berwenang dengan tetap menunjukkan bukti pencabutan.`
    },
    {
        number: '05',
        icon: <BookOpen size={24} />,
        title: 'Iklan',
        content: `Media siber wajib membedakan dengan tegas antara produk berita dan iklan.

Setiap berita/artikel/isi yang merupakan iklan dan/atau isi berbayar wajib mencantumkan keterangan "advertorial", "iklan", "ads", "sponsored", atau kata lain yang menjelaskan bahwa berita/artikel/isi tersebut adalah iklan.`
    },
    {
        number: '06',
        icon: <Shield size={24} />,
        title: 'Hak Cipta',
        content: `Media siber wajib menghormati hak cipta sebagaimana diatur dalam peraturan perundang-undangan yang berlaku.

Pengutipan berita dari media lain harus menyebutkan sumber berita dan mencantumkan tautan ke berita asli.`
    },
];

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
                                Mengacu pada peraturan Dewan Pers untuk menjamin jurnalisme yang berkualitas, independen, dan bertanggung jawab dalam era digital.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-12">
                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                                    <FileText size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-foreground mb-4">Pengantar</h2>
                                    <div className="text-muted-foreground space-y-4 leading-relaxed">
                                        <p>
                                            Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB.
                                        </p>
                                        <p>
                                            Keberadaan media siber di Indonesia juga merupakan bagian dari kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers. Media siber memiliki karakter khusus sehingga memerlukan pedoman agar pengelolaannya dapat dilaksanakan secara profesional, memenuhi fungsi, hak, dan kewajibannya sesuai Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Guidelines */}
            <section className="py-12">
                <div className="container px-6 mx-auto max-w-4xl">
                    <div className="space-y-6">
                        {guidelines.map((item, i) => (
                            <FadeIn key={item.number} delay={i * 50}>
                                <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 hover:shadow-lg hover:border-amber-500/30 transition-all duration-300">
                                    <div className="flex items-start gap-5">
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="text-3xl font-black text-amber-500/20">{item.number}</span>
                                            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-foreground mb-4">{item.title}</h3>
                                            <div className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm">
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sengketa Section */}
            <section className="py-12">
                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 lg:p-12 text-white">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                                    <MessageSquare size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Penyelesaian Sengketa</h3>
                                    <div className="text-white/90 space-y-4 leading-relaxed">
                                        <p>
                                            Penilaian akhir atas sengketa antara media siber dengan masyarakat terkait pelaksanaan Pedoman Pemberitaan Media Siber diselesaikan oleh Dewan Pers.
                                        </p>
                                        <p>
                                            Untuk pengaduan dan klarifikasi terkait pemberitaan <strong>Derap Serayu</strong>, silakan hubungi redaksi melalui halaman kontak kami.
                                        </p>
                                    </div>
                                    <Link
                                        href="/hubungi-kami"
                                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-amber-600 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
                                    >
                                        Hubungi Redaksi <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-8">
                <div className="container px-6 mx-auto max-w-4xl">
                    <FadeIn>
                        <p className="text-center text-sm text-muted-foreground">
                            Pedoman ini disusun berdasarkan{' '}
                            <strong className="text-foreground">Pedoman Pemberitaan Media Siber</strong>{' '}
                            yang ditetapkan oleh Dewan Pers, Jakarta, 3 Februari 2012.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
