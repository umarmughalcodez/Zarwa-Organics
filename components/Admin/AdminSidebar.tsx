// components/admin/AdminSidebar.tsx
"use client";

import { useState } from "react";
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
} from "lucide-react";

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-[#8BBE67]">Zarwa Admin</h1>
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

      {/* Sidebar - Desktop & Mobile */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        lg:transform-none lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
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

        <nav className="mt-6 lg:mt-0">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
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
      </div>

      {/* Add padding for mobile header */}
      <style jsx global>{`
        .lg\\:mt-0 {
          margin-top: 0;
        }
        @media (max-width: 1023px) {
          main {
            padding-top: 64px; /* Height of mobile header */
          }
        }
      `}</style>
    </>
  );
}
