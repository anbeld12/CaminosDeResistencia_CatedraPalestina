/* Shared hooks, components, icons */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ----- IntersectionObserver reveal hook ----- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-in)");
    if (!els.length) return;
    const vh = window.innerHeight;
    // Only elements below the fold get the pre-state (translate down). Everything
    // in or above the viewport is left alone so it's instantly readable — this
    // matters in preview iframes where the document.hidden flag freezes the
    // animation timeline and transitions never advance.
    const watchList = [];
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top > vh - 60) {
        el.classList.add("is-pre");
        watchList.push(el);
      } else {
        el.classList.add("is-in"); // already visible — mark complete
      }
    });
    if (!watchList.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    watchList.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ----- Scroll position (for shrinking nav) ----- */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/* ----- Icons ----- */
const Icon = {
  Sun: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>),
  Moon: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>),
  Search: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>),
  Grid: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>),
  Rows: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
  Arrow: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>),
  Close: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>),
  Menu: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  Play: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>),
  External: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg>),
};

/* ----- Olive branch (decorative, abstract not literal) ----- */
function OliveMark({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
      <path d="M6 22 Q 16 4, 26 22" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <ellipse cx="11" cy="17" rx="2.2" ry="1" fill="currentColor" transform="rotate(-30 11 17)"/>
      <ellipse cx="16" cy="11" rx="2.2" ry="1" fill="currentColor" transform="rotate(0 16 11)"/>
      <ellipse cx="21" cy="17" rx="2.2" ry="1" fill="currentColor" transform="rotate(30 21 17)"/>
    </svg>
  );
}

/* ----- Image placeholder ----- */
function ImageSlot({ height = 280, label, variant = "olive", style, className = "" }) {
  const bg = variant === "terra"
    ? "repeating-linear-gradient(135deg, rgba(139,29,34,0.10) 0 14px, transparent 14px 28px)"
    : variant === "carbon"
      ? "repeating-linear-gradient(135deg, rgba(18,18,18,0.10) 0 14px, transparent 14px 28px)"
      : "repeating-linear-gradient(135deg, rgba(46,71,49,0.10) 0 14px, transparent 14px 28px)";
  return (
    <div className={className} style={{
      height,
      borderRadius: 14,
      border: "1px solid var(--line)",
      background: `${bg}, var(--bg-warm)`,
      position: "relative",
      overflow: "hidden",
      ...style
    }}>
      <div style={{
        position: "absolute", bottom: 16, left: 16, right: 16,
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".15em",
        textTransform: "uppercase", color: "var(--fg-mute)",
        borderLeft: "2px solid var(--terracotta)",
        paddingLeft: 10
      }}>
        Imagen · {label}
      </div>
    </div>
  );
}

window.useReveal = useReveal;
window.useScrollY = useScrollY;
window.Icon = Icon;
window.OliveMark = OliveMark;
window.ImageSlot = ImageSlot;
