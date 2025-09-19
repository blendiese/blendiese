import { PullRequest } from "../../../../types/pull-request.ts";

const fetchPullRequestByPage = async (
  githubUsers: string[],
  githubRepositories: string[],
  githubToken: string,
  cursor: string | null,
) => {
  const graphqlEndpoint = "https://api.github.com/graphql";
  const query = `
    query GetPullRequestsByAuthor($query: String!, $first: Int = 100, $after: String = null) {
      search(
        query: $query
        type: ISSUE
        first: $first,
        after: $after
      ) {
        nodes {
            ... on PullRequest {
                createdAt
                mergedAt
                mergeCommit {
                    statusCheckRollup {
                        state
                        contexts(first: 100) {
                            nodes {
                                ... on CheckRun {
                                    __typename
                                    completedAt
                                }
                                ... on StatusContext {
                                    __typename
                                    createdAt
                                }
                            }
                        }
                    }
                }
                reviews(first: 1) {
                    nodes {
                        ... on PullRequestReview {
                            createdAt
                            state
                        }
                    }
                }
                commits(first: 1) {
                    totalCount
                    nodes {
                        commit {
                            authoredDate
                        }
                    }
                }
                changedFiles
                deletions
                reviewDecision
                additions
                totalCommentsCount
            }
        }
        pageInfo {
            endCursor
            hasNextPage
        }
      }
    }`;

  const variables = {
    query: `repo:${githubRepositories.join("+")} is:pr author:${
      githubUsers.join("+")
    } is:merged base:main`,
    first: 100,
    after: cursor,
  };

  return await fetch(graphqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${githubToken}`,
      // Add any necessary authorization headers here, e.g., 'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify({ query, variables }),
  });
};

export default async (
  githubUsers: string[],
  githubRepositories: string[],
  githubToken: string,
) => {
  let cursor: string | null = null;
  let hasNextPage = true;
  const pullRequests: PullRequest[] = [];

  while (hasNextPage) {
    const response = await fetchPullRequestByPage(
      githubUsers,
      githubRepositories,
      githubToken,
      cursor,
    );

    const content = await response.json();

    pullRequests.push(...content.data.search.nodes);

    hasNextPage = content.data.search.pageInfo.hasNextPage;
    cursor = content.data.search.pageInfo.endCursor;
  }

  return pullRequests;
};
