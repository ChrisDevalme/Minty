"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="p-6">
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
}