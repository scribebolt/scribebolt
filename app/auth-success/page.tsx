"use client";
import { useRouter } from "next/navigation";

export default function AuthSuccessPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-bold">Success!</h1>
        <p className="text-green-600">Your authentication was successful.</p>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
} 