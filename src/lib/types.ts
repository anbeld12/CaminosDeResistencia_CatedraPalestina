export interface Page {
  id: string;
  label: string;
  sub: string;
}

export type PageId = 'home' | 'ongs' | 'history' | 'archive';

export const PAGES: Page[] = [
  { id: 'home',    label: 'Inicio',   sub: 'El Surco de la Memoria' },
  { id: 'ongs',    label: 'ONGs',     sub: 'Savia y Sumud' },
  { id: 'history', label: 'Historia', sub: 'Raíces Milenarias' },
  { id: 'archive', label: 'Archivo',  sub: 'Cosecha de Saberes' },
];
