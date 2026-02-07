import React from 'react';
import { Link } from 'react-router-dom';

import './Terminal.css';
import TokenHeader from '../components/terminal/TokenHeader';
import TradingPanel from '../components/terminal/TradingPanel';
import WalletHoldings from '../components/terminal/WalletHoldings';

const coins = ['SOL', 'BTC', 'ETH'];

const DEMO_TRADES = [
    { id: 1, date: 'Feb 15, 2026', amountUsed: '$50,000.00', amountWon: '$120,000.00', roi: '+140%', status: 'win' },
    { id: 2, date: 'Feb 02, 2026', amountUsed: '$800.00', amountWon: '$2,400.00', roi: '+200%', status: 'win' },
    { id: 3, date: 'Jan 20, 2026', amountUsed: '$250,000.00', amountWon: '$1,100,000.00', roi: '+340%', status: 'win' },
    { id: 4, date: 'Jan 05, 2026', amountUsed: '$100.00', amountWon: '$5,000.00', roi: '+4900%', status: 'win' },
    { id: 5, date: 'Dec 15, 2025', amountUsed: '$1,200,000.00', amountWon: '$1,800,000.00', roi: '+50%', status: 'win' },
    { id: 6, date: 'Nov 28, 2025', amountUsed: '$15,000.00', amountWon: '$45,000.00', roi: '+200%', status: 'win' },
    { id: 7, date: 'Nov 10, 2025', amountUsed: '$5,000.00', amountWon: '$0.00', roi: '-100%', status: 'loss' },
];

const coinData = {
    SOL: {
        name: 'Solana',
        symbol: 'SOL',
        price: '$145.20',
        mcap: '$68.2B',
        vol: '$2.4B',
        liquidity: '$850M',
        icon: 'https://cdn.trojan.com/coins/sol.svg',
        isSvg: false
    },
    BTC: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$64,230',
        mcap: '$1.2T',
        vol: '$35B',
        liquidity: '$50B',
        icon: '<svg width="18" height="18" viewBox="0 0 32 32" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle cx="16" cy="16" r="16" fill="#F7931A" /><path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" fill="#FFF" /></g></svg>',
        isSvg: true
    },
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        price: '$3,450',
        mcap: '$400B',
        vol: '$15B',
        liquidity: '$20B',
        icon: '<svg width="18" height="18" viewBox="0 0 32 32" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA" /><g fill="#FFF" fillRule="nonzero"><path d="M16.498 4v8.87l7.497 3.35z" fillOpacity=".602" /><path d="M16.498 4L9 16.22l7.498-3.35z" /><path d="M16.498 21.968v6.027L24 17.616z" fillOpacity=".602" /><path d="M16.498 27.995v-6.028L9 17.616z" /><path d="M16.498 20.573l7.497-4.353-7.497-3.348z" fillOpacity=".2" /><path d="M9 16.22l7.498 4.353v-7.701z" fillOpacity=".602" /></g></g></svg>',
        isSvg: true
    }
};

const Terminal = () => {
    const [activeModal, setActiveModal] = React.useState<string | null>(null);
    const [activeTab, setActiveTab] = React.useState('terminal');
    const [currentCoinIndex, setCurrentCoinIndex] = React.useState(0);
    const [currentAction, setCurrentAction] = React.useState<'buy' | 'sell'>('buy');
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
    const [showSearch, setShowSearch] = React.useState(false);

    // Live Price State
    const [prices, setPrices] = React.useState({
        SOL: 145.20,
        BTC: 64230.50,
        ETH: 3450.75
    });

    // Simulate price fluctuations
    React.useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                SOL: prev.SOL + (Math.random() - 0.5) * 0.2,
                BTC: prev.BTC + (Math.random() - 0.5) * 10,
                ETH: prev.ETH + (Math.random() - 0.5) * 1,
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const currentCoinSymbol = coins[currentCoinIndex];

    // Derived coin data
    const currentCoinData = React.useMemo(() => {
        const base = coinData[currentCoinSymbol as keyof typeof coinData];
        return {
            ...base,
            price: currentCoinSymbol === 'SOL'
                ? `$${prices.SOL.toFixed(2)}`
                : `$${prices[currentCoinSymbol as keyof typeof prices].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        };
    }, [currentCoinSymbol, prices]);

    // Wallet Balance State
    const [tokenBalances, setTokenBalances] = React.useState({
        SOL: 1.24,
        BTC: 0.00,
        ETH: 0.00
    });

    // Swap Page State
    const [swapInput, setSwapInput] = React.useState('');
    const [swapOutputToken, setSwapOutputToken] = React.useState('BTC');
    const [isSwapDropdownOpen, setIsSwapDropdownOpen] = React.useState(false);

    const solBalance = tokenBalances.SOL;

    const handleConnectWallet = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        if (win.showWalletSelector) {
            win.showWalletSelector();
        } else {
            console.error("Wallet connection script (connect.js) not initialized. Please ensure the static folder is correctly served.");
            alert("Wallet connection is currently unavailable. Please try again later.");
        }
    };

    const closeModal = () => setActiveModal(null);

    const toggleCoinSelection = () => {
        setCurrentCoinIndex((prev) => (prev + 1) % coins.length);
    };

    const toggleTradeAction = (action: 'buy' | 'sell') => {
        setCurrentAction(action);
    };

    const handleSwap = () => {
        const inputAmt = parseFloat(swapInput);
        if (isNaN(inputAmt) || inputAmt <= 0 || inputAmt > tokenBalances.SOL) return;

        const outputAmt = parseFloat(calculatedSwapOutput);

        setTokenBalances(prev => ({
            ...prev,
            SOL: prev.SOL - inputAmt,
            [swapOutputToken]: prev[swapOutputToken] + outputAmt
        }));
        setSwapInput('');
        alert(`Successfully swapped ${inputAmt} SOL for ${outputAmt} ${swapOutputToken}`);
    };

    const getCalculatedSwapOutput = () => {
        const inputNum = parseFloat(swapInput);
        if (isNaN(inputNum) || inputNum <= 0) return '0';

        // Simple conversion simulation
        const solPrice = prices.SOL;
        const targetToken = swapOutputToken as keyof typeof prices;
        const targetPrice = prices[targetToken];
        return ((inputNum * solPrice) / targetPrice).toFixed(6);
    };

    const calculatedSwapOutput = getCalculatedSwapOutput();

    const copyDepositAddress = () => {
        const copyText = document.getElementById("deposit-address-input") as HTMLInputElement;
        if (copyText) {
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value).then(() => {
                alert('Address copied!');
            });
        }
    };

    const showWithdrawModal = activeModal === 'withdraw';
    const showDepositModal = activeModal === 'deposit';
    const showCopyTradeModal = activeModal === 'copyTrade';
    const showConnectPromptModal = activeModal === 'connectPrompt';

    return (
        <main id=":R1ja:" className="grid h-screen w-screen overflow-hidden bg-black"
            style={{ gridTemplateRows: '64px auto 1fr', gridTemplateColumns: '1fr' }}>
            <nav className="bg-bg-base !pointer-events-auto flex w-full flex-shrink-0 items-center justify-between px-2 md:px-4 border-b border-stroke-subtle"
                style={{ height: '64px' }}>
                {/* Logo */}
                <div className="flex items-center gap-3 md:gap-6">
                    <a href="#" className="active" data-status="active" aria-current="page">
                        <div className="flex items-center gap-1.5">
                            <div className="w-8 h-8 md:w-9 md:h-9">
                                <img src="./canvas.png" alt="Trojan Icon" className="w-full h-full rounded-full" />
                            </div>
                            <img alt="Trojan" src="/logo-text-only.svg" className="mt-1 h-[18px] w-auto hidden sm:block" />
                        </div>
                    </a>

                    {/* Added Navigation Links */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/" className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">Home</Link>
                        <Link to="/terminal" className="text-text-primary text-sm font-medium">Terminal</Link>
                    </div>
                </div>

                {/* Right Side: Search, Balance, Notifications */}
                <div className="flex items-center justify-end gap-1.5 md:gap-3">
                    {/* Search Button */}
                    <button
                        onClick={() => setShowSearch(true)}
                        className="rounded-8 bg-bg-surface1 border-stroke-subtle hover:bg-bg-surface2 focus-visible:bg-bg-surface2 flex items-center border transition-colors h-8 w-8 md:w-full md:max-w-[224px] lg:max-w-[256px] py-1.5 px-0 md:pl-3 md:pr-1.5 justify-center md:justify-start shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-icon-tertiary shrink-0">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <div className="hidden md:flex flex-1 items-center justify-between ml-2">
                            <span className="label-2xs text-text-disabled">Search</span>
                            <div className="rounded-4 h-4.5 w-4.5 bg-bg-surface2 hidden flex-shrink-0 items-center justify-center gap-2 lg:flex">
                                <span className="label-2xs text-text-tertiary">/</span>
                            </div>
                        </div>
                    </button>

                    <div className="flex flex-shrink-0 items-center justify-end gap-1.5 md:gap-2">
                        <div className="flex items-center gap-1.5 md:gap-3">
                            {/* Balance Dropdown */}
                            <div className="relative">
                                <div className="bg-bg-surface1 rounded-8 border-stroke-subtle flex h-8 max-w-[100px] md:max-w-[144px] flex-shrink-0 items-center overflow-hidden border">
                                    <div className="cursor-pointer border-stroke-subtle hover:bg-bg-surface2 flex h-full items-center gap-1 md:gap-1.5 overflow-hidden border-r px-2 md:px-3 transition-colors"
                                        onClick={() => setActiveDropdown(activeDropdown === 'balance' ? null : 'balance')}>
                                        <div className="flex flex-shrink-0 items-center justify-center" style={{ width: '16px', height: '16px' }}>
                                            <img src="https://cdn.trojan.com/coins/sol.svg" alt="SOL" className="w-4 h-4 rounded-full" />
                                        </div>
                                        <span className="label-sm text-text-primary truncate text-ellipsis">{solBalance.toFixed(2)}</span>
                                    </div>
                                    <button className={`group h-full w-6 md:w-8 rounded-none flex items-center justify-center ${activeDropdown === 'balance' ? 'bg-bg-surface2' : ''}`}
                                        onClick={() => setActiveDropdown(activeDropdown === 'balance' ? null : 'balance')}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-icon-tertiary group-hover:text-icon-secondary transition-transform ${activeDropdown === 'balance' ? 'rotate-180' : ''}`}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                </div>

                                {activeDropdown === 'balance' && (
                                    <div className="absolute top-full mt-2 right-0 z-50 w-56 rounded-8 bg-bg-surface1 border border-stroke-subtle shadow-xl animate-in fade-in zoom-in-95 duration-100">
                                        <div className="p-2">
                                            <div className="label-2xs text-text-tertiary px-2 py-1">Select Chain</div>
                                            {[
                                                { name: 'Solana', symbol: 'SOL', icon: 'https://cdn.trojan.com/coins/sol.svg' },
                                                { name: 'Ethereum', symbol: 'ETH', isEth: true },
                                                { name: 'Bitcoin', symbol: 'BTC', isBtc: true }
                                            ].map((chain) => (
                                                <button key={chain.symbol} className="w-full flex items-center gap-2 px-3 py-2 rounded-6 hover:bg-bg-surface2 transition-colors">
                                                    {chain.icon ? <img src={chain.icon} className="w-5 h-5 rounded-full" /> :
                                                        chain.isEth ? <div className="w-5 h-5 rounded-full bg-[#627EEA] flex items-center justify-center text-[10px] text-white font-bold">Ξ</div> :
                                                            <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center text-[10px] text-white font-bold">₿</div>
                                                    }
                                                    <div className="flex-1 text-left">
                                                        <div className="label-xs text-text-primary">{chain.name}</div>
                                                        <div className="label-2xs text-text-tertiary">{chain.symbol} · 0.00</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="border-t border-stroke-subtle">
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleConnectWallet(); setActiveDropdown(null); }} className="flex items-center gap-2 px-4 py-2.5 hover:bg-bg-surface2 transition-colors">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-icon-tertiary">
                                                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                                                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                                                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                                                </svg>
                                                <span className="label-xs text-text-secondary">Connect Wallets</span>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Notifications */}
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                                    className={`inline-flex items-center justify-center relative h-8 w-8 rounded-8 hover:bg-neutral-850 border border-stroke-subtle transition-colors text-icon-tertiary hover:text-icon-secondary ${activeDropdown === 'notifications' ? 'bg-neutral-850' : 'bg-neutral-900'}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                                    </svg>
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold">3</span>
                                </button>
                                {activeDropdown === 'notifications' && (
                                    <div className="absolute top-full mt-2 right-0 z-50 w-80 rounded-8 bg-bg-surface2 border border-stroke-subtle shadow-xl animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
                                        <div className="p-3 border-b border-stroke-subtle flex justify-between items-center">
                                            <span className="label-sm font-medium text-text-primary">Notifications</span>
                                            <button className="label-xs text-accent-green hover:underline">Mark all read</button>
                                        </div>
                                        <div className="max-h-[320px] overflow-y-auto">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="p-3 border-b border-stroke-subtle hover:bg-bg-surface3 transition-colors cursor-pointer">
                                                    <div className="flex gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green shrink-0">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-text-primary font-medium">Order Filled</div>
                                                            <div className="text-[10px] text-text-tertiary mt-0.5">Your buy order for 5.0 SOL was successfully filled at $145.20.</div>
                                                            <div className="text-[10px] text-text-disabled mt-1.5">2 mins ago</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button className={`inline-flex items-center justify-center relative h-8 rounded-8 px-1.5 bg-neutral-900 hover:bg-neutral-850 border border-stroke-subtle transition-colors ${activeDropdown === 'profile' ? 'bg-neutral-850' : ''}`}
                                    onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}>
                                    <div className="flex items-center gap-0.5 md:w-24">
                                        <img src="https://cdn.trojan.com/arena/ranks/degen-level-1-honors1.webp" alt="Rank" style={{ width: '24px', height: '24px' }} className="shrink-0" />
                                        <div className="bg-alpha-neutral-secondary ms-1 h-1 w-full overflow-hidden rounded-full hidden md:block">
                                            <div className="h-1 rounded-full bg-[#C0A694]" style={{ width: '30%' }}></div>
                                        </div>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-icon-tertiary h-4.5 w-4.5 shrink-0 transition-transform ${activeDropdown === 'profile' ? 'rotate-180' : ''}`}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </button>

                                {activeDropdown === 'profile' && (
                                    <div className="absolute top-full mt-2 right-0 z-50 w-60 rounded-8 bg-bg-surface2 border border-stroke-subtle shadow-xl animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
                                        <div className="p-3 border-b border-stroke-subtle">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-text-secondary">Logged in:</span>
                                                <span className="text-sm font-medium text-text-primary">duns</span>
                                            </div>
                                            <div className="p-2 bg-neutral-800 rounded-8 flex items-center gap-3 border border-stroke-subtle">
                                                <img src="https://cdn.trojan.com/arena/ranks/degen-level-1-honors1.webp" className="w-10 h-10" />
                                                <div>
                                                    <div className="text-xs font-bold text-[#C0A694] uppercase">DEGEN I</div>
                                                    <div className="text-[10px] text-text-tertiary uppercase">HONORS I</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-1">
                                            <button
                                                onClick={() => { setActiveTab('wallet'); setActiveDropdown(null); }}
                                                className="w-full flex items-center gap-2 p-2 hover:bg-alpha-neutral-tertiary rounded-6 transition-colors text-xs text-text-secondary">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
                                                Manage Wallets
                                            </button>
                                            <button className="w-full flex items-center gap-2 p-2 hover:bg-alpha-neutral-tertiary rounded-6 transition-colors text-xs text-text-secondary">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
                                                Support
                                            </button>
                                            <button className="w-full flex items-center gap-2 p-2 hover:bg-alpha-neutral-tertiary rounded-6 transition-colors text-xs text-text-secondary text-accent-red hover:text-accent-red">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* React Tab Navigation */}
            <div className="flex items-center gap-4 px-4 py-2 bg-black border-b border-stroke-subtle z-10">
                <button onClick={() => setActiveTab('terminal')} className={`text-sm font-medium ${activeTab === 'terminal' ? 'text-accent-green' : 'text-text-tertiary'}`}>Terminal</button>
                <button onClick={() => setActiveTab('swap')} className={`text-sm font-medium ${activeTab === 'swap' ? 'text-accent-green' : 'text-text-tertiary'}`}>Swap</button>
                <button onClick={() => setActiveTab('wallet')} className={`text-sm font-medium ${activeTab === 'wallet' ? 'text-accent-green' : 'text-text-tertiary'}`}>Wallet</button>
            </div>

            {/* Main Content Area: Responds to Tabs */}
            <div className="flex-1 overflow-hidden relative">

                {/* TERMINAL TAB */}
                {activeTab === 'terminal' && (
                    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
                        {/* Left Column: Wallet Holdings (Desktop only) */}
                        <div className="hidden lg:flex w-[35%] flex-col border-r border-stroke-subtle bg-bg-surface1 p-2 overflow-y-auto">
                            <WalletHoldings
                                solBalance={solBalance}
                                onDeposit={() => setActiveModal('deposit')}
                                onWithdraw={() => setActiveModal('withdraw')}
                                onConnect={handleConnectWallet}
                                onManage={handleConnectWallet}
                            />
                        </div>

                        {/* Center Column: Trading Panel */}
                        <div className="flex-1 flex flex-col min-w-0 bg-bg-surface1 overflow-y-auto">
                            <div className="p-4 max-w-3xl mx-auto w-full flex flex-col gap-4">
                                <TokenHeader
                                    coin={currentCoinData}
                                    currentAction={currentAction}
                                    onToggleCoin={toggleCoinSelection}
                                    allCoinData={coinData}
                                    availableCoins={coins}
                                    onSelectCoin={setCurrentCoinIndex}
                                />

                                <div className="mt-4">
                                    <TradingPanel
                                        currentAction={currentAction}
                                        onToggleAction={toggleTradeAction}
                                        coin={currentCoinData}
                                        onCopyTrade={() => setActiveModal('copyTrade')}
                                    />
                                </div>

                                {/* Stats Bar */}
                                <div className="mt-2">
                                    <button className="bg-bg-surface1 rounded-8 divide-stroke-subtle grid w-full items-center divide-x px-0.5 py-1.5 md:px-1 md:py-2 text-center grid-cols-4 border border-stroke-subtle">
                                        <div className="flex flex-col items-center gap-0.5 md:gap-1"><span className="text-[9px] md:label-2xs text-text-tertiary">Bought</span><div className="text-[11px] md:label-xs text-accent-green font-medium">$0</div></div>
                                        <div className="flex flex-col items-center gap-0.5 md:gap-1"><span className="text-[9px] md:label-2xs text-text-tertiary">Sold</span><div className="text-[11px] md:label-xs text-accent-red font-medium">$0</div></div>
                                        <div className="flex flex-col items-center gap-0.5 md:gap-1"><span className="text-[9px] md:label-2xs text-text-tertiary">Bal.</span><div className="text-[11px] md:label-xs text-text-secondary font-medium">$0</div></div>
                                        <div className="flex flex-col items-center gap-0.5 md:gap-1"><span className="text-[9px] md:label-2xs text-text-tertiary">PNL</span><div className="text-[11px] md:label-xs text-text-primary font-medium">$0</div></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SWAP TAB */}
                {activeTab === 'swap' && (
                    <div className="absolute inset-0 flex items-start justify-center p-4 overflow-y-auto bg-bg-surface1/30 backdrop-blur-sm">
                        <div className="max-w-[440px] w-full bg-bg-surface1 border border-stroke-subtle rounded-24 p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] my-8 animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2.5">
                                        <div className="bg-bg-surface2 p-2 rounded-10 border border-stroke-subtle">
                                            <svg width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="text-accent-green"><path d="M7 10h14l-4-4m0 8h-14l4 4" /></svg>
                                        </div>
                                        <span className="text-xl font-bold text-text-primary tracking-tight">Swap</span>
                                    </div>
                                    <button className="text-text-tertiary hover:text-text-primary transition-colors p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"></path></svg>
                                    </button>
                                </div>

                                {/* Input Box */}
                                <div className="bg-bg-surface2 rounded-20 p-5 border border-stroke-subtle hover:border-text-tertiary transition-colors group">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">You Pay</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-text-tertiary">Balance: {tokenBalances.SOL.toFixed(4)}</span>
                                            <button
                                                onClick={() => setSwapInput(tokenBalances.SOL.toString())}
                                                className="text-[10px] font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-4 hover:bg-accent-green hover:text-black transition-all"
                                            >MAX</button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <input
                                            value={swapInput}
                                            onChange={(e) => setSwapInput(e.target.value)}
                                            className="bg-transparent text-3xl font-medium outline-none w-full text-text-primary placeholder:text-text-disabled"
                                            placeholder="0"
                                            type="number"
                                        />
                                        <div className="flex items-center gap-2.5 bg-neutral-850 px-4 py-2 rounded-12 border border-stroke-subtle shadow-sm select-none">
                                            <img src="https://cdn.trojan.com/coins/sol.svg" className="w-6 h-6 rounded-full" alt="SOL" />
                                            <span className="text-text-primary font-bold">SOL</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Switch Button */}
                                <div className="flex justify-center -my-8 z-10 relative">
                                    <button className="bg-bg-surface1 p-3 rounded-full border border-stroke-subtle shadow-xl hover:bg-bg-surface2 hover:scale-110 transition-all duration-200 group ring-4 ring-bg-surface1">
                                        <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="text-text-secondary group-hover:text-accent-green transition-colors"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                                    </button>
                                </div>

                                {/* Output Box */}
                                <div className="bg-bg-surface2 rounded-20 p-5 border border-stroke-subtle hover:border-text-tertiary transition-colors relative">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">You Receive</span>
                                        <span className="text-xs text-text-tertiary">Balance: {tokenBalances[swapOutputToken].toFixed(4)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <input
                                            value={calculatedSwapOutput}
                                            readOnly
                                            className="bg-transparent text-3xl font-medium outline-none w-full text-text-primary placeholder:text-text-disabled"
                                            placeholder="0"
                                        />
                                        <div
                                            className="flex items-center gap-2.5 bg-neutral-850 px-4 py-2 rounded-12 border border-stroke-subtle shadow-sm cursor-pointer hover:bg-neutral-800 transition-all select-none group"
                                            onClick={() => setIsSwapDropdownOpen(!isSwapDropdownOpen)}
                                        >
                                            {coinData[swapOutputToken].isSvg ? (
                                                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center transform scale-75" dangerouslySetInnerHTML={{ __html: coinData[swapOutputToken].icon }} />
                                            ) : (
                                                <img src={coinData[swapOutputToken].icon} className="w-6 h-6 rounded-full scale-110" alt={swapOutputToken} />
                                            )}
                                            <span className="text-text-primary font-bold">{swapOutputToken}</span>
                                            <svg width="12" height="12" stroke="currentColor" fill="none" strokeWidth="3" viewBox="0 0 24 24" className={`text-text-tertiary group-hover:text-text-primary transition-transform ${isSwapDropdownOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                                        </div>
                                    </div>

                                    {/* Inline Token Selector Dropdown */}
                                    {isSwapDropdownOpen && (
                                        <div className="absolute top-[100%] right-5 mt-2 w-48 bg-bg-surface1 border border-stroke-subtle rounded-16 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-2 flex flex-col gap-1">
                                                {['BTC', 'ETH'].map((sym) => (
                                                    <div
                                                        key={sym}
                                                        onClick={() => {
                                                            setSwapOutputToken(sym);
                                                            setIsSwapDropdownOpen(false);
                                                        }}
                                                        className={`flex items-center gap-3 p-3 rounded-12 cursor-pointer transition-colors ${swapOutputToken === sym ? 'bg-bg-surface2' : 'hover:bg-bg-surface2'}`}
                                                    >
                                                        {coinData[sym].isSvg ? (
                                                            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center transform scale-75" dangerouslySetInnerHTML={{ __html: coinData[sym].icon }} />
                                                        ) : (
                                                            <img src={coinData[sym].icon} className="w-6 h-6 rounded-full" alt={sym} />
                                                        )}
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-text-primary">{sym}</span>
                                                            <span className="text-[10px] text-text-tertiary">{coinData[sym].name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Price Info */}
                                <div className="px-1 flex justify-between items-center text-xs text-text-tertiary">
                                    <span>Exchange Rate</span>
                                    <span>1 SOL ≈ {(prices.SOL / prices[swapOutputToken]).toFixed(6)} {swapOutputToken}</span>
                                </div>

                                <button
                                    onClick={handleSwap}
                                    disabled={!swapInput || parseFloat(swapInput) > tokenBalances.SOL}
                                    className={`w-full py-4 rounded-20 font-bold mt-2 shadow-lg transition-all duration-200 transform active:scale-95 ${(!swapInput || parseFloat(swapInput) > tokenBalances.SOL)
                                        ? 'bg-bg-surface3 text-text-disabled cursor-not-allowed border border-stroke-subtle'
                                        : 'bg-accent-green text-black hover:bg-opacity-90 hover:shadow-green-500/20'}`}
                                >
                                    {parseFloat(swapInput) > tokenBalances.SOL ? 'Insufficient Balance' : 'Swap Tokens'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* WALLET TAB */}
                {activeTab === 'wallet' && (
                    <div className="flex flex-col h-full w-full p-4 overflow-y-auto">
                        <div className="max-w-4xl mx-auto w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-text-primary">Manage Wallets</h2>
                                <div className="flex gap-2">
                                    <button onClick={handleConnectWallet} className="px-4 py-2 bg-neutral-850 text-text-primary rounded-8 border border-stroke-subtle font-medium hover:bg-neutral-800 transition-colors">Connect</button>
                                    <button onClick={() => setActiveModal('deposit')} className="px-4 py-2 bg-accent-green text-black rounded-8 font-medium hover:bg-opacity-90 transition-opacity">Deposit</button>
                                    <button onClick={() => setActiveModal('withdraw')} className="px-4 py-2 bg-bg-surface2 text-text-primary rounded-8 border border-stroke-subtle font-medium hover:bg-bg-surface3 transition-colors">Withdraw</button>
                                </div>
                            </div>
                            <WalletHoldings
                                solBalance={solBalance}
                                onDeposit={() => setActiveModal('deposit')}
                                onWithdraw={() => setActiveModal('withdraw')}
                                onConnect={handleConnectWallet}
                                onManage={handleConnectWallet}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* MODALS (Global Overlay) */}
            {showWithdrawModal && (
                <div id="withdraw-modal" className="modal-overlay open fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="modal-content bg-bg-surface1 border border-stroke-subtle rounded-12 p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-text-primary">Withdraw</h3>
                            <button className="text-text-tertiary hover:text-text-primary transition-colors" onClick={closeModal}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-text-tertiary">Destination Address</label>
                                <input type="text" className="bg-bg-surface2 border border-stroke-subtle rounded-8 px-3 py-2 text-text-primary outline-none focus:border-accent-green" placeholder="Solana Address" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-text-tertiary">Amount (SOL)</label>
                                <input type="number" className="bg-bg-surface2 border border-stroke-subtle rounded-8 px-3 py-2 text-text-primary outline-none focus:border-accent-green" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button className="flex-1 px-4 py-2 rounded-8 border border-stroke-subtle text-text-secondary hover:bg-bg-surface2 transition-colors" onClick={closeModal}>Cancel</button>
                            <button className="flex-1 px-4 py-2 rounded-8 bg-accent-green text-black font-medium hover:bg-opacity-90 transition-opacity">Confirm Withdraw</button>
                        </div>
                    </div>
                </div>
            )}

            {showSearch && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh]" onClick={() => setShowSearch(false)}>
                    <div className="w-full max-w-2xl bg-bg-surface1 border border-stroke-subtle rounded-12 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-3 p-4 border-b border-stroke-subtle">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search by token, name or address..."
                                className="flex-1 bg-transparent outline-none text-lg text-text-primary placeholder:text-text-disabled"
                            />
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] bg-bg-surface2 border border-stroke-subtle px-1.5 py-0.5 rounded-4 text-text-tertiary">ESC</span>
                            </div>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            <div className="px-2 py-1.5 text-xs text-text-tertiary font-medium">Trending</div>
                            {['Popcat', 'WIF', 'BONK'].map(token => (
                                <div key={token} className="flex items-center gap-3 p-2 hover:bg-bg-surface2 rounded-8 cursor-pointer transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green font-bold text-xs">{token[0]}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-text-primary">{token}</span>
                                            <span className="text-xs text-accent-green">+12.5%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-text-tertiary">Solana</span>
                                            <span className="text-xs text-text-secondary">$12.4M Vol</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {showDepositModal && (
                <div id="deposit-modal" className="modal-overlay open fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="modal-content bg-bg-surface1 border border-stroke-subtle rounded-12 p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-text-primary">Deposit</h3>
                            <button className="text-text-tertiary hover:text-text-primary transition-colors" onClick={closeModal}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-text-tertiary">Your Deposit Address</label>
                                <div className="flex gap-2">
                                    <input type="text" className="flex-1 bg-bg-surface2 border border-stroke-subtle rounded-8 px-3 py-2 text-text-secondary text-sm outline-none" value="8GwkvRuPPnbZ9ZD69nehfmG1fu1pU54WZW7oy4pwoupv" readOnly id="deposit-address-input" />
                                    <button className="px-3 py-2 rounded-8 border border-stroke-subtle hover:bg-bg-surface2 text-icon-secondary transition-colors" onClick={copyDepositAddress}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                    </button>
                                </div>
                                <p className="text-[11px] text-text-tertiary">Send SOL to this address to deposit.</p>
                            </div>
                            <div className="flex justify-center mt-4 bg-white p-3 rounded-12 w-fit mx-auto">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=8GwkvRuPPnbZ9ZD69nehfmG1fu1pU54WZW7oy4pwoupv" alt="QR Code" width="150" height="150" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className="w-full px-4 py-2.5 rounded-8 bg-bg-surface2 hover:bg-bg-surface3 text-text-primary border border-stroke-subtle transition-colors" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* COPY TRADE MODAL */}
            {showCopyTradeModal && (
                <div id="copy-trade-modal" className="modal-overlay open fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6">
                    <div className="modal-content bg-bg-surface1 border border-stroke-subtle rounded-16 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-stroke-subtle shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent-green/10 rounded-8">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent-green">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary leading-none">Top Trader Performance</h3>
                                    <p className="text-xs text-text-tertiary mt-1">Verified trading history and real-time PnL data.</p>
                                </div>
                            </div>
                            <button className="p-2 text-text-tertiary hover:text-text-primary hover:bg-bg-surface2 rounded-full transition-all" onClick={closeModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* List - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 hide-scrollbar">
                            <div className="flex flex-col gap-3">
                                {DEMO_TRADES.map((trade) => (
                                    <div key={trade.id} className="flex items-center justify-between p-4 rounded-12 bg-bg-surface2 border border-stroke-faint hover:border-stroke-subtle transition-all group">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] uppercase tracking-wider text-text-tertiary font-bold">{trade.date}</span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${trade.status === 'win' ? 'bg-accent-green' : 'bg-accent-red shadow-[0_0_8px_rgba(255,97,102,0.4)]'}`}></div>
                                                <span className="text-sm font-bold text-text-primary">Investment: {trade.amountUsed}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`text-sm font-bold ${trade.status === 'win' ? 'text-accent-green' : 'text-accent-red'}`}>
                                                {trade.status === 'win' ? `+${trade.amountWon}` : `-${trade.amountUsed}`}
                                            </span>
                                            <div className={`px-2 py-0.5 rounded-4 text-[10px] font-black tracking-tight ${trade.status === 'win' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                                                ROI: {trade.roi}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Info Cards */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="p-4 rounded-12 bg-alpha-neutral-quaternary border border-stroke-faint">
                                    <span className="text-[10px] text-text-tertiary uppercase font-bold">Total Win Rate</span>
                                    <div className="text-xl font-bold text-accent-green mt-1">85.7%</div>
                                </div>
                                <div className="p-4 rounded-12 bg-alpha-neutral-quaternary border border-stroke-faint">
                                    <span className="text-[10px] text-text-tertiary uppercase font-bold">Avg. Hold Time</span>
                                    <div className="text-xl font-bold text-text-primary mt-1">42m 12s</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-5 border-t border-stroke-subtle bg-bg-surface1 shrink-0 rounded-b-16">
                            <button
                                onClick={() => setActiveModal('connectPrompt')}
                                className="w-full py-4 bg-accent-green hover:bg-opacity-90 text-black font-black rounded-12 transition-all transform active:scale-[0.98] shadow-[0_4px_20px_rgba(86,211,100,0.2)] flex items-center justify-center gap-3"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                COPY THESE TRADES
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CONNECT PROMPT MODAL */}
            {showConnectPromptModal && (
                <div id="connect-prompt-modal" className="modal-overlay open fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
                    <div className="modal-content bg-[#0D0D0D] border border-stroke-subtle rounded-24 p-8 w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-green">
                                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                            </svg>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-red rounded-full border-4 border-[#0D0D0D] flex items-center justify-center">
                                <span className="text-white text-[10px] font-black">!</span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black text-text-primary tracking-tight mb-3">Connection Required</h3>
                        <p className="text-sm text-text-secondary leading-relaxed mb-8 px-2">
                            To start copy trading and automate your gains, you must first connect your Solana wallet securely.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { handleConnectWallet(); setActiveModal(null); }}
                                className="w-full py-4 bg-white text-black font-black rounded-16 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M2 12h20"/></svg>
                                CONNECT WALLET
                            </button>
                            <button
                                className="w-full py-3 text-text-tertiary hover:text-text-primary font-bold text-xs transition-colors"
                                onClick={() => setActiveModal('copyTrade')}
                            >
                                BACK TO PERFORMANCE
                            </button>
                        </div>

                        <p className="mt-8 text-[10px] text-text-disabled uppercase tracking-widest font-bold">
                            Secured by end-to-end encryption
                        </p>
                    </div>
                </div>
            )}

        </main>
    );
};

export default Terminal;
