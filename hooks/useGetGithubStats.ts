import { useState } from "react";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const useGetGithubStats = () => {
    const [data, setData] = useState<any>(null);
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
