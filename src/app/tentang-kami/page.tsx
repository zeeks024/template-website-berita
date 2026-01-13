import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tentang Kami | NusaDaily',
    description: 'Mengenal lebih dekat visi dan misi NusaDaily.',
};

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Tentang Kami</h1>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    <strong>NusaDaily</strong> hadir sebagai platform berita modern yang mengutamakan kecepatan, akurasi, dan kedalaman informasi. Di tengah arus informasi yang begitu deras, kami berkomitmen untuk menjadi mercusuar yang menyajikan berita yang tidak hanya viral, tetapi juga verifikatif dan bermakna.
                </p>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Visi Kami</h2>
                <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    Menjadi media siber terdepan yang mencerdaskan bangsa melalui jurnalisme berkualitas, berimbang, dan relevan dengan perkembangan zaman.
                </p>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Misi Kami</h2>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, listStyleType: 'disc' }}>
                    <li>Menyajikan informasi yang faktual, akurat, dan berimbang.</li>
                    <li>Mengedukasi masyarakat melalui konten yang mendalam dan inspiratif.</li>
                    <li>Menjunjung tinggi Kode Etik Jurnalistik dalam setiap pemberitaan.</li>
                    <li>Berinovasi dalam penyajian berita melalui teknologi terkini.</li>
                </ul>
            </div>
        </div>
    );
}
