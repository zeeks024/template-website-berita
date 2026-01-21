export default function Loading() {
    return (
        <div className="min-h-screen pt-32 pb-12 px-6 container mx-auto animate-pulse">
            {/* Hero Skeleton */}
            <div className="w-full aspect-[21/9] bg-white/5 rounded-3xl mb-12 border border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 p-12 w-2/3 space-y-4">
                    <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                    <div className="h-12 w-full bg-white/10 rounded-xl"></div>
                    <div className="h-12 w-3/4 bg-white/10 rounded-xl"></div>
                </div>
            </div>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-4">
                        <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/5"></div>
                        <div className="space-y-2 px-2">
                            <div className="flex gap-2 mb-2">
                                <div className="h-3 w-16 bg-white/10 rounded-full"></div>
                                <div className="h-3 w-16 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="h-6 bg-white/10 rounded-lg w-full"></div>
                            <div className="h-6 bg-white/10 rounded-lg w-3/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
