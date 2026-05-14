export interface Page {
  id: PageId;
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

export type Theme = 'light' | 'dark';

export type ImageVariant = 'olive' | 'terra' | 'carbon';

export interface Project {
  id: number;
  kind: ProjectKind;
  title: string;
  author: string;
  year: string;
  n: string;
  tags: string[];
}

export type ProjectKind = 'ensayo' | 'cartografia' | 'video' | 'podcast';

export interface Book {
  author: string;
  work: string;
  year: string;
  origin: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
  tags: string[];
  major: boolean;
}

export interface GlossaryEntry {
  term: string;
  author: string;
  def: string;
}

export interface OngCard {
  tag: string;
  title: string;
  body: string;
  stats: { v: string; k: string }[];
  blockade: boolean;
  img: ImageVariant;
  label: string;
  size: 's6' | 's12';
}

export interface OngPartner {
  name: string;
  city: string;
  since: string;
  focus: string;
}

export interface FieldStep {
  n: string;
  t: string;
  d: string;
}

export interface KindFilter {
  id: 'all' | ProjectKind;
  label: string;
  n: number;
}
