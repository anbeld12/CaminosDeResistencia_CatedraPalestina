import type { PodcastSeries } from '../lib/types';

export const PODCAST_SERIES: PodcastSeries = {
  title: 'Palestina: Voces desde la Universidad. Historia, ocupación y resistencias',
  author: 'Grupo 13',
  episodes: [
    {
      n: 1,
      title: 'Introducción histórica al conflicto palestino-israelí',
      url: 'https://www.youtube.com/watch?v=Rl18T5aIyLE',
      description:
        'Origen del conflicto, el mandato británico, la Nakba y la consolidación del Estado de Israel.',
      sources: [
        { author: 'Rashid Khalidi', work: 'The Hundred Years\' War on Palestine', url: 'https://www.kalamullah.com/Books/The_Hundred_Years_War_on_Palestine_-_Rashid_Khalidi.pdf' },
        { author: 'Ilan Pappé', work: 'La limpieza étnica de Palestina', url: 'https://www.observatori.org/paises/pais_53/documentos/E_PAPPE.pdf' },
        { author: 'BBC Mundo', work: 'Cobertura del conflicto palestino-israelí', url: 'https://www.bbc.com/mundo/articles/c9xrlyjyy2yo' },
      ],
    },
    {
      n: 2,
      title: 'Vida cotidiana bajo ocupación',
      url: 'https://www.youtube.com/watch?v=IB5vIW02ekQ',
      description:
        'Desplazamientos forzados, bloqueos, apartheid urbano y vulneración de derechos.',
      sources: [
        { author: 'B\'Tselem', work: 'Centro de información israelí para derechos humanos en los territorios ocupados', url: 'https://www.btselem.org' },
        { author: 'Amnistía Internacional', work: 'El apartheid israelí contra la población palestina (2022)' },
        { author: 'Human Rights Watch', work: 'A Threshold Crossed (2021)' },
        { author: 'UN OCHA', work: 'Reportes sobre Gaza y Cisjordania' },
        { author: 'BADIL', work: 'Resource Center for Palestinian Residency and Refugee Rights', url: 'https://www.badil.org' },
      ],
    },
    {
      n: 3,
      title: 'Resistencias culturales',
      url: 'https://www.youtube.com/watch?v=a-hMD48e4v0',
      description:
        'Arte, memoria, música, literatura y activismo como forma de lucha.',
      sources: [
        { author: 'Enzo Traverso', work: 'Gaza ante la historia (2024)', url: 'https://www.akal.com' },
        { author: 'Ricardo Sánchez Ángel', work: 'Manifiesto por la vida humana y la del planeta Tierra (2024)' },
        { author: 'Edward Said', work: 'The Question of Palestine (1992)' },
      ],
    },
    {
      n: 4,
      title: 'Voces desde América Latina',
      url: 'https://www.youtube.com/watch?v=pdMtQT9jor0',
      description:
        'Solidaridad internacional, diáspora y el rol de las universidades como espacios de resistencia.',
      sources: [
        { author: 'Human Rights Watch', work: 'A Threshold Crossed (2021)' },
        { author: 'Mazin B. Qumsiyeh', work: 'Popular Resistance in Palestine: A History of Hope and Empowerment (2011)', url: 'https://www.plutobooks.com' },
      ],
    },
  ],
};
