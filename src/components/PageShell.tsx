import React from 'react';
import { UserNavbar } from './UserNavbar';
import { Footer } from './Footer';
import { useApp } from '../lib/store';
import { goToLandingSection, navigate } from '../lib/router';

/** Pembungkus halaman setelah login: navbar pengguna + isi + footer yang sama dengan landing page. */
export const PageShell: React.FC<{ active: string; overlay?: boolean; children: React.ReactNode }> = ({ active, overlay, children }) => {
  const { user } = useApp();
  const onFooterNavigate = (section: string) => {
    if (section === 'home') navigate(user ? '/home' : '/');
    else goToLandingSection(section);
  };
  return (
    <div className={`min-h-screen bg-white text-[#222222] font-sans flex flex-col ${overlay ? '' : 'pt-4 sm:pt-6'}`}>
      <UserNavbar active={active} overlay={overlay} />
      <main className="flex-1">{children}</main>
      <Footer onNavigate={onFooterNavigate} />
    </div>
  );
};

export const PageTitle: React.FC<{ title: string; right?: React.ReactNode }> = ({ title, right }) => (
  <header className="mb-8 lg:mb-10">
    <div className="flex items-center justify-between gap-4 mb-5">
      <h1 className="text-[28px] sm:text-[34px] font-bold text-[#142642] tracking-tight">{title}</h1>
      {right}
    </div>
    <hr className="border-t border-[#D7E6FF]" />
  </header>
);
