// components/admin/OrdersFilter.tsx
"use client";

import { useState } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Filters {
  status: string;
  paymentMethod: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

interface OrdersFilterProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  onRefresh: () => void;
}

export function OrdersFilter({
  filters,
  onFilterChange,
  onRefresh,
}: OrdersFilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const paymentMethodOptions = [
    { value: "all", label: "All Methods" },
    { value: "cod", label: "Cash on Delivery" },
    { value: "jazzcash", label: "JazzCash" },
    { value: "easypaisa", label: "EasyPaisa" },
    { value: "bank", label: "Bank Transfer" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by order ID, customer name, email, or phone..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-48">
          <Select
            value={filters.status}
            onValueChange={(value) => onFilterChange({ status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method Filter */}
        <div className="w-full lg:w-48">
          <Select
            value={filters.paymentMethod}
            onValueChange={(value) => onFilterChange({ paymentMethod: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Advanced
          </Button>
          <Button
            variant="outline"
            onClick={onRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFilterChange({ dateTo: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
