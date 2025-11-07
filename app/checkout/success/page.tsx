// app/checkout/success/page.tsx
"use client";

import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

export default function SuccessPage() {
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

  function calculateSecurityDeposit(totalAmount: number): number {
    if (totalAmount < 1000) return 150;
    if (totalAmount < 2000) return 300;
    if (totalAmount < 4000) return 500;
    return 800;
  }

  // UPDATE THE WINDOW DIMENSION LOGIC:
  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Initial set
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

    // setWindowDimension({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // });

    try {
      const savedOrder = localStorage.getItem("zarwa_temp_order");
      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        setOrderDetails(order);
      }
    } catch (error) {
      console.error("Failed to load order details:", error);
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
    // ADD THIS AT THE BEGINNING OF THE RETURN:

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
                    We will SMS you tracking details once your order is shipped
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* // Update your success page to show payment method // In
      app/checkout/success/page.tsx, add this to the order details:
      <div className="flex justify-between">
        <span className="font-medium">Payment Method:</span>
        <span className="capitalize">
          {orderDetails.paymentMethod?.replace("_", " ") || "Bank Transfer"}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Payment Status:</span>
        <span className="text-yellow-600 font-semibold">
          Pending Verification
        </span>
      </div> */}
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
                {/* ADD COMPLETE ADDRESS PREVIEW */}
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
                {/* END OF ADDRESS PREVIEW */}
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{orderDetails.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{orderDetails.user?.phone}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold">Total Amount:</span>
                  <span className="text-[#8BBE67] font-bold">
                    Rs. {orderDetails.total}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {/* // Add to your success page, after the order details: */}
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
            {/* <p className="text-sm text-[#8BBE67] mb-3">
              Save your Order ID:{" "}
              <strong className="font-mono">{orderId}</strong>
            </p> */}
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
              Use your Order ID and email to track your order
            </p>
            <Button
              variant="outline"
              className="mt-3 border-green-200 text-[#8BBE67] hover:bg-[#8BBE67] hover:text-white transition-colors duration-150"
              onClick={() => router.push(`/track-order`)}
            >
              Track Order Now
            </Button>
          </CardContent>
        </Card>
        <div className="mb-4">
          <p className="text-sm text-[#8BBE67] mb-2">Save your Order ID:</p>
          <div className="flex items-center gap-2 bg-[#8BBE67]/10 border border-[#8BBE67]/20 rounded-lg px-3 py-2">
            <span className="font-mono text-sm flex-1">{orderId}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyOrderId}
              className="h-7 w-7 p-0 hover:bg-[#8BBE67]/20 transition-colors"
              title="Copy Order ID"
            >
              {copied ? (
                <CheckCheck className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-[#8BBE67]" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center space-y-4"
      >
        <p className="text-sm text-muted-foreground">
          Need help? Contact us at <strong>support@zarwaorganics.com</strong> or{" "}
          <strong>0300-1234567</strong>
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
          >
            Continue Shopping
          </Button>

          <Button variant="outline" onClick={() => window.print()}>
            Print Receipt
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
