import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ONGs } from './pages/ONGs';
import { History } from './pages/History';
import { Archive } from './pages/Archive';
import type { PageId, Theme } from './lib/types';

const VALID_PAGES: PageId[] = ['home', 'ongs', 'history', 'archive'];

export function App() {
  const [page, setPage] = useState<PageId>(() => {
    const saved = localStorage.getItem('cdr-page') as PageId | null;
    return (saved && VALID_PAGES.includes(saved)) ? saved : 'home';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('cdr-theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('cdr-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.add('grain');
  }, []);

  useEffect(() => {
    localStorage.setItem('cdr-page', page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [page]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const PageComp: Record<PageId, React.ReactNode> = {
    home:    <Home setPage={setPage} />,
    ongs:    <ONGs />,
    history: <History />,
    archive: <Archive />,
  };

  return (
    <>
      <Nav page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      <main data-screen-label={`Page ${page}`}>{PageComp[page]}</main>
      <Footer setPage={setPage} />
    </>
  );
}
