import { useCallback, useEffect, useRef, useState } from 'react';
import { toProject } from './mapper';
import type { Project } from './types';

async function getSupabase() {
  const { supabase } = await import('./supabase');
  return supabase;
}

const CACHE_KEY = 'cdr-projects-cache';
const CACHE_META_KEY = 'cdr-projects-cache-meta';
const CACHE_VERSION = 2;
const CACHE_TTL = 5 * 60 * 1000;

interface CacheMeta {
  version: number;
  timestamp: number;
}

function loadCache(): Project[] | null {
  try {
    const metaRaw = localStorage.getItem(CACHE_META_KEY);
    if (!metaRaw) return null;
    const meta: CacheMeta = JSON.parse(metaRaw);
    if (meta.version !== CACHE_VERSION) return null;
    if (Date.now() - meta.timestamp > CACHE_TTL) return null;

    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : null;
  } catch {
    return null;
  }
}

function saveCache(projects: Project[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(projects));
    localStorage.setItem(CACHE_META_KEY, JSON.stringify({
      version: CACHE_VERSION,
      timestamp: Date.now(),
    }));
  } catch { /* quota exceeded — ignore */ }
}

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProjects(): UseProjectsResult {
  const [initial] = useState(() => loadCache());
  const [projects, setProjects] = useState<Project[]>(() => initial ?? []);
  const [loading, setLoading] = useState(() => !initial);
  const [error, setError] = useState<string | null>(null);
  const fetchCount = useRef(0);

  const fetch = useCallback(async (force = false) => {
    if (!force) {
      const cached = loadCache();
      if (cached) {
        setProjects(cached);
        setLoading(false);
        return;
      }
    }

    fetchCount.current += 1;
    const currentFetch = fetchCount.current;

    setLoading(true);
    setError(null);

    const sb = await getSupabase();
    const { data, error: err } = await sb
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (currentFetch !== fetchCount.current) return;

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    const mapped = (data ?? []).map(toProject);
    setProjects(mapped);
    saveCache(mapped);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { projects, loading, error, refetch: () => fetch(true) };
}
