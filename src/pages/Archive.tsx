import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Icon } from '../lib/icons';
import { BIBLIOGRAPHY, KIND_FILTERS, KIND_GLYPH, PROJECTS } from '../data/archive';
import type { Project } from '../lib/types';

/* ============================================================
   Kind chip color map
   ============================================================ */
const KIND_CHIP_CLASS: Record<string, string> = {
  ensayo: 'kind-ensayo',
  cartografia: 'kind-cartografia',
  video: 'kind-video',
  podcast: 'kind-podcast',
  fanzine: 'kind-fanzine',
  mural: 'kind-mural',
  collage: 'kind-collage',
  grabado: 'kind-grabado',
};

/* ============================================================
   APA 7 citation helpers
   ============================================================ */
function formatAuthorName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return fullName;
  const surname = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map(p => p.charAt(0).toUpperCase() + '.').join(' ');
  return `${surname}, ${initials}`;
}

function generateAPA(p: Project): string {
  const kindLabels: Record<string, string> = {
    ensayo: 'Ensayo académico',
    cartografia: 'Cartografía',
    video: 'Video',
    podcast: 'Podcast',
    fanzine: 'Fanzine',
    mural: 'Mural',
    collage: 'Collage',
    grabado: 'Grabado',
  };

  const kindLabel = kindLabels[p.kind] || p.kind;

  const authors = (() => {
    if (p.members && p.members.length > 0) {
      const formatted = p.members.map(formatAuthorName);
      if (formatted.length <= 5) return formatted.join(', ');
      return formatted.slice(0, 5).join(', ') + ', et al.';
    }
    return p.author;
  })();

  const url = p.url ? ` ${p.url}` : '';

  return `${authors} (${p.year}). ${p.title} [${kindLabel}]. Cátedra Caminos de Resistencia, Universidad Nacional de Colombia.${url}`;
}

interface ProjectCardProps {
  p: Project;
  onOpen: (p: Project) => void;
  variant: 'grid' | 'list';
}

function ProjectCard({ p, onOpen, variant }: ProjectCardProps) {
  const thumbBg = p.thumbnail ? { backgroundImage: `url(${p.thumbnail})`, backgroundSize: 'cover' as const, backgroundPosition: 'center' as const } : undefined;
  if (variant === 'list') {
    return (
      <Reveal as="article" className="proj-row" onClick={() => onOpen(p)}>
        <div className={'proj-thumb' + (p.thumbnail ? '' : ' kind-' + p.kind)} style={thumbBg}>
          <div className="kind-num">N° {p.n}</div>
          {!p.thumbnail && <div className="kind-glyph">{KIND_GLYPH[p.kind]}</div>}
          {p.aiThumbnail && <div className="absolute top-1.5 left-1.5 z-10 font-mono text-[8px] md:text-[9px] tracking-[0.12em] uppercase bg-black/50 backdrop-blur-sm text-white/80 px-1.5 py-0.5 rounded-sm">AI · ref.</div>}
        </div>
        <div className="proj-body">
          <h4>{p.title}</h4>
          <div className="proj-meta">{p.author} · {p.year} · <span className="text-accent">{p.kind.toUpperCase()}</span></div>
        </div>
        <span className={'proj-kind-chip ' + KIND_CHIP_CLASS[p.kind]}>{p.kind.toUpperCase()}</span>
        <span className="proj-arrow">→</span>
      </Reveal>
    );
  }
  return (
    <Reveal as="article" className="proj" onClick={() => onOpen(p)}>
      <div className={'proj-thumb' + (p.thumbnail ? '' : ' kind-' + p.kind)} style={thumbBg}>
        <div className="kind-num">N° {p.n}</div>
        {!p.thumbnail && <div className="kind-glyph">{KIND_GLYPH[p.kind]}</div>}
        {p.aiThumbnail && <div className="absolute top-1.5 left-1.5 z-10 font-mono text-[8px] md:text-[9px] tracking-[0.12em] uppercase bg-black/50 backdrop-blur-sm text-white/80 px-1.5 py-0.5 rounded-sm">AI · ref.</div>}
      </div>
      <div className="meta">
        <span className="text-accent">{p.kind.toUpperCase()}</span>
        <span>· {p.year}</span>
      </div>
      <h4>{p.title}</h4>
      <div className="author">{p.author}</div>
      <div className="proj-foot">
        <span>{p.tags.join(' · ')}</span>
        <span className="text-accent">Abrir ↗</span>
      </div>
    </Reveal>
  );
}

export function Archive() {
  const [tab, setTab] = useState<'projects' | 'biblio'>('projects');
  const [kind, setKind] = useState<string>('all');
  const [semester, setSemester] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [query, setQuery] = useState('');
  const [openProj, setOpenProj] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [expandedLinks, setExpandedLinks] = useState(false);

  useEffect(() => { setExpandedLinks(false); }, [openProj]);

  const semesters = useMemo(() => {
    const s = new Set(PROJECTS.map(p => p.year));
    return Array.from(s).sort().reverse();
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter(p =>
      (kind === 'all' || p.kind === kind) &&
      (semester === 'all' || p.year === semester) &&
      (!query || (p.title + ' ' + p.author + ' ' + p.tags.join(' ')).toLowerCase().includes(query.toLowerCase()))
    );
  }, [kind, semester, query]);

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
                Ensayos, cartografías, murales, fanzines, grabados, capítulos sonoros y videos
                producidos por estudiantes de la cátedra. Más una biblioteca curada que nombra de dónde venimos.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="mt-6 flex items-start gap-2.5">
              <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-[var(--terracotta)]" />
              <p className="font-mono text-[10px] md:text-[10.5px] tracking-[0.06em] text-fg-mute leading-relaxed">
                Algunas miniaturas fueron generadas con inteligencia artificial como recurso pedagógico y pueden contener imprecisiones históricas o geográficas. Esta página es producto de una actividad académica.
              </p>
            </div>
          </Reveal>

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
                  <button
                    className={'chip ' + (semester === 'all' ? 'is-on' : '')}
                    onClick={() => setSemester('all')}
                  >
                    Todos
                  </button>
                  {semesters.map(s => (
                    <button
                      key={s}
                      className={'chip ' + (semester === s ? 'is-on' : '')}
                      onClick={() => setSemester(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
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
                  <div className="viewtoggle">
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
              <div className={view === 'grid' ? 'archive-grid' : ''}>
                {filtered.map(p => (
                  <ProjectCard key={p.id} p={p} onOpen={setOpenProj} variant={view} />
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
              <div className={'proj-thumb' + (openProj.thumbnail ? '' : ' kind-' + openProj.kind)} style={{ height: 220, marginBottom: 28, backgroundImage: openProj.thumbnail ? 'url(' + openProj.thumbnail + ')' : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="kind-num">N° {openProj.n}</div>
                {!openProj.thumbnail && <div className="kind-glyph">{KIND_GLYPH[openProj.kind] || openProj.kind.toUpperCase()}</div>}
                {openProj.aiThumbnail && <div className="absolute top-2 left-2 z-10 font-mono text-[9px] tracking-[0.12em] uppercase bg-black/50 backdrop-blur-sm text-white/80 px-1.5 py-0.5 rounded-sm">AI · ref.</div>}
              </div>
              <div className="kicker">{openProj.kind} · {openProj.year}</div>
              <h2 className="mt-3 text-[clamp(26px,7vw,44px)] leading-tight">{openProj.title}</h2>
              <div className="text-fg-mute mt-2.5 text-base md:text-sm">{openProj.author}</div>

              {openProj.group && (
                <div className="mt-3 font-mono text-xs tracking-[0.12em] uppercase text-accent">{openProj.group}</div>
              )}

              <p className="mt-5 md:mt-6 text-fg-mute text-base leading-relaxed">
                {openProj.description
                  ? openProj.description
                  : 'Proyecto desarrollado en el marco del módulo final de la cátedra. La versión completa puede consultarse en los archivos de la Cátedra Caminos de Resistencia.'}
              </p>

              {openProj.members && openProj.members.length > 0 && (
                <div className="mt-5">
                  <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-mute mb-2">Integrantes</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg-mute">
                    {openProj.members.map((m, i) => (
                      <span key={i}>{m}{i < openProj.members!.length - 1 ? '·' : ''}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2.5 mt-7 flex-wrap">
                {openProj.links && openProj.links.length > 0 && openProj.linkLabel ? (
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <button className="btn terra" onClick={() => setExpandedLinks(!expandedLinks)}>
                        {openProj.linkLabel}
                        <span className={'inline-block transition-transform duration-200 ' + (expandedLinks ? 'rotate-180' : '')}>▾</span>
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          navigator.clipboard.writeText(generateAPA(openProj));
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2200);
                        }}
                      >
                        {copied ? 'Copiado ✓' : 'Copiar cita APA'}
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {expandedLinks && (
                        <motion.div
                          className="flex flex-col overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="border border-[var(--line)] rounded-xl divide-y divide-[var(--line)] overflow-hidden">
                            {openProj.links.map((l, i) => (
                              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                                 className="flex items-center gap-2 justify-between w-full text-left p-3 md:px-4 text-sm text-fg-mute hover:text-fg hover:bg-[var(--olive-soft)] transition-colors">
                                {l.label}
                                <span className="shrink-0 text-fg-mute"><Icon.External /></span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : openProj.links && openProj.links.length > 0 ? (
                  <>
                    {openProj.links.map((l, i) => (
                      <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className={'btn' + (i === 0 ? ' terra' : '')}>
                        {l.label} <Icon.External />
                      </a>
                    ))}
                    <button
                      className="btn"
                      onClick={() => {
                        navigator.clipboard.writeText(generateAPA(openProj));
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2200);
                      }}
                    >
                      {copied ? 'Copiado ✓' : 'Copiar cita APA'}
                    </button>
                  </>
                ) : openProj.url ? (
                  <>
                    <a href={openProj.url} target="_blank" rel="noopener noreferrer" className="btn terra">
                      {({ ensayo: 'Leer ensayo', cartografia: 'Explorar mapa', video: 'Ver video', podcast: 'Escuchar podcast', fanzine: 'Ver fanzine', mural: 'Ver mural', collage: 'Ver collage', grabado: 'Ver grabado' } as Record<string, string>)[openProj.kind] || 'Abrir documento'} <Icon.External />
                    </a>
                    {openProj.urlAlt && (
                      <a href={openProj.urlAlt} target="_blank" rel="noopener noreferrer" className="btn">
                        Ver transcripción <Icon.External />
                      </a>
                    )}
                    <button
                      className="btn"
                      onClick={() => {
                        navigator.clipboard.writeText(generateAPA(openProj));
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2200);
                      }}
                    >
                      {copied ? 'Copiado ✓' : 'Copiar cita APA'}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn" disabled>Próximamente</button>
                    <button
                      className="btn"
                      onClick={() => {
                        navigator.clipboard.writeText(generateAPA(openProj));
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2200);
                      }}
                    >
                      {copied ? 'Copiado ✓' : 'Copiar cita APA'}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
