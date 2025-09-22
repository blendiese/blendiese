import getChartData from "@/services/get-chart-data";
import { PullRequestStatDateKeyed } from "@/types/pull-request-stat-date-keyed";
import { Line } from "react-chartjs-2";

export const ReviewTime = (props: {
  githubStats: PullRequestStatDateKeyed;
}) => {
  return (
    <div className="w-full h-60">
      <Line
        data={getChartData(props.githubStats, "reviewTime")}
        options={{
          responsive: true,
          aspectRatio: 10,
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
              text: "Lines of code changed",
            },
          },
        }}
      />
    </div>
  );
};
