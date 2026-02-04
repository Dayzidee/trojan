import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: React.ElementType;
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, className }) => {
    return (
        <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group ${className}`}>
            {Icon && (
                <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5 text-green-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

export default FeatureCard;
