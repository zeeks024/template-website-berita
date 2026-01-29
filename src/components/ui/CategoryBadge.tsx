import Link from 'next/link';

type CategoryVariant = 'default' | 'outline' | 'solid';

interface CategoryBadgeProps {
    category: string;
    variant?: CategoryVariant;
    size?: 'sm' | 'md' | 'lg';
    asLink?: boolean;
    className?: string;
}

const getCategoryStyle = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('opini')) return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' };
    if (cat.includes('cerita')) return { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' };
    if (cat.includes('sosok')) return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' };
    if (cat.includes('sudut')) return { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800' };
    if (cat.includes('potensi')) return { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-800' };
    return { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-200 dark:border-gray-700' };
};

const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
};

export default function CategoryBadge({
    category,
    variant = 'default',
    size = 'md',
    asLink = false,
    className = ''
}: CategoryBadgeProps) {
    const style = getCategoryStyle(category);
    
    const baseClasses = `inline-block font-bold uppercase tracking-widest rounded-full transition-colors ${sizeClasses[size]}`;
    
    const variantClasses = {
        default: `${style.bg} ${style.text}`,
        outline: `bg-transparent border ${style.border} ${style.text}`,
        solid: `${style.bg} ${style.text} border ${style.border}`
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
    const slug = category.toLowerCase().replace(/\s+/g, '-');

    if (asLink) {
        return (
            <Link href={`/category/${slug}`} className={`${classes} hover:opacity-80`}>
                {category}
            </Link>
        );
    }

    return <span className={classes}>{category}</span>;
}

export { getCategoryStyle };
