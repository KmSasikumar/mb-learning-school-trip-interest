"use server";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/client";
import { validateInterest } from "@/lib/trips";

export type SubmitState = { error?: string; ok: boolean };

export async function submitInterest(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const input = {
    email: String(formData.get("email") ?? ""),
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    school: String(formData.get("school") ?? ""),
    students: Number(formData.get("students")),
    trip: String(formData.get("trip") ?? ""),
  };
  const error = validateInterest(input);
  if (error) return { error, ok: false };

  const config = getSupabaseConfig();
  if (!config) {
    return {
      error:
        "Database is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then try again.",
      ok: false,
    };
  }
  const supabase = createClient(config.url, config.anonKey);
  const { error: insertError } = await supabase.from("trip_interests").insert({
    email: input.email.trim(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    school: input.school.trim(),
    students: input.students,
    trip: input.trip,
  });
  if (insertError) return { error: insertError.message, ok: false };
  return { ok: true };
}
