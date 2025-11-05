// // app/api/debug/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { debug } from "@/lib/debug-utils";

// export async function GET() {
//   try {
//     debug.log("DEBUG_API", "Testing system components...");

//     // Test database
//     const dbTest = await prisma.$queryRaw`SELECT 1 as test`;
//     debug.log("DEBUG_API", "Database test passed");

//     // Count records
//     const userCount = await prisma.user.count();
//     const orderCount = await prisma.order.count();

//     debug.log(
//       "DEBUG_API",
//       `Counts - Users: ${userCount}, Orders: ${orderCount}`
//     );

//     return NextResponse.json({
//       status: "ok",
//       database: "connected",
//       counts: {
//         users: userCount,
//         orders: orderCount,
//       },
//       logs: debug.getLogs().slice(-10), // Last 10 logs
//     });
//   } catch (error: any) {
//     debug.log("DEBUG_API_ERROR", error.message);

//     return NextResponse.json(
//       {
//         status: "error",
//         error: error.message,
//         logs: debug.getLogs().slice(-10),
//       },
//       { status: 500 }
//     );
//   }
// }

// app/api/debug/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Named exports for HTTP methods
export async function GET() {
  console.log("🟢 DEBUG API: GET request received");

  try {
    console.log("🧪 Testing system components...");

    // Test database connection
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database test query successful");

    // Get counts
    const userCount = await prisma.user.count();
    const orderCount = await prisma.order.count();
    const orderItemCount = await prisma.orderItem.count();

    console.log("📊 Database counts:", {
      userCount,
      orderCount,
      orderItemCount,
    });

    // Get recent records
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: {
        status: "connected",
        counts: {
          users: userCount,
          orders: orderCount,
          orderItems: orderItemCount,
        },
      },
      recent: {
        users: recentUsers,
        orders: recentOrders,
      },
      endpoints: {
        order: "/api/order",
        debug: "/api/debug",
      },
    });
  } catch (error: any) {
    console.error("❌ DEBUG API ERROR:", error);

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// You can add other methods if needed
export async function POST() {
  return NextResponse.json({
    message: "Debug POST endpoint",
    usage: "Use GET for system diagnostics",
  });
}
