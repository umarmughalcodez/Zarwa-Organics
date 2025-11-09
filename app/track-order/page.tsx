"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Search,
} from "lucide-react";

interface Order {
  id: string;
  status: string;
  createdAt: string;
  trackingNumber?: string;
  city?: string;
  province?: string;
  total?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  zip?: string;
  address: string;
  landmark?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usePhone, setUsePhone] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const paramEmail = searchParams.get("email");
  const paramId = searchParams.get("id");
  const paramPhone = searchParams.get("phone");
  const router = useRouter();

  // Auto-fill from search params and auto-track
  useEffect(() => {
    if (paramId) setOrderId(paramId);
    if (paramEmail) {
      setEmail(paramEmail);
      setUsePhone(false);
    } else if (paramPhone) {
      setPhone(paramPhone);
      setUsePhone(true);
    }

    // Auto-track if both id + email/phone are present
    if (paramId && (paramEmail || paramPhone)) {
      setTimeout(() => {
        trackOrder(paramId, paramEmail || "", paramPhone || "");
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramId, paramEmail, paramPhone]);

  const trackOrder = async (
    orderIdParam?: string,
    emailParam?: string,
    phoneParam?: string
  ) => {
    const idToUse = orderIdParam || orderId;
    const emailToUse = emailParam || email;
    const phoneToUse = phoneParam || phone;

    if (!idToUse.trim()) return alert("Please enter your Order ID");
    if (!usePhone && !emailToUse.trim())
      return alert("Please enter your Email");
    if (usePhone && !phoneToUse.trim()) return alert("Please enter your Phone");

    setLoading(true);
    try {
      const params = new URLSearchParams({ orderId: idToUse.trim() });
      if (usePhone) params.append("phone", phoneToUse.trim());
      else params.append("email", emailToUse.trim());

      const res = await fetch(`/api/order/track?${params.toString()}`);
      const result = await res.json();

      if (result.success) setOrder(result.order);
      else alert(result.error || "Order not found!");
    } catch (error) {
      console.error("❌ Error tracking order:", error);
      alert("Network error, please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Order timeline steps
  const getOrderTimeline = (order: Order) => {
    const steps = [
      {
        status: "ordered",
        label: "Order Placed",
        description: "Your order has been received",
        date: order.createdAt,
        completed: true,
        icon: Package,
        color: "text-green-500",
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        description: "Your payment is verified & We're preparing your order",
        date: order.createdAt,
        completed: ["verified", "shipped", "delivered"].includes(order.status),
        icon: CheckCircle,
        color: "text-blue-500",
      },
      {
        status: "shipped",
        label: "Shipped",
        description: "Your order is on the way",
        date: order.shippedAt,
        completed: ["shipped", "delivered"].includes(order.status),
        icon: Truck,
        color: "text-purple-500",
      },
      {
        status: "delivered",
        label: "Delivered",
        description: "Order delivered successfully",
        date: order.deliveredAt,
        completed: order.status === "delivered",
        icon: CheckCircle,
        color: "text-green-500",
      },
    ];

    return steps;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      verified: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      verified: CheckCircle,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: Clock,
    };
    return icons[status as keyof typeof icons] || Package;
  };

  return (
    <div className="min-h-screen mt-40 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#8BBE67] mb-3">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your order details to check the current status and delivery
            updates
          </p>
        </div>

        {/* Search Card */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Order ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Order ID *
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Enter your Order ID (e.g., cmhmdp8cm0005im6gpvzsweae)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="pl-10 border-2 border-gray-200 focus:border-[#8BBE67] focus:ring-2 focus:ring-[#8BBE67]/20 transition-all"
                  />
                </div>
                <p className="text-xs text-[#8BBE67] mt-2">
                  🔑 Use the Order ID sent to you via email or WhatsApp
                </p>
              </div>

              {/* Contact Method Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Contact Method *
                </label>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setUsePhone(false)}
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                      !usePhone
                        ? "bg-[#8BBE67] text-white border-[#8BBE67] shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#8BBE67]"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Use Email</span>
                  </button>

                  <button
                    onClick={() => setUsePhone(true)}
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                      usePhone
                        ? "bg-[#8BBE67] text-white border-[#8BBE67] shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#8BBE67]"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Use Phone</span>
                  </button>
                </div>
              </div>

              {/* Email or Phone Input */}
              {!usePhone ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#8BBE67] focus:ring-2 focus:ring-[#8BBE67]/20"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    📧 Enter the email address used when placing the order
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    placeholder="0300 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#8BBE67] focus:ring-2 focus:ring-[#8BBE67]/20"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    📱 Enter the phone number used when placing the order
                  </p>
                </div>
              )}

              <Button
                onClick={() => trackOrder()}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8BBE67] to-[#6F8F58] hover:from-[#7CAE5A] hover:to-[#5E7F48] text-white py-3 text-lg font-semibold shadow-lg transition-all transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Tracking Order...
                  </div>
                ) : (
                  "Track My Order"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Timeline */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Truck className="w-6 h-6 text-[#8BBE67]" />
                    Order Journey
                  </h2>

                  <div className="space-y-6">
                    {getOrderTimeline(order).map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.status} className="flex gap-4">
                          {/* Timeline line */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? "bg-[#8BBE67] text-white"
                                  : "bg-gray-200 text-gray-400"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            {index < getOrderTimeline(order).length - 1 && (
                              <div
                                className={`flex-1 w-0.5 ${
                                  step.completed
                                    ? "bg-[#8BBE67]"
                                    : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-1">
                              <h3
                                className={`font-semibold ${
                                  step.completed
                                    ? "text-gray-800"
                                    : "text-gray-500"
                                }`}
                              >
                                {step.label}
                              </h3>
                              {step.date && (
                                <span className="text-sm text-gray-500">
                                  {formatDateTime(step.date)}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {step.description}
                            </p>
                            {step.status === "shipped" &&
                              order.trackingNumber && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                                  <p className="text-sm text-blue-800">
                                    <strong>Tracking Number:</strong>{" "}
                                    {order.trackingNumber}
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Current Status Card */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Current Status
                  </h3>
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-full ${
                        getStatusColor(order.status).split(" ")[0]
                      }`}
                    >
                      {(() => {
                        const Icon = getStatusIcon(order.status);
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.status === "pending" &&
                          "Waiting for verification"}
                        {order.status === "verified" &&
                          "Payment verified, preparing shipment"}
                        {order.status === "shipped" &&
                          "Your order is on the way"}
                        {order.status === "delivered" &&
                          "Order delivered successfully"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Information */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Order Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {order.id.slice(-8)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Order Date:
                      </span>
                      <span className="font-medium">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    {order.total && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="text-[#8BBE67] font-bold text-lg">
                          Rs. {order.total}
                        </span>
                      </div>
                    )}

                    {order.paymentMethod && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          Payment:
                        </span>
                        <span className="font-medium capitalize">
                          {order.paymentMethod.replace(/_/g, " ")}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#8BBE67]" />
                    Shipping Address
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="text-gray-600">{order.address}</p>
                    <p className="text-gray-600">
                      {order.city}, {order.province}
                    </p>
                    {order.landmark && (
                      <p className="text-gray-600">
                        <span className="font-medium">Near:</span>{" "}
                        {order.landmark}
                      </p>
                    )}
                    {order.zip && (
                      <p className="text-gray-600">
                        <span className="font-medium">ZIP:</span> {order.zip}
                      </p>
                    )}
                    {order.phone && (
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span>{" "}
                        {order.phone}
                      </p>
                    )}
                    {order.email && (
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span>{" "}
                        {order.email}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!order && (
          <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-green-50 to-cyan-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Need Help Tracking Your Order?
              </h3>
              <p className="text-gray-600 mb-4">
                If you're having any trouble regrading your order, contact our
                support team. Click the Whatsapp icon below to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  className="border-[#8BBE67] text-[#8BBE67] hover:bg-[#8BBE67] hover:text-white"
                  onClick={() => router.push("https://wa.me/923143988998")}
                >
                  💬 WhatsApp Support
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
