import type { Book, KindFilter, Project } from '../lib/types';

export const PROJECTS: Project[] = [
  { id: 1, kind: 'ensayo',      title: 'Sentipensar el cerco: pedagogía afectiva en el aula',     author: 'María C. Quintero · Pedagogía', year: '2025-II', n: '01', tags: ['pedagogía', 'afecto'] },
  { id: 2, kind: 'cartografia', title: 'Atlas de los olivos arrancados',                          author: 'Daniel Páez · Geografía',       year: '2025-II', n: '02', tags: ['mapa', 'datos'] },
  { id: 3, kind: 'video',       title: 'Diario en Beit Sahour · 14 días con la familia Salah',    author: 'Laura Beltrán · Cine y TV',     year: '2025-I',  n: '03', tags: ['video', 'diario'] },
  { id: 4, kind: 'podcast',     title: 'Sumud · 4 capítulos sobre la firmeza',                    author: 'Andrés Rivera · Filosofía',     year: '2025-I',  n: '04', tags: ['audio', 'serie'] },
  { id: 5, kind: 'ensayo',      title: 'Traverso en Bogotá: Gaza antes de la historia',           author: 'Sara Torres · Historia',        year: '2024-II', n: '05', tags: ['historia', 'lectura'] },
  { id: 6, kind: 'cartografia', title: 'Aguas que faltan — flujo del acuífero de la montaña',     author: 'Colectivo Hidra · Ing. Civil',  year: '2024-II', n: '06', tags: ['agua', 'mapa'] },
  { id: 7, kind: 'video',       title: 'Conversación: Sánchez Ángel + estudiantes',               author: 'Mesa de redacción · Cátedra',   year: '2024-I',  n: '07', tags: ['video', 'mesa'] },
  { id: 8, kind: 'podcast',     title: 'Nakba — testimonios en tres generaciones',                author: 'Radio UNAL + Cátedra',          year: '2024-I',  n: '08', tags: ['audio', 'memoria'] },
  { id: 9, kind: 'ensayo',      title: 'Solidaridades del sur: AL — Palestina, 1955—2025',        author: 'Felipe Mora · Ciencia Política', year: '2025-II', n: '09', tags: ['historia', 'diplomacia'] },
];

export const KIND_FILTERS: KindFilter[] = [
  { id: 'all',          label: 'Todo',        n: PROJECTS.length },
  { id: 'ensayo',       label: 'Ensayo',      n: PROJECTS.filter(p => p.kind === 'ensayo').length },
  { id: 'cartografia',  label: 'Cartografía', n: PROJECTS.filter(p => p.kind === 'cartografia').length },
  { id: 'video',        label: 'Video',       n: PROJECTS.filter(p => p.kind === 'video').length },
  { id: 'podcast',      label: 'Podcast',     n: PROJECTS.filter(p => p.kind === 'podcast').length },
];

export const KIND_GLYPH: Record<string, string> = {
  ensayo: 'Ensayo · 06—24 pp',
  cartografia: 'Cartografía · mapa interactivo',
  video: 'Video · HD · 12—28 min',
  podcast: 'Podcast · 4 capítulos',
};

export const BIBLIOGRAPHY: Book[] = [
  { author: 'Ricardo Sánchez Ángel',  work: 'Palestina: la herida abierta · ensayos reunidos',        year: '2024', origin: 'Bogotá · UNAL' },
  { author: 'Nur Masalha',            work: 'La Nakba palestina · política y memoria del transfer',   year: '2018', origin: 'Londres · Pluto' },
  { author: 'Norman Finkelstein',     work: 'La industria del Holocausto · capítulos seleccionados',  year: '2000', origin: 'Verso · trad. Akal' },
  { author: 'Enzo Traverso',          work: 'Gaza ante la historia',                                  year: '2024', origin: 'Akal · Madrid' },
  { author: 'Shlomo Sand',            work: 'La invención del pueblo judío',                          year: '2008', origin: 'Akal · Madrid' },
  { author: 'Edward W. Said',         work: 'La cuestión palestina · edición ampliada',               year: '1979', origin: 'Random · trad. Debate' },
  { author: 'Rashid Khalidi',         work: 'La guerra de los cien años contra Palestina',            year: '2020', origin: 'Crítica' },
  { author: 'Ilan Pappé',             work: 'La limpieza étnica de Palestina',                        year: '2006', origin: 'Crítica · Madrid' },
];
