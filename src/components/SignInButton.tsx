"use client";
import { signIn } from "next-auth/react";

export default function SignInButton() {
    return (
        <button
            onClick={() => signIn("google")}
            className="px-4 py-2 rounded bg-blue-500 text-white border-none cursor-pointer text-base hover:bg-blue-600 transition-colors"
        >
            Sign in with Google
        </button>
    );
}
