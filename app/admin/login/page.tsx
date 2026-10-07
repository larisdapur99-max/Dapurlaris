"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    setLoading(false);
    if (!res.ok) {
      setErr("Username / password salah");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#343a40] p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="font-bold text-2xl">Dapur<span className="text-[#4A6B2A]">Laris</span></div>
          <p className="text-sm text-slate-500 mt-1">Administrator — sign in</p>
        </div>
        <input className="mt-5 w-full border rounded px-3 py-2 text-sm" placeholder="Username" value={u} onChange={(e) => setU(e.target.value)} />
        <input className="mt-3 w-full border rounded px-3 py-2 text-sm" placeholder="Password" type="password" value={p} onChange={(e) => setP(e.target.value)} />
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <button disabled={loading} className="mt-4 w-full rounded bg-[#4A6B2A] py-2.5 text-sm font-bold text-white hover:brightness-110">
          {loading ? "Memeriksa..." : "Sign In"}
        </button>
        <p className="mt-3 text-xs text-slate-400 text-center">Default: admin / dapurlaris-2026</p>
      </form>
    </main>
  );
}
