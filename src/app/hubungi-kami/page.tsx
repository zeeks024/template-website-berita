import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hubungi Kami | NusaDaily',
    description: 'Hubungi tim NusaDaily.',
};

export default function ContactPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Hubungi Kami</h1>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                    Punya pertanyaan, kritik, saran, atau tawaran kerjasama? Jangan ragu untuk menghubungi kami melalui saluran di bawah ini.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                    <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>📧 Email</h3>
                        <p style={{ fontWeight: 600 }}>redaksi@nusadaily.com</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Untuk rilis pers dan kerjasama</p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>📱 Telepon / WhatsApp</h3>
                        <p style={{ fontWeight: 600 }}>+62 812-3456-7890</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Senin - Jumat, 09.00 - 17.00 WIB</p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>📍 Alamat Kantor</h3>
                        <p style={{ fontWeight: 600 }}>Gedung Menara Pers, Lt. 3</p>
                        <p>Jl. Jend. Sudirman No. 123</p>
                        <p>Jakarta Selatan, 12190</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
