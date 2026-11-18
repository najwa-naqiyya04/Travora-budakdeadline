import React from 'react';
import { SearchX } from 'lucide-react';
import { PageShell, PageTitle } from '../components/PageShell';
import { AccommodationCard, CardGrid } from '../components/AccommodationCard';
import { searchAccommodations } from '../components/UserNavbar';
import { useApp } from '../lib/store';
import { navigate, readRoute } from '../lib/router';

export default function Cari() {
  const { isFavorite, toggleFavorite, applyTo, openAccommodation } = useApp();
  const q = readRoute().query.get('q') ?? '';
  const results = searchAccommodations(q);

  return (
    <PageShell active="/cari">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-24 min-h-[60vh]">
        <PageTitle title={`Hasil pencarian “${q}”`} right={<span className="text-sm text-[#4F8DF7] font-semibold shrink-0">{results.length} hasil</span>} />
        {results.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20 px-4">
            <div className="w-20 h-20 rounded-full bg-[#EAF2FF] flex items-center justify-center mb-6">
              <SearchX className="w-9 h-9 text-[#4F8DF7]" />
            </div>
            <h2 className="text-2xl font-bold text-[#142642]">Tidak ada yang cocok</h2>
            <p className="mt-2 text-neutral-500 max-w-md">Coba kata kunci lain, misalnya nama daerah (Bali, Lampung) atau jenis rumah (bambu, pantai).</p>
            <button type="button" onClick={() => navigate('/home')} className="mt-7 px-9 py-3.5 rounded-full bg-[#4F90F6] hover:bg-[#3d80e8] text-white font-medium cursor-pointer">
              Kembali ke Home
            </button>
          </div>
        ) : (
          <CardGrid>
            {results.map((a) => (
              <AccommodationCard key={a.id} acc={a} onOpen={openAccommodation} onApply={applyTo} isFavorite={isFavorite(a.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </CardGrid>
        )}
      </div>
    </PageShell>
  );
}
