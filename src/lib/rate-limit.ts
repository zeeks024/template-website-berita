type RateLimitEntry = {
    count: number;
    resetTime: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    
    lastCleanup = now;
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

export interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
}

export function rateLimit(
    identifier: string,
    config: RateLimitConfig
): RateLimitResult {
    cleanup();
    
    const now = Date.now();
    const key = identifier;
    const entry = rateLimitStore.get(key);
    
    if (!entry || now > entry.resetTime) {
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + config.windowMs
        });
        return {
            success: true,
            remaining: config.maxRequests - 1,
            resetTime: now + config.windowMs
        };
    }
    
    if (entry.count >= config.maxRequests) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        return {
            success: false,
            remaining: 0,
            resetTime: entry.resetTime,
            retryAfter
        };
    }
    
    entry.count++;
    return {
        success: true,
        remaining: config.maxRequests - entry.count,
        resetTime: entry.resetTime
    };
}

export function getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }
    
    return 'unknown';
}

export const RATE_LIMIT_CONFIGS = {
    login: {
        maxRequests: 5,
        windowMs: 15 * 60 * 1000
    },
    register: {
        maxRequests: 3,
        windowMs: 60 * 60 * 1000
    },
    forgotPassword: {
        maxRequests: 3,
        windowMs: 60 * 60 * 1000
    },
    newsletter: {
        maxRequests: 5,
        windowMs: 60 * 60 * 1000
    }
} as const;

export function checkRateLimit(
    identifier: string,
    maxRequests: number,
    windowMs: number
): RateLimitResult {
    return rateLimit(identifier, { maxRequests, windowMs });
}
