// components/admin/OrderDetailsModal.tsx
"use client";

import { useState } from "react";
import { Order } from "@/lib/types";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderStatusUpdate } from "./OrderStatusUpdate";
import { CustomerInfoTab } from "./CustomerInfoTab";
import { OrderDetailsTab } from "./OrderDetailsTab";
import { PaymentInfoTab } from "./PaymentInfoTab";
import {
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  FileText,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderDetailsModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onStatusUpdate,
}: OrderDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen) return null;

  const tabs = [
    { id: "details", label: "Order Details", icon: FileText },
    { id: "customer", label: "Customer Info", icon: User },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-white/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Order #{order.id}
            </h2>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-[#8BBE67] text-[#8BBE67]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[60vh] p-6">
          {activeTab === "details" && <OrderDetailsTab order={order} />}
          {activeTab === "customer" && <CustomerInfoTab order={order} />}
          {activeTab === "payment" && <PaymentInfoTab order={order} />}
        </div>

        {/* Footer with Status Update */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <OrderStatusUpdate order={order} onStatusUpdate={onStatusUpdate} />
        </div>
      </div>
    </div>
  );
}
