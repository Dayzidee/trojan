import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TerminalLayout from './components/TerminalLayout';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Terminal from './pages/Terminal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
        </Route>
        <Route path="terminal" element={<TerminalLayout />}>
          <Route index element={<Terminal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
