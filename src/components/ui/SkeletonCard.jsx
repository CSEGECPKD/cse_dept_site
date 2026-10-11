'use client';
import React from 'react';

/**
 * SkeletonCard — animated pulsing placeholder while content loads.
 *
 * Props:
 *   variant — 'blog' | 'event' | 'person' (controls the layout shape)
 *   count   — number of skeleton cards to render (default: 3)
 */
export function SkeletonCard({ variant = 'blog' }) {
    if (variant === 'blog') {
        return (
            <div className="container mx-auto flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-10 pt-10 px-4 md:px-8 animate-pulse">
                <div className="bg-gray-200 w-full md:w-1/2 h-[250px] md:h-[350px] rounded" />
                <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                    <div className="h-7 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-px bg-gray-200 rounded w-full mt-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4 mt-4" />
                </div>
            </div>
        );
    }

    if (variant === 'event') {
        return (
            <div className="flex flex-col gap-4 animate-pulse px-4 py-6">
                <div className="bg-gray-200 w-full h-[200px] rounded" />
                <div className="h-6 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
        );
    }

    if (variant === 'person') {
        return (
            <div className="bg-white w-[240px] flex flex-col animate-pulse">
                <div className="w-full h-[300px] bg-gray-200" />
                <div className="p-3 flex flex-col gap-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        );
    }

    return null;
}

/**
 * SkeletonList — renders `count` skeleton cards of the given variant.
 */
export function SkeletonList({ variant = 'blog', count = 3 }) {
    return (
        <div className={variant === 'person' ? 'flex flex-wrap gap-3 px-5' : ''}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} variant={variant} />
            ))}
        </div>
    );
}
