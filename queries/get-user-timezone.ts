import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function getUserTimezone() {
  const { data, error } = await supabase
    .from("user_settings")
    .select("timezone")
    .limit(1);

  return {
    data,
    error,
  };
}
