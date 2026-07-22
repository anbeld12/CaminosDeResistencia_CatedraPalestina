import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { User, Session } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

async function getSupabase(): Promise<SupabaseClient> {
  const { supabase } = await import('./supabase');
  return supabase;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

let supabaseInstance: SupabaseClient | null = null;

async function ensureSupabase(): Promise<SupabaseClient> {
  if (!supabaseInstance) {
    supabaseInstance = await getSupabase();
  }
  return supabaseInstance;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    let unsub: (() => void) | null = null;

    ensureSupabase().then((sb) => {
      sb.auth.getSession().then(({ data: { session: s } }) => {
        setSession(s);
        setUser(s?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = sb.auth.onAuthStateChange((_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
      });

      unsub = () => subscription.unsubscribe();
    });

    return () => { unsub?.(); };
  }, [isAdmin]);

  const signIn = useCallback(async (email: string, password: string) => {
    const sb = await ensureSupabase();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const sb = await ensureSupabase();
    await sb.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return ctx;
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="font-mono text-xs tracking-[0.14em] uppercase text-fg-mute">Cargando...</div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
