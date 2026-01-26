import Link from 'next/link';
import {
  ArrowRight, Quote, MapPin,
  Lightbulb, ArrowUpRight, Clock
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import HeroSection from '@/components/home/HeroSection';
import HorizontalScroll from '@/components/ui/HorizontalScroll';
import { formatTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { NewsItem } from '@/types/news';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

async function getArticles(): Promise<NewsItem[]> {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      include: { authorUser: { select: { id: true, name: true } } }
    });

    return articles.map(article => ({
      ...article,
      id: article.id.toString(),
      tags: article.tags ? JSON.parse(article.tags) : [],
      gallery: article.gallery ? JSON.parse(article.gallery) : [],
      publishedAt: article.publishedAt?.toISOString() || '',
      createdAt: article.createdAt?.toISOString() || ''
    })) as NewsItem[];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const allNews = await getArticles();

  const sortedNews = [...allNews].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const latestNews = [...allNews].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const ceritaArticles = sortedNews.filter(n => n.category.toLowerCase() === 'cerita');
  const opiniArticles = sortedNews.filter(n => n.category.toLowerCase() === 'opini');
  const sosokArticles = sortedNews.filter(n => n.category.toLowerCase().includes('sosok'));
  const sudutArticles = sortedNews.filter(n => n.category.toLowerCase().includes('sudut'));
  const potensiArticles = sortedNews.filter(n => n.category.toLowerCase() === 'potensi');

  return (
    <main className="relative z-10 pt-20 pb-12 space-y-24 md:space-y-32 overflow-hidden">
      
      <HeroSection articles={allNews} />

      <section id="opini" className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          <div className="lg:col-span-8">
            <FadeIn>
              <div className="flex items-end justify-between mb-8 md:mb-12 border-b border-border pb-4">
                <div className="space-y-2">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase">Perspektif</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Sudut <span className="text-cyan-600 dark:text-cyan-400 italic">Opini</span></h2>
                </div>
                <Link href="/category/opini" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group mb-2">
                  Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-6">
              {opiniArticles.length > 0 ? opiniArticles.slice(0, 4).map((item, i) => (
                <FadeIn key={item.id} delay={i * 100} className="h-full">
                  <Link href={`/article/${item.slug}`} className="flex flex-col h-full group bg-card border border-border p-8 rounded-3xl hover:shadow-xl hover:shadow-cyan-900/5 dark:hover:shadow-cyan-900/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                      <Quote size={100} />
                    </div>
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                        <div className="mb-6 flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
                                <span className="font-serif font-bold text-lg text-muted-foreground group-hover:text-cyan-600 transition-colors">{item.author.charAt(0)}</span>
                             </div>
                             <div>
                                 <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">{item.author}</span>
                                 <span className="text-2xs text-muted-foreground">{item.publishedAt}</span>
                             </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-3">
                        {item.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-serif italic line-clamp-3">
                        &quot;{item.summary}&quot;
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground font-medium">
                            <span className="flex items-center gap-1.5"><Clock size={14}/> {item.readTime} baca</span>
                            <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Baca Opini <ArrowRight size={14}/></span>
                        </div>
                    </div>
                  </Link>
                </FadeIn>
              )) : (
                <div className="col-span-2 text-center py-12 text-muted-foreground">Belum ada artikel opini.</div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">

            <FadeIn delay={200}>
              <div className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Trending</h3>
                </div>
                
                <div className="space-y-6 relative z-10">
                  {sortedNews
                    .filter(n => n.trendingRank && n.trendingRank > 0)
                    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
                    .slice(0, 3)
                    .map((item, i) => (
                      <Link key={item.id} href={`/article/${item.slug}`} className="flex gap-5 group items-start">
                        <span className="text-4xl font-serif font-bold text-muted-foreground/40 group-hover:text-cyan-500/60 transition-colors leading-none -mt-2">0{i + 1}</span>
                        <div>
                          <span className="text-2xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block mb-1.5">{item.category}</span>
                          <h4 className="font-bold leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">{item.title}</h4>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="pl-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-muted-foreground/30 rounded-full"></div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-muted-foreground">Terbaru</h3>
                </div>
                <div className="space-y-8 relative border-l border-border pl-8 ml-2.5">
                  {latestNews.slice(0, 4).map((item) => (
                    <Link key={item.id} href={`/article/${item.slug}`} className="block group relative">
                      <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-background border-2 border-border rounded-full group-hover:border-cyan-500 group-hover:bg-cyan-500 transition-all"></div>
                      <span className="text-2xs text-muted-foreground font-mono mb-1 block">
                        {formatTimeAgo(item.createdAt) || item.publishedAt}
                      </span>
                      <h4 className="font-medium text-sm leading-relaxed group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">{item.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      <section id="cerita-list" className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4 mx-auto">
            <FadeIn>
            <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
                <div className="space-y-2">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase">Kearifan Lokal</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground">Cerita <span className="text-cyan-600 dark:text-cyan-400 italic">Rakyat</span></h2>
                </div>
                <Link href="/category/cerita" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group">
                Lihat Semua <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {ceritaArticles.slice(0, 4).map((item, i) => (
                <FadeIn key={item.id} delay={i * 100}>
                <Link href={`/article/${item.slug}`} className="block group h-full">
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-2xs font-bold uppercase tracking-widest text-cyan-400 mb-2 block backdrop-blur-md bg-black/20 w-fit px-2 py-1 rounded-md">Cerita</span>
                        <h3 className="text-xl font-serif font-bold leading-tight text-white line-clamp-3 mb-2">{item.title}</h3>
                        <div className="h-0.5 w-12 bg-cyan-500 group-hover:w-full transition-all duration-500"></div>
                    </div>
                    </div>
                </Link>
                </FadeIn>
            ))}
            </div>
        </div>
      </section>

      <section id="sosok" className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-100 dark:bg-cyan-900/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
        
        <div className="container px-4 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn className="space-y-10">
                <div className="space-y-4">
                    <span className="inline-block px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-bold uppercase tracking-widest border border-cyan-200 dark:border-cyan-800">Inspirasi Lokal</span>
                    <h2 className="text-5xl lg:text-7xl font-serif font-bold leading-[0.9]">Wajah <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Banjarnegara.</span></h2>
                    <p className="text-muted-foreground text-lg lg:text-xl max-w-md leading-relaxed">Mengenal mereka yang berkarya dalam senyap, memberikan dampak nyata bagi lingkungan sekitar.</p>
                </div>

                <div className="space-y-4">
                {sosokArticles.slice(0, 3).map((sosok, i) => (
                    <Link key={i} href={`/article/${sosok.slug}`} className="flex gap-6 items-center group cursor-pointer p-4 -mx-4 rounded-2xl hover:bg-card hover:shadow-lg transition-all border border-transparent hover:border-border">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-background shadow-md">
                        <Image
                            src={sosok.image}
                            alt={sosok.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">{sosok.title}</h4>
                        <span className="text-2xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Tokoh Inspiratif</span>
                        <p className="text-sm text-muted-foreground italic font-serif line-clamp-1">&quot;{sosok.summary}&quot;</p>
                    </div>
                    </Link>
                ))}
                </div>

                <Link href="/category/sosok-inspiratif" className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-600 hover:text-white transition-all duration-300">
                Lihat Semua Tokoh <ArrowRight size={14} />
                </Link>

            </FadeIn>
            
            <FadeIn delay={200} className="relative h-[600px] rounded-[3rem] overflow-hidden hidden lg:block group shadow-2xl shadow-cyan-900/10">
                <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-transparent transition-all z-10 duration-700"></div>
                <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Potret tokoh inspiratif Banjarnegara"
                />
                
                <div className="absolute bottom-10 right-10 z-20">
                <div className="w-24 h-24 border border-white/30 rounded-full animate-spin-slow flex items-center justify-center backdrop-blur-sm">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                </div>
            </FadeIn>
            </div>
        </div>
      </section>

      <section id="sudut-kota" className="py-12 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-80 pointer-events-none z-10"></div>
        
        <div className="container px-4 mx-auto relative z-20">
            <FadeIn className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-cyan-400 font-mono text-xs mb-4 block">{'//'} GALERI KOTA</span>
                    <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">Lensa <br/><span className="italic font-serif font-thin text-cyan-400">Kota</span></h2>
                </div>
                <p className="text-white/70 max-w-sm text-sm leading-relaxed">Geser untuk melihat keindahan arsitektur dan suasana kota yang terekam kamera.</p>
            </FadeIn>

            <FadeIn delay={200}>
            <HorizontalScroll className="gap-6 pb-12 -mx-4 px-4 lg:mx-0 lg:px-0">
                {sudutArticles.map((item, i) => (
                <Link key={i} href={`/article/${item.slug}`} className="snap-center shrink-0 w-[280px] md:w-[350px] h-[450px] relative rounded-3xl overflow-hidden group border border-white/10 cursor-pointer bg-neutral-900">
                    <Image
                    src={item.image}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                    <span className="text-cyan-400 font-bold mb-2 flex items-center gap-2 text-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <MapPin size={14} />
                        Lokasi Terdeteksi
                    </span>
                    <h4 className="text-xl font-bold uppercase text-white leading-tight transform group-hover:-translate-y-2 transition-transform duration-500">{item.title}</h4>
                    </div>
                </Link>
                ))}

                <div className="snap-center shrink-0 w-[200px] h-[450px] flex items-center justify-center">
                <Link href="/category/sudut kota" className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all group duration-300">
                    <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                </div>
            </HorizontalScroll>
            </FadeIn>
        </div>
      </section>

      <section id="potensi" className="container px-4 mx-auto pb-24">
        <FadeIn>
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4 border-b border-border pb-6">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground">Potensi <span className="text-cyan-600 dark:text-cyan-400 italic">&</span> Unggulan</h2>
            <Link href="/category/potensi" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Lihat Semua</Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 h-auto lg:h-[600px]">
          <FadeIn className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-cyan-950 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden group border border-cyan-900 lg:min-h-0 min-h-[400px]">
            {potensiArticles[0] && (
              <>
                <Image
                  src={potensiArticles[0].image}
                  fill
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-1000"
                  alt={potensiArticles[0].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 via-transparent to-transparent"></div>
                <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
                  <span className="inline-block px-4 py-2 bg-cyan-500/20 backdrop-blur text-cyan-300 rounded-lg text-xs font-bold uppercase tracking-widest w-fit border border-cyan-500/30">
                    Komoditas Unggulan
                  </span>
                  <div>
                    <h3 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6 line-clamp-3 leading-tight">{potensiArticles[0].title}</h3>
                    <p className="text-cyan-100/80 max-w-sm mb-8 line-clamp-2 text-lg">{potensiArticles[0].summary}</p>
                    <Link href={`/article/${potensiArticles[0].slug}`} className="bg-white text-cyan-950 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors inline-block text-xs shadow-lg shadow-cyan-900/50">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </>
            )}
          </FadeIn>

          <FadeIn delay={100} className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition-all duration-300 min-h-[200px] group">
            <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb size={32} className="text-cyan-600 dark:text-cyan-400" />
            </div>
            <h4 className="text-5xl font-black text-foreground mb-2">266</h4>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Desa Wisata</p>
          </FadeIn>

          <FadeIn delay={200} className="lg:col-span-1 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/50 text-foreground rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[200px]">
            <Quote size={40} className="text-cyan-500/30" />
            <p className="text-lg font-serif italic leading-tight text-cyan-900 dark:text-cyan-100">&quot;Keramik Klampok adalah warisan seni yang tak ternilai harganya.&quot;</p>
          </FadeIn>

          <FadeIn delay={300} className="sm:col-span-2 lg:col-span-2 bg-foreground text-background rounded-[2.5rem] p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden group min-h-[200px] gap-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -mr-16 -mt-16 opacity-50"></div>
            <div className="relative z-10 max-w-md">
              <h4 className="text-2xl font-bold uppercase italic mb-2">Punya Produk Unggulan?</h4>
              <p className="text-background/70 text-sm">Daftarkan UMKM Anda di database daerah untuk jangkauan pasar yang lebih luas.</p>
            </div>
            <Link href="/admin/create" className="w-16 h-16 rounded-full bg-background text-foreground flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 hover:bg-cyan-500 hover:text-white shrink-0 ml-6 shadow-xl">
              <ArrowUpRight size={28} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <ScrollToTopButton />
    </main>
  );
}
