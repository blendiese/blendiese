// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import fetchGithubArguments from "./queries/fetch-github-arguments.ts";
import fetchGithubPullRequests from "./queries/fetch-github-pull-requests.ts";
import { PullRequestStat } from "../../../types/pull-request-stat.ts";
import { calculateStatsForPullRequest } from "./stats/calculator.ts";
import { PullRequest } from "../../../types/pull-request.ts";
import { corsHeaders } from "../_shared/cors.ts";

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

  const prGrouping = pullRequests.reduce<Record<string, PullRequest[]>>(
    (data, pr) => {
      const date = new Date(pr.createdAt).toLocaleDateString("en-CA");

      if (!data[date]) {
        data[date] = [pr];
      } else {
        data[date].push(pr);
      }

      return data;
    },
    {},
  );

  const aggregatedPullRequestStats = Object.keys(prGrouping).map((dateKey) => {
    return {
      [dateKey]: prGrouping[dateKey].reduce<PullRequestStat>(
        (stat, pr, currentIndex) => {
          const currentCount = currentIndex;
          const currentPRStat = calculateStatsForPullRequest(pr);

          return {
            mergeTime:
              ((stat.mergeTime * currentCount + currentPRStat.mergeTime) /
                (currentCount + 1)),
            reviewTime:
              (stat.reviewTime * currentCount + currentPRStat.reviewTime) /
              (currentCount + 1),
            numberOfFileChanges: (stat.numberOfFileChanges * currentCount +
              currentPRStat.numberOfFileChanges) /
              (currentCount + 1),
            numberOfCommits: (stat.numberOfCommits * currentCount +
              currentPRStat.numberOfCommits) /
              (currentCount + 1),
            changedLinesOfCodeCount:
              (stat.changedLinesOfCodeCount * currentCount +
                currentPRStat.changedLinesOfCodeCount) /
              (currentCount + 1),
            deployTime:
              ((stat.deployTime * currentCount + currentPRStat.deployTime) /
                (currentCount + 1)),
          };
        },
        {
          mergeTime: 0,
          reviewTime: 0,
          numberOfFileChanges: 0,
          numberOfCommits: 0,
          changedLinesOfCodeCount: 0,
          deployTime: 0,
        },
      ),
    };
  }).sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));

  return new Response(
    JSON.stringify(aggregatedPullRequestStats),
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
