import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../lib/icons';
import type { Project } from '../lib/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const KIND_GLYPH: Record<string, string> = {
  ensayo: 'E', cartografia: 'C', video: 'V', podcast: 'P',
  fanzine: 'F', mural: 'M', collage: 'CL', grabado: 'G',
};

const KIND_LABEL: Record<string, string> = {
  ensayo: 'Leer ensayo', cartografia: 'Explorar mapa', video: 'Ver video',
  podcast: 'Escuchar podcast', fanzine: 'Ver fanzine', mural: 'Ver mural',
  collage: 'Ver collage', grabado: 'Ver grabado',
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-veil"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pm-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            tabIndex={-1}
          >
            <button className="close" onClick={onClose} aria-label="Cerrar">
              <Icon.Close />
            </button>

            <div
              className={'proj-thumb h-[180px] md:h-[220px] mb-5 md:mb-6 ' + (project.thumbnail ? '' : ' kind-' + project.kind)}
              style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              role="img"
              aria-label={`Miniatura de ${project.title}`}
            >
              <div className="kind-num">N° {project.n}</div>
              {!project.thumbnail && (
                <div className="kind-glyph">{KIND_GLYPH[project.kind] || project.kind.toUpperCase()}</div>
              )}
            </div>

            <div className="kicker">{project.kind} · {project.year}</div>
            <h2 id="pm-title" className="mt-3 text-[clamp(22px,6vw,36px)] leading-tight">{project.title}</h2>
            <div className="text-fg-mute mt-2 text-base md:text-sm">{project.author}</div>

            {project.group && (
              <div className="mt-3 font-mono text-xs tracking-[0.12em] uppercase text-accent">{project.group}</div>
            )}

            <p className="mt-4 md:mt-5 text-fg-mute text-base leading-relaxed">
              {project.description || 'Proyecto desarrollado en el marco del módulo final de la cátedra.'}
            </p>

            {project.members && project.members.length > 0 && (
              <div className="mt-4">
                <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-fg-mute mb-1.5">Integrantes</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg-mute">
                  {project.members.map((m, i) => (
                    <span key={i}>{m}{i < project.members!.length - 1 ? ' · ' : ''}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2.5 mt-6 flex-wrap">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn terra">
                  {KIND_LABEL[project.kind] || 'Abrir documento'}
                </a>
              ) : (
                <button className="btn" disabled>Próximamente</button>
              )}
              <Link to="/archivo" className="btn" onClick={onClose}>
                Ver en Archivo <Icon.Arrow />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
