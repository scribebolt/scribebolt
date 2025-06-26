"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);
    const res = await fetch("https://" + process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/^https?:\/\//, "") + "/auth/v1/recover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      setError(data.error?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleForgotPassword} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {sent && (
          <div className="text-green-600 text-sm">
            If your email is registered, you will receive a password reset link.
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        <div className="text-center text-sm mt-2">
          <a href="/login" className="text-blue-600 hover:underline">Back to login</a>
        </div>
      </form>
    </div>
  );
} 