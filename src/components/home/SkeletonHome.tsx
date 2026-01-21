import SkeletonCard from "@/components/ui/SkeletonCard";

export default function SkeletonHome() {
    return (
        <main className="relative z-10 pt-32 px-6 lg:px-12 max-w-[1600px] mx-auto pb-12 space-y-32">
            {/* Hero Skeleton */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[60vh] lg:min-h-[80vh]">
                <div className="lg:col-span-7 space-y-6">
                    <SkeletonCard className="w-32 h-8 rounded-full" />
                    <SkeletonCard className="w-full h-24 lg:h-40 rounded-3xl" />
                    <SkeletonCard className="w-full max-w-xl h-24 rounded-2xl" />
                    <div className="flex gap-4">
                        <SkeletonCard className="w-48 h-12 rounded-full" />
                        <SkeletonCard className="w-32 h-6 mt-3 rounded-full" />
                    </div>
                </div>
                <div className="lg:col-span-5 relative h-[500px]">
                    <SkeletonCard className="w-full h-full rounded-[3rem]" />
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="space-y-12">
                <div className="flex justify-between items-end">
                    <SkeletonCard className="w-64 h-12 rounded-xl" />
                    <SkeletonCard className="w-32 h-6 rounded-full" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[400px]">
                            <SkeletonCard className="w-full h-full rounded-[2rem]" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
