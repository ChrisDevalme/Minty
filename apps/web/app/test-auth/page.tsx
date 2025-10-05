"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function TestAuth() {
  const { isSignedIn, getToken } = useAuth();
  const [status, setStatus] = useState("idle");
  const [echo, setEcho] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isSignedIn) { setStatus("not signed in"); return; }
      const token = await getToken(); // default Clerk JWT
      if (!token) { setStatus("no token from Clerk"); return; }

      // 1) Protected endpoint (should be 200, not 401)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus(res.ok ? "protected: 200 OK" : `protected: ${res.status}`);

      // 2) Debug echo to confirm header is present at API
      const echoRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/debug/echo-auth`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEcho(await echoRes.json());
    })();
  }, [isSignedIn, getToken]);

  return (
    <div className="p-6 space-y-2">
      <div>Auth test: {status}</div>
      <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(echo, null, 2)}</pre>
      {!isSignedIn && <div>Please sign in at /sign-in</div>}
    </div>
  );
}
