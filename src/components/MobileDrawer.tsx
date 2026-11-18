import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Bagian bawah drawer (mis. tombol Login / Sign up) */
  footer?: React.ReactNode;
}

/**
 * Menu samping untuk layar mobile/tablet: muncul dari kanan, lebar setengah layar
 * (min 200px, maks 360px), dengan latar gelap di belakangnya.
 */
export const MobileDrawer: React.FC<Props> = ({ open, onClose, children, footer }) => {
  // Kunci scroll halaman saat drawer terbuka + tutup dengan tombol Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Otomatis tutup jika layar dilebarkan ke desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const h = () => mq.matches && onClose();
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, [onClose]);

  return createPortal(
    <div className={`lg:hidden fixed inset-0 z-[90] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Latar gelap */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#0B1730]/50 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Panel kanan */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        inert={!open}
        className={`absolute top-0 right-0 h-full w-1/2 min-w-[200px] max-w-[360px] bg-white shadow-[-12px_0_40px_rgba(20,38,66,0.25)] rounded-l-[28px] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <Logo className="w-9 h-9" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5" aria-label="Menu">
          {children}
        </nav>
        {footer && <div className="px-4 pb-6 pt-3 space-y-2.5 border-t border-neutral-100">{footer}</div>}
      </aside>
    </div>,
    document.body
  );
};

/** Tombol menu di dalam drawer (gaya seragam untuk kedua navbar) */
export const DrawerItem: React.FC<{ label: string; active?: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={active ? 'true' : undefined}
    className={`w-full text-left px-4 py-3 rounded-2xl text-[15px] transition-colors cursor-pointer ${
      active ? 'bg-[#EAF2FF] text-[#4F8DF7] font-semibold' : 'text-neutral-700 font-medium hover:bg-neutral-50'
    }`}
  >
    {label}
  </button>
);