export type PullRequestStatDateKeyed = {
    [date: string]: {
        mergeTime: number;
        reviewTime: number;
        numberOfFileChanges: number;
        numberOfCommits: number;
        changedLinesOfCodeCount: number;
        deployTime: number;
    };
}[];
