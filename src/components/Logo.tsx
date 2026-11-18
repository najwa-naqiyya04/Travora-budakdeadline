import React from 'react';

/** Logo TRAVORA – ganti dengan filemu: public/assets/images/logo.png */
export const LOGO_SRC = '/assets/images/logo.png';

export const Logo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9 sm:w-10 sm:h-10' }) => (
  <img src={LOGO_SRC} alt="TRAVORA" className={`${className} object-contain`} draggable={false} />
);

/** Avatar default (monster teal) – dipakai jika user belum upload foto. */
export const Avatar: React.FC<{ src?: string; className?: string; alt?: string }> = ({ src, className = 'w-10 h-10', alt = 'Foto profil' }) =>
  src ? (
    <img src={src} alt={alt} className={`${className} rounded-full object-cover`} />
  ) : (
    <svg className={`${className} rounded-full`} viewBox="0 0 100 100" role="img" aria-label={alt}>
      <rect width="100" height="100" fill="#6FD3C0" />
      <circle cx="12" cy="52" r="3.5" fill="#12201F" />
      <ellipse cx="58" cy="42" rx="30" ry="27" fill="#F4F1EA" stroke="#E2DDD0" strokeWidth="3" />
      <circle cx="62" cy="42" r="13" fill="#12201F" />
      <circle cx="66" cy="37" r="4" fill="#fff" />
      <path d="M14 82 Q38 56 70 78 Q84 90 94 100 L10 100 Z" fill="#12201F" />
    </svg>
  );