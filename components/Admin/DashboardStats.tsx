// components/admin/DashboardStats.tsx
"use client";

import { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { LoadingSpinner } from "../ui/loading-spinner";

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
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders.toLocaleString(),
      icon: Package,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6  p-4 px-8">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">
                  {stat.title}
                </p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1 lg:mt-2 truncate">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-2 lg:p-3 rounded-full ${stat.bgColor} flex-shrink-0 ml-3`}
              >
                <Icon className={`w-4 h-4 lg:w-6 lg:h-6 ${stat.color}`} />
              </div>
            </div>

            {/* Mobile-only subtle indicator */}
            <div className="lg:hidden mt-2">
              <div className={`h-1 rounded-full ${stat.bgColor} w-full`}>
                <div
                  className={`h-1 rounded-full ${stat.color.replace(
                    "text-",
                    "bg-"
                  )} transition-all duration-1000`}
                  style={{
                    width: "100%",
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
