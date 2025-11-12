"use client";

import React, { useState, useEffect, Suspense } from "react";
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
import { Order } from "@/lib/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function PaymentPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PaymentContent />
    </Suspense>
  );
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orderData, setOrderData] = useState<Order | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const orderId = searchParams?.get("orderId");
  // const qty = searchParams?.get("qty");
  // const total = searchParams?.get("total");
  // const totalAmount = total ? parseInt(total) : 0;
  const qtyParam = searchParams?.get("qty");
  const totalParam = searchParams?.get("total");

  const qty = qtyParam ? parseInt(qtyParam) : 1;
  const totalAmount = totalParam ? parseInt(totalParam) : 0;

  // Calculate security deposit based on order total
  const calculateSecurityDeposit = (amount: number) => {
    if (amount < 1000) return 150;
    if (amount < 2000) return 300;
    if (amount < 4000) return 500;
    return 800; // for 5000 and above
  };

  const securityDeposit = calculateSecurityDeposit(totalAmount);

  const getDeliveryCharges = (qty: number, total: number) => {
    if (qty >= 3 || total >= 2000) return 0;
    return 200;
  };

  // const deliveryCharges = orderData?.deliveryCharges || 0;
  const deliveryCharges = getDeliveryCharges(qty, totalAmount);
  const totalWithDelivery = totalAmount + deliveryCharges;
  const codTotalAmount = totalAmount + deliveryCharges; // This includes delivery for COD

  // COD remaining amount
  // COD remaining amount (should include delivery charges)
  const remainingAmount = totalAmount + deliveryCharges - securityDeposit;

  // Add this function to update localStorage with payment method
  const updateOrderWithPaymentMethod = (paymentMethod: string) => {
    try {
      const savedOrder = localStorage.getItem("zarwa_temp_order");
      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        const updatedOrder = {
          ...order,
          paymentMethod: paymentMethod,
          paymentStatus: "pending_verification",
        };
        localStorage.setItem("zarwa_temp_order", JSON.stringify(updatedOrder));
        console.log("✅ Payment method saved to localStorage:", paymentMethod);
      }
    } catch (error) {
      console.error("Failed to update order with payment method:", error);
    }
  };

  useEffect(() => {
    // Load order data from localStorage
    try {
      const savedOrder = localStorage.getItem("zarwa_temp_order");
      if (savedOrder) {
        const order = JSON.parse(savedOrder);
        setOrderData(order);
        console.log("✅ Order data loaded from localStorage:", order);
      }
    } catch (error) {
      console.error("Failed to load order data:", error);
    }

    // Validate required parameters
    if (!orderId || !totalParam) {
      toast.error("Invalid order details. Please start over.");
      router.push("/checkout");
    }
  }, [orderId, totalParam, router]);

  // Update localStorage when payment method changes
  useEffect(() => {
    if (selectedMethod) {
      updateOrderWithPaymentMethod(selectedMethod);
    }
  }, [selectedMethod]);

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
          deliveryCharges: deliveryCharges, // ADD THIS LINE
        }),
      });

      const result = await updateResponse.json();

      if (result.success) {
        toast.success(
          "Order confirmed! We will verify your payment and contact you soon."
        );

        //sending email

        // Update localStorage with final payment details
        try {
          const savedOrder = localStorage.getItem("zarwa_temp_order");
          if (savedOrder) {
            const order = JSON.parse(savedOrder);
            const finalOrder = {
              ...order,
              paymentMethod: selectedMethod,
              paymentStatus:
                selectedMethod === "cod"
                  ? "pending_deposit"
                  : "pending_verification",
              securityDeposit:
                selectedMethod === "cod" ? securityDeposit : totalAmount,
              paymentScreenshot: uploadedImageUrl,
            };
            localStorage.setItem(
              "zarwa_temp_order",
              JSON.stringify(finalOrder)
            );
            console.log("✅ Final order saved to localStorage:", finalOrder);
          }

          const finalOrder = {
            ...orderData,
            paymentMethod: selectedMethod,
            paymentStatus:
              selectedMethod === "cod"
                ? "pending_deposit"
                : "pending_verification",
            securityDeposit:
              selectedMethod === "cod" ? securityDeposit : totalAmount,
            paymentScreenshot: uploadedImageUrl,
          };

          const notifyResponse = await fetch("/api/order/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order: finalOrder,
              customerEmail: orderData?.user?.email || orderData?.email || "",
              savedOrder: savedOrder,
            }),
          });

          const notifyResult = await notifyResponse.json();
          console.log("Notify API result:", notifyResult);

          if (!notifyResult.success) {
            toast.error("Failed to send notification. Please check later.");
          }
        } catch (error) {
          console.error("Failed to update localStorage:", error);
        }

        // Redirect to success page
        setTimeout(() => {
          router.push(`/checkout/success?orderId=${orderId}`);
        }, 1000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Order confirmation failed:", error);
      toast.error("Failed to confirm order. Please try again.");
    }
  };

  const paymentMethods = [
    {
      id: "jazzcash",
      name: "JazzCash",
      number: "0325-4307806",
      account: "Qudsai Asif",
      type: "full",
    },
    {
      id: "easypaisa",
      name: "EasyPaisa",
      number: "0325-4307806",
      account: "Qudsia Asif",
      type: "full",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      number: "Nayapay Account # 0333-4142730",
      account: "Qudsia Asif",
      type: "full",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      number:
        "Pay Rs. " +
        securityDeposit +
        " now, Rs. " +
        (totalAmount + deliveryCharges - securityDeposit) +
        " on delivery",
      account: "Security Deposit Required",
      type: "deposit",
      deliveryInfo:
        deliveryCharges === 0
          ? "Free Delivery"
          : `Delivery: Rs. ${deliveryCharges}`,
    },
  ];

  if (!orderId || !totalParam) {
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
                      {/* {method.deliveryInfo && (
                        <div className="flex justify-between">
                          <span className="font-semibold">Delivery:</span>
                          <span
                            className={
                              deliveryCharges === 0 ? "text-[#8BBE67]" : ""
                            }
                          >
                            {method.deliveryInfo}
                          </span>
                        </div>
                      )} */}

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
                          {deliveryCharges === 0 && (
                            <p className="text-[#8BBE67]">
                              🚚 Free delivery applied (3+ bottles)
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Screenshot Upload - Show for non-COD methods */}
            {/* {selectedMethod && selectedMethod !== "cod" && (
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
            )} */}

            {selectedMethod && selectedMethod !== "cod" && (
              <div className="mt-6 space-y-3">
                <Label
                  htmlFor="screenshot"
                  className="text-sm font-semibold text-gray-700"
                >
                  Upload Payment Proof
                </Label>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">📋</span>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Simple 3-Step Process:</p>
                      <p>1. Complete your payment</p>
                      <p>2. Take a screenshot of transaction</p>
                      <p>3. Upload it here to confirm your order</p>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-dashed border-[#8BBE67] rounded-lg p-4 text-center transition-colors hover:bg-green-50">
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Label htmlFor="screenshot" className="cursor-pointer block">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-[#8BBE67] rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">📸</span>
                      </div>
                      <span className="text-[#8BBE67] font-medium">
                        {isUploading ? "Uploading..." : "Choose Screenshot"}
                      </span>
                      <span className="text-xs text-gray-500">
                        JPG or PNG files (Max 5MB)
                      </span>
                    </div>
                  </Label>
                </div>

                {isUploading && (
                  <div className="flex items-center gap-2 justify-center py-2">
                    <div className="w-4 h-4 border-2 border-[#8BBE67] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-[#8BBE67] font-medium">
                      Processing your screenshot...
                    </p>
                  </div>
                )}

                {uploadedImageUrl && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">✅</span>
                      <p className="text-sm text-green-800 font-medium">
                        Perfect! Screenshot Uploaded Successfully
                      </p>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <img
                        src={uploadedImageUrl}
                        alt="Payment confirmation screenshot"
                        className="max-w-full h-auto rounded-lg border-2 border-green-200"
                        style={{ maxWidth: "min(100%, 300px)" }}
                      />
                    </div>
                    <p className="text-xs text-green-600 text-center mt-2">
                      Ready to confirm your order
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Important Notes:</p>
                  <p>
                    • Ensure screenshot shows transaction ID and amount clearly
                  </p>
                  <p>• We'll verify and send confirmation within 24 hours</p>
                  <p>• Your order is reserved once payment is verified</p>
                </div>
              </div>
            )}

            {/* For COD - Security Deposit Payment */}
            {/* {selectedMethod === "cod" && (
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
            )} */}

            {selectedMethod === "cod" && (
              <div className="mt-6 space-y-3">
                <Label
                  htmlFor="cod-screenshot"
                  className="text-sm font-semibold text-gray-700"
                >
                  Security Deposit Required
                </Label>

                <div className="bg-gray-50 border border-green-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[#8BBE67] mt-0.5">🔒</span>
                    <div className="text-sm text-[#8BBE67]">
                      <p className="font-medium">
                        Security Deposit: Rs. {securityDeposit}
                      </p>
                      <p>
                        • This amount will be deducted from your final payment
                      </p>
                      <p>
                        • Guarantees order reservation and priority delivery
                      </p>
                      <p>• Delivery typically within 3-4 business days</p>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-dashed border-[#8BBE67] rounded-lg p-4 text-center transition-colors hover:bg-green-50">
                  <Input
                    id="cod-screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Label
                    htmlFor="cod-screenshot"
                    className="cursor-pointer block"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-[#8BBE67] rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">📸</span>
                      </div>
                      <span className="text-[#8BBE67] font-medium">
                        {isUploading ? "Uploading..." : "Upload Deposit Proof"}
                      </span>
                      <span className="text-xs text-gray-500">
                        Show payment of Rs. {securityDeposit}
                      </span>
                    </div>
                  </Label>
                </div>

                {isUploading && (
                  <div className="flex items-center gap-2 justify-center py-2">
                    <div className="w-4 h-4 border-2 border-[#8BBE67] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-[#8BBE67] font-medium">
                      Processing your deposit proof...
                    </p>
                  </div>
                )}

                {uploadedImageUrl && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {/* <span className="text-green-600">✅</span> */}
                      {/* <p className="text-sm text-green-800 font-medium">
                        Deposit Received Successfully
                      </p> */}
                    </div>
                    <img
                      src={uploadedImageUrl}
                      alt="Security deposit confirmation"
                      className="mt-2 max-w-xs rounded-lg border-2 border-green-200 mx-auto"
                    />
                    <p className="text-xs text-green-600 text-center mt-2">
                      Your order is now secured and confirmed!
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Why Security Deposit?</p>
                  <p>• Reserves your order in our system</p>
                  <p>• Ensures priority processing and delivery</p>
                  <p>• Fully deducted from your final payment</p>
                  <p>• Standard procedure for all COD orders</p>
                </div>
              </div>
            )}

            {/* Confirm Order Button */}
            {/* <Button
              onClick={handleConfirmOrder}
              disabled={
                !selectedMethod ||
                (selectedMethod !== "cod" && !uploadedImageUrl) ||
                (selectedMethod === "cod" && !uploadedImageUrl) ||
                isUploading
              }
              className="w-full bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white mt-6"
            >
              {isUploading ? "Uploading..." : `Confirm Order`}
            </Button> */}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {orderData ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/images/img3.png"
                    alt="Zarwa Hair Growth Oil (100ml)"
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

                {/* Order & Customer Info */}
                {/* <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span>{orderData.user?.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping to:</span>
                    <span className="text-right">
                      {orderData.user?.address}
                      <br />
                      {orderData.user?.city}, {orderData.user?.province}
                      <br />
                      {orderData.user?.landmark &&
                        `Near ${orderData.user.landmark}`}
                      {orderData.user?.zip && ` • ${orderData.user.zip}`}
                    </span>
                  </div>
                </div> */}

                {/* Payment Breakdown */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>Rs. {orderData.subtotal?.toLocaleString()}</span>
                  </div>

                  {orderData.totalSavings > 0 && (
                    <div className="flex justify-between text-sm text-[#8BBE67]">
                      <span>Total Savings:</span>
                      <span>
                        - Rs. {orderData.totalSavings?.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Delivery Charges:</span>
                    <span
                      className={deliveryCharges === 0 ? "text-[#8BBE67]" : ""}
                    >
                      {deliveryCharges === 0
                        ? "Free"
                        : `Rs. ${deliveryCharges}`}
                    </span>
                  </div>

                  {/* COD Payment Breakdown - Clear and Prominent */}
                  {selectedMethod === "cod" && (
                    <div className=" border border-green-200 rounded-lg p-3 space-y-2 mt-3">
                      <div className="text-sm font-semibold text-[#8BBE67] text-center">
                        💰 Cash on Delivery Payment Plan
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-[#444]">
                          Pay Now (Security Deposit):
                        </span>
                        <span className="font-bold text-[#8BBE67]">
                          -Rs. {securityDeposit}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-[#444]">Pay on Delivery:</span>
                        <span className="text-[#8BBE67]">
                          Rs. {remainingAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="border-t border-green-200 pt-2 mt-2">
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Total Order Value:</span>
                          <span>
                            Rs.{" "}
                            {(totalAmount + deliveryCharges).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-red-500 text-center mt-2">
                        🔒 Security deposit will be deducted from your final
                        payment
                      </div>
                    </div>
                  )}

                  {/* Regular Total for non-COD methods */}
                  {selectedMethod !== "cod" && (
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-green-600">
                          Rs. {(totalAmount + deliveryCharges).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-1">
                        Pay full amount now via{" "}
                        {selectedMethod &&
                          paymentMethods.find((m) => m.id === selectedMethod)
                            ?.name}
                      </div>
                    </div>
                  )}
                </div>

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
                  {isUploading ? "Uploading..." : `Confirm Order`}
                </Button>

                {/* Final Summary for COD */}
                {/* {selectedMethod === "cod" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                    <div className="flex justify-between font-semibold text-green-800">
                      <span>Due Now:</span>
                      <span>Rs. {securityDeposit}</span>
                    </div>
                    <div className="text-xs text-green-600 text-center mt-1">
                      Upload payment proof for Rs. {securityDeposit} to confirm
                      your order
                    </div>
                  </div>
                )} */}
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
