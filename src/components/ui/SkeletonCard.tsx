"use client";

interface SkeletonCardProps {
    variant?: 'default' | 'horizontal' | 'compact';
    className?: string;
}

export default function SkeletonCard({ variant = 'default', className = '' }: SkeletonCardProps) {
    const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

    if (variant === 'horizontal') {
        return (
            <div className={`flex gap-4 bg-card border border-border rounded-2xl p-4 ${className}`}>
                <div className={`w-24 h-24 rounded-xl bg-muted shrink-0 ${shimmer}`} />
                <div className="flex-1 space-y-3">
                    <div className={`h-4 bg-muted rounded w-1/4 ${shimmer}`} />
                    <div className={`h-5 bg-muted rounded w-3/4 ${shimmer}`} />
                    <div className={`h-4 bg-muted rounded w-1/2 ${shimmer}`} />
                </div>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`bg-card border border-border rounded-xl p-4 space-y-3 ${className}`}>
                <div className={`h-4 bg-muted rounded w-1/3 ${shimmer}`} />
                <div className={`h-5 bg-muted rounded w-full ${shimmer}`} />
                <div className={`h-4 bg-muted rounded w-2/3 ${shimmer}`} />
            </div>
        );
    }

    return (
        <div className={`bg-card border border-border rounded-[2rem] overflow-hidden ${className}`}>
            <div className={`aspect-[4/3] bg-muted ${shimmer}`} />
            <div className="p-6 space-y-4">
                <div className={`h-3 bg-muted rounded w-1/4 ${shimmer}`} />
                <div className={`h-6 bg-muted rounded w-full ${shimmer}`} />
                <div className={`h-6 bg-muted rounded w-3/4 ${shimmer}`} />
                <div className="space-y-2 pt-2">
                    <div className={`h-4 bg-muted rounded w-full ${shimmer}`} />
                    <div className={`h-4 bg-muted rounded w-5/6 ${shimmer}`} />
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                    <div className={`h-3 bg-muted rounded w-20 ${shimmer}`} />
                    <div className={`h-3 bg-muted rounded w-16 ${shimmer}`} />
                </div>
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 6, variant = 'default' }: { count?: number; variant?: 'default' | 'horizontal' | 'compact' }) {
    return (
        <div className={variant === 'horizontal' ? 'space-y-4' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} variant={variant} />
            ))}
        </div>
    );
}
