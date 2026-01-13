import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pedoman Media Siber | NusaDaily',
    description: 'Pedoman Pemberitaan Media Siber NusaDaily.',
};

export default function PedomanPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Pedoman Media Siber</h1>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers.
                </p>

                <div style={{ lineHeight: 1.8 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>1. Ruang Lingkup</h3>
                    <p>Pedoman ini berlaku bagi seluruh media siber yang berada di bawah naungan NusaDaily.</p>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>2. Verifikasi dan Keberimbangan Berita</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                        <li>Pada prinsipnya setiap berita harus melalui verifikasi.</li>
                        <li>Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>3. Isi Buatan Pengguna (User Generated Content)</h3>
                    <p>NusaDaily tidak bertanggung jawab atas isi buatan pengguna yang melanggar hukum, namun berhak untuk menyunting atau menghapus konten tersebut.</p>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem' }}>4. Ralat, Koreksi, dan Hak Jawab</h3>
                    <p>Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers dan Kode Etik Jurnalistik.</p>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <p>Ditetapkan oleh Dewan Pers di Jakarta, 3 Februari 2012.</p>
                </div>
            </div>
        </div>
    );
}
