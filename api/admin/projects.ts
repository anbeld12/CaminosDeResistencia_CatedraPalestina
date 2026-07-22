import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const VALID_KINDS = [
  'ensayo', 'cartografia', 'video', 'podcast',
  'fanzine', 'mural', 'collage', 'grabado',
] as const;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const body = req.body;

  if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }
  if (!body.kind || !VALID_KINDS.includes(body.kind)) {
    return res.status(400).json({ error: 'Tipo de proyecto inválido' });
  }
  if (!body.year || typeof body.year !== 'string') {
    return res.status(400).json({ error: 'El año/período es obligatorio' });
  }
  if (!body.n || typeof body.n !== 'string') {
    return res.status(400).json({ error: 'El número de proyecto es obligatorio' });
  }

  const { data, error: insertError } = await supabase
    .from('projects')
    .insert({
      kind: body.kind,
      title: body.title.trim(),
      author: body.author?.trim() ?? '',
      year: body.year,
      n: body.n,
      tags: Array.isArray(body.tags) ? body.tags : [],
      description: body.description?.trim() ?? null,
      url: body.url?.trim() ?? null,
      url_alt: body.urlAlt?.trim() ?? null,
      links: Array.isArray(body.links) ? body.links : [],
      link_label: body.linkLabel?.trim() ?? null,
      thumbnail: body.thumbnail?.trim() ?? null,
      ai_thumbnail: !!body.aiThumbnail,
      members: Array.isArray(body.members) ? body.members : [],
      group_name: body.groupName?.trim() ?? null,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Insert error:', insertError);
    return res.status(500).json({ error: 'Error al crear el proyecto' });
  }

  return res.status(201).json(data);
}
