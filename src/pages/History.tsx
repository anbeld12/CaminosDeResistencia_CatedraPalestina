import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { MythCards } from '../components/MythCards';
import { Icon } from '../lib/icons';
import { ImageSlot } from '../components/ImageSlot';
import { TIMELINE, GLOSSARY } from '../data/history';
import { PROJECTS_2025_1 } from '../data/projects-2025-1';

export function History() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    if (window.innerWidth < 820) return;
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (dir: number) => {
    if (window.innerWidth < 820) return;
    railRef.current?.scrollBy({ left: dir * 384, behavior: 'smooth' });
  };

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" /><span>Página 03 · Historia</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4">
                  Raíces<br />
                  <em className="italic text-accent">milenarias</em>
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="lede">
                Una línea histórica que se lee en horizontal, como un olivar:
                las raíces no aparecen primero, pero son lo que sostiene la copa.
                <br /><br />
                <strong>Desplázate hacia la derecha.</strong>
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ============ TIMELINE ============ */}
      <section className="section pt-0">
        <div className="timeline-rail" ref={railRef}>
          <div className="timeline-track">
            {TIMELINE.map((t, i) => (
              <div key={i} className={'tl-node ' + (t.major ? 'is-major' : '')}>
                <div className={'tl-year ' + (t.major ? 'is-terra' : '')}>{t.year}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-body">{t.body}</div>
                <div className="tl-meta">
                  {t.tags.map((tg, j) => <span key={j}>{tg}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap">
          <div className="timeline-controls">
            <div className="flex gap-2">
              <button className="icon-btn" onClick={() => scroll(-1)} aria-label="Anterior">
                <Icon.ArrowLeft />
              </button>
              <button className="icon-btn" onClick={() => scroll(1)} aria-label="Siguiente">
                <Icon.Arrow />
              </button>
            </div>
            <div className="timeline-progress">
              <span style={{ width: `${Math.max(progress * 100, 8)}%` }} />
            </div>
            <div className="font-mono text-xs md:text-[11px] tracking-[0.14em] uppercase text-fg-mute min-w-[72px] md:min-w-[80px] text-right">
              {Math.round(progress * 100)}% leído
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAP CALLOUT ============ */}
      <section className="section bg-[var(--bg-warm)]">
        <div className="wrap">
          <div className="grid-2">
            <Reveal>
              <div className="eyebrow"><span className="dot" /><span>Cartografía del despojo · 1947 → hoy</span></div>
              <h2 className="mt-5 text-[clamp(28px,7vw,56px)] leading-tight">
                La geografía <em className="text-accent italic">—también—</em> se desplaza.
              </h2>
              <p className="mt-4 text-fg-mute text-base leading-relaxed max-w-full md:max-w-[48ch]">
                Cuatro mapas leídos juntos cuentan la historia sin necesidad de palabras: el territorio
                palestino bajo el Mandato Británico, el Plan de Partición de la ONU, el armisticio de 1949,
                y la fragmentación posterior a Oslo. La superficie verde se contrae como una hoja seca.
              </p>
            </Reveal>
            <ImageSlot height={420} label="Cuatro mapas comparativos · contraste cromático verde/negro" variant="terra" className="has-grain" />
          </div>
        </div>
      </section>

      {/* ============ MITOS VS. REALIDAD ============ */}
      <section className="section">
        <div className="wrap">
          <div className="myth-section-head">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" /><span>Mitos vs. Realidad</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5">
                  Cuatro mitos<br />
                  <em className="text-accent italic">—que no resisten</em><br />
                  los archivos
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="text-fg-mute text-base leading-relaxed max-w-[44ch]">
                El relato hegemónico sobre Palestina descansa en una serie de afirmaciones
                repetidas como hechos. Interactúa con cada tarjeta para confrontarlas
                con la evidencia documental.
              </p>
            </Reveal>
          </div>
          <MythCards />
        </div>
      </section>

      {/* ============ GLOSSARY ============ */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow mb-5">
              <span className="dot" /><span>Glosario crítico · pulsa para abrir</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-10">
              Tres palabras <em className="text-accent italic">—que</em> conviene leer despacio
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glossary">
              {GLOSSARY.map((g, i) => (
                <div
                  key={i}
                  className={'gloss-item ' + (open === i ? 'is-open' : '')}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <div className="term">
                    <span>{g.term}</span>
                    <span className="arrow">{open === i ? '—' : '↗'}</span>
                  </div>
                  <div className="author">{g.author}</div>
                  <div className="def">{g.def}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ RECURSOS ESTUDIANTILES ============ */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="hr-rule mb-10">
              <span>Recursos elaborados por estudiantes 2025-I</span>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 28,
                title: 'Línea de Tiempo: Territorio Palestino',
                body: 'Línea de tiempo física de 3 pliegos que recorre la historia del territorio palestino desde las civilizaciones cananeas (3500 a.C.) hasta la época contemporánea. Incluye un código QR con versión interactiva.',
                group: 'Grupo 3',
              },
              {
                id: 38,
                title: 'Galería multimedia en tres formatos',
                body: 'Tres estaciones —Gaza, Jerusalén Este y Cisjordania— con fotografías, narrativas de vida y poemas de autoría palestina que documentan el genocidio en tiempo y espacio.',
                group: 'Grupo 14',
              },
              {
                id: 29,
                title: 'Podcast Voces Palestina',
                body: 'Ep. 1: Introducción histórica y Ep. 2: Vida cotidiana bajo ocupación. Serie completa de 4 episodios del Grupo 13.',
                group: 'Grupo 13',
              },
            ].map(({ id, title, body, group }, i) => {
              const proj = PROJECTS_2025_1.find(p => p.id === id);
              return (
                <Reveal key={id} as="article" delay={i * 0.08}>
                  <div className="card">
                    <div className="kicker">{group}</div>
                    <h3 className="mt-2 text-[clamp(18px,1.8vw,22px)] font-serif leading-tight">
                      {title}
                    </h3>
                    <p className="mt-2 text-fg-mute text-sm leading-relaxed">{body}</p>
                    <div className="mt-4">
                      <a
                        href={proj?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn terra"
                      >
                        Ver recurso <Icon.External />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ READING NOTE ============ */}
      <section className="section pt-6">
        <div className="wrap">
          <Reveal className="reading-note">
            <div>
              <div className="font-mono text-xs md:text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--on-dark-mute)' }}>
                Nota de método
              </div>
              <p className="font-serif text-[clamp(20px,5.5vw,28px)] mt-3 leading-snug max-w-full md:max-w-[44ch]">
                Las fechas no son la historia. Son la cuadrícula que permite distinguir
                una continuidad de una novedad — y abre la pregunta verdadera: <em>¿quién?</em>
              </p>
            </div>
            <button className="btn terra whitespace-nowrap">
              Descargar PDF · 24 pp
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
