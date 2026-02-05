import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
}

export function Container({ children, className, fullWidth = false, ...props }: ContainerProps) {
    return (
        <div
            className={twMerge(
                clsx(
                    'w-full mx-auto',
                    !fullWidth && 'px-[var(--pad-x)] max-w-[2400px]',
                    className
                )
            )}
            {...props}
        >
            {children}
        </div>
    );
}
