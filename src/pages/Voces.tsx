import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { ImageSlot } from '../components/ImageSlot';
import { Icon } from '../lib/icons';

/* ============================================================
   Darwish interactive poem card
   ============================================================ */
function DarwishCard() {
  const [active, setActive] = useState(0);

  const poems = [
    {
      title: 'Carné de identidad',
      year: '1964',
      lines: [
        'Registra:', 'Soy árabe.',
        'Mi número de carné es cincuenta mil.',
        'Tengo ocho hijos',
        'y el noveno vendrá después del verano.',
        '¿Te enfadas?',
      ],
    },
    {
      title: 'En esta tierra',
      year: '1992',
      lines: [
        'En esta tierra hay lo que merece la vida:',
        'fines de abril,',
        'el olor del pan al amanecer,',
        'una mujer que empieza el día con gimnasia...',
        'La vida no es sino esta tierra.',
      ],
    },
    {
      title: 'El pasajero',
      year: '1999',
      lines: [
        'Soy el pasajero de paso en palabras.',
        'El viento habita en mis palabras.',
        'Vine de allá. Vuelvo allá.',
        'No hay donde ir sino hacia el origen.',
      ],
    },
  ];

  const p = poems[active];

  return (
    <div className="media-stub">
      <div className="media-stub-head">
        <div className="md-dot" />
        <div style={{ flex: 1 }}>
          <div className="md-now">Antología poética · Mahmoud Darwish</div>
          <div className="md-title"><i>{p.title}</i></div>
        </div>
         <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--on-dark-legal)', letterSpacing: '.1em' }}>
          {p.year}
        </div>
      </div>

      <div className="darwish-verse">
        {p.lines.map((line, i) => <span key={i}>{line}<br /></span>)}
      </div>

      <ul className="md-list" style={{ marginTop: 18 }}>
        {poems.map((q, i) => (
          <li key={i} className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}>
            <span className="md-kind">{i === active ? <Icon.Play /> : 'Verso'}</span>
            <span className="md-name"><i>{q.title}</i></span>
            <span className="md-len">{q.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   TAB 1 — Arte y Cultura
   ============================================================ */
function ArteTab() {
  return (
    <section className="section">
      <div className="wrap">

        <Reveal>
          <div className="voces-open-quote">
            <div className="eyebrow"><span className="dot" />Apertura · Arte y resistencia</div>
            <blockquote className="voces-bq">
              "La fórmula de la indignación siempre debe acompañarse
              con los{' '}
              <em style={{ color: 'var(--terracotta)' }}>susurros de la poesía</em>"
            </blockquote>
            <cite className="voces-bq-attr">
              — De Vietnam a Palestina · Herencia anticolonial
            </cite>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="voces-darwish-band">
            <div className="voces-darwish-inner">
              <div>
                <div className="eyebrow" style={{ color: 'var(--on-dark-mute)' }}>
                  <span className="dot" style={{ background: 'var(--gold-accent)' }} />
                  Poesía · Voz central
                </div>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(32px, 4.5vw, 54px)',
                  letterSpacing: '-.025em',
                  lineHeight: 1.04,
                  color: '#f1ede0',
                  marginTop: 18,
                }}>
                  Mahmoud<br />Darwish
                </h3>
                <p style={{ marginTop: 20, color: 'rgba(241,237,224,.76)', fontSize: 15, lineHeight: 1.68, maxWidth: '36ch' }}>
                  1941–2008. Poeta palestino considerado la voz más importante de la
                  resistencia literaria árabe. Sus palabras sostuvieron la identidad
                  de un pueblo mientras los mapas la negaban.
                </p>
                <div style={{
                  marginTop: 28,
                  fontFamily: 'var(--mono)',
                  fontSize: 10.5,
                  color: 'var(--on-dark-dim)',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  borderLeft: '2px solid var(--terracotta)',
                  paddingLeft: 14,
                  lineHeight: 1.85,
                }}>
                  Carné de identidad · 1964<br />
                  Memoria para el olvido · 1982<br />
                  El lecho de una extranjera · 1999
                </div>
              </div>
              <div>
                <DarwishCard />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="voces-masonry">

          <Reveal>
            <div className="voces-masonry-item">
              <div className="card card-base p-0 overflow-hidden">
                <ImageSlot
                  height={210}
                  label="Mural · Arte callejero palestino · Campo de refugiados"
                  variant="olive"
                />
                <div style={{ padding: '22px 24px' }}>
                  <div className="kicker">Murales · Arte Urbano</div>
                  <h3 style={{ marginTop: 8, fontSize: 'clamp(20px, 2.2vw, 26px)' }}>
                    La pared como cuaderno
                  </h3>
                  <p style={{ marginTop: 10, color: 'var(--fg-mute)', fontSize: 14.5, lineHeight: 1.65 }}>
                    Desde Beirut hasta Ramallah, el mural es el archivo popular
                    que no necesita permiso ni editor. Una pared basta para que
                    la memoria persista donde el Estado quiere borradura.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="voces-masonry-item">
              <div className="card">
                <div className="kicker">Cine · Documental</div>
                <h3 style={{ marginTop: 8, fontSize: 'clamp(20px, 2.2vw, 26px)' }}>
                  1948 · Muhammad Bakri
                </h3>
                <ImageSlot
                  height={148}
                  label="Fotograma · Documental 1948 · Muhammad Bakri · 1998"
                  variant="terra"
                />
                <p style={{ color: 'var(--fg-mute)', fontSize: 14.5, lineHeight: 1.65, marginTop: 14 }}>
                  Una de las primeras miradas cinematográficas a la Nakba desde adentro.
                  Bakri construye un contra-archivo audiovisual ante el silencio oficial,
                  recuperando testimonios directos del desplazamiento.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="voces-masonry-item">
              <div className="card">
                <div className="kicker">Tatreez · Bordado Tradicional</div>
                <h3 style={{ marginTop: 8, fontSize: 'clamp(20px, 2.2vw, 26px)' }}>
                  Memoria cosida a mano
                </h3>
                <p style={{ marginTop: 10, color: 'var(--fg-mute)', fontSize: 14.5, lineHeight: 1.65 }}>
                  El tatreez —bordado palestino de más de tres mil años— es un sistema
                  simbólico que identifica la región de origen de cada familia.
                  Cada patrón es un apellido que el exilio no puede borrar.
                </p>
                <div style={{
                  marginTop: 16,
                  padding: '12px 16px',
                  border: '1px dashed var(--line)',
                  borderRadius: 10,
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--terracotta)',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                }}>
                  UNESCO · Patrimonio Cultural Inmaterial · 2021
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="voces-masonry-item">
              <div className="card">
                <div className="kicker">Pedagogía · Lúdica</div>
                <h3 style={{ marginTop: 8, fontSize: 'clamp(20px, 2.2vw, 26px)' }}>
                  El juego como acto político
                </h3>
                <p style={{ marginTop: 10, color: 'var(--fg-mute)', fontSize: 14.5, lineHeight: 1.65 }}>
                  Bajo bloqueo, el juego no es frivolidad: es el ejercicio del derecho
                  a la infancia. La lúdica afirma la humanidad frente al intento
                  sistemático de deshumanización.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="voces-masonry-item">
              <div className="voces-float-quote">
                <p className="voces-float-verse">
                  "Escribo el nombre de mi tierra en el viento,
                  pero el viento no sabe que mi tierra tiene nombre."
                </p>
                <cite className="voces-float-attr">— Mahmoud Darwish</cite>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TAB 2 — Periodismo y Narrativas
   ============================================================ */
function PeriodismoTab() {
  return (
    <section className="section">
      <div className="wrap">

        <Reveal>
          <div className="voces-traverso-band">
            <div className="eyebrow">
              <span className="dot" style={{ background: 'var(--gold-accent)' }} />
              Periodismo · Encuadre editorial
            </div>
            <blockquote className="pull-quote" style={{ marginTop: 22 }}>
              "El universalismo ha sido siempre{' '}
              <span style={{ color: 'var(--gold-accent)' }}>Occidente extendiendo sus valores</span>
              {' '}como si fueran universales."
            </blockquote>
            <cite className="quote-attrib" style={{ marginTop: 22, display: 'block' }}>
              — Enzo Traverso
            </cite>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="voces-editorial">
            <div className="voces-editorial-lead">
              <span className="voces-drop-cap">E</span>
              <p style={{ fontSize: 17, lineHeight: 1.78, color: 'var(--fg)' }}>
                l relato hegemónico sobre el conflicto palestino ha sido construido con herramientas
                precisas: la <strong>dicotomía civilización vs. barbarie</strong>, el lenguaje de
                "guerra" donde hay ocupación, la equivalencia falsa entre colonizador y colonizado.
                Este encuadre no es accidental —es una tecnología política.
              </p>
            </div>
            <div className="voces-editorial-cols">
              <div>
                <h4 style={{ fontFamily: 'var(--serif)', fontSize: 21, letterSpacing: '-.015em', marginBottom: 14 }}>
                  La dicotomía civilización&thinsp;/&thinsp;barbarie
                </h4>
                <p style={{ color: 'var(--fg-mute)', fontSize: 15, lineHeight: 1.72 }}>
                  Desde Fanon hasta Traverso, el pensamiento anticolonial ha identificado
                  esta dicotomía como el mecanismo central de justificación del despojo.
                  El "civilizado" tiene derecho a todo; el "bárbaro" carece de derechos
                  que respetar.
                </p>
                <p style={{ color: 'var(--fg-mute)', fontSize: 15, lineHeight: 1.72, marginTop: 16 }}>
                  En el caso palestino, el encuadre opera con precisión técnica: los medios
                  dominantes hablan de "operaciones quirúrgicas" para los bombardeos
                  y "terrorismo" para cualquier forma de resistencia.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--serif)', fontSize: 21, letterSpacing: '-.015em', marginBottom: 14 }}>
                  El fraude Joan Peters
                </h4>
                <p style={{ color: 'var(--fg-mute)', fontSize: 15, lineHeight: 1.72 }}>
                  El libro <em>From Time Immemorial</em> (1984) argumentaba que Palestina
                  estaba "vacía" antes de la inmigración judía. Celebrado ampliamente
                  en Occidente —hasta que Finkelstein y otros historiadores demostraron
                  que era una fabricación sistemática de fuentes y estadísticas.
                </p>
                <p style={{ color: 'var(--fg-mute)', fontSize: 15, lineHeight: 1.72, marginTop: 16 }}>
                  Los desmentidos nunca alcanzaron la difusión de las mentiras originales.
                  Así funciona el sesgo mediático estructural.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="voces-dark-block">
            <div className="voces-db-inner">
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--terracotta)' }}>
                Concepto · Memoria en disputa
              </div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(34px, 5.5vw, 62px)',
                marginTop: 12,
                letterSpacing: '-.025em',
                lineHeight: 1.04,
                color: '#fff',
              }}>
                Memoridicio
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.76, color: 'rgba(255,255,255,.8)', marginTop: 26 }}>
                El <strong style={{ color: '#fff' }}>memoridicio</strong> nombra el proceso sistemático de
                borrado de la memoria histórica de un pueblo: destrucción de archivos,
                renombramiento de ciudades, negación de la cultura y la lengua,
                eliminación de documentos civiles.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.76, color: 'rgba(255,255,255,.8)', marginTop: 16 }}>
                En el caso palestino opera en múltiples registros simultáneos:
                demolición de cementerios, prohibición de la enseñanza del árabe,
                exclusión sistemática de las narrativas palestinas en los currículos
                educativos occidentales.
              </p>
              <div className="voces-db-stats">
                {[
                  { v: '+500', k: 'Aldeas borradas · desde 1948' },
                  { v: '418',  k: 'Topónimos árabes · renombrados' },
                  { v: '15k+', k: 'Documentos destruidos' },
                ].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 42, color: 'var(--terracotta)', lineHeight: 1 }}>{s.v}</div>
                     <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.50)', marginTop: 8 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="voces-db-footer">
               <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'rgba(255,255,255,.50)', letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'normal' }}>
                Contra el memoridicio
              </div>
              <div style={{ borderLeft: '2px solid var(--terracotta)', paddingLeft: 20, fontStyle: 'italic', color: 'rgba(255,255,255,.72)', fontSize: 15, lineHeight: 1.68 }}>
                La historia oral —testimonios grabados, memorias transcritas, relatos
                transmitidos de generación en generación— es el contra-archivo que el
                poder no puede destruir porque vive en cuerpos, no en edificios.
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ============================================================
   TAB 3 — Solidaridad y Sur Global
   ============================================================ */
function SolidaridadTab() {
  return (
    <section className="section">
      <div className="wrap">

        <Reveal>
          <div className="voces-tutu">
            <div className="eyebrow" style={{ color: 'rgba(241,237,224,.65)' }}>
              <span className="dot" style={{ background: 'var(--gold-accent)' }} />
              Apertura · Neutralidad imposible
            </div>
            <blockquote className="voces-tutu-verse">
              "Si eliges ser neutral en situaciones de injusticia,
              <em> has elegido el lado del opresor.</em>"
            </blockquote>
            <cite className="voces-tutu-attr">
              — Desmond Tutu · Arzobispo · Premio Nobel de la Paz 1984
            </cite>
          </div>
        </Reveal>

        <div className="grid-2">

          <Reveal>
            <div className="card">
              <div className="kicker">Sur Global · Genealogías compartidas</div>
              <h3 style={{ marginTop: 10, fontSize: 'clamp(20px, 2.5vw, 28px)' }}>
                Parentescos de lucha
              </h3>
              <p style={{ marginTop: 14, color: 'var(--fg-mute)', fontSize: 15, lineHeight: 1.7 }}>
                La causa palestina es el nodo más visible de una red de resistencias
                coloniales en el Sur Global. La solidaridad tercermundista, el movimiento
                de no-alineados y las brigadas internacionales construyeron vínculos
                orgánicos entre Palestina, Cuba, Vietnam y Colombia.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Tercermundismo', 'No-Alineados', 'Brigadas', 'Diáspora'].map(tag => (
                  <span key={tag} style={{
                    padding: '6px 12px', borderRadius: 999,
                    border: '1px solid var(--olive)',
                    fontFamily: 'var(--mono)', fontSize: 10.5,
                    letterSpacing: '.12em', textTransform: 'uppercase',
                    color: 'var(--olive)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card">
              <div className="kicker">Judaísmo Antisionista</div>
              <h3 style={{ marginTop: 10, fontSize: 'clamp(20px, 2.5vw, 28px)' }}>
                Jewish Voice for Peace
              </h3>
              <p style={{ marginTop: 14, color: 'var(--fg-mute)', fontSize: 15, lineHeight: 1.7 }}>
                Sionismo y judaísmo no son sinónimos. Jewish Voice for Peace y otros
                movimientos antisionistas recuerdan que la crítica al Estado de Israel
                no es antisemitismo —es una posición ética enraizada en tradiciones
                propias de justicia.
              </p>
              <div style={{
                marginTop: 18, padding: '14px 16px',
                background: 'var(--olive-soft)', borderRadius: 10,
                fontFamily: 'var(--mono)', fontSize: 11,
                color: 'var(--olive)', letterSpacing: '.12em', textTransform: 'uppercase',
              }}>
                "Not in our name" · Coalición antisionista judía
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card">
              <div className="kicker">Universidad Nacional · Colombia</div>
              <h3 style={{ marginTop: 10, fontSize: 'clamp(20px, 2.5vw, 28px)' }}>
                La cátedra como acto político
              </h3>
              <p style={{ marginTop: 14, color: 'var(--fg-mute)', fontSize: 15, lineHeight: 1.7 }}>
                La Universidad Nacional de Colombia abrió este espacio porque entiende
                que la neutralidad académica frente al genocidio es complicidad
                disfrazada de objetividad. Investigar es ya tomar posición.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="card">
              <div className="kicker">Red de solidaridad · datos</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                {[
                  { v: '50+',  k: 'Universidades en red' },
                  { v: 'VIII', k: 'Cohortes documentadas' },
                  { v: '9',    k: 'Facultades convocantes' },
                  { v: '2024', k: 'Año del fallo CIJ' },
                ].map(s => (
                  <div key={s.k} style={{ paddingTop: 12, borderTop: '1px solid var(--line-soft)' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 36, letterSpacing: '-.02em', color: 'var(--terracotta)', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--fg-mute)', marginTop: 6 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>

        <Reveal>
          <div className="voces-cij">
            <div className="voces-cij-header">
              <div className="voces-cij-mono">
                Corte Internacional de Justicia · La Haya · 2024
              </div>
              <h3 className="voces-cij-h3">
                Fallo histórico sobre la ilegalidad de la ocupación
              </h3>
            </div>
            <div className="voces-cij-body">
              <div className="voces-cij-col">
                <div className="voces-cij-col-label">Caso</div>
                <p className="voces-cij-col-p">
                  Opinión Consultiva solicitada por la Asamblea General de la ONU sobre
                  las consecuencias jurídicas de las políticas y prácticas de Israel
                  en el Territorio Palestino Ocupado, incluida Jerusalén Oriental.
                </p>
              </div>
              <div className="voces-cij-col">
                <div className="voces-cij-col-label">Resolución</div>
                <p className="voces-cij-col-p">
                  La CIJ determinó que la presencia continuada de Israel en el
                  Territorio Palestino Ocupado es{' '}
                  <strong className="voces-cij-strong">ilegal bajo el derecho
                  internacional</strong>, y que Israel debe poner fin a su ocupación
                  sin condiciones ni demora.
                </p>
              </div>
              <div className="voces-cij-col">
                <div className="voces-cij-col-label">Implicaciones</div>
                <p className="voces-cij-col-p">
                  Todos los Estados tienen la obligación de no reconocer como legal
                  la situación resultante y de no prestar ayuda ni asistencia al
                  mantenimiento de dicha presencia ilegal.
                </p>
              </div>
            </div>
            <div className="voces-cij-footer">
              <span className="voces-cij-mono">19 · VII · 2024 · Opinión Consultiva</span>
              <span className="voces-cij-mono" style={{ opacity: .55 }}>Res. A/ES-10/L.31/Rev.1</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ============================================================
   Main Voces page
   ============================================================ */
export function Voces() {
  const [tab, setTab] = useState<'arte' | 'periodismo' | 'solidaridad'>('arte');

  const tabs: { id: 'arte' | 'periodismo' | 'solidaridad'; label: string }[] = [
    { id: 'arte',        label: 'Arte y Cultura' },
    { id: 'periodismo',  label: 'Periodismo y Narrativas' },
    { id: 'solidaridad', label: 'Solidaridad y Sur Global' },
  ];

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" />Página 05 · Voces</div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 style={{ marginTop: 18 }}>
                  Voces<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>de la</em><br />
                  Resistencia
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <p className="lede">
                <strong>Arte, periodismo y solidaridad</strong> como formas de
                resistencia al borramiento. Tres miradas que sostienen la memoria
                viva cuando los archivos callan.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="subtabs">
              {tabs.map(t => (
                <button
                  key={t.id}
                  className={'subtab ' + (tab === t.id ? 'is-active' : '')}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {tab === 'arte'        && <ArteTab />}
      {tab === 'periodismo'  && <PeriodismoTab />}
      {tab === 'solidaridad' && <SolidaridadTab />}
    </>
  );
}
