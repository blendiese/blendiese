export type PullRequest = {
  createdAt: string;
  mergedAt: string;
  mergeCommit: {
    statusCheckRollup: {
      state: string;
      contexts: {
        nodes: ({
          __typename: "CheckRun";
          completedAt: string;
        } | {
          __typename: "StatusContext";
          createdAt: string;
        })[];
      };
    };
  };
  commits: {
    totalCount: number;
    nodes: {
      commit: {
        authoredDate: string;
      };
    }[];
  };
  reviews: {
    nodes: {
      createdAt: string;
    }[];
  };
  changedFiles: number;
  deletions: number;
  additions: number;
  totalCommentsCount: number;
};
