export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const auth = localStorage.getItem("admin_authenticated");
    const authTime = localStorage.getItem("admin_auth_time");

    if (auth === "true" && authTime) {
      const authTimestamp = parseInt(authTime);
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - authTimestamp < twentyFourHours) {
        return true;
      } else {
        localStorage.removeItem("admin_authenticated");
        localStorage.removeItem("admin_auth_time");
      }
    }
  } catch (error) {
    console.error("Auth check error:", error);
  }

  return false;
}

export function logoutAdmin() {
  try {
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_auth_time");
    // Use window.location for full page reload to clear state
    window.location.href = "/admin/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
}
