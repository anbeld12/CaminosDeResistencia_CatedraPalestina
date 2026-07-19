import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ONGs } from './pages/ONGs';
import { History } from './pages/History';
import { Archive } from './pages/Archive';
import { Voces } from './pages/Voces';
import { Genero } from './pages/Genero';
import { NotFound } from './pages/NotFound';
import type { Theme } from './lib/types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

interface AppLayoutProps {
  theme: Theme;
  toggleTheme: () => void;
}

function AppLayout({ theme, toggleTheme }: AppLayoutProps) {
  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}

export function App() {
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

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout theme={theme} toggleTheme={toggleTheme} />}>
            <Route index element={<Home />} />
            <Route path="historia" element={<History />} />
            <Route path="ongs" element={<ONGs />} />
            <Route path="genero" element={<Genero />} />
            <Route path="voces" element={<Voces />} />
            <Route path="archivo" element={<Archive />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
