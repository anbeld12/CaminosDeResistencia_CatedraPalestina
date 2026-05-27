import { useState } from 'react';
import { Reveal } from './Reveal';
import { MYTHS_DATA } from '../data/myths';

export function MythCards() {
  const [flipped, setFlipped] = useState<string | null>(null);

  const toggle = (id: string) => setFlipped((f) => (f === id ? null : id));

  return (
    <div className="myth-grid">
      {MYTHS_DATA.map((m, idx) => (
        <Reveal
          key={m.id}
          delay={idx % 2 === 1 ? 0.1 : 0}
          className={'myth-card ' + (flipped === m.id ? 'is-flipped' : '')}
          onClick={() => toggle(m.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && toggle(m.id)}
          aria-pressed={flipped === m.id}
          aria-label={'Tarjeta de mito: ' + m.myth}
        >
          <div className="myth-inner">
            {/* FRENTE — El Mito */}
            <div className="myth-face myth-front">
              <span className="myth-label-tag">Mito</span>
              <p className="myth-text">{m.myth}</p>
              <span className="myth-hint" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 3v14M3 10l7 7 7-7" />
                </svg>
                Girar para ver la realidad
              </span>
            </div>

            {/* REVERSO — La Realidad */}
            <div className="myth-face myth-back">
              <span className="myth-reality-tag">Realidad</span>
              <p className="myth-reality-text">{m.reality}</p>
              <div className="myth-sources">
                <div className="myth-sources-hd">
                  <svg viewBox="0 0 20 20" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h12v12H4zM8 8h4M8 12h4M8 4v4" />
                  </svg>
                  Fuentes
                </div>
                {m.sources.map((s, i) => (
                  <div key={i} className="myth-source-item">{s}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
