import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Icon } from '../lib/icons';
import { BIBLIOGRAPHY, KIND_FILTERS, KIND_GLYPH, PROJECTS } from '../data/archive';
import type { Project } from '../lib/types';

interface ProjectCardProps {
  p: Project;
  onOpen: (p: Project) => void;
  list: boolean;
}

function ProjectCard({ p, onOpen, list }: ProjectCardProps) {
  return (
    <Reveal as="article" className="proj" onClick={() => onOpen(p)}>
      <div className={'proj-thumb kind-' + p.kind}>
        <div className="kind-num">N° {p.n}</div>
        <div className="kind-glyph">{KIND_GLYPH[p.kind]}</div>
      </div>
      <div className="meta">
        <span className="text-accent">{p.kind.toUpperCase()}</span>
        <span>· {p.year}</span>
      </div>
      <h4>{p.title}</h4>
      <div className="author">{p.author}</div>
      {!list && (
        <div className="proj-foot">
          <span>{p.tags.join(' · ')}</span>
          <span className="text-accent">Abrir ↗</span>
        </div>
      )}
    </Reveal>
  );
}

export function Archive() {
  const [tab, setTab] = useState<'projects' | 'biblio'>('projects');
  const [kind, setKind] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return 'list';
    return 'grid';
  });
  const [query, setQuery] = useState('');
  const [openProj, setOpenProj] = useState<Project | null>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 768) setView('list');
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter(p =>
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
              <Reveal>
                <div className="eyebrow"><span className="dot" /><span>Página 04 · Archivo</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4">
                  Cosecha<br />
                  <em className="italic text-accent">de</em> saberes
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="lede">
                Lo que ha producido la cátedra: ensayos, cartografías, capítulos sonoros y videos
                hechos por estudiantes. Más una biblioteca curada que nombra de dónde venimos.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="subtabs">
              <button className={'subtab ' + (tab === 'projects' ? 'is-active' : '')} onClick={() => setTab('projects')}>
                Proyectos · {PROJECTS.length}
              </button>
              <button className={'subtab ' + (tab === 'biblio' ? 'is-active' : '')} onClick={() => setTab('biblio')}>
                Bibliografía · {BIBLIOGRAPHY.length}
              </button>
            </div>
          </Reveal>
        </div>
      </header>

      {tab === 'projects' && (
        <section className="section pt-0">
          <div className="wrap">
            <Reveal className="archive-toolbar flex-col items-stretch gap-[22px]">
              <div className="archive-search is-prominent">
                <Icon.Search />
                <input
                  placeholder="Buscar en el archivo · autora, título, etiqueta, año…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button className="icon-btn w-8 h-8" onClick={() => setQuery('')}>
                    <Icon.Close />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="chips">
                  {KIND_FILTERS.map(k => (
                    <button
                      key={k.id}
                      className={'chip ' + (kind === k.id ? 'is-on' : '')}
                      onClick={() => setKind(k.id)}
                    >
                      {k.label} · {k.n}
                    </button>
                  ))}
                </div>
                <div className="ml-auto flex gap-3 items-center">
                  <span className="font-mono text-xs md:text-[11px] tracking-[0.14em] uppercase text-fg-mute">
                    {filtered.length} de {PROJECTS.length}
                  </span>
                  <div className="viewtoggle hidden md:flex">
                    <button className={view === 'grid' ? 'is-on' : ''} onClick={() => setView('grid')}><Icon.Grid /></button>
                    <button className={view === 'list' ? 'is-on' : ''} onClick={() => setView('list')}><Icon.Rows /></button>
                  </div>
                </div>
              </div>
            </Reveal>

            {filtered.length === 0 ? (
              <div className="py-16 md:py-20 text-center text-fg-mute px-4">
                <div className="font-serif text-3xl md:text-4xl">Sin coincidencias.</div>
                <div className="mt-2.5 text-base md:text-sm">Prueba otra etiqueta o vacía la búsqueda.</div>
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
        <section className="section pt-0">
          <div className="wrap">
            <Reveal>
              <div className="hr-rule mb-5">
                <span>Bibliografía base · curada por el equipo docente</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="biblio">
                {BIBLIOGRAPHY.map((b, i) => (
                  <div key={i} className="biblio-item">
                    <div className="idx">N° {String(i + 1).padStart(2, '0')}</div>
                    <div className="flex gap-3 items-start">
                      <span className="biblio-icon" aria-hidden="true"><Icon.Book /></span>
                      <div>
                        <div className="biblio-author">{b.author}</div>
                        <div className="work">{b.work}</div>
                      </div>
                    </div>
                    <div className="meta-r">{b.origin} · {b.year}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 md:mt-12 px-5 py-6 md:px-9 md:py-8 border border-dashed border-[var(--line)] rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center gap-5 md:gap-6">
                <div>
                  <div className="kicker">¿Falta una autora?</div>
                  <div className="font-serif text-[22px] md:text-[26px] mt-2 leading-tight">Propón una entrada para la próxima cohorte.</div>
                </div>
                <button className="btn terra self-start md:self-auto">Sugerir bibliografía →</button>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <AnimatePresence>
        {openProj && (
          <motion.div
            className="modal-veil"
            onClick={() => setOpenProj(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button className="close" onClick={() => setOpenProj(null)}><Icon.Close /></button>
              <div className={'proj-thumb kind-' + openProj.kind} style={{ height: 220, marginBottom: 28 }}>
                <div className="kind-num">N° {openProj.n}</div>
                <div className="kind-glyph">{openProj.kind.toUpperCase()}</div>
              </div>
              <div className="kicker">{openProj.kind} · {openProj.year}</div>
              <h2 className="mt-3 text-[clamp(26px,7vw,44px)] leading-tight">{openProj.title}</h2>
              <div className="text-fg-mute mt-2.5 text-base md:text-sm">{openProj.author}</div>
              <p className="mt-5 md:mt-6 text-fg-mute text-base leading-relaxed">
                Fragmento de la sinopsis: este proyecto fue desarrollado en el marco del módulo final
                de la cátedra. Su propósito es articular un argumento — visual, textual o sonoro — que
                tense el aprendizaje con la práctica solidaria. La versión completa puede consultarse
                en la sala de Lectura del Edificio Manuel Ancízar.
              </p>
              <div className="flex gap-2.5 mt-7 flex-wrap">
                <button className="btn terra">Abrir documento <Icon.External /></button>
                <button className="btn">Citar en BibTeX</button>
                <button className="btn">Compartir</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
