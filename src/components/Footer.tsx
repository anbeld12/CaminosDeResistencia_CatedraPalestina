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
            <p className="tag">
              Plataforma de Memoria y Solidaridad Académica.
              Un espacio sentipensante de educación pública, en solidaridad permanente con Palestina.
            </p>
            <div className="footer-logos">
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
          </div>

          <div>
            <h4>Navegar</h4>
            {PAGES.map(p => (
              <a
                key={p.id}
                href="#"
                onClick={(e) => { e.preventDefault(); setPage(p.id as PageId); window.scrollTo({ top: 0 }); }}
              >
                {p.label} — {p.sub}
              </a>
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
