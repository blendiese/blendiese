import getChartData from "@/services/get-chart-data";
import { PullRequestStatDateKeyed } from "@/types/pull-request-stat-date-keyed";
import { Line } from "react-chartjs-2";

export const NumberOfFileChanges = (props: {
  githubStats: PullRequestStatDateKeyed;
}) => {
  return (
    <div className="w-full h-60">
      <Line
        data={getChartData(props.githubStats, "numberOfFileChanges")}
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
              text: "Lines of code changed",
            },
          },
        }}
      />
    </div>
  );
};
