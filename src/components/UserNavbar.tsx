import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Heart, Menu, Search, MapPin } from 'lucide-react';
import { Logo, Avatar } from './Logo';
import { MobileDrawer, DrawerItem } from './MobileDrawer';
import { ACCOMMODATIONS } from '../data/accommodations';
import { getAcc, useApp } from '../lib/store';
import { navigate, readRoute } from '../lib/router';
import { onHouseImgError } from '../data/houseImages';

/** Menu = section yang ada di halaman Home (Destinasi). `id` = id elemen di Destinasi.tsx */
const NAV = [
  { label: 'Home', id: 'top' },
  { label: 'Rekomendasi', id: 'rekomendasi' },
  { label: 'Terkenal', id: 'terkenal' },
  { label: 'Terdekat', id: 'terdekat' },
];

const norm = (s: string) => s.toLowerCase();

export const searchAccommodations = (q: string) => {
  const t = norm(q.trim());
  if (!t) return [];
  return ACCOMMODATIONS.filter((a) =>
    [a.name, a.location, a.city, a.province, a.description, a.category].some((f) => norm(f).includes(t))
  );
};

interface Props {
  /** path halaman aktif, untuk highlight menu */
  active: string;
  /** true = navbar melayang di atas hero (tanpa menggeser layout) */
  overlay?: boolean;
}

/** Navbar SETELAH login: Home · Rekomendasi · Terkenal · Terdekat (section di halaman Home) · Search · Favorit · Notifikasi · Profil */
export const UserNavbar: React.FC<Props> = ({ active, overlay }) => {
  const { user, favorites, orders } = useApp();
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false); // dropdown hasil
  const [mobileSearch, setMobileSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState('top');

  // Scroll-spy: tandai menu sesuai section Home yang sedang terlihat
  useEffect(() => {
    if (active !== '/home') return;
    const onScroll = () => {
      let cur = 'top';
      for (const n of NAV) {
        if (n.id === 'top') continue;
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = n.id;
      }
      setSection(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  const goSection = (id: string) => {
    const scroll = () => {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    if (readRoute().path === '/home') scroll();
    else {
      navigate('/home');
      setTimeout(scroll, 300);
    }
  };
  const isActive = (id: string) => active === '/home' && section === id;

  const results = useMemo(() => searchAccommodations(query).slice(0, 5), [query]);
  const total = useMemo(() => searchAccommodations(query).length, [query]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileSearch(false);
    setSearchOpen(false);
    setBellOpen(false);
  }, [active]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    setMobileSearch(false);
    navigate(`/cari?q=${encodeURIComponent(query.trim())}`);
  };

  const notifications = orders.slice(0, 4).map((o) => ({
    id: o.id,
    text: `${getAcc(o.accId)?.name ?? 'Penginapan'} — ${o.status}`,
  }));

  const SearchBox = (
    <form onSubmit={submit} role="search" className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4F8DF7] pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearchOpen(true);
        }}
        onFocus={() => setSearchOpen(true)}
        placeholder="Search"
        aria-label="Cari penginapan"
        className="w-full h-10 pl-10 pr-4 rounded-full border-2 border-[#BCD6FF] bg-white text-sm text-[#142642] placeholder:text-[#8DB6FF] focus:outline-none focus:border-[#4F8DF7] transition-colors"
      />
      {searchOpen && query.trim() && (
        <div className="absolute left-0 right-0 top-12 z-50 bg-white rounded-2xl shadow-[0_12px_40px_rgba(20,38,66,0.18)] border border-[#EAEAEA] overflow-hidden min-w-[280px]">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-neutral-500">Tidak ada hasil untuk “{query}”.</p>
          ) : (
            <>
              <ul>
                {results.map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setMobileSearch(false);
                        setQuery('');
                        navigate(`/detail/${a.id}`);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#EAF2FF] text-left cursor-pointer"
                    >
                      <img src={a.images[0]} alt="" onError={onHouseImgError} className="w-11 h-11 rounded-xl object-cover shrink-0" />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-[#0F1010] truncate">{a.name}</span>
                        <span className="flex items-center gap-1 text-xs text-[#949494] truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{a.location}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm font-semibold text-[#4F8DF7] bg-[#F5F9FF] hover:bg-[#EAF2FF] border-t border-[#EAEAEA] cursor-pointer"
              >
                Lihat semua {total} hasil
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );

  const iconBtn = 'w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0';

  const bar = (
    <header className={overlay ? '' : 'sticky top-4 sm:top-6 z-50'}>
      <div ref={wrapRef} className="px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-[32px] sm:rounded-[44px] shadow-lg border border-[#EAEAEA]/80 px-4 sm:px-8 lg:px-10 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 lg:gap-8 min-w-0">
            <button type="button" onClick={() => navigate('/home')} className="shrink-0 cursor-pointer" aria-label="TRAVORA – Home">
              <Logo />
            </button>
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Menu Home">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => goSection(n.id)}
                  aria-current={isActive(n.id) ? 'true' : undefined}
                  className={`px-4 xl:px-6 py-2.5 rounded-full text-sm xl:text-base transition-all cursor-pointer ${
                    isActive(n.id)
                      ? 'bg-[#EAF2FF] text-[#4F8DF7] font-semibold'
                      : 'text-neutral-700 font-medium hover:bg-neutral-50'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search: input di layar lebar, ikon di layar kecil */}
            <div className="hidden lg:block w-[210px] xl:w-[320px]">{SearchBox}</div>
            <button
              type="button"
              onClick={() => setMobileSearch((v) => !v)}
              aria-label="Cari"
              className={`${iconBtn} lg:hidden text-[#4F8DF7] hover:bg-[#EAF2FF]`}
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/favorit')}
              aria-label="Favorit"
              aria-current={active === '/favorit' ? 'page' : undefined}
              className={`${iconBtn} relative ${active === '/favorit' ? 'bg-[#EAF2FF] text-[#4F8DF7]' : 'text-[#142642] hover:bg-[#EAF2FF]'}`}
            >
              <Heart className={`w-5 h-5 ${active === '/favorit' || favorites.length ? 'fill-[#4F8DF7] text-[#4F8DF7]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#4F8DF7] text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setBellOpen((v) => !v)}
                aria-label="Notifikasi"
                aria-expanded={bellOpen}
                className={`${iconBtn} text-[#142642] hover:bg-[#EAF2FF]`}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#FE8B45]" />}
              </button>
              {bellOpen && (
                <div className="absolute right-0 top-12 w-[300px] max-w-[85vw] bg-white rounded-2xl shadow-[0_12px_40px_rgba(20,38,66,0.18)] border border-[#EAEAEA] overflow-hidden z-50">
                  <p className="px-4 py-3 text-sm font-bold text-[#0F1010] border-b border-[#EAEAEA]">Notifikasi</p>
                  {notifications.length === 0 ? (
                    <p className="px-4 py-5 text-sm text-neutral-500">Belum ada notifikasi.</p>
                  ) : (
                    <ul>
                      {notifications.map((n) => (
                        <li key={n.id} className="px-4 py-3 text-sm text-neutral-700 border-b last:border-0 border-[#F1F1F1]">
                          {n.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    type="button"
                    onClick={() => navigate('/profil?tab=pesanan')}
                    className="w-full px-4 py-3 text-sm font-semibold text-[#4F8DF7] bg-[#F5F9FF] hover:bg-[#EAF2FF] cursor-pointer"
                  >
                    Lihat pesanan
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate('/profil')}
              aria-label="Profil"
              className={`shrink-0 rounded-full cursor-pointer ring-2 transition ${active === '/profil' ? 'ring-[#4F8DF7]' : 'ring-transparent hover:ring-[#BCD6FF]'}`}
            >
              <Avatar src={user?.avatar} className="w-10 h-10" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              className={`${iconBtn} lg:hidden text-neutral-600 hover:bg-neutral-100`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileSearch && <div className="lg:hidden mt-2 bg-white rounded-3xl p-3 shadow-xl border border-neutral-100">{SearchBox}</div>}

        <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)}>
          {NAV.map((n) => (
            <DrawerItem
              key={n.id}
              label={n.label}
              active={isActive(n.id)}
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => goSection(n.id), 160);
              }}
            />
          ))}
        </MobileDrawer>
      </div>
    </header>
  );

  // Mode overlay: wadah tinggi 0 yang tetap menempel (sticky) di atas hero
  return overlay ? (
    <div className="sticky top-0 z-50 h-0">
      <div className="pt-4 sm:pt-6">{bar}</div>
    </div>
  ) : (
    bar
  );
};