function Home({ setPage }) {
  useReveal();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true"></div>

        {/* Olive branch decoration top-right */}
        <div className="olive-decor" style={{ top: 110, right: -40, color: "var(--olive)" }} aria-hidden="true">
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" stroke="currentColor" opacity="0.25">
            <path d="M40 280 Q 180 80, 290 30" strokeWidth="1.2"/>
            <ellipse cx="80" cy="240" rx="14" ry="5" transform="rotate(-30 80 240)" fill="currentColor" stroke="none"/>
            <ellipse cx="120" cy="190" rx="14" ry="5" transform="rotate(-40 120 190)" fill="currentColor" stroke="none"/>
            <ellipse cx="160" cy="150" rx="14" ry="5" transform="rotate(-50 160 150)" fill="currentColor" stroke="none"/>
            <ellipse cx="210" cy="100" rx="14" ry="5" transform="rotate(-60 210 100)" fill="currentColor" stroke="none"/>
            <ellipse cx="260" cy="60" rx="14" ry="5" transform="rotate(-70 260 60)" fill="currentColor" stroke="none"/>
          </svg>
        </div>

        <div className="wrap" style={{ width: "100%" }}>
          <div className="hero-meta reveal">
            <div>
              <div className="eyebrow"><span className="dot"></span>Plataforma de Memoria y Solidaridad Académica · UNAL</div>
              <div style={{ marginTop: 14, fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg-mute)", letterSpacing: ".1em" }}>
                Repositorio permanente · Facultad de Derecho y Ciencias Políticas
              </div>
            </div>
            <div style={{ textAlign: "right", maxWidth: 320 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-mute)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 10 }}>
                001 / Inicio
              </div>
              <div style={{ fontSize: 14, color: "var(--fg-mute)" }}>
                Un espacio sentipensante de educación pública desde Colombia, en solidaridad con Palestina.
              </div>
            </div>
          </div>

          <h1 className="hero-title reveal delay-1">
            <span className="neutral">Caminos</span><br />
            <em>de</em> Resistencia
          </h1>

          <div className="hero-foot reveal delay-3">
            <div className="stat">
              <span className="num">VIII</span>
              <span className="lbl">Cohortes · documentadas</span>
            </div>
            <div className="stat">
              <span className="num">9</span>
              <span className="lbl">Facultades · convocantes</span>
            </div>
            <div className="stat">
              <span className="num" style={{ color: "var(--terracotta)" }}>+76</span>
              <span className="lbl">Años · de despojo</span>
            </div>
            <div className="stat">
              <span className="num">∞</span>
              <span className="lbl">Sumud · firmeza</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="quote-section section">
        <div className="wrap">
          <div className="quote-grid">
            <div>
              <div className="eyebrow reveal"><span className="dot"></span>Apertura · Palabra fundacional</div>
              <p className="pull-quote reveal delay-1" style={{ marginTop: 28 }}>
                “Vengo con el <span className="leaf">fusil</span> del combatiente de la libertad en una mano
                y la <span className="leaf">rama de olivo</span> en la otra.
                No dejen que la rama de olivo caiga de mi mano.”
              </p>
              <div className="quote-attrib reveal delay-2">
                — Yasser Arafat &nbsp;·&nbsp; Asamblea General de las Naciones Unidas &nbsp;·&nbsp; 13 · XI · 1974
              </div>
            </div>

            <div className="quote-aside reveal delay-2">
              Cincuenta y dos años después, la rama de olivo sigue pendiente del aire. Esta cátedra
              recoge el gesto: <strong>nombrar lo que ocurre, sostener la memoria, sembrar futuro.</strong>
              <br /><br />
              Un acuerdo público entre estudiantes, docentes y comunidades —dentro y fuera de la universidad— para
              que el aula sea también territorio en disputa.
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION ============ */}
      <section className="section">
        <div className="wrap">
          <div className="mission">
            <div>
              <div className="eyebrow reveal"><span className="dot"></span>Misión</div>
              <div className="reveal delay-1" style={{ marginTop: 28, fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg-mute)" }}>
                / 02 — qué hacemos
              </div>
            </div>

            <div>
              <p className="lede reveal">
                Un espacio educativo <span className="accent">sentipensante</span> de la
                Universidad Nacional de Colombia para fomentar la solidaridad frente al
                exterminio, contra la indiferencia académica y a favor de un saber que
                <em> piensa-con-el-cuerpo</em>.
              </p>

              <ul>
                <li className="reveal delay-1">
                  <span className="n">/ 01</span>
                  <span><b>Investigar</b> con rigor histórico el caso palestino desde las orillas del sur global, sin neutralidades cómplices ni eufemismos académicos.</span>
                </li>
                <li className="reveal delay-2">
                  <span className="n">/ 02</span>
                  <span><b>Documentar</b> la vida cotidiana bajo bloqueo: agua, semillas, hospitales, escuelas — la infraestructura de la firmeza (sumud).</span>
                </li>
                <li className="reveal delay-3">
                  <span className="n">/ 03</span>
                  <span><b>Sembrar</b> redes entre universidades, ONGs, diásporas y comunidades campesinas que reconozcan parentescos de lucha.</span>
                </li>
                <li className="reveal delay-4">
                  <span className="n">/ 04</span>
                  <span><b>Publicar</b> un archivo abierto — bibliografía, ensayos estudiantiles, cartografías, podcast — disponible más allá del aula.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STICKY STORY ============ */}
      <section className="section" style={{ background: "var(--bg-warm)" }}>
        <div className="wrap">
          <div className="eyebrow reveal" style={{ marginBottom: 40 }}>
            <span className="dot"></span>Programa · cuatro estaciones
          </div>

          <div className="sticky-story">
            <div className="stick reveal">
              <div className="story-slot">
                <div className="cap">Raíz de olivo emergiendo entre una geografía cartográfica · alto contraste</div>
              </div>
            </div>

            <div>
              <div className="story-block reveal">
                <div className="kicker">/ Estación 01</div>
                <h3>La memoria como territorio</h3>
                <p>Cómo se construye el relato hegemónico de un despojo. Lectura cruzada de Sand,
                Masalha y Traverso: la invención del Estado, la ingeniería del traslado, el lugar
                de Gaza antes y después de la historia.</p>
              </div>
              <div className="story-block reveal">
                <div className="kicker">/ Estación 02</div>
                <h3>Economía del bloqueo</h3>
                <p>Agua, electricidad, combustible y harina como armas. Mapas operativos de los
                puntos de control, infraestructura humanitaria intervenida y la
                arquitectura del cerco.</p>
              </div>
              <div className="story-block reveal">
                <div className="kicker">/ Estación 03</div>
                <h3>Sumud — la firmeza</h3>
                <p>El cultivo del olivo como acto político. Casas demolidas y reconstruidas.
                Médicas y maestros que sostienen el oficio en hospitales destruidos.
                Resistencia que no se entiende sin cotidianidad.</p>
              </div>
              <div className="story-block reveal">
                <div className="kicker">/ Estación 04</div>
                <h3>Solidaridades del sur</h3>
                <p>Genealogía de los vínculos entre América Latina y Palestina:
                tercermundismo, no alineación, brigadas, exilios y diásporas.
                Cierre con una mesa de diálogo entre comunidades campesinas
                colombianas y delegaciones palestinas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POÉTICA DE LA TIERRA ============ */}
      <section className="poetica section">
        <div className="poetica-bg" aria-hidden="true"></div>
        <div className="wrap">
          <div className="poetica-grid">
            <div>
              <div className="eyebrow reveal" style={{ color: "rgba(241,237,224,0.7)" }}>
                <span className="dot" style={{ background: "#e8b04a" }}></span>Poética de la Tierra · voces
              </div>

              <p className="poetica-quote reveal delay-1">
                “Escribo el <span className="leaf">nombre</span> de mi tierra en el viento,
                <br />pero el viento no sabe que mi tierra<br />
                tiene <span className="leaf">nombre.</span>”
              </p>

              <div className="poetica-attrib reveal delay-2">
                — Mahmoud Darwish &nbsp;·&nbsp; <i>El lecho de una extranjera</i> &nbsp;·&nbsp; 1999
              </div>

              <p className="reveal delay-2" style={{
                marginTop: 36, maxWidth: "46ch",
                color: "rgba(241,237,224,0.78)",
                fontSize: 15, lineHeight: 1.65
              }}>
                Si el ocupante toma la tierra, el poeta nombra la tierra. Si el archivo
                quema, el cantor recuerda. Esta cátedra recoge un cuerpo poético, musical
                y cinematográfico que ha sostenido la palabra <i>Palestina</i> durante
                medio siglo de borradura sistemática.
              </p>
            </div>

            {/* MEDIA STUB — minimal player */}
            <div className="reveal delay-3">
              <div className="media-stub">
                <div className="media-stub-head">
                  <div className="md-dot" />
                  <div style={{ flex: 1 }}>
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
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".15em", color: "rgba(241,237,224,0.55)" }}>
                    Curaduría · Cátedra Caminos de Resistencia
                  </span>
                  <button className="btn-ghost-light">
                    Abrir antología completa <Icon.External />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SIMBOLOGÍA Y RAÍCES ============ */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "end", marginBottom: 56 }} className="simbo-head">
            <div>
              <div className="eyebrow reveal"><span className="dot"></span>Simbología y Raíces</div>
              <h2 className="reveal delay-1" style={{ marginTop: 22 }}>
                Tres objetos<br/>
                <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>—que</em> dicen un pueblo
              </h2>
            </div>
            <p className="reveal delay-2" style={{ color: "var(--fg-mute)", fontSize: 16, lineHeight: 1.6, maxWidth: "44ch" }}>
              Una semiótica popular acompaña a la causa palestina desde 1948.
              Tres signos —el olivo, la llave, la firmeza— operan como
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}> contraseña, herencia y mandato.</strong>
            </p>
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
      <section className="section" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="wrap">
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center",
            padding: "40px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)"
          }} className="reveal">
            <div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
                Esta plataforma <em style={{ color: "var(--terracotta)" }}>permanece.</em>
              </h2>
              <p style={{ marginTop: 12, color: "var(--fg-mute)", maxWidth: "56ch" }}>
                Un archivo público y vivo: lo que la cátedra ha investigado, conversado y publicado
                queda disponible para quien quiera leer, citar o continuarlo.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn terra" onClick={() => setPage("archive")}>
                Explorar el archivo <Icon.Arrow />
              </button>
              <button className="btn" onClick={() => setPage("history")}>
                Conocer la historia
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Símbolo glyphs (abstract, not literal) ---------- */
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

function SimboCard({ n, term, meaning, body, glyph, accent }) {
  return (
    <article className={"simbo-card reveal " + (accent ? "is-accent" : "")}>
      <div className="simbo-card-glyph" aria-hidden="true">{glyph}</div>
      <div className="simbo-card-n">/ {n}</div>
      <h3 className="simbo-card-term">{term}</h3>
      <div className="simbo-card-meaning">{meaning}</div>
      <p className="simbo-card-body">{body}</p>
    </article>
  );
}

window.Home = Home;
