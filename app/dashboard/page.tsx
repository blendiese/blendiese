"use client";
import { InfoIcon } from "lucide-react";
import { Line } from "react-chartjs-2";
import getChartData from "@/services/get-chart-data";
import { useGetGithubStats } from "@/hooks/useGetGithubStats";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function DashboardPage() {
  const { data: githubStats, loading: githubDataLoading } = useGetGithubStats();

  return (
    <div className="flex-1 w-full flex flex-col gap-12 ml-8">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      {githubStats && !githubDataLoading ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="w-full">
            <Line
              data={getChartData(githubStats, "mergeTime", 100)}
              options={{
                responsive: true,
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
          <div className="w-full">
            <Line
              data={getChartData(githubStats, "reviewTime", 100)}
              options={{
                responsive: true,
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
                    text: "Time to review since first commits (seconds)",
                  },
                },
              }}
            />
          </div>
          <div className="w-full">
            <Line
              data={getChartData(githubStats, "deployTime", 100)}
              options={{
                responsive: true,
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
                    text: "Time to deploy since merged (seconds)",
                  },
                },
              }}
            />
          </div>
          <div className="w-full">
            <Line
              data={getChartData(githubStats, "numberOfFileChanges")}
              options={{
                responsive: true,
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
                    text: "Number of files changes",
                  },
                },
              }}
            />
          </div>
          <div className="w-full">
            <Line
              data={getChartData(githubStats, "numberOfCommits")}
              options={{
                responsive: true,
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
                    text: "Number of commits changed",
                  },
                },
              }}
            />
          </div>
          <div className="w-full">
            <Line
              data={getChartData(githubStats, "changedLinesOfCodeCount")}
              options={{
                responsive: true,
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
                    text: "Linees of code changed",
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <span>Error loading stats data</span>
      )}
    </div>
  );
}
