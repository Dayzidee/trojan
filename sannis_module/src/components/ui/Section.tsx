import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className, id, ...props }) => {
    return (
        <section
            id={id}
            className={`py-12 md:py-24 ${className || ''}`}
            {...props}
        >
            {children}
        </section>
    );
};

export default Section;
