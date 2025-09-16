"use client";

import { UpdatePasswordForm } from "@/components/update-password-form";
import { useState } from "react";

export default function Page() {
  const tabs: { label: string; value: "password" | "deregister" }[] = [
    { label: "Password", value: "password" },
    { label: "Deregister", value: "deregister" },
  ];

  const [activeTab, setActiveTab] = useState<"password" | "deregister">(
    "password"
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mb-6 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 rounded ${
              activeTab === tab.value
                ? "bg-primary text-black underline font-bold"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => setActiveTab(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <hr className="w-full max-w-sm border-t border-gray-300 mb-6" />
      {activeTab === "password" && (
        <div className="w-full max-w-sm">
          <UpdatePasswordForm />
        </div>
      )}
      {activeTab === "deregister" && (
        <div className="w-full max-w-sm">
          {/* TODO: Add Delete Account form/component here */}
          <p className="mb-4">Delete your account permanently.</p>
          <div className="bg-red-100 p-4 border rounded text-center">
            <button className="text-black px-4 py-2 rounded">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
