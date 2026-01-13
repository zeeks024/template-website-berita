export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            {/* Hero Skeleton */}
            <div className="h-64 md:h-96 bg-slate-200 dark:bg-slate-700 rounded-xl mb-8"></div>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
