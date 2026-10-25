import { createClient } from "@supabase/supabase-js";

export function getSupabaseConfig(): {
  anonKey: string;
  url: string;
} | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { anonKey, url };
}

/** Browser / anon client. Returns null when env vars are not configured. */
export function getSupabaseBrowserClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  return createClient(config.url, config.anonKey);
}
