"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"; // fallback

export default function ImportPage() {
  const { getToken, isSignedIn } = useAuth();
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      // shows once in browser console so you catch misconfig early
      console.warn("NEXT_PUBLIC_API_URL is not set; using fallback:", API_URL);
    }
  }, []);

  if (!isSignedIn) return <div>Please sign in</div>;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const file = (form.elements.namedItem("file") as HTMLInputElement)?.files?.[0];
    if (!file) return setMsg("Choose a file first");

    try {
      const token = await getToken();
      const fd = new FormData();
      fd.append("file", file); // name must be 'file' to match FileInterceptor

      const res = await fetch(`${API_URL}/transactions/import-csv`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token!}`,
          // NOTE: do NOT set Content-Type for FormData; the browser will set the boundary
        },
        body: fd,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
      setMsg(`Imported ${json.inserted} rows`);
    } catch (err: any) {
      console.error(err);
      setMsg(`Upload failed: ${err.message ?? String(err)}`);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Import CSV</h1>
      <form onSubmit={onSubmit}>
        <input type="file" name="file" accept=".csv" />
        <button type="submit" className="ml-2 border px-3 py-1 rounded">Upload</button>
      </form>
      <p className="mt-3">{msg}</p>
    </div>
  );
}
