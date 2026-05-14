import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Icon } from '../lib/icons';
import type { PageId } from '../lib/types';

interface HomeProps {
  setPage: (p: PageId) => void;
}

export function Home({ setPage }: HomeProps) {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />

        <div className="olive-decor text-primary" style={{ top: 110, right: -40 }} aria-hidden="true">
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" stroke="currentColor" opacity="0.25">
            <path d="M40 280 Q 180 80, 290 30" strokeWidth="1.2" />
            <ellipse cx="80" cy="240" rx="14" ry="5" transform="rotate(-30 80 240)" fill="currentColor" stroke="none" />
            <ellipse cx="120" cy="190" rx="14" ry="5" transform="rotate(-40 120 190)" fill="currentColor" stroke="none" />
            <ellipse cx="160" cy="150" rx="14" ry="5" transform="rotate(-50 160 150)" fill="currentColor" stroke="none" />
            <ellipse cx="210" cy="100" rx="14" ry="5" transform="rotate(-60 210 100)" fill="currentColor" stroke="none" />
            <ellipse cx="260" cy="60" rx="14" ry="5" transform="rotate(-70 260 60)" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <div className="wrap w-full">
          <Reveal className="hero-meta">
            <div>
              <div className="eyebrow"><span className="dot" /><span>Plataforma de Memoria y Solidaridad Académica · UNAL</span></div>
              <div className="mt-3.5 font-mono text-xs text-fg-mute tracking-[0.1em]">
                Repositorio permanente · Facultad de Derecho y Ciencias Políticas
              </div>
            </div>
            <div className="text-right max-w-[320px]">
              <div className="font-mono text-[11px] text-fg-mute tracking-[0.18em] uppercase mb-2.5">
                001 / Inicio
              </div>
              <div className="text-sm text-fg-mute">
                Un espacio sentipensante de educación pública desde Colombia, en solidaridad con Palestina.
              </div>
            </div>
          </Reveal>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            <span className="neutral">Caminos</span><br />
            <em>de</em> Resistencia
          </motion.h1>

          <Reveal className="hero-foot" delay={0.3}>
            <div className="stat">
              <span className="num">VIII</span>
              <span className="lbl">Cohortes · documentadas</span>
            </div>
            <div className="stat">
              <span className="num">9</span>
              <span className="lbl">Facultades · convocantes</span>
            </div>
            <div className="stat">
              <span className="num text-accent">+76</span>
              <span className="lbl">Años · de despojo</span>
            </div>
            <div className="stat">
              <span className="num">∞</span>
              <span className="lbl">Sumud · firmeza</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="quote-section section">
        <div className="wrap">
          <div className="quote-grid">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" /><span>Apertura · Palabra fundacional</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="pull-quote mt-7">
                  "Vengo con el <span className="leaf">fusil</span> del combatiente de la libertad en una mano
                  y la <span className="leaf">rama de olivo</span> en la otra.
                  No dejen que la rama de olivo caiga de mi mano."
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="quote-attrib">
                  — Yasser Arafat &nbsp;·&nbsp; Asamblea General de las Naciones Unidas &nbsp;·&nbsp; 13 · XI · 1974
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="quote-aside">
                Cincuenta y dos años después, la rama de olivo sigue pendiente del aire. Esta cátedra
                recoge el gesto: <strong>nombrar lo que ocurre, sostener la memoria, sembrar futuro.</strong>
                <br /><br />
                Un acuerdo público entre estudiantes, docentes y comunidades —dentro y fuera de la universidad— para
                que el aula sea también territorio en disputa.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MISSION ============ */}
      <section className="section">
        <div className="wrap">
          <div className="mission">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" /><span>Misión</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-7 font-mono text-xs text-fg-mute">/ 02 — qué hacemos</div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <p className="lede">
                  Un espacio educativo <span className="accent">sentipensante</span> de la
                  Universidad Nacional de Colombia para fomentar la solidaridad frente al
                  exterminio, contra la indiferencia académica y a favor de un saber que
                  <em> piensa-con-el-cuerpo</em>.
                </p>
              </Reveal>

              <ul>
                {MISSION_POINTS.map((m, i) => (
                  <Reveal key={m.n} as="li" delay={(i + 1) * 0.08}>
                    <span className="n">/ {m.n}</span>
                    <span><b>{m.title}</b> {m.body}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STICKY STORY ============ */}
      <section className="section bg-[var(--bg-warm)]">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow mb-10">
              <span className="dot" /><span>Programa · cuatro estaciones</span>
            </div>
          </Reveal>

          <div className="sticky-story">
            <Reveal className="stick">
              <div className="story-slot">
                <div className="cap">Raíz de olivo emergiendo entre una geografía cartográfica · alto contraste</div>
              </div>
            </Reveal>

            <div>
              {STATIONS.map((s) => (
                <Reveal key={s.n}>
                  <div className="story-block">
                    <div className="kicker">/ Estación {s.n}</div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ POÉTICA DE LA TIERRA ============ */}
      <section className="poetica section">
        <div className="poetica-bg" aria-hidden="true" />
        <div className="wrap">
          <div className="poetica-grid">
            <div>
              <Reveal>
                <div className="eyebrow" style={{ color: 'rgba(241,237,224,0.7)' }}>
                  <span className="dot" style={{ background: '#e8b04a' }} /><span>Poética de la Tierra · voces</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="poetica-quote">
                  "Escribo el <span className="leaf">nombre</span> de mi tierra en el viento,
                  <br />pero el viento no sabe que mi tierra<br />
                  tiene <span className="leaf">nombre.</span>"
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="poetica-attrib">
                  — Mahmoud Darwish &nbsp;·&nbsp; <i>El lecho de una extranjera</i> &nbsp;·&nbsp; 1999
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-9 max-w-[46ch] text-[15px] leading-[1.65]" style={{ color: 'rgba(241,237,224,0.78)' }}>
                  Si el ocupante toma la tierra, el poeta nombra la tierra. Si el archivo
                  quema, el cantor recuerda. Esta cátedra recoge un cuerpo poético, musical
                  y cinematográfico que ha sostenido la palabra <i>Palestina</i> durante
                  medio siglo de borradura sistemática.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <div className="media-stub">
                <div className="media-stub-head">
                  <div className="md-dot" />
                  <div className="flex-1">
                    <div className="md-now">Reproduciendo · sin sonido</div>
                    <div className="md-title">Marcel Khalifé — <i>Rita y el fusil</i></div>
                  </div>
                  <div className="md-time">02:14 / 04:38</div>
                </div>

                <div className="md-wave" aria-hidden="true">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const h = 6 + Math.abs(Math.sin(i * 0.7) * 22) + (i % 4 === 0 ? 8 : 0);
                    const played = i / 48 < 0.46;
                    return <span key={i} style={{ height: h, opacity: played ? 1 : 0.35 }} />;
                  })}
                </div>

                <ul className="md-list">
                  <li>
                    <span className="md-kind">Poema</span>
                    <span className="md-name">Mahmoud Darwish — <i>Carné de identidad</i></span>
                    <span className="md-len">03:42</span>
                  </li>
                  <li className="is-active">
                    <span className="md-kind"><Icon.Play /></span>
                    <span className="md-name">Marcel Khalifé — <i>Rita y el fusil</i></span>
                    <span className="md-len">04:38</span>
                  </li>
                  <li>
                    <span className="md-kind">Cine</span>
                    <span className="md-name">Elia Suleiman — <i>Intervención divina</i> (frag.)</span>
                    <span className="md-len">07:08</span>
                  </li>
                  <li>
                    <span className="md-kind">Canto</span>
                    <span className="md-name">DAM — <i>Min Irhabi?</i></span>
                    <span className="md-len">04:12</span>
                  </li>
                  <li>
                    <span className="md-kind">Poema</span>
                    <span className="md-name">Fadwa Tuqan — <i>Bastará para mí</i></span>
                    <span className="md-len">02:18</span>
                  </li>
                </ul>

                <div className="md-foot">
                  <span className="font-mono text-[10.5px] tracking-[0.15em]" style={{ color: 'rgba(241,237,224,0.55)' }}>
                    Curaduría · Cátedra Caminos de Resistencia
                  </span>
                  <button className="btn-ghost-light">
                    Abrir antología completa <Icon.External />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SIMBOLOGÍA Y RAÍCES ============ */}
      <section className="section">
        <div className="wrap">
          <div className="simbo-head">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" /><span>Simbología y Raíces</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5">
                  Tres objetos<br />
                  <em className="text-accent italic">—que</em> dicen un pueblo
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="text-fg-mute text-base leading-[1.6] max-w-[44ch]">
                Una semiótica popular acompaña a la causa palestina desde 1948.
                Tres signos —el olivo, la llave, la firmeza— operan como
                <strong className="text-fg font-medium"> contraseña, herencia y mandato.</strong>
              </p>
            </Reveal>
          </div>

          <div className="simbo-grid">
            <SimboCard
              n="01"
              term="El Olivo"
              meaning="Resiliencia"
              body="Árbol que puede vivir mil años. Arrancarlo es el gesto inverso a sembrarlo: un acto que necesita más violencia que tiempo. Por eso replantarlo, una y otra vez, es ya una forma de victoria."
              glyph={<OliveGlyph />}
            />
            <SimboCard
              n="02"
              term="La Llave"
              meaning="Derecho al retorno"
              body="Más de medio millón de familias guardan, desde 1948, la llave de la casa que les fue arrebatada. Pasa de padres a hijas como una promesa material: la casa existe porque la llave existe."
              glyph={<KeyGlyph />}
              accent
            />
            <SimboCard
              n="03"
              term="El Sumud"
              meaning="Firmeza"
              body="Palabra árabe sin traducción directa: estar, quedarse, no irse. La pedagogía de no abandonar el lugar — la escuela, el campo, la calle — incluso cuando estar implica peligro."
              glyph={<SumudGlyph />}
            />
          </div>
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="section pt-10 pb-20">
        <div className="wrap">
          <Reveal className="cta-strip">
            <div>
              <h2 className="text-[clamp(28px,4vw,48px)]">
                Esta plataforma <em className="text-accent">permanece.</em>
              </h2>
              <p className="mt-3 text-fg-mute max-w-[56ch]">
                Un archivo público y vivo: lo que la cátedra ha investigado, conversado y publicado
                queda disponible para quien quiera leer, citar o continuarlo.
              </p>
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <button className="btn terra" onClick={() => setPage('archive')}>
                Explorar el archivo <Icon.Arrow />
              </button>
              <button className="btn" onClick={() => setPage('history')}>
                Conocer la historia
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const MISSION_POINTS = [
  { n: '01', title: 'Investigar', body: 'con rigor histórico el caso palestino desde las orillas del sur global, sin neutralidades cómplices ni eufemismos académicos.' },
  { n: '02', title: 'Documentar', body: 'la vida cotidiana bajo bloqueo: agua, semillas, hospitales, escuelas — la infraestructura de la firmeza (sumud).' },
  { n: '03', title: 'Sembrar',    body: 'redes entre universidades, ONGs, diásporas y comunidades campesinas que reconozcan parentescos de lucha.' },
  { n: '04', title: 'Publicar',   body: 'un archivo abierto — bibliografía, ensayos estudiantiles, cartografías, podcast — disponible más allá del aula.' },
];

const STATIONS = [
  { n: '01', title: 'La memoria como territorio', body: 'Cómo se construye el relato hegemónico de un despojo. Lectura cruzada de Sand, Masalha y Traverso: la invención del Estado, la ingeniería del traslado, el lugar de Gaza antes y después de la historia.' },
  { n: '02', title: 'Economía del bloqueo',       body: 'Agua, electricidad, combustible y harina como armas. Mapas operativos de los puntos de control, infraestructura humanitaria intervenida y la arquitectura del cerco.' },
  { n: '03', title: 'Sumud — la firmeza',         body: 'El cultivo del olivo como acto político. Casas demolidas y reconstruidas. Médicas y maestros que sostienen el oficio en hospitales destruidos. Resistencia que no se entiende sin cotidianidad.' },
  { n: '04', title: 'Solidaridades del sur',      body: 'Genealogía de los vínculos entre América Latina y Palestina: tercermundismo, no alineación, brigadas, exilios y diásporas. Cierre con una mesa de diálogo entre comunidades campesinas colombianas y delegaciones palestinas.' },
];

function OliveGlyph() {
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M14 64 Q 40 12, 66 64" />
      <ellipse cx="24" cy="50" rx="6" ry="2.4" transform="rotate(-30 24 50)" fill="currentColor" stroke="none" />
      <ellipse cx="34" cy="36" rx="6" ry="2.4" transform="rotate(-30 34 36)" fill="currentColor" stroke="none" />
      <ellipse cx="46" cy="36" rx="6" ry="2.4" transform="rotate(30 46 36)" fill="currentColor" stroke="none" />
      <ellipse cx="56" cy="50" rx="6" ry="2.4" transform="rotate(30 56 50)" fill="currentColor" stroke="none" />
      <ellipse cx="40" cy="22" rx="6" ry="2.4" fill="currentColor" stroke="none" />
      <line x1="40" y1="64" x2="40" y2="74" />
    </svg>
  );
}

function KeyGlyph() {
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="24" cy="40" r="14" />
      <circle cx="24" cy="40" r="5" fill="currentColor" stroke="none" />
      <line x1="38" y1="40" x2="72" y2="40" />
      <line x1="60" y1="40" x2="60" y2="50" />
      <line x1="68" y1="40" x2="68" y2="48" />
    </svg>
  );
}

function SumudGlyph() {
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M14 64 L 26 22 L 40 48 L 54 18 L 66 64" />
      <line x1="10" y1="64" x2="70" y2="64" />
      <line x1="40" y1="64" x2="40" y2="74" />
    </svg>
  );
}

interface SimboCardProps {
  n: string;
  term: string;
  meaning: string;
  body: string;
  glyph: ReactNode;
  accent?: boolean;
}

function SimboCard({ n, term, meaning, body, glyph, accent }: SimboCardProps) {
  return (
    <Reveal as="article" className={'simbo-card ' + (accent ? 'is-accent' : '')}>
      <div className="simbo-card-glyph" aria-hidden="true">{glyph}</div>
      <div className="simbo-card-n">/ {n}</div>
      <h3 className="simbo-card-term">{term}</h3>
      <div className="simbo-card-meaning">{meaning}</div>
      <p className="simbo-card-body">{body}</p>
    </Reveal>
  );
}
