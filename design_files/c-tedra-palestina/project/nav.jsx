const PAGES = [
  { id: "home",    label: "Inicio",  sub: "El Surco de la Memoria" },
  { id: "ongs",    label: "ONGs",    sub: "Savia y Sumud" },
  { id: "history", label: "Historia", sub: "Raíces Milenarias" },
  { id: "archive", label: "Archivo",  sub: "Cosecha de Saberes" },
];

function Nav({ page, setPage, theme, toggleTheme }) {
  const y = useScrollY();
  const scrolled = y > 24;
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when page changes
  useEffect(() => { setMenuOpen(false); }, [page]);

  return (
    <>
      <div className={"nav-shell " + (scrolled ? "is-scrolled" : "")}>
        <nav className="nav" aria-label="Principal">
          <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setPage("home"); }}>
            <span className="brand-mark" style={{ color: "var(--olive)" }}>
              <OliveMark size={28} />
            </span>
            <span>
              Caminos de Resistencia
              <small>Plataforma de Memoria · UNAL</small>
            </span>
          </a>

          <div className="nav-links" role="tablist">
            {PAGES.map(p => (
              <button key={p.id}
                className={"nav-link " + (page === p.id ? "is-active" : "")}
                onClick={() => setPage(p.id)}
                aria-selected={page === p.id}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="nav-meta">
            <button className="icon-btn" onClick={toggleTheme} title="Alternar tema">
              {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
            </button>
            <button className="nav-cta" onClick={() => setPage("archive")}>
              Explorar el Archivo
              <Icon.Arrow />
            </button>
            <button className="icon-btn nav-burger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
              {menuOpen ? <Icon.Close /> : <Icon.Menu />}
            </button>
          </div>
        </nav>
      </div>

      <div className={"mobile-sheet " + (menuOpen ? "is-open" : "")}>
        {PAGES.map((p, i) => (
          <a key={p.id} href="#" onClick={(e) => { e.preventDefault(); setPage(p.id); }}>
            <span>{p.label}</span>
            <small>0{i+1}</small>
          </a>
        ))}
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button className="btn terra" onClick={() => setPage("archive")}>Explorar el Archivo</button>
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
          </button>
        </div>
      </div>
    </>
  );
}

window.Nav = Nav;
window.PAGES = PAGES;
