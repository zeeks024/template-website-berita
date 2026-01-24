import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kebijakan Privasi | NusaDaily',
    description: 'Kebijakan Privasi pengguna NusaDaily.',
};

export default function PrivacyPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Kebijakan Privasi</h1>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
                    Privasi Anda sangat penting bagi kami. Dokumen Kebijakan Privasi ini menguraikan jenis informasi pribadi yang diterima dan dikumpulkan oleh <strong>NusaDaily</strong> dan bagaimana informasi tersebut digunakan.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>1. Informasi Pengguna</h3>
                <p style={{ lineHeight: 1.8 }}>
                    Informasi yang kami kumpulkan dari pengguna terbatas pada data yang diberikan secara sukarela melalui formulir komentar atau fitur interaktif lainnya. Kami tidak menjual, menukar, atau mentransfer informasi pribadi Anda kepada pihak luar.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>2. Cookies</h3>
                <p style={{ lineHeight: 1.8 }}>
                    NusaDaily menggunakan &quot;cookies&quot; untuk menyimpan informasi tentang preferensi pengunjung dan merekam informasi pengguna tertentu pada kunjungan halaman.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>3. Keamanan Data</h3>
                <p style={{ lineHeight: 1.8 }}>
                    Kami menerapkan langkah-langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Namun, perlu diingat bahwa tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100% aman.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>4. Perubahan Kebijakan</h3>
                <p style={{ lineHeight: 1.8 }}>
                    NusaDaily berhak untuk mengubah kebijakan ini kapan saja. Perubahan akan berlaku segera setelah diposting di halaman ini. Kunjungan Anda yang berkelanjutan ke situs ini setelah perubahan tersebut merupakan persetujuan Anda terhadap kebijakan baru.
                </p>
            </div>
        </div>
    );
}
