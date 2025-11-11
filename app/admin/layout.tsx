"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Re-check auth when pathname changes
    checkAuth();
  }, [pathname, checkAuth]);

  useEffect(() => {
    if (isAuthenticated === false && pathname !== "/admin/login") {
      console.log("Not authenticated, redirecting to login");
      router.push("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8BBE67] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto lg:mt-0 mt-16">
        <div className="p-4 lg:p-6 mt-40">{children}</div>
      </main>
    </div>
  );
}
