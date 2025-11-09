// components/admin/CustomerInfoTab.tsx
import { Order } from "@/lib/types";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface CustomerInfoTabProps {
  order: Order;
}

export function CustomerInfoTab({ order }: CustomerInfoTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Details
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">
                  {order.firstName} {order.lastName}
                </p>
                <p className="text-sm text-gray-500">Customer</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">{order.email}</p>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">{order.phone}</p>
                <p className="text-sm text-gray-500">Phone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">First Order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Shipping Address
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <p className="font-medium">
                {order.firstName} {order.lastName}
              </p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">
                {order.city}, {order.province}
              </p>
              {order.landmark && (
                <p className="text-gray-600">
                  <span className="font-medium">Landmark:</span>{" "}
                  {order.landmark}
                </p>
              )}
              {order.zip && (
                <p className="text-gray-600">
                  <span className="font-medium">ZIP:</span> {order.zip}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Stats (if we had more data) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Customer Activity</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">1</p>
            <p className="text-sm text-blue-600">Total Orders</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              Rs. {order.total}
            </p>
            <p className="text-sm text-green-600">Total Spent</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-purple-600">Pending Orders</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">100%</p>
            <p className="text-sm text-orange-600">Completion Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
