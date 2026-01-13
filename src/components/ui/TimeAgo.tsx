"use client";

import { useEffect, useState } from 'react';
import { formatTimeAgo } from '@/lib/dateUtils';

export default function TimeAgo({ date }: { date: string | Date | number }) {
    // Initialize with the formatted string to avoid hydration mismatch if possible, 
    // but better to useEffect for "live" parts to match server/client.
    // Actually, simple way: renders formatted string.
    const [timeString, setTimeString] = useState<string>('');

    useEffect(() => {
        // Initial set
        setTimeString(formatTimeAgo(date));

        // Update every 60 seconds
        const interval = setInterval(() => {
            setTimeString(formatTimeAgo(date));
        }, 60000);

        return () => clearInterval(interval);
    }, [date]);

    // Avoid hydration mismatch by rendering nothing or fallback on first pass?
    // Or just render the static formatTimeAgo(date) if we are sure server/client match.
    // Ideally, for SSR, we might render the full date or the initial calculation.
    // Changes to "X minutes ago" might handle hydration diffs. 
    // Safest for hydration: Render formatted on server, then hydrate.
    // But formatTimeAgo is based on "now". Server "now" != Client "now". 
    // So usually we suppress hydration warning or render on client only.

    // Let's rely on standard text, but if it mismatches, React 18 might complain.
    // Workaround: return span with suppressHydrationWarning
    return (
        <span suppressHydrationWarning>
            {timeString || formatTimeAgo(date)}
        </span>
    );
}
