import { PullRequestStatDateKeyed } from "@/types/pull-request-stat-date-keyed";
import { ChartData } from "chart.js";

export default (
    githubStats: PullRequestStatDateKeyed,
    metricName: keyof PullRequestStatDateKeyed[number][string],
    scale: number = 1,
) => {
    const d = githubStats.reduce<
        {
            labels: string[];
            data: number[];
        }
    >(
        (chartData, stats) => {
            const key = Object.keys(stats)[0];

            return {
                labels: [...chartData.labels, key],
                data: [
                    ...chartData.data,
                    stats[key][metricName] / scale,
                ],
            };
        },
        {
            labels: [],
            data: [],
        },
    );

    return {
        labels: d.labels,
        datasets: [
            {
                data: d.data,
                borderColor: "black",
            },
        ],
    } satisfies ChartData<"line">;
};
