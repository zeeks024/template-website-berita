export type NewsItem = {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string; // HTML string for body
    category: string;
    author: string;
    publishedAt: string;
    readTime: string;
    image: string;
    gallery?: string[];
    views?: number;
    featured?: boolean;
    trendingRank?: number;
    status?: 'draft' | 'published' | 'archived';
    excerpt?: string;
    imageCaption?: string;
    imageCredit?: string;
    metaTitle?: string;
    metaDesc?: string;
    tags?: string[];
    editor?: string;
    lastUpdatedBy?: string;
};

export const newsData: NewsItem[] = [
    {
        id: "1",
        slug: "kebijakan-publik-format-berita",
        title: "Kebijakan publik: format berita yang mudah dipahami warga",
        summary: "Mengapa transparansi informasi menjadi kunci partisipasi publik di era digital, dan bagaimana pemerintah harus beradaptasi.",
        content: `
        <p>Di era di mana informasi bergerak lebih cepat dari verifikasi, tantangan terbesar bagi pemerintah bukan lagi sekadar menyebarkan informasi, tetapi memastikan informasi tersebut <strong>dapat dipahami dan dipercaya</strong> oleh warganya.</p>
        
        <h3>Transparansi Bukan Sekadar Data Terbuka</h3>
        <p>Banyak instansi beranggapan bahwa dengan mengunggah PDF laporan tahunan, tugas transparansi sudah selesai. Namun, data tanpa konteks hanyalah angka. Publik membutuhkan narasi yang menjelaskan <em>mengapa</em> sebuah kebijakan diambil.</p>
        
        <p>Studi terbaru menunjukkan bahwa tingkat kepercayaan publik meningkat 40% ketika kebijakan dikomunikasikan dengan bahasa yang sederhana, infografis yang jelas, dan jujur mengenai potensi dampaknya—baik positif maupun negatif.</p>
  
        <blockquote>"Kepercayaan tidak dibangun di atas kesempurnaan, tetapi di atas kejujuran dan kejelasan." - Dr. Aris Santoso, Pengamat Kebijakan Publik</blockquote>
  
        <h3>Langkah Konkret ke Depan</h3>
        <p>Pemerintah daerah perlu mulai mengadopsi pendekatan 'Human-Centered Design' dalam komunikasi publik mereka. Ini meliputi:</p>
        <ul>
          <li>Menghindari jargon birokrasi yang membingungkan.</li>
          <li>Menggunakan platform digital yang sudah familiar bagi warga.</li>
          <li>Membuka saluran feedback dua arah yang responsif.</li>
        </ul>
      `,
        category: "Nusantara",
        author: "Budi Santoso",
        publishedAt: "1 jam lalu",
        readTime: "5 menit",
        image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=1600&q=80",
        featured: true
    },
    {
        id: "2",
        slug: "desain-mobile-first",
        title: "Kenapa desain portal berita harus mobile-first?",
        summary: "Mayoritas pembaca datang dari ponsel, menuntut navigasi yang intuitif dan waktu muat yang kilat.",
        content: `
        <p>Statistik global tidak berbohong: lebih dari 70% konsumsi berita digital kini terjadi melalui perangkat seluler. Ini bukan lagi tren masa depan, ini adalah realitas hari ini.</p>
      `,
        category: "Teknologi",
        author: "Sarah Wijaya",
        publishedAt: "3 jam lalu",
        readTime: "4 menit",
        image: "https://images.unsplash.com/photo-1555421689-492a18d9c3ad?auto=format&fit=crop&w=1600&q=80"
    },
    {
        id: "3",
        slug: "ekonomi-pangan-2024",
        title: "Ekonomi: Harga pangan bergerak, ini ringkasan dampaknya",
        summary: "Analisis singkat mengenai fluktuasi harga komoditas utama dan pengaruhnya terhadap daya beli masyarakat menengah ke bawah.",
        content: `
        <p>Pasar tradisional di berbagai daerah melaporkan kenaikan harga komoditas cabai dan beras.</p>
      `,
        category: "Ekonomi",
        author: "Aditya Pratama",
        publishedAt: "6 jam lalu",
        readTime: "6 menit",
        image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1600&q=80"
    },
    {
        id: "4",
        slug: "keamanan-siber-2024",
        title: "Tren keamanan siber yang perlu dipahami publik",
        summary: "Phishing semakin canggih dengan AI. Pelajari cara mendeteksi serangan siber modern sebelum data Anda dicuri.",
        content: "<p>Kejahatan siber berevolusi.</p>",
        category: "Teknologi",
        author: "Rian Hidayat",
        publishedAt: "5 jam lalu",
        readTime: "7 menit",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80"
    },
    {
        id: "5",
        slug: "layanan-publik-digital",
        title: "Perbaikan layanan publik berbasis data",
        summary: "Transformasi digital bukan sekadar aplikasi, tapi efisiensi birokrasi.",
        content: "<p>Digitalisasi harus mempermudah, bukan menambah login baru.</p>",
        category: "Daerah",
        author: "Humas Pemda",
        publishedAt: "Kemarin",
        readTime: "3 menit",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        trendingRank: 1
    },
    {
        id: "6",
        slug: "kesehatan-mental-remaja",
        title: "Krisis kesehatan mental remaja: Apa yang bisa dilakukan?",
        summary: "Sekolah dan orang tua perlu berkolaborasi menciptakan lingkungan yang suportif, bukan hanya menuntut prestasi akademik.",
        content: "<p>Tekanan sosial media menjadi faktor utama...</p>",
        category: "Kesehatan",
        author: "Dr. Lina Mardiana",
        publishedAt: "2 hari lalu",
        readTime: "5 menit",
        image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=1600&q=80"
    }
];

export function getAllNews() {
    return newsData;
}

export function getNewsBySlug(slug: string) {
    return newsData.find((item) => item.slug === slug);
}

export function getNewsByCategory(categorySlug: string) {
    return newsData.filter((item) => item.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getTrendingNews() {
    return newsData.filter(item => item.trendingRank).sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
}
