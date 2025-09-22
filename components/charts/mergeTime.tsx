import getChartData from "@/services/get-chart-data";
import { PullRequestStatDateKeyed } from "@/types/pull-request-stat-date-keyed";
import { Line } from "react-chartjs-2";

export const MergeTime = (props: { githubStats: PullRequestStatDateKeyed }) => {
  return (
    <div className="w-full h-60">
      <Line
        data={getChartData(props.githubStats, "mergeTime", 100)}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Time to merge since first commits (seconds)",
            },
          },
        }}
      />
    </div>
  );
};
