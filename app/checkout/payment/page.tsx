// app/checkout/payment/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import toast from "react-hot-toast";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orderData, setOrderData] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const orderId = searchParams?.get("orderId");
  const qty = searchParams?.get("qty");
  const total = searchParams?.get("total");
  const totalAmount = total ? parseInt(total) : 0;

  // Calculate security deposit based on order total
  const calculateSecurityDeposit = (amount: number) => {
    if (amount < 1000) return 150;
    if (amount < 2000) return 300;
    if (amount < 4000) return 500;
    return 800; // for 5000 and above
  };

  const securityDeposit = calculateSecurityDeposit(totalAmount);
  const remainingAmount = totalAmount - securityDeposit;

  useEffect(() => {
    // Load order data from localStorage
    try {
      const savedOrder = localStorage.getItem("zarwa_temp_order");
      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        setOrderData(order);
      }
    } catch (error) {
      console.error("Failed to load order data:", error);
    }

    // Validate required parameters
    if (!orderId || !total) {
      toast.error("Invalid order details. Please start over.");
      router.push("/checkout");
    }
  }, [orderId, total, router]);

  const handleScreenshotUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setScreenshot(file);
    setIsUploading(true);

    try {
      // Create form data for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "zarwa_organics"); // You'll need to create this in Cloudinary

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedImageUrl(result.imageUrl);
        toast.success("Screenshot uploaded successfully!");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload screenshot. Please try again.");
      setScreenshot(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (selectedMethod !== "cod" && !uploadedImageUrl) {
      toast.error("Please upload payment screenshot");
      return;
    }

    try {
      // Update order with payment details
      const updateResponse = await fetch("/api/order/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          paymentMethod: selectedMethod,
          paymentStatus:
            selectedMethod === "cod"
              ? "pending_deposit"
              : "pending_verification",
          securityDeposit:
            selectedMethod === "cod" ? securityDeposit : totalAmount,
          screenshotUrl: uploadedImageUrl,
          totalAmount: totalAmount,
        }),
      });

      const result = await updateResponse.json();

      if (result.success) {
        toast.success(
          "Order confirmed! We will verify your payment and contact you soon."
        );

        // Clear temporary order data
        localStorage.removeItem("zarwa_temp_order");

        // Redirect to success page
        setTimeout(() => {
          router.push(`/checkout/success?orderId=${orderId}`);
        }, 1000);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error("Order confirmation failed:", error);
      toast.error("Failed to confirm order. Please try again.");
    }
  };

  const paymentMethods = [
    {
      id: "jazzcash",
      name: "JazzCash",
      number: "0325-4307806",
      account: "Zarwa Organic Store",
      type: "full",
    },
    {
      id: "easypaisa",
      name: "EasyPaisa",
      number: "0325-4307806",
      account: "Zarwa Organic Store",
      type: "full",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      number: "UBL Account # 1234-5678901234",
      account: "Zarwa Organic Store",
      type: "full",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      number:
        "Pay Rs. " +
        securityDeposit +
        " now, Rs. " +
        remainingAmount +
        " on delivery",
      account: "Security Deposit Required",
      type: "deposit",
    },
  ];

  if (!orderId || !total) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-30 text-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Order</h1>
        <p className="mt-4">Please return to checkout and try again.</p>
        <Button
          onClick={() => router.push("/checkout")}
          className="mt-4 bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
        >
          Return to Checkout
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-30">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-3xl font-semibold mb-6"
      >
        Payment Method
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {paymentMethods.map((method) => (
                <AccordionItem key={method.id} value={method.id}>
                  <AccordionTrigger
                    onClick={() => setSelectedMethod(method.id)}
                    className={`${
                      selectedMethod === method.id
                        ? "bg-green-50 border-green-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      ></div>
                      <span>{method.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-semibold">Account Name:</span>
                        <span>{method.account}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">
                          {method.id === "bank"
                            ? "Account Number:"
                            : "Mobile Number:"}
                        </span>
                        <span className="font-mono">{method.number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Amount to Pay:</span>
                        <span className="text-green-600 font-bold">
                          {method.type === "full"
                            ? `Rs. ${totalAmount}`
                            : `Rs. ${securityDeposit} (Security Deposit)`}
                        </span>
                      </div>
                      {method.type === "deposit" && (
                        <div className="text-sm text-gray-600 mt-2">
                          <p>
                            💰 Pay Rs. {securityDeposit} now as security deposit
                          </p>
                          <p>
                            📦 Pay remaining Rs. {remainingAmount} when you
                            receive your order
                          </p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Screenshot Upload - Show for non-COD methods */}
            {selectedMethod && selectedMethod !== "cod" && (
              <div className="mt-6 space-y-3">
                <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <p className="text-sm text-blue-600">Uploading...</p>
                )}
                {uploadedImageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">
                      ✓ Screenshot uploaded successfully
                    </p>
                    <img
                      src={uploadedImageUrl}
                      alt="Payment screenshot"
                      className="mt-2 max-w-xs rounded border"
                    />
                  </div>
                )}
              </div>
            )}

            {/* For COD - Security Deposit Payment */}
            {selectedMethod === "cod" && (
              <div className="mt-6 space-y-3">
                <Label htmlFor="cod-screenshot">
                  Upload Security Deposit Screenshot (Rs. {securityDeposit})
                </Label>
                <Input
                  id="cod-screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <p className="text-sm text-blue-600">Uploading...</p>
                )}
                {uploadedImageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">
                      ✓ Security deposit screenshot uploaded
                    </p>
                    <img
                      src={uploadedImageUrl}
                      alt="Security deposit screenshot"
                      className="mt-2 max-w-xs rounded border"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  🔒 Your order will be confirmed after we verify your security
                  deposit of Rs. {securityDeposit}
                </p>
              </div>
            )}

            {/* Confirm Order Button */}
            <Button
              onClick={handleConfirmOrder}
              disabled={
                !selectedMethod ||
                (selectedMethod !== "cod" && !uploadedImageUrl) ||
                (selectedMethod === "cod" && !uploadedImageUrl) ||
                isUploading
              }
              className="w-full bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white mt-6"
            >
              {isUploading ? "Uploading..." : "Confirm Order"}
            </Button>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {orderData ? (
              // <>
              //   <div className="flex items-center gap-4 mb-4">
              //     <img
              //       src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
              //       alt="Zarwa Hair Growth Oil"
              //       className="w-16 h-16 object-cover rounded"
              //     />
              //     <div>
              //       <div className="font-semibold">Zarwa Hair Growth Oil</div>
              //       <div className="text-sm">Qty: {qty}</div>
              //       <div className="text-sm text-[#8BBE67]">
              //         Rs. {orderData.total}
              //       </div>
              //     </div>
              //   </div>

              //   <div className="border-t pt-4 space-y-2">
              //     <div className="flex justify-between">
              //       <span>Order ID:</span>
              //       <span className="text-sm font-mono">{orderId}</span>
              //     </div>
              //     <div className="flex justify-between">
              //       <span>Email:</span>
              //       <span className="text-sm">{orderData.user?.email}</span>
              //     </div>
              //     <div className="flex justify-between">
              //       <span>Shipping to:</span>
              //       <span className="text-sm text-right">
              //         {orderData.user?.city}, {orderData.user?.zip}
              //       </span>
              //     </div>

              //     {/* Payment Summary */}
              //     <div className="border-t mt-4 pt-4 space-y-2">
              //       <div className="flex justify-between font-semibold">
              //         <span>Order Total:</span>
              //         <span>Rs. {totalAmount}</span>
              //       </div>
              //       {selectedMethod === "cod" && (
              //         <>
              //           <div className="flex justify-between text-green-600">
              //             <span>Security Deposit:</span>
              //             <span>- Rs. {securityDeposit}</span>
              //           </div>
              //           <div className="flex justify-between text-blue-600">
              //             <span>Pay on Delivery:</span>
              //             <span>Rs. {remainingAmount}</span>
              //           </div>
              //         </>
              //       )}
              //     </div>
              //   </div>
              // </>
              <>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/images/img3.png"
                    alt="Zarwa Hair Growth Oil"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="font-semibold">Zarwa Hair Growth Oil</div>
                    <div className="text-sm">Qty: {qty}</div>
                    <div className="text-sm text-[#8BBE67]">
                      Rs. {orderData.total}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="text-sm font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="text-sm">{orderData.user?.email}</span>
                  </div>
                  {/* ADD ADDRESS PREVIEW */}
                  <div className="flex justify-between">
                    <span>Shipping to:</span>
                    <span className="text-sm text-right">
                      {orderData.user?.address}
                      <br />
                      {orderData.user?.city}, {orderData.user?.province}
                      <br />
                      {orderData.user?.landmark &&
                        `Near ${orderData.user.landmark}`}
                      {orderData.user?.zip && ` • ${orderData.user.zip}`}
                    </span>
                  </div>
                  {/* END OF ADDRESS PREVIEW */}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8BBE67] mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Loading order details...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
