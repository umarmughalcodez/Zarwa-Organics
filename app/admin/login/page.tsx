"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!;

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("admin_auth_time", Date.now().toString());
      router.push("/admin");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-[#8BBE67]/10 flex items-center justify-center rounded-full mb-3">
            <FaLock className="text-[#8BBE67]" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your Zarwa Organics dashboard
          </p>
        </div>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 focus:border-[#8BBE67] focus:ring-1 focus:ring-[#8BBE67] rounded-md p-2.5 mb-4 outline-none transition"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#8BBE67] hover:bg-[#7aad5e] text-white py-2.5 rounded-md font-medium transition"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          © {new Date().getFullYear()} Zarwa Organics — Admin Access
        </p>
      </form>
    </div>
  );
}
