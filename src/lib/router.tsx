import { useEffect, useState } from 'react';

/** Router berbasis hash (#/path) – tidak butuh konfigurasi server. */
export interface Route {
  path: string;
  query: URLSearchParams;
}

export const readRoute = (): Route => {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, qs] = raw.split('?');
  return { path: path || '/', query: new URLSearchParams(qs || '') };
};

export const navigate = (to: string) => {
  if (window.location.hash === `#${to}`) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.location.hash = to;
};

export const useRoute = (): Route => {
  const [route, setRoute] = useState<Route>(readRoute);
  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
};

/** Pindah ke landing page lalu scroll ke section tertentu. */
export const goToLandingSection = (id: string) => {
  const scroll = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (readRoute().path === '/') {
    scroll();
  } else {
    navigate('/');
    setTimeout(scroll, 120);
  }
};
