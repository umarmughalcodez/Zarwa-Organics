export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  zip?: string;
  province: string;
  address: string;
  landmark?: string;
}

export interface Order {
  orderId: string;
  user: User;
  items: {
    productId: string;
    name: string;
    unitPrice: number;
    qty: number;
    bulkDiscountPct: number;
  }[];
  coupon?: string | null;
  couponPct?: number;
  subtotal: number;
  totalSavings: number;
  total: number;
  deliveryCharges: number;
  paymentMethod?: string;
  paymentStatus?: "pending" | "pending_deposit" | "confirmed";
  paymentScreenshot?: string;
}
