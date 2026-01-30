import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kategori | Derap Serayu',
    description: 'Jelajahi artikel berdasarkan kategori di Derap Serayu - Portal berita Banjarnegara.',
};

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return children;
}
