import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { ACCOMMODATIONS } from '../data/accommodations';
import { navigate } from './router';

/* ---------- Tipe ---------- */
export interface UserProfile {
  name: string;
  email: string;
  birth: string;
  phone: string;
  avatar?: string;
}

export type OrderStatus = 'Telah diterima' | 'Menunggu akses' | 'Selesai';
export interface Order {
  id: string;
  accId: string;
  status: OrderStatus;
  createdAt: string;
}

/* ---------- Akun dummy ---------- */
export const DEMO_PASSWORD = 'travora123';
export const DEMO_PROFILE: UserProfile = {
  name: 'mapoyoyoii',
  email: 'mapoyoyoimajuju@gmail.com',
  birth: '15 Agustus 2008',
  phone: '082134567890',
};
const DEMO_EMAILS = [DEMO_PROFILE.email, 'demo@travora.test'];

const KEYS = {
  user: 'travora_user',
  users: 'travora_users',
  favs: 'travora_favorites',
  orders: 'travora_orders',
  next: 'travora_next',
};

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage penuh / diblokir – abaikan */
  }
};

const SEED_ORDERS: Order[] = [
  { id: 'ord-1', accId: 'accommodation-001', status: 'Telah diterima', createdAt: '2026-11-10' },
  { id: 'ord-2', accId: 'accommodation-007', status: 'Menunggu akses', createdAt: '2026-11-12' },
  { id: 'ord-3', accId: 'accommodation-006', status: 'Selesai', createdAt: '2026-10-02' },
];

/* ---------- Context ---------- */
interface Toast {
  id: number;
  message: string;
  tone: 'success' | 'info';
}

interface AppState {
  user: UserProfile | null;
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  orders: Order[];
  applyTo: (accId: string) => void;
  openAccommodation: (accId: string) => void;
  /** Simpan tujuan setelah login lalu arahkan ke halaman login */
  requireLogin: (next?: string) => void;
  consumeNext: () => string | null;
  notify: (message: string, tone?: Toast['tone']) => void;
}

const Ctx = createContext<AppState | null>(null);
export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp harus dipakai di dalam AppProvider');
  return v;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => read<UserProfile | null>(KEYS.user, null));
  const [favorites, setFavorites] = useState<string[]>(() => read<string[]>(KEYS.favs, []));
  const [orders, setOrders] = useState<Order[]>(() => read<Order[]>(KEYS.orders, SEED_ORDERS));
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => write(KEYS.favs, favorites), [favorites]);
  useEffect(() => write(KEYS.orders, orders), [orders]);
  useEffect(() => write(KEYS.user, user), [user]);

  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    setToast({ id: Date.now(), message, tone });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const login = useCallback((email: string, password: string) => {
    const e = email.trim().toLowerCase();
    if (!e || !password) return 'Email dan kata sandi wajib diisi.';
    if (DEMO_EMAILS.includes(e) && password === DEMO_PASSWORD) {
      const saved = read<UserProfile | null>(KEYS.user, null);
      setUser(saved && DEMO_EMAILS.includes(saved.email.toLowerCase()) ? saved : DEMO_PROFILE);
      return null;
    }
    const users = read<(UserProfile & { password: string })[]>(KEYS.users, []);
    const found = users.find((u) => u.email.toLowerCase() === e && u.password === password);
    if (found) {
      const { password: _pw, ...profile } = found;
      setUser(profile);
      return null;
    }
    return 'Email atau kata sandi salah. Gunakan akun demo di bawah.';
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const e = email.trim().toLowerCase();
    if (!name.trim() || !e || password.length < 6) return 'Lengkapi nama, email, dan kata sandi (min. 6 karakter).';
    const users = read<(UserProfile & { password: string })[]>(KEYS.users, []);
    if (users.some((u) => u.email.toLowerCase() === e) || DEMO_EMAILS.includes(e)) {
      return 'Email sudah terdaftar.';
    }
    const profile: UserProfile = { name: name.trim(), email: e, birth: '-', phone: '-' };
    write(KEYS.users, [...users, { ...profile, password }]);
    setUser(profile);
    setOrders([]);
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    navigate('/');
  }, []);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const has = prev.includes(id);
        notify(has ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit', 'info');
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [notify]
  );

  const requireLogin = useCallback((next?: string) => {
    if (next) sessionStorage.setItem(KEYS.next, next);
    navigate('/login');
  }, []);

  const consumeNext = useCallback(() => {
    const n = sessionStorage.getItem(KEYS.next);
    sessionStorage.removeItem(KEYS.next);
    return n;
  }, []);

  const applyTo = useCallback(
    (accId: string) => {
      if (!user) {
        requireLogin(`/detail/${accId}`);
        return;
      }
      const active = orders.find((o) => o.accId === accId && o.status !== 'Selesai');
      if (active) {
        notify('Pengajuanmu untuk penginapan ini masih dalam proses.', 'info');
        return;
      }
      setOrders((prev) => [
        { id: `ord-${Date.now()}`, accId, status: 'Menunggu akses', createdAt: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
      notify('Pesananmu akan segera diproses');
    },
    [user, orders, notify, requireLogin]
  );

  const openAccommodation = useCallback(
    (accId: string) => {
      if (!user) requireLogin(`/detail/${accId}`);
      else navigate(`/detail/${accId}`);
    },
    [user, requireLogin]
  );

  const value = useMemo<AppState>(
    () => ({
      user, login, register, logout, updateProfile,
      favorites, isFavorite: (id) => favorites.includes(id), toggleFavorite,
      orders, applyTo, openAccommodation, requireLogin, consumeNext, notify,
    }),
    [user, login, register, logout, updateProfile, favorites, toggleFavorite, orders, applyTo, openAccommodation, requireLogin, consumeNext, notify]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4 pointer-events-none" role="status" aria-live="polite">
          <div
            key={toast.id}
            className="toast-in pointer-events-auto flex items-center gap-3 rounded-full bg-[#142642] text-white pl-4 pr-6 py-3.5 shadow-[0_10px_40px_rgba(20,38,66,0.35)] max-w-[92vw]"
          >
            {toast.tone === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#7FE0A8] shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-[#8DB6FF] shrink-0" />
            )}
            <span className="text-sm sm:text-[15px] font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
};

export const getAcc = (id: string) => ACCOMMODATIONS.find((a) => a.id === id);
