"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function PrivatePage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) redirect("/");
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Private Page</h1>
      <p>Welcome, you are authenticated!</p>
    </div>
  );
}
