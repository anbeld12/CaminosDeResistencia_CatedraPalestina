interface FanzinePage {
  src: string;
  alt?: string;
}

interface FanzineData {
  pages: FanzinePage[];
  label: string;
  credit: string;
}

export const FANZINE_G12: FanzineData = {
  pages: [
    { src: '/images/genero/fanzine-g12-01.webp', alt: 'Fanzine: Mujeres en Palestina — página 1' },
    { src: '/images/genero/fanzine-g12-02.webp', alt: 'Fanzine: Mujeres en Palestina — página 2' },
  ],
  label: 'Fanzine: Mujeres en Palestina · Grupo 12 · 2025-I',
  credit: 'Fanzine elaborado por el Grupo 12 (2025-I) en el marco del módulo final de la Cátedra Caminos de Resistencia. Reproducción digital con fines estrictamente pedagógicos y de memoria (Uso Justo).',
};
