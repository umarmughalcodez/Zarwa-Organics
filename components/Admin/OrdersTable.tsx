// components/admin/OrdersTable.tsx
"use client";

import { useState } from "react";
import { Order } from "@/lib/types";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { OrdersPagination } from "./OrdersPagination";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActions } from "./OrderActions";
import {
  Eye,
  Package,
  User,
  DollarSign,
  CreditCard,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

export function OrdersTable({
  orders,
  loading,
  pagination,
  onPageChange,
  onStatusUpdate,
}: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 lg:p-6">
          {/* Desktop Loading Skeleton */}
          <div className="hidden lg:block animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
            ))}
          </div>

          {/* Mobile Loading Skeleton */}
          <div className="lg:hidden space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id.slice(-8)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.orderItems.length} item(s)
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.firstName} {order.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                    <div className="text-sm text-gray-500">{order.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Rs. {order.total}
                    </div>
                    {order.totalSavings > 0 && (
                      <div className="text-xs text-green-600">
                        Saved Rs. {order.totalSavings}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {order.paymentMethod}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br />
                    <span className="text-xs">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#8BBE67] hover:text-[#6F8F58] flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <OrderActions
                        order={order}
                        onStatusUpdate={onStatusUpdate}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No orders found matching your filters.
            </p>
          </div>
        )}

        <OrdersPagination pagination={pagination} onPageChange={onPageChange} />
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            {/* Header - Order ID & Status */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-900 text-sm">
                  #{order.id.slice(-8)}
                </span>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            {/* Customer Info */}
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900 font-medium">
                {order.firstName} {order.lastName}
              </span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-3 mb-3">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Mail className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{order.email}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Phone className="w-3 h-3" />
                <span>{order.phone}</span>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    Rs. {order.total}
                  </span>
                </div>
                {order.totalSavings > 0 && (
                  <div className="text-xs text-green-600">
                    Saved Rs. {order.totalSavings}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <CreditCard className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-900 capitalize">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {order.paymentStatus}
                </div>
              </div>
            </div>

            {/* Footer - Date & Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(order.createdAt).toLocaleDateString("en-PK", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-[#8BBE67] hover:text-[#6F8F58] flex items-center gap-1 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <OrderActions order={order} onStatusUpdate={onStatusUpdate} />
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
            <Package className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              No orders found
            </h3>
            <p className="text-xs text-gray-500">
              No orders match your current filters.
            </p>
          </div>
        )}

        {/* Mobile Pagination */}
        {orders.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <OrdersPagination
              pagination={pagination}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={onStatusUpdate}
        />
      )}
    </>
  );
}
