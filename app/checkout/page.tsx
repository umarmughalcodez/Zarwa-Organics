"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const BASE_PRICE = 699;

function getBulkDiscountPercent(qty: number) {
  if (qty >= 8) return 15;
  if (qty >= 5) return 10;
  if (qty >= 3) return 5;
  return 0;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQty = Number(searchParams?.get("qty") ?? 1) || 1;
  const initialDiscount = Number(searchParams?.get("discount") ?? 0) || 0;

  const [qty, setQty] = useState<number>(initialQty);
  const [bulkDiscountPct, setBulkDiscountPct] = useState<number>(
    initialDiscount || getBulkDiscountPercent(initialQty)
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponPct, setCouponPct] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  // Add this inside your CheckoutPage component, before the return statement
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const testBackend = async () => {
    try {
      console.log("🧪 Testing backend connection...");
      const res = await fetch("/api/debug");
      const data = await res.json();
      setDebugInfo(data);
      console.log("Backend test result:", data);
    } catch (error) {
      console.error("Backend test failed:", error);
    }
  };

  // Call this on component mount
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      testBackend();
    }
  }, []);

  useEffect(() => {
    setBulkDiscountPct(getBulkDiscountPercent(qty));
  }, [qty]);

  const subtotal = BASE_PRICE * qty;
  const bulkDiscountAmount = Math.round((subtotal * bulkDiscountPct) / 100);
  const couponDiscountAmount = Math.round(
    (subtotal - bulkDiscountAmount) * (couponPct / 100)
  );
  const total = subtotal - bulkDiscountAmount - couponDiscountAmount;
  const totalSavings = bulkDiscountAmount + couponDiscountAmount;

  function validateForm() {
    const e: string[] = [];
    if (!firstName.trim()) e.push("First name is required.");
    if (!lastName.trim()) e.push("Last name is required.");
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      e.push("Valid email is required.");
    if (!phone.trim() || phone.trim().length < 7)
      e.push("Valid phone number is required.");
    if (!city.trim()) e.push("City is required.");
    if (!zip.trim()) e.push("ZIP/postal code is required.");

    // still keep errors in state (optional) so you can inspect them if needed
    setErrors(e);

    // return the array so callers can use it synchronously
    return e;
  }

  function handleApplyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) return;

    if (code === "ZARWA10") {
      setCouponPct(10);
      setCouponApplied(true);
    } else if (code === "FIRST50") {
      const pct = Math.round(
        (50 / Math.max(subtotal - bulkDiscountAmount, 1)) * 100
      );
      setCouponPct(pct);
      setCouponApplied(true);
    } else {
      setCouponPct(0);
      setCouponApplied(false);
      toast.error("Invalid coupon code.");
    }
  }

  //   function handleProceedToPayment() {
  //     if (!validateForm()) {
  //       if (errors.length > 0) {
  //         toast.error(errors[0]); // show only the first missing/invalid field
  //       } else {
  //         toast.error("Please fill all required fields correctly.");
  //       }
  //       return;
  //     }

  //     const tempOrder = {
  //       user: { firstName, lastName, email, phone, city, zip },
  //       items: [
  //         {
  //           productId: "zarwa-hair-growth-oil",
  //           name: "Zarwa Hair Growth Oil",
  //           unitPrice: BASE_PRICE,
  //           qty,
  //           bulkDiscountPct,
  //         },
  //       ],
  //       coupon: couponApplied ? coupon.trim().toUpperCase() : null,
  //       couponPct: couponApplied ? couponPct : 0,
  //       subtotal,
  //       totalSavings,
  //       total,
  //       createdAt: new Date().toISOString(),
  //     } as const;

  //     try {
  //       localStorage.setItem("zarwa_temp_order", JSON.stringify(tempOrder));
  //     } catch (err) {
  //       console.error("failed to save temp order", err);
  //     }

  //     const params = new URLSearchParams({
  //       qty: String(qty),
  //       total: String(total),
  //     });
  //     router.push(`/checkout/payment?${params.toString()}`);
  //   }

  // In your handleProceedToPayment function, replace with this:
  async function handleProceedToPayment() {
    // Run validation first
    const errs = validateForm();
    if (errs.length > 0) {
      toast.error(errs[0]);
      return;
    }

    // Prevent double submits
    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log("🟡 Starting order submission...", {
      user: { firstName, lastName, email, phone, city, zip },
      items: [{ productId: "zarwa-hair-growth-oil", qty, bulkDiscountPct }],
      financials: { subtotal, totalSavings, total },
    });

    const tempOrder = {
      user: { firstName, lastName, email, phone, city, zip },
      items: [
        {
          productId: "zarwa-hair-growth-oil",
          name: "Zarwa Hair Growth Oil",
          unitPrice: BASE_PRICE,
          qty,
          bulkDiscountPct,
        },
      ],
      coupon: couponApplied ? coupon.trim().toUpperCase() : null,
      couponPct: couponApplied ? couponPct : 0,
      subtotal,
      totalSavings,
      total,
      createdAt: new Date().toISOString(),
    } as const;

    try {
      console.log("🟡 Making API request to /api/order...");

      // POST to backend API
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug": "true",
        },
        body: JSON.stringify(tempOrder),
      });

      console.log("🟡 API Response status:", res.status);

      const result = await res.json();
      console.log("🟡 API Response data:", result);

      if (!res.ok || !result?.success) {
        console.error("❌ API Error:", result);
        toast.error(
          result?.error ||
            `Failed to save order (HTTP ${res.status}). Please try again.`
        );
        setIsSubmitting(false);
        return;
      }

      console.log("✅ Order created successfully:", result.orderId);

      // Save the temp order locally too (with orderId from server)
      const orderWithId = { ...tempOrder, orderId: result.orderId };
      try {
        localStorage.setItem("zarwa_temp_order", JSON.stringify(orderWithId));
        console.log("✅ Order saved to localStorage");
      } catch (err) {
        console.warn("Could not save temp order to localStorage", err);
      }

      toast.success("Order info saved! Redirecting to payment...");

      // Short delay so user sees the toast
      setTimeout(() => {
        const params = new URLSearchParams({
          qty: String(qty),
          total: String(total),
          orderId: result.orderId,
        });
        console.log(
          "🟡 Redirecting to payment with params:",
          params.toString()
        );
        router.push(`/checkout/payment?${params.toString()}`);
      }, 400);
    } catch (err: any) {
      console.error("❌ Network / unexpected error saving order:", err);
      toast.error(
        "Network error — please check your connection and try again."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-30">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-3xl font-semibold mb-6"
      >
        Checkout
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="City / Town"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="ZIP / Postal"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white rounded-full"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </Button>
                <div className="px-4 py-2 border rounded-full font-semibold text-[#8BBE67]">
                  {qty}
                </div>
                <Button
                  className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white rounded-full"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <Select onValueChange={(v) => setQty(Number(v))}>
                <SelectTrigger className="w-[120px] border-[#8BBE67] focus:ring-[#8BBE67]">
                  <SelectValue placeholder="Quick qty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Coupon (optional)
              </label>
              <div className="flex gap-2">
                <Input
                  className="border-[#8BBE67] focus:ring-[#8BBE67]"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button
                  className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </div>
              {couponApplied && (
                <p className="mt-2 text-sm text-[#8BBE67]">
                  Coupon applied — {couponPct}% off
                </p>
              )}
            </div>

            {/* {errors.length > 0 && (
              <div className="mt-4 text-red-600">
                {errors.map((er, i) => (
                  <div key={i}>{toast.error(er)}</div>
                ))}
              </div>
            )} */}

            <div className="mt-6 flex justify-end">
              <Button
                className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
                onClick={handleProceedToPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Proceed to Payment"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
                alt="product"
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <div className="font-semibold">Zarwa Hair Growth Oil</div>
                <div className="text-sm">Rs. {BASE_PRICE} / bottle</div>
                <div className="text-sm mt-1">Qty: {qty}</div>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>Rs. {subtotal}</div>
              </div>

              <div className="flex justify-between mt-2">
                <div>Bulk discount ({bulkDiscountPct}%)</div>
                <div className="text-[#8BBE67]">- Rs. {bulkDiscountAmount}</div>
              </div>

              <div className="flex justify-between mt-2">
                <div>Coupon discount</div>
                <div className="text-[#8BBE67]">
                  - Rs. {couponDiscountAmount}
                </div>
              </div>

              <div className="flex justify-between mt-4 text-lg font-semibold text-[#8BBE67]">
                <div>Total</div>
                <div>Rs. {total}</div>
              </div>

              <div className="mt-2 text-sm text-[#8BBE67]">
                You save Rs. {totalSavings}
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                A small confirmation fee of Rs. 150 is required on the next page
                to secure your order.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
