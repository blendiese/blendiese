// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import fetchGithubArguments from "./queries/fetch-github-arguments.ts";
import fetchGithubPullRequests from "./queries/fetch-github-pull-requests.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { aggregateStats } from "./stats/aggregator.ts";

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { data: githubData, error: githubDataError } =
    await fetchGithubArguments(
      req,
    );

  if (!githubData || githubDataError) {
    return new Response(
      githubDataError?.message ?? "",
      {
        status: githubDataError?.status ?? 500,
      },
    );
  }

  const pullRequests = await fetchGithubPullRequests(
    githubData.users,
    githubData.repositories,
    githubData.token,
  );

  const aggregatedStats = aggregateStats(pullRequests);

  return new Response(
    JSON.stringify(aggregatedStats),
    { headers: { "Content-Type": "application/json", ...corsHeaders } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
