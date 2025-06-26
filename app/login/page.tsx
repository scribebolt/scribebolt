"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.replace(redirect);
    } else {
      setError(data.error || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    const redirect = searchParams.get("redirect") || "/dashboard";
    window.location.href = `/api/auth/google?redirectTo=${encodeURIComponent(redirect)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          className="w-full bg-gray-100 text-black py-2 rounded border"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
        <div className="text-center text-sm mt-2">
          <a href="/signup" className="text-blue-600 hover:underline">Don't have an account? Sign up</a>
        </div>
      </form>
    </div>
  );
} 