// components/admin/OrderDetailsTab.tsx
import { Order } from "@/lib/types";
import { Package, Truck, Calendar, Tag, TruckIcon } from "lucide-react";

interface OrderDetailsTabProps {
  order: Order;
}

export function OrderDetailsTab({ order }: OrderDetailsTabProps) {
  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Items
        </h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Unit Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Discount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.orderItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {item.productName}
                    </div>
                    <div className="text-sm text-gray-500">
                      SKU: {item.productId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Rs. {item.unitPrice}
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600">
                    {item.bulkDiscountPct}%
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    Rs. {item.unitPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Order Summary
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <span className="text-sm font-medium">Rs. {order.subtotal}</span>
            </div>

            {order.bulkDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bulk Discount:</span>
                <span className="text-sm font-medium text-green-600">
                  - Rs. {order.bulkDiscount}
                </span>
              </div>
            )}

            {order.couponDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Coupon Discount ({order.couponCode}):
                </span>
                <span className="text-sm font-medium text-green-600">
                  - Rs. {order.couponDiscount}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Delivery Charges:</span>
              <span
                className={`text-sm font-medium ${
                  order.deliveryCharges === 0 ? "text-green-600" : ""
                }`}
              >
                {order.deliveryCharges === 0
                  ? "FREE"
                  : `Rs. ${order.deliveryCharges}`}
              </span>
            </div>

            {order.securityDeposit > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Security Deposit:</span>
                <span className="text-sm font-medium text-blue-600">
                  Rs. {order.securityDeposit}
                </span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-base font-semibold">Total Amount:</span>
              <span className="text-base font-bold text-[#8BBE67]">
                Rs. {order.total}
              </span>
            </div>

            {order.totalSavings > 0 && (
              <div className="text-sm text-green-600 text-center">
                Customer saved Rs. {order.totalSavings} in total
              </div>
            )}
          </div>
        </div>

        {/* Order Timeline */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#8BBE67] rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Order Placed</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {order.shippedAt && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Order Shipped</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.shippedAt).toLocaleString()}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm">Tracking: {order.trackingNumber}</p>
                  )}
                </div>
              </div>
            )}

            {order.deliveredAt && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Order Delivered</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.deliveredAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Order Information */}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-gray-900">
              Additional Information
            </h4>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Order Date:
              </span>
              <span className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {order.couponCode && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Coupon Used:
                </span>
                <span className="font-medium text-[#8BBE67]">
                  {order.couponCode}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <TruckIcon className="w-4 h-4" />
                Delivery Type:
              </span>
              <span className="font-medium capitalize">
                {order.deliveryCharges === 0
                  ? "Free Delivery"
                  : "Standard Delivery"}
              </span>
            </div>

            {order.trackingMessage && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                <p className="text-sm text-blue-800">
                  <strong>Tracking Message:</strong> {order.trackingMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Notes Section (for internal use) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Order Notes</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Internal Note:</strong> This order requires manual payment
            verification. Please check the payment screenshot in the Payment tab
            and update the status accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
