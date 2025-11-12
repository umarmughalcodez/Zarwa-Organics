// app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { OrdersTable } from "@/components/Admin/OrdersTable";
import { OrdersFilter } from "@/components/Admin/OrdersFilter";
import { Order } from "@/lib/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

interface Filters {
  status: string;
  paymentMethod: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<Filters>({
    status: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
    search: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [pagination.page, pagination.limit, filters]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.paymentMethod && { paymentMethod: filters.paymentMethod }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();

      setOrders(data.orders || []);
      setPagination((prev) => ({
        ...prev,
        totalCount: data.pagination.totalCount,
        totalPages: data.pagination.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-40 p-6 px-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Orders Management
        </h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      <OrdersFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onRefresh={fetchOrders}
      />

      <OrdersTable
        orders={orders}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
