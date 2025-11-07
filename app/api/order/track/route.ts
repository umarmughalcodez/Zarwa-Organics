import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone"); // NEW: Phone parameter

  // Check if orderId exists
  if (!orderId) {
    return NextResponse.json(
      {
        success: false,
        error: "Order ID is required",
      },
      { status: 400 }
    );
  }

  // Check if either email or phone is provided
  if (!email && !phone) {
    return NextResponse.json(
      {
        success: false,
        error: "Either email or phone number is required",
      },
      { status: 400 }
    );
  }

  try {
    // Build the where condition
    const whereCondition: any = {
      id: orderId,
    };

    // Add email or phone to the condition
    if (email) {
      whereCondition.email = email.toLowerCase();
    } else if (phone) {
      // Clean phone number for comparison (remove spaces, dashes, etc.)
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
      whereCondition.phone = {
        contains: cleanPhone, // Use contains for partial matching
      };
    }

    console.log("🟡 Searching order with:", whereCondition);

    const order = await prisma.order.findFirst({
      where: whereCondition,
      select: {
        id: true,
        status: true,
        createdAt: true,
        trackingNumber: true,
        city: true,
        address: true,
        zip: true,
        landmark: true,
        province: true,
        total: true,
        paymentMethod: true,
        paymentStatus: true,
        phone: true, // Include phone in response for verification
        email: true, // Include email in response for verification
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order not found. Please check your Order ID and contact information.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        trackingNumber: order.trackingNumber,
        city: order.city,
        province: order.province,
        total: order.total,
        address: order.address,
        zip: order.zip,
        landmark: order.landmark,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    console.error("❌ Order tracking error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
