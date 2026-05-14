/* ============================================================
   App shell — routing, theme, tweaks panel
   ============================================================ */

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="top">
          <div>
            <div className="mark">Caminos de Resistencia</div>
            <p className="tag">
              Plataforma de Memoria y Solidaridad Académica.
              Un espacio sentipensante de educación pública, en solidaridad permanente con Palestina.
            </p>

            <div className="footer-logos">
              <div className="footer-logo">
                <div className="lg-mark">UNAL</div>
                <div className="lg-sub">Fac. Derecho<br/>y Ciencias Políticas</div>
              </div>
              <div className="footer-logo">
                <div className="lg-mark">دولة فلسطين</div>
                <div className="lg-sub">Embajada<br/>del Estado de Palestina</div>
              </div>
              <div className="footer-logo">
                <div className="lg-mark">Cátedra</div>
                <div className="lg-sub">Caminos<br/>de Resistencia</div>
              </div>
            </div>
          </div>

          <div>
            <h4>Navegar</h4>
            {PAGES.map(p => (
              <a key={p.id} href="#" onClick={(e) => { e.preventDefault(); setPage(p.id); window.scrollTo({top:0}); }}>{p.label} — {p.sub}</a>
            ))}
          </div>

          <div>
            <h4>Recursos</h4>
            <a href="#">Sílabo · PDF</a>
            <a href="#">Repositorio abierto</a>
            <a href="#">Política editorial</a>
            <a href="#">Licencia · CC BY-NC-SA</a>
          </div>

          <div>
            <h4>Créditos institucionales</h4>
            <a href="#">Universidad Nacional de Colombia</a>
            <a href="#">Facultad de Derecho y CC. PP.</a>
            <a href="#">Embajada del Estado de Palestina</a>
            <a href="#">catedra@unal.edu.co</a>
          </div>
        </div>

        <div className="bot">
          <div>© Universidad Nacional de Colombia · Cátedra Caminos de Resistencia</div>
          <div>CC BY-NC-SA 4.0 · Plataforma de Memoria</div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Tweaks panel
   ============================================================ */
function TweaksUI() {
  const defaults = window.__TWEAK_DEFAULTS;
  const [t, setTweak] = useTweaks(defaults);

  // Apply tweaks live
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.style.setProperty("--terracotta", t.accent);
    document.documentElement.style.setProperty("--terracotta-soft",
      `color-mix(in srgb, ${t.accent} 12%, transparent)`);
    document.documentElement.style.setProperty("--olive", t.olive);
    document.documentElement.style.setProperty("--olive-soft",
      `color-mix(in srgb, ${t.olive} 10%, transparent)`);
    document.body.classList.toggle("grain", !!t.showGrain);
    document.body.classList.toggle("no-motion", !!t.reduceMotion);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Tema">
        <TweakRadio
          label="Modo"
          value={t.theme}
          onChange={(v) => setTweak("theme", v)}
          options={[
            { value: "light", label: "Luz" },
            { value: "dark", label: "Oscuro" },
          ]} />
      </TweakSection>

      <TweakSection label="Color">
        <TweakColor
          label="Acento (terracota)"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#8B1D22", "#C84A56", "#E8B04A", "#5A7F4B"]} />
        <TweakColor
          label="Verde olivo"
          value={t.olive}
          onChange={(v) => setTweak("olive", v)}
          options={["#2E4731", "#1d2f1f", "#3F5D43", "#0E1F12"]} />
      </TweakSection>

      <TweakSection label="Atmósfera">
        <TweakToggle label="Grano sobre la página" value={!!t.showGrain} onChange={(v) => setTweak("showGrain", v)} />
        <TweakToggle label="Reducir animaciones"   value={!!t.reduceMotion} onChange={(v) => setTweak("reduceMotion", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ============================================================
   Root app
   ============================================================ */
function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("cdr-theme") || window.__TWEAK_DEFAULTS.theme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cdr-theme", theme);
  }, [theme]);

  // Apply initial tweaks at boot (so things like grain show before TweaksUI mounts)
  useEffect(() => {
    const d = window.__TWEAK_DEFAULTS;
    document.body.classList.toggle("grain", !!d.showGrain);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [page]);

  // Persist last page in localStorage (useful for refresh during iteration)
  useEffect(() => {
    const saved = localStorage.getItem("cdr-page");
    if (saved && PAGES.find(p => p.id === saved)) setPage(saved);
    // eslint-disable-next-line
  }, []);
  useEffect(() => { localStorage.setItem("cdr-page", page); }, [page]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const PageComp = {
    home: <Home setPage={setPage} />,
    ongs: <ONGs />,
    history: <History />,
    archive: <Archive />,
  }[page];

  return (
    <>
      <Nav page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      <main data-screen-label={`Page ${page}`}>{PageComp}</main>
      <Footer setPage={setPage} />
      <TweaksUI />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
