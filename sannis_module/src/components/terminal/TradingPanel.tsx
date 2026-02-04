import React from 'react';

interface TradingPanelProps {
    currentAction: 'buy' | 'sell';
    onToggleAction: (action: 'buy' | 'sell') => void;
}

const TradingPanel: React.FC<TradingPanelProps> = ({ currentAction, onToggleAction }) => {
    const [orderType, setOrderType] = React.useState<'market' | 'limit' | 'dca'>('market');
    const [priority, setPriority] = React.useState<'fast' | 'turbo' | 'eco'>('turbo');
    const [autoSell, setAutoSell] = React.useState(false);

    return (
        <div className="flex w-full flex-col gap-3 pt-3">
            {/* Order Type Tabs */}
            <div className="flex h-[30px] items-center justify-between gap-1 mb-1">
                <div className="flex items-center bg-bg-surface2 rounded-6 p-0.5">
                    {['market', 'limit', 'dca'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setOrderType(type as any)}
                            className={`label-2xs relative flex h-6 items-center justify-center px-3 text-center transition-colors rounded-4 ${orderType === type ? 'text-text-primary bg-bg-surface3 shadow-sm' : 'text-text-tertiary hover:text-text-secondary'}`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Wallet Selector (Visual Only) */}
                <button className="hidden md:inline-flex outline-none items-center focus-visible:ring-0 group focus-visible:outline-none whitespace-nowrap justify-center label-2xs disabled:pointer-events-none disabled:opacity-40 relative rounded-8 text-text-secondary bg-neutral-850 hover:bg-neutral-800 border border-stroke-subtle transition-opacity duration-200 gap-1.5 h-[26px] w-fit px-2">
                    <div className="label-2xs text-text-secondary flex h-full items-center gap-1.5">
                        <div className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-icon-tertiary group-hover:text-icon-secondary transition-colors">
                                <rect x="2" y="5" width="20" height="14" rx="2" />
                                <line x1="2" y1="10" x2="22" y2="10" />
                            </svg>
                            1
                        </div>
                    </div>
                </button>
            </div>

            {/* Buy/Sell/Slider */}
            <div className="flex items-center gap-2">
                <div className="rounded-6 bg-neutral-850 relative z-0 flex h-fit flex-1 flex-shrink-0 overflow-hidden">
                    <button
                        onClick={() => onToggleAction('buy')}
                        className={`inline-flex outline-none w-full items-center justify-center label-2xs relative h-8 rounded-8 px-1.5 transition-all z-[1] ${currentAction === 'buy' ? 'text-accent-green font-bold' : 'text-text-tertiary'}`}
                        type="button">
                        <span>Buy</span>
                    </button>

                    <button
                        onClick={() => onToggleAction('sell')}
                        className={`inline-flex outline-none w-full items-center justify-center label-2xs relative h-8 rounded-8 px-1.5 transition-all z-[1] ${currentAction === 'sell' ? 'text-accent-red font-bold' : 'text-text-tertiary'}`}
                        type="button">
                        <span>Sell</span>
                    </button>

                    <div
                        className={`rounded-6 pointer-events-none absolute bottom-0 top-0 z-10 h-full w-1/2 border transition-all duration-200 ${currentAction === 'buy' ? 'bg-alpha-green-tertiary border-alpha-green-tertiary left-0' : 'bg-alpha-red-tertiary border-alpha-red-tertiary left-1/2'}`}>
                    </div>
                </div>
                <button className="text-icon-tertiary hover:text-icon-secondary h-6 w-6">
                    <svg width="1em" height="1em" className="w-4.5 h-4.5 transition-transform rotate-180">
                        <use href="#icon-chevron-down-small-outline"></use>
                    </svg>
                </button>
            </div>

            {/* Input Area */}
            <div className="flex w-full flex-col gap-2">
                <div className="flex h-10 items-center justify-between gap-2 px-3 rounded-8 bg-bg-surface2 border border-stroke-subtle hover:bg-bg-surface3 transition-colors cursor-text group">
                    <div className="flex items-center gap-1.5">
                        <img src="https://cdn.trojan.com/coins/sol.svg" alt="SOL" className="w-4.5 h-4.5 rounded-full" />
                        <span className="label-sm text-text-secondary font-medium">SOL</span>
                    </div>
                    <input className="flex-1 bg-transparent text-right outline-none text-text-primary label-sm placeholder:text-text-disabled w-full" placeholder="0" />
                </div>
            </div>

            {/* Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
                {[0.1, 0.5, 1.0, 5.0].map((val) => (
                    <button key={val} className="rounded-6 bg-bg-surface2 border border-stroke-subtle px-2 py-1.5 label-xs text-text-tertiary hover:bg-neutral-800 hover:text-text-secondary transition-colors">
                        {val}
                    </button>
                ))}
            </div>

            {/* Execute Button */}
            <button className={`w-full py-3 rounded-8 label-sm font-bold transition-all shadow-lg ${currentAction === 'buy' ? 'bg-accent-green text-black hover:bg-opacity-90 shadow-green-900/20' : 'bg-accent-red text-white hover:bg-opacity-90 shadow-red-900/20'}`}>
                {currentAction === 'buy' ? 'Buy SOL' : 'Sell SOL'}
            </button>

            {/* Auto Sell & Priority */}
            <div className="flex w-full items-center justify-between mt-1">
                <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setAutoSell(!autoSell)}>
                    <div className={`w-4 h-4 rounded-4 border flex items-center justify-center transition-colors ${autoSell ? 'bg-text-primary border-text-primary' : 'border-stroke-strong'}`}>
                        {autoSell && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <span className="label-2xs text-text-tertiary group-hover:text-text-secondary transition-colors">Auto Sell</span>
                </div>

                {/* Priority Selector */}
                <div className="flex items-center gap-1 bg-bg-surface2 rounded-8 p-0.5 border border-stroke-subtle">
                    {['fast', 'turbo', 'eco'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPriority(p as any)}
                            className={`label-2xs px-2 py-0.5 rounded-6 transition-colors uppercase ${priority === p ? 'bg-neutral-700 text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}
                        >
                            {p}
                        </button>
                    ))}
                    <button className="px-1.5 text-icon-tertiary hover:text-icon-secondary">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>
                    </button>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="flex items-center justify-between border-t border-stroke-subtle pt-2 mt-2">
                <div className="flex items-center gap-2">
                    <span className="label-2xs text-text-tertiary">Gas: 0.0015</span>
                    <span className="label-2xs text-text-tertiary">Fee: 0.001</span>
                </div>
                <button className="text-icon-tertiary hover:text-icon-secondary">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
            </div>
        </div>
    );
};

export default TradingPanel;
