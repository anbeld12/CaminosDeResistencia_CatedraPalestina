export const Icon = {
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Grid: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  Rows: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16"/>
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
  External: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M7 17L17 7M9 7h8v8"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
};

export function OliveMark({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 29 C14 24, 18 20, 15 15 C12 10, 17 6, 16 3" strokeWidth="1.4"/>
      <ellipse cx="12.5" cy="22" rx="3.2" ry="1.1" transform="rotate(-42 12.5 22)" strokeWidth="1.1"/>
      <ellipse cx="19.5" cy="20.5" rx="3.2" ry="1.1" transform="rotate(38 19.5 20.5)" strokeWidth="1.1"/>
      <ellipse cx="11" cy="17" rx="3.0" ry="1.0" transform="rotate(-50 11 17)" strokeWidth="1.1"/>
      <ellipse cx="20" cy="15.5" rx="3.0" ry="1.0" transform="rotate(44 20 15.5)" strokeWidth="1.1"/>
      <ellipse cx="12" cy="11.5" rx="2.8" ry="1.0" transform="rotate(-55 12 11.5)" strokeWidth="1.1"/>
      <ellipse cx="19" cy="10" rx="2.8" ry="1.0" transform="rotate(48 19 10)" strokeWidth="1.1"/>
      <ellipse cx="14" cy="6.5" rx="2.4" ry="0.9" transform="rotate(-40 14 6.5)" strokeWidth="1.0"/>
      <circle cx="13.5" cy="19.5" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="19" cy="13" r="1.1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
