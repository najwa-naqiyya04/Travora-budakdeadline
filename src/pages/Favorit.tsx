import React from 'react';
import { Heart } from 'lucide-react';
import { PageShell, PageTitle } from '../components/PageShell';
import { AccommodationCard, CardGrid } from '../components/AccommodationCard';
import { ACCOMMODATIONS } from '../data/accommodations';
import { useApp } from '../lib/store';
import { navigate } from '../lib/router';

export default function Favorit() {
  const { favorites, isFavorite, toggleFavorite, applyTo, openAccommodation } = useApp();
  const items = favorites.map((id) => ACCOMMODATIONS.find((a) => a.id === id)).filter(Boolean) as typeof ACCOMMODATIONS;

  return (
    <PageShell active="/favorit">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-24 min-h-[60vh]">
        <PageTitle
          title="Kesukaan"
          right={<span className="text-sm text-[#4F8DF7] font-semibold">{items.length} tersimpan</span>}
        />
        {items.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20 px-4">
            <div className="w-20 h-20 rounded-full bg-[#EAF2FF] flex items-center justify-center mb-6">
              <Heart className="w-9 h-9 text-[#4F8DF7]" />
            </div>
            <h2 className="text-2xl font-bold text-[#142642]">Belum ada favorit</h2>
            <p className="mt-2 text-neutral-500 max-w-md">Tekan ikon hati pada card penginapan, dan semuanya akan terkumpul di sini.</p>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="mt-7 px-9 py-3.5 rounded-full bg-[#4F90F6] hover:bg-[#3d80e8] text-white font-medium cursor-pointer"
            >
              Jelajahi penginapan
            </button>
          </div>
        ) : (
          <CardGrid>
            {items.map((a) => (
              <AccommodationCard key={a.id} acc={a} onOpen={openAccommodation} onApply={applyTo} isFavorite={isFavorite(a.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </CardGrid>
        )}
      </div>
    </PageShell>
  );
}
