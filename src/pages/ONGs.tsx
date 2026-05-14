import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { ImageSlot } from '../components/ImageSlot';
import { ONG_CARDS, ONG_PARTNERS, FIELD_STEPS } from '../data/ongs';

type Tab = 'vida' | 'partners' | 'field';

const TABS: { id: Tab; label: string }[] = [
  { id: 'vida',     label: 'Logística de la vida' },
  { id: 'partners', label: 'Aliadas' },
  { id: 'field',    label: 'Trabajo de campo' },
];

export function ONGs() {
  const [tab, setTab] = useState<Tab>('vida');

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <Reveal>
                <div className="eyebrow"><span className="dot" /><span>Página 02 · ONGs</span></div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4">
                  Savia<br />
                  <em className="italic text-accent">y</em> Sumud
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="lede">
                <strong>La resistencia tiene logística.</strong> Esta página mapea
                organizaciones que sostienen el agua, el cuidado y la tierra cuando
                la infraestructura del Estado es —deliberadamente— inviable.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="subtabs">
              {TABS.map(t => (
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

      {tab === 'vida' && (
        <section className="section pt-6">
          <div className="wrap">
            <div className="cards">
              {ONG_CARDS.map((c, i) => (
                <Reveal as="article" key={i} delay={Math.min(i + 1, 3) * 0.08} className={'card ' + c.size}>
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'partners' && (
        <section className="section pt-6">
          <div className="wrap">
            <Reveal>
              <div className="hr-rule mb-6">
                <span>Listado vivo · 06 aliadas</span>
              </div>
            </Reveal>
            <div className="border-t border-[var(--line)]">
              {ONG_PARTNERS.map((p, i) => (
                <Reveal key={i} className="partner-row">
                  <div className="font-mono text-accent text-xs md:text-[11px] tracking-[0.15em]">0{i + 1}</div>
                  <div>
                    <div className="font-serif text-[20px] md:text-[26px] tracking-[-0.015em] leading-tight">{p.name}</div>
                  </div>
                  <div className="partner-city font-mono text-[11px] tracking-[0.14em] uppercase text-fg-mute">{p.city}</div>
                  <div className="partner-focus text-sm text-fg-mute">{p.focus}</div>
                  <div className="partner-since font-mono text-[11px] text-fg-mute tracking-[0.15em] text-right">est. {p.since}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'field' && (
        <section className="section pt-6">
          <div className="wrap">
            <Reveal className="grid-2">
              <div>
                <h2 className="text-[clamp(32px,8vw,64px)] leading-tight">
                  Brigadas <em className="text-accent italic">de</em> cosecha
                </h2>
                <p className="text-fg-mute mt-4 text-base leading-relaxed max-w-full md:max-w-[48ch]">
                  Cada octubre, brigadas internacionales acompañan la cosecha de la aceituna en
                  Cisjordania. Acompañar no es producir — es estar ahí cuando se intenta arrancar el árbol.
                  La presencia es una unidad de medida política.
                </p>
                <div className="mt-7 flex gap-2.5">
                  <button className="btn terra">Cómo unirse</button>
                  <button className="btn">Protocolo · PDF</button>
                </div>
              </div>
              <ImageSlot height={360} label="Brigada en olivar · oct. 2025" />
            </Reveal>

            <div className="h-20" />

            <div className="grid-3">
              {FIELD_STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08} className="px-4 md:px-6 py-6 md:py-7 border-t border-[var(--line)] relative">
                  <div className="font-mono text-accent text-xs md:text-[11px] tracking-[0.15em]">/ {s.n}</div>
                  <h3 className="mt-3">{s.t}</h3>
                  <p className="mt-2.5 text-fg-mute text-base md:text-[14.5px] leading-relaxed">{s.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
