import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  console.log("🟡 ORDER UPDATE: Request received");

  try {
    const body = await request.json();
    console.log("📦 Update data:", body);

    const {
      orderId,
      paymentMethod,
      paymentStatus,
      securityDeposit,
      screenshotUrl,
      totalAmount,
    } = body;

    if (!orderId || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build update data object
    const updateData: any = {
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus || "pending_verification",
      securityDeposit: securityDeposit || 0,
      updatedAt: new Date(),
    };

    // Add screenshot URL if provided
    if (screenshotUrl) {
      updateData.paymentScreenshot = screenshotUrl;
    }

    // Add total amount if provided
    if (totalAmount) {
      updateData.total = totalAmount;
    }

    console.log("🔄 Updating order with data:", updateData);

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    console.log("✅ Order updated successfully:", {
      id: updatedOrder.id,
      paymentMethod: updatedOrder.paymentMethod,
      paymentStatus: updatedOrder.paymentStatus,
      securityDeposit: updatedOrder.securityDeposit,
    });

    return NextResponse.json({
      success: true,
      order: {
        id: updatedOrder.id,
        paymentMethod: updatedOrder.paymentMethod,
        paymentStatus: updatedOrder.paymentStatus,
        securityDeposit: updatedOrder.securityDeposit,
      },
      message:
        "Order confirmed successfully. We will verify your payment and contact you soon.",
    });
  } catch (error: any) {
    console.error("❌ ORDER UPDATE FAILED:", error);

    // More detailed error logging
    console.error("📋 Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order: " + error.message,
        debug: {
          message: error.message,
          code: error.code,
          meta: error.meta,
        },
      },
      { status: 500 }
    );
  }
}
