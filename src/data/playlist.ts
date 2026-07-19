export type TrackSource = 'youtube' | 'spotify' | 'drive';

export interface PlaylistTrack {
  id: number;
  title: string;
  author: string;
  source: TrackSource;
  embedUrl: string;
  externalUrl?: string;
}

export const POETRY_PLAYLIST: PlaylistTrack[] = [
  {
    id: 1,
    title: 'Rita (Rita y el fusil)',
    author: 'Mahmoud Darwish / Marcel Khalifé / Canción',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/UEeU-tx0SBU',
  },
  {
    id: 2,
    title: 'Ep. 1: Introducción histórica',
    author: 'Grupo 13 — Palestina: Voces desde la Universidad',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/Rl18T5aIyLE',
  },
  {
    id: 3,
    title: 'Ep. 2: Vida cotidiana bajo ocupación',
    author: 'Grupo 13 — Palestina: Voces desde la Universidad',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/IB5vIW02ekQ',
  },
  {
    id: 4,
    title: 'Ep. 3: Resistencias culturales',
    author: 'Grupo 13 — Palestina: Voces desde la Universidad',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/a-hMD48e4v0',
  },
  {
    id: 5,
    title: 'Ep. 4: Voces desde América Latina',
    author: 'Grupo 13 — Palestina: Voces desde la Universidad',
    source: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/pdMtQT9jor0',
  },
  {
    id: 6,
    title: 'Voces de Palestina: La historia que Resiste',
    author: 'Grupo 18 — Serie Spotify',
    source: 'spotify',
    embedUrl: 'https://open.spotify.com/embed/show/0EQh2wLAmHgrDAkIJ6eh04',
    externalUrl: 'https://open.spotify.com/show/0EQh2wLAmHgrDAkIJ6eh04',
  },
  {
    id: 7,
    title: 'Palestina: La belleza entre el horror, la muerte y el genocidio',
    author: 'Grupo 7 — Spotify',
    source: 'spotify',
    embedUrl: 'https://open.spotify.com/embed/episode/4Eac0NXU35xFdWetO2Ujkc',
    externalUrl: 'https://open.spotify.com/episode/4Eac0NXU35xFdWetO2Ujkc',
  },
  {
    id: 8,
    title: 'Voces que resisten: entrevista sobre DDHH en Palestina',
    author: 'Grupo 25 — Google Drive',
    source: 'drive',
    embedUrl: 'https://drive.google.com/file/d/11Wf6BMyZcz6syffsQrfeILMSCpJWaHN5/preview',
    externalUrl: 'https://drive.google.com/file/d/11Wf6BMyZcz6syffsQrfeILMSCpJWaHN5/view',
  },
];
