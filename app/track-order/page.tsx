// "use client";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// interface Order {
//   id: string;
//   status: string;
//   createdAt: string;
//   trackingNumber?: string;
//   city?: string;
//   province?: string;
//   total?: number;
//   paymentMethod?: string;
//   paymentStatus?: string;
//   zip?: string;
//   address: string;
//   landmark?: string;
// }

// export default function TrackOrderPage() {
//   const [orderId, setOrderId] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState(""); // NEW: Phone number field
//   const [usePhone, setUsePhone] = useState(false); // NEW: Toggle between email/phone
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(false);

//   const trackOrder = async () => {
//     // Validate inputs
//     if (!orderId.trim()) {
//       alert("Please enter your Order ID");
//       return;
//     }

//     if (!usePhone && !email.trim()) {
//       alert("Please enter your email address");
//       return;
//     }

//     if (usePhone && !phone.trim()) {
//       alert("Please enter your phone number");
//       return;
//     }

//     setLoading(true);
//     try {
//       console.log("🟡 Tracking order:", { orderId, email, phone, usePhone });

//       // Build the API URL based on whether using email or phone
//       const params = new URLSearchParams({
//         orderId: orderId.trim(),
//       });

//       if (usePhone) {
//         params.append("phone", phone.trim());
//       } else {
//         params.append("email", email.trim());
//       }

//       const response = await fetch(`/api/order/track?${params.toString()}`);

//       console.log("🟡 API Response status:", response.status);

//       const result = await response.json();
//       console.log("🟡 API Response data:", result);

//       if (result.success) {
//         setOrder(result.order);
//       } else {
//         alert(
//           result.error || "Order not found! Please check your information."
//         );
//         setOrder(null);
//       }
//     } catch (error) {
//       console.error("❌ Tracking error:", error);
//       alert("Network error! Please check your connection and try again.");
//       setOrder(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date to be more readable
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-PK", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 mt-30">
//       <h1 className="text-3xl font-bold text-[#8BBE67] mb-6 text-center">
//         Track Your Order
//       </h1>

//       <Card className="mb-6">
//         <CardContent className="pt-6">
//           <div className="space-y-4">
//             {/* Order ID Input */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Order ID *
//               </label>
//               <p className="text-xs text-[#8BBE67] mb-3">
//                 (Use Order ID sent to you in email or Whatsapp)
//               </p>
//               <Input
//                 placeholder="e.g., cmhmdp8cm0005im6gpvzsweae"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//               />
//             </div>

//             {/* Toggle between Email and Phone */}
//             <div className="flex space-x-4 mb-4">
//               <button
//                 type="button"
//                 onClick={() => setUsePhone(false)}
//                 className={`flex-1 py-2 px-4 rounded-lg border ${
//                   !usePhone
//                     ? "bg-[#8BBE67] text-white border-[#8BBE67]"
//                     : "bg-gray-100 border-gray-300"
//                 }`}
//               >
//                 Use Email
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setUsePhone(true)}
//                 className={`flex-1 py-2 px-4 rounded-lg border ${
//                   usePhone
//                     ? "bg-[#8BBE67] text-white border-[#8BBE67]"
//                     : "bg-gray-100 border-gray-300"
//                 }`}
//               >
//                 Use Phone
//               </button>
//             </div>

//             {/* Email or Phone Input */}
//             {!usePhone ? (
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Email Address *
//                 </label>
//                 <Input
//                   type="email"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter the email used when placing order
//                 </p>
//               </div>
//             ) : (
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Phone Number *
//                 </label>
//                 <Input
//                   placeholder="0300 123 4567"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter the phone number used when placing order
//                 </p>
//               </div>
//             )}

//             <Button
//               onClick={trackOrder}
//               disabled={loading}
//               className="w-full bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
//             >
//               {loading ? "Checking..." : "Track Order"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {order && (
//         <Card>
//           <CardContent className="pt-6">
//             <h2 className="text-xl font-semibold mb-4 text-[#8BBE67]">
//               Order Status
//             </h2>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="font-medium">Order ID:</span>
//                 <span className="font-mono text-sm">{order.id}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Shipping Address:</span>
//                 <span className="text-right">
//                   {order.address}
//                   <br />
//                   {order.city}, {order.province}
//                   <br />
//                   {order.landmark && `Near ${order.landmark}`}
//                   {order.zip && ` • ${order.zip}`}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Status:</span>
//                 <span
//                   className={`font-semibold ${
//                     order.status === "delivered"
//                       ? "text-green-600"
//                       : order.status === "shipped"
//                       ? "text-blue-600"
//                       : order.status === "processing"
//                       ? "text-yellow-600"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {order.status?.toUpperCase()}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Order Date:</span>
//                 <span>{formatDate(order.createdAt)}</span>
//               </div>
//               {order.total && (
//                 <div className="flex justify-between">
//                   <span className="font-medium">Total:</span>
//                   <span className="text-[#8BBE67] font-bold">
//                     Rs. {order.total}
//                   </span>
//                 </div>
//               )}
//               {order.paymentMethod && (
//                 <div className="flex justify-between">
//                   <span className="font-medium">Payment Method:</span>
//                   <span className="capitalize">
//                     {order.paymentMethod?.replace(/_/g, " ") || "Not specified"}
//                   </span>
//                 </div>
//               )}
//               {order.paymentStatus && (
//                 <div className="flex justify-between">
//                   <span className="font-medium">Payment Status:</span>
//                   <span className="text-yellow-600 font-semibold">
//                     {order.paymentStatus?.replace(/_/g, " ").toUpperCase() ||
//                       "PENDING"}
//                   </span>
//                 </div>
//               )}
//               {order.trackingNumber && (
//                 <div className="flex justify-between">
//                   <span className="font-medium">Tracking #:</span>
//                   <span className="font-mono text-blue-600">
//                     {order.trackingNumber}
//                   </span>
//                 </div>
//               )}
//               {order.city && order.province && (
//                 <div className="flex justify-between">
//                   <span className="font-medium">Shipping to:</span>
//                   <span className="text-right">
//                     {order.city}, {order.province}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//       {/* {order && (
//         <Card>
//           <CardContent className="pt-6">
//             <h2 className="text-xl font-semibold mb-4 text-[#8BBE67]">
//               Order Status
//             </h2>
//             <div className="space-y-2">

//               <div className="flex justify-between">
//                 <span className="font-medium">Shipping Address:</span>
//                 <span className="text-right">
//                   {order.address}
//                   <br />
//                   {order.city}, {order.province}
//                   <br />
//                   {order.landmark && `Near ${order.landmark}`}
//                   {order.zip && ` • ${order.zip}`}
//                 </span>
//               </div>

//             </div>
//           </CardContent>
//         </Card>
//       )} */}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

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

  // 🟢 Auto-fill from search params and auto-track
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

  // 🟡 Make trackOrder reusable (so it can be called manually or via auto)
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

  return (
    <div className="max-w-md mx-auto p-6 mt-30">
      <h1 className="text-3xl font-bold text-[#8BBE67] mb-6 text-center">
        Track Your Order
      </h1>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Order ID */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Order ID *
              </label>
              <Input
                placeholder="e.g., cmhmdp8cm0005im6gpvzsweae"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>

            {/* Toggle email/phone */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setUsePhone(false)}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  !usePhone
                    ? "bg-[#8BBE67] text-white border-[#8BBE67]"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                Use Email
              </button>
              <button
                onClick={() => setUsePhone(true)}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  usePhone
                    ? "bg-[#8BBE67] text-white border-[#8BBE67]"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                Use Phone
              </button>
            </div>

            {/* Email or Phone Input */}
            {!usePhone ? (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <Input
                  placeholder="0300 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}

            <Button
              onClick={() => trackOrder()}
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
            >
              {loading ? "Checking..." : "Track Order"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🧾 Order Details */}
      {order && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-[#8BBE67]">
              Order Status
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Order ID:</span>
                <span className="font-mono text-sm">{order.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`font-semibold ${
                    order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "shipped"
                      ? "text-blue-600"
                      : order.status === "processing"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {order.status?.toUpperCase()}
                </span>
              </div>

              {order.total && (
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="text-[#8BBE67] font-bold">
                    Rs. {order.total}
                  </span>
                </div>
              )}

              {order.paymentMethod && (
                <div className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span className="capitalize">
                    {order.paymentMethod.replace(/_/g, " ")}
                  </span>
                </div>
              )}

              {order.paymentStatus && (
                <div className="flex justify-between">
                  <span className="font-medium">Payment Status:</span>
                  <span className="text-yellow-600 font-semibold">
                    {order.paymentStatus.replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="font-medium">Shipping Address:</span>
                <span className="text-right">
                  {order.address}, {order.city}, {order.province}
                  <br />
                  {order.landmark && `Near ${order.landmark}`}
                  {order.zip && ` • ${order.zip}`}
                </span>
              </div>

              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="font-medium">Tracking #:</span>
                  <span className="font-mono text-blue-600">
                    {order.trackingNumber}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
