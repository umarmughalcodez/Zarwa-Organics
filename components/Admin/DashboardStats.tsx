// components/admin/DashboardStats.tsx
"use client";

import { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Package,
      color: "bg-yellow-500",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-[#8BBE67]`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
