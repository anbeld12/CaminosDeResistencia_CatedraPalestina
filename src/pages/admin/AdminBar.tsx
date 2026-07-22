import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { ArrowLeft, Plus, LogOut, Layers } from 'lucide-react';

export function AdminBar({ onSemestersClick }: { onSemestersClick?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const isDashboard = location.pathname === '/admin';
  const isNew = location.pathname === '/admin/projects/new';
  const isEdit = location.pathname.startsWith('/admin/projects/') && location.pathname.endsWith('/edit');

  return (
    <div className="flex items-center justify-between gap-4 py-3 px-5 rounded-xl border border-[var(--line)] bg-[var(--bg-warm)]">
      <div className="flex items-center gap-3 min-w-0">
        {!isDashboard && (
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-mute hover:text-accent transition-colors shrink-0"
          >
            <ArrowLeft size={14} />
            Proyectos
          </button>
        )}
        <span className="hidden sm:block w-px h-5 bg-[var(--line)]" />
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg truncate">
          {isDashboard && 'Proyectos'}
          {isNew && 'Nuevo proyecto'}
          {isEdit && 'Editar proyecto'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {isDashboard && (
          <>
            <button
              onClick={onSemestersClick}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-mute hover:text-accent transition-colors"
            >
              <Layers size={14} />
              Semestres
            </button>
            <button
              onClick={() => navigate('/admin/projects/new')}
              className="btn terra"
              style={{ padding: '7px 14px', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--mono)' }}
            >
              <Plus size={14} />
              Nuevo
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-fg-mute hover:text-accent transition-colors"
            >
              <LogOut size={14} />
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
