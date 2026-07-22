import type { Book, KindFilter, Project } from '../lib/types';

export const ALL_KINDS: Project['kind'][] = ['ensayo', 'cartografia', 'video', 'podcast', 'fanzine', 'mural', 'collage', 'grabado'];

export const KIND_LABEL: Record<string, string> = {
  ensayo: 'Ensayo',
  cartografia: 'Cartografía',
  video: 'Video',
  podcast: 'Podcast',
  fanzine: 'Fanzine',
  mural: 'Mural',
  collage: 'Collage',
  grabado: 'Grabado',
};

export function buildKindFilters(projects: Project[]): KindFilter[] {
  return [
    { id: 'all', label: 'Todo', n: projects.length },
    ...ALL_KINDS.map((k): KindFilter => ({
      id: k,
      label: KIND_LABEL[k],
      n: projects.filter(p => p.kind === k).length,
    })),
  ];
}

export const KIND_GLYPH: Record<string, string> = {
  ensayo: 'Ensayo · 06—24 pp',
  cartografia: 'Cartografía · mapa interactivo',
  video: 'Video · HD · 12—28 min',
  podcast: 'Podcast · 4 capítulos',
  fanzine: 'Fanzine · fotografía y datos',
  mural: 'Mural · acrílico sobre lienzo',
  grabado: 'Grabado · linóleo',
  collage: 'Collage · composición visual',
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
