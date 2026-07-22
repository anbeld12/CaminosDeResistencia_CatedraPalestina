import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Reveal } from '../../components/Reveal';
import type { ProjectRow } from '../../types/database';

interface FormData {
  title: string;
  kind: string;
  author: string;
  year: string;
  n: string;
  tags: string;
  description: string;
  url: string;
  urlAlt: string;
  linkLabel: string;
  links: { label: string; url: string }[];
  thumbnail: string;
  aiThumbnail: boolean;
  members: string;
  groupName: string;
}

const INITIAL: FormData = {
  title: '',
  kind: 'ensayo',
  author: '',
  year: '',
  n: '',
  tags: '',
  description: '',
  url: '',
  urlAlt: '',
  linkLabel: '',
  links: [],
  thumbnail: '',
  aiThumbnail: false,
  members: '',
  groupName: '',
};

const KIND_OPTIONS = [
  { value: 'ensayo', label: 'Ensayo' },
  { value: 'cartografia', label: 'Cartografía' },
  { value: 'video', label: 'Video' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'fanzine', label: 'Fanzine' },
  { value: 'mural', label: 'Mural' },
  { value: 'collage', label: 'Collage' },
  { value: 'grabado', label: 'Grabado' },
];

export function AdminProjectForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('projects')
      .select('*')
      .eq('id', Number(id))
      .single()
      .then(({ data: raw, error: err }) => {
        if (err || !raw) {
          navigate('/admin');
          return;
        }
        const data = raw as unknown as ProjectRow;
        setForm({
          title: data.title,
          kind: data.kind,
          author: data.author,
          year: data.year,
          n: data.n,
          tags: (data.tags ?? []).join(', '),
          description: data.description ?? '',
          url: data.url ?? '',
          urlAlt: data.url_alt ?? '',
          linkLabel: data.link_label ?? '',
          links: data.links ?? [],
          thumbnail: data.thumbnail ?? '',
          aiThumbnail: data.ai_thumbnail,
          members: (data.members ?? []).join('\n'),
          groupName: data.group_name ?? '',
        });
      });
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    setForm((prev) => {
      const links = [...prev.links];
      links[index] = { ...links[index], [field]: value };
      return { ...prev, links };
    });
  };

  const handleAddLink = () => {
    setForm((prev) => ({ ...prev, links: [...prev.links, { label: '', url: '' }] }));
  };

  const handleRemoveLink = (index: number) => {
    setForm((prev) => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
  };

  const isValidUrl = (str: string) => !str || str.startsWith('http://') || str.startsWith('https://');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('La imagen no debe superar 5 MB');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      if (!token) { navigate('/admin/login', { replace: true }); return; }

      const sigRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!sigRes.ok) throw new Error('Error al obtener firma de subida');
      const { signature, timestamp, cloudName, apiKey, uploadPreset } = await sigRes.json();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('timestamp', String(timestamp));
      formData.append('signature', signature);
      formData.append('api_key', apiKey);

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!cloudRes.ok) throw new Error('Error al subir imagen a Cloudinary');
      const cloudData = await cloudRes.json();

      setForm((prev) => ({ ...prev, thumbnail: cloudData.secure_url }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Error al subir');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.url && !isValidUrl(form.url)) {
      setError('La URL del proyecto debe comenzar con http:// o https://');
      return;
    }
    if (form.urlAlt && !isValidUrl(form.urlAlt)) {
      setError('La URL alternativa debe comenzar con http:// o https://');
      return;
    }
    if (form.links.some((l) => l.url && !isValidUrl(l.url))) {
      setError('Todas las URLs de enlaces deben comenzar con http:// o https://');
      return;
    }

    setSaving(true);

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      sessionStorage.setItem('cdr-pending-form', JSON.stringify(form));
      navigate('/admin/login', { replace: true });
      return;
    }

    const body = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      members: form.members.split('\n').map((m) => m.trim()).filter(Boolean),
      links: form.links.filter((l) => l.label || l.url),
    };

    const url = isEdit ? `/api/admin/${id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
      sessionStorage.setItem('cdr-pending-form', JSON.stringify(form));
      navigate('/admin/login', { replace: true });
      return;
    }

    if (!res.ok) {
      const err = await res.json();
      setError(err.error ?? 'Error al guardar');
      setSaving(false);
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="section">
      <div className="wrap max-w-2xl">
        <Reveal>
          <div className="eyebrow">Admin</div>
          <h1 className="h1 mt-2">{isEdit ? 'Editar proyecto' : 'Nuevo proyecto'}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Título" name="title" required>
                <input name="title" value={form.title} onChange={handleChange} required className="input" />
              </FormField>
              <FormField label="N° proyecto" name="n" required>
                <input name="n" value={form.n} onChange={handleChange} required className="input" placeholder="01" />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Autor / Grupo" name="author">
                <input name="author" value={form.author} onChange={handleChange} className="input" placeholder="Grupo 1" />
              </FormField>
              <FormField label="Nombre del grupo" name="groupName">
                <input name="groupName" value={form.groupName} onChange={handleChange} className="input" placeholder="Grupo 1" />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Tipo" name="kind">
                <select name="kind" value={form.kind} onChange={handleChange} className="input">
                  {KIND_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Período" name="year" required>
                <input name="year" value={form.year} onChange={handleChange} required className="input" placeholder="2025-I" />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="URL del proyecto" name="url">
                <input name="url" value={form.url} onChange={handleChange} className="input" />
              </FormField>
              <FormField label="URL alternativa" name="urlAlt">
                <input name="urlAlt" value={form.urlAlt} onChange={handleChange} className="input" />
              </FormField>
            </div>

            <FormField label="Etiquetas (separadas por coma)" name="tags">
              <input name="tags" value={form.tags} onChange={handleChange} className="input" placeholder="video, memoria, arte" />
            </FormField>

            <FormField label="Descripción" name="description">
              <textarea name="description" value={form.description} onChange={handleChange} className="input min-h-[100px]" rows={4} />
            </FormField>

            <FormField label="URL de miniatura (Cloudinary)" name="thumbnail">
              <div className="space-y-2">
                <input name="thumbnail" value={form.thumbnail} onChange={handleChange} className="input" placeholder="https://res.cloudinary.com/..." />
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileUpload}
                    className="block w-full text-[11px] text-fg-mute file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-mono file:tracking-[0.12em] file:uppercase file:bg-accent file:text-white file:cursor-pointer hover:file:bg-accent/90 transition-colors"
                  />
                  {uploading && <span className="font-mono text-[10px] tracking-[0.12em] text-fg-mute shrink-0">Subiendo...</span>}
                </div>
                {uploadError && <div className="text-accent text-[11px]">{uploadError}</div>}
              </div>
            </FormField>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="aiThumbnail" checked={form.aiThumbnail} onChange={handleChange} className="w-4 h-4 accent-accent" />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-mute">
                Miniatura generada con IA
              </span>
            </label>

            <FormField label="Etiqueta del enlace" name="linkLabel">
              <input name="linkLabel" value={form.linkLabel} onChange={handleChange} className="input" placeholder="Episodios" />
            </FormField>

            <div>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-mute block mb-2">
                Enlaces adicionales
              </div>
              <div className="space-y-2.5">
                {form.links.map((link, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        placeholder="Etiqueta"
                        value={link.label}
                        onChange={(e) => handleLinkChange(i, 'label', e.target.value)}
                        className="input"
                      />
                      <input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => handleLinkChange(i, 'url', e.target.value)}
                        className="input"
                      />
                    </div>
                    <button type="button" onClick={() => handleRemoveLink(i)}
                      className="mt-0.5 font-mono text-[11px] tracking-[0.12em] uppercase text-accent hover:text-accent/70 transition-colors shrink-0">
                      Eliminar
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddLink}
                  className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-mute hover:text-fg transition-colors">
                  + Añadir enlace
                </button>
              </div>
            </div>

            <FormField label="Integrantes (uno por línea)" name="members">
              <textarea name="members" value={form.members} onChange={handleChange} className="input min-h-[120px]" rows={5} placeholder="Nombre Apellido" />
            </FormField>

            {error && <div className="text-accent text-sm">{error}</div>}

            <div className="flex gap-4">
              <button type="submit" disabled={saving} className="btn terra">
                {saving ? 'Guardando...' : isEdit ? 'Actualizar proyecto' : 'Crear proyecto'}
              </button>
              <button type="button" className="btn" onClick={() => navigate('/admin')}>
                Cancelar
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

function FormField({ label, name, required, children }: { label: string; name: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-mute block mb-1.5">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  );
}
