// app/checkout/success/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Mail,
  Phone,
  Clock,
  CheckCheck,
  Copy,
  Download,
} from "lucide-react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { downloadReceipt } from "@/lib/pdfGenerator";
import { FaWhatsapp } from "react-icons/fa";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);

  // Add this function to fetch order from API as fallback
  const fetchOrderFromAPI = async () => {
    try {
      console.log("🔍 [Success Page] Fetching order from API...");
      const response = await fetch(`/api/order/${orderId}`);
      if (response.ok) {
        const orderData = await response.json();
        setOrderDetails(orderData);
        console.log("✅ [Success Page] Order fetched from API:", orderData);

        // Also save to localStorage for future use
        localStorage.setItem("zarwa_temp_order", JSON.stringify(orderData));
      } else {
        console.error("❌ [Success Page] Failed to fetch order from API");
      }
    } catch (error) {
      console.error("❌ [Success Page] API fetch error:", error);
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      console.log("🔍 [Download Debug] Button clicked with:", {
        orderId,
        orderDetails,
        hasOrderDetails: !!orderDetails,
      });

      if (!orderDetails) {
        console.log(
          "❌ [Download Debug] No orderDetails, checking localStorage..."
        );
        const savedOrder = localStorage.getItem("zarwa_temp_order");
        if (savedOrder) {
          const parsedOrder = JSON.parse(savedOrder);
          console.log(
            "✅ [Download Debug] Found order in localStorage:",
            parsedOrder
          );
          setOrderDetails(parsedOrder);

          // Wait a moment for state to update, then try again
          setTimeout(() => {
            handleDownloadReceipt();
          }, 100);
          return;
        } else {
          toast.error("Order details not found. Please refresh the page.");
          return;
        }
      }

      toast.loading("Generating receipt...", { id: "pdf-download" });
      await downloadReceipt(orderId || "", orderDetails);
      toast.success("Receipt downloaded successfully!", { id: "pdf-download" });
    } catch (error) {
      console.error("❌ [Download Debug] Error downloading receipt:", error);
      toast.error("Failed to download receipt", { id: "pdf-download" });
    }
  };

  // UPDATE THE WINDOW DIMENSION LOGIC:
  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!orderId || orderId.length < 10) {
      console.error("Invalid order ID:", orderId);
      toast.error("Invalid Order ID, Please order again!");
      router.push("/shop");
      return;
    }

    try {
      const savedOrder = localStorage.getItem("zarwa_temp_order");
      console.log("🔍 [Success Page] localStorage data:", savedOrder);

      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        console.log("🔍 [Success Page] Parsed order:", order);

        // Only set order details if the orderId matches
        if (order.orderId === orderId) {
          setOrderDetails(order);
          console.log("✅ [Success Page] Order details set successfully");
        } else {
          console.warn("⚠️ [Success Page] Order ID mismatch");
          // Try to fetch from API as fallback
          fetchOrderFromAPI();
        }
      } else {
        console.warn("⚠️ [Success Page] No order found in localStorage");
        // Try to fetch from API as fallback
        fetchOrderFromAPI();
      }
    } catch (error) {
      console.error("❌ [Success Page] Failed to load order details:", error);
      fetchOrderFromAPI();
    }

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => clearTimeout(confettiTimer);
  }, [orderId]);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId || "");
      setCopied(true);
      toast.success("Order ID copied to clipboard!");

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy Order ID");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-30 py-10">
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.1}
          colors={["#8BBE67", "#6F8F58", "#4A6740", "#A8D672", "#C1E1A7"]}
          style={{ position: "fixed" }}
        />
      )}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <CheckCircle className="h-16 w-16 text-[#8BBE67]" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-[#8BBE67] mb-4 text-center"
      >
        Order Received!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-lg text-muted-foreground mb-8 text-center"
      >
        Thank you for your order! We've received your payment details and will
        verify them shortly.
      </motion.p>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 text-lg text-center">
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-[#8BBE67] mt-0.5" />
                <div>
                  <p className="font-medium">Payment Verification</p>
                  <p className="text-sm text-muted-foreground">
                    We will verify your payment within 2-4 hours during business
                    hours
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-[#8BBE67] mt-0.5" />
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    You will receive an order confirmation email once payment is
                    verified
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-[#8BBE67] mt-0.5" />
                <div>
                  <p className="font-medium">Shipping Updates</p>
                  <p className="text-sm text-muted-foreground">
                    We will Email & Whatsapp you tracking details once your
                    order is shipped
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {orderDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Order Details</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono text-sm">{orderId}</span>
                </div>

                {/* Payment Method */}
                <div className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span className="capitalize">
                    {orderDetails.paymentMethod?.replace("_", " ") ||
                      "Bank Transfer"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Payment Status:</span>
                  <span
                    className={`font-semibold ${
                      orderDetails.paymentStatus === "completed"
                        ? "text-green-600"
                        : orderDetails.paymentStatus === "failed"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {orderDetails.paymentStatus === "completed"
                      ? "Completed"
                      : orderDetails.paymentStatus === "failed"
                      ? "Failed"
                      : orderDetails.paymentMethod === "cod"
                      ? "Security Fee Paid (Pending Verification)"
                      : "Paid (Pending Verification)"}
                  </span>
                </div>

                {/* Shipping Address */}
                <div className="flex justify-between">
                  <span className="font-medium">Shipping Address:</span>
                  <span className="text-right">
                    {orderDetails.user?.address}
                    <br />
                    {orderDetails.user?.city}, {orderDetails.user?.province}
                    <br />
                    {orderDetails.user?.landmark &&
                      `Near ${orderDetails.user.landmark}`}
                    <br />
                    {orderDetails.user?.zip &&
                      `Postal: ${orderDetails.user.zip}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{orderDetails.user?.email}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{orderDetails.user?.phone}</span>
                </div>

                {/* Payment Summary */}
                <div className="border-t pt-3 mt-3 space-y-2">
                  {/* Common Fields */}
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {orderDetails.subtotal?.toLocaleString()}</span>
                  </div>

                  {orderDetails.totalSavings > 0 && (
                    <div className="flex justify-between text-[#8BBE67]">
                      <span>Total Savings:</span>
                      <span>
                        - Rs. {orderDetails.totalSavings?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {orderDetails.couponDiscount > 0 && (
                    <div className="flex justify-between">
                      <span>Coupon Discount ({orderDetails.couponCode}):</span>
                      <span>
                        - Rs. {orderDetails.couponDiscount?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {orderDetails.bulkDiscount > 0 && (
                    <div className="flex justify-between">
                      <span>Bulk Discount:</span>
                      <span>
                        - Rs. {orderDetails.bulkDiscount?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {/* Delivery Charges - You might want to add this field to schema */}
                  {orderDetails.deliveryCharges !== undefined && (
                    <div className="flex justify-between">
                      <span>Delivery Charges:</span>
                      <span>
                        {orderDetails.deliveryCharges === 0
                          ? "Free"
                          : `Rs. ${orderDetails.deliveryCharges?.toLocaleString()}`}
                      </span>
                    </div>
                  )}

                  {orderDetails.paymentMethod !== "cod" && (
                    <>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-bold text-md">
                          Total Amount Paid:
                        </span>
                        <span className="text-[#8BBE67] font-semibold text-md">
                          Rs. {orderDetails.total}
                        </span>
                      </div>
                      <span className="block text-red-500 text-xs">
                        (You will be notified through your email once your
                        payment is verified by us & your order will be
                        dispatched)
                      </span>
                    </>
                  )}

                  {/* COD SPECIFIC BREAKDOWN */}
                  {orderDetails.paymentMethod === "cod" &&
                    orderDetails.securityDeposit > 0 && (
                      <>
                        {/* Security Deposit */}
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-bold text-md">
                            Security Deposit Paid:
                          </span>
                          <span className="text-[#8BBE67] font-semibold text-md">
                            Rs. {orderDetails.securityDeposit?.toLocaleString()}
                          </span>
                        </div>

                        {/* Remaining Balance */}
                        <div className="flex justify-between p-2 rounded">
                          <span className="font-bold text-md">
                            Remaining Balance: <br />{" "}
                            <span className="text-xs">
                              (To be paid at delivery)
                            </span>
                          </span>
                          <span className="font-semibold text-md">
                            Rs.{" "}
                            {(
                              orderDetails.total - orderDetails.securityDeposit
                            )?.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-red-500 text-sm">
                          (You will be notified through your email once your
                          payment is verified by us & your order will be
                          dispatched)
                        </div>

                        {/* Final Total for COD */}
                        {/* <div className="flex justify-between border-t pt-2 font-bold text-lg">
                          <span>Total Paid Now:</span>
                          <span className="text-[#8BBE67]">
                            Rs. {orderDetails.securityDeposit?.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between font-bold text-lg">
                          <span>To Pay at Delivery:</span>
                          <span className="text-blue-600">
                            Rs.{" "}
                            {(
                              orderDetails.total - orderDetails.securityDeposit
                            )?.toLocaleString()}
                          </span>
                        </div> */}
                      </>
                    )}

                  {/* ONLINE PAYMENT BREAKDOWN */}
                  {/* {orderDetails.paymentMethod !== "cod" && (
                    <div className="flex justify-between border-t pt-2 font-bold text-lg">
                      <span>Total Amount Paid:</span>
                      <span className="text-[#8BBE67]">
                        Rs. {orderDetails.total?.toLocaleString()}
                      </span>
                    </div>
                  )} */}

                  {/* Security Deposit Note for COD */}
                  {/* {orderDetails.paymentMethod === "cod" && (
                    <div className="text-xs text-gray-500 mt-2 p-2 bg-yellow-50 rounded">
                      💡 <strong>Security Deposit Note:</strong> This amount
                      secures your order and will be deducted from your final
                      payment at delivery.
                    </div>
                  )} */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-center"
      >
        <Card className="mb-4">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-[#444] mb-2">
              How to Track Your Order
            </h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <p className="text-sm ">Save your Order ID:</p>
              <div className="flex items-center gap-2  px-3 py-1 rounded-lg border border-[#8BBE67]">
                <span className="font-mono text-sm text-[#8BBE67]">
                  {orderId}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyOrderId}
                  className="h-6 w-6 p-0 hover:bg-gray-200"
                >
                  {copied ? (
                    <CheckCheck className="h-3 w-3 text-[#8BBE67]" />
                  ) : (
                    <Copy className="h-3 w-3 text-[#8BBE67]" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-[#444]">
              Use your Order ID and email/number to track your order
            </p>
            <Button
              variant="outline"
              className="mt-3 border-[#8BBE67] text-[#8BBE67] hover:bg-[#8BBE67] hover:text-white transition-colors duration-150"
              onClick={() => router.push(`/track-order`)}
            >
              Track Order Now
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center space-y-4"
      >
        <p className="text-sm text-muted-foreground">
          Need help? Contact us at <strong>support@zarwaorganics.com</strong> or{" "}
          <strong>0314-3988998</strong>
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
          >
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://wa.me/923143988998", "_blank")}
            className="flex items-center gap-2"
          >
            <FaWhatsapp className="h-4 w-4" />
            Contact Whatsapp
          </Button>
          {/* <Button variant="outline" onClick={() => window.print()}>
            Print Receipt
          </Button> */}
        </div>
      </motion.div>

      {/* Temporary Debug Section - Remove after testing */}
      {/* <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded-lg border border-yellow-300 text-xs max-w-xs">
        <strong>Debug Info:</strong>
        <div>Order ID: {orderId}</div>
        <div>Has Order Details: {orderDetails ? "Yes" : "No"}</div>
        <div>
          LocalStorage:{" "}
          {typeof window !== "undefined"
            ? localStorage.getItem("zarwa_temp_order")
              ? "Has Data"
              : "Empty"
            : "No Window"}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const saved = localStorage.getItem("zarwa_temp_order");
            console.log("LocalStorage zarwa_temp_order:", saved);
            if (saved) {
              console.log("Parsed:", JSON.parse(saved));
            }
          }}
          className="mt-2"
        >
          Check LocalStorage
        </Button>
      </div> */}
    </div>
  );
}
