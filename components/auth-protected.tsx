"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import React from "react";

export default function AuthProtected(props: React.PropsWithChildren) {
  const { session, loading } = useAuth();

  if (loading) {
    return <span>Loading</span>;
  }

  if (session) {
    return props.children;
  }

  redirect("/auth/login");
}
