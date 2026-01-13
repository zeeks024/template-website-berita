import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Redaksi | NusaDaily',
    description: 'Susunan redaksi NusaDaily.',
};

export default function RedaksiPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Susunan Redaksi</h1>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Pemimpin Redaksi / Penanggung Jawab</h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>Arzak L.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Redaktur Pelaksana</h3>
                        <p style={{ fontWeight: 600 }}>Budi Santoso</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Sekretaris Redaksi</h3>
                        <p style={{ fontWeight: 600 }}>Siti Aminah</p>
                    </div>
                </div>

                <hr style={{ margin: '2rem 0', borderColor: 'var(--glass-border)', opacity: 0.3 }} />

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>Tim Jurnalis</h3>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', lineHeight: 1.8 }}>
                    <li>Sarah Wijaya (Teknologi)</li>
                    <li>Aditya Pratama (Ekonomi)</li>
                    <li>Rian Hidayat (Nasional)</li>
                    <li>Dr. Lina Mardiana (Kesehatan)</li>
                </ul>

                <hr style={{ margin: '2rem 0', borderColor: 'var(--glass-border)', opacity: 0.3 }} />

                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <p>Wartawan <strong>NusaDaily</strong> selalu dibekali tanda pengenal pers yang sah dan tidak diperkenankan menerima imbalan dalam bentuk apa pun dari narasumber.</p>
                </div>
            </div>
        </div>
    );
}
