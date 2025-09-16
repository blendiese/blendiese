import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function deleteGithubUser(username: string) {
  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  await supabase
    .from("github_users")
    .delete()
    .match({
      username,
      user_id: user?.sub || "",
    });
}
