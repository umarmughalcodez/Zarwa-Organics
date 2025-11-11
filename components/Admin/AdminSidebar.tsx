"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { logoutAdmin } from "@/lib/auth";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    closeMobileMenu();
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        {/* Simplified skeleton for SSR */}
      </div>
    );
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
        <div className="flex items-center justify-between p-4 h-full">
          <h1 className="text-xl font-bold text-[#8BBE67]">Admin</h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        lg:transform-none lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col h-screen
      `}
      >
        {/* Desktop Header */}
        <div className="p-6 hidden lg:block">
          <h1 className="text-2xl font-bold text-[#8BBE67]">Zarwa Admin</h1>
        </div>

        {/* Mobile Header inside sidebar */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-[#8BBE67]">Menu</h1>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors mx-2 rounded-lg ${
                  isActive
                    ? "bg-[#8BBE67] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mx-2"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
