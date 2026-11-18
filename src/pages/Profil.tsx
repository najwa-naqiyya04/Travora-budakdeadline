import React, { useRef, useState } from 'react';
import { Camera, LogOut, MapPin, Pencil, Star, Check, X } from 'lucide-react';
import { PageShell } from '../components/PageShell';
import { Avatar } from '../components/Logo';
import { getAcc, OrderStatus, useApp } from '../lib/store';
import { navigate, readRoute } from '../lib/router';
import { onHouseImgError } from '../data/houseImages';

const STATUS_STYLE: Record<OrderStatus, string> = {
  'Telah diterima': 'bg-[#DFF5E8] text-[#1F8A4C]',
  'Menunggu akses': 'bg-[#E9E4FA] text-[#5B45B0]',
  Selesai: 'bg-[#EBEBEB] text-[#555]',
};

type Tab = 'biodata' | 'pesanan';

/** Perkecil foto agar muat di localStorage */
const resizeImage = (file: File, size = 256): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = c.height = size;
        const ctx = c.getContext('2d')!;
        const s = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
        resolve(c.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-0 py-1.5">
    <dt className="sm:w-48 text-[#555] shrink-0">{label}</dt>
    <dd className="text-[#222] break-words">{value}</dd>
  </div>
);

export default function Profil() {
  const { user, updateProfile, logout, orders, notify } = useApp();
  const [tab, setTab] = useState<Tab>(readRoute().query.get('tab') === 'pesanan' ? 'pesanan' : 'biodata');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: '', birth: '', phone: '' });
  const fileRef = useRef<HTMLInputElement>(null);
  if (!user) return null;

  const startEdit = () => {
    setDraft({ name: user.name, birth: user.birth, phone: user.phone });
    setEditing(true);
  };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    updateProfile({ name: draft.name.trim(), birth: draft.birth.trim() || '-', phone: draft.phone.trim() || '-' });
    setEditing(false);
    notify('Profil berhasil diperbarui');
  };
  const onPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      updateProfile({ avatar: await resizeImage(f) });
      notify('Foto profil diperbarui');
    } catch {
      notify('Gagal membaca foto. Coba gambar lain.', 'info');
    }
    e.target.value = '';
  };

  const tabBtn = (id: Tab, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={tab === id}
      onClick={() => setTab(id)}
      className={`px-4 sm:px-7 py-2.5 rounded-full text-sm sm:text-base transition cursor-pointer whitespace-nowrap ${
        tab === id ? 'bg-[#EAF2FF] text-[#4F8DF7] font-medium' : 'text-[#142642] hover:bg-neutral-50'
      }`}
    >
      {label}
    </button>
  );

  const inputCls = 'w-full max-w-md h-11 px-4 rounded-xl border-2 border-[#D7E6FF] focus:border-[#4F8DF7] outline-none text-[#142642] bg-white';

  return (
    <PageShell active="/profil">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-20 sm:pb-28">
        <div className="rounded-[28px] border border-[#DCDCDC] bg-white px-5 sm:px-10 pt-6 sm:pt-10 pb-10">
          {/* Tab */}
          <div className="flex justify-center" role="tablist" aria-label="Bagian profil">
            <div className="flex items-center gap-1 sm:gap-3">
              {tabBtn('biodata', 'Biodata')}
              {tabBtn('pesanan', 'Pesanan penginapan')}
            </div>
          </div>
          <hr className="mt-6 sm:mt-8 border-t border-[#BCD6FF]" />

          {tab === 'biodata' && (
            <div className="pt-8 sm:pt-12" role="tabpanel">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                <div className="relative w-[112px] h-[112px] sm:w-[150px] sm:h-[150px] shrink-0">
                  <Avatar src={user.avatar} className="w-full h-full" />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    aria-label="Ganti foto profil"
                    className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white border border-[#4F8DF7] text-[#4F8DF7] flex items-center justify-center hover:bg-[#EAF2FF] cursor-pointer"
                  >
                    <Camera className="w-[18px] h-[18px]" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhoto} />
                </div>
                <div className="min-w-0">
                  <h1 className="text-[26px] sm:text-[30px] font-bold text-[#0F1010] break-words">{user.name}</h1>
                  <p className="mt-1 text-[#444] break-all">{user.email}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {!editing && (
                      <button
                        type="button"
                        onClick={startEdit}
                        className="inline-flex items-center gap-2 px-6 h-9 rounded-full border border-[#4F8DF7] text-[#4F8DF7] text-sm hover:bg-[#EAF2FF] cursor-pointer"
                      >
                        Edit your profile <Pencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={logout}
                      className="inline-flex items-center gap-2 px-6 h-9 rounded-full border border-[#E5B4B4] text-[#C24A4A] text-sm hover:bg-[#FFF3F3] cursor-pointer"
                    >
                      Keluar <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {editing ? (
                <form onSubmit={save} className="mt-10 space-y-5">
                  <div>
                    <label className="block text-sm text-[#555] mb-1.5" htmlFor="f-name">Nama</label>
                    <input id="f-name" className={inputCls} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#555] mb-1.5" htmlFor="f-birth">Tanggal lahir</label>
                    <input id="f-birth" className={inputCls} value={draft.birth} onChange={(e) => setDraft({ ...draft, birth: e.target.value })} placeholder="15 Agustus 2008" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#555] mb-1.5" htmlFor="f-phone">Nomor telepon</label>
                    <input id="f-phone" className={inputCls} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} inputMode="tel" />
                  </div>
                  <p className="text-xs text-neutral-400">Email tidak dapat diubah pada akun demo.</p>
                  <div className="flex gap-3">
                    <button type="submit" className="inline-flex items-center gap-2 px-7 h-11 rounded-full bg-[#4F90F6] hover:bg-[#3d80e8] text-white font-medium cursor-pointer">
                      <Check className="w-4 h-4" /> Simpan
                    </button>
                    <button type="button" onClick={() => setEditing(false)} className="inline-flex items-center gap-2 px-7 h-11 rounded-full border border-[#D0D0D0] text-[#444] hover:bg-neutral-50 cursor-pointer">
                      <X className="w-4 h-4" /> Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-10 sm:mt-14 space-y-8">
                  <section>
                    <h2 className="font-bold text-[#3a3a3a] mb-2">Biodata</h2>
                    <dl><Row label="Nama" value={user.name} /><Row label="Tanggal lahir" value={user.birth} /></dl>
                  </section>
                  <section>
                    <h2 className="font-bold text-[#3a3a3a] mb-2">Kontak</h2>
                    <dl><Row label="Email" value={user.email} /><Row label="Nomor telepon" value={user.phone} /></dl>
                  </section>
                </div>
              )}
            </div>
          )}

          {tab === 'pesanan' && (
            <div className="pt-8 sm:pt-12 space-y-5" role="tabpanel">
              {orders.length === 0 && (
                <div className="text-center py-14">
                  <p className="text-lg font-semibold text-[#142642]">Belum ada pesanan</p>
                  <p className="text-neutral-500 mt-1">Tekan Apply pada penginapan pilihanmu untuk memulai.</p>
                  <button type="button" onClick={() => navigate('/home')} className="mt-6 px-8 h-11 rounded-full bg-[#4F90F6] hover:bg-[#3d80e8] text-white font-medium cursor-pointer">
                    Cari penginapan
                  </button>
                </div>
              )}
              {orders.map((o) => {
                const a = getAcc(o.accId);
                if (!a) return null;
                const done = o.status === 'Selesai';
                return (
                  <article key={o.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-[28px] border border-[#DCDCDC] p-3 sm:p-3.5">
                    <img src={a.images[0]} alt={a.name} loading="lazy" onError={onHouseImgError} className="w-full sm:w-[260px] lg:w-[330px] h-[200px] sm:h-[210px] lg:h-[235px] rounded-[22px] object-cover shrink-0" />
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1 sm:pr-3">
                      <div>
                        <h3 className="text-[20px] sm:text-[24px] font-bold text-[#0F1010] leading-tight">{a.name}</h3>
                        <p className="mt-1.5 text-[#222] line-clamp-2">{a.subtitle}</p>
                        <div className="mt-3 flex items-center gap-2.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#FFCDAF] text-[#FE8B45] text-xs font-medium">
                            <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" /> {a.rating.toFixed(1)}
                          </span>
                          <span className="flex items-center gap-1.5 text-[#949494] text-sm min-w-0">
                            <MapPin className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">{a.location}</span>
                          </span>
                        </div>
                        <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/detail/${a.id}`)}
                        className={`mt-4 w-full h-12 rounded-full text-sm font-medium transition cursor-pointer ${
                          done ? 'border border-[#4F90F6] text-[#4F90F6] hover:bg-[#EAF2FF]' : 'bg-[#4F90F6] text-white hover:bg-[#3d80e8]'
                        }`}
                      >
                        See Detail
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}