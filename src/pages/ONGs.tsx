import { useState } from 'react';
import { useReveal } from '../lib/hooks';
import { ImageSlot } from '../components/ImageSlot';

const ONG_CARDS = [
  {
    tag: '/ Agua · Energía',
    title: 'El bloqueo como tecnología',
    body: 'Israel controla el 80% de los acuíferos de la Cisjordania. El combustible es la palanca económica del cerco: cuando falta diésel se apagan incubadoras, plantas desalinizadoras y bombas de aguas residuales — y la geografía cotidiana se contrae.',
    stats: [{ v: '80%', k: 'acuíferos controlados' }, { v: '·3 h', k: 'Electricidad / día (Gaza)' }],
    blockade: true,
    img: 'olive' as const,
    label: 'Tanques azules en azoteas · cisterna improvisada',
    size: 's6',
  },
  {
    tag: '/ Salud mental',
    title: 'Curar entre ruinas',
    body: 'Hospitales destruidos donde médicas y residentes siguen atendiendo: el oficio sostenido como forma de resistencia. La OMS contabiliza más de 36 instalaciones sanitarias inutilizadas — pero el turno continúa.',
    stats: [{ v: '36+', k: 'hospitales afectados' }, { v: '1 / 5', k: 'psiquiatras / 100k hab.' }],
    blockade: false,
    img: 'terra' as const,
    label: 'Manos suturando bajo luz de lámpara de bolsillo',
    size: 's6',
  },
  {
    tag: '/ Sumud',
    title: 'Firmeza — cultivar lo que arrancan',
    body: 'Sumud es la palabra árabe para la firmeza testaruda: replantar el olivo arrancado, dormir en la casa demolida, mandar a la niña a la escuela bajo el dron. No es metáfora — es agronomía, urbanismo y pedagogía a la vez.',
    stats: [{ v: '·800K', k: 'olivos arrancados desde 1967' }, { v: '+150', k: 'asentamientos en curso' }],
    blockade: true,
    img: 'olive' as const,
    label: 'Olivo recién plantado entre escombros · tierra removida',
    size: 's12',
  },
];

const ONG_PARTNERS = [
  { name: 'Medical Aid for Palestinians', city: 'Londres', since: '1984', focus: 'Salud comunitaria' },
  { name: 'Al-Haq', city: 'Ramallah', since: '1979', focus: 'Derecho internacional' },
  { name: "B'Tselem", city: 'Jerusalén', since: '1989', focus: 'Documentación' },
  { name: 'PCRF', city: 'Kuwait — Global', since: '1991', focus: 'Niñez y reconstrucción' },
  { name: 'Visualizing Palestine', city: 'Beirut', since: '2012', focus: 'Cartografía de datos' },
  { name: 'Cátedra Edward Said — UNAL', city: 'Bogotá', since: '2024', focus: 'Articulación académica' },
];

type Tab = 'vida' | 'partners' | 'field';

export function ONGs() {
  useReveal();
  const [tab, setTab] = useState<Tab>('vida');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'vida',     label: 'Logística de la vida' },
    { id: 'partners', label: 'Aliadas' },
    { id: 'field',    label: 'Trabajo de campo' },
  ];

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <div className="eyebrow reveal"><span className="dot" /><span>Página 02 · ONGs</span></div>
              <h1 className="reveal delay-1" style={{ marginTop: 18 }}>
                Savia<br />
                <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>y</em> Sumud
              </h1>
            </div>
            <div className="reveal delay-2">
              <p className="lede">
                <strong>La resistencia tiene logística.</strong> Esta página mapea
                organizaciones que sostienen el agua, el cuidado y la tierra cuando
                la infraestructura del Estado es —deliberadamente— inviable.
              </p>
            </div>
          </div>

          <div className="subtabs reveal delay-3">
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
        </div>
      </header>

      {tab === 'vida' && (
        <section className="section" style={{ paddingTop: 24 }}>
          <div className="wrap">
            <div className="cards">
              {ONG_CARDS.map((c, i) => (
                <article key={i} className={'card reveal delay-' + Math.min(i + 1, 3) + ' ' + c.size}>
                  <div className={'card-img ' + (c.img === 'terra' ? 'terra' : '')}>{c.label}</div>
                  <div className="tag">{c.tag}</div>
                  <h3>{c.title}</h3>
                  <p className="body">{c.body}</p>
                  <div className={'stat-strip ' + (c.blockade ? 'is-blockade' : '')}>
                    {c.blockade && <div className="label-row">Datos del Bloqueo</div>}
                    {c.stats.map((s, j) => (
                      <div key={j}>
                        <div className="v">{s.v}</div>
                        <div className="k">{s.k}</div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'partners' && (
        <section className="section" style={{ paddingTop: 24 }}>
          <div className="wrap">
            <div className="hr-rule reveal" style={{ marginBottom: 24 }}>
              <span>Listado vivo · 06 aliadas</span>
            </div>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {ONG_PARTNERS.map((p, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1.6fr 1fr 1fr 80px',
                    gap: 24, alignItems: 'center',
                    padding: '26px 0',
                    borderBottom: '1px solid var(--line)',
                    cursor: 'pointer',
                    transition: 'padding-left .25s ease, color .25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '12px')}
                  onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                >
                  <div style={{ fontFamily: 'var(--mono)', color: 'var(--terracotta)', fontSize: 11, letterSpacing: '.15em' }}>0{i + 1}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 26, letterSpacing: '-0.015em' }}>{p.name}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>{p.city}</div>
                  <div style={{ fontSize: 14, color: 'var(--fg-mute)' }}>{p.focus}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-mute)', letterSpacing: '.15em', textAlign: 'right' }}>est. {p.since}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'field' && (
        <section className="section" style={{ paddingTop: 24 }}>
          <div className="wrap">
            <div className="grid-2 reveal">
              <div>
                <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Brigadas <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>de</em> cosecha
                </h2>
                <p style={{ color: 'var(--fg-mute)', marginTop: 18, fontSize: 16, lineHeight: 1.6, maxWidth: '48ch' }}>
                  Cada octubre, brigadas internacionales acompañan la cosecha de la aceituna en
                  Cisjordania. Acompañar no es producir — es estar ahí cuando se intenta arrancar el árbol.
                  La presencia es una unidad de medida política.
                </p>
                <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
                  <button className="btn terra">Cómo unirse</button>
                  <button className="btn">Protocolo · PDF</button>
                </div>
              </div>
              <ImageSlot height={360} label="Brigada en olivar · oct. 2025" />
            </div>

            <div style={{ height: 80 }} />

            <div className="grid-3">
              {[
                { n: '01', t: 'Solicitud', d: 'Carta de motivación + carné UNAL vigente. Cierre: 30 de agosto.' },
                { n: '02', t: 'Formación', d: 'Tres sesiones obligatorias: contexto, primeros auxilios, derecho humanitario.' },
                { n: '03', t: 'Viaje', d: 'Acompañamiento entre el 6 y el 20 de octubre. Estancia en Beit Sahour.' },
              ].map(s => (
                <div key={s.n} className="reveal" style={{ padding: '28px 24px', borderTop: '1px solid var(--line)', position: 'relative' }}>
                  <div style={{ fontFamily: 'var(--mono)', color: 'var(--terracotta)', fontSize: 11, letterSpacing: '.15em' }}>/ {s.n}</div>
                  <h3 style={{ marginTop: 12 }}>{s.t}</h3>
                  <p style={{ marginTop: 10, color: 'var(--fg-mute)', fontSize: 14.5, lineHeight: 1.6 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
