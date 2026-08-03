import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, className, error, ...props }, ref) => {
    return (
        <div className="w-full space-y-2">
            <h3 className="font-medium capitalize text-2xl">{label}</h3>
            <input
                ref={ref}
                className={twMerge(
                    'w-full py-6 px-5 bg-[#E9E9E8] placeholder:[#696969] placeholder:uppercase',
                    className
                )}
                {...props}
            />
            {error && <p className="text-red-400">{error.message}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
