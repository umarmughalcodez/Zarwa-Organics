// // app/api/order/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/db'

// export async function POST(request: NextRequest) {
//   console.log('🔵 ORDER API: Request received')

//   try {
//     const body = await request.json()
//     console.log('📦 Received order data:', JSON.stringify(body, null, 2))

//     // Validate required fields
//     if (!body.user || !body.items || !body.subtotal || !body.total) {
//       console.error('❌ Missing required fields')
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Missing required fields',
//           debug: { received: Object.keys(body) }
//         },
//         { status: 400 }
//       )
//     }

//     const { user, items, subtotal, totalSavings, total, coupon, couponPct } = body

//     console.log('👤 User data:', user)
//     console.log('🛒 Items data:', items)
//     console.log('💰 Financials:', { subtotal, totalSavings, total, coupon, couponPct })

//     // Start transaction
//     console.log('🚀 Starting database transaction...')

//     const result = await prisma.$transaction(async (tx) => {
//       // 1. Find or create user
//       console.log('🔍 Checking for existing user...')
//       let userRecord = await tx.user.findFirst({
//         where: { email: user.email }
//       })

//       if (!userRecord) {
//         console.log('👤 Creating new user...')
//         userRecord = await tx.user.create({
//           data: {
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             phone: user.phone,
//             city: user.city,
//             zip: user.zip,
//           },
//         })
//         console.log('✅ User created with ID:', userRecord.id)
//       } else {
//         console.log('✅ User found with ID:', userRecord.id)
//       }

//       // 2. Create order
//       console.log('📝 Creating order...')
//       const order = await tx.order.create({
//         data: {
//           userId: userRecord.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           phone: user.phone,
//           city: user.city,
//           zip: user.zip,
//           subtotal: subtotal,
//           totalSavings: totalSavings,
//           total: total,
//           couponCode: coupon || null,
//           couponDiscount: couponPct || 0,
//           bulkDiscount: body.items[0]?.bulkDiscountPct || 0,
//           status: 'pending',
//         },
//       })
//       console.log('✅ Order created with ID:', order.id)

//       // 3. Create order items
//       console.log('🛒 Creating order items...')
//       const orderItems = await Promise.all(
//         items.map((item: any) =>
//           tx.orderItem.create({
//             data: {
//               orderId: order.id,
//               productId: item.productId,
//               productName: item.name,
//               unitPrice: item.unitPrice,
//               quantity: item.qty,
//               bulkDiscountPct: item.bulkDiscountPct,
//             },
//           })
//         )
//       )
//       console.log('✅ Order items created:', orderItems.length)

//       return { order, user: userRecord, orderItems }
//     })

//     console.log('🎉 Order creation completed successfully')
//     console.log('📊 Final order ID:', result.order.id)

//     return NextResponse.json({
//       success: true,
//       orderId: result.order.id,
//       message: 'Order created successfully',
//       debug: {
//         orderId: result.order.id,
//         userId: result.user.id,
//         itemsCount: result.orderItems.length
//       }
//     })

//   } catch (error: any) {
//     console.error('❌ ORDER CREATION FAILED:', error)

//     // Detailed error logging
//     if (error.code) {
//       console.error('📋 Prisma Error Code:', error.code)
//     }
//     if (error.meta) {
//       console.error('📋 Prisma Error Meta:', error.meta)
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to create order',
//         debug: {
//           message: error.message,
//           code: error.code,
//           meta: error.meta
//         }
//       },
//       { status: 500 }
//     )
//   }
// }

// // Add GET for testing
// export async function GET() {
//   console.log('🔵 ORDER API: Test endpoint hit')

//   try {
//     // Test database connection
//     const dbConnected = await prisma.$queryRaw`SELECT 1 as test`
//     console.log('✅ Database test query successful')

//     return NextResponse.json({
//       success: true,
//       message: 'Order API is working',
//       debug: {
//         database: 'connected',
//         timestamp: new Date().toISOString()
//       }
//     })
//   } catch (error) {
//     console.error('❌ Database test failed:', error)
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Database connection failed',
//         debug: { error: error }
//       },
//       { status: 500 }
//     )
//   }
// }

// app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { debug } from "@/lib/debug-utils";

export async function POST(request: NextRequest) {
  console.log("🔵 ORDER API: POST request received");

  try {
    const body = await request.json();
    console.log("📦 Received order data:", JSON.stringify(body, null, 2));

    // Validate required fields
    if (!body.user || !body.items || !body.subtotal || !body.total) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          debug: {
            received: Object.keys(body),
            required: ["user", "items", "subtotal", "total"],
          },
        },
        { status: 400 }
      );
    }

    const { user, items, subtotal, totalSavings, total, coupon, couponPct } =
      body;

    console.log("👤 User data:", user);
    console.log("🛒 Items data:", items);
    console.log("💰 Financials:", {
      subtotal,
      totalSavings,
      total,
      coupon,
      couponPct,
    });

    // Validate user data
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.phone ||
      !user.city ||
      !user.zip
    ) {
      console.error("❌ Invalid user data");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid user data",
          debug: { user },
        },
        { status: 400 }
      );
    }

    // Start transaction
    console.log("🚀 Starting database transaction...");

    const result = await prisma.$transaction(async (tx) => {
      // 1. Find or create user
      console.log("🔍 Checking for existing user...");
      let userRecord = await tx.user.findFirst({
        where: { email: user.email },
      });

      if (!userRecord) {
        console.log("👤 Creating new user...");
        userRecord = await tx.user.create({
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            city: user.city,
            zip: user.zip,
          },
        });
        console.log("✅ User created with ID:", userRecord.id);
      } else {
        console.log("✅ User found with ID:", userRecord.id);
      }

      // 2. Create order
      console.log("📝 Creating order...");
      const order = await tx.order.create({
        data: {
          userId: userRecord.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          city: user.city,
          zip: user.zip,
          subtotal: subtotal,
          totalSavings: totalSavings || 0,
          total: total,
          couponCode: coupon || null,
          couponDiscount: couponPct || 0,
          bulkDiscount: items[0]?.bulkDiscountPct || 0,
          status: "pending",
        },
      });
      console.log("✅ Order created with ID:", order.id);

      // 3. Create order items
      console.log("🛒 Creating order items...");
      const orderItems = await Promise.all(
        items.map((item: any) =>
          tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId || "zarwa-hair-growth-oil",
              productName: item.name || "Zarwa Hair Growth Oil",
              unitPrice: item.unitPrice || 699,
              quantity: item.qty || 1,
              bulkDiscountPct: item.bulkDiscountPct || 0,
            },
          })
        )
      );
      console.log("✅ Order items created:", orderItems.length);

      return { order, user: userRecord, orderItems };
    });

    console.log("🎉 Order creation completed successfully");
    console.log("📊 Final order ID:", result.order.id);

    return NextResponse.json({
      success: true,
      orderId: result.order.id,
      message: "Order created successfully",
      debug: {
        orderId: result.order.id,
        userId: result.user.id,
        itemsCount: result.orderItems.length,
        total: total,
      },
    });
  } catch (error: any) {
    console.error("❌ ORDER CREATION FAILED:", error);

    // Detailed error logging
    console.error("📋 Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order: " + error.message,
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

// Add GET for testing the order endpoint specifically
export async function GET(request: NextRequest) {
  console.log("🔵 ORDER API: GET request received");

  const searchParams = request.nextUrl.searchParams;
  const test = searchParams.get("test");

  if (test === "db") {
    try {
      // Test database connection and schema
      const users = await prisma.user.findMany({ take: 5 });
      const orders = await prisma.order.findMany({ take: 5 });
      const orderItems = await prisma.orderItem.findMany({ take: 5 });

      return NextResponse.json({
        success: true,
        message: "Order API database test",
        counts: {
          users: users.length,
          orders: orders.length,
          orderItems: orderItems.length,
        },
        sampleData: {
          users: users,
          orders: orders,
          orderItems: orderItems,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: "Database test failed: " + error.message,
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: "Order API is working",
    endpoints: {
      POST: "/api/order - Create new order",
      GET: "/api/order?test=db - Test database",
    },
  });
}
