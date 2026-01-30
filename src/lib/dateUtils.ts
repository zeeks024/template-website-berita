export function formatWIB(date: Date | string | number): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
        timeZoneName: 'short'
    }).format(d).replace('pukul', ''); // Common ID cleanup
}

/**
 * Format date only (no time) in WIB timezone
 * Example: "30 Januari 2026"
 */
export function formatDateWIB(date: Date | string | number): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta'
    }).format(d);
}

/**
 * Format short date in WIB timezone
 * Example: "30 Jan 2026"
 */
export function formatShortDateWIB(date: Date | string | number): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Jakarta'
    }).format(d);
}

export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} menit baca`;
}

export function formatTimeAgo(date: Date | string | number): string {
    const d = new Date(date);
    // Handle invalid dates (legacy strings like "Senin, ...")
    if (isNaN(d.getTime())) return date.toString();

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Baru saja';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} menit yang lalu`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} jam yang lalu`;
    }

    // Fallback to full date if > 24 hours
    return formatWIB(d);
}
