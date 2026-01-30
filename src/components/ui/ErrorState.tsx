import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    showHomeLink?: boolean;
    className?: string;
}

export default function ErrorState({
    title = 'Terjadi Kesalahan',
    message = 'Maaf, terjadi kesalahan saat memuat data. Silakan coba lagi.',
    onRetry,
    showHomeLink = true,
    className = ''
}: ErrorStateProps) {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-12 bg-card border border-border rounded-3xl ${className}`}>
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <AlertCircle size={40} className="text-red-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">{message}</p>
            
            <div className="flex flex-wrap gap-3 justify-center">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-sm uppercase tracking-wider transition-colors"
                    >
                        <RefreshCw size={16} />
                        Coba Lagi
                    </button>
                )}
                {showHomeLink && (
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-full font-bold text-sm uppercase tracking-wider transition-colors border border-border"
                    >
                        <Home size={16} />
                        Ke Beranda
                    </Link>
                )}
            </div>
        </div>
    );
}
