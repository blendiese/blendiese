import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function fetchPAT() {
  const { data, error } = await supabase
    .from("github_token_headers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  return {
    data,
    error,
  };
}
