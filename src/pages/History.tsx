import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../lib/hooks';
import { Icon } from '../lib/icons';
import { ImageSlot } from '../components/ImageSlot';

const TIMELINE = [
  { year: '1917', title: 'Declaración Balfour', body: 'El Reino Unido promete, en una carta de 67 palabras, un "hogar nacional para el pueblo judío" en un territorio que no le pertenecía y donde el 90% de la población era árabe.', tags: ['Imperio', 'Carta'], major: false },
  { year: '1947', title: 'Plan de Partición · ONU', body: 'La Resolución 181 reparte la Palestina histórica: 55% para el 33% de la población. La Liga Árabe la rechaza. La cuenta regresiva comienza.', tags: ['ONU', 'Reparto'], major: false },
  { year: '1948', title: 'La Nakba — "la catástrofe"', body: 'Más de 750.000 palestinas y palestinos expulsados; 530 aldeas destruidas. El 90% de la población árabe es desplazada del territorio que se convierte en Israel.', tags: ['Nakba', 'Despojo'], major: true },
  { year: '1967', title: 'Guerra de los Seis Días', body: 'Israel ocupa Cisjordania, Gaza, Jerusalén Este, los Altos del Golán y el Sinaí. Comienza la ocupación militar — que sigue, hoy, como el "temporal" más largo de la historia contemporánea.', tags: ['Ocupación', '1967'], major: true },
  { year: '1987', title: 'Primera Intifada', body: 'Levantamiento popular masivo. Niños con piedras, huelgas generales, comités de barrio. Una generación entera pasa a llamarse — sin metáfora — "la generación de las piedras".', tags: ['Intifada'], major: false },
  { year: '1993', title: 'Acuerdos de Oslo', body: 'Reconocimiento mutuo y promesa de Estado palestino en cinco años. Treinta y tres años después, el mapa de los asentamientos hace inviable la geografía prometida.', tags: ['Oslo', 'Promesa rota'], major: false },
  { year: '2007', title: 'Bloqueo de Gaza', body: 'Tras la victoria electoral de Hamás, Israel impone un cierre que dura — al momento de esta cátedra — diecinueve años. Gaza queda definida desde entonces como "espacio sin salida".', tags: ['Bloqueo'], major: false },
  { year: '2024', title: 'Opinión de la CIJ', body: 'La Corte Internacional de Justicia declara ilegal la ocupación israelí del territorio palestino y exige su fin "lo antes posible". Por primera vez, la ilegalidad queda nombrada en latín jurídico.', tags: ['CIJ', 'Derecho'], major: true },
  { year: '2026', title: 'Cátedra Caminos de Resistencia', body: 'La UNAL abre la primera cátedra colombiana dedicada íntegramente al caso palestino — leído desde el sur global y la pedagogía sentipensante.', tags: ['UNAL', 'Aula'], major: false },
];

const GLOSSARY = [
  { term: 'Transfer', author: 'Nur Masalha', def: 'Concepto que designa la transferencia poblacional planeada — no como excepción sino como dispositivo estructural del sionismo político desde sus orígenes. La palabra cortés para un acto que se llama, con menos elegancia, expulsión.' },
  { term: 'Invención de la tierra', author: 'Shlomo Sand', def: 'Argumento histórico que muestra cómo el "pueblo-tierra" es una construcción del siglo XIX y no una continuidad bíblica. Sand desmonta la narrativa que justifica el despojo apelando a un derecho inmemorial.' },
  { term: 'Gaza antes de la historia', author: 'Enzo Traverso', def: 'Operación discursiva que sitúa el inicio del conflicto en el 7 de octubre de 2023, borrando el siglo previo. Traverso llama la atención sobre la amnesia como técnica para volver legítima la violencia presente.' },
];

export function History() {
  useReveal();
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
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
    railRef.current?.scrollBy({ left: dir * 384, behavior: 'smooth' });
  };

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <div className="eyebrow reveal"><span className="dot" /><span>Página 03 · Historia</span></div>
              <h1 className="reveal delay-1" style={{ marginTop: 18 }}>
                Raíces<br />
                <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>milenarias</em>
              </h1>
            </div>
            <div className="reveal delay-2">
              <p className="lede">
                Una línea histórica que se lee en horizontal, como un olivar:
                las raíces no aparecen primero, pero son lo que sostiene la copa.
                <br /><br />
                <strong>Desplázate hacia la derecha.</strong>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ============ TIMELINE ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
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
            <div style={{ display: 'flex', gap: 8 }}>
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
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', minWidth: 80, textAlign: 'right' }}>
              {Math.round(progress * 100)}% leído
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAP CALLOUT ============ */}
      <section className="section" style={{ background: 'var(--bg-warm)' }}>
        <div className="wrap">
          <div className="grid-2">
            <div className="reveal">
              <div className="eyebrow"><span className="dot" /><span>Cartografía del despojo · 1947 → hoy</span></div>
              <h2 style={{ marginTop: 22, fontSize: 'clamp(34px, 4.5vw, 56px)' }}>
                La geografía <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>—también—</em> se desplaza.
              </h2>
              <p style={{ marginTop: 18, color: 'var(--fg-mute)', fontSize: 16, lineHeight: 1.65, maxWidth: '48ch' }}>
                Cuatro mapas leídos juntos cuentan la historia sin necesidad de palabras: el territorio
                palestino bajo el Mandato Británico, el Plan de Partición de la ONU, el armisticio de 1949,
                y la fragmentación posterior a Oslo. La superficie verde se contrae como una hoja seca.
              </p>
            </div>
            <ImageSlot height={420} label="Cuatro mapas comparativos · contraste cromático verde/negro" variant="terra" className="has-grain" />
          </div>
        </div>
      </section>

      {/* ============ GLOSSARY ============ */}
      <section className="section">
        <div className="wrap">
          <div className="eyebrow reveal" style={{ marginBottom: 22 }}>
            <span className="dot" /><span>Glosario crítico · pulsa para abrir</span>
          </div>
          <h2 className="reveal delay-1" style={{ marginBottom: 40 }}>
            Tres palabras <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>—que</em> conviene leer despacio
          </h2>

          <div className="glossary reveal delay-2">
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
        </div>
      </section>

      {/* ============ READING NOTE ============ */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div style={{
            padding: '44px 48px',
            background: 'var(--olive)',
            color: '#f1ede0',
            borderRadius: 20,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 32, alignItems: 'center',
          }} className="reveal">
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(241,237,224,0.7)' }}>
                Nota de método
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.5vw, 28px)', marginTop: 12, lineHeight: 1.25, maxWidth: '44ch' }}>
                Las fechas no son la historia. Son la cuadrícula que permite distinguir
                una continuidad de una novedad — y abre la pregunta verdadera: <em>¿quién?</em>
              </p>
            </div>
            <button className="btn terra" style={{ whiteSpace: 'nowrap' }}>
              Descargar PDF · 24 pp
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
