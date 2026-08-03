import React, { forwardRef } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const FormField = forwardRef(
    (
        {
            label,
            error,
            hint,
            helper,
            className,
            inputClassName,
            required,
            ...props
        },
        ref
    ) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;
        return (
            <div className={cn('space-y-1.5', className)}>
                {label && (
                    <Label
                        htmlFor={props.id || props.name}
                        className="text-sm font-medium"
                    >
                        {label}
                        {required && (
                            <span className="ml-0.5 text-destructive">*</span>
                        )}
                    </Label>
                )}
                <Input
                    ref={ref}
                    aria-invalid={!!errorMessage}
                    className={cn(
                        'h-10 w-full',
                        errorMessage &&
                            'border-destructive focus-visible:ring-destructive',
                        inputClassName
                    )}
                    {...props}
                />
                {errorMessage ? (
                    <p className="text-xs font-medium text-destructive">
                        {errorMessage}
                    </p>
                ) : helper ? (
                    <p className="text-xs text-muted-foreground">{helper}</p>
                ) : (
                    hint && (
                        <p className="text-xs text-muted-foreground">{hint}</p>
                    )
                )}
            </div>
        );
    }
);

FormField.displayName = 'FormField';

export default FormField;
