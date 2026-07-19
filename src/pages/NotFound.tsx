import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Icon } from '../lib/icons';

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada · Cátedra Caminos de Resistencia</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="section min-h-[60vh] flex items-center">
        <div className="wrap text-center">
          <div className="font-mono text-8xl md:text-9xl text-accent/30 font-bold">404</div>
          <h1 className="h1 mt-4">Página no encontrada</h1>
          <p className="mt-4 text-fg-mute max-w-lg mx-auto">
            El camino que buscas no está trazado en este mapa.
          </p>
          <Link to="/" className="btn terra mt-8 inline-flex items-center gap-2">
            <Icon.ArrowLeft /> Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
