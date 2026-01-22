"use client";

import Link from 'next/link';
import {
  ArrowRight, BookOpen, Quote, MessageCircle, Users, MapPin,
  Lightbulb, ArrowUpRight, ArrowUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import SkeletonHome from '@/components/home/SkeletonHome';
import { useNews } from '@/hooks/useNews';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const { allNews, loading } = useNews();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    if (loading) {
      return <SkeletonHome />;
    }
  }

  // Filter Data from Hook
  // Sort by featured first, then newest
  const sortedNews = [...allNews].sort((a, b) => {
    // Prioritize featured
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then date
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const ceritaArticles = sortedNews.filter(n => n.category.toLowerCase() === 'cerita');
  const opiniArticles = sortedNews.filter(n => n.category.toLowerCase() === 'opini');
  const sosokArticles = sortedNews.filter(n => n.category.toLowerCase().includes('sosok'));
  const sudutArticles = sortedNews.filter(n => n.category.toLowerCase().includes('sudut'));
  const potensiArticles = sortedNews.filter(n => n.category.toLowerCase() === 'potensi');

  // Default Images if missing
  const defaultImages = [
    "https://images.unsplash.com/photo-1543162773-4560f79612c6?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1770&auto=format&fit=crop"
  ];

  return (
    <main className="relative z-10 pt-32 px-6 lg:px-12 max-w-[1600px] mx-auto pb-12 space-y-32">

      {/* --- Hero Section (CERITA Highlight) --- */}
      <header id="cerita" className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[60vh] lg:min-h-[80vh]">
        <FadeIn className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-900/20 border border-cyan-500/20 rounded-full backdrop-blur-md">
            <BookOpen size={14} className="text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Cerita Utama</span>
          </div>
          {ceritaArticles[0] ? (
            <>
              <h1 className="text-3xl md:text-5xl lg:text-[6vw] font-black leading-[0.9] tracking-tighter uppercase line-clamp-3">
                {ceritaArticles[0].title}
              </h1>
              <p className="text-lg text-white/60 max-w-xl leading-relaxed font-light border-l-2 border-cyan-500/30 pl-6 line-clamp-3">
                {ceritaArticles[0].summary}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link
                  href={`/article/${ceritaArticles[0].slug}`}
                  className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                >
                  Baca Selengkapnya
                </Link>
                <Link
                  href="/category/cerita"
                  className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  Lihat Semua <ArrowRight size={14} />
                </Link>
              </div>
            </>
          ) : (
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h2 className="text-2xl font-bold mb-2">Belum ada cerita utama</h2>
              <p className="text-white/50">Silakan tambahkan berita kategori 'Cerita' di dashboard admin.</p>
            </div>
          )}
        </FadeIn>
        <FadeIn delay={200} className="lg:col-span-5 relative">
          {ceritaArticles[0] && (
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer transform transition-transform hover:-rotate-1">
              <img
                src={ceritaArticles[0]?.image || defaultImages[0]}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                alt="Main Story"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          )}
          {/* Sub Cerita Card */}
          {ceritaArticles[1] && (
            <Link href={`/article/${ceritaArticles[1].slug}`} className="absolute -bottom-12 -left-12 hidden lg:block bg-[#0a1214] border border-white/10 p-6 rounded-3xl w-64 shadow-2xl hover:-translate-y-2 transition-transform cursor-pointer">
              <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest mb-2 block">Cerita Lainnya</span>
              <h4 className="font-bold leading-tight mb-2 hover:text-cyan-400 transition-colors line-clamp-2">
                {ceritaArticles[1].title}
              </h4>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mt-2">
                <ArrowRight size={12} />
              </div>
            </Link>
          )}
        </FadeIn>
      </header>

      {/* --- OPINI Section --- */}
      <section id="opini" className="border-t border-white/5 pt-16">
        <FadeIn>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter">Sudut <span className="text-cyan-500">Opini</span></h2>
            <Link href="/category/opini" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors group">
              Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opiniArticles.length > 0 ? opiniArticles.slice(0, 3).map((item, i) => (
            <FadeIn key={item.id} delay={i * 100}>
              <Link href={`/article/${item.slug}`} className="flex flex-col group bg-[#0a1214] border border-white/5 p-8 rounded-[2rem] hover:bg-[#0f1a1d] transition-all hover:-translate-y-2 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <Quote size={80} />
                </div>
                <MessageCircle size={32} className="text-white/20 mb-6 group-hover:text-cyan-500 transition-colors relative z-10" />
                <h3 className="text-xl font-black uppercase leading-tight mb-4 group-hover:underline decoration-cyan-500 underline-offset-4 relative z-10 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 font-serif italic relative z-10 line-clamp-3">
                  "{item.summary}"
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6 relative z-10 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center text-[10px] font-black shrink-0">
                      {item.author.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 truncate">{item.author}</span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-500/50 whitespace-nowrap">{item.readTime}</span>
                </div>
              </Link>
            </FadeIn>
          )) : (
            <div className="col-span-3 text-center py-12 text-white/30">Belum ada artikel opini.</div>
          )}
        </div>
      </section>

      {/* --- SOSOK INSPIRATIF Section --- */}
      <section id="sosok" className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-transparent rounded-[4rem] -z-10"></div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="space-y-8 pl-4 lg:pl-12">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.4em]">Inspirasi Lokal</span>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">Wajah <br /> Banjarnegara.</h2>
            <p className="text-white/60 text-lg max-w-md mb-8">Mengenal mereka yang berkarya dalam senyap, memberikan dampak nyata bagi lingkungan sekitar.</p>

            <Link href="/category/sosok-inspiratif" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors group mb-6">
              Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="space-y-6 pt-8">
              {sosokArticles.slice(0, 3).map((sosok, i) => (
                <Link key={i} href={`/article/${sosok.slug}`} className="flex gap-6 items-center group cursor-pointer p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                  <img
                    src={sosok.image}
                    className="w-20 h-20 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all border-2 border-transparent group-hover:border-cyan-500"
                    alt={sosok.title}
                  />
                  <div>
                    <h4 className="text-xl font-bold uppercase group-hover:text-cyan-400 transition-colors line-clamp-1">{sosok.title}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Tokoh Inspiratif</span>
                    <p className="text-sm text-white/50 italic font-serif line-clamp-1">"{sosok.summary}"</p>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200} className="relative h-[600px] rounded-[3rem] overflow-hidden hidden lg:block group">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Portrait"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
            {/* Decorative Element */}
            <div className="absolute bottom-10 right-10">
              <div className="w-24 h-24 border-2 border-white/20 rounded-full animate-spin-slow">
                <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- SUDUT KOTA Section (Horizontal Scroll) --- */}
      <section id="sudut-kota">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4">Lensa <span className="italic font-serif font-thin text-cyan-400">Kota</span></h2>
          <p className="text-white/40 max-w-lg mx-auto">Geser untuk melihat keindahan arsitektur dan suasana kota yang terekam kamera.</p>
        </FadeIn>

        {/* Horizontal Slider */}
        <FadeIn delay={200}>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            {sudutArticles.map((item, i) => (
              <Link key={i} href={`/article/${item.slug}`} className="snap-center shrink-0 w-[300px] md:w-[400px] h-[500px] relative rounded-[2rem] overflow-hidden group border border-white/5 cursor-pointer">
                <img
                  src={item.image}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                  <span className="text-cyan-400 font-bold mb-1 flex items-center gap-1">
                    <MapPin size={16} />
                    Lokasi
                  </span>
                  <h4 className="text-xl font-black uppercase text-white leading-tight">{item.title}</h4>
                </div>
              </Link>
            ))}

            {/* View More Card in Slider */}
            <div className="snap-center shrink-0 w-[200px] h-[500px] flex items-center justify-center">
              <Link href="/category/sudut kota" className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all group">
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- POTENSI Section (Bento) --- */}
      <section id="potensi" className="pb-20">
        <FadeIn>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter">Potensi <span className="text-cyan-500">&</span> Unggulan</h2>
            <Link href="/category/potensi" className="text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors">Lihat Semua</Link>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-6 h-auto lg:h-[600px]">
          {/* Highlight Card - Potensi 1 */}
          <FadeIn className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-cyan-900 to-slate-900 rounded-[3rem] p-8 lg:p-10 relative overflow-hidden group border border-white/10 lg:min-h-0 min-h-[400px]">
            {potensiArticles[0] && (
              <>
                <img
                  src={potensiArticles[0].image}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-110 transition-transform duration-1000"
                  alt="Highlight"
                />
                <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
                  <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur text-white rounded-lg text-xs font-black uppercase tracking-widest w-fit border border-white/10">
                    Komoditas Unggulan
                  </span>
                  <div>
                    <h3 className="text-4xl lg:text-5xl font-black uppercase italic mb-4 line-clamp-2">{potensiArticles[0].title}</h3>
                    <p className="text-white/80 max-w-sm mb-6 line-clamp-2">{potensiArticles[0].summary}</p>
                    <Link href={`/article/${potensiArticles[0].slug}`} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors inline-block">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </>
            )}
          </FadeIn>

          {/* Stat Card */}
          <FadeIn delay={100} className="bg-[#0a1214] border border-white/5 rounded-[3rem] p-8 flex flex-col justify-center items-center text-center hover:bg-[#0f1a1d] transition-colors min-h-[200px]">
            <Lightbulb size={40} className="text-cyan-500 mb-4" />
            <h4 className="text-4xl font-black text-white">266</h4>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">Desa Wisata</p>
          </FadeIn>

          {/* Quote Card */}
          <FadeIn delay={200} className="lg:col-span-1 bg-[#E0F2F1] text-black rounded-[3rem] p-8 flex flex-col justify-between min-h-[200px]">
            <Quote size={32} className="text-cyan-900/20" />
            <p className="text-lg font-black italic leading-tight">"Keramik Klampok adalah warisan seni yang tak ternilai harganya."</p>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={300} className="lg:col-span-2 bg-[#0a1214] border border-white/5 rounded-[3rem] p-8 lg:p-10 flex items-center justify-between relative overflow-hidden group min-h-[200px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-cyan-600/30 transition-colors"></div>
            <div className="relative z-10">
              <h4 className="text-2xl font-black uppercase italic mb-2">Punya Produk Unggulan?</h4>
              <p className="text-white/50 text-sm">Daftarkan UMKM Anda di database daerah.</p>
            </div>
            <Link href="/admin/create" className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 hover:bg-white shrink-0 ml-4">
              <ArrowUpRight size={24} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* --- Back to Top Button --- */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-cyan-500 transition-all duration-500 z-40 ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </main>
  );
}
