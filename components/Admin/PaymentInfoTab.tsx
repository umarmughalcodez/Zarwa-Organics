// components/admin/PaymentInfoTab.tsx
import { Order } from "@/lib/types";
import { CreditCard, Shield, Camera, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentInfoTabProps {
  order: Order;
}

export function PaymentInfoTab({ order }: PaymentInfoTabProps) {
  const getPaymentMethodIcon = (method: string) => {
    const icons = {
      cod: "💰",
      jazzcash: "📱",
      easypaisa: "📱",
      bank: "🏦",
    };
    return icons[method as keyof typeof icons] || "💳";
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-100",
      completed: "text-green-600 bg-green-100",
      failed: "text-red-600 bg-red-100",
      pending_verification: "text-blue-600 bg-blue-100",
      pending_deposit: "text-orange-600 bg-orange-100",
    };
    return colors[status as keyof typeof colors] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Details
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Method:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {getPaymentMethodIcon(order.paymentMethod || "")}
                </span>
                <span className="font-medium capitalize">
                  {order.paymentMethod}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                  order.paymentStatus
                )}`}
              >
                {order.paymentStatus.replace("_", " ")}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Order Total:</span>
              <span className="font-medium">Rs. {order.total}</span>
            </div>

            {order.securityDeposit > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Security Deposit:</span>
                <span className="font-medium text-blue-600">
                  Rs. {order.securityDeposit}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <span className="text-sm font-semibold">Amount Paid:</span>
              <span className="font-bold text-[#8BBE67]">
                Rs.{" "}
                {order.paymentMethod === "cod"
                  ? order.securityDeposit
                  : order.total}
              </span>
            </div>

            {order.paymentMethod === "cod" && order.securityDeposit > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">COD Security Deposit</p>
                    <p>
                      Customer paid Rs. {order.securityDeposit} as security
                      deposit
                    </p>
                    <p>
                      Remaining Rs. {order.total - order.securityDeposit} to be
                      paid on delivery
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Proof */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Payment Proof
          </h3>
          {order.paymentScreenshot ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                <img
                  src={order.paymentScreenshot}
                  alt="Payment proof"
                  className="w-full h-48 object-contain rounded"
                />
              </div>
              <Button
                onClick={() => window.open(order.paymentScreenshot, "_blank")}
                className="w-full bg-[#8BBE67] hover:bg-[#6F8F58]"
              >
                View Full Image
              </Button>
              <div className="text-xs text-gray-500 text-center">
                Click to view payment proof in full size
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No payment proof uploaded</p>
              <p className="text-sm text-gray-400 mt-1">
                {order.paymentMethod === "cod"
                  ? "COD orders may not require payment proof"
                  : "Customer has not uploaded payment proof"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Timeline */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#8BBE67] rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Order Created</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {order.paymentScreenshot && (
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Payment Proof Uploaded</p>
                <p className="text-sm text-gray-500">
                  {order.updatedAt
                    ? new Date(order.updatedAt).toLocaleString()
                    : "Recently"}
                </p>
              </div>
            </div>
          )}

          {/* Add more timeline events as payment status changes */}
        </div>
      </div>
    </div>
  );
}
