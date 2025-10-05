"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function ApiOkBadge() {
  const { getToken, isSignedIn } = useAuth();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!isSignedIn) {
        if (!cancelled) setOk(null);
        return;
      }
      const token = await getToken({ template: "default" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!cancelled) setOk(res.ok);
    })();

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, getToken]);

  if (!isSignedIn) return <span>Sign in to test API</span>;
  return <span>{ok ? "API OK ✅" : "API ❌"}</span>;
}
