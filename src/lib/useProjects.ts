import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { toProject } from './mapper';
import type { Project } from './types';

const CACHE_KEY = 'cdr-projects-cache';

function loadCache(): Project[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : null;
  } catch {
    return null;
  }
}

function saveCache(projects: Project[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(projects));
  } catch { /* quota exceeded — ignore */ }
}

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>(() => loadCache() ?? []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (err) {
      setError(err.message);
    } else {
      const mapped = (data ?? []).map(toProject);
      setProjects(mapped);
      saveCache(mapped);
    }

    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { projects, loading, error, refetch: fetch };
}
