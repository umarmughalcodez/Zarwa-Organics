// app/api/admin/orders/update-status/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { orderId, status, trackingNumber } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    // Add tracking number and shipped date when status is shipped
    if (status === "shipped") {
      updateData.shippedAt = new Date();
      if (trackingNumber) {
        updateData.trackingNumber = trackingNumber;
      }
    }

    // Add delivered date when status is delivered
    if (status === "delivered") {
      updateData.deliveredAt = new Date();
    }

    // Update payment status based on order status
    if (status === "verified") {
      updateData.paymentStatus = "completed";
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        orderItems: true,
        user: true,
      },
    });

    // TODO: Send notification email to customer about status update

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
