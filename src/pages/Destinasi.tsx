import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Heart, MapPin } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { AccommodationCard, CardGrid } from '../components/AccommodationCard';
import { ACCOMMODATIONS } from '../data/accommodations';
import { getAcc, useApp } from '../lib/store';
import { navigate } from '../lib/router';

interface Slide {
  title: string;
  location: string;
  text: string;
  image: string;
  accId: string;
}

const SLIDES: Slide[] = [
  { title: 'Cari\nDestinasimu\nsekarang', location: '', text: 'Mari mulai petualangan baru hari ini. Temukan keindahan alam yang belum pernah Anda rasakan sebelumnya.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80', accId: 'accommodation-009' },
  { title: 'Jempol Beach', location: 'Jawa Barat, Pucuk Ubi', text: 'Pantai dengan pasir putih yang menawan dan ombak yang tenang. Cocok untuk bersantai bersama keluarga.', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80', accId: 'accommodation-009' },
  { title: 'Flower Garden', location: 'Jawa Barat, Pucuk Ubi', text: 'Taman bunga dengan ribuan spesies warna-warni yang memanjakan mata di dataran tinggi yang sejuk.', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80', accId: 'accommodation-001' },
  { title: 'Garuda Zoo', location: 'Jawa Barat, Pucuk Ubi', text: 'Kawasan konservasi alam liar dengan pengalaman safari terbaik berinteraksi dengan hewan eksotis.', image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80', accId: 'accommodation-003' },
  { title: 'Mount Bromo', location: 'Jawa Timur', text: 'Nikmati sunrise spektakuler dari puncak pegunungan vulkanik dengan lautan pasir yang luas.', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=80', accId: 'accommodation-006' },
  { title: 'Hidden Lake', location: 'Sumatera', text: 'Danau tersembunyi dengan air biru jernih, tempat sempurna untuk menenangkan pikiran.', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=80', accId: 'accommodation-007' },
];

const RECOMMENDED = ['accommodation-001', 'accommodation-007', 'accommodation-006', 'accommodation-004', 'accommodation-005', 'accommodation-008'];

const FAMOUS = [
  { title: 'Jempol Beach', location: 'Jawa Barat, Pucuk Ubi', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80', accId: 'accommodation-009' },
  { title: 'Raja Ampat', location: 'Papua Barat Daya', image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80', accId: 'accommodation-005' },
];
const NEARBY = [
  { title: 'Teluk Kiluan', location: 'Tanggamus, Lampung', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', accId: 'accommodation-008' },
  { title: 'Pulau Wakatobi', location: 'Sulawesi Tenggara', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', accId: 'accommodation-004' },
];

const Banner: React.FC<{ item: (typeof FAMOUS)[number]; onOpen: (id: string) => void }> = ({ item, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(item.accId)}
    className="relative h-52 sm:h-60 rounded-[30px] overflow-hidden group cursor-pointer text-left shadow-[0_4px_32px_0_rgba(53,68,93,0.25)]"
  >
    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-5 left-6 right-5 text-white">
      <h3 className="text-2xl font-bold leading-tight">{item.title}</h3>
      <p className="text-sm text-gray-200 flex items-center gap-1.5 mt-0.5">
        <MapPin className="w-3.5 h-3.5" /> {item.location}
      </p>
    </div>
  </button>
);

export default function Destinasi() {
  const { isFavorite, toggleFavorite, applyTo, openAccommodation } = useApp();
  // order[0] = slide aktif (latar). order[1..] = thumbnail di kanan, berurutan.
  const [order, setOrder] = useState<number[]>(SLIDES.map((_, i) => i));
  const [shown, setShown] = useState(0); // slide yang teksnya sedang tampil (berganti di tengah animasi)
  const n = SLIDES.length;
  const current = SLIDES[shown];
  const acc = getAcc(current.accId);

  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const expImgRef = useRef<HTMLImageElement>(null);
  const expShadeRef = useRef<HTMLDivElement>(null);
  const expInfoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const thumbEls = useRef<Record<number, HTMLButtonElement | null>>({});
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const busy = useRef(false);

  // ---- Animasi masuk teks: judul naik per baris (masking), sisanya fade-up ----
  useLayoutEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const lines = el.querySelectorAll('[data-line]');
    const fades = el.querySelectorAll('[data-fade]');
    gsap.fromTo(lines, { yPercent: 115, opacity: 1 }, { yPercent: 0, duration: 0.95, ease: 'power4.out', stagger: 0.1 });
    gsap.fromTo(fades, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.2 });
  }, [shown]);

  useEffect(() => () => { tlRef.current?.kill(); }, []);

  /**
   * Pindah slide. `thumbIdx` = thumbnail mana yang dipilih (0 = yang paling kiri / "berikutnya").
   * Kartu thumbnail itu melepaskan diri, membesar sampai menutupi layar, sementara thumbnail lain bergeser ke kiri.
   */
  const goForward = (thumbIdx: number) => {
    if (busy.current) return;
    const hero = heroRef.current, exp = expRef.current;
    const targetSlide = order[thumbIdx + 1];
    const thumbEl = thumbEls.current[targetSlide];
    if (!hero || !exp || !thumbEl) return;
    busy.current = true;

    const oldActive = order[0];
    const newOrder = [...order.slice(thumbIdx + 1), ...order.slice(0, thumbIdx + 1)];
    const hr = hero.getBoundingClientRect();
    const tr = thumbEl.getBoundingClientRect();
    const others = order.slice(1).filter((s) => s !== targetSlide).map((s) => thumbEls.current[s]).filter(Boolean) as HTMLElement[];
    const first = thumbEls.current[order[1]], second = thumbEls.current[order[2]];
    const step = first && second ? second.getBoundingClientRect().left - first.getBoundingClientRect().left : tr.width + 16;
    const radius = parseFloat(getComputedStyle(thumbEl).borderTopLeftRadius) || 24;
    const lines = copyRef.current?.querySelectorAll('[data-line]');
    const fades = copyRef.current?.querySelectorAll('[data-fade]');

    const finish = () => {
      flushSync(() => {
        setOrder(newOrder);
        setShown(targetSlide);
      });
      const all = Object.values(thumbEls.current).filter(Boolean) as HTMLElement[];
      gsap.set(all, { clearProps: 'all' });
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(exp, { display: 'none' });
      const newcomer = thumbEls.current[oldActive];
      if (newcomer) gsap.fromTo(newcomer, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' });
      busy.current = false;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    if (expImgRef.current) expImgRef.current.src = SLIDES[targetSlide].image;
    gsap.set(exp, { display: 'block', left: tr.left - hr.left, top: tr.top - hr.top, width: tr.width, height: tr.height, borderRadius: radius });
    gsap.set(expShadeRef.current, { opacity: 0 });
    gsap.set(expInfoRef.current, { opacity: 1 });
    gsap.set(thumbEl, { visibility: 'hidden' });

    const ease = 'power3.inOut';
    const tl = gsap.timeline({ onComplete: finish });
    tlRef.current = tl;
    tl.to(exp, { left: 0, top: 0, width: hr.width, height: hr.height, borderRadius: 0, duration: 1, ease }, 0)
      .to(expShadeRef.current, { opacity: 1, duration: 1, ease: 'power1.in' }, 0)
      .to(expInfoRef.current, { opacity: 0, duration: 0.3 }, 0)
      .to(bgRef.current, { opacity: 0.35, duration: 0.9, ease: 'power1.out' }, 0)
      .to(others, { x: -step * (thumbIdx + 1), duration: 1, ease }, 0)
      .to(barRef.current, { width: `${((newOrder[0] + 1) / n) * 100}%`, duration: 1, ease }, 0);
    if (lines?.length) tl.to(lines, { yPercent: -115, duration: 0.5, ease: 'power3.in', stagger: 0.05 }, 0);
    if (fades?.length) tl.to(fades, { y: -18, opacity: 0, duration: 0.4, ease: 'power2.in', stagger: 0.04 }, 0);
    // teks baru masuk saat kartu hampir memenuhi layar
    tl.call(() => flushSync(() => setShown(targetSlide)), undefined, 0.62);
  };

  /** Kebalikannya: slide sebelumnya datang dari kiri thumbnail dan membesar. */
  const goBackward = () => {
    if (busy.current) return;
    const hero = heroRef.current, exp = expRef.current;
    const targetSlide = order[order.length - 1];
    const targetEl = thumbEls.current[targetSlide];
    const first = thumbEls.current[order[1]], second = thumbEls.current[order[2]];
    if (!hero || !exp || !first) return;
    busy.current = true;

    const oldActive = order[0];
    const newOrder = [targetSlide, ...order.slice(0, order.length - 1)];
    const hr = hero.getBoundingClientRect();
    const fr = first.getBoundingClientRect();
    const step = second ? second.getBoundingClientRect().left - fr.left : fr.width + 16;
    const radius = parseFloat(getComputedStyle(first).borderTopLeftRadius) || 24;
    const others = order.slice(1).map((s) => thumbEls.current[s]).filter(Boolean) as HTMLElement[];
    const lines = copyRef.current?.querySelectorAll('[data-line]');
    const fades = copyRef.current?.querySelectorAll('[data-fade]');

    const finish = () => {
      flushSync(() => {
        setOrder(newOrder);
        setShown(targetSlide);
      });
      const all = Object.values(thumbEls.current).filter(Boolean) as HTMLElement[];
      gsap.set(all, { clearProps: 'all' });
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(exp, { display: 'none' });
      const newcomer = thumbEls.current[oldActive];
      if (newcomer) gsap.fromTo(newcomer, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' });
      busy.current = false;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    if (expImgRef.current) expImgRef.current.src = SLIDES[targetSlide].image;
    gsap.set(exp, { display: 'block', left: fr.left - hr.left - step, top: fr.top - hr.top, width: fr.width, height: fr.height, borderRadius: radius });
    gsap.set(expShadeRef.current, { opacity: 0 });
    gsap.set(expInfoRef.current, { opacity: 0 });
    if (targetEl) gsap.set(targetEl, { visibility: 'hidden' });

    const ease = 'power3.inOut';
    const tl = gsap.timeline({ onComplete: finish });
    tlRef.current = tl;
    tl.to(exp, { left: 0, top: 0, width: hr.width, height: hr.height, borderRadius: 0, duration: 1, ease }, 0)
      .to(expShadeRef.current, { opacity: 1, duration: 1, ease: 'power1.in' }, 0)
      .to(bgRef.current, { opacity: 0.35, duration: 0.9, ease: 'power1.out' }, 0)
      .to(others, { x: step, duration: 1, ease }, 0)
      .to(barRef.current, { width: `${((newOrder[0] + 1) / n) * 100}%`, duration: 1, ease }, 0);
    if (lines?.length) tl.to(lines, { yPercent: -115, duration: 0.5, ease: 'power3.in', stagger: 0.05 }, 0);
    if (fades?.length) tl.to(fades, { y: -18, opacity: 0, duration: 0.4, ease: 'power2.in', stagger: 0.04 }, 0);
    tl.call(() => flushSync(() => setShown(targetSlide)), undefined, 0.62);
  };

  const recommended = useMemo(() => RECOMMENDED.map((id) => ACCOMMODATIONS.find((a) => a.id === id)!).filter(Boolean), []);
  const fav = isFavorite(current.accId);
  const progress = ((order[0] + 1) / n) * 100;
  const titleLines = current.title.split('\n');
  const thumbs = order.slice(1);

  return (
    <PageShell active="/home" overlay>
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#142642] select-none" aria-label="Galeri destinasi wisata">
        {/* Latar: gambar slide aktif */}
        <div ref={bgRef} className="absolute inset-0">
          {SLIDES.map((sl, i) => (
            <img
              key={i}
              src={sl.image}
              alt=""
              aria-hidden={i !== order[0]}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: i === order[0] ? 1 : 0 }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Kartu yang membesar (diatur oleh GSAP) */}
        <div ref={expRef} className="absolute z-10 overflow-hidden pointer-events-none" style={{ display: 'none' }} aria-hidden="true">
          <img ref={expImgRef} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div ref={expShadeRef} className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15" />
          <div ref={expInfoRef} className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Teks kiri */}
        <div
          ref={copyRef}
          className="absolute z-20 left-[6%] right-[6%] top-[22%] lg:top-1/2 lg:-translate-y-1/2 lg:right-auto lg:w-[38%] lg:max-w-[520px] text-white"
        >
          <h1 className="text-[40px] sm:text-5xl xl:text-6xl font-bold leading-[1.12] tracking-tight">
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span data-line className="inline-block will-change-transform">{line}</span>
              </span>
            ))}
          </h1>
          {current.location && (
            <p data-fade className="mt-2 text-sm text-gray-200 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {current.location}
            </p>
          )}
          <p data-fade className="mt-4 mb-6 lg:mb-8 text-sm lg:text-base leading-relaxed text-gray-100/90 max-w-[46ch]">
            {current.text}
          </p>
          <div data-fade className="flex items-center gap-4">
            <button
              type="button"
              aria-label={fav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              aria-pressed={fav}
              onClick={() => toggleFavorite(current.accId)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition cursor-pointer ${fav ? 'bg-white text-[#4F90F6] border-white' : 'border-white/60 text-white hover:bg-white hover:text-[#142642]'}`}
            >
              <Heart className={`w-5 h-5 ${fav ? 'fill-[#4F90F6]' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => applyTo(current.accId)}
              className="px-10 py-3.5 bg-white text-[#142642] font-semibold rounded-full shadow-lg hover:bg-[#EAF2FF] hover:scale-105 transition cursor-pointer"
            >
              Apply
            </button>
            {acc && (
              <button
                type="button"
                onClick={() => openAccommodation(acc.id)}
                className="hidden sm:inline text-sm font-medium text-white/90 underline underline-offset-4 hover:text-white cursor-pointer"
              >
                Lihat penginapan
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail kanan */}
        <aside
          className="absolute z-30 left-[6%] right-0 bottom-[96px] lg:bottom-auto lg:top-1/2 lg:left-[48%] lg:-translate-y-[52%] overflow-hidden"
          aria-label="Pilihan destinasi selanjutnya"
        >
          <div className="flex gap-4 lg:gap-6 w-max">
            {thumbs.map((idx, pos) => {
              const sl = SLIDES[idx];
              return (
                <button
                  key={idx}
                  ref={(el) => { thumbEls.current[idx] = el; }}
                  type="button"
                  onClick={() => goForward(pos)}
                  aria-label={`Lihat ${sl.title.replace(/\n/g, ' ')}`}
                  className="group relative w-[132px] h-[190px] sm:w-[150px] sm:h-[220px] lg:w-[220px] lg:h-[320px] shrink-0 rounded-[1.25rem] lg:rounded-3xl overflow-hidden cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.45)] text-left"
                >
                  <img src={sl.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-3 text-white">
                    <h2 className="font-bold text-sm lg:text-lg leading-snug">{sl.title.replace(/\n/g, ' ')}</h2>
                    <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{sl.location || 'Indonesia'}</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Kontrol & progress */}
        <nav className="absolute z-30 left-[6%] right-[6%] bottom-10 lg:left-[48%] lg:right-[6%] flex items-center gap-4" aria-label="Kontrol slider">
          <button type="button" onClick={goBackward} aria-label="Sebelumnya" className="w-11 h-11 rounded-full border border-white/60 text-white flex items-center justify-center hover:bg-white hover:text-[#142642] transition cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => goForward(0)} aria-label="Berikutnya" className="w-11 h-11 rounded-full border border-white/60 text-white flex items-center justify-center hover:bg-white hover:text-[#142642] transition cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div ref={barRef} className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </nav>
      </section>

      {/* ================= KONTEN ================= */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-24 space-y-20 lg:space-y-28">
        <section id="rekomendasi" className="scroll-mt-28" aria-labelledby="h-rek">
          <h2 id="h-rek" className="text-[28px] sm:text-[32px] font-bold text-[#0F1010] mb-8 tracking-tight">Rekomendasi penginapan</h2>
          <CardGrid>
            {recommended.map((a) => (
              <AccommodationCard key={a.id} acc={a} onOpen={openAccommodation} onApply={applyTo} isFavorite={isFavorite(a.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </CardGrid>
        </section>

        <section id="terkenal" className="scroll-mt-28" aria-labelledby="h-terkenal">
          <h2 id="h-terkenal" className="text-[28px] sm:text-[32px] font-bold text-[#0F1010] mb-8 tracking-tight">Destinasi terkenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {FAMOUS.map((f) => <Banner key={f.title} item={f} onOpen={openAccommodation} />)}
          </div>
        </section>

        <section id="terdekat" className="scroll-mt-28" aria-labelledby="h-terdekat">
          <h2 id="h-terdekat" className="text-[28px] sm:text-[32px] font-bold text-[#0F1010] mb-8 tracking-tight">Destinasi terdekat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {NEARBY.map((f) => <Banner key={f.title} item={f} onOpen={openAccommodation} />)}
          </div>
        </section>
      </div>
    </PageShell>
  );
}