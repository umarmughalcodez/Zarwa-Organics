import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Transform the data to match your frontend structure
    const orderData = {
      user: {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        phone: order.phone,
        city: order.city,
        address: order.address,
        province: order.province,
        landmark: order.landmark,
        zip: order.zip,
      },
      subtotal: order.subtotal,
      totalSavings: order.totalSavings,
      total: order.total,
      couponCode: order.couponCode,
      couponDiscount: order.couponDiscount,
      bulkDiscount: order.bulkDiscount,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
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
