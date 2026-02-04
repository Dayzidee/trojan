import React from 'react';
import { cn } from '../../utils/cn'; // Assuming a utility for class merging exists, otherwise I'll create one or use template literals

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className || ''}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;
