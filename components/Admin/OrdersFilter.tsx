// components/admin/OrdersFilter.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
    <div className="bg-white p-4 lg:p-6 rounded-lg border border-gray-200">
      {/* Main Filters - Stack on mobile, row on desktop */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
        {/* Search - Full width on mobile, flexible on desktop */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10 text-sm lg:text-base"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 lg:hidden">
            Search by ID, name, email, or phone
          </p>
        </div>

        {/* Filters Row - Stack on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          {/* Status Filter */}
          <div className="w-full sm:flex-1 lg:w-48">
            <Select
              value={filters.status}
              onValueChange={(value) => onFilterChange({ status: value })}
            >
              <SelectTrigger className="text-sm lg:text-base">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-sm"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method Filter */}
          <div className="w-full sm:flex-1 lg:w-48">
            <Select
              value={filters.paymentMethod}
              onValueChange={(value) =>
                onFilterChange({ paymentMethod: value })
              }
            >
              <SelectTrigger className="text-sm lg:text-base">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethodOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-sm"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions - Full width buttons on mobile, auto width on desktop */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex-1 sm:flex-initial flex items-center gap-2 text-sm"
              size="sm"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden xs:inline">Advanced</span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onRefresh}
              className="flex-1 sm:flex-initial flex items-center gap-2 text-sm"
              size="sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden xs:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
                className="text-sm"
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
                className="text-sm"
              />
            </div>
          </div>

          {/* Active Filters Summary - Mobile only */}
          <div className="lg:hidden mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 font-medium mb-1">
              Active Filters:
            </p>
            <div className="flex flex-wrap gap-1">
              {filters.status && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Status:{" "}
                  {statusOptions.find((s) => s.value === filters.status)?.label}
                </span>
              )}
              {filters.paymentMethod && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Payment:{" "}
                  {
                    paymentMethodOptions.find(
                      (p) => p.value === filters.paymentMethod
                    )?.label
                  }
                </span>
              )}
              {(filters.dateFrom || filters.dateTo) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  Date Range
                </span>
              )}
              {filters.search && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                  Search:{" "}
                  {filters.search.length > 10
                    ? `${filters.search.substring(0, 10)}...`
                    : filters.search}
                </span>
              )}
              {!filters.status &&
                !filters.paymentMethod &&
                !filters.dateFrom &&
                !filters.dateTo &&
                !filters.search && (
                  <span className="text-xs text-gray-600">
                    No active filters
                  </span>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions - Mobile only */}
      <div className="lg:hidden mt-3 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onFilterChange({
              status: "",
              paymentMethod: "",
              dateFrom: "",
              dateTo: "",
              search: "",
            })
          }
          className="text-xs text-gray-600 hover:text-gray-800"
        >
          Clear All
        </Button>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-500 self-center">
          {filters.search || filters.status || filters.paymentMethod
            ? "Filters active"
            : "All orders"}
        </span>
      </div>
    </div>
  );
}
