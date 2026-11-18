import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { Accommodation } from '../types';
import { onHouseImgError } from '../data/houseImages';

interface Props {
  acc: Accommodation;
  onOpen: (id: string) => void;
  onApply: (id: string) => void;
  /** Tombol hati hanya muncul jika onToggleFavorite diberikan (user sudah login) */
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

/**
 * Card penginapan – SATU-SATUNYA sumber bentuk card.
 * Dipakai di Landing, Destinasi, Favorit, Detail, dan hasil Search
 * supaya tampilannya selalu konsisten.
 */
export const AccommodationCard: React.FC<Props> = ({ acc, onOpen, onApply, isFavorite, onToggleFavorite }) => (
  <div
    role="link"
    tabIndex={0}
    onClick={() => onOpen(acc.id)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && e.target === e.currentTarget) onOpen(acc.id);
    }}
    className="group w-full max-w-[415px] bg-white rounded-[30px] pb-[15px] flex flex-col items-center gap-[23px] shadow-[0_4px_32px_0_rgba(53,68,93,0.25)] hover:shadow-[0_8px_36px_0_rgba(53,68,93,0.32)] transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-[#4F90F6]"
  >
    {/* Gambar (tinggi 235px, rounded 30px) */}
    <div className="relative h-[235px] w-full self-stretch rounded-[30px] overflow-hidden bg-slate-100 shrink-0">
      <img
        src={acc.images[0]}
        alt={acc.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={onHouseImgError}
      />
      {onToggleFavorite && (
        <button
          type="button"
          aria-label={isFavorite ? `Hapus ${acc.name} dari favorit` : `Simpan ${acc.name} ke favorit`}
          aria-pressed={!!isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(acc.id);
          }}
          className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4F90F6] shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
        >
          <Heart className={`w-[18px] h-[18px] ${isFavorite ? 'fill-[#4F90F6]' : ''}`} />
        </button>
      )}
    </div>

    <div className="w-full px-6 flex-1 flex flex-col justify-between self-stretch">
      <div>
        <h3 className="text-[#0F1010] font-sans text-[24px] font-bold leading-[26px] tracking-tight group-hover:text-[#4F90F6] transition-colors">
          {acc.name}
        </h3>
        <p className="mt-2.5 text-[#0F1010] font-sans text-[16px] font-normal leading-[22px] line-clamp-2">
          {acc.description}
        </p>
      </div>

      <div>
        <div className="mt-4 flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[96px] border border-[#FFCDAF] bg-white shrink-0">
            <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
            <span className="text-[#FE8B45] font-sans text-[12px] font-medium leading-none">{acc.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#949494] min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#949494] shrink-0 stroke-[1.5]" />
            <span className="truncate text-[#949494] font-sans text-[14px] font-normal leading-[16px] tracking-[0.5px]">
              {acc.location}
            </span>
          </div>
        </div>

        <div className="mt-4 w-full">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onApply(acc.id);
            }}
            className="w-full self-stretch flex items-center justify-center gap-2 p-[14px] rounded-[96px] border border-[#4F90F6] bg-[#4F90F6] hover:bg-[#3d80e8] active:bg-[#2b6fd6] text-white font-sans font-medium text-[16px] leading-tight transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
          >
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

/** Grid standar untuk card – sama persis dengan landing page. */
export const CardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">{children}</div>
);