import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { listR2Objects, deleteFromR2, R2Error } from '@/lib/r2';

const GRACE_PERIOD_HOURS = 24;

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const r2Objects = await listR2Objects('uploads/');
        
        const articles = await prisma.article.findMany({
            select: {
                image: true,
                gallery: true,
                content: true,
            },
        });

        const users = await prisma.user.findMany({
            select: {
                avatar: true,
                image: true,
            },
        });

        const settings = await prisma.siteSettings.findFirst({
            select: {
                sosokImageUrl: true,
            },
        });

        const referencedUrls = new Set<string>();

        for (const article of articles) {
            if (article.image) referencedUrls.add(article.image);
            
            if (article.gallery) {
                try {
                    const galleryImages = JSON.parse(article.gallery) as string[];
                    galleryImages.forEach(url => referencedUrls.add(url));
                } catch { /* ignore parse errors */ }
            }
            
            if (article.content) {
                const imgRegex = /src=["']([^"']+)["']/g;
                let match;
                while ((match = imgRegex.exec(article.content)) !== null) {
                    referencedUrls.add(match[1]);
                }
            }
        }

        for (const user of users) {
            if (user.avatar) referencedUrls.add(user.avatar);
            if (user.image) referencedUrls.add(user.image);
        }

        if (settings?.sosokImageUrl) {
            referencedUrls.add(settings.sosokImageUrl);
        }

        const now = new Date();
        const gracePeriodMs = GRACE_PERIOD_HOURS * 60 * 60 * 1000;
        
        const orphans: string[] = [];
        const kept: string[] = [];
        const errors: { key: string; error: string }[] = [];

        for (const obj of r2Objects) {
            const isReferenced = Array.from(referencedUrls).some(url => 
                url.includes(obj.key) || url.endsWith(obj.key.split('/').pop() || '')
            );

            if (isReferenced) {
                kept.push(obj.key);
                continue;
            }

            const ageMs = now.getTime() - obj.lastModified.getTime();
            if (ageMs < gracePeriodMs) {
                kept.push(obj.key);
                continue;
            }

            orphans.push(obj.key);
        }

        let deletedCount = 0;
        for (const key of orphans) {
            try {
                await deleteFromR2(key);
                deletedCount++;
            } catch (err) {
                errors.push({
                    key,
                    error: err instanceof Error ? err.message : 'Unknown error',
                });
            }
        }

        return NextResponse.json({
            success: true,
            summary: {
                totalR2Objects: r2Objects.length,
                referencedCount: kept.length,
                orphansFound: orphans.length,
                deletedCount,
                errorCount: errors.length,
            },
            errors: errors.length > 0 ? errors : undefined,
            timestamp: now.toISOString(),
        });
    } catch (error) {
        if (error instanceof R2Error && error.code === 'CONFIG_ERROR') {
            return NextResponse.json({
                success: false,
                error: 'R2 not configured',
                message: 'Skipping cleanup - R2 credentials not set',
            });
        }

        console.error('Orphan cleanup error:', error);
        return NextResponse.json(
            { error: 'Failed to cleanup orphan images' },
            { status: 500 }
        );
    }
}
