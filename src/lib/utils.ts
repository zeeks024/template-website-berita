import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatTimeAgo(dateInput: string | Date | undefined): string {
    if (!dateInput) return '';

    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
        return typeof dateInput === 'string' ? dateInput : '';
    }

    return formatDistanceToNow(date, { addSuffix: true, locale: id });
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
