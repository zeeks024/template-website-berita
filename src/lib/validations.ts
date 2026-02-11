import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string({ message: 'Email wajib diisi' })
        .email('Format email tidak valid'),
    password: z
        .string({ message: 'Password wajib diisi' })
        .min(1, 'Password wajib diisi')
});

export const registerSchema = z.object({
    name: z
        .string({ message: 'Nama wajib diisi' })
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),
    email: z
        .string({ message: 'Email wajib diisi' })
        .email('Format email tidak valid'),
    password: z
        .string({ message: 'Password wajib diisi' })
        .min(6, 'Password minimal 6 karakter')
        .max(100, 'Password maksimal 100 karakter'),
    role: z
        .enum(['READER', 'WRITER'], { message: 'Role harus READER atau WRITER' })
        .optional()
        .default('READER')
});

export const forgotPasswordSchema = z.object({
    email: z
        .string({ message: 'Email wajib diisi' })
        .email('Format email tidak valid')
});

export const resetPasswordSchema = z.object({
    token: z
        .string({ message: 'Token wajib diisi' })
        .min(1, 'Token wajib diisi'),
    password: z
        .string({ message: 'Password wajib diisi' })
        .min(6, 'Password minimal 6 karakter')
        .max(100, 'Password maksimal 100 karakter')
});

export const articleSchema = z.object({
    title: z
        .string({ message: 'Judul wajib diisi' })
        .min(5, 'Judul minimal 5 karakter')
        .max(200, 'Judul maksimal 200 karakter'),
    slug: z
        .string({ message: 'Slug wajib diisi' })
        .min(3, 'Slug minimal 3 karakter')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Format slug tidak valid (gunakan huruf kecil dan dash)'),
    summary: z
        .string({ message: 'Ringkasan wajib diisi' })
        .min(10, 'Ringkasan minimal 10 karakter')
        .max(500, 'Ringkasan maksimal 500 karakter'),
    content: z
        .string({ message: 'Konten wajib diisi' })
        .min(50, 'Konten minimal 50 karakter'),
    image: z
        .string({ message: 'Gambar wajib diisi' })
        .url('Format URL gambar tidak valid'),
    category: z
        .string({ message: 'Kategori wajib diisi' })
        .min(1, 'Kategori wajib diisi'),
    author: z.string().optional(),
    status: z
        .enum(['draft', 'pending_review', 'published', 'rejected', 'scheduled', 'archived'], { message: 'Status tidak valid' })
        .optional()
        .default('draft'),
    featured: z.boolean().optional().default(false),
    readTime: z.string().optional(),
    tags: z.string().optional(),
    gallery: z.string().optional()
});

export const commentSchema = z.object({
    articleId: z
        .number({ message: 'Article ID wajib diisi' })
        .int('Article ID harus integer')
        .positive('Article ID harus positif'),
    content: z
        .string({ message: 'Komentar wajib diisi' })
        .min(1, 'Komentar wajib diisi')
        .max(1000, 'Komentar maksimal 1000 karakter')
});

export const categorySchema = z.object({
    name: z
        .string({ message: 'Nama kategori wajib diisi' })
        .min(2, 'Nama kategori minimal 2 karakter')
        .max(50, 'Nama kategori maksimal 50 karakter')
});

export function formatZodErrors(error: z.ZodError): string {
    return error.issues.map((e: z.ZodIssue) => e.message).join(', ');
}

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ArticleInput = z.infer<typeof articleSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;

// --- Article Status Transition Logic ---

type Role = 'ADMIN' | 'WRITER' | 'READER';

const STATUS_TRANSITIONS: Record<string, { to: string[]; roles: Role[] }[]> = {
    draft: [
        { to: ['pending_review'], roles: ['WRITER', 'ADMIN'] },
        { to: ['published'], roles: ['ADMIN'] },
    ],
    pending_review: [
        { to: ['published'], roles: ['ADMIN'] },
        { to: ['rejected'], roles: ['ADMIN'] },
        { to: ['draft'], roles: ['ADMIN'] },
    ],
    rejected: [
        { to: ['draft'], roles: ['WRITER', 'ADMIN'] },
        { to: ['pending_review'], roles: ['WRITER', 'ADMIN'] },
    ],
    published: [
        { to: ['archived'], roles: ['WRITER', 'ADMIN'] },
        { to: ['draft'], roles: ['ADMIN'] },
    ],
    archived: [
        { to: ['draft'], roles: ['ADMIN'] },
    ],
    scheduled: [
        { to: ['draft'], roles: ['WRITER', 'ADMIN'] },
        { to: ['published'], roles: ['ADMIN'] },
    ],
};

export function validateStatusTransition(
    fromStatus: string,
    toStatus: string,
    role: Role
): { valid: boolean; message?: string } {
    if (fromStatus === toStatus) return { valid: true };

    const transitions = STATUS_TRANSITIONS[fromStatus];
    if (!transitions) {
        return { valid: false, message: `Status "${fromStatus}" tidak dikenali` };
    }

    const allowed = transitions.find(t => t.to.includes(toStatus));
    if (!allowed) {
        return { valid: false, message: `Tidak dapat mengubah status dari "${fromStatus}" ke "${toStatus}"` };
    }

    if (!allowed.roles.includes(role)) {
        return { valid: false, message: `Role ${role} tidak memiliki izin untuk mengubah status dari "${fromStatus}" ke "${toStatus}"` };
    }

    return { valid: true };
}

export function getAllowedStatuses(currentStatus: string, role: Role): string[] {
    const transitions = STATUS_TRANSITIONS[currentStatus];
    if (!transitions) return [];

    return transitions
        .filter(t => t.roles.includes(role))
        .flatMap(t => t.to);
}
