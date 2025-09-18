import { createClient } from "npm:@supabase/supabase-js";

type Error = {
  message: string;
  status: number;
};

type ReturnType = {
  error: Error | null;
  data: {
    users: string[];
    repositories: string[];
    token: string;
  } | null;
};

export default async (
  request: Request,
): Promise<ReturnType> => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

  const auth = request.headers.get("Authorization");

  if (!auth) {
    return {
      error: {
        message: "Unauthorized",
        status: 401,
      },
      data: null,
    };
  }

  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: request.headers.get("Authorization") || "" },
    },
  });

  const { data: { user }, error } = await supabaseClient.auth
    .getUser();

  if (!user || error) {
    return {
      error: {
        message: "Unauthorized",
        status: 401,
      },
      data: null,
    };
  }

  const { data: tokenData, error: tokenError } = await supabaseClient.rpc(
    "fetch_github_token",
    {
      user_id: user.id,
    },
  );

  if (!tokenData || tokenError) {
    return {
      error: {
        message: "No token found for user",
        status: 404,
      },
      data: null,
    };
  }

  // Fetch the GitHub token for the current user from the "github_tokens" table
  const { data: usersData, error: usersError } = await supabaseClient
    .from("github_users")
    .select("username");

  if (!usersData || usersError) {
    return {
      error: {
        message: "No users found",
        status: 404,
      },
      data: null,
    };
  }

  // Fetch the GitHub token for the current user from the "github_tokens" table
  const { data: repositoriesData, error: repositoriesError } =
    await supabaseClient
      .from("github_repositories")
      .select("repository_name");

  if (!repositoriesData || repositoriesError) {
    return {
      error: {
        message: "No repositories found",
        status: 404,
      },
      data: null,
    };
  }

  return {
    data: {
      token: tokenData[0].token,
      repositories: repositoriesData.map((r) => r.repository_name),
      users: usersData.map((u) => u.username),
    },
    error: null,
  };
};
