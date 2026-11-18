import React from 'react';
import { Sparkles } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { navigate } from '../lib/router';

export default function Soon({ title, path }: { title: string; path: string }) {
  return (
    <PageShell active={path}>
      <div className="max-w-xl mx-auto text-center px-6 py-28 min-h-[60vh]">
        <div className="w-20 h-20 rounded-full bg-[#EAF2FF] flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-9 h-9 text-[#4F8DF7]" />
        </div>
        <h1 className="text-[32px] font-bold text-[#142642]">{title}</h1>
        <p className="mt-3 text-neutral-500">Halaman ini sedang disiapkan dan akan hadir di versi berikutnya.</p>
        <button type="button" onClick={() => navigate('/home')} className="mt-8 px-9 py-3.5 rounded-full bg-[#4F90F6] hover:bg-[#3d80e8] text-white font-medium cursor-pointer">
          Kembali ke Home
        </button>
      </div>
    </PageShell>
  );
}
