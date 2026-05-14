import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ONGs } from './pages/ONGs';
import { History } from './pages/History';
import { Archive } from './pages/Archive';
import type { PageId } from './lib/types';

export function App() {
  const [page, setPage] = useState<PageId>(() => {
    const saved = localStorage.getItem('cdr-page') as PageId | null;
    const valid: PageId[] = ['home', 'ongs', 'history', 'archive'];
    return (saved && valid.includes(saved)) ? saved : 'home';
  });

  const [theme, setTheme] = useState<string>(() => {
    const saved = localStorage.getItem('cdr-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
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

  const PageComp = {
    home:    <Home setPage={setPage} />,
    ongs:    <ONGs />,
    history: <History />,
    archive: <Archive />,
  }[page];

  return (
    <>
      <Nav page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      <main data-screen-label={`Page ${page}`}>{PageComp}</main>
      <Footer setPage={setPage} />
    </>
  );
}
