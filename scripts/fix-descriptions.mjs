import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const DESCRIPTIONS = {
  '06': 'Proyecto visual compuesto por dos collages cronológicos que representan, desde perspectivas distintas, la historia del conflicto entre Palestina e Israel. Un collage refleja la narrativa palestina —identidad, ocupación, resistencia y fragmentación territorial—; el otro muestra la narrativa israelí —nacimiento del Estado, guerras, construcción identitaria—. El grupo se dividió en dos subgrupos de cuatro personas para investigar, diseñar y contrastar ambos relatos.',
  '07': 'Podcast que resalta la historia y cultura palestina, informando sobre el conflicto mediante un relato dinámico con personajes que viven su día a día en Palestina en medio del conflicto, incluyendo una contextualización del 7 de octubre de 2023.',
  '08': 'Podcast narrativo de dos episodios que ofrece un panorama de la realidad Palestina. El primer episodio muestra cómo vivir, cocinar, bordar, bailar dabke o contar historias es una forma de defender la identidad y preservar la memoria. El segundo episodio, "Sanar entre muros", expone cómo el sistema de salud palestino ha sido atacado sistemáticamente: hospitales bombardeados, escasez médica y el rol del personal de salud que convierte el cuidado en acto de resistencia.',
  '10': 'Pintura en acrílico sobre lienzo y poema que reflejan el papel de la mujer palestina dentro del conflicto, abordando su lucha desde un enfoque cultural. La obra contrasta la realidad del genocidio con el sueño de una nación libre.',
  '11': 'Collage compuesto por tres momentos clave: la vida en Palestina antes de la invasión (sistema musha de cultivos, vida social, convivencia religiosa), el éxodo forzado de la Nakba en 1948 con la expulsión de Lydda y Ramleh, y la situación actual en Cisjordania y Gaza con la fragmentación territorial, el muro, los checkpoints, las demoliciones y la resistencia cotidiana del pueblo palestino.',
  '12': 'Pieza informativa/reflexiva en formato fanzine realizada como trabajo final de la asignatura, de carácter independiente y subversivo. El objetivo es dar a conocer las problemáticas que atraviesan a las mujeres y niñas palestinas en el contexto del conflicto israelí-palestino. El contenido se construyó a partir de artículos sobre la historia de las mujeres en Palestina, informes de UN Women y testimonios de mujeres víctimas de violencia durante el genocidio. Se realizó una revisión detallada de artículos, noticias, datos y cifras que evidencian la problemática, apoyada gráficamente con imágenes de diversas fuentes. El fanzine se produjo en dos tamaños: gran formato para facilitar su presentación y formato de bolsillo para la visualización individual.',
  '13': 'Serie de cuatro episodios que aborda: los orígenes del conflicto y la Nakba; la vida cotidiana bajo ocupación con desplazamientos y apartheid urbano; las resistencias culturales a través del arte, la música y la literatura; y las voces de solidaridad desde América Latina y la diáspora palestina.',
  '14': 'Galería multimedia "Voces palestinas en tres formatos" que expone dos dimensiones del genocidio en Palestina —el tiempo y el espacio— a través de tres estaciones: Gaza, Jerusalén del Este y Cisjordania, con fotografías, narrativas de vida y poemas de autoría palestina.',
  '15': 'Linograbado como técnica de impresión para visibilizar el genocidio en Palestina. La gráfica resultante se concibe como herramienta solidaria, pedagógica y política, vinculando las luchas palestinas con las luchas sociales en Colombia.',
  '16': 'Ensayo que examina el papel del activismo internacional y el cubrimiento mediático en el conflicto palestino, analizando cómo el encuadre informativo reproduce estructuras coloniales de poder.',
  '17': 'Videoclip musical del género bambuco colombiano con influencias del dabke palestino. La canción "Grito de Libertad" fue compuesta y producida por el grupo como denuncia de la violencia, el despojo y la estigmatización que sufre el pueblo palestino.',
  '19': 'Mural colectivo pintado en los muros de la Facultad de Derecho de la UNAL. Se divide en tres ejes: el despojo y ocupación de Palestina, la resistencia palestina, y la solidaridad con otros pueblos oprimidos como el Tíbet y el Kurdistán.',
  '20': 'Mural que representa el valor del personal de salud en contextos de guerra. Incluye un croquis del mapa de Palestina con dibujos que simbolizan a sus habitantes y el rol del cuidado incondicional. Acompañado de la frase: "Donde la guerra hiere, el cuidado resiste."',
  '21': 'Podcast que expone cómo la población infantil y la infraestructura educativa palestina han sido devastadas bajo los ataques dentro del conflicto. Incluye una breve contextualización sobre la ocupación sionista, y luego a modo de narración y reflexión da a conocer hechos concretos que han atentado contra el derecho a la educación, evidenciando que esto no es solo un asunto político sino una verdadera preocupación humanitaria.',
  '22': 'Collage diseñado a partir de imágenes de las luchas palestinas desde 1948 hasta la actualidad, que condensa desde distintas áreas —agricultura, gastronomía, formas de resistencia— la capacidad duradera del pueblo palestino de combatir el despojo de su cultura. Cada integrante seleccionó imágenes alusivas a las raíces identitarias palestinas, que luego se consolidaron en una composición visual colectiva.',
  '23': 'Video de animación digital basado en el poema "Oh Rascal Children of Gaza" de Khaled Juma, sonorizado con guitarra e interpretación en farsi. Combina dibujos animados con material de archivo cinematográfico palestino para evocar la memoria de la infancia en Gaza.',
  '24': 'Pancarta diseñada sobre seda poliéster (1,5 m x 2,5 m) que representa la interacción entre guerra y salud. Combina elementos visuales como soldados, heridas de bala y sangre, con símbolos médicos como el caduceo y maletines de primeros auxilios, todo sobre los colores de la bandera palestina. El mensaje central: sanar también puede ser una forma de resistencia.',
  '25': 'Podcast basado en una entrevista al profesor Alexander Montero, politólogo e investigador, sobre las violaciones a los derechos humanos que se cometen diariamente contra el pueblo palestino, buscando amplificar voces que han sido invisibilizadas y silenciadas.',
  '26': 'Serie de tres episodios que narra la historia de Palestina. Episodio 1: "Una tierra dividida" — orígenes del conflicto, la Nakba de 1948 y la limpieza étnica. Episodio 2: "Vivir bajo asedio" — la vida cotidiana en Gaza y Cisjordania bajo ocupación. Episodio 3: "Geopolítica, poder y futuro" — el rol de Netanyahu, Estados Unidos, China y la comunidad internacional frente a Palestina.',
};

async function main() {
  console.log('=== Restaurar descripciones originales ===\n');

  const ns = Object.keys(DESCRIPTIONS);
  let updated = 0;
  let failed = 0;

  for (const n of ns) {
    const { data, error: findError } = await supabase
      .from('projects')
      .select('id, title, n, description')
      .eq('n', n)
      .single();

    if (findError || !data) {
      console.log(`[${n}] ! No encontrado en DB`);
      failed++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('projects')
      .update({ description: DESCRIPTIONS[n] })
      .eq('id', data.id);

    if (updateError) {
      console.log(`[${n}] ✗ Error: ${updateError.message}`);
      failed++;
    } else {
      console.log(`[${n}] ✓ "${data.title.slice(0, 50)}..."`);
      updated++;
    }
  }

  console.log(`\n=== Resumen ===`);
  console.log(`Actualizados: ${updated}`);
  console.log(`Fallidos: ${failed}`);
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
