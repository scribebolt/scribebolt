"use client";
import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function LoginPageInner() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      try {
        console.log("Checking user session...", supabase);
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session result:", session);
        if (session) {
          router.replace(redirectPath);
        }
      } catch (err) {
        console.error("Error in checkUser:", err);
      }
    };
    checkUser();
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace(redirectPath);
      }
    });
    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, [router, redirectPath, supabase]);

  const handleLogin = async (email: string, password: string) => {
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data.session) {
      router.replace(redirectPath);
    } else if (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth-success`
        }
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#7B61FF]/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#7B61FF]/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-[#7B61FF]/8 rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2 hover:text-[#7B61FF] transition-colors cursor-pointer">
              ScribeBolt
            </h1>
          </Link>
          <p className="text-gray-600 text-sm">AI-powered cold email personalization</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-[#1A1A1A]">Welcome back</CardTitle>
            <CardDescription className="text-center text-gray-600">Sign in to your ScribeBolt account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="Enter your email"
                  className="h-11 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#1A1A1A]">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#7B61FF] hover:text-[#6B51E5] font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium transition-colors"
              >
                Log in
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-gray-300 hover:bg-gray-50 text-[#1A1A1A] font-medium transition-colors"
              onClick={handleGoogleLogin}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <Link
                href="/signup"
                className="text-sm text-[#7B61FF] hover:text-[#6B51E5] font-medium transition-colors"
              >
                Sign up instead
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
