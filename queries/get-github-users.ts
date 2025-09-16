import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function getGithubUsers() {
  const { data, error } = await supabase
    .from("github_users")
    .select("username")
    .order("username", { ascending: true });

  return {
    data: data?.map((user) => user.username as string) || [],
    error,
  };
}
