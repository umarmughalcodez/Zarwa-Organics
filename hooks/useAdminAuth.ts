"use client";

import { useState, useEffect } from "react";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = () => {
    if (typeof window === "undefined") {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const auth = localStorage.getItem("admin_authenticated");
      const authTime = localStorage.getItem("admin_auth_time");

      if (auth === "true" && authTime) {
        const authTimestamp = parseInt(authTime);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (now - authTimestamp < twentyFourHours) {
          setIsAuthenticated(true);
          return true;
        } else {
          localStorage.removeItem("admin_authenticated");
          localStorage.removeItem("admin_auth_time");
        }
      }
      setIsAuthenticated(false);
      return false;
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();

    // Listen for storage changes (in case auth is set in another tab/window)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { isAuthenticated, checkAuth };
}
