"use client";
import { InfoIcon } from "lucide-react";
import { useGetGithubStats } from "@/hooks/useGetGithubStats";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { MergeTime } from "@/components/charts/mergeTime";
import { ChangedLinesOfCodeCount } from "@/components/charts/changedLinesOfCodeCount";
import { ReviewTime } from "@/components/charts/reviewTime";
import { DeployTime } from "@/components/charts/deployTime";
import { NumberOfFileChanges } from "@/components/charts/numberOfFileChanges";
import { NumberOfCommits } from "@/components/charts/numberOfCommits";
import { DateSelect } from "@/components/filters/date-select";
import { useState } from "react";
import { convertParameter } from "@/utils/convert-parameter";
import { Since } from "@/types/parameter";

Chart.register(CategoryScale);

export default function DashboardPage() {
  const [fromTime, setFromTime] = useState<string>(
    convertParameter({
      timeSelect: {
        mode: "relative",
        since: "1 week",
      },
    })!
  );
  const {
    data: githubStats,
    loading: githubDataLoading,
    error: githubDataError,
  } = useGetGithubStats(fromTime);

  return (
    <div className="flex-1 w-full flex flex-col gap-12 ml-8">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      {githubDataLoading && <span>Loading...</span>}
      {githubDataError && <span>Error loading data</span>}
      <DateSelect
        onChange={(relativeTime) =>
          setFromTime(
            convertParameter({
              timeSelect: {
                mode: "relative",
                since: relativeTime as Since,
              },
            })!
          )
        }
      />
      {githubStats && (
        <div className="grid grid-cols-3 gap-4">
          <MergeTime githubStats={githubStats} />
          <ReviewTime githubStats={githubStats} />
          <DeployTime githubStats={githubStats} />
          <NumberOfFileChanges githubStats={githubStats} />
          <NumberOfCommits githubStats={githubStats} />
          <ChangedLinesOfCodeCount githubStats={githubStats} />
        </div>
      )}
    </div>
  );
}
