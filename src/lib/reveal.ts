import { useEffect } from 'react';

/**
 * Animasi masuk saat di-scroll (landing page).
 *  - data-reveal="up|left|right|zoom|fade" → elemen dianimasikan saat masuk layar
 *  - data-stagger="0.12" pada sebuah wadah → anak-anaknya muncul berurutan dengan jeda 0.12 detik
 *  - style={{ '--rd': '.2s' }} → jeda manual
 * Animasinya didefinisikan di index.css ([data-reveal]).
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets: Element[] = [];

    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((box) => {
      const step = parseFloat(box.dataset.stagger || '0.12') || 0.12;
      const variant = box.dataset.variant || 'up';
      Array.from(box.children).forEach((child, i) => {
        const el = child as HTMLElement;
        if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', variant);
        el.style.setProperty('--rd', `${(i * step).toFixed(2)}s`);
      });
    });
    document.querySelectorAll('[data-reveal]').forEach((el) => targets.push(el));

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.setAttribute('data-in', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}