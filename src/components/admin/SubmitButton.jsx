'use client';

import { twMerge } from 'tailwind-merge';

const SubmitButton = ({ label, onClick, disabled, className }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={twMerge('p-4 bg-black text-white uppercase', className)}
        >
            {label}
        </button>
    );
};

export default SubmitButton;
