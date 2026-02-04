import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Environment validation
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // Optional custom domain

// Error types
export class R2Error extends Error {
    constructor(
        message: string,
        public code: 'CONFIG_ERROR' | 'UPLOAD_ERROR' | 'DELETE_ERROR' | 'LIST_ERROR',
        public cause?: unknown
    ) {
        super(message);
        this.name = 'R2Error';
    }
}

// Lazy initialization to avoid errors when env vars not set during build
let _r2Client: S3Client | null = null;

function getR2Client(): S3Client {
    if (_r2Client) return _r2Client;

    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
        throw new R2Error(
            'R2 configuration missing. Required: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME',
            'CONFIG_ERROR'
        );
    }

    _r2Client = new S3Client({
        region: 'auto',
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
    });

    return _r2Client;
}

// Export for testing
export { getR2Client };

export interface UploadResult {
    success: true;
    key: string;
    url: string;
}

export interface R2Object {
    key: string;
    size: number;
    lastModified: Date;
}

/**
 * Get public URL for an R2 object
 */
export function getPublicUrl(key: string): string {
    if (R2_PUBLIC_URL) {
        // Custom domain (e.g., cdn.serayu.com)
        return `${R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`;
    }
    // Default R2 public URL format
    return `https://pub-${R2_ACCOUNT_ID}.r2.dev/${key}`;
}

/**
 * Upload a buffer to R2
 */
export async function uploadToR2(
    buffer: Buffer,
    key: string,
    contentType: string
): Promise<UploadResult> {
    try {
        const client = getR2Client();

        await client.send(new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: contentType,
            CacheControl: 'public, max-age=31536000, immutable',
        }));

        return {
            success: true,
            key,
            url: getPublicUrl(key),
        };
    } catch (error) {
        throw new R2Error(
            `Failed to upload to R2: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'UPLOAD_ERROR',
            error
        );
    }
}

/**
 * Delete an object from R2
 */
export async function deleteFromR2(key: string): Promise<void> {
    try {
        const client = getR2Client();

        await client.send(new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
        }));
    } catch (error) {
        throw new R2Error(
            `Failed to delete from R2: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'DELETE_ERROR',
            error
        );
    }
}

/**
 * List objects in R2 with optional prefix
 */
export async function listR2Objects(prefix?: string): Promise<R2Object[]> {
    try {
        const client = getR2Client();

        const response = await client.send(new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: prefix,
        }));

        return (response.Contents || []).map(obj => ({
            key: obj.Key || '',
            size: obj.Size || 0,
            lastModified: obj.LastModified || new Date(),
        }));
    } catch (error) {
        throw new R2Error(
            `Failed to list R2 objects: ${error instanceof Error ? error.message : 'Unknown error'}`,
            'LIST_ERROR',
            error
        );
    }
}

/**
 * Generate a unique key for uploaded images
 */
export function generateImageKey(originalFilename: string): string {
    const ext = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `uploads/${timestamp}-${random}.${ext}`;
}
