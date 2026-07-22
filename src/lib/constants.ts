export const VALID_KINDS = [
  'ensayo', 'cartografia', 'video', 'podcast',
  'fanzine', 'mural', 'collage', 'grabado',
] as const;

export type ValidKind = typeof VALID_KINDS[number];
