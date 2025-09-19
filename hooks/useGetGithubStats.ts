import { useState } from "react";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PullRequestStatDateKeyed } from "@/types/pull-request-stat-date-keyed";

const supabase = createClient();

export const useGetGithubStats = () => {
    const [data, setData] = useState<PullRequestStatDateKeyed | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStatsData = async () => {
            const { data: statsData } = await supabase.functions.invoke(
                "fetch-github-stats",
                {
                    body: { name: "Functions" },
                },
            );
            setData(statsData);
            setLoading(false);
        };

        getStatsData();
    }, []);

    return { data, loading };
};
