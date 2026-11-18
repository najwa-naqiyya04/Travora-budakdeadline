import React, { useEffect, useRef, useState } from 'react';
import { Accommodation } from '../types';
import { AccommodationCard, CardGrid } from './AccommodationCard';

interface FeaturedAccommodationsProps {
  accommodations: Accommodation[];
  favorites: string[];
  onToggleFavorite?: (id: string) => void;
  onSelectAccommodation: (id: string) => void;
  onApply: (id: string) => void;
}

export const FeaturedAccommodations: React.FC<FeaturedAccommodationsProps> = ({
  accommodations,
  favorites,
  onToggleFavorite,
  onSelectAccommodation,
  onApply,
}) => {
  // Animasi masuk: dipicu sekali saat grid terlihat di layar
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Urutan: [kiri, tengah, kanan] → tengah muncul dulu, lalu kiri & kanan keluar dari belakangnya
  const revealClass = ['rv-left', 'rv-center', 'rv-right'];

  // 3 card unggulan: Wae Rebo, Kete Kesu, Penglipuran
  const featuredThree = ['accommodation-002', 'accommodation-003', 'accommodation-001']
    .map((id) => accommodations.find((a) => a.id === id))
    .filter(Boolean) as Accommodation[];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFCFF] border-y border-[#EAEAEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div data-reveal="up" className="text-center max-w-4xl mx-auto mb-14 sm:mb-18">
          <h2 className="text-[#000] text-center font-sans text-[32px] sm:text-[40px] font-bold leading-[44px] sm:leading-[56px] tracking-tight">
            Fitur kami
          </h2>
        </div>
        <div ref={gridRef} className={`cards-reveal ${inView ? 'in-view' : ''}`}>
          <CardGrid>
            {featuredThree.map((acc, i) => (
              <div key={acc.id} className={`rv ${revealClass[i]} flex w-full max-w-[415px]`}>
                <AccommodationCard
                  acc={acc}
                  onOpen={onSelectAccommodation}
                  onApply={onApply}
                  isFavorite={favorites.includes(acc.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </CardGrid>
        </div>
      </div>
    </section>
  );
};