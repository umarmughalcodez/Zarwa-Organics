export interface Order {
  id: string;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  province: string;
  landmark?: string;
  zip?: string;
  subtotal: number;
  totalSavings: number;
  total: number;
  couponCode?: string;
  couponDiscount: number;
  bulkDiscount: number;
  trackingNumber?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  trackingMessage?: string;
  paymentMethod?: string;
  paymentStatus: string;
  securityDeposit: number;
  deliveryCharges: number;
  paymentScreenshot?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
  user?: User;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  bulkDiscountPct: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  province: string;
  landmark?: string;
  zip?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  province: string;
  landmark?: string;
  zip?: string;
  subtotal: number;
  totalSavings: number;
  total: number;
  couponCode?: string;
  couponDiscount: number;
  bulkDiscount: number;
  trackingNumber?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  trackingMessage?: string;
  paymentMethod?: string;
  paymentStatus: string;
  securityDeposit: number;
  deliveryCharges: number;
  paymentScreenshot?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
  user?: User;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  bulkDiscountPct: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  province: string;
  landmark?: string;
  zip?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderResponse {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    province: string;
    landmark?: string;
    zip?: string;
  };
  subtotal: number;
  totalSavings: number;
  total: number;
  couponCode?: string;
  couponDiscount: number;
  bulkDiscount: number;
  paymentMethod?: string;
  paymentStatus: string;
  orderItems: OrderItem[];
  orderId: string;
}
