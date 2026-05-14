import type { FieldStep, OngCard, OngPartner } from '../lib/types';

export const ONG_CARDS: OngCard[] = [
  {
    tag: '/ Agua · Energía',
    title: 'El bloqueo como tecnología',
    body: 'Israel controla el 80% de los acuíferos de la Cisjordania. El combustible es la palanca económica del cerco: cuando falta diésel se apagan incubadoras, plantas desalinizadoras y bombas de aguas residuales — y la geografía cotidiana se contrae.',
    stats: [{ v: '80%', k: 'acuíferos controlados' }, { v: '·3 h', k: 'Electricidad / día (Gaza)' }],
    blockade: true,
    img: 'olive',
    label: 'Tanques azules en azoteas · cisterna improvisada',
    size: 's6',
  },
  {
    tag: '/ Salud mental',
    title: 'Curar entre ruinas',
    body: 'Hospitales destruidos donde médicas y residentes siguen atendiendo: el oficio sostenido como forma de resistencia. La OMS contabiliza más de 36 instalaciones sanitarias inutilizadas — pero el turno continúa.',
    stats: [{ v: '36+', k: 'hospitales afectados' }, { v: '1 / 5', k: 'psiquiatras / 100k hab.' }],
    blockade: false,
    img: 'terra',
    label: 'Manos suturando bajo luz de lámpara de bolsillo',
    size: 's6',
  },
  {
    tag: '/ Sumud',
    title: 'Firmeza — cultivar lo que arrancan',
    body: 'Sumud es la palabra árabe para la firmeza testaruda: replantar el olivo arrancado, dormir en la casa demolida, mandar a la niña a la escuela bajo el dron. No es metáfora — es agronomía, urbanismo y pedagogía a la vez.',
    stats: [{ v: '·800K', k: 'olivos arrancados desde 1967' }, { v: '+150', k: 'asentamientos en curso' }],
    blockade: true,
    img: 'olive',
    label: 'Olivo recién plantado entre escombros · tierra removida',
    size: 's12',
  },
];

export const ONG_PARTNERS: OngPartner[] = [
  { name: 'Medical Aid for Palestinians', city: 'Londres', since: '1984', focus: 'Salud comunitaria' },
  { name: 'Al-Haq', city: 'Ramallah', since: '1979', focus: 'Derecho internacional' },
  { name: "B'Tselem", city: 'Jerusalén', since: '1989', focus: 'Documentación' },
  { name: 'PCRF', city: 'Kuwait — Global', since: '1991', focus: 'Niñez y reconstrucción' },
  { name: 'Visualizing Palestine', city: 'Beirut', since: '2012', focus: 'Cartografía de datos' },
  { name: 'Cátedra Edward Said — UNAL', city: 'Bogotá', since: '2024', focus: 'Articulación académica' },
];

export const FIELD_STEPS: FieldStep[] = [
  { n: '01', t: 'Solicitud', d: 'Carta de motivación + carné UNAL vigente. Cierre: 30 de agosto.' },
  { n: '02', t: 'Formación', d: 'Tres sesiones obligatorias: contexto, primeros auxilios, derecho humanitario.' },
  { n: '03', t: 'Viaje', d: 'Acompañamiento entre el 6 y el 20 de octubre. Estancia en Beit Sahour.' },
];
