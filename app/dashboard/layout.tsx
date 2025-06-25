"use client";
import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { getSession, signOut } from "@/lib/supabase-client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { session, error } = await getSession();
        
        if (error || !session) {
          setIsAuthenticated(false);
          setUser(null);
          if (pathname.startsWith("/dashboard")) {
            router.replace("/login");
          }
        } else {
          setIsAuthenticated(true);
          setUser(session.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setUser(null);
        if (pathname.startsWith("/dashboard")) {
          router.replace("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="py-6 px-4 lg:px-8">{children}</main>
        <button onClick={handleLogout} className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">Logout</button>
      </div>
    </div>
  );
} 