import React from 'react';
import { Outlet } from 'react-router-dom';

const TerminalLayout = () => {
    return (
        <div className="terminal-layout">
            <Outlet />
        </div>
    );
};

export default TerminalLayout;
