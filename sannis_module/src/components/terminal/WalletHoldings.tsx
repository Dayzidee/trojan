import React from 'react';

interface CoinMeta {
    name: string;
    symbol: string;
    address: string;
}

interface CoinData {
    [key: string]: {
        name: string;
        symbol: string;
        price: string;
        icon: string;
        isSvg: boolean;
    };
}

interface WalletHoldingsProps {
    balances: { [key: string]: number };
    prices: { [key: string]: number };
    coinData: CoinData;
    depositCoins: CoinMeta[];
    onDeposit?: () => void;
    onWithdraw?: () => void;
    onConnect?: () => void;
    onManage?: () => void;
}

const MOCK_HISTORY: any[] = [];

const WalletHoldings: React.FC<WalletHoldingsProps> = ({ balances, prices, coinData, depositCoins, onDeposit, onWithdraw, onConnect, onManage }) => {
    return (
        <div id="analytics-column" className="border border-stroke-subtle rounded-8 relative h-auto lg:h-full w-full lg:w-auto flex-col overflow-hidden transition-all flex-1 shadow-sm bg-bg-surface1 order-2 lg:order-none min-h-[500px] flex">
            <div className="hide-scrollbar flex h-full flex-col gap-2 overflow-y-auto overscroll-none p-2">
                <div data-scroll-container="true" className="hide-scrollbar" style={{ flex: '1 1 auto', overflowX: 'hidden', overflowY: 'unset', borderRadius: '8px' }}>
                    <div className="flex h-full w-full flex-1">
                        <div className="flex w-full flex-1 flex-col">
                            <div className="flex items-center justify-between px-2 pb-5 pt-3">
                                <div role="tablist" className="rounded-8 z-0 flex w-full items-center relative h-8">
                                    <button role="tab" aria-selected="true" className="group relative z-10 h-full whitespace-nowrap transition-all aria-selected:text-text-primary aria-[selected=false]:text-text-tertiary px-4 label-xs">Wallets</button>
                                    <div className="absolute transition-all duration-200 rounded-8 bg-alpha-neutral-secondary" style={{ width: '76.3333px', left: '0px', height: '100%' }}></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={onWithdraw} className="h-8 rounded-8 bg-neutral-800 hover:bg-neutral-700 border border-stroke-subtle px-3 label-2xs text-text-primary transition-colors">Withdraw</button>
                                    <button onClick={onDeposit} className="h-8 rounded-8 bg-alpha-green-secondary hover:bg-alpha-green-primary border border-alpha-green-primary px-3 label-2xs text-text-primary transition-colors">Deposit</button>
                                </div>
                            </div>

                            <div className="flex w-full flex-1 flex-col">
                                <div className="bg-bg-surface1 rounded-t-8 border-stroke-subtle sticky z-10 flex items-center justify-between gap-2 border-b px-2.5 h-[42px] top-0">
                                    <div className="flex items-center gap-2">
                                        <span className="label-2xs text-text-primary font-medium">Active Wallets</span>
                                        <div className="bg-alpha-white-tertiary rounded-6 px-1.5 label-2xs text-text-secondary">{depositCoins.length}</div>
                                    </div>
                                    <button onClick={onConnect} className="h-6 rounded-6 bg-neutral-850 hover:bg-neutral-800 border border-stroke-subtle px-2 label-2xs text-text-secondary transition-colors">Connect Wallet</button>
                                </div>

                                <div className="flex-1 min-h-0 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="sticky top-0 bg-neutral-825 border-b border-stroke-subtle z-10">
                                            <tr>
                                                <th className="px-4 py-2 label-3xs text-text-tertiary font-normal">Wallet</th>
                                                <th className="px-4 py-2 label-3xs text-text-tertiary font-normal">Balance</th>
                                                <th className="px-4 py-2 label-3xs text-text-tertiary font-normal text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {depositCoins.map((coin) => {
                                                const data = coinData[coin.symbol];
                                                const balance = balances[coin.symbol] || 0;
                                                const price = prices[coin.symbol] || 0;
                                                return (
                                                    <tr key={coin.symbol} className="hover:bg-bg-surface2 transition-colors border-b border-stroke-faint">
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-bg-surface3">
                                                                    {data.isSvg ? (
                                                                        <div className="w-5 h-5 flex items-center justify-center transform scale-90" dangerouslySetInnerHTML={{ __html: data.icon }} />
                                                                    ) : (
                                                                        <img src={data.icon} className="w-5 h-5 rounded-full" alt={coin.symbol} />
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="label-2xs text-text-primary font-medium truncate">{coin.name} Wallet</span>
                                                                    <span className="label-3xs text-text-tertiary truncate">{coin.address.slice(0, 4)}...{coin.address.slice(-4)}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex flex-col">
                                                                <span className="label-2xs text-text-primary font-medium">{balance.toFixed(2)} {coin.symbol}</span>
                                                                <span className="label-3xs text-text-tertiary">${(balance * price).toFixed(2)}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <button onClick={onManage} className="h-7 rounded-6 bg-neutral-850 hover:bg-neutral-800 border border-stroke-subtle px-2 label-2xs text-text-secondary transition-colors">Manage</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simulated History */}
                <div className="bg-bg-surface2 rounded-6 p-2 mt-2">
                    <div className="flex items-center justify-between px-1 mb-2">
                        <span className="label-sm text-text-primary">Transaction History</span>
                        <svg width="12" height="12" className="text-icon-tertiary"><use href="#icon-clock-outline"></use></svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        {MOCK_HISTORY.length > 0 ? (
                            MOCK_HISTORY.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-2 rounded-6 bg-bg-surface1 border border-stroke-faint hover:border-stroke-subtle transition-all cursor-pointer">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className={`label-2xs font-bold ${item.color}`}>{item.type}</span>
                                            <span className="label-2xs text-text-primary">{item.amount}</span>
                                        </div>
                                        <span className="label-3xs text-text-tertiary">{item.time}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-0.5">
                                        <span className="label-2xs text-text-secondary">{item.price}</span>
                                        <span className="label-3xs text-accent-green">{item.status}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center bg-bg-surface1 rounded-6 border border-stroke-faint">
                                <p className="label-2xs text-text-tertiary">no transactions yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletHoldings;
