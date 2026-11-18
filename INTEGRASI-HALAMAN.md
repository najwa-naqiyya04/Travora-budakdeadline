# Struktur TRAVORA (semua halaman kini satu aplikasi React)

Routing memakai hash (`#/path`), jadi tidak perlu konfigurasi server.

| URL | Halaman | Akses |
|---|---|---|
| `#/` | Landing (navbar Login/Sign up; jika sudah login → navbar pengguna) | publik |
| `#/login` | Login & daftar (`?mode=register`) | publik |
| `#/home` | Destinasi (hero slider + rekomendasi) | login |
| `#/favorit` | Kesukaan | login |
| `#/cari?q=...` | Hasil pencarian | login |
| `#/profil` , `#/profil?tab=pesanan` | Biodata & Pesanan penginapan | login |
| `#/detail/:id` | Detail penginapan | login |
| `#/ecoguide`, `#/rewards` | Placeholder "segera hadir" | login |

## Akun demo
- Email: `mapoyoyoimajuju@gmail.com` (atau `demo@travora.test`)
- Sandi: `travora123`

## Konsistensi
- Card: `src/components/AccommodationCard.tsx` (satu-satunya sumber, dipakai semua halaman)
- Footer: `src/components/Footer.tsx` (sama di landing dan semua halaman)
- Navbar: `Navbar.tsx` (sebelum login) dan `UserNavbar.tsx` (sesudah login)
- State (login, favorit, pesanan, toast): `src/lib/store.tsx` → localStorage

Catatan: login hanya demo berbasis localStorage, bukan autentikasi produksi.
