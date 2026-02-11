"use client";

import { useEffect, useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import TimeAgo from '@/components/ui/TimeAgo';
import { Card, Badge, SectionHeader } from '@/components/admin/ui';
import { ShieldCheck, XCircle, Eye, Loader2, FileText, User, Clock } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import ArticlePreviewModal from '@/components/admin/ArticlePreviewModal';

export default function ReviewPage() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewArticle, setPreviewArticle] = useState<NewsItem | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/articles?status=pending_review', {
        headers: { 'Cache-Control': 'no-store' },
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleApprove = async (article: NewsItem) => {
    setArticles(prev => prev.filter(a => a.slug !== article.slug));

    try {
      const res = await fetch(`/api/articles/${article.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: article.title,
          content: article.content,
          category: article.category,
          summary: article.summary,
          excerpt: article.excerpt,
          author: article.author,
          image: article.image,
          gallery: article.gallery,
          tags: article.tags,
          status: 'published'
        }),
      });

      if (!res.ok) {
        fetchArticles();
        alert('Gagal menyetujui artikel');
      }
    } catch (error) {
      console.error('Error approving article:', error);
      fetchArticles();
    }
  };

  const handleReject = async (article: NewsItem) => {
    const reason = prompt('Masukkan alasan penolakan:');
    if (reason === null) return;
    if (!reason.trim()) {
      alert('Alasan penolakan harus diisi');
      return;
    }

    setArticles(prev => prev.filter(a => a.slug !== article.slug));

    try {
      const res = await fetch(`/api/articles/${article.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: article.title,
          content: article.content,
          category: article.category,
          summary: article.summary,
          excerpt: article.excerpt,
          author: article.author,
          image: article.image,
          gallery: article.gallery,
          tags: article.tags,
          status: 'rejected',
          rejectionNote: reason
        }),
      });

      if (!res.ok) {
        fetchArticles();
        alert('Gagal menolak artikel');
      }
    } catch (error) {
      console.error('Error rejecting article:', error);
      fetchArticles();
    }
  };

  const getWordCount = (content: string) => {
    return content?.split(/\s+/).length || 0;
  };

  return (
    <div className="space-y-8">
      <FadeIn>
        <SectionHeader 
          title="Review Artikel" 
          subtitle="Tinjau dan setujui artikel yang diajukan oleh penulis."
          action={
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-medium">
                {loading ? '...' : articles.length} artikel menunggu review
              </span>
            </div>
          }
        />
      </FadeIn>

      <FadeIn delay={100}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-muted-foreground animate-pulse">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p>Memuat artikel...</p>
          </div>
        ) : articles.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Tidak ada artikel yang menunggu review</h3>
              <p className="text-muted-foreground mt-1">Semua artikel sudah ditinjau.</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden border-l-4 border-l-amber-500/50 p-0">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="default">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <TimeAgo date={typeof article.createdAt === 'string' ? article.createdAt : new Date().toISOString()} />
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold leading-tight mb-2">{article.title}</h3>
                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                          {article.excerpt || article.summary || article.content?.substring(0, 200)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-2">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {article.author}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-border" />
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          {article.readTime || `${Math.ceil(getWordCount(article.content) / 200)} min read`}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-3 lg:w-48 shrink-0 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 mt-2 lg:mt-0">
                      <button
                        onClick={() => handleApprove(article)}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 py-2.5 px-4 rounded-xl text-sm font-bold transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Setujui
                      </button>
                      
                      <button
                        onClick={() => handleReject(article)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 py-2.5 px-4 rounded-xl text-sm font-bold transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Tolak
                      </button>

                      <button
                        onClick={() => setPreviewArticle(article)}
                        className="flex-1 flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-foreground py-2.5 px-4 rounded-xl text-sm font-bold transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Lihat
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </FadeIn>

      {previewArticle && (
        <ArticlePreviewModal
          data={{
            title: previewArticle.title,
            excerpt: previewArticle.excerpt || previewArticle.summary || '',
            content: previewArticle.content,
            category: previewArticle.category,
            author: previewArticle.author,
            tags: Array.isArray(previewArticle.tags) ? previewArticle.tags.join(', ') : '',
            images: previewArticle.gallery?.length ? previewArticle.gallery : [previewArticle.image],
            imageCaption: previewArticle.imageCaption,
            imageCredit: previewArticle.imageCredit,
          }}
          onClose={() => setPreviewArticle(null)}
        />
      )}
    </div>
  );
}
