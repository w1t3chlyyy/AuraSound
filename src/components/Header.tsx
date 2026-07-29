import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Page } from '../types';
import MobileNav from './MobileNav';

interface HeaderProps {
  currentPage: Page;
  navLinks: { label: string; page: Page }[];
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, navLinks, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 pt-4 sm:pt-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-105"
        >
          {/* Поменяйте имя файла под свой логотип: logo.svg / logo.png / logo.webp */}
          <img
            src="/logo.png"
            alt="AuraSound"
            className="h-6 w-auto"
          />
          <span className="text-base tracking-tight text-white">AuraSound</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`relative text-sm transition-all duration-300 py-1 group ${
                currentPage === link.page
                  ? 'text-white'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-blue-700 transition-all duration-300 ${
                  currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="magnetic-btn flex items-center gap-2 rounded-xl bg-white p-1 pr-3 sm:pr-4 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-95">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-700 transition-transform duration-300">
              <ShoppingCart size={14} strokeWidth={2} className="text-white" />
            </span>
            <span className="hidden sm:inline text-sm text-gray-900">Корзина</span>
            <span className="text-sm text-gray-900">(0)</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="liquid-glass liquid-glass-shimmer flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 md:hidden"
          >
            <div className="relative h-[18px] w-[18px]">
              <span
                className={`absolute left-0 top-1/2 h-[1.5px] w-[18px] bg-white transition-all duration-300 ${
                  menuOpen ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.5px] w-[18px] bg-white transition-all duration-300 ${
                  menuOpen ? '-rotate-45' : 'translate-y-[3px]'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={menuOpen}
        navLinks={navLinks}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}