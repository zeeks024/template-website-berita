import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { validateImageMagicBytes, processImage } from '@/lib/imageProcessor';
import { uploadToR2, generateImageKey, R2Error } from '@/lib/r2';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
    try {
        await requireAuth();

        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided', code: 'NO_FILE' },
                { status: 400 }
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.', code: 'FILE_TOO_LARGE' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const validation = await validateImageMagicBytes(buffer);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error || 'Invalid file type', code: 'INVALID_TYPE' },
                { status: 400 }
            );
        }

        const processed = await processImage(buffer, {
            maxWidth: 2048,
            maxHeight: 2048,
            quality: 85,
            format: 'webp',
        });

        const key = generateImageKey(file.name.replace(/\.[^.]+$/, '.webp'));
        const result = await uploadToR2(processed.buffer, key, processed.mimeType);

        return NextResponse.json({
            url: result.url,
            key: result.key,
            width: processed.width,
            height: processed.height,
            size: processed.size,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'UNAUTHORIZED') {
            return NextResponse.json(
                { error: 'Authentication required', code: 'UNAUTHORIZED' },
                { status: 401 }
            );
        }

        if (error instanceof R2Error) {
            console.error('R2 upload error:', error);
            return NextResponse.json(
                { error: 'Storage service error', code: error.code },
                { status: 503 }
            );
        }

        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file', code: 'UPLOAD_FAILED' },
            { status: 500 }
        );
    }
}
