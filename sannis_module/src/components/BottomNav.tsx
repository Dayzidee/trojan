import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div id="custom-bottom-nav">
            {/* Home */}
            <Link className={`nav-item ${isHome ? 'active' : ''}`} to="/">
                <svg viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
            </Link>

            {/* Trade (Center Prominent) */}
            <div className="trade-btn-wrapper">
                <Link className="trade-btn" to="/terminal">
                    <svg viewBox="0 0 24 24">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                </Link>
            </div>

            {/* Wallet/Profile */}
            <Link className="nav-item" to="/terminal">
                <svg viewBox="0 0 24 24">
                    <rect height="16" rx="2" ry="2" width="22" x="1" y="4"></rect>
                    <line x1="1" x2="23" y1="10" y2="10"></line>
                </svg>
                <span>Wallet</span>
            </Link>
        </div>
    );
};

export default BottomNav;
