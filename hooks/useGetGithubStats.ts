import { useState } from "react";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PullRequestStatDateKeyed } from "@/types/pull-request-stat-date-keyed";

const supabase = createClient();

export const useGetGithubStats = (fromTime: string) => {
    const [data, setData] = useState<PullRequestStatDateKeyed | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const getStatsData = async () => {
            const { data: statsData, error } = await supabase.functions.invoke(
                "fetch-github-stats",
                {
                    body: {
                        fromTime,
                    },
                },
            );
            setData(statsData);
            setLoading(false);
            setError(error);
        };

        getStatsData();
    }, [fromTime]);

    return { data, error, loading };
};
