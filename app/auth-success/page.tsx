"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase-client";

export default function AuthSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setError("Authentication failed");
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          // Check if user profile exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code === 'PGRST116') {
            // Profile doesn't exist, create it
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                email: session.user.email,
                first_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User',
                created_at: new Date().toISOString(),
              });

            if (insertError) {
              console.error('Failed to create profile:', insertError);
            }
          }

          // Redirect to dashboard
          router.push('/dashboard');
        } else {
          setError("No session found");
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Auth success error:', err);
        setError("Authentication failed");
        setIsLoading(false);
      }
    };

    handleAuthSuccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#7B61FF] mx-auto mb-4" />
          <p className="text-gray-600">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center text-red-600">Authentication Failed</CardTitle>
              <CardDescription className="text-center text-gray-600">{error}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={() => router.push('/login')}
                className="w-full h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium transition-colors"
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-center text-[#1A1A1A]">Authentication Successful</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Redirecting you to the dashboard...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Link href="/dashboard" className="text-sm text-[#7B61FF] hover:text-[#6B51E5] font-medium transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
