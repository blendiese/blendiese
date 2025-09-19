export type PullRequest = {
  createdAt: string;
  mergedAt: string;
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
