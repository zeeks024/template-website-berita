import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://websiteberitademo.vercel.app"),
  title: "Derap Serayu | Suara Hati Banjarnegara",
  description: "Platform media komunitas modern untuk menyuarakan potensi, budaya, dan aspirasi Banjarnegara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} min-h-screen bg-background text-foreground font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden`}>
        {/* --- Ambient Background --- */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-500/10 dark:bg-cyan-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/10 dark:bg-emerald-900/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
        </div>

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
