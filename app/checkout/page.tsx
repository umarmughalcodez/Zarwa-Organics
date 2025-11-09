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

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 20;
const BASE_PRICE = 749;

function getBulkDiscountPercent(qty: number) {
  if (qty >= 8) return 8;
  if (qty >= 5) return 5;
  if (qty >= 3) return 3;
  return 0;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialDiscount = Number(searchParams?.get("discount") ?? 0) || 0;
  const initialQty = Math.max(
    MIN_QUANTITY,
    Math.min(MAX_QUANTITY, Number(searchParams?.get("qty") ?? 1) || 1)
  );
  const [qty, setQty] = useState<number>(initialQty);
  const [bulkDiscountPct, setBulkDiscountPct] = useState<number>(
    initialDiscount || getBulkDiscountPercent(initialQty)
  );
  const [province, setProvince] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");

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
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  // ADD THIS FUNCTION AFTER THE CONSTANTS (around line 20):
  // function calculateSecurityDeposit(totalAmount: number): number {
  //   if (totalAmount < 1000) return 100;
  //   if (totalAmount < 2000) return 250;
  //   if (totalAmount < 4000) return 500;
  //   return 800; // for 5000 and above
  // }

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (qty >= 3 || total >= 2000) {
      setDeliveryCharges(0);
    } else {
      setDeliveryCharges(200);
    }

    setBulkDiscountPct(getBulkDiscountPercent(qty));
  }, [qty]);

  const subtotal = BASE_PRICE * qty;
  const bulkDiscountAmount = Math.round((subtotal * bulkDiscountPct) / 100);
  const couponDiscountAmount = Math.round(
    (subtotal - bulkDiscountAmount) * (couponPct / 100)
  );
  const total = subtotal - bulkDiscountAmount - couponDiscountAmount;
  const totalWithDelivery = total + deliveryCharges;
  const totalSavings = bulkDiscountAmount + couponDiscountAmount;

  // This function double-checks all calculations are correct
  function validatePrices(): boolean {
    // Calculate what the prices SHOULD be
    const expectedSubtotal = BASE_PRICE * qty;
    const expectedBulkDiscount = Math.round(
      (expectedSubtotal * bulkDiscountPct) / 100
    );
    const expectedCouponDiscount = Math.round(
      (expectedSubtotal - expectedBulkDiscount) * (couponPct / 100)
    );
    const expectedTotal =
      expectedSubtotal - expectedBulkDiscount - expectedCouponDiscount;

    // Allow small difference for rounding (1-2 Rs)
    const priceTolerance = 2;

    // Check if calculated prices match displayed prices
    const subtotalValid =
      Math.abs(subtotal - expectedSubtotal) <= priceTolerance;
    const totalValid = Math.abs(total - expectedTotal) <= priceTolerance;

    if (!subtotalValid || !totalValid) {
      console.error("Price tampering detected!", {
        calculated: { expectedSubtotal, expectedTotal },
        current: { subtotal, total },
      });
      return false;
    }

    return true;
  }

  // useEffect(() => {
  //   // Delivery charges based on total
  //   if (total < 1000) setDeliveryCharges(200);
  //   else if (total < 2000) setDeliveryCharges(300);
  //   else if (total < 4000) setDeliveryCharges(500);
  //   else setDeliveryCharges(800);
  // }, [total]);

  // This function checks if a phone number is valid Pakistani number
  function validatePakistanPhone(phone: string): boolean {
    // First, remove spaces, dashes, etc. to get clean numbers only
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

    // Check different Pakistani number formats
    const patterns = [
      /^03\d{9}$/, // 03001234567 (11 digits starting with 03)
      /^\+92\d{10}$/, // +923001234567 (12 digits starting with +92)
      /^92\d{10}$/, // 923001234567 (11 digits starting with 92)
      /^3\d{9}$/, // 3001234567 (10 digits starting with 3)
    ];

    // Return true if ANY of these patterns match
    return patterns.some((pattern) => pattern.test(cleanPhone));
  }

  // This function checks if an email is valid
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateForm() {
    const e: string[] = [];

    if (!firstName.trim()) e.push("First name is required.");
    if (!lastName.trim()) e.push("Last name is required.");

    // NEW: Email validation
    if (!email.trim()) {
      e.push("Email is required.");
    } else if (!validateEmail(email)) {
      e.push("Please enter a valid email address.");
    }

    // NEW: Phone validation
    if (!phone.trim()) {
      e.push("Phone number is required.");
    } else if (!validatePakistanPhone(phone)) {
      e.push(
        "Please enter a valid Pakistani phone number (03XXXXXXXXX or +92XXXXXXXXXXX)."
      );
    }

    if (!city.trim()) e.push("City is required.");
    if (!province.trim()) e.push("Province is required.");
    if (!address.trim()) e.push("Complete Address is required.");

    setErrors(e);
    return e;
  }

  function handleApplyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) return;

    if (code === "WELCOME10") {
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

  async function handleProceedToPayment() {
    // Run validation first
    const errs = validateForm();
    if (errs.length > 0) {
      toast.error(errs[0]);
      return;
    }

    if (!validatePrices()) {
      toast.error(
        "Invalid order calculation detected. Please refresh the page."
      );
    }

    if (submissionAttempts >= 5) {
      toast.error("Too many attempts. Please wait a few minutes.");
      return;
    }
    setSubmissionAttempts((prev) => prev + 1);

    const expectedSubtotal = BASE_PRICE * qty;
    const expectedBulkDiscount = Math.round(
      (expectedSubtotal * bulkDiscountPct) / 100
    );
    const expectedCouponDiscount = Math.round(
      (expectedSubtotal - expectedBulkDiscount) * (couponPct / 100)
    );
    const expectedTotal =
      expectedSubtotal - expectedBulkDiscount - expectedCouponDiscount;

    // Check for price manipulation
    const priceTolerance = 1; // Allow 1 Rs difference for rounding
    if (
      Math.abs(subtotal - expectedSubtotal) > priceTolerance ||
      Math.abs(total - expectedTotal) > priceTolerance
    ) {
      toast.error(
        "Invalid order calculation detected. Please refresh the page."
      );
      console.error("Price tampering detected", {
        calculated: { expectedSubtotal, expectedTotal },
        current: { subtotal, total },
      });
      return;
    }

    // Prevent double submits
    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log("🟡 Starting order submission... Please wait", {
      user: { firstName, lastName, email, phone, city, zip },
      items: [{ productId: "zarwa-hair-growth-oil", qty, bulkDiscountPct }],
      financials: { subtotal, totalSavings, total },
    });

    const tempOrder = {
      user: {
        firstName,
        lastName,
        email,
        phone,
        city,
        zip,
        province,
        address,
        landmark,
      },
      items: [
        {
          productId: "zarwa-hair-growth-oil",
          name: "Zarwa Hair Growth Oil (100ml)",
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
      deliveryCharges,

      createdAt: new Date().toISOString(),
    } as const;

    try {
      console.log("🟡 Making API request to /api/order...");

      // POST to backend API
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-Debug": "true",
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
      // Save the temp order locally too (with orderId from server)
      const orderWithId = {
        ...tempOrder,
        orderId: result.orderId,
        paymentMethod: null, // Add payment method field
        paymentStatus: "pending", // Add payment status field
      };
      setSubmissionAttempts(0);

      try {
        localStorage.setItem("zarwa_temp_order", JSON.stringify(orderWithId));
        console.log("✅ Order saved to localStorage:", orderWithId);
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
    } catch (err) {
      console.error("❌ Network / unexpected error saving order:", err);
      toast.error(
        "Network error — please check your connection and try again."
      );
      setIsSubmitting(false);
    }
  }

  function calculateSecurityDeposit(totalAmount: number): number {
    if (totalAmount < 1000) return 150;
    if (totalAmount < 2000) return 300;
    if (totalAmount < 4000) return 500;
    return 800;
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
              <label className="block text-sm font-medium">First Name *</label>
              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="block text-sm font-medium">Last Name *</label>

              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="block text-sm font-medium">Email *</label>

              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block text-sm font-medium">
                Phone Number *
              </label>

              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Enter your Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => {
                  // When user leaves the field, check if valid
                  if (phone && !validatePakistanPhone(phone)) {
                    toast.error("Please enter a valid Pakistani phone number");
                  }
                }}
              />
              <label className="block text-sm font-medium">City *</label>

              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label className="block text-sm font-medium">
                Complete Address *
              </label>

              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Enter your Complete Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium mb-2">
                  Province *
                </label>
                <Select onValueChange={setProvince} required>
                  <SelectTrigger className="border-[#8BBE67] focus:ring-[#8BBE67]">
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Punjab">Punjab</SelectItem>
                    <SelectItem value="Sindh">Sindh</SelectItem>
                    <SelectItem value="KPK">Khyber Pakhtunkhwa</SelectItem>
                    <SelectItem value="Balochistan">Balochistan</SelectItem>
                    <SelectItem value="Gilgit-Baltistan">
                      Gilgit-Baltistan
                    </SelectItem>
                    <SelectItem value="Azad Kashmir">Azad Kashmir</SelectItem>
                    <SelectItem value="Islamabad">
                      Islamabad Capital Territory
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Landmark Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nearest Landmark (Optional)
                </label>
                <Input
                  className="border-[#8BBE67] focus:ring-[#8BBE67]"
                  placeholder="e.g., Near Liberty Market, beside MCB Bank"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
              <label className="block text-sm font-medium">
                ZIP / Postal Code (optional)
              </label>

              <Input
                className="border-[#8BBE67] focus:ring-[#8BBE67]"
                placeholder="Enter your zip code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white rounded-full"
                  onClick={() => setQty((q) => Math.max(MIN_QUANTITY, q - 1))}
                >
                  -
                </Button>
                <div className="px-4 py-2 border rounded-full font-semibold text-[#8BBE67]">
                  {qty}
                </div>
                <Button
                  className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white rounded-full"
                  onClick={() => setQty((q) => Math.min(MAX_QUANTITY, q + 1))}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="mt-4">
              {/* <Select onValueChange={(v) => setQty(Number(v))}>
                <SelectTrigger className="w-[120px] border-[#8BBE67] focus:ring-[#8BBE67]">
                  <SelectValue placeholder="Quick qty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Select Bulk</SelectItem>
                  <SelectItem value="3">3 - 5% Off</SelectItem>
                  <SelectItem value="5">5 - 8% Off</SelectItem>
                  <SelectItem value="8">8 - 10% Off</SelectItem>
                </SelectContent>
              </Select> */}
              <p className="mt-2 text-[#8BBE67]">
                You will save Rs. {bulkDiscountAmount}
              </p>
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

            {/* <div className="mt-6 flex justify-end">
              <Button
                className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
                onClick={handleProceedToPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : `Proceed to Payment - (${totalWithDelivery.toLocaleString()})`}
              </Button>
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src="/images/img3.png"
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
              <div className="flex justify-between mt-2">
                <div>Delivery Charges</div>
                <span className={deliveryCharges === 0 ? "text-[#8BBE67]" : ""}>
                  {deliveryCharges === 0 ? "Free" : `Rs. ${deliveryCharges}`}
                </span>

                {/* <div>Rs. {deliveryCharges}</div> */}
              </div>

              <div className="flex justify-between mt-4 text-lg font-semibold text-[#8BBE67]">
                <div>Total</div>
                <div>Rs. {totalWithDelivery.toLocaleString()}</div>
                {/* <div>Rs. {total}</div> */}
              </div>

              <div className="mt-2 text-sm text-[#8BBE67]">
                You save Rs. {totalSavings}
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                A small confirmation fee of Rs.{" "}
                {calculateSecurityDeposit(total)} is required on the next page
                to secure your order.
              </div>
            </div>
            <div className="mt-6 flex">
              <Button
                className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] text-white"
                onClick={handleProceedToPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : `Proceed to Payment`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
