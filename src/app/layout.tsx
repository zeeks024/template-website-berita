import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serayu.vercel.app"),
  title: "Serayu | Berita Terkini Indonesia",
  description: "Portal berita modern dengan desain premium. Dapatkan berita terkini seputar nasional, ekonomi, teknologi, dan gaya hidup.",
  keywords: ["berita", "indonesia", "terkini", "nasional", "ekonomi", "teknologi"],
  authors: [{ name: "Serayu Media" }],
  openGraph: {
    title: "Serayu | Berita Terkini Indonesia",
    description: "Portal berita modern dengan desain premium.",
    url: "https://serayu.vercel.app",
    siteName: "Serayu",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serayu - Berita Terkini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serayu | Berita Terkini Indonesia",
    description: "Portal berita modern dengan desain premium.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          {children}
          {/* Simple Footer */}
          <footer style={{ marginTop: '4rem', padding: '3rem 0 2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <a href="/tentang-kami" style={{ textDecoration: 'none', color: 'inherit' }}>Tentang Kami</a>
              <a href="/redaksi" style={{ textDecoration: 'none', color: 'inherit' }}>Redaksi</a>
              <a href="/pedoman-media-siber" style={{ textDecoration: 'none', color: 'inherit' }}>Pedoman Media Siber</a>
              <a href="/kebijakan-privasi" style={{ textDecoration: 'none', color: 'inherit' }}>Kebijakan Privasi</a>
              <a href="/hubungi-kami" style={{ textDecoration: 'none', color: 'inherit' }}>Hubungi Kami</a>
            </div>
            <p style={{ fontSize: '0.8rem' }}>© 2026 Serayu. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
