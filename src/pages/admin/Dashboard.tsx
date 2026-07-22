import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { Reveal } from '../../components/Reveal';
import { Plus } from 'lucide-react';
import type { ProjectRow } from '../../types/database';

export function AdminDashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })
      .order('id', { ascending: true });
    if (data) setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`¿Eliminar "${title}"?`)) return;
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) { navigate('/admin/login', { replace: true }); return; }
    const res = await fetch(`/api/admin/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) { navigate('/admin/login', { replace: true }); return; }
    loadProjects();
  };

  return (
    <div className="section">
      <div className="wrap">
        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="eyebrow">Admin</div>
              <h1 className="h1 mt-2">Proyectos</h1>
              <p className="text-fg-mute text-sm mt-1">{projects.length} registros</p>
            </div>
            <div className="flex gap-3">
              <button className="btn terra" onClick={() => navigate('/admin/projects/new')}>
                <Plus size={16} /> Nuevo proyecto
              </button>
              <button className="btn" onClick={signOut}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {loading ? (
            <div className="text-center py-12 text-fg-mute font-mono text-xs tracking-[0.14em] uppercase">
              Cargando...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="font-serif text-3xl">Sin proyectos</div>
              <p className="text-fg-mute text-sm mt-2">Crea el primer proyecto desde el botón superior.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-mute border-b border-[var(--line)]">
                    <th className="text-left py-3 pr-4">N°</th>
                    <th className="text-left py-3 pr-4">Título</th>
                    <th className="text-left py-3 pr-4">Grupo</th>
                    <th className="text-left py-3 pr-4">Tipo</th>
                    <th className="text-left py-3 pr-4">Período</th>
                    <th className="text-right py-3 pl-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} className="border-b border-[var(--line)] hover:bg-[var(--olive-soft)]/30 transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs">{p.n}</td>
                      <td className="py-3 pr-4 font-medium max-w-xs truncate">{p.title}</td>
                      <td className="py-3 pr-4 text-fg-mute">{p.group_name ?? '—'}</td>
                      <td className="py-3 pr-4">
                        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-accent">{p.kind}</span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs">{p.year}</td>
                      <td className="py-3 pl-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-mute hover:text-fg transition-colors"
                            onClick={() => navigate(`/admin/projects/${p.id}/edit`)}
                          >
                            Editar
                          </button>
                          <button
                            className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent hover:text-accent/70 transition-colors"
                            onClick={() => handleDelete(p.id, p.title)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
