import { useEffect, useState } from 'react';

let lockCount = 0;
let prevOverflow = '';

export function useLockBodyScroll(shouldLock: boolean) {
  useEffect(() => {
    if (shouldLock) {
      if (lockCount === 0) {
        prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      lockCount++;
      return () => {
        lockCount--;
        if (lockCount === 0) {
          document.body.style.overflow = prevOverflow;
        }
      };
    }
  }, [shouldLock]);
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
