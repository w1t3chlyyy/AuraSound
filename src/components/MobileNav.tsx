import { Page } from '../types';

interface MobileNavProps {
  isOpen: boolean;
  navLinks: { label: string; page: Page }[];
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onClose: () => void;
}

export default function MobileNav({ isOpen, navLinks, currentPage, onNavigate, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="animate-scale-in liquid-glass mx-4 mt-3 rounded-2xl p-2 md:hidden overflow-hidden">
      {navLinks.map((link, i) => (
        <button
          key={link.page}
          onClick={() => {
            onNavigate(link.page);
            onClose();
          }}
          className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-300 animate-fade-up ${
            currentPage === link.page
              ? 'bg-white/10 text-white'
              : 'text-white/90 hover:bg-white/10'
          }`}
          style={{ animationDelay: `${0.05 + i * 0.05}s` }}
        >
          <span className="flex items-center gap-3">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                currentPage === link.page ? 'bg-blue-700 scale-125' : 'bg-white/30'
              }`}
            />
            {link.label}
          </span>
        </button>
      ))}
    </div>
  );
}
