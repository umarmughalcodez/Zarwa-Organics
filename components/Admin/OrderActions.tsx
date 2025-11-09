// components/admin/OrderActions.tsx
"use client";

import { useState } from "react";
import { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, Truck, XCircle } from "lucide-react";

interface OrderActionsProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

export function OrderActions({ order, onStatusUpdate }: OrderActionsProps) {
  const [updating, setUpdating] = useState(false);

  const quickActions = [
    {
      status: "verified",
      label: "Verify Payment",
      icon: CheckCircle,
      show: order.status === "pending",
    },
    {
      status: "shipped",
      label: "Mark Shipped",
      icon: Truck,
      show: order.status === "verified" || order.status === "pending",
    },
    {
      status: "delivered",
      label: "Mark Delivered",
      icon: CheckCircle,
      show: order.status === "shipped",
    },
    {
      status: "cancelled",
      label: "Cancel Order",
      icon: XCircle,
      show: order.status !== "cancelled" && order.status !== "delivered",
    },
  ].filter((action) => action.show);

  const handleQuickAction = async (newStatus: string) => {
    setUpdating(true);
    try {
      const response = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          status: newStatus,
        }),
      });

      if (response.ok) {
        onStatusUpdate(order.id, newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (quickActions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={updating}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={action.status}
              onClick={() => handleQuickAction(action.status)}
              disabled={updating}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
