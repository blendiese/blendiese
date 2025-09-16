import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function getGithubRepositories() {
  const { data, error } = await supabase
    .from("github_repositories")
    .select("repository_name")
    .order("repository_name", { ascending: true });

  return {
    data: data?.map((repo) => repo.repository_name as string) || [],
    error,
  };
}
