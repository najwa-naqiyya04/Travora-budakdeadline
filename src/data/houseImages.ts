/**
 * Foto card penginapan = file MILIKMU sendiri.
 * Taruh di: public/assets/images/penginapan/
 * Nama file: acc-001-1.jpg, acc-001-2.jpg, ... (lihat ASET-GAMBAR.md untuk daftar lengkap).
 *
 * - acc-00N-1.jpg  = foto yang tampil di card (wajib)
 * - acc-00N-2.jpg  = foto kedua di halaman detail (wajib agar galeri detail lengkap)
 * - acc-00N-3.jpg  = foto tambahan (opsional)
 * Jika sebuah file belum ada, otomatis tampil gambar cadangan HOUSE_FALLBACK.
 */
export const HOUSE_FALLBACK = '/assets/images/house-fallback.svg';

const photo = (acc: string, n: number) => `/assets/images/penginapan/acc-${acc}-${n}.jpg`;

export const ACC_IMAGES: Record<string, string[]> = Object.fromEntries(
  ['001', '002', '003', '004', '005', '006', '007', '008', '009'].map((n) => [
    `accommodation-${n}`,
    [photo(n, 1), photo(n, 2), photo(n, 3)],
  ])
);

/** Pasang di <img onError={...}> agar foto yang gagal dimuat diganti gambar cadangan. */
export const onHouseImgError = (e: { currentTarget: HTMLImageElement }) => {
  const img = e.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = '1';
  img.src = HOUSE_FALLBACK;
};