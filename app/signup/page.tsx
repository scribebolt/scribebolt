"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setConfirmation(false);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      if (data.confirmationRequired) {
        setConfirmation(true);
      } else {
        const redirect = searchParams.get("redirect") || "/dashboard";
        router.replace(redirect);
      }
    } else {
      setError(data.error || "Signup failed");
    }
  };

  const handleGoogleSignup = () => {
    const redirect = searchParams.get("redirect") || "/dashboard";
    window.location.href = `/api/auth/google?redirectTo=${encodeURIComponent(redirect)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
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
        {confirmation && (
          <div className="text-green-600 text-sm">
            Check your email to confirm your signup before logging in.
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <button
          type="button"
          className="w-full bg-gray-100 text-black py-2 rounded border"
          onClick={handleGoogleSignup}
        >
          Continue with Google
        </button>
        <div className="text-center text-sm mt-2">
          <a href="/login" className="text-blue-600 hover:underline">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
} 