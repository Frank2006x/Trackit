"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignInButton() {
  const { status } = useSession();
  return (
    <button
      onClick={() => {
      if (status === "authenticated") {
        redirect("/home");
      } else {
        signIn("google");
      }
      }}
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    >
      Sign in with Google
    </button>
  );
}
