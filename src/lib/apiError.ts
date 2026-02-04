import { NextResponse } from 'next/server';

/**
 * Standard API error codes used across the application
 */
export const ApiErrorCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ApiErrorCodeType = typeof ApiErrorCode[keyof typeof ApiErrorCode];

/**
 * Custom API Error class for throwing typed errors
 */
export class ApiError extends Error {
  constructor(
    public code: ApiErrorCodeType,
    message?: string
  ) {
    super(message || code);
    this.name = 'ApiError';
  }
}

/**
 * Convenience functions for throwing common errors
 */
export function throwUnauthorized(message = 'Unauthorized'): never {
  throw new ApiError(ApiErrorCode.UNAUTHORIZED, message);
}

export function throwForbidden(message = 'Forbidden'): never {
  throw new ApiError(ApiErrorCode.FORBIDDEN, message);
}

export function throwNotFound(message = 'Not found'): never {
  throw new ApiError(ApiErrorCode.NOT_FOUND, message);
}

export function throwBadRequest(message = 'Bad request'): never {
  throw new ApiError(ApiErrorCode.BAD_REQUEST, message);
}

/**
 * Centralized API error handler
 * Converts errors to appropriate NextResponse with correct status codes
 * 
 * @param error - The caught error
 * @param context - Description of what operation failed (e.g., "fetch users", "create article")
 * @returns NextResponse with appropriate status code and error message
 * 
 * @example
 * ```typescript
 * try {
 *   // ... your code
 * } catch (error) {
 *   return handleApiError(error, 'fetch users');
 * }
 * ```
 */
export function handleApiError(error: unknown, context: string): NextResponse {
  if (error instanceof ApiError) {
    switch (error.code) {
      case ApiErrorCode.UNAUTHORIZED:
        return NextResponse.json(
          { error: error.message || 'Unauthorized' },
          { status: 401 }
        );
      case ApiErrorCode.FORBIDDEN:
        return NextResponse.json(
          { error: error.message || 'Forbidden' },
          { status: 403 }
        );
      case ApiErrorCode.NOT_FOUND:
        return NextResponse.json(
          { error: error.message || 'Not found' },
          { status: 404 }
        );
      case ApiErrorCode.BAD_REQUEST:
        return NextResponse.json(
          { error: error.message || 'Bad request' },
          { status: 400 }
        );
      case ApiErrorCode.CONFLICT:
        return NextResponse.json(
          { error: error.message || 'Conflict' },
          { status: 409 }
        );
      default:
        return NextResponse.json(
          { error: `Failed to ${context}` },
          { status: 500 }
        );
    }
  }

  if (error instanceof Error) {
    const message = error.message;
    
    if (message === 'UNAUTHORIZED') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (message === 'FORBIDDEN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    if (message === 'NOT_FOUND') {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.error(`API Error [${context}]:`, error);
    }
  }

  return NextResponse.json(
    { error: `Failed to ${context}` },
    { status: 500 }
  );
}

/**
 * Require authentication - throws if user is null/undefined
 */
export function requireAuth<T>(user: T | null | undefined, message = 'Unauthorized'): T {
  if (!user) {
    throwUnauthorized(message);
  }
  return user;
}

/**
 * Require admin role - throws if user is not admin
 */
export function requireAdmin(role: string | undefined, message = 'Forbidden: Admin only'): void {
  if (role !== 'ADMIN') {
    throwForbidden(message);
  }
}

/**
 * Require writer or admin role - throws if user is not writer or admin
 */
export function requireWriter(role: string | undefined, message = 'Forbidden: Writer access required'): void {
  if (role !== 'ADMIN' && role !== 'WRITER') {
    throwForbidden(message);
  }
}
