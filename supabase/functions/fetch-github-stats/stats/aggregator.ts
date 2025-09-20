import { PullRequestStat } from "../../../../types/pull-request-stat.ts";
import { PullRequest } from "../../../../types/pull-request.ts";
import { calculateStatsForPullRequest } from "./calculator.ts";

export const aggregateStats = (pullRequests: PullRequest[]) => {
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

  return Object.keys(prGrouping).map((dateKey) => {
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
};
