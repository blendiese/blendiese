import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function insertGithubUser(username: string) {
  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  await supabase.from("github_users").insert({
    username,
    user_id: user?.sub || "",
  });
}
