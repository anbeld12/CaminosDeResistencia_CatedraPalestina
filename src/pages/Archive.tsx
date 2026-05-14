import { useMemo, useState } from 'react';
import { useReveal } from '../lib/hooks';
import { Icon } from '../lib/icons';

interface Project {
  id: number;
  kind: string;
  title: string;
  author: string;
  year: string;
  n: string;
  tags: string[];
}

const ARCHIVE_PROJECTS: Project[] = [
  { id: 1, kind: 'ensayo',      title: 'Sentipensar el cerco: pedagogía afectiva en el aula',     author: 'María C. Quintero · Pedagogía', year: '2025-II', n: '01', tags: ['pedagogía', 'afecto'] },
  { id: 2, kind: 'cartografia', title: 'Atlas de los olivos arrancados',                          author: 'Daniel Páez · Geografía',       year: '2025-II', n: '02', tags: ['mapa', 'datos'] },
  { id: 3, kind: 'video',       title: 'Diario en Beit Sahour · 14 días con la familia Salah',   author: 'Laura Beltrán · Cine y TV',     year: '2025-I',  n: '03', tags: ['video', 'diario'] },
  { id: 4, kind: 'podcast',     title: 'Sumud · 4 capítulos sobre la firmeza',                    author: 'Andrés Rivera · Filosofía',     year: '2025-I',  n: '04', tags: ['audio', 'serie'] },
  { id: 5, kind: 'ensayo',      title: 'Traverso en Bogotá: Gaza antes de la historia',           author: 'Sara Torres · Historia',        year: '2024-II', n: '05', tags: ['historia', 'lectura'] },
  { id: 6, kind: 'cartografia', title: 'Aguas que faltan — flujo del acuífero de la montaña',     author: 'Colectivo Hidra · Ing. Civil',  year: '2024-II', n: '06', tags: ['agua', 'mapa'] },
  { id: 7, kind: 'video',       title: 'Conversación: Sánchez Ángel + estudiantes',               author: 'Mesa de redacción · Cátedra',    year: '2024-I',  n: '07', tags: ['video', 'mesa'] },
  { id: 8, kind: 'podcast',     title: 'Nakba — testimonios en tres generaciones',                author: 'Radio UNAL + Cátedra',          year: '2024-I',  n: '08', tags: ['audio', 'memoria'] },
  { id: 9, kind: 'ensayo',      title: 'Solidaridades del sur: AL — Palestina, 1955—2025',        author: 'Felipe Mora · Ciencia Política', year: '2025-II', n: '09', tags: ['historia', 'diplomacia'] },
];

const KINDS = [
  { id: 'all',          label: 'Todo',        n: ARCHIVE_PROJECTS.length },
  { id: 'ensayo',       label: 'Ensayo',      n: ARCHIVE_PROJECTS.filter(p => p.kind === 'ensayo').length },
  { id: 'cartografia',  label: 'Cartografía', n: ARCHIVE_PROJECTS.filter(p => p.kind === 'cartografia').length },
  { id: 'video',        label: 'Video',       n: ARCHIVE_PROJECTS.filter(p => p.kind === 'video').length },
  { id: 'podcast',      label: 'Podcast',     n: ARCHIVE_PROJECTS.filter(p => p.kind === 'podcast').length },
];

const BIBLIO = [
  { author: 'Ricardo Sánchez Ángel',  work: 'Palestina: la herida abierta · ensayos reunidos',        year: '2024', origin: 'Bogotá · UNAL' },
  { author: 'Nur Masalha',            work: 'La Nakba palestina · política y memoria del transfer',  year: '2018', origin: 'Londres · Pluto' },
  { author: 'Norman Finkelstein',     work: 'La industria del Holocausto · capítulos seleccionados',  year: '2000', origin: 'Verso · trad. Akal' },
  { author: 'Enzo Traverso',          work: 'Gaza ante la historia',                                  year: '2024', origin: 'Akal · Madrid' },
  { author: 'Shlomo Sand',            work: 'La invención del pueblo judío',                          year: '2008', origin: 'Akal · Madrid' },
  { author: 'Edward W. Said',         work: 'La cuestión palestina · edición ampliada',               year: '1979', origin: 'Random · trad. Debate' },
  { author: 'Rashid Khalidi',         work: 'La guerra de los cien años contra Palestina',            year: '2020', origin: 'Crítica' },
  { author: 'Ilan Pappé',             work: 'La limpieza étnica de Palestina',                        year: '2006', origin: 'Crítica · Madrid' },
];

const KIND_GLYPH: Record<string, string> = {
  ensayo: 'Ensayo · 06—24 pp',
  cartografia: 'Cartografía · mapa interactivo',
  video: 'Video · HD · 12—28 min',
  podcast: 'Podcast · 4 capítulos',
};

function ProjectCard({ p, onOpen, list }: { p: Project; onOpen: (p: Project) => void; list: boolean }) {
  return (
    <article className="proj reveal" onClick={() => onOpen(p)}>
      <div className={'proj-thumb kind-' + p.kind}>
        <div className="kind-num">N° {p.n}</div>
        <div className="kind-glyph">{KIND_GLYPH[p.kind]}</div>
      </div>
      <div className="meta">
        <span style={{ color: 'var(--terracotta)' }}>{p.kind.toUpperCase()}</span>
        <span>· {p.year}</span>
      </div>
      <h4>{p.title}</h4>
      <div className="author">{p.author}</div>
      {!list && (
        <div className="proj-foot">
          <span>{p.tags.join(' · ')}</span>
          <span style={{ color: 'var(--terracotta)' }}>Abrir ↗</span>
        </div>
      )}
    </article>
  );
}

export function Archive() {
  useReveal();
  const [tab, setTab] = useState<'projects' | 'biblio'>('projects');
  const [kind, setKind] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [query, setQuery] = useState('');
  const [openProj, setOpenProj] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return ARCHIVE_PROJECTS.filter(p =>
      (kind === 'all' || p.kind === kind) &&
      (!query || (p.title + ' ' + p.author + ' ' + p.tags.join(' ')).toLowerCase().includes(query.toLowerCase()))
    );
  }, [kind, query]);

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <div className="eyebrow reveal"><span className="dot" /><span>Página 04 · Archivo</span></div>
              <h1 className="reveal delay-1" style={{ marginTop: 18 }}>
                Cosecha<br />
                <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>de</em> saberes
              </h1>
            </div>
            <div className="reveal delay-2">
              <p className="lede">
                Lo que ha producido la cátedra: ensayos, cartografías, capítulos sonoros y videos
                hechos por estudiantes. Más una biblioteca curada que nombra de dónde venimos.
              </p>
            </div>
          </div>

          <div className="subtabs reveal delay-3">
            <button className={'subtab ' + (tab === 'projects' ? 'is-active' : '')} onClick={() => setTab('projects')}>
              Proyectos · {ARCHIVE_PROJECTS.length}
            </button>
            <button className={'subtab ' + (tab === 'biblio' ? 'is-active' : '')} onClick={() => setTab('biblio')}>
              Bibliografía · {BIBLIO.length}
            </button>
          </div>
        </div>
      </header>

      {tab === 'projects' && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="archive-toolbar reveal" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 22 }}>
              <div className="archive-search is-prominent">
                <Icon.Search />
                <input
                  placeholder="Buscar en el archivo · autora, título, etiqueta, año…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button className="icon-btn" style={{ width: 32, height: 32 }} onClick={() => setQuery('')}>
                    <Icon.Close />
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div className="chips">
                  {KINDS.map(k => (
                    <button
                      key={k.id}
                      className={'chip ' + (kind === k.id ? 'is-on' : '')}
                      onClick={() => setKind(k.id)}
                    >
                      {k.label} · {k.n}
                    </button>
                  ))}
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>
                    {filtered.length} de {ARCHIVE_PROJECTS.length}
                  </span>
                  <div className="viewtoggle">
                    <button className={view === 'grid' ? 'is-on' : ''} onClick={() => setView('grid')}><Icon.Grid /></button>
                    <button className={view === 'list' ? 'is-on' : ''} onClick={() => setView('list')}><Icon.Rows /></button>
                  </div>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--fg-mute)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 36 }}>Sin coincidencias.</div>
                <div style={{ marginTop: 10, fontSize: 14 }}>Prueba otra etiqueta o vacía la búsqueda.</div>
              </div>
            ) : (
              <div className={view === 'grid' ? 'archive-grid' : 'archive-list'}>
                {filtered.map(p => (
                  <ProjectCard key={p.id} p={p} onOpen={setOpenProj} list={view === 'list'} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {tab === 'biblio' && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="hr-rule reveal" style={{ marginBottom: 22 }}>
              <span>Bibliografía base · curada por el equipo docente</span>
            </div>
            <div className="biblio reveal delay-1">
              {BIBLIO.map((b, i) => (
                <div key={i} className="biblio-item">
                  <div className="idx">N° {String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h5>{b.author}</h5>
                    <div className="work">{b.work}</div>
                  </div>
                  <div className="meta-r">{b.origin} · {b.year}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 48, padding: '32px 36px',
              border: '1px dashed var(--line)',
              borderRadius: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: 24, flexWrap: 'wrap',
            }} className="reveal delay-2">
              <div>
                <div className="kicker">¿Falta una autora?</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 26, marginTop: 8 }}>Propón una entrada para la próxima cohorte.</div>
              </div>
              <button className="btn terra">Sugerir bibliografía →</button>
            </div>
          </div>
        </section>
      )}

      {openProj && (
        <div className="modal-veil" onClick={() => setOpenProj(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpenProj(null)}><Icon.Close /></button>
            <div className={'proj-thumb kind-' + openProj.kind} style={{ height: 220, marginBottom: 28 }}>
              <div className="kind-num">N° {openProj.n}</div>
              <div className="kind-glyph">{openProj.kind.toUpperCase()}</div>
            </div>
            <div className="kicker">{openProj.kind} · {openProj.year}</div>
            <h2 style={{ marginTop: 12, fontSize: 'clamp(28px, 3.5vw, 44px)' }}>{openProj.title}</h2>
            <div style={{ color: 'var(--fg-mute)', marginTop: 10, fontSize: 14 }}>{openProj.author}</div>
            <p style={{ marginTop: 24, color: 'var(--fg-mute)', lineHeight: 1.65 }}>
              Fragmento de la sinopsis: este proyecto fue desarrollado en el marco del módulo final
              de la cátedra. Su propósito es articular un argumento — visual, textual o sonoro — que
              tense el aprendizaje con la práctica solidaria. La versión completa puede consultarse
              en la sala de Lectura del Edificio Manuel Ancízar.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn terra">Abrir documento <Icon.External /></button>
              <button className="btn">Citar en BibTeX</button>
              <button className="btn">Compartir</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
