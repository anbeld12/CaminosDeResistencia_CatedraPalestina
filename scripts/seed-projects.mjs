import 'dotenv/config';
import { readFileSync, existsSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const THUMBS_DIR = join(ROOT, 'public', 'images', 'archive', '2025-I', 'thumbs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const PROJECTS = [
  {
    id: 1, kind: 'video', year: '2025-I', n: '01',
    title: 'Cementerio de Memorias: stencil y minidocumental sobre víctimas del genocidio en Palestina',
    author: 'Grupo 1', group: 'Grupo 1',
    tags: ['video', 'stencil', 'memoria', 'arte urbano'],
    url: 'https://youtu.be/P784X8x5Hls',
    thumbnail: '01_Video_Grupo01_CementerioMemorias.webp',
    aiThumbnail: true,
    description: 'Intervención artística con stencil sobre muros de la ciudad, seguida de un minidocumental que registra el proceso. Retrataron los rostros de víctimas del genocidio —Osama Mughri, Hind Rajab, Fatima Hassouna— como acto de memoria y resistencia desde el arte urbano. El proyecto busca hacer de la memoria y el duelo un ejercicio amplio en relación con la comunidad que habita las calles.',
    members: ['Jesús David Fuentes Agudelo', 'Santiago Osorio Otálora', 'Lía Valentina Pérez', 'Sergio Soto Zambrano', 'Ana Maria Cardona', 'Julián Esteban Castro Cifuentes', 'Juan Diego Villamizar Toloza', 'Juan Pablo Quintero Rodríguez'],
  },
  {
    id: 2, kind: 'video', year: '2025-I', n: '02',
    title: 'Identidad Palestina: serie de videos cortos',
    author: 'Grupo 2', group: 'Grupo 2',
    tags: ['video', 'identidad', 'cultura', 'cortos'],
    url: 'https://youtu.be/OOsXrHn6Ykc',
    thumbnail: '02_Video_Grupo02_IdentidadPalestina.webp',
    aiThumbnail: true,
    description: 'Serie de videos cortos que muestran elementos de la identidad palestina más allá de la ocupación: paisajes naturales, cultura, educación, sociedad y contexto actual de Palestina.',
    members: ['Ana Maria Gomez Obando', 'Johan Andrés Gutiérrez Moreno', 'Juan Camilo Gutierrez Zamora', 'Andrés Giovanni Morales Rincón', 'Jesús Andrés Inguilán Paguay', 'Dana Katherine Cuero Leon', 'Juan David Grueso Valencia', 'Adriel Mateo Solano Flores', 'Daniel David Carrillo Lozano', 'Kamila Torres Martínez'],
  },
  {
    id: 3, kind: 'cartografia', year: '2025-I', n: '03',
    title: 'Línea de Tiempo: Territorio Palestino',
    author: 'Grupo 3', group: 'Grupo 3',
    tags: ['cartografía', 'línea de tiempo', 'historia'],
    url: 'https://drive.google.com/file/d/1Q4JZL4mFoqYRh73ZrQvs8tBhMseUtU5o/view',
    thumbnail: '03_Cartografia_Grupo03_LineaTiempo.webp',
    aiThumbnail: true,
    description: 'Línea de tiempo física de 3 pliegos que recorre la historia del territorio palestino desde las civilizaciones cananeas (3500 a.C.) hasta la época contemporánea. Incluye un código QR con versión interactiva en línea.',
    members: ['Ana Milena Duque Mora', 'Sebastian Camilo Vargas Niño', 'Angie Leonela Vinchira Garzón', 'Yenifer Alexandra Guzman Calderon', 'Daniel José Rosas Alfonso', 'Laura Sofía Rodríguez Morales', 'Maria Camila Guerrero Morelo', 'Karen Sabrina Hernández Ortiz', 'Andres David Perez Yela'],
  },
  {
    id: 4, kind: 'mural', year: '2025-I', n: '04',
    title: 'Mural de salud "Invisibilizados en Palestina"',
    author: 'Grupo 4', group: 'Grupo 4',
    tags: ['mural', 'salud', 'genocidio', 'memoria'],
    url: 'https://drive.google.com/file/d/1oB9g3dLrFWtn0OO-BMiXkP-TwsiU2j_k/view',
    thumbnail: '04_Mural_Grupo04_Invisibilizados.webp',
    description: 'Mural conmemorativo que rinde homenaje al personal de salud en territorio palestino. Retrata a una enfermera musulmana que intenta curar una bandera de Palestina mientras caen misiles, visibilizando los más de 1000 trabajadores sanitarios asesinados desde octubre de 2023.',
    members: ['Lady Vanessa Solano Sanchez', 'Paula Sofía Rodríguez Pulido', 'Laura Daniela Campos Martínez', 'Juan Sebastian Tobaria Hernández', 'Diego Francisco Segura Bernal', 'Ximena Tatiana Bernal Ruiz', 'María Fernanda Fernández Rodríguez', 'Karen Julieth Cortés Arcón', 'William Armando Hurtado'],
  },
  {
    id: 5, kind: 'mural', year: '2025-I', n: '05',
    title: 'Caminos de Resistencia: Intervención artística en tela',
    author: 'Grupo 5', group: 'Grupo 5',
    tags: ['mural', 'pintura', 'lienzo', 'cultura'],
    url: 'https://drive.google.com/file/d/1VdHhaRksQ1uq5KHnwWpqMsfmbmhK5NZA/view',
    thumbnail: '05_Mural_Grupo05_CaminosResistencia.webp',
    description: 'Intervención artística en tela que funciona como mural transportable. Representa la mujer palestina como símbolo de resistencia, el olivo y la gacela de montaña palestina, entre otras representaciones simbólicas de la cultura palestina.',
    members: ['Christian Andrés Vargas Pérez', 'Cristian Camilo Vargas Chisco', 'Isabella Triviño Carrascal', 'Andrea Valentina Marín Hernandez', 'Andrés Felipe Venegas Pirachican', 'Samuel Ibarra Agudelo', 'Danna Carolina García Ortega', 'Brayan Stiven Sánchez Cruz'],
  },
  {
    id: 6, kind: 'collage', year: '2025-I', n: '06',
    title: 'Dos Narrativas, Un Conflicto: Collages Cronológicos de Palestina e Israel',
    author: 'Grupo 6', group: 'Grupo 6',
    tags: ['collage', 'narrativa', 'cronología'],
    thumbnail: '06_Collage_Grupo06_DosNarrativas.webp',
    links: [{ label: 'Collage · Narrativa palestina', url: 'https://drive.google.com/file/d/1lyZE2avNXbY07icJR1LrLd5q-C1a6ZwV/view' }, { label: 'Collage · Narrativa israelí', url: 'https://drive.google.com/file/d/1ecKP1WQMF7oUdgkspEYn1OCjukAaoXY-/view' }],
    linkLabel: 'Ver collages',
    description: 'Proyecto visual compuesto por dos collages cronológicos que representan, desde perspectivas distintas, la historia del conflicto entre Palestina e Israel.',
    members: ['Eduard Humberto García Castillo', 'Jhon Alejandro Cuaspud Porras', 'Cristian David Garcia Gonzalez', 'Camilo Andrés Bello Cuadros', 'Johan Philippe Hernandez Sabi', 'Verónica Alejandra Rodriguez Guzmán', 'Daniel Felipe Rodriguez Garzon', 'Juan Sebastian Álvarez Patiño'],
  },
  {
    id: 7, kind: 'podcast', year: '2025-I', n: '07',
    title: 'Palestina: La belleza entre el horror, la muerte y el genocidio',
    author: 'Grupo 7', group: 'Grupo 7',
    tags: ['podcast', 'cultura', 'historia', '7 de octubre'],
    url: 'https://open.spotify.com/episode/4Eac0NXU35xFdWetO2Ujkc',
    thumbnail: '07_Podcast_Grupo07_BellezaHorror.webp',
    aiThumbnail: true,
    description: 'Podcast que resalta la historia y cultura palestina, informando sobre el conflicto mediante un relato dinámico con personajes que viven su día a día en Palestina en medio del conflicto.',
    members: ['Juan Tomas Moreno Cruz', 'Santiago Villota Alava', 'Kevin Mauricio Celis Ruiz', 'Loren Sofia Martinez Anzola', 'Daniel Xuan Rankin Roa', 'Byron Daniel Giraldo Castro', 'Esteban Castro Gutierrez', 'Alyson Natalia Vásquez Solano', 'José Luis Hurtado Tapia', 'Daniel Humberto Cortes Bautista'],
  },
  {
    id: 8, kind: 'podcast', year: '2025-I', n: '08',
    title: 'Voces entre muros: cultura y crisis sanitaria en Palestina',
    author: 'Grupo 8', group: 'Grupo 8',
    tags: ['podcast', 'cultura', 'salud', 'crisis sanitaria', 'sanación'],
    thumbnail: '08_Podcast_Grupo08_VocesEntreMuros.webp',
    aiThumbnail: true,
    description: 'Podcast narrativo de dos episodios que ofrece un panorama de la realidad Palestina. El primer episodio muestra cómo vivir, cocinar, bordar, bailar dabke o contar historias es una forma de defender la identidad. El segundo episodio expone cómo el sistema de salud palestino ha sido atacado sistemáticamente.',
    members: ['Maria Paula Bernal Martínez', 'Cristian Camilo Chico Florez', 'Julieth Valentina Castillo Deantonio', 'Daniela Alejandra Paipa Bocanegra', 'Daniel Esteban Giraldo', 'Michelle Pasaje Bravo', 'Lourdes Maria Saavedra Santamaría', 'Edwin Alexander Londoño Zapata'],
  },
  {
    id: 9, kind: 'collage', year: '2025-I', n: '09',
    title: 'Fragmentos de un Territorio: maqueta en relieve',
    author: 'Grupo 9', group: 'Grupo 9',
    tags: ['collage', 'maqueta', 'territorio', 'mosaico'],
    url: 'https://drive.google.com/file/d/1N6LvoWctyL6Ruh4znGiiJCbEuOjEXYO4/view',
    thumbnail: '09_Collage_Grupo09_FragmentosTerritorio.webp',
    description: 'Maqueta enmarcada en relieve del mapa físico del territorio palestino, combinando la técnica de mosaico fotográfico para dibujar la bandera de Palestina con fotografías que representan la ocupación y sus repercusiones.',
    members: ['Jiseth Valentina Huérfano Vanegas', 'Paula Alejandra Jiménez Rosas', 'Aeisley Jireth Mora Velandia', 'Diana Carolina Alarcón Tellez', 'Juan David Beltrán Segura', 'Tomas Arciniegas Quintero', 'María Camila Pallares Amezquita', 'Steven Leonardo Bautista Sarmiento'],
  },
  {
    id: 10, kind: 'collage', year: '2025-I', n: '10',
    title: 'Mujer Palestina: Resistencia entre el Conflicto y Esperanza',
    author: 'Grupo 10', group: 'Grupo 10',
    tags: ['collage', 'mujer', 'poesía', 'resistencia'],
    url: 'https://drive.google.com/file/d/1-s6OP6MYdS-gzDuhiDExkf3UFImx3Tl1/view',
    thumbnail: '10_Collage_Grupo10_MujerPalestina.webp',
    description: 'Pintura en acrílico sobre lienzo y poema que reflejan el papel de la mujer palestina dentro del conflicto, abordando su lucha desde un enfoque cultural.',
    members: ['Sara Lorena Valbuena Benítez', 'Andrea Juliana Avellaneda Carvajal', 'Alejandro Andres Alvarado Arevalo', 'Leonardo Andrés Romo Muñoz', 'Jeferson Nicolás Mendoza Barreto', 'Julián Camilo Pérez Lemus', 'Juan David Yossa Gaitan', 'Hector Leonardo Moreno Vargas'],
  },
  {
    id: 11, kind: 'collage', year: '2025-I', n: '11',
    title: 'Collage: antes de la invasión, Nakba y situación actual en Palestina',
    author: 'Grupo 11', group: 'Grupo 11',
    tags: ['collage', 'Nakba', 'memoria', 'Cisjordania', 'Gaza'],
    url: 'https://drive.google.com/file/d/13dGW_ahOPsao9eddEy0SF_2dnT25a4so/view',
    thumbnail: '11_Collage_Grupo11_Nakba.webp',
    description: 'Collage compuesto por tres momentos clave: la vida en Palestina antes de la invasión, el éxodo forzado de la Nakba en 1948, y la situación actual en Cisjordania y Gaza.',
    members: ['Julian David Bolaños Sánchez', 'Jahyder Jimmy Bravo Cabrera', 'Ivonne Stehisy Torres Vargas', 'Jenifer Merley Castro Saavedra', 'Andrés Felipe Ochoa González', 'Cristian Camilo Aranzales Ochoa', 'Julián Alexander Gómez Betancourt'],
  },
  {
    id: 12, kind: 'fanzine', year: '2025-I', n: '12',
    title: 'Fanzine: Mujeres en Palestina',
    author: 'Grupo 12', group: 'Grupo 12',
    tags: ['fanzine', 'mujer', 'testimonios', 'memoria', 'salud'],
    url: 'https://drive.google.com/file/d/1EFx9RfdW1QnQtBTd2eTPjXx2wHUPGZ8D/view',
    thumbnail: '12_Fanzine_Grupo12_MujeresPalestina.webp',
    description: 'Pieza informativa/reflexiva en formato fanzine realizada como trabajo final de la asignatura. El objetivo es dar a conocer las problemáticas que atraviesan a las mujeres y niñas palestinas en el contexto del conflicto.',
    members: ['Katherin Andrea Quintero Vaca', 'Diana Fernanda González Ramírez', 'Sara Marina Henao Valencia', 'Mabel Camila Serna Pacheco', 'Anny Stefania Patiño Cadena', 'Laura Daniela Chaves Duarte', 'Laura Camila Cubillos Moreno', 'María Alejandra Guzmán'],
  },
  {
    id: 13, kind: 'podcast', year: '2025-I', n: '13',
    title: 'Palestina: Voces desde la Universidad. Historia, ocupación y resistencias',
    author: 'Grupo 13', group: 'Grupo 13',
    tags: ['podcast', 'historia', 'Nakba', 'cultura', 'América Latina'],
    thumbnail: '13_Podcast_Grupo13_VocesUniversidad.webp',
    aiThumbnail: true,
    linkLabel: 'Episodios',
    links: [
      { label: 'Ep. 1: Introducción histórica', url: 'https://www.youtube.com/watch?v=Rl18T5aIyLE' },
      { label: 'Ep. 2: Vida cotidiana bajo ocupación', url: 'https://www.youtube.com/watch?v=IB5vIW02ekQ' },
      { label: 'Ep. 3: Resistencias culturales', url: 'https://www.youtube.com/watch?v=a-hMD48e4v0' },
      { label: 'Ep. 4: Voces desde América Latina', url: 'https://www.youtube.com/watch?v=pdMtQT9jor0' },
    ],
    description: 'Serie de cuatro episodios que aborda: los orígenes del conflicto y la Nakba; la vida cotidiana bajo ocupación; las resistencias culturales; y las voces de solidaridad desde América Latina.',
    members: ['Andres Fernando Rojas Pedroza', 'Laura Catalina Martinez Alvarez', 'Luna Pulido Robayo', 'Geyli Tatiana Bautista Martinez', 'Laura Valentina Cantoñi Niño', 'Jesus Adrian Castillo Rincon', 'Luis Santiago Mancera Ramírez', 'Julian Felipe Guzman Sanabria'],
  },
  {
    id: 14, kind: 'collage', year: '2025-I', n: '14',
    title: 'Expresiones sobre el genocidio: galería multimedia en tres formatos',
    author: 'Grupo 14', group: 'Grupo 14',
    tags: ['collage', 'fotografía', 'poesía', 'memoria'],
    url: 'https://drive.google.com/drive/folders/1_S64ktz2pDRMfI3uB0sm02l7Xpne2mtj',
    thumbnail: '14_Collage_Grupo14_ExpresionesGenocidio.webp',
    description: 'Galería multimedia "Voces palestinas en tres formatos" que expone dos dimensiones del genocidio en Palestina —el tiempo y el espacio— a través de tres estaciones: Gaza, Jerusalén del Este y Cisjordania.',
    members: ['Michael Julian Yara Angulo', 'Luis Alfredo Ariza', 'Luisa Gabriela Margarita Villa Gacha', 'Laura Camila Castañeda Bermúdez', 'Sandra Hernández Gil', 'Sergio Andrés Silva Meneses', 'Juan Pablo Avila Kindermann', 'Luisa Villa Navas', 'María Paula Barros'],
  },
  {
    id: 15, kind: 'grabado', year: '2025-I', n: '15',
    title: 'Impresión en Linóleo: herramienta política de memoria',
    author: 'Grupo 15', group: 'Grupo 15',
    tags: ['grabado', 'linóleo', 'arte', 'memoria'],
    url: 'https://drive.google.com/file/d/1LODC6MbvIsu0DIjjJ72Vow7FQQHy6A9c/view',
    thumbnail: '15_Grabado_Grupo15_Linoleo.webp',
    description: 'Linograbado como técnica de impresión para visibilizar el genocidio en Palestina. La gráfica resultante se concibe como herramienta solidaria, pedagógica y política.',
    members: ['Jose Luis Palencia Gonzalez', 'David José Daza Jaimes', 'Jesús Gabriel Galindo Hernandez', 'Nicolas Esteban Mendoza Cardenas', 'María José Lara Melo', 'Dayanna Marin Neira', 'Diana Reyes Garzón', 'Julian Andres Ramirez Arevalo', 'Jefferson Alexander Yepes Rincon'],
  },
  {
    id: 16, kind: 'ensayo', year: '2025-I', n: '16',
    title: 'Activismo Internacional y cubrimiento mediático del conflicto en Palestina',
    author: 'Grupo 16', group: 'Grupo 16',
    tags: ['ensayo', 'activismo', 'medios', 'colonialismo'],
    thumbnail: '16_Ensayo_Grupo16_ActivismoMedios.webp',
    aiThumbnail: true,
    linkLabel: 'Recursos',
    links: [
      { label: 'Leer ensayo', url: 'https://drive.google.com/file/d/1XN0HHVe6fJ5JTxrXWZRlQhZXL6o5EwWX/view' },
      { label: 'Ver proceso de realización', url: 'https://drive.google.com/file/d/1t0iYHo0i4JQG7YA5kYIJ2Tr-oNmo0ecK/view' },
      { label: 'Ver presentación', url: 'https://drive.google.com/file/d/1zfm3BmsV5A3Sp4JXAKBSsRvLvbUEQsyb/view' },
    ],
    description: 'Ensayo que examina el papel del activismo internacional y el cubrimiento mediático en el conflicto palestino.',
    members: ['Alejandro Esteban Rodriguez Marin', 'Wuendy Natalia Rincon Caron', 'Leydi Beltran', 'Paula Caro', 'Laura Mateus', 'Sharick Osorio', 'Duvan Santiago González López', 'Andrés Toro', 'Juan Pablo Corredor'],
  },
  {
    id: 17, kind: 'video', year: '2025-I', n: '17',
    title: 'Grito de Libertad: videoclip musical bambuco-dabke',
    author: 'Grupo 17', group: 'Grupo 17',
    tags: ['video', 'música', 'bambuco', 'dabke'],
    url: 'https://youtu.be/MWArHPJmqeQ',
    thumbnail: '17_Video_Grupo17_GritoLibertad.webp',
    description: 'Videoclip musical del género bambuco colombiano con influencias del dabke palestino. La canción "Grito de Libertad" fue compuesta y producida por el grupo.',
    members: ['Manuela Duque', 'Daniela Sanmiguel', 'Karina Alvarado', 'Nicol Gordillo', 'Juan David Hernández Morcote', 'Melissa Lozada', 'Mabel Fernanda Cuellar Granada', 'Valentina Bernal', 'Laura Sofia Araque'],
  },
  {
    id: 18, kind: 'podcast', year: '2025-I', n: '18',
    title: 'Voces de Palestina: La historia que Resiste',
    author: 'Grupo 18', group: 'Grupo 18',
    tags: ['podcast', 'historia', 'memoria', 'serie'],
    url: 'https://open.spotify.com/show/0EQh2wLAmHgrDAkIJ6eh04',
    thumbnail: '18_Podcast_Grupo18_VocesPalestina.webp',
    aiThumbnail: true,
    description: 'Serie de podcast producida por estudiantes de la cátedra que recorre la historia de Palestina desde la Nakba hasta las resistencias contemporáneas.',
    members: ['Sergio Andrés Buitrago Navarrete', 'Juan David Oviedo Gómez', 'Nicolas Felipe Garzón Soto', 'Juan Diego Abril Mejía', 'Juan Manuel Rojas Luna', 'Jaime Chiquillo Gomez', 'Joshua Herrera Diaz', 'Mónica Dayanna Gomez Palomino', 'Erika Paola Perilla Rincon'],
  },
  {
    id: 19, kind: 'mural', year: '2025-I', n: '19',
    title: 'Pintando la verdad: el silencio es complicidad',
    author: 'Grupo 19', group: 'Grupo 19',
    tags: ['mural', 'memoria', 'solidaridad', 'Tíbet', 'Kurdistán'],
    url: 'https://drive.google.com/file/d/150Tq2MBwDO8-HcHmotmRBqI_Dc_YNNil/view',
    thumbnail: '19_Mural_Grupo19_PintandoVerdad.webp',
    description: 'Mural colectivo pintado en los muros de la Facultad de Derecho de la UNAL. Se divide en tres ejes: el despojo de Palestina, la resistencia palestina, y la solidaridad con otros pueblos oprimidos.',
    members: ['Maria Camila Romero Guevara', 'Sara Belen Saenz Rodriguez', 'Martha Daniela Ortega Burgos', 'Valeria Cristancho Rendón', 'Oscar Fabian Rey Cortés', 'Santiago Steven Soto Rincón', 'Angela Sofia Aponte Guzman'],
  },
  {
    id: 20, kind: 'mural', year: '2025-I', n: '20',
    title: 'El Mural como representación del ejercicio del Cuidado en contextos de guerra',
    author: 'Grupo 20', group: 'Grupo 20',
    tags: ['mural', 'salud', 'cuidado', 'enfermería'],
    url: 'https://drive.google.com/file/d/1ZMcFjgjXYNaGQZaRzVTK0JIU0t8_qWg4/view',
    thumbnail: '20_Mural_Grupo20_CuidadoGuerra.webp',
    description: 'Mural que representa el valor del personal de salud en contextos de guerra. Incluye un croquis del mapa de Palestina con dibujos que simbolizan a sus habitantes y el rol del cuidado incondicional.',
    members: ['Leidy Sofía Barrera Sepúlveda', 'Dayana Alexandra Suarez Araque', 'John Alexis Agudelo Olaya', 'Sarah Daniela Alvarez Toro', 'Ángela Maria Garcia Romero', 'Laura Vanessa Meriño Albor', 'Juan Felipe Castillo Pulido', 'Andrés Leonardo Cifuentes'],
  },
  {
    id: 21, kind: 'video', year: '2025-I', n: '21',
    title: 'Educando Bajo Escombros: podcast sobre el sistema educativo en Palestina',
    author: 'Grupo 21', group: 'Grupo 21',
    tags: ['video', 'educación', 'infancia', 'podcast'],
    url: 'https://youtu.be/wFvnBkhxSSo',
    thumbnail: '21_Video_Grupo21_EducandoEscombros.webp',
    description: 'Podcast que expone cómo la población infantil y la infraestructura educativa palestina han sido devastadas bajo los ataques dentro del conflicto.',
    members: ['Daniel Jacobo Vacca Buenaventura', 'Sharon Michel Lobo Vergara', 'Joan Sebastian Chica Castillo', 'Angelica Maria Duque Torres', 'Santiago Mahecha Suárez', 'Juan David Rincón Lizca', 'Jose Fernando Palacio Espejo', 'Nicol Lorena Mendez Acevedo', 'Camilo Andres Castillo', 'Néstor Orlando Vallejo', 'Juan Daniel Cabrera'],
  },
  {
    id: 22, kind: 'collage', year: '2025-I', n: '22',
    title: 'Entre escombros, la Memoria florece: voces palestinas desde imágenes de su cultura',
    author: 'Grupo 22', group: 'Grupo 22',
    tags: ['collage', 'cultura', 'memoria', 'resistencia', 'identidad'],
    url: 'https://drive.google.com/file/d/12vlYJAIDOlnD5opfwQNe90N34-Mb0CTk/view',
    thumbnail: '22_Collage_Grupo22_EntreEscombros.webp',
    description: 'Collage diseñado a partir de imágenes de las luchas palestinas desde 1948 hasta la actualidad, que condensa desde distintas áreas la capacidad duradera del pueblo palestino de combatir el despojo de su cultura.',
    members: ['Gabriela Alexandra Torres Vacca', 'Maria Paula Guzmán Suárez', 'Danna Valentina Galvis Melo', 'Karol Natalia Cristiano Muñoz', 'Santiago Mora Trujillo', 'Kevin Sebastián Poloche Ramirez', 'Laura Sofía López Clopatofsky', 'Juan Sebastián Guasca Rodríguez', 'Diego Barragán Martínez', 'Samuel Escallon Rodríguez'],
  },
  {
    id: 23, kind: 'video', year: '2025-I', n: '23',
    title: 'Oh Rascal Children of Gaza: animación del poema de Khaled Juma',
    author: 'Grupo 23', group: 'Grupo 23',
    tags: ['video', 'animación', 'poema', 'Gaza'],
    url: 'https://youtu.be/rpHuF7pw2d0',
    thumbnail: '23_Video_Grupo23_RascalChildren.webp',
    description: 'Video de animación digital basado en el poema "Oh Rascal Children of Gaza" de Khaled Juma, sonorizado con guitarra e interpretación en farsi.',
    members: ['José Nicolás Peña Montaño', 'Catalina Andrea Campo Talero', 'Natalia Veloza', 'Martín Casas', 'Fernanda Moreno', 'Karol Tatiana Navarro Rey', 'Laura Mariana de Jesús García Garnica', 'Cristian David García', 'Juan Nicolás Núñez Casallas'],
  },
  {
    id: 24, kind: 'mural', year: '2025-I', n: '24',
    title: 'Palestina: Pancarta sobre la Salud en el Conflicto',
    author: 'Grupo 24', group: 'Grupo 24',
    tags: ['mural', 'salud', 'resistencia', 'lienzo'],
    url: 'https://drive.google.com/file/d/1p2o1caVVhai5mNWgGTwxm7MiKX-7EAQ4/view',
    thumbnail: '24_Mural_Grupo24_PancartaSalud.webp',
    description: 'Pancarta diseñada sobre seda poliéster (1,5 m x 2,5 m) que representa la interacción entre guerra y salud. El mensaje central: sanar también puede ser una forma de resistencia.',
    members: ['Angela Maria Leiva Miranda', 'Laura Sofia Leiva Miranda', 'Sara Patricia Vargas Franco', 'Fernanda Sofia Prada Cortes', 'Diego Alejandro Vargas Ruiz', 'Astrid Carolina Betancourt Quiebraolla', 'Andrés Fernando Mendivelso Gómez'],
  },
  {
    id: 25, kind: 'podcast', year: '2025-I', n: '25',
    title: 'Voces que resisten: entrevista sobre DDHH en Palestina',
    author: 'Grupo 25', group: 'Grupo 25',
    tags: ['podcast', 'DDHH', 'entrevista', 'derechos humanos'],
    url: 'https://youtu.be/X8f02uSHhn8',
    thumbnail: '25_Podcast_Grupo25_VocesResisten.webp',
    description: 'Podcast basado en una entrevista al profesor Alexander Montero, politólogo e investigador, sobre las violaciones a los derechos humanos que se cometen contra el pueblo palestino.',
    members: ['Julian Steven Rodriguez', 'Alejandro Hernández Cuadros', 'Santiago Guillen Fandiño', 'Cristian Arturo Mora Arias', 'Laura Milena Rincon Pedraza', 'Shaina Livingston Escalona', 'Juan Pablo Alonso Peña', 'Miguel Angel Echeverri Espinosa'],
  },
  {
    id: 26, kind: 'podcast', year: '2025-I', n: '26',
    title: 'Voces de Palestina',
    author: 'Grupo 26', group: 'Grupo 26',
    tags: ['podcast', 'historia', 'Nakba', 'geopolítica', 'Gaza'],
    aiThumbnail: true,
    linkLabel: 'Episodios',
    links: [
      { label: 'Ep. 1: Una tierra dividida', url: 'https://youtu.be/uoeT3VjGJmU' },
      { label: 'Ep. 2: Vivir bajo asedio', url: 'https://youtu.be/wX1mPMJ0sQw' },
      { label: 'Ep. 3: Geopolítica, poder y futuro', url: 'https://youtu.be/75PVyH4a2Vg' },
    ],
    thumbnail: '26_Podcast_Grupo26_VocesPalestina.webp',
    description: 'Serie de tres episodios que narra la historia de Palestina. Episodio 1: orígenes del conflicto y la Nakba. Episodio 2: la vida cotidiana en Gaza y Cisjordania. Episodio 3: el rol de la comunidad internacional.',
    members: ['John Sebastian Rojas Rojas'],
  },
];

function getThumbnailPath(filename) {
  if (!filename) return null;
  return join(THUMBS_DIR, filename);
}

async function uploadToCloudinary(filePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      upload_preset: 'catedra_palestina',
      overwrite: true,
    });
    return result.secure_url;
  } catch (err) {
    console.error(`  ✗ Upload failed: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Seed: Subir imágenes a Cloudinary + Insertar en Supabase ===\n');

  const inserted = [];
  const failed = [];

  for (const p of PROJECTS) {
    console.log(`[${p.n}/${p.kind}] ${p.title}`);

    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('n', p.n)
      .eq('year', p.year)
      .maybeSingle();

    if (existing) {
      console.log(`  ! Ya existe (id: ${existing.id}) — saltando`);
      continue;
    }

    let thumbnailUrl = null;
    if (p.thumbnail) {
      const filePath = getThumbnailPath(p.thumbnail);
      if (!filePath || !existsSync(filePath)) {
        console.log(`  ! Thumbnail not found: ${p.thumbnail}`);
      } else {
        const publicId = `projects/2025-I/${p.n}_${p.kind}`;
        thumbnailUrl = await uploadToCloudinary(filePath, publicId);
        if (thumbnailUrl) console.log(`  ✓ Image → ${thumbnailUrl.slice(0, 60)}...`);
      }
    }

    const { error } = await supabase.from('projects').insert({
      kind: p.kind,
      title: p.title,
      author: p.author,
      year: p.year,
      n: p.n,
      tags: p.tags,
      description: p.description || null,
      url: p.url || null,
      url_alt: null,
      links: p.links || [],
      link_label: p.linkLabel || null,
      thumbnail: thumbnailUrl,
      ai_thumbnail: p.aiThumbnail || false,
      members: p.members || [],
      group_name: p.group || null,
    });

    if (error) {
      console.error(`  ✗ DB insert failed: ${error.message}`);
      failed.push(p.n);
    } else {
      console.log(`  ✓ Inserted in DB`);
      inserted.push(p.n);
    }

    console.log('');
  }

  console.log('=== Resumen ===');
  console.log(`Insertados: ${inserted.length}/${PROJECTS.length}`);
  if (failed.length > 0) {
    console.log(`Fallidos: ${failed.join(', ')}`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
