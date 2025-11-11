import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { order, customerEmail, savedOrder } = await req.json();
    const finalOrder = order || savedOrder;

    if (!finalOrder) {
      throw new Error("No order data found in request body");
    }

    console.log("📦 Final Order:", finalOrder);
    console.log("📧 Customer Email:", customerEmail);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp.zoho.com
      port: parseInt(process.env.EMAIL_PORT || "465"),
      secure: true, // true for SSL (465)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Admin email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "umarfullstackdev@gmail.com",
      subject: `🧾 New Order Received: #${finalOrder.orderId || finalOrder.id}`,

      html: `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; }
            .container { max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #8BBE67, #6F8F58); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px; }
            .section { margin-bottom: 25px; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
            .section-title { color: #2c5530; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #8BBE67; padding-bottom: 8px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .info-item { margin-bottom: 10px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; }
            .status-badge { 
                display: inline-block; 
                padding: 4px 12px; 
                border-radius: 20px; 
                font-size: 12px; 
                font-weight: bold; 
                text-transform: uppercase; 
            }
            .status-pending { background: #fff3cd; color: #856404; }
            .status-verified { background: #d1edff; color: #0c5460; }
            .status-completed { background: #d4edda; color: #155724; }
            .product-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .product-table th { background: #f8f9fa; text-align: left; padding: 12px; border-bottom: 2px solid #dee2e6; }
            .product-table td { padding: 12px; border-bottom: 1px solid #dee2e6; }
            .totals-table { width: 100%; border-collapse: collapse; }
            .totals-table td { padding: 8px 0; }
            .totals-table .amount { text-align: right; font-weight: bold; }
            .highlight { background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; }
            .action-btn { 
                display: inline-block; 
                background: #8BBE67; 
                color: white; 
                padding: 12px 25px; 
                text-decoration: none; 
                border-radius: 6px; 
                font-weight: bold; 
                margin: 10px 5px; 
            }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1>📦 New Order Received</h1>
                <p>Order #${finalOrder.orderId || finalOrder.id}</p>
                <span class="status-badge status-pending">${
                  finalOrder.paymentStatus || "Pending"
                }</span>
            </div>

            <!-- Customer Information -->
            <div class="section">
                <div class="section-title">👤 Customer Information</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">Name:</span>
                        <span class="value">${finalOrder.user.firstName} ${
        finalOrder.user.lastName
      }</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Email:</span>
                        <span class="value">${finalOrder.user.email}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Phone:</span>
                        <span class="value">${finalOrder.user.phone}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Order Date:</span>
                        <span class="value">${new Date(
                          finalOrder.createdAt
                        ).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <!-- Shipping Address -->
            <div class="section">
                <div class="section-title">📍 Shipping Address</div>
                <p><strong>Address:</strong> ${finalOrder.user.address}</p>
                <p><strong>City:</strong> ${finalOrder.user.city}</p>
                <p><strong>Province:</strong> ${finalOrder.user.province}</p>
                ${
                  finalOrder.user.landmark
                    ? `<p><strong>Landmark:</strong> ${finalOrder.user.landmark}</p>`
                    : ""
                }
                ${
                  finalOrder.user.zip
                    ? `<p><strong>ZIP Code:</strong> ${finalOrder.user.zip}</p>`
                    : ""
                }
            </div>

            <!-- Order Items -->
            <div class="section">
                <div class="section-title">🛍️ Order Items</div>
                <table class="product-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${finalOrder.items
                          .map(
                            (item: any) => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.qty}</td>
                                <td>Rs. ${item.unitPrice}</td>
                                <td>Rs. ${item.unitPrice * item.qty}</td>
                                <td>${item.bulkDiscountPct}%</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>

            <!-- Payment Information -->
            <div class="section">
                <div class="section-title">💳 Payment Details</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">Payment Method:</span>
                        <span class="value" style="text-transform: uppercase;">${
                          finalOrder.paymentMethod
                        }</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Payment Status:</span>
                        <span class="status-badge status-pending">${
                          finalOrder.paymentStatus || "Pending"
                        }</span>
                    </div>
                    ${
                      finalOrder.securityDeposit
                        ? `
                    <div class="info-item">
                        <span class="label">Security Deposit:</span>
                        <span class="value">Rs. ${finalOrder.securityDeposit}</span>
                    </div>
                    `
                        : ""
                    }
                    ${
                      finalOrder.paymentScreenshot
                        ? `
                    <div class="info-item">
                        <span class="label">Screenshot:</span>
                        <span class="value"><a href="${finalOrder.paymentScreenshot}" target="_blank">View Payment Proof</a></span>
                    </div>
                    `
                        : ""
                    }
                </div>
            </div>

            <!-- Order Summary -->
            <div class="section">
                <div class="section-title">💰 Order Summary</div>
                <table class="totals-table" style="width: 100%;">
                    <tr>
                        <td>Subtotal:</td>
                        <td class="amount">Rs. ${finalOrder.subtotal}</td>
                    </tr>
                    ${
                      finalOrder.totalSavings > 0
                        ? `
                    <tr style="color: #28a745;">
                        <td>Total Savings:</td>
                        <td class="amount">- Rs. ${finalOrder.totalSavings}</td>
                    </tr>
                    `
                        : ""
                    }
                    <tr>
                        <td>Delivery Charges:</td>
                        <td class="amount ${
                          finalOrder.deliveryCharges === 0 ? "text-success" : ""
                        }">
                            ${
                              finalOrder.deliveryCharges === 0
                                ? "FREE"
                                : `Rs. ${finalOrder.deliveryCharges}`
                            }
                        </td>
                    </tr>
                    ${
                      finalOrder.coupon
                        ? `
                    <tr>
                        <td>Coupon Applied (${finalOrder.coupon}):</td>
                        <td class="amount">${finalOrder.couponPct}% OFF</td>
                    </tr>
                    `
                        : ""
                    }
                    <tr style="border-top: 2px solid #dee2e6; font-size: 18px; font-weight: bold;">
                        <td>Total Amount:</td>
                        <td class="amount">Rs. ${finalOrder.total}</td>
                    </tr>
                </table>
            </div>

            <!-- Important Notes -->
            <div class="highlight">
                <strong>📋 Action Required:</strong>
                ${
                  finalOrder.paymentMethod === "cod"
                    ? "This is a COD order. Please verify the security deposit payment screenshot."
                    : "Please verify the payment screenshot and update order status."
                }
                <br><br>
                <strong>Order ID:</strong> ${
                  finalOrder.orderId || finalOrder.id
                }<br>
                <strong>Customer Phone:</strong> ${finalOrder.user.phone}<br>
                <strong>Order Time:</strong> ${new Date(
                  finalOrder.createdAt
                ).toLocaleString()}
            </div>

            <!-- Quick Actions -->
            <div style="text-align: center; margin: 25px 0;">
                <a href="#" class="action-btn">📱 Contact Customer</a>
                <a href="#" class="action-btn" style="background: #17a2b8;">👁️ View Full Details</a>
                <a href="${
                  finalOrder.paymentScreenshot || "#"
                }" class="action-btn" style="background: #6f42c1;" target="_blank">🖼️ Payment Proof</a>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>This email was automatically generated by Zarwa Organics Order System</p>
                <p>Order received at: ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>`,
    });

    await transporter.sendMail({
      from: "Zarwa Organics",
      to: customerEmail,
      subject: `🎉 We have received your order!`,

      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 20px;">

      <!-- LOGO -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://res.cloudinary.com/xcorpion/image/upload/v1762891028/xqhqfjs7aros35pjhogl.png" alt="Zarwa Organics" width="140" style="border-radius: 8px;" />
      </div>

      <!-- TITLE -->
      <h2 style="color: #333; text-align: center;">🎉 Your Order is Confirmed!</h2>

      <!-- INTRO -->
      <p style="font-size: 15px; color: #555; text-align: center;">
        Hi <strong>${finalOrder.user.firstName}</strong>,<br>
        Thank you for shopping with <strong>Zarwa Organics</strong>.<br>
        We’ve received your order <strong>#${finalOrder.orderId}</strong> on 
        ${new Date(finalOrder.createdAt).toLocaleDateString()}.
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">

      <!-- ORDER DETAILS -->
      <h3 style="color: #222;">Order Details</h3>
      <ul style="list-style: none; padding: 0; font-size: 14px; color: #444;">
        ${finalOrder.items
          .map(
            (item: any) => `
            <li style="margin-bottom: 8px;">
              ${item.name} × ${item.qty} — Rs. ${item.unitPrice * item.qty}
            </li>
          `
          )
          .join("")}
      </ul>

      <p style="font-size: 15px; color: #333; margin-top: 15px;">
      <strong>Payment Method:</strong> ${finalOrder.paymentMethod.toUpperCase()}<br>
        <strong>Subtotal:</strong> Rs. ${finalOrder.subtotal}<br>
        <strong>Delivery Charges:</strong> Rs. ${finalOrder.deliveryCharges}<br>
        <strong>Total Savings:</strong> - Rs. ${finalOrder.totalSavings}<br>
        <strong>Total:</strong> Rs. ${finalOrder.total}<br>
      </p>

      <!-- PAYMENT NOTE -->
      <div style="margin-top: 15px; background-color: #f3f6f4; padding: 12px 16px; border-radius: 8px;">
        ${
          finalOrder.paymentMethod.toLowerCase() === "cod"
            ? `<p style="font-size: 14px; color: #444; margin: 0;">
                💵 You chose <strong>Cash on Delivery</strong>. Please keep Rs. ${finalOrder.total} ready to pay at the time of delivery.
              </p>`
            : `<p style="font-size: 14px; color: #444; margin: 0;">
                📷 We’ve received your payment screenshot. Our team will verify it soon — you’ll be notified once it’s confirmed.
              </p>`
        }
      </div>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">

      <!-- DELIVERY DETAILS -->
      <h3 style="color: #222;">📦 Delivery Details</h3>
      <p style="font-size: 14px; color: #555;">
        ${finalOrder.user.firstName} ${finalOrder.user.lastName}<br>
        ${finalOrder.user.address}, ${finalOrder.user.city}, ${
        finalOrder.user.province
      }<br>
        ${finalOrder.user.phone}<br>
        ${finalOrder.user.email}
      </p>

      <!-- TRACK BUTTON -->
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://zarwaorganics.com/track-order?email=${customerEmail}&id=${
        finalOrder.orderId
      }"
           style="display: inline-block; background-color: #028a0f; color: white; text-decoration: none;
           padding: 12px 25px; border-radius: 8px; font-weight: bold;">
          Track My Order
        </a>
      </div>

      <!-- FOOTER -->
      <p style="font-size: 13px; color: #888; margin-top: 30px; text-align: center;">
        We’ll notify you once your payment is verified and your parcel is dispatched.<br>
        Thank you for trusting Zarwa Organics 💚
      </p>
    </div>

    <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 15px;">
      © ${new Date().getFullYear()} Zarwa Organics. All rights reserved.
    </p>
  </div>

`,
    });

    console.log("✅ Emails sent successfully to admin and customer");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
