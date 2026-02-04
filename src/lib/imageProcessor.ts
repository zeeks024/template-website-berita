import sharp from 'sharp';
import { fileTypeFromBuffer } from 'file-type';

// Allowed image MIME types (no SVG - XSS risk)
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
] as const;

type AllowedMimeType = typeof ALLOWED_MIME_TYPES[number];

export interface ValidationResult {
    valid: boolean;
    mimeType?: AllowedMimeType;
    error?: string;
}

export interface ProcessOptions {
    maxWidth?: number;      // default 2048
    maxHeight?: number;     // default 2048
    quality?: number;       // default 85
    format?: 'jpeg' | 'webp' | 'png';  // default 'webp'
    stripMetadata?: boolean; // default true (strips EXIF)
}

export interface ProcessedImage {
    buffer: Buffer;
    width: number;
    height: number;
    format: string;
    size: number;
    mimeType: string;
}

const DEFAULT_OPTIONS: Required<ProcessOptions> = {
    maxWidth: 2048,
    maxHeight: 2048,
    quality: 85,
    format: 'webp',
    stripMetadata: true,
};

/**
 * Validate image using magic bytes (not just MIME type header)
 */
export async function validateImageMagicBytes(buffer: Buffer): Promise<ValidationResult> {
    try {
        const fileType = await fileTypeFromBuffer(buffer);

        if (!fileType) {
            return {
                valid: false,
                error: 'Could not determine file type',
            };
        }

        if (!ALLOWED_MIME_TYPES.includes(fileType.mime as AllowedMimeType)) {
            return {
                valid: false,
                error: `File type '${fileType.mime}' is not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
            };
        }

        return {
            valid: true,
            mimeType: fileType.mime as AllowedMimeType,
        };
    } catch (error) {
        return {
            valid: false,
            error: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
    }
}

/**
 * Extract MIME type from buffer using magic bytes
 */
export async function extractMimeType(buffer: Buffer): Promise<string | null> {
    const fileType = await fileTypeFromBuffer(buffer);
    return fileType?.mime || null;
}

/**
 * Process image: strip EXIF, auto-orient, resize, optimize
 */
export async function processImage(
    buffer: Buffer,
    options: ProcessOptions = {}
): Promise<ProcessedImage> {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    // Cap max dimensions for safety
    const maxWidth = Math.min(opts.maxWidth, 4096);
    const maxHeight = Math.min(opts.maxHeight, 4096);

    let pipeline = sharp(buffer)
        // Auto-rotate based on EXIF orientation (before stripping metadata)
        .rotate();

    // Resize if exceeds max dimensions (maintain aspect ratio)
    pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
    });

    // Format-specific processing
    switch (opts.format) {
        case 'jpeg':
            pipeline = pipeline.jpeg({
                quality: opts.quality,
                mozjpeg: true,
            });
            break;
        case 'png':
            pipeline = pipeline.png({
                quality: opts.quality,
                compressionLevel: 9,
            });
            break;
        case 'webp':
        default:
            pipeline = pipeline.webp({
                quality: opts.quality,
            });
            break;
    }

    const processedBuffer = await pipeline.toBuffer();
    const metadata = await sharp(processedBuffer).metadata();

    const mimeTypeMap: Record<string, string> = {
        jpeg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
    };

    return {
        buffer: processedBuffer,
        width: metadata.width || 0,
        height: metadata.height || 0,
        format: opts.format,
        size: processedBuffer.length,
        mimeType: mimeTypeMap[opts.format] || 'image/webp',
    };
}

/**
 * Check if EXIF data is present in image
 * Useful for testing that EXIF was stripped
 */
export async function hasExifData(buffer: Buffer): Promise<boolean> {
    try {
        const metadata = await sharp(buffer).metadata();
        // Check for common EXIF indicators
        return !!(metadata.exif || metadata.icc || metadata.iptc || metadata.xmp);
    } catch {
        return false;
    }
}
