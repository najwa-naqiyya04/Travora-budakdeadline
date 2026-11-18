import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { navigate } from '../lib/router';
import { Logo } from './Logo';
import { MobileDrawer, DrawerItem } from './MobileDrawer';

/** Menu navbar landing = section yang benar-benar ada di halaman landing. */
export const LANDING_NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang' },
  { id: 'fitur', label: 'Fitur' },
  { id: 'benefit', label: 'Benefit' },
  { id: 'how-it-works', label: 'Cara Pakai' },
  { id: 'faq', label: 'FAQ' },
] as const;

interface NavbarProps {
  onNavigate: (section: string) => void;
  /** id section yang sedang terlihat (scroll-spy) */
  active?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, active = 'home' }) => {
  const [open, setOpen] = useState(false);

  const go = (id: string) => onNavigate(id);
  // Tutup drawer dulu (agar scroll halaman terbuka kembali), baru jalankan aksinya
  const closeThen = (fn: () => void) => {
    setOpen(false);
    setTimeout(fn, 160);
  };

  return (
    <header className="sticky top-4 sm:top-6 z-50 px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl mx-auto w-full">
      <div className="bg-white rounded-[32px] sm:rounded-[44px] shadow-lg border border-[#EAEAEA]/80 px-5 sm:px-8 lg:px-10 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 xl:gap-8 min-w-0">
          <button type="button" onClick={() => go('home')} className="shrink-0 cursor-pointer hover:scale-105 transition-transform" aria-label="TRAVORA – ke atas">
            <Logo className="w-9 h-9 sm:w-10 sm:h-10" />
          </button>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Menu landing">
            {LANDING_NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                aria-current={active === n.id ? 'true' : undefined}
                className={`px-4 xl:px-5 py-2.5 rounded-full text-sm xl:text-base transition-all cursor-pointer ${
                  active === n.id
                    ? 'bg-[#EAF2FF] text-[#4F8DF7] font-semibold'
                    : 'text-neutral-600 font-medium hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="hidden lg:block bg-[#4F8DF7] hover:bg-[#3b7be0] active:bg-[#2b6be0] text-white px-9 py-3 rounded-full text-base font-semibold transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/login?mode=register')}
            className="hidden lg:block border border-[#4F8DF7] text-[#4F8DF7] hover:bg-[#EAF2FF] px-9 py-3 rounded-full text-base font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden p-2.5 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 cursor-pointer"
            aria-label="Buka menu"
            aria-expanded={open}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => closeThen(() => navigate('/login'))}
              className="w-full py-3 rounded-full bg-[#4F8DF7] hover:bg-[#3b7be0] text-white font-semibold cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => closeThen(() => navigate('/login?mode=register'))}
              className="w-full py-3 rounded-full border border-[#4F8DF7] text-[#4F8DF7] hover:bg-[#EAF2FF] font-semibold cursor-pointer"
            >
              Sign up
            </button>
          </>
        }
      >
        {LANDING_NAV.map((n) => (
          <DrawerItem key={n.id} label={n.label} active={active === n.id} onClick={() => closeThen(() => go(n.id))} />
        ))}
      </MobileDrawer>
    </header>
  );
};