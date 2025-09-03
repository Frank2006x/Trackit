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
      className="px-4 py-2 rounded bg-blue-500 text-white border-none cursor-pointer text-base hover:bg-blue-600 transition-colors"
    >
      Sign in with Google
    </button>
  );
}
