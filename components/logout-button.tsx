"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export function LogoutButton() {
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/auth/login");
  };
  return (
    <Button onClick={logout} className="cursor-pointer">
      Logout
    </Button>
  );
}
