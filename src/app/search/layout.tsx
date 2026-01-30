import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cari Artikel | Derap Serayu',
    description: 'Cari artikel, berita, dan informasi dari Banjarnegara di Derap Serayu.',
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return children;
}
