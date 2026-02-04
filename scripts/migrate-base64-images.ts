import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const prisma = new PrismaClient();

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

const r2Client = R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY ? new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
}) : null;

const BASE64_REGEX = /data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=]+)/g;
const BATCH_SIZE = 50;
const DRY_RUN = process.argv.includes('--dry-run');

interface MigrationStats {
    articlesScanned: number;
    articlesWithBase64: number;
    imagesExtracted: number;
    imagesUploaded: number;
    errors: string[];
}

function getPublicUrl(key: string): string {
    if (R2_PUBLIC_URL) {
        return `${R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`;
    }
    return `https://pub-${R2_ACCOUNT_ID}.r2.dev/${key}`;
}

async function uploadBase64ToR2(base64Data: string, mimeType: string): Promise<string> {
    const buffer = Buffer.from(base64Data, 'base64');
    const hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);
    const ext = mimeType.replace('image/', '').replace('jpg', 'jpeg');
    const key = `uploads/migrated-${Date.now()}-${hash}.${ext}`;

    if (!r2Client || !R2_BUCKET_NAME) {
        throw new Error('R2 not configured');
    }

    await r2Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: `image/${ext}`,
        CacheControl: 'public, max-age=31536000, immutable',
    }));

    return getPublicUrl(key);
}

async function migrateContent(content: string, stats: MigrationStats): Promise<string> {
    let newContent = content;
    const matches = [...content.matchAll(BASE64_REGEX)];

    for (const match of matches) {
        const fullMatch = match[0];
        const mimeType = match[1];
        const base64Data = match[2];

        stats.imagesExtracted++;

        if (DRY_RUN) {
            console.log(`  [DRY RUN] Would upload ${mimeType} image (${Math.round(base64Data.length / 1024)}KB)`);
            continue;
        }

        try {
            const url = await uploadBase64ToR2(base64Data, mimeType);
            newContent = newContent.replace(fullMatch, url);
            stats.imagesUploaded++;
            console.log(`  Uploaded: ${url}`);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Unknown error';
            stats.errors.push(`Failed to upload image: ${errorMsg}`);
            console.error(`  Error uploading image: ${errorMsg}`);
        }
    }

    return newContent;
}

async function migrateGallery(gallery: string, stats: MigrationStats): Promise<string> {
    try {
        const images = JSON.parse(gallery) as string[];
        const newImages: string[] = [];

        for (const img of images) {
            if (img.startsWith('data:image')) {
                const match = img.match(/data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=]+)/);
                if (match) {
                    stats.imagesExtracted++;
                    
                    if (DRY_RUN) {
                        console.log(`  [DRY RUN] Would upload gallery image (${Math.round(match[2].length / 1024)}KB)`);
                        newImages.push(img);
                        continue;
                    }

                    try {
                        const url = await uploadBase64ToR2(match[2], match[1]);
                        newImages.push(url);
                        stats.imagesUploaded++;
                        console.log(`  Uploaded gallery: ${url}`);
                    } catch (err) {
                        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
                        stats.errors.push(`Failed to upload gallery image: ${errorMsg}`);
                        newImages.push(img);
                    }
                } else {
                    newImages.push(img);
                }
            } else {
                newImages.push(img);
            }
        }

        return JSON.stringify(newImages);
    } catch {
        return gallery;
    }
}

async function createBackupTable(): Promise<void> {
    await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "_article_content_backup" (
            "id" TEXT PRIMARY KEY,
            "content" TEXT,
            "gallery" TEXT,
            "backedUpAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
}

async function backupArticle(id: string, content: string | null, gallery: string | null): Promise<void> {
    await prisma.$executeRaw`
        INSERT INTO "_article_content_backup" ("id", "content", "gallery")
        VALUES (${id}, ${content}, ${gallery})
        ON CONFLICT ("id") DO UPDATE SET
            "content" = ${content},
            "gallery" = ${gallery},
            "backedUpAt" = CURRENT_TIMESTAMP
    `;
}

async function main() {
    console.log('='.repeat(60));
    console.log('Base64 Image Migration Script');
    console.log('='.repeat(60));
    
    if (DRY_RUN) {
        console.log('\n🔍 DRY RUN MODE - No changes will be made\n');
    }

    if (!r2Client && !DRY_RUN) {
        console.error('❌ R2 not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME');
        process.exit(1);
    }

    const stats: MigrationStats = {
        articlesScanned: 0,
        articlesWithBase64: 0,
        imagesExtracted: 0,
        imagesUploaded: 0,
        errors: [],
    };

    if (!DRY_RUN) {
        console.log('Creating backup table...');
        await createBackupTable();
    }

    const articlesWithBase64 = await prisma.article.findMany({
        where: {
            OR: [
                { content: { contains: 'data:image' } },
                { gallery: { contains: 'data:image' } },
            ],
        },
        select: {
            id: true,
            slug: true,
            content: true,
            gallery: true,
        },
    });

    console.log(`\nFound ${articlesWithBase64.length} articles with base64 images\n`);
    stats.articlesWithBase64 = articlesWithBase64.length;

    for (let i = 0; i < articlesWithBase64.length; i += BATCH_SIZE) {
        const batch = articlesWithBase64.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(articlesWithBase64.length / BATCH_SIZE)}`);

        for (const article of batch) {
            stats.articlesScanned++;
            console.log(`\n[${stats.articlesScanned}/${articlesWithBase64.length}] ${article.slug}`);

            if (!DRY_RUN) {
                await backupArticle(article.id, article.content, article.gallery);
            }

            let newContent = article.content;
            let newGallery = article.gallery;

            if (article.content?.includes('data:image')) {
                newContent = await migrateContent(article.content, stats);
            }

            if (article.gallery?.includes('data:image')) {
                newGallery = await migrateGallery(article.gallery, stats);
            }

            if (!DRY_RUN && (newContent !== article.content || newGallery !== article.gallery)) {
                await prisma.article.update({
                    where: { id: article.id },
                    data: {
                        content: newContent,
                        gallery: newGallery,
                    },
                });
            }
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('Migration Summary');
    console.log('='.repeat(60));
    console.log(`Articles scanned:     ${stats.articlesScanned}`);
    console.log(`Articles with base64: ${stats.articlesWithBase64}`);
    console.log(`Images extracted:     ${stats.imagesExtracted}`);
    console.log(`Images uploaded:      ${stats.imagesUploaded}`);
    console.log(`Errors:               ${stats.errors.length}`);
    
    if (stats.errors.length > 0) {
        console.log('\nErrors:');
        stats.errors.forEach(err => console.log(`  - ${err}`));
    }

    if (DRY_RUN) {
        console.log('\n🔍 This was a dry run. Run without --dry-run to apply changes.');
    } else {
        console.log('\n✅ Migration complete!');
    }

    await prisma.$disconnect();
}

main().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
