import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/assets/i9OyPSrgzIrCX31I4IvuJ2jDl4.svg" alt="Trojan Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white tracking-tight">Trojan</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Smarter Trading and <br />Seamless Exchanges.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/terminal" className="hover:text-green-400 transition-colors">The Arena</Link></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Support</a></li>
              <li><Link to="/terminal" className="hover:text-green-400 transition-colors">Terminal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Dashboard</a></li>
              <li><Link to="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-green-400 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Socials</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2">Twitter / X</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2">Tiktok</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2">Instagram</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2">Youtube</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Trojan Trading. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-500 text-sm font-medium">Systems Operational</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
