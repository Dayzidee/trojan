import React, { useState, useRef, useEffect } from 'react';

export interface Coin {
    name: string;
    symbol: string;
    price: string;
    mcap: string;
    vol: string;
    liquidity: string;
    icon: string;
    isSvg: boolean;
}

interface TokenHeaderProps {
    coin: Coin;
    currentAction: 'buy' | 'sell';
    onToggleCoin: () => void;
    allCoinData?: Record<string, Coin>;
    availableCoins?: string[];
    onSelectCoin?: (index: number) => void;
}

const TokenHeader: React.FC<TokenHeaderProps> = ({ coin, onToggleCoin, allCoinData, availableCoins, onSelectCoin }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectCoin = (index: number) => {
        if (onSelectCoin) {
            onSelectCoin(index);
        }
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            {/* Top Row: Coin Info */}
            <div className="relative flex w-full flex-col bg-inherit p-2.5">
                <div className="z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="cursor-pointer" onClick={onToggleCoin}>
                            <div className="group/token-image relative flex flex-shrink-0 cursor-pointer"
                                style={{ borderRadius: '4px', maxWidth: '44px', maxHeight: '44px', width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}>
                                <div className="absolute inset-0"
                                    style={{ borderRadius: '4px', padding: '1.5px', backgroundImage: 'var(--gradient-special-solana)' }}>
                                    <div className="bg-bg-surface2 relative flex h-full w-full items-center justify-center"
                                        style={{ borderRadius: '2.5px' }}>
                                        {coin.isSvg ? (
                                            <div dangerouslySetInnerHTML={{ __html: coin.icon }} />
                                        ) : (
                                            <img
                                                alt={coin.symbol} src={coin.icon}
                                                width="44" height="44" className="absolute"
                                                style={{ maxWidth: '38px', maxHeight: '38px', width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', borderRadius: '1px', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                    <div
                                        className="bg-static-black border-bg-base absolute flex items-center justify-center rounded-full border"
                                        style={{ height: '16px', width: '16px', bottom: '-3px', right: '-3px' }}>
                                        <img alt="solana" src="https://cdn.trojan.com/apps/solana.svg" width="14" height="14" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                                <div className="xs:max-w-[200px] flex max-w-[150px] items-center gap-1 overflow-hidden md:max-w-[120px] cursor-pointer hover:opacity-80"
                                    onClick={onToggleCoin}>
                                    <p className="label-sm text-text-primary whitespace-nowrap font-medium">{coin.symbol}</p>
                                    <p className="label-xs text-text-tertiary truncate font-normal">{coin.name}</p>
                                </div>
                                <div className="text-icon-tertiary hover:text-icon-secondary flex h-4 w-4 cursor-pointer items-center transition-colors">
                                    <svg width="1em" height="1em" className="m-auto h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Coin Selector Dropdown Replaces Orca */}
                            <div className="flex items-center gap-1.5 relative" ref={dropdownRef}>

                                <div
                                    className="flex max-w-[140px] cursor-pointer items-center gap-1.5 overflow-hidden group select-none hover:bg-bg-surface2 rounded-4 px-1 -ml-1 transition-colors"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center">
                                        {coin.isSvg ? (
                                            <div className="w-full h-full transform scale-75" dangerouslySetInnerHTML={{ __html: coin.icon }} />
                                        ) : (
                                            <img src={coin.icon} alt={coin.symbol} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <p className="label-2xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap font-medium">{coin.symbol} Pair</p>
                                    <svg
                                        width="1em" height="1em"
                                        className={`text-icon-tertiary h-3.5 w-3.5 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && allCoinData && availableCoins && (
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-bg-surface1 border border-stroke-subtle rounded-8 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                        <div className="px-3 py-2 text-[10px] text-text-tertiary font-medium bg-bg-surface2 border-b border-stroke-subtle">SELECT PAIR</div>
                                        <div className="max-h-60 overflow-y-auto p-1">
                                            {availableCoins.map((symbol, index) => {
                                                const token = allCoinData[symbol];
                                                return (
                                                    <div
                                                        key={symbol}
                                                        className={`flex items-center gap-2 p-2 rounded-6 cursor-pointer transition-colors ${coin.symbol === symbol ? 'bg-bg-surface2' : 'hover:bg-bg-surface2'}`}
                                                        onClick={() => handleSelectCoin(index)}
                                                    >
                                                        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-bg-surface1 border border-stroke-subtle">
                                                            {token.isSvg ? (
                                                                <div className="w-4 h-4" dangerouslySetInnerHTML={{ __html: token.icon }} />
                                                            ) : (
                                                                <img src={token.icon} alt={token.name} className="w-full h-full object-cover" />
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="label-xs font-bold text-text-primary">{token.symbol}</span>
                                                            <span className="text-[10px] text-text-tertiary">{token.name}</span>
                                                        </div>
                                                        {coin.symbol === symbol && (
                                                            <div className="ml-auto text-accent-green">
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="label-2xs text-text-tertiary text-left">MCap</p>
                        <p className="label-sm text-text-primary font-medium">{coin.mcap}</p>
                    </div>
                </div>
            </div>

            {/* Security Audit Section - Flow naturally */}
            <div className="px-2.5">
                <div className="bg-bg-surface1 rounded-8 border border-stroke-subtle overflow-hidden">
                    <div className="flex w-full items-center justify-between p-3 pl-4 bg-bg-surface2 border-b border-stroke-subtle cursor-pointer hover:bg-bg-surface3 transition-colors">
                        <div className="flex items-center gap-2">
                            <p className="label-2xs text-text-secondary font-medium">Security Audit</p>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green h-4 w-4">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-icon-tertiary h-4 w-4">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>

                    <div className="p-4 flex flex-col gap-3">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-8 border border-stroke-subtle flex items-center justify-between px-3 py-2.5 bg-bg-surface1">
                                <span className="label-2xs text-text-tertiary">Bundled</span>
                                <span className="label-2xs text-accent-green">0%</span>
                            </div>
                            <div className="rounded-8 border border-stroke-subtle flex items-center justify-between px-3 py-2.5 bg-bg-surface1">
                                <span className="label-2xs text-text-tertiary">Sniped</span>
                                <span className="label-2xs text-accent-green">0%</span>
                            </div>
                            <div className="rounded-8 border border-stroke-subtle flex items-center justify-between px-3 py-2.5 bg-bg-surface1">
                                <span className="label-2xs text-text-tertiary">Dev H.</span>
                                <span className="label-2xs text-accent-green">0%</span>
                            </div>
                            <div className="rounded-8 border border-stroke-subtle flex items-center justify-between px-3 py-2.5 bg-bg-surface1">
                                <span className="label-2xs text-text-tertiary">Top 10</span>
                                <span className="label-2xs text-accent-red">12%</span>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-1.5">
                            {['MA', 'FA', 'TM', 'LP', 'UA'].map((badge) => (
                                <div key={badge} className={`flex-1 rounded-6 flex items-center justify-center gap-1 px-2 py-1 bg-opacity-[0.1] cursor-default ${['LP', 'UA'].includes(badge) ? 'bg-accent-green text-accent-green' : 'bg-accent-red text-accent-red'}`}>
                                    <span className="label-2xs font-bold">{badge}</span>
                                </div>
                            ))}
                        </div>

                        <div className="h-px w-full bg-stroke-subtle"></div>

                        {/* Addresses */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="label-2xs text-text-tertiary">Contract</span>
                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <span className="label-2xs text-text-secondary group-hover:text-text-primary transition-colors">8Gw...oupv</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-icon-tertiary group-hover:text-icon-secondary">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="label-2xs text-text-tertiary">Pair</span>
                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <span className="label-2xs text-text-secondary group-hover:text-text-primary transition-colors">6a3...xYgd</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-icon-tertiary group-hover:text-icon-secondary">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenHeader;
