import React from 'react';
// import { cn } from '../../../lib/utils';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    highlight?: string;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    highlight,
    className,
    align = 'center'
}) => {
    return (
        <div className={`mb-12 relative z-10 ${align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'} ${className}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
                {title}
                {highlight && (
                    <>
                        <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                            {' '}{highlight}
                        </span>
                    </>
                )}
            </h2>
            {subtitle && (
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
