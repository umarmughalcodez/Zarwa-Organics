// app/checkout/success/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Phone, Clock } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("zarwa_temp_order");
      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        setOrderDetails(order);
      }
    } catch (error) {
      console.error("Failed to load order details:", error);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-30">
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
            <h3 className="font-semibold mb-4 text-lg">What happens next?</h3>
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
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{orderDetails.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{orderDetails.user?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping Address:</span>
                  <span className="text-right">
                    {orderDetails.user?.city}, {orderDetails.user?.zip}
                  </span>
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
