import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { OrderResponse } from "@/lib/types";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ orderId: string }>;
  }
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderData: OrderResponse = {
      user: {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        phone: order.phone,
        city: order.city,
        address: order.address,
        province: order.province,
        landmark: order.landmark || undefined,
        zip: order.zip || undefined,
      },
      subtotal: order.subtotal,
      totalSavings: order.totalSavings,
      total: order.total,
      couponCode: order.couponCode || undefined,
      couponDiscount: order.couponDiscount,
      bulkDiscount: order.bulkDiscount,
      paymentMethod: order.paymentMethod || undefined,
      paymentStatus: order.paymentStatus,
      orderItems: order.orderItems,
      orderId: order.id,
    };

    return NextResponse.json(orderData);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
