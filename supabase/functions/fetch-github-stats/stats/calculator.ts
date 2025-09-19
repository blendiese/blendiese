import { PullRequestStat } from "../types/pull-request-stat.ts";
import { PullRequest } from "../types/pull-request.ts";

export const calculateStatsForPullRequest = (pullRequest: PullRequest) => {
  const mergedAt = new Date(pullRequest.mergedAt).getTime();
  const createdAt = new Date(pullRequest.createdAt).getTime();
  const firstCommitAuthoredAt = new Date(
    pullRequest.commits.nodes[0].commit.authoredDate,
  ).getTime();
  const firstReviewedAt = pullRequest.reviews.nodes.length > 0
    ? new Date(
      pullRequest.reviews.nodes[0].createdAt,
    ).getTime()
    : null;

  const deployCompletedAt = Math.max(
    ...pullRequest.mergeCommit.statusCheckRollup.contexts.nodes.map((n) =>
      n.__typename === "CheckRun"
        ? new Date(n.completedAt).getTime()
        : new Date(n.createdAt).getTime()
    ),
  );

  return {
    mergeTime: mergedAt - firstCommitAuthoredAt,
    reviewTime: firstReviewedAt ? firstReviewedAt - createdAt : 0,
    numberOfFileChanges: pullRequest.changedFiles,
    numberOfCommits: pullRequest.commits.totalCount,
    changedLinesOfCodeCount: pullRequest.additions + pullRequest.deletions,
    deployTime: deployCompletedAt - mergedAt,
  } as PullRequestStat;
};
