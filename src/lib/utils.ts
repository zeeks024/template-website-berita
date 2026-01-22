import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatTimeAgo(dateInput: string | Date | undefined): string {
    if (!dateInput) return '';

    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // Check for invalid date
    if (isNaN(date.getTime())) {
        // If the input was a string like "1 jam lalu" that date-fns can't parse, 
        // return it as is (fallback for legacy seed data)
        return typeof dateInput === 'string' ? dateInput : '';
    }

    return formatDistanceToNow(date, { addSuffix: true, locale: id });
}
