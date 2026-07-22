import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { getAuthenticatedUser, requireEnv } from '../_shared.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await getAuthenticatedUser(req);
  } catch {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const supabase = createClient(
    requireEnv('VITE_SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_KEY'),
  );

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('semesters')
      .select('*')
      .order('name', { ascending: false });

    if (error) {
      console.error('Error fetching semesters:', error);
      return res.status(500).json({ error: 'Error al obtener semestres' });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'El nombre del semestre es obligatorio' });
    }

    const trimmed = name.trim();

    const { data, error } = await supabase
      .from('semesters')
      .insert({ name: trimmed })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: `El semestre "${trimmed}" ya existe` });
      }
      console.error('Error creating semester:', error);
      return res.status(500).json({ error: 'Error al crear semestre' });
    }

    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const semesterId = Number(id);
    if (Number.isNaN(semesterId)) {
      return res.status(400).json({ error: 'ID debe ser un número' });
    }

    const { data: semester } = await supabase
      .from('semesters')
      .select('name')
      .eq('id', semesterId)
      .single();

    if (!semester) {
      return res.status(404).json({ error: 'Semestre no encontrado' });
    }

    const { count } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('year', semester.name);

    if (count && count > 0) {
      return res.status(409).json({
        error: `No se puede eliminar: ${count} proyecto(s) pertenecen a este semestre`,
      });
    }

    const { error } = await supabase
      .from('semesters')
      .delete()
      .eq('id', semesterId);

    if (error) {
      console.error('Error deleting semester:', error);
      return res.status(500).json({ error: 'Error al eliminar semestre' });
    }

    return res.status(200).json({ message: 'Semestre eliminado', id: semesterId });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
