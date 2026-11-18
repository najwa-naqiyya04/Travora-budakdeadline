import React, { useMemo, useState } from 'react';
import { ChevronDown, Heart, LocateFixed, MapPin, Star } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { AccommodationCard, CardGrid } from '../components/AccommodationCard';
import { ACCOMMODATIONS } from '../data/accommodations';
import { getAcc, useApp } from '../lib/store';
import { navigate } from '../lib/router';
import { onHouseImgError } from '../data/houseImages';

const shortDistance = (d: string) => {
  const m = d.match(/^[\d.,]+\s*(km|meter)/i);
  return m ? m[0] : d;
};

const Rating: React.FC<{ v: number }> = ({ v }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#FFCDAF] bg-white text-[#FE8B45] text-xs font-medium">
    <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" /> {v.toFixed(1)}
  </span>
);

export default function Detail({ id }: { id: string }) {
  const { isFavorite, toggleFavorite, applyTo, openAccommodation } = useApp();
  const [sort, setSort] = useState<'terbaru' | 'tertinggi'>('terbaru');
  const acc = getAcc(id);

  const reviews = useMemo(() => {
    if (!acc) return [];
    const r = [...acc.reviews];
    return sort === 'tertinggi' ? r.sort((a, b) => b.rating - a.rating) : r;
  }, [acc, sort]);

  const others = useMemo(() => ACCOMMODATIONS.filter((a) => a.id !== id && a.id !== 'accommodation-009').slice(0, 6), [id]);

  if (!acc) {
    return (
      <PageShell active="/detail">
        <div className="text-center py-32 px-6 min-h-[60vh]">
          <h1 className="text-3xl font-bold text-[#142642]">Penginapan tidak ditemukan</h1>
          <button type="button" onClick={() => navigate('/home')} className="mt-8 px-9 py-3.5 rounded-full bg-[#4F90F6] hover:bg-[#3d80e8] text-white font-medium cursor-pointer">
            Kembali ke Home
          </button>
        </div>
      </PageShell>
    );
  }

  const fav = isFavorite(acc.id);
  const sp = acc.specifications;
  const openRoute = () => {
    const { lat, lng } = acc.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank', 'noopener');
  };
  const gallery = acc.images.slice(0, 2);

  return (
    <PageShell active="/detail">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        {/* Atas: galeri + info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
            {gallery.map((src, i) => (
              <div key={src} className="relative rounded-[22px] overflow-hidden bg-slate-100 aspect-[4/3] lg:aspect-[16/10]">
                <img src={src} alt={`${acc.name} – foto ${i + 1}`} className="w-full h-full object-cover" onError={onHouseImgError} />
                {i === 0 && (
                  <button
                    type="button"
                    onClick={() => toggleFavorite(acc.id)}
                    aria-label={fav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                    aria-pressed={fav}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#4F90F6] flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                  >
                    <Heart className={`w-[18px] h-[18px] ${fav ? 'fill-[#4F90F6]' : ''}`} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-[22px] border border-[#DCDCDC] p-5 sm:p-7 lg:sticky lg:top-28">
            <h1 className="text-[26px] sm:text-[34px] font-bold text-[#3A3A3A] leading-tight tracking-tight">{acc.name}</h1>
            <p className="mt-2 text-[#555] text-lg">{acc.subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE6F1] text-[#D6317F] text-xs">
                <MapPin className="w-3 h-3" /> {acc.location}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFF3C4] text-[#8A6A00] text-xs">{shortDistance(acc.distance)}</span>
              <Rating v={acc.rating} />
            </div>

            <div className="mt-6 space-y-3">
              <button type="button" onClick={() => applyTo(acc.id)} className="w-full h-12 rounded-full bg-[#4F90F6] hover:bg-[#3d80e8] text-white font-medium transition cursor-pointer">
                Apply
              </button>
              <button type="button" onClick={openRoute} className="w-full h-12 rounded-full border border-[#4F90F6] text-[#4F90F6] hover:bg-[#EAF2FF] font-medium transition flex items-center justify-center gap-2 cursor-pointer">
                <LocateFixed className="w-4 h-4" /> Rute
              </button>
            </div>

            <p className="mt-7 text-[#3A3A3A] text-[17px] leading-snug">{acc.contributionTask}</p>
            <hr className="my-5 border-[#CFCFCF]" />
            <dl className="space-y-2 text-[#555]">
              {[
                ['Jenis tempat', sp.propertyType],
                ['Kamar', String(sp.rooms)],
                ['Kamar mandi', String(sp.bathrooms)],
                ['Ukuran kasur', sp.bedSize.replace(/,\s*/g, '\n')],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <dt>{k}</dt>
                  <dd className="text-right whitespace-pre-line">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <hr className="mt-14 border-[#D5D5D5]" />

        {/* Ulasan */}
        <section className="pt-12" aria-labelledby="h-ulasan">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 id="h-ulasan" className="text-[28px] sm:text-[32px] font-bold text-[#3A3A3A]">Ulasan customer</h2>
            <label className="relative inline-flex items-center text-[#4F8DF7] text-base sm:text-lg">
              <span className="sr-only">Urutkan ulasan</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="appearance-none bg-transparent pr-7 cursor-pointer focus:outline-none focus-visible:underline"
              >
                <option value="terbaru">Terbaru</option>
                <option value="tertinggi">Rating tertinggi</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-0 pointer-events-none" />
            </label>
          </div>

          {reviews.length === 0 ? (
            <p className="text-neutral-500">Belum ada ulasan untuk penginapan ini.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <article key={r.id} className="rounded-2xl border border-[#DCDCDC] p-4 bg-white">
                  <header className="flex items-center gap-3">
                    <img src={r.avatar} alt="" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#0F1010] truncate">{r.author}</p>
                      <p className="text-xs text-[#888]">{r.date}</p>
                    </div>
                    <Rating v={r.rating} />
                  </header>
                  {r.images && r.images.length > 0 && (
                    <div className="mt-3 flex gap-2.5">
                      {r.images.slice(0, 2).map((src) => (
                        <img key={src} src={src} alt="Foto dari pengulas" loading="lazy" onError={onHouseImgError} className="w-1/2 aspect-[4/3] rounded-xl object-cover" />
                      ))}
                    </div>
                  )}
                  <h3 className="mt-3 font-bold text-[#0F1010]">“{r.title}”</h3>
                  <p className="mt-1 text-[#555] leading-relaxed">{r.comment}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Rekomendasi – card & grid identik dengan landing */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-24" aria-labelledby="h-rekom">
        <h2 id="h-rekom" className="text-[28px] sm:text-[32px] font-bold text-[#0F1010] mb-8 tracking-tight">Rekomendasi penginapan</h2>
        <CardGrid>
          {others.map((a) => (
            <AccommodationCard key={a.id} acc={a} onOpen={openAccommodation} onApply={applyTo} isFavorite={isFavorite(a.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </CardGrid>
      </section>
    </PageShell>
  );
}