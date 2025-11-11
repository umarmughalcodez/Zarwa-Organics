// components/admin/OrderDetailsModal.tsx
"use client";

import { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
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
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: "details", label: "Details", icon: FileText },
    { id: "customer", label: "Customer", icon: User },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  const getCurrentTabIndex = () =>
    tabs.findIndex((tab) => tab.id === activeTab);
  const nextTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };
  const prevTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-5 h-5 text-[#8BBE67] flex-shrink-0" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                Order #{order.id}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>
                {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 flex-shrink-0 ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Tab Navigation */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTab}
              disabled={getCurrentTabIndex() === 0}
              className="flex items-center gap-1 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>
              <span className="text-xs text-gray-500">
                ({getCurrentTabIndex() + 1}/{tabs.length})
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextTab}
              disabled={getCurrentTabIndex() === tabs.length - 1}
              className="flex items-center gap-1 text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Desktop Tabs */}
        {!isMobile && (
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
        )}

        {/* Mobile Tab Indicators */}
        {isMobile && (
          <div className="flex justify-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeTab === tab.id ? "bg-[#8BBE67]" : "bg-gray-300"
                }`}
                aria-label={`Go to ${tab.label} tab`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {activeTab === "details" && <OrderDetailsTab order={order} />}
          {activeTab === "customer" && <CustomerInfoTab order={order} />}
          {activeTab === "payment" && <PaymentInfoTab order={order} />}
        </div>

        {/* Footer with Status Update */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 sticky bottom-0">
          <OrderStatusUpdate order={order} onStatusUpdate={onStatusUpdate} />
        </div>
      </div>
    </div>
  );
}
