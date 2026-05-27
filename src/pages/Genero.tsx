import { Reveal } from '../components/Reveal';
import { ImageSlot } from '../components/ImageSlot';

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
   PalestinaDeTodas — bento editorial gender section
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
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>que sostiene</em><br />
              el mundo
            </h2>
            <div className="pdt-intro-body">
              <p>
                <strong>Sumud</strong> — صمود — es la palabra árabe que describe la
                resistencia arraigada en la cotidianidad: el acto de quedarse, cultivar, enseñar,
                parir y criar bajo ocupación. No es heroísmo extraordinario; es la arquitectura
                invisible que sostiene una sociedad en permanente estado de emergencia.
              </p>
              <p style={{ marginTop: 18 }}>
                Las mujeres palestinas son las principales portadoras del sumud. Administran hogares
                que pueden ser demolidos de un día para otro, sostienen duelos sin cuerpo, mantienen
                escuelas que funcionan bajo bombardeos. Esta sección documenta esa carga
                —y esa fuerza— con la seriedad que merece.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── BENTO GRID ───────────────────────────────────────── */}
      <div className="pdt-bento">

        {/* Salud Mental y Cuidado */}
        <Reveal>
          <div className="pdt-card pdt-mental">
            <div className="pdt-card-eyebrow">
              <span className="kicker">/ Salud mental y cuidado</span>
            </div>
            <ImageSlot
              height={180}
              label="Mujer palestina en espacio de refugio · retrato documental"
              variant="olive"
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
          <div className="pdt-card pdt-violence">
            <div className="pdt-card-eyebrow">
              <span className="kicker" style={{ color: 'var(--terracotta)' }}>/ Violencia sistémica</span>
              <div className="pdt-alert-bar">
                <span className="pdt-alert-dot" aria-hidden="true" />
                Contenido documentado · tratado con la solemnidad que merece
              </div>
            </div>
            <ul className="pdt-list" style={{ marginTop: 8 }}>
              {GENDER_DATA.systemicViolence.map((item, i) => (
                <li key={i} className="pdt-list-item pdt-list-item--alert">
                  <span className="pdt-list-n pdt-list-n--alert">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Stat · 26 oct */}
        <Reveal>
          <div className="pdt-card pdt-stat pdt-stat--olive">
            <div className="pdt-stat-num">{GENDER_DATA.leadershipSumud.nationalDay}</div>
            <div className="pdt-stat-note">{GENDER_DATA.leadershipSumud.nationalDayNote}</div>
          </div>
        </Reveal>

        {/* Stat · 30 % */}
        <Reveal delay={0.08}>
          <div className="pdt-card pdt-stat">
            <div className="pdt-stat-num pdt-stat-num--olive">{GENDER_DATA.leadershipSumud.politicalQuota}</div>
            <div className="pdt-stat-note">{GENDER_DATA.leadershipSumud.politicalQuotaNote}</div>
          </div>
        </Reveal>

        {/* Stat · 1.673 */}
        <Reveal delay={0.16}>
          <div className="pdt-card pdt-stat pdt-stat--terra">
            <div className="pdt-stat-num pdt-stat-num--terra">{GENDER_DATA.leadershipSumud.students}</div>
            <div className="pdt-stat-note">{GENDER_DATA.leadershipSumud.studentsNote}</div>
          </div>
        </Reveal>

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
                <h1 style={{ marginTop: 18 }}>
                  Palestina<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>de todas</em>
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
                <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
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
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <PalestinaDeTodas />
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
      <section className="section" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap">
          <Reveal>
            <div className="reading-note">
              <div>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em',
                  textTransform: 'uppercase', color: 'rgba(241,237,224,0.7)',
                }}>
                  Nota metodológica
                </div>
                <p style={{
                  fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 2.2vw, 24px)',
                  marginTop: 12, lineHeight: 1.3, maxWidth: '48ch',
                  color: 'rgba(241,237,224,0.92)',
                }}>
                  Los datos aquí presentados provienen de organizaciones documentales independientes.
                  El análisis de género no es auxiliar al conflicto —<em>es constitutivo de él.</em>
                </p>
              </div>
              <button className="btn terra" style={{ whiteSpace: 'nowrap' }}>
                Descargar ficha · PDF
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
