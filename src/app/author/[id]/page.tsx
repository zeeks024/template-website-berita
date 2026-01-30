import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { User, Calendar, Eye, ArrowLeft } from 'lucide-react'
import { formatShortDateWIB } from '@/lib/dateUtils'

type Props = {
    params: Promise<{ id: string }>
}

async function getAuthor(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            bio: true,
            avatar: true,
            socialLinks: true,
            createdAt: true,
        },
    })

    if (!user || user.role === 'READER') {
        return null
    }

    return user
}

async function getAuthorArticles(authorId: string) {
    const articles = await prisma.article.findMany({
        where: {
            authorId,
            status: 'published',
        },
        orderBy: { publishedAt: 'desc' },
        select: {
            slug: true,
            title: true,
            summary: true,
            image: true,
            category: true,
            publishedAt: true,
            readTime: true,
            views: true,
        },
    })

    return articles
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const author = await getAuthor(id)

    if (!author) {
        return {
            title: 'Penulis Tidak Ditemukan | Derap Serayu',
        }
    }

    return {
        title: `Artikel oleh ${author.name} | Derap Serayu`,
        description: author.bio || `Lihat semua artikel dari ${author.name} di Derap Serayu`,
    }
}

export default async function AuthorPage({ params }: Props) {
    const { id } = await params
    const author = await getAuthor(id)

    if (!author) {
        notFound()
    }

    const articles = await getAuthorArticles(id)
    const socialLinks = author.socialLinks ? JSON.parse(author.socialLinks) : null

    return (
        <main className="min-h-screen bg-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Link 
                    href="/"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>

                <div className="bg-slate-900 rounded-2xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {author.avatar ? (
                                <Image 
                                    src={author.avatar} 
                                    alt={author.name}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-12 h-12 text-slate-600" />
                            )}
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-white">{author.name}</h1>
                                <span className="px-2 py-1 text-xs font-medium rounded bg-cyan-500/20 text-cyan-400">
                                    {author.role}
                                </span>
                            </div>
                            
                            {author.bio && (
                                <p className="text-slate-400 mb-4">{author.bio}</p>
                            )}

                            {socialLinks && (
                                <div className="flex gap-4">
                                    {socialLinks.twitter && (
                                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400">
                                            Twitter
                                        </a>
                                    )}
                                    {socialLinks.instagram && (
                                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400">
                                            Instagram
                                        </a>
                                    )}
                                    {socialLinks.website && (
                                        <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400">
                                            Website
                                        </a>
                                    )}
                                </div>
                            )}

                            <p className="text-sm text-slate-500 mt-4">
                                {articles.length} artikel dipublikasikan
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-6">
                    Artikel oleh {author.name}
                </h2>

                {articles.length === 0 ? (
                    <p className="text-slate-400">Belum ada artikel yang dipublikasikan.</p>
                ) : (
                    <div className="grid gap-6">
                        {articles.map((article) => (
                            <Link 
                                key={article.slug}
                                href={`/article/${article.slug}`}
                                className="group bg-slate-900 rounded-xl overflow-hidden flex flex-col md:flex-row hover:bg-slate-800 transition-colors"
                            >
                                {article.image && (
                                    <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            width={192}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-4 flex-1">
                                    <span className="text-xs text-cyan-400 font-medium">
                                        {article.category}
                                    </span>
                                    <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                                        {article.summary}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {article.publishedAt ? formatShortDateWIB(article.publishedAt) : '-'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {article.views} views
                                        </span>
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
