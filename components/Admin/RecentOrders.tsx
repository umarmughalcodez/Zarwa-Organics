// components/admin/RecentOrders.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Order } from "@/lib/types";

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
      pending: "bg-yellow-100 text-yellow-800",
      verified: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border rounded animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="text-[#8BBE67] hover:text-[#6F8F58] font-medium"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <p className="font-medium">#{order.id}</p>
              <p className="text-sm text-gray-600">
                {order.firstName} {order.lastName}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-sm">Rs. {order.total}</p>
              <p className="text-xs text-gray-500 capitalize">
                {order.paymentMethod}
              </p>
            </div>
            <div className="flex-1 text-right">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
}
