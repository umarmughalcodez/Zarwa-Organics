// components/admin/OrderStatusUpdate.tsx
"use client";

import { useState } from "react";
import { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, CheckCircle, XCircle, Shield } from "lucide-react";

interface OrderStatusUpdateProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

export function OrderStatusUpdate({
  order,
  onStatusUpdate,
}: OrderStatusUpdateProps) {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [trackingNumber, setTrackingNumber] = useState(
    order.trackingNumber || ""
  );
  const [updating, setUpdating] = useState(false);

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      icon: Shield,
      color: "text-yellow-600",
    },
    {
      value: "verified",
      label: "Verified",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      value: "shipped",
      label: "Shipped",
      icon: Truck,
      color: "text-purple-600",
    },
    {
      value: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      color: "text-red-600",
    },
  ];

  const handleStatusUpdate = async () => {
    if (
      selectedStatus === order.status &&
      trackingNumber === order.trackingNumber
    )
      return;

    setUpdating(true);
    try {
      const response = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          status: selectedStatus,
          trackingNumber:
            selectedStatus === "shipped" ? trackingNumber : undefined,
        }),
      });

      if (response.ok) {
        onStatusUpdate(order.id, selectedStatus);
        // Show success message
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getNextActions = () => {
    const actions = [];

    if (order.status === "pending") {
      actions.push({
        status: "verified",
        label: "Verify Payment",
        description: "Mark payment as verified and proceed to shipping",
        variant: "default" as const,
      });
    }

    if (order.status === "verified" || order.status === "pending") {
      actions.push({
        status: "shipped",
        label: "Mark as Shipped",
        description: "Order has been shipped to customer",
        variant: "default" as const,
      });
    }

    if (order.status === "shipped") {
      actions.push({
        status: "delivered",
        label: "Mark as Delivered",
        description: "Order has been delivered successfully",
        variant: "default" as const,
      });
    }

    if (order.status !== "cancelled") {
      actions.push({
        status: "cancelled",
        label: "Cancel Order",
        description: "Cancel this order",
        variant: "destructive" as const,
      });
    }

    return actions;
  };

  const quickActions = getNextActions();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Update Order Status</h3>
        <div className="text-sm text-gray-500">
          Current:{" "}
          <span className="font-medium capitalize">{order.status}</span>
        </div>
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="space-y-4">
          <Label>Quick Actions:</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {quickActions.map((action) => {
              const statusConfig = statusOptions.find(
                (s) => s.value === action.status
              );
              const Icon = statusConfig?.icon || Shield;

              return (
                <Button
                  key={action.status}
                  variant={action.variant}
                  size="sm"
                  onClick={() => {
                    setSelectedStatus(action.status);
                    if (action.status === "shipped" && !trackingNumber) {
                      setTrackingNumber(
                        `TRK${order.id.slice(-8).toUpperCase()}`
                      );
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Manual Status Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Order Status</Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${option.color}`} />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {selectedStatus === "shipped" && (
          <div>
            <Label htmlFor="trackingNumber">Tracking Number</Label>
            <Input
              id="trackingNumber"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
            />
          </div>
        )}
      </div>

      {/* Update Button */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedStatus(order.status);
            setTrackingNumber(order.trackingNumber || "");
          }}
        >
          Reset
        </Button>
        <Button
          onClick={handleStatusUpdate}
          disabled={
            updating ||
            (selectedStatus === order.status &&
              trackingNumber === (order.trackingNumber || ""))
          }
          className="bg-[#8BBE67] hover:bg-[#6F8F58]"
        >
          {updating ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}
