import { PAGES, type PageId } from '../lib/types';

interface FooterProps {
  setPage: (p: PageId) => void;
}

export function Footer({ setPage }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="top">
          <div>
            <div className="mark">Caminos de Resistencia</div>
            <p className="tag">Plataforma de memoria y solidaridad académica.</p>
          </div>

          <div>
            <h4>Navegación Rápida</h4>
            {PAGES.map(p => (
              <a
                key={p.id}
                href="#"
                onClick={(e) => { e.preventDefault(); setPage(p.id); window.scrollTo(0, 0); }}
              >
                {p.label}
              </a>
            ))}
          </div>

          <div>
            <h4>Respaldo Institucional</h4>
            <ul className="footer-inst">
              <li>Cátedra Caminos de Resistencia</li>
              <li>Facultad de Derecho y Ciencias Políticas</li>
              <li>Universidad Nacional de Colombia</li>
              <li>Embajada del Estado de Palestina en Colombia</li>
            </ul>
          </div>
        </div>

        <div className="footer-brands">
          <div className="footer-logo">
            <div className="lg-mark">UNAL</div>
            <div className="lg-sub">Fac. Derecho<br />y Ciencias Políticas</div>
          </div>
          <div className="footer-logo">
            <div className="lg-mark">دولة فلسطين</div>
            <div className="lg-sub">Embajada<br />del Estado de Palestina</div>
          </div>
          <div className="footer-logo">
            <div className="lg-mark">Cátedra</div>
            <div className="lg-sub">Caminos<br />de Resistencia</div>
          </div>
        </div>

        <div className="bot">
          <div>© 2026 Cátedra Caminos de Resistencia · Universidad Nacional de Colombia</div>
          <div>Desarrollado por Ángel David Beltrán García — Ingeniería de Sistemas</div>
        </div>
      </div>
    </footer>
  );
}
