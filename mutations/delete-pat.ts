import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function deletePAT(user_id: string) {
  const { error } = await supabase
    .from("github_token_headers")
    .delete()
    .eq("user_id", user_id);

  return { error };
}
