import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function upsertUserTimezone(
  timezone: string,
  user_id: string,
) {
  await supabase.from("user_settings").upsert({
    timezone,
    user_id,
  });
}
