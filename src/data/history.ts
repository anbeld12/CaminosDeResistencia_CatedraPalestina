import type { GlossaryEntry, TimelineEntry } from '../lib/types';

export const TIMELINE: TimelineEntry[] = [
  { year: '1917', title: 'Declaración Balfour', body: 'El Reino Unido promete, en una carta de 67 palabras, un "hogar nacional para el pueblo judío" en un territorio que no le pertenecía y donde el 90% de la población era árabe.', tags: ['Imperio', 'Carta'], major: false },
  { year: '1947', title: 'Plan de Partición · ONU', body: 'La Resolución 181 reparte la Palestina histórica: 55% para el 33% de la población. La Liga Árabe la rechaza. La cuenta regresiva comienza.', tags: ['ONU', 'Reparto'], major: false },
  { year: '1948', title: 'La Nakba — "la catástrofe"', body: 'Más de 750.000 palestinas y palestinos expulsados; 530 aldeas destruidas. El 90% de la población árabe es desplazada del territorio que se convierte en Israel.', tags: ['Nakba', 'Despojo'], major: true },
  { year: '1967', title: 'Guerra de los Seis Días', body: 'Israel ocupa Cisjordania, Gaza, Jerusalén Este, los Altos del Golán y el Sinaí. Comienza la ocupación militar — que sigue, hoy, como el "temporal" más largo de la historia contemporánea.', tags: ['Ocupación', '1967'], major: true },
  { year: '1987', title: 'Primera Intifada', body: 'Levantamiento popular masivo. Niños con piedras, huelgas generales, comités de barrio. Una generación entera pasa a llamarse — sin metáfora — "la generación de las piedras".', tags: ['Intifada'], major: false },
  { year: '1993', title: 'Acuerdos de Oslo', body: 'Reconocimiento mutuo y promesa de Estado palestino en cinco años. Treinta y tres años después, el mapa de los asentamientos hace inviable la geografía prometida.', tags: ['Oslo', 'Promesa rota'], major: false },
  { year: '2007', title: 'Bloqueo de Gaza', body: 'Tras la victoria electoral de Hamás, Israel impone un cierre que dura — al momento de esta cátedra — diecinueve años. Gaza queda definida desde entonces como "espacio sin salida".', tags: ['Bloqueo'], major: false },
  { year: '2024', title: 'Opinión de la CIJ', body: 'La Corte Internacional de Justicia declara ilegal la ocupación israelí del territorio palestino y exige su fin "lo antes posible". Por primera vez, la ilegalidad queda nombrada en latín jurídico.', tags: ['CIJ', 'Derecho'], major: true },
  { year: '2026', title: 'Cátedra Caminos de Resistencia', body: 'La UNAL abre la primera cátedra colombiana dedicada íntegramente al caso palestino — leído desde el sur global y la pedagogía sentipensante.', tags: ['UNAL', 'Aula'], major: false },
];

export const GLOSSARY: GlossaryEntry[] = [
  { term: 'Transfer', author: 'Nur Masalha', def: 'Concepto que designa la transferencia poblacional planeada — no como excepción sino como dispositivo estructural del sionismo político desde sus orígenes. La palabra cortés para un acto que se llama, con menos elegancia, expulsión.' },
  { term: 'Invención de la tierra', author: 'Shlomo Sand', def: 'Argumento histórico que muestra cómo el "pueblo-tierra" es una construcción del siglo XIX y no una continuidad bíblica. Sand desmonta la narrativa que justifica el despojo apelando a un derecho inmemorial.' },
  { term: 'Gaza antes de la historia', author: 'Enzo Traverso', def: 'Operación discursiva que sitúa el inicio del conflicto en el 7 de octubre de 2023, borrando el siglo previo. Traverso llama la atención sobre la amnesia como técnica para volver legítima la violencia presente.' },
];
