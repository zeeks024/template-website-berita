"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showInfo?: boolean;
    total?: number;
    limit?: number;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
    showInfo = true,
    total = 0,
    limit = 10
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            
            if (page > 3) pages.push('...');
            
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);
            
            for (let i = start; i <= end; i++) pages.push(i);
            
            if (page < totalPages - 2) pages.push('...');
            
            pages.push(totalPages);
        }
        
        return pages;
    };

    const buttonBase = "p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed";
    const buttonActive = "bg-primary text-primary-foreground hover:bg-primary/90";
    const buttonInactive = "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground";

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 border-t border-border">
            {showInfo && (
                <p className="text-sm text-muted-foreground">
                    Menampilkan <span className="font-medium text-foreground">{startItem}-{endItem}</span> dari{' '}
                    <span className="font-medium text-foreground">{total}</span> artikel
                </p>
            )}

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={page === 1}
                    className={buttonBase + " " + buttonInactive}
                    aria-label="Halaman pertama"
                >
                    <ChevronsLeft size={16} />
                </button>
                
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className={buttonBase + " " + buttonInactive}
                    aria-label="Halaman sebelumnya"
                >
                    <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1 mx-2">
                    {getPageNumbers().map((pageNum, idx) => (
                        pageNum === '...' ? (
                            <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>
                        ) : (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum as number)}
                                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                                    page === pageNum ? buttonActive : buttonInactive
                                }`}
                            >
                                {pageNum}
                            </button>
                        )
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className={buttonBase + " " + buttonInactive}
                    aria-label="Halaman berikutnya"
                >
                    <ChevronRight size={16} />
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={page === totalPages}
                    className={buttonBase + " " + buttonInactive}
                    aria-label="Halaman terakhir"
                >
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
    );
}
