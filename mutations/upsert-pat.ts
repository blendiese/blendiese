import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function upsertPAT(token: string) {
  await supabase.rpc("upsert_github_token", { token });
}
