export default async (
  githubUsers: string[],
  githubRepositories: string[],
  githubToken: string,
) => {
  const graphqlEndpoint = "https://api.github.com/graphql";
  const query = `
    query GetPullRequestsByAuthor($query: String!, $first: Int = 100) {
      search(
        query: $query
        type: ISSUE
        first: $first
      ) {
        issueCount
        nodes {
            ... on PullRequest {
                id
                title
                url
                state
                author {
                    login
                }
                createdAt
                mergedAt
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
                            message
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
    }`,
    first: 50,
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
