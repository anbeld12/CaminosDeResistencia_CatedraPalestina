import { useEffect, useState } from 'react';

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)');
    if (!els.length) return;
    const vh = window.innerHeight;
    const watchList: HTMLElement[] = [];
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top > vh - 60) {
        el.classList.add('is-pre');
        watchList.push(el);
      } else {
        el.classList.add('is-in');
      }
    });
    if (!watchList.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });
    watchList.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}
