'use client';
import React from 'react';

/**
 * EmptyState — a reusable empty / no-content indicator.
 *
 * Props:
 *   icon        — a React element to show as the visual (e.g. an SVG or emoji)
 *   title       — short heading text
 *   description — supporting paragraph text
 *   action      — optional { label, onClick } for a CTA button
 */
export default function EmptyState({ icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            {icon && (
                <div className="mb-6 text-[#9E9E9E]">
                    {icon}
                </div>
            )}
            <h2 className="text-2xl md:text-3xl font-semibold font-bebasneue text-[#696969] mb-3">
                {title}
            </h2>
            {description && (
                <p className="text-gray-400 text-base md:text-lg max-w-md">
                    {description}
                </p>
            )}
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-8 px-6 py-2 bg-[#DD846E] text-white font-semibold text-sm hover:bg-[#C7745E] transition-colors duration-300 rounded"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
