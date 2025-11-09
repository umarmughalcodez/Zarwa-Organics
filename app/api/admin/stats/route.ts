// app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [totalOrders, pendingOrders, totalRevenue, totalCustomers] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { status: "pending" } }),
        prisma.order.aggregate({
          _sum: { total: true },
          where: { status: { not: "cancelled" } },
        }),
        prisma.user.count(),
      ]);

    return NextResponse.json({
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalCustomers,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
