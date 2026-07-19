import { Reveal } from '../components/Reveal';
import { ImageSlot } from '../components/ImageSlot';
import { ImageBook } from '../components/ImageBook';
import { PROJECTS_2025_1 } from '../data/projects-2025-1';
import { FANZINE_G12 } from '../data/fanzine-g12';
import { Icon } from '../lib/icons';
import type { Project } from '../lib/types';

/* ============================================================
   QuotesMarquee — impactful quote block
   ============================================================ */
interface QuotesMarqueeProps {
  quote?: string;
  author?: string;
  source?: string;
  theme?: 'dark' | 'light';
}

function QuotesMarquee({
  quote   = '«Bastará para mí / morir en esta tierra, / en su seno verde, / bajo sus olivos y su hierba»',
  author  = 'Fadwa Tuqan',
  source  = '«Bastará para mí» · 1952',
  theme   = 'dark',
}: QuotesMarqueeProps) {
  return (
    <section className={'qm-section section ' + (theme === 'dark' ? 'qm-dark' : 'qm-light')}>
      <div className="qm-bg-deco" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <div className="qm-inner">
            <span className="qm-openmark" aria-hidden="true">"</span>
            <blockquote className="qm-quote">{quote}</blockquote>
            <footer className="qm-attrib">
              <span className="qm-author">{author}</span>
              <span className="qm-sep" aria-hidden="true">·</span>
              <cite className="qm-source">{source}</cite>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   EstudianteCard — used in producción estudiantil section
   ============================================================ */
function EstudianteCard({ p, delay }: { p: Project; delay: number }) {
  return (
    <Reveal as="article" delay={delay}>
      <div className="pdt-card-modern flex flex-col h-full">
        <div className="kicker mb-3">{p.group || p.author}</div>
        <h3 className="font-serif text-[clamp(18px,2vw,24px)] leading-tight">
          {p.title}
        </h3>
        {p.description && (
          <p className="mt-2 text-fg-mute text-sm leading-relaxed line-clamp-3">
            {p.description}
          </p>
        )}
        <div className="mt-auto pt-4">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn terra"
          >
            Abrir documento <Icon.External />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   PalestinaDeTodas — editorial gender section
   ============================================================ */
const GENDER_DATA = {
  mentalHealth: [
    'El 97 % de los niños de Gaza ha experimentado síntomas de estrés agudo (UNICEF, 2024).',
    'La fragmentación familiar —causada por desplazamiento y checkpoints— recae principalmente sobre las mujeres como cuidadoras primarias.',
    'La demolición de hogares destruye simultáneamente los centros emocionales del tejido familiar: la cocina, el jardín, el cuarto de los hijos.',
    'El duelo sin cuerpo —la imposibilidad de enterrar y llorar a los muertos— genera traumas de duelo complejo documentados por Médicos Sin Fronteras.',
  ],
  systemicViolence: [
    'Los checkpoints militares bloquean el acceso a hospitales: 18 bebés nacidos en puestos de control registrados entre 2000 y 2010 (OMS).',
    'Las detenidas palestinas enfrentan aislamiento, denegación de atención médica y violencia de género institucional (Addameer, 2023).',
    'El bloqueo de Gaza impide el acceso a anticonceptivos, oncológicos y medicación prenatal.',
    'Siete periodistas mujeres asesinadas en Gaza entre octubre de 2023 y mayo de 2024 (Comité para la Protección de los Periodistas).',
  ],
  leadershipSumud: {
    nationalDay: '26 oct.',
    nationalDayNote: 'Día Nacional de la Mujer Palestina · declarado por la Unión General de Mujeres Palestinas desde 1965',
    politicalQuota: '30 %',
    politicalQuotaNote: 'Meta mínima de participación femenina en cargos electivos — Ley Electoral Palestina',
    students: '1.673',
    studentsNote: 'Estudiantes en escuelas «Desafío» de la UNRWA — educación en emergencia prolongada',
  },
};

function PalestinaDeTodas() {
  return (
    <>
      {/* ── INTRO · Sumud ─────────────────────────────────────── */}
      <Reveal>
        <div className="pdt-intro">
          <div className="pdt-intro-grid">
            <h2 className="pdt-intro-title">
              La firmeza<br />
              <em className="text-accent italic">que sostiene</em><br />
              el mundo
            </h2>
            <div className="pdt-intro-body">
              <p>
                <strong>Sumud</strong> — صمود — es la palabra árabe que describe la
                resistencia arraigada en la cotidianidad: el acto de quedarse, cultivar, enseñar,
                parir y criar bajo ocupación. No es heroísmo extraordinario; es la arquitectura
                invisible que sostiene una sociedad en permanente estado de emergencia.
              </p>
              <p className="mt-[18px]">
                Las mujeres palestinas son las principales portadoras del sumud. Administran hogares
                que pueden ser demolidos de un día para otro, sostienen duelos sin cuerpo, mantienen
                escuelas que funcionan bajo bombardeos. Esta sección documenta esa carga
                —y esa fuerza— con la seriedad que merece.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── TWO-COLUMN GRID ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ========== LEFT COLUMN ========== */}
        <div className="flex flex-col gap-8">

          {/* Salud Mental y Cuidado */}
          <Reveal>
            <div className="pdt-card-modern">
              <div className="kicker mb-4">
                / Salud mental y cuidado
              </div>
              <ImageSlot
                height={180}
                src="/images/archive/2025-I/thumbs/10_Collage_Grupo10_MujerPalestina.webp"
                alt="Collage · Mujer Palestina: Resistencia entre el Conflicto y Esperanza · Grupo 10"
                label="Mujer palestina en espacio de refugio · retrato documental"
                variant="olive"
                credit="Collage elaborado por el Grupo 10 (2025-I) en el marco del módulo final de la Cátedra Caminos de Resistencia. Reproducción digital con fines estrictamente pedagógicos y de memoria (Uso Justo)."
                className="group"
              />
              <ul className="pdt-list">
                {GENDER_DATA.mentalHealth.map((item, i) => (
                  <li key={i} className="pdt-list-item">
                    <span className="pdt-list-n">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Violencia Sistémica */}
          <Reveal delay={0.08}>
            <div className="pdt-card-modern pdt-warning-card">
              <div className="kicker text-accent mb-1">
                / Violencia sistémica
              </div>
              <div className="pdt-alert-bar">
                <span className="pdt-alert-dot" aria-hidden="true" />
                Contenido documentado · tratado con la solemnidad que merece
              </div>
              <ul className="pdt-list mt-2">
                {GENDER_DATA.systemicViolence.map((item, i) => (
                  <li key={i} className="pdt-list-item pdt-list-item--alert">
                    <span className="pdt-list-n pdt-list-n--alert">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>

        {/* ========== RIGHT COLUMN · Stats ========== */}
        <div className="flex flex-col gap-8">

          <Reveal>
            <div className="pdt-stat-card">
              <div className="pdt-stat-number">{GENDER_DATA.leadershipSumud.nationalDay}</div>
              <div className="pdt-stat-label">{GENDER_DATA.leadershipSumud.nationalDayNote}</div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="pdt-stat-card">
              <div className="pdt-stat-number">{GENDER_DATA.leadershipSumud.politicalQuota}</div>
              <div className="pdt-stat-label">{GENDER_DATA.leadershipSumud.politicalQuotaNote}</div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="pdt-stat-card">
              <div className="pdt-stat-number">{GENDER_DATA.leadershipSumud.students}</div>
              <div className="pdt-stat-label">{GENDER_DATA.leadershipSumud.studentsNote}</div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-col gap-4">
              <ImageBook
                pages={FANZINE_G12.pages}
                label={FANZINE_G12.label}
                credit={FANZINE_G12.credit}
              />
              <a
                href={PROJECTS_2025_1.find(p => p.id === 12)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn terra self-start"
              >
                Abrir fanzine <Icon.External />
              </a>
            </div>
          </Reveal>

        </div>

      </div>
    </>
  );
}

/* ============================================================
   Main Genero page
   ============================================================ */
export function Genero() {
  return (
    <>
      {/* ── CABECERA ───────────────────────────────────────────── */}
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" />Página 04 · Género</div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-[18px]">
                  Palestina<br />
                  <em className="text-accent italic">de todas</em>
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <div>
                <p className="lede">
                  La ocupación no es neutra en términos de género. Las mujeres palestinas son
                  portadoras del sumud, cuidadoras del tejido social y objetivo específico de la
                  violencia sistémica.
                  <br /><br />
                  <strong>Esta sección documenta esa doble carga —y esa doble fuerza.</strong>
                </p>
                <div className="mt-7 flex gap-2.5 flex-wrap">
                  <div className="pdt-pill">صمود · Sumud</div>
                  <div className="pdt-pill">Salud mental</div>
                  <div className="pdt-pill">Violencia sistémica</div>
                  <div className="pdt-pill">Liderazgo</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ── CONTENIDO PRINCIPAL ───────────────────────────────── */}
      <section className="section !pt-0">
        <div className="wrap">
          <PalestinaDeTodas />
        </div>
      </section>

      {/* ── PRODUCCIÓN ESTUDIANTIL ────────────────────────────── */}
      <section className="section !pt-0">
        <div className="wrap">
          <Reveal>
            <div className="hr-rule mb-10">
              <span>Voces desde el aula · proyectos 2025-I</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS_2025_1.filter(p => [10, 11, 12].includes(p.id)).map((p, i) => (
              <EstudianteCard key={p.id} p={p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CITA DE CIERRE ────────────────────────────────────── */}
      <QuotesMarquee
        quote="«Bastará para mí / morir en esta tierra, / en su seno verde, / bajo sus olivos y su hierba»"
        author="Fadwa Tuqan"
        source="«Bastará para mí» · 1952"
        theme="dark"
      />

      {/* ── NOTA INSTITUCIONAL ────────────────────────────────── */}
      <section className="section !pt-6 !pb-20">
        <div className="wrap">
          <Reveal>
            <div className="reading-note">
              <div>
                <div className="reading-note-eyebrow">
                  Nota metodológica
                </div>
                <p className="reading-note-body">
                  Los datos aquí presentados provienen de organizaciones documentales independientes.
                  El análisis de género no es auxiliar al conflicto —<em>es constitutivo de él.</em>
                </p>
              </div>
              <button className="btn terra whitespace-nowrap">
                Descargar ficha · PDF
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
