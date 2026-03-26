import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ADMIN_EMAILS =
  (import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map((s) => s.trim());

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        if (!supabase) {
          setUser(null);
          return;
        }
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (mounted) setUser(session?.user ?? null);
        supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  const isAdmin = useMemo(() => {
    const email = user?.email || "";
    return email && ADMIN_EMAILS.includes(email);
  }, [user]);

  async function login() {
    if (!supabase) {
      return { ok: false, reason: "missing_env" };
    }
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        return { ok: false, reason: error.message || "auth_error" };
      }
      return { ok: true, data };
    } catch (e) {
      return { ok: false, reason: String(e.message || e) };
    }
  }

  async function logout() {
    if (!supabase) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  }

  const value = { user, loading, login, logout, isAdmin };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
