import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./client";

/**
 * Server client that carries the logged-in admin session via cookies.
 * Returns null when env vars are not configured.
 */
export function getSupabaseServerClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  const cookieStore = cookies();
  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: { name: string; options: CookieOptions; value: string }[],
      ) {
        try {
          cookiesToSet.forEach(({ name, options, value }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component where setting cookies is not allowed.
        }
      },
    },
  });
}
