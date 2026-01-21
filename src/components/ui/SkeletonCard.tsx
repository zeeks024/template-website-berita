export default function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-white/5 border border-white/5 rounded-2xl ${className}`}>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
    );
}
