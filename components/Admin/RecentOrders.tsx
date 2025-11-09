// components/admin/RecentOrders.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Order } from "@/lib/types";
import { Package, Calendar, User, DollarSign } from "lucide-react";

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders?limit=5");
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      verified: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const formatOrderId = (id: string) => {
    return `#${id.slice(-8).toUpperCase()}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg animate-pulse space-y-2 sm:space-y-0"
            >
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="space-y-2 flex-1 sm:text-center">
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
              </div>
              <div className="space-y-2 flex-1 sm:text-right">
                <div className="h-5 bg-gray-200 rounded w-16 ml-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-20 ml-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h2 className="text-lg lg:text-xl font-semibold">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="text-[#8BBE67] hover:text-[#6F8F58] font-medium text-sm lg:text-base inline-flex items-center gap-1"
        >
          View all
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-150 gap-3 sm:gap-4"
          >
            {/* Order Info - Top on mobile, left on desktop */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="font-medium text-sm lg:text-base truncate">
                  {formatOrderId(order.id)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
                <User className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {order.firstName} {order.lastName}
                </span>
              </div>
            </div>

            {/* Payment Info - Middle on mobile, center on desktop */}
            <div className="flex-1 min-w-0 sm:text-center">
              <div className="flex items-center gap-2 justify-center sm:justify-center mb-1">
                <DollarSign className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <p className="text-sm lg:text-base font-medium">
                  Rs. {order.total}
                </p>
              </div>
              <p className="text-xs text-gray-500 capitalize truncate">
                {order.paymentMethod || "Not specified"}
              </p>
            </div>

            {/* Status & Date - Bottom on mobile, right on desktop */}
            <div className="flex-1 min-w-0 sm:text-right">
              <div className="flex flex-col items-start sm:items-end gap-1">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("en-PK", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm lg:text-base">No orders found</p>
            <p className="text-xs text-gray-400 mt-1">
              New orders will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
